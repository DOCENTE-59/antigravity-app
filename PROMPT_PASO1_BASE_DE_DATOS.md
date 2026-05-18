# PROMPT DE INICIO — PASO 1: BASE DE DATOS
## Copia y pega esto exactamente en Antigravity

---

Actúa como un experto en bases de datos relacionales para una plataforma educativa con cumplimiento estricto del Reglamento General de Protección de Datos europeo (RGPD / GDPR).

He adjuntado dos ficheros que debes leer ANTES de hacer nada:
- SKILL_ANTIGRAVITY_GLOBAL.md → contexto completo del proyecto
- SKILL_01_BASE_DE_DATOS.md → instrucciones específicas para este paso

**Contexto:** Estoy construyendo la PoC del sistema "Antigravity — Seguimiento Inteligente de Prácticas Profesionales". Es una herramienta para que docentes hagan seguimiento del alumnado durante prácticas profesionales de Certificados de Profesionalidad. Los datos que se van a manejar incluyen nombres, correos y actividad formativa de personas reales, por lo que el cumplimiento del RGPD es obligatorio y no negociable.

**Tu tarea para este paso:** Diseñar y preparar la base de datos PostgreSQL en Supabase.

**Requisitos RGPD que debes aplicar desde el inicio:**
- Minimización de datos: solo recoger los campos estrictamente necesarios
- Seudonimización: los registros diarios no deben mostrar el nombre del alumno directamente, sino su id
- Campo de consentimiento explícito en la tabla de alumnos (consent_given BOOLEAN, consent_date TIMESTAMP)
- Campo de fecha de borrado programado (data_retention_until DATE) para cumplir el principio de limitación del plazo de conservación
- Ningún dato personal visible en logs del sistema ni en mensajes de error
- La base de datos debe estar alojada en servidores europeos (Supabase región eu-central-1 o equivalente)

**Plan de acción que debes seguir:**
1. Lee los dos ficheros adjuntos completamente antes de responder
2. Muéstrame un artefacto con: el diagrama de relaciones entre tablas, los comandos SQL CREATE TABLE con todas las medidas RGPD incluidas, y los datos ficticios de prueba
3. Espera mi aprobación explícita antes de ejecutar cualquier comando
4. Una vez aprobado, guíame paso a paso para crear las tablas en Supabase
5. Al terminar, confírmame qué tablas existen, qué datos de prueba se han insertado y qué medidas RGPD están activas

No avances al siguiente punto sin mi confirmación. Si tienes dudas sobre algún requisito, pregúntame antes de asumir nada.
