const pool = require('../config/db');

// GET /api/reports/class-summary
// Devuelve un resumen de la clase: horas totales, tareas registradas y feedbacks pendientes
const getClassSummary = async (req, res) => {
    try {
        // RGPD REGLA 2: Solo procesamos e incluimos en el informe a los alumnos que 
        // tengan consent_given = TRUE. Los que no tengan consentimiento quedan excluidos del panel.
        const query = `
            SELECT 
                s.id AS student_id,
                s.name,
                COUNT(DISTINCT dl.id)::INTEGER AS total_tasks,
                COALESCE(SUM(dl.hours_dedicated), 0)::NUMERIC AS total_hours,
                COUNT(tf.id) FILTER (WHERE tf.status = 'pending')::INTEGER AS pending_feedbacks
            FROM students s
            LEFT JOIN daily_logs dl ON s.id = dl.student_id
            LEFT JOIN teacher_feedback tf ON dl.id = tf.log_id
            WHERE s.consent_given = TRUE
            GROUP BY s.id, s.name
            ORDER BY s.name ASC;
        `;

        const result = await pool.query(query);

        res.status(200).json(result.rows);

    } catch (error) {
        // RGPD REGLA 3 y 4: Ocultar detalles técnicos del error al frontend
        console.error('Error procesando GET /api/reports/class-summary:', error.message);
        res.status(500).json({ error: 'Error interno generando el resumen de la clase.' });
    }
};

module.exports = {
    getClassSummary
};
