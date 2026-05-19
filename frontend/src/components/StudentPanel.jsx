import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function StudentPanel() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Estado del formulario
  const [formData, setFormData] = useState({
    log_date: new Date().toISOString().split('T')[0],
    hours_dedicated: '',
    task_description: '',
    competences_worked: '',
    incidents: ''
  });

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/students/${id}/logs`);
      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || 'Error al obtener el historial de prácticas.');
      }
      const data = await response.json();
      setLogs(data);
    } catch (err) {
      setError('No se pudieron cargar los registros: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    try {
      const payload = {
        student_id: id,
        ...formData,
        hours_dedicated: Number(formData.hours_dedicated)
      };

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/logs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al guardar el registro.');
      }

      setSuccessMsg('¡Registro guardado correctamente!');

      // Resetear el formulario, manteniendo la fecha actual
      setFormData({
        log_date: new Date().toISOString().split('T')[0],
        hours_dedicated: '',
        task_description: '',
        competences_worked: '',
        incidents: ''
      });

      // Refrescar el historial
      fetchLogs();

      // Limpiar mensaje de éxito después de 3 segundos
      setTimeout(() => setSuccessMsg(''), 3000);

    } catch (err) {
      setError(err.message);
    }
  };

  const styles = {
    container: {
      padding: 'var(--spacing-lg)',
      maxWidth: '800px',
      margin: '0 auto',
      minHeight: '100vh',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 'var(--spacing-lg)',
      paddingBottom: 'var(--spacing-md)',
      borderBottom: '1px solid #e5e7eb'
    },
    title: {
      color: 'var(--secondary)',
      fontSize: '24px',
      fontWeight: 'bold',
      letterSpacing: '-0.5px'
    },
    logoutBtn: {
      backgroundColor: 'transparent',
      color: 'var(--text-muted)',
      border: '1px solid #d1d5db',
      padding: '8px 16px',
      fontSize: '14px',
      fontWeight: '600',
      minHeight: 'auto'
    },
    card: {
      backgroundColor: 'var(--surface)',
      borderRadius: '12px',
      padding: 'var(--spacing-lg)',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
      marginBottom: 'var(--spacing-lg)',
      border: '1px solid #f3f4f6'
    },
    cardTitle: {
      color: 'var(--text-main)',
      fontSize: '18px',
      marginBottom: 'var(--spacing-md)',
      fontWeight: 'bold'
    },
    formGroup: {
      marginBottom: 'var(--spacing-md)',
    },
    label: {
      display: 'block',
      marginBottom: 'var(--spacing-sm)',
      color: 'var(--text-main)',
      fontWeight: '600',
      fontSize: '14px'
    },
    submitBtn: {
      backgroundColor: 'var(--primary)',
      color: 'var(--white)',
      fontSize: '16px',
      fontWeight: 'bold',
      width: '100%',
      marginTop: 'var(--spacing-sm)'
    },
    historyItem: {
      backgroundColor: 'var(--bg-color)',
      borderLeft: '4px solid var(--primary)',
      padding: 'var(--spacing-md)',
      borderRadius: '0 8px 8px 0',
      marginBottom: 'var(--spacing-md)',
    },
    dateHeader: {
      fontWeight: 'bold',
      color: 'var(--text-main)',
      marginBottom: '6px',
      fontSize: '15px',
      display: 'flex',
      alignItems: 'center',
      textTransform: 'capitalize'
    },
    textDetail: {
      color: 'var(--text-muted)',
      fontSize: '14px',
      marginBottom: '6px',
      lineHeight: '1.5'
    },
    feedbackBox: {
      marginTop: '12px',
      backgroundColor: '#fffbeb', // amber-50
      padding: '12px',
      borderRadius: '8px',
      border: '1px solid #fde68a',
      color: '#92400e' // amber-800
    },
    errorBox: {
      backgroundColor: '#fee2e2',
      color: 'var(--danger)',
      padding: '12px',
      borderRadius: '8px',
      marginBottom: '20px',
      fontSize: '14px',
      textAlign: 'center',
      fontWeight: '500'
    },
    successBox: {
      backgroundColor: '#d1fae5',
      color: 'var(--primary)',
      padding: '12px',
      borderRadius: '8px',
      marginBottom: '20px',
      fontSize: '14px',
      textAlign: 'center',
      fontWeight: '500'
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Mi Panel de Prácticas</h1>
        <button style={styles.logoutBtn} onClick={() => navigate('/login')}>
          Cerrar Sesión
        </button>
      </header>

      {error && <div style={styles.errorBox}>{error}</div>}
      {successMsg && <div style={styles.successBox}>{successMsg}</div>}

      <div style={styles.card}>
        <h2 style={styles.cardTitle}>Registrar Nueva Tarea</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <div style={{ ...styles.formGroup, flex: '1 1 200px' }}>
              <label style={styles.label}>Fecha</label>
              <input
                type="date"
                name="log_date"
                value={formData.log_date}
                onChange={handleChange}
                required
              />
            </div>
            <div style={{ ...styles.formGroup, flex: '1 1 200px' }}>
              <label style={styles.label}>Horas Dedicadas</label>
              <input
                type="number"
                name="hours_dedicated"
                step="0.5"
                min="0.5"
                value={formData.hours_dedicated}
                onChange={handleChange}
                placeholder="Ej. 4"
                required
              />
            </div>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Descripción de Tareas</label>
            <textarea
              name="task_description"
              value={formData.task_description}
              onChange={handleChange}
              rows="3"
              placeholder="¿Qué has hecho hoy en la empresa?"
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Competencias Trabajadas</label>
            <input
              type="text"
              name="competences_worked"
              value={formData.competences_worked}
              onChange={handleChange}
              placeholder="Ej. React, Trabajo en equipo, SQL..."
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Incidencias (Opcional)</label>
            <input
              type="text"
              name="incidents"
              value={formData.incidents}
              onChange={handleChange}
              placeholder="¿Algún problema o bloqueo a destacar?"
            />
          </div>

          <button type="submit" style={styles.submitBtn}>
            Guardar Registro Diario
          </button>
        </form>
      </div>

      <div style={styles.card}>
        <h2 style={styles.cardTitle}>Mi Historial</h2>
        {loading ? (
          <p style={styles.textDetail}>Cargando tu historial de prácticas...</p>
        ) : logs.length === 0 ? (
          <p style={styles.textDetail}>Todavía no tienes tareas registradas. ¡Añade tu primera tarea arriba!</p>
        ) : (
          logs.map((log) => (
            <div key={log.log_id} style={styles.historyItem}>
              <div style={styles.dateHeader}>
                {new Date(log.log_date).toLocaleDateString('es-ES', {
                  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                })}
                <span style={{ fontWeight: 'normal', color: 'var(--text-muted)', marginLeft: '8px' }}>
                  • {log.hours_dedicated} horas
                </span>
              </div>
              <p style={styles.textDetail}><strong>Tareas:</strong> {log.task_description}</p>
              <p style={styles.textDetail}><strong>Competencias:</strong> {log.competences_worked}</p>
              {log.incidents && (
                <p style={styles.textDetail}><strong>Incidencias:</strong> {log.incidents}</p>
              )}

              {log.feedback_text && (
                <div style={styles.feedbackBox}>
                  <strong>👩‍🏫 Feedback del Tutor:</strong>
                  <p style={{ marginTop: '4px', fontSize: '14px', color: '#b45309' }}>
                    {log.feedback_text}
                  </p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default StudentPanel;
