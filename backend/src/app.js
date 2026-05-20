const express = require('express');
const cors = require('cors');

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json()); // Permite parsear JSON en el body

// Rutas
const logsRoutes = require('./routes/logsRoutes');
const reportsRoutes = require('./routes/reportsRoutes');
const authRoutes = require('./routes/authRoutes');
// Endpoint de prueba (Healthcheck) para verificar que la API está viva
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'API de Antigravity funcionando correctamente' });
});

// Uso de rutas
app.use('/api', logsRoutes);
app.use('/api', reportsRoutes);
app.use('/api', authRoutes);
// Manejador global de rutas no encontradas
app.use((req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});

// Manejador global de errores (RGPD)
app.use((err, req, res, next) => {
    // RGPD: Nunca devolvemos el stack trace del error al cliente en producción
    console.error('Error no capturado:', err.message);
    res.status(500).json({ error: 'Ha ocurrido un error interno procesando tu solicitud.' });
});

module.exports = app;
