require('dotenv').config();
const app = require('./src/app');
const pool = require('./src/config/db');

const PORT = process.env.PORT || 5000;

console.log('Iniciando servidor, probando conexión a la base de datos...');

// Testeamos la conexión a la base de datos ANTES de levantar el servidor web
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('❌ Error CRÍTICO: No se pudo conectar a la base de datos Supabase.');
        console.error('Detalle técnico:', err.message);
        // Cerramos el proceso porque sin BD la app no debe funcionar
        process.exit(1);
    } else {
        console.log('✅ Conexión exitosa al Session Pooler de Supabase.');
        
        // Arrancamos el servidor
        app.listen(PORT, () => {
            console.log(`🚀 Servidor backend escuchando en http://localhost:${PORT}`);
            console.log(`👉 Puedes probar la API abriendo: http://localhost:${PORT}/api/health`);
        });
    }
});
