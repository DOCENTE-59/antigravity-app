import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const styles = {
    container: {
      padding: 'var(--spacing-lg)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      minHeight: '100vh',
    },
    title: {
      color: 'var(--secondary)',
      fontSize: '32px',
      fontWeight: '900',
      textAlign: 'center',
      marginBottom: '8px',
      letterSpacing: '-1px'
    },
    subtitle: {
      color: 'var(--text-muted)',
      textAlign: 'center',
      marginBottom: '40px',
      fontSize: '15px'
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
    buttonStudent: {
      backgroundColor: 'var(--primary)',
      color: 'var(--white)',
      fontSize: '16px',
      fontWeight: 'bold',
      width: '100%',
      marginBottom: 'var(--spacing-md)',
    },
    buttonTeacher: {
      backgroundColor: 'transparent',
      color: 'var(--text-muted)',
      border: '1px solid #d1d5db',
      fontSize: '16px',
      width: '100%',
      fontWeight: '600'
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
    }
  };

  const handleLogin = async (role) => {
    setError('');

    if (!email || !password) {
      setError('Por favor, escribe tu correo y contraseña para entrar.');
      return;
    }

    const cleanEmail = email.trim().toLowerCase();

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail, password, role })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Error al iniciar sesión.');
        return;
      }

      if (role === 'student') {
        navigate(`/student/${data.id}`);
      } else if (role === 'teacher') {
        navigate('/teacher');
      }

    } catch (err) {
      setError('No se pudo conectar con el servidor. Inténtalo de nuevo.');
    }
  };

  return (
    <div className="login-cover-container">
      <div className="login-content">
        <h1 className="login-title-main">
          DIGITALIZACIÓN Y SEGUIMIENTO INTELIGENTE DE PRÁCTICAS PROFESIONALES
        </h1>

        <div className="login-card-modern">
          <h2 className="login-card-title">Identificación de Usuario</h2>

          {error && <div style={styles.errorBox}>{error}</div>}

          <div className="login-input-group">
            <label className="login-input-label">Correo electrónico</label>
            <input
              type="email"
              className="login-input-field"
              placeholder="tu@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="login-input-group">
            <label className="login-input-label">Contraseña</label>
            <input
              type="password"
              className="login-input-field"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div style={{ marginTop: '32px' }}>
            <button
              className="login-btn-student-modern"
              onClick={() => handleLogin('student')}
            >
              Entrar como Alumno
            </button>
            <button
              className="login-btn-teacher-modern"
              onClick={() => handleLogin('teacher')}
            >
              Entrar como Docente
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;