const pool = require('../config/db');

// GET /api/students/:id/logs
// Devuelve los registros del alumno y el feedback asociado
const getStudentLogs = async (req, res) => {
    const studentId = req.params.id;

    try {
        // RGPD REGLA 2: Validar que consent_given es TRUE antes de procesar
        const checkConsent = await pool.query(
            'SELECT consent_given FROM students WHERE id = $1',
            [studentId]
        );

        if (checkConsent.rows.length === 0) {
            return res.status(404).json({ error: 'Alumno no encontrado.' });
        }

        if (checkConsent.rows[0].consent_given !== true) {
            // Detenemos el proceso y no devolvemos datos
            return res.status(403).json({ 
                error: 'Bloqueo RGPD: El alumno no ha otorgado el consentimiento para procesar sus datos.' 
            });
        }

        // RGPD REGLA 1: Seudonimización. Nunca devolver nombre ni email.
        // Hacemos un LEFT JOIN para traer también el feedback si existe.
        const query = `
            SELECT 
                dl.id AS log_id,
                dl.student_id,
                dl.log_date,
                dl.task_description,
                dl.hours_dedicated,
                dl.competences_worked,
                dl.incidents,
                tf.id AS feedback_id,
                tf.feedback_text,
                tf.status AS feedback_status
            FROM daily_logs dl
            LEFT JOIN teacher_feedback tf ON dl.id = tf.log_id
            WHERE dl.student_id = $1
            ORDER BY dl.log_date DESC;
        `;

        const result = await pool.query(query, [studentId]);

        res.status(200).json(result.rows);

    } catch (error) {
        // RGPD REGLA 3 y 4: No mostrar errores técnicos al cliente y logs limpios
        console.error('Error procesando GET /api/students/:id/logs:', error.message);
        res.status(500).json({ error: 'Error interno recuperando los registros.' });
    }
};

// POST /api/logs
// Registra una nueva tarea diaria del alumno
const createStudentLog = async (req, res) => {
    const { student_id, log_date, task_description, hours_dedicated, competences_worked, incidents } = req.body;

    if (!student_id || !log_date || !task_description || !hours_dedicated || !competences_worked) {
        return res.status(400).json({ error: 'Faltan campos obligatorios para el registro.' });
    }

    try {
        // RGPD REGLA 2: Validar consentimiento antes de procesar/guardar nada
        const checkConsent = await pool.query(
            'SELECT consent_given FROM students WHERE id = $1',
            [student_id]
        );

        if (checkConsent.rows.length === 0) {
            return res.status(404).json({ error: 'Alumno no encontrado.' });
        }

        if (checkConsent.rows[0].consent_given !== true) {
            return res.status(403).json({ 
                error: 'Bloqueo RGPD: El alumno no ha otorgado el consentimiento para procesar sus datos.' 
            });
        }

        // Inserción en la base de datos (Seudonimizado)
        const query = `
            INSERT INTO daily_logs 
            (student_id, log_date, task_description, hours_dedicated, competences_worked, incidents) 
            VALUES ($1, $2, $3, $4, $5, $6) 
            RETURNING id, student_id, log_date, task_description, hours_dedicated, competences_worked, incidents, created_at;
        `;
        
        const values = [student_id, log_date, task_description, hours_dedicated, competences_worked, incidents || null];
        const result = await pool.query(query, values);

        // Devolvemos 201 Created y el nuevo registro (sin datos personales cruzados)
        res.status(201).json(result.rows[0]);

    } catch (error) {
        // RGPD REGLA 3: Ocultar detalles del error
        console.error('Error procesando POST /api/logs:', error.message);
        res.status(500).json({ error: 'Error interno guardando el registro.' });
    }
};

// PUT /api/logs/:id/feedback
// Añade o actualiza el feedback del docente sobre un registro específico
const updateTeacherFeedback = async (req, res) => {
    const logId = req.params.id;
    const { feedback_text, status } = req.body;

    if (!feedback_text || !status) {
        return res.status(400).json({ error: 'Los campos feedback_text y status son obligatorios.' });
    }

    if (status !== 'pending' && status !== 'reviewed') {
        return res.status(400).json({ error: 'El estado debe ser "pending" o "reviewed".' });
    }

    try {
        // Validamos que el registro existe antes de hacer nada
        const checkLog = await pool.query('SELECT id FROM daily_logs WHERE id = $1', [logId]);
        
        if (checkLog.rows.length === 0) {
            return res.status(404).json({ error: 'Registro diario no encontrado.' });
        }

        // Comprobamos si ya existe feedback para este registro (para hacer UPDATE o INSERT)
        const checkFeedback = await pool.query('SELECT id FROM teacher_feedback WHERE log_id = $1', [logId]);

        let result;
        if (checkFeedback.rows.length > 0) {
            // Hacemos UPDATE
            const query = `
                UPDATE teacher_feedback 
                SET feedback_text = $1, status = $2, updated_at = CURRENT_TIMESTAMP
                WHERE log_id = $3
                RETURNING id, log_id, feedback_text, status, updated_at;
            `;
            result = await pool.query(query, [feedback_text, status, logId]);
        } else {
            // Hacemos INSERT
            const query = `
                INSERT INTO teacher_feedback (log_id, feedback_text, status)
                VALUES ($1, $2, $3)
                RETURNING id, log_id, feedback_text, status, created_at AS updated_at;
            `;
            result = await pool.query(query, [logId, feedback_text, status]);
        }

        // Respondemos con el feedback actualizado
        res.status(200).json(result.rows[0]);

    } catch (error) {
        // RGPD REGLA 3 y 4: Errores sanitizados
        console.error('Error procesando PUT /api/logs/:id/feedback:', error.message);
        res.status(500).json({ error: 'Error interno guardando el feedback del docente.' });
    }
};

module.exports = {
    getStudentLogs,
    createStudentLog,
    updateTeacherFeedback
};
