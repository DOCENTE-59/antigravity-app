const { Pool } = require('pg');
require('dotenv').config();

// Configuración del Pool para conectar a Supabase
// Se usa SSL obligatoriamente para Supabase
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl: {
    rejectUnauthorized: false, // Requerido para conectarse a Supabase
  },
  // Opciones de conexión preparadas para trabajar con Session Pooler
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Captura de errores a nivel de pool
pool.on('error', (err) => {
  // RGPD (Security by design): Solo registramos el mensaje técnico de error de conexión.
  // Nunca imprimiremos objetos completos que puedan contener trazas sensibles.
  console.error('Error en el pool de conexiones de la base de datos:', err.message);
});

module.exports = pool;
