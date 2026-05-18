import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function TeacherPanel() {
  const navigate = useNavigate();
  
  const [summary, setSummary] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Estado para la vista de detalle
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [logs, setLogs] = useState([]);
  const [logsLoading, setLogsLoading] = useState(false);
  
  // Estado para los textos de feedback de cada log (clave: log_id, valor: texto)
  const [feedbacks, setFeedbacks] = useState({});

  useEffect(() => {
    fetchSummary();
  }, []);

  const fetchSummary = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await fetch('http://localhost:5000/api/reports/class-summary');
      if (!response.ok) throw new Error('Error al cargar el resumen de la clase.');
      const data = await response.json();
      setSummary(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectStudent = async (student) => {
    setSelectedStudent(student);
    try {
      setLogsLoading(true);
      setError('');
      const response = await fetch(`http://localhost:5000/api/students/${student.student_id}/logs`);
      if (!response.ok) throw new Error('Error al cargar los registros del alumno.');
      const data = await response.json();
      setLogs(data);
      
      // Precargar los feedbacks existentes en el estado
      const initialFeedbacks = {};
      data.forEach(log => {
        initialFeedbacks[log.log_id] = log.feedback_text || '';
      });
      setFeedbacks(initialFeedbacks);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLogsLoading(false);
    }
  };

  const handleFeedbackChange = (logId, text) => {
    setFeedbacks(prev => ({ ...prev, [logId]: text }));
  };

  const handleSaveFeedback = async (logId) => {
    try {
      const text = feedbacks[logId];
      if (!text || text.trim() === '') {
        alert('El feedback no puede estar vacío.');
        return;
      }

      const payload = {
        feedback_text: text,
        status: 'reviewed'
      };
      
      const response = await fetch(`http://localhost:5000/api/logs/${logId}/feedback`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      if (!response.ok) throw new Error('Error al guardar el feedback.');
      
      // Actualizar el log localmente para reflejar el cambio sin recargar todo
      setLogs(prev => prev.map(log => 
        log.log_id === logId 
          ? { ...log, feedback_text: payload.feedback_text, feedback_status: 'reviewed' }
          : log
      ));
      
      // Refrescar el resumen de la clase silenciosamente para actualizar los contadores
      fetchSummary();
      
      alert('¡Feedback guardado correctamente!');
    } catch (err) {
      alert(err.message);
    }
  };

  // Estilos
  const styles = {
    container: {
      padding: 'var(--spacing-lg)',
      maxWidth: '1000px',
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
    studentRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '16px',
      borderBottom: '1px solid #e5e7eb',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
    },
    studentName: {
      fontWeight: 'bold',
      color: 'var(--text-main)',
      fontSize: '16px'
    },
    studentStats: {
      color: 'var(--text-muted)',
      fontSize: '14px',
      marginTop: '4px'
    },
    badge: {
      backgroundColor: 'var(--warning)',
      color: '#fff',
      padding: '4px 8px',
      borderRadius: '12px',
      fontSize: '12px',
      fontWeight: 'bold'
    },
    backBtn: {
      backgroundColor: 'var(--surface)',
      color: 'var(--text-main)',
      border: '1px solid #d1d5db',
      padding: '8px 16px',
      fontSize: '14px',
      fontWeight: '600',
      minHeight: 'auto',
      marginBottom: 'var(--spacing-md)'
    },
    logCard: {
      backgroundColor: 'var(--bg-color)',
      borderLeft: '4px solid var(--secondary)',
      padding: 'var(--spacing-md)',
      borderRadius: '0 8px 8px 0',
      marginBottom: 'var(--spacing-lg)',
    },
    dateHeader: {
      fontWeight: 'bold',
      color: 'var(--text-main)',
      marginBottom: '6px',
      fontSize: '15px',
      textTransform: 'capitalize'
    },
    textDetail: {
      color: 'var(--text-main)',
      fontSize: '14px',
      marginBottom: '6px',
      lineHeight: '1.5'
    },
    feedbackSection: {
      marginTop: '16px',
      borderTop: '1px solid #e5e7eb',
      paddingTop: '16px'
    },
    textarea: {
      width: '100%',
      padding: '12px',
      borderRadius: '8px',
      border: '1px solid #d1d5db',
      marginBottom: '8px',
      fontSize: '14px',
      fontFamily: 'inherit'
    },
    saveBtn: {
      backgroundColor: 'var(--primary)',
      color: 'var(--white)',
      padding: '8px 16px',
      fontSize: '14px',
      fontWeight: 'bold',
      minHeight: 'auto',
      width: 'auto'
    },
    errorBox: {
      backgroundColor: '#fee2e2',
      color: 'var(--danger)',
      padding: '12px',
      borderRadius: '8px',
      marginBottom: '20px',
      fontSize: '14px',
      textAlign: 'center',
    }
  };

  // Vista de detalle de un alumno
  if (selectedStudent) {
    return (
      <div style={styles.container}>
        <header style={styles.header}>
          <h1 style={styles.title}>Registros de {selectedStudent.name}</h1>
          <button style={styles.logoutBtn} onClick={() => navigate('/login')}>
            Cerrar Sesión
          </button>
        </header>

        <button style={styles.backBtn} onClick={() => setSelectedStudent(null)}>
          &larr; Volver a la lista de alumnos
        </button>

        {error && <div style={styles.errorBox}>{error}</div>}

        <div style={styles.card}>
          {logsLoading ? (
            <p style={styles.textDetail}>Cargando registros...</p>
          ) : logs.length === 0 ? (
            <p style={styles.textDetail}>Este alumno aún no tiene registros.</p>
          ) : (
            logs.map(log => (
              <div key={log.log_id} style={styles.logCard}>
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
                
                <div style={styles.feedbackSection}>
                  <p style={{ fontWeight: 'bold', marginBottom: '8px', fontSize: '14px' }}>
                    Tu Feedback:
                  </p>
                  <textarea 
                    style={styles.textarea}
                    rows="3"
                    placeholder="Escribe aquí tu valoración u observaciones para el alumno..."
                    value={feedbacks[log.log_id] || ''}
                    onChange={(e) => handleFeedbackChange(log.log_id, e.target.value)}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '13px', color: log.feedback_status === 'reviewed' ? 'var(--primary)' : 'var(--warning)' }}>
                      Estado: {log.feedback_status === 'reviewed' ? '✓ Revisado' : '⏳ Pendiente'}
                    </span>
                    <button 
                      style={styles.saveBtn}
                      onClick={() => handleSaveFeedback(log.log_id)}
                    >
                      Guardar Feedback
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }

  // Vista principal: Lista de alumnos
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Panel del Docente</h1>
        <button style={styles.logoutBtn} onClick={() => navigate('/login')}>
          Cerrar Sesión
        </button>
      </header>

      {error && <div style={styles.errorBox}>{error}</div>}

      <div style={styles.card}>
        <h2 style={{ color: 'var(--text-main)', fontSize: '18px', marginBottom: '16px', fontWeight: 'bold' }}>
          Resumen de la Clase
        </h2>
        
        {loading ? (
          <p>Cargando alumnos...</p>
        ) : summary.length === 0 ? (
          <p style={{ color: 'var(--text-muted)' }}>No hay alumnos con consentimiento activo.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {summary.map(student => (
              <div 
                key={student.student_id} 
                style={styles.studentRow}
                onClick={() => handleSelectStudent(student)}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <div>
                  <div style={styles.studentName}>{student.name}</div>
                  <div style={styles.studentStats}>
                    {student.total_tasks} tareas • {student.total_hours} horas totales
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  {student.pending_feedbacks > 0 && (
                    <span style={styles.badge}>
                      {student.pending_feedbacks} pendientes
                    </span>
                  )}
                  <span style={{ color: 'var(--text-muted)' }}>&rarr;</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default TeacherPanel;
