const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const logsRoutes = require('./routes/logsRoutes');
const reportsRoutes = require('./routes/reportsRoutes');
const authRoutes = require('./routes/authRoutes');

app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'API de Antigravity funcionando correctamente' });
});

app.use('/api', logsRoutes);
app.use('/api', reportsRoutes);
app.use('/api', authRoutes);

app.use((req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});

app.use((err, req, res, next) => {
    console.error('Error no capturado:', err.message);
    res.status(500).json({ error: 'Ha ocurrido un error interno procesando tu solicitud.' });
});

module.exports = app;