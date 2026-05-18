import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Estilos limpios y directos para el componente Login
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

  const handleLogin = (role) => {
    setError('');
    
    // Validación amigable (sin tecnicismos)
    if (!email || !password) {
      setError('Por favor, escribe tu correo y contraseña para entrar.');
      return;
    }

    const cleanEmail = email.trim().toLowerCase();

    // Lógica Mockeada para la PoC (conectando con los datos reales de la BDD)
    if (role === 'student') {
      if (cleanEmail === 'ana.martinez.fake@email.com') {
        navigate('/student/a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d');
      } else if (cleanEmail === 'carlos.lopez.fake@email.com') {
        navigate('/student/b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7e');
      } else {
        setError('No encontramos ningún alumno con ese correo. Revisa si está bien escrito.');
      }
    } else if (role === 'teacher') {
      if (cleanEmail === 'docente@antigravity.com') {
        navigate('/teacher');
      } else {
        setError('Parece que tus credenciales de docente son incorrectas.');
      }
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Antigravity</h1>
      <p style={styles.subtitle}>Seguimiento de Prácticas Profesionales</p>

      {error && <div style={styles.errorBox}>{error}</div>}

      <div style={styles.formGroup}>
        <label style={styles.label}>Correo electrónico</label>
        <input 
          type="email" 
          placeholder="tu@correo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Contraseña</label>
        <input 
          type="password" 
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div style={{ marginTop: '32px' }}>
        <button 
          style={styles.buttonStudent} 
          onClick={() => handleLogin('student')}
        >
          Entrar como Alumno
        </button>
        <button 
          style={styles.buttonTeacher} 
          onClick={() => handleLogin('teacher')}
        >
          Entrar como Docente
        </button>
      </div>
    </div>
  );
}

export default Login;
