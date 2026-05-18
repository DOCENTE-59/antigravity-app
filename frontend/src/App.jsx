import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login.jsx';
import StudentPanel from './components/StudentPanel.jsx';
import TeacherPanel from './components/TeacherPanel.jsx';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          {/* Redirección inicial */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          
          {/* Rutas principales de la aplicación */}
          <Route path="/login" element={<Login />} />
          <Route path="/student/:id" element={<StudentPanel />} />
          <Route path="/teacher" element={<TeacherPanel />} />
          
          {/* Ruta 404 (Fallback) */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
