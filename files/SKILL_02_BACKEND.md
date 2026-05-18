# SKILL 02 — Backend (API REST)
## Proyecto Antigravity | Seguimiento de Prácticas Profesionales

---

## 🎯 PROPÓSITO DE ESTA SKILL

Guía a la IA para crear la API REST que conecta la base de datos con la interfaz. Se usa en el **Paso 2** de la construcción de la PoC. Solo se activa una vez confirmado el Paso 1 (base de datos creada y con datos).

---

## 🧠 ROL EN ESTE PASO

Actúa como un **desarrollador backend senior especializado en Node.js y Express**. Tu prioridad es que los endpoints funcionen correctamente y devuelvan datos limpios y útiles para el frontend.

---

## 📁 ESTRUCTURA DE CARPETAS A CREAR

```
backend/
├── index.js              ← servidor principal
├── routes/
│   ├── students.js       ← rutas de alumnos
│   ├── logs.js           ← rutas de registros diarios
│   └── reports.js        ← rutas de informes
├── controllers/
│   ├── studentsController.js
│   ├── logsController.js
│   └── reportsController.js
├── models/
│   └── db.js             ← conexión a la base de datos
└── package.json
```

---

## 🔌 ENDPOINTS REQUERIDOS

### 1. GET `/api/students/:id/logs`
- **Quién lo usa:** Docente (ver registros de un alumno)
- **Qué devuelve:** Todos los registros diarios de un alumno, incluyendo el feedback asociado
- **Ejemplo de respuesta:**
```json
[
  {
    "id": 1,
    "date": "2025-01-15",
    "task_description": "Asistencia en actividades de la vida diaria",
    "hours_dedicated": 6,
    "competences_worked": ["UC0249_2: Atención higiénica"],
    "incidents": null,
    "feedback": {
      "text": "Buen registro. Añade más detalle.",
      "status": "reviewed"
    }
  }
]
```

### 2. POST `/api/logs`
- **Quién lo usa:** Alumno (registrar nueva tarea diaria)
- **Qué recibe:**
```json
{
  "student_id": 1,
  "date": "2025-01-17",
  "task_description": "Descripción de la tarea",
  "hours_dedicated": 5,
  "competences_worked": ["UC0249_2"],
  "incidents": ""
}
```
- **Qué devuelve:** El registro creado con su id

### 3. PUT `/api/logs/:id/feedback`
- **Quién lo usa:** Docente (añadir o editar feedback)
- **Qué recibe:**
```json
{
  "feedback_text": "Texto del feedback del docente",
  "status": "reviewed"
}
```
- **Qué devuelve:** El feedback actualizado

### 4. GET `/api/reports/class-summary`
- **Quién lo usa:** Docente (resumen de toda la clase)
- **Qué devuelve:** Un JSON con todos los alumnos y sus métricas
```json
[
  {
    "student_id": 1,
    "name": "María García López",
    "total_hours": 11,
    "total_tasks": 2,
    "pending_feedback": 1,
    "last_activity": "2025-01-16"
  }
]
```

---

## 📦 DEPENDENCIAS A INSTALAR

```bash
npm init -y
npm install express pg cors dotenv
npm install --save-dev nodemon
```

### Archivo `.env` requerido:
```
DATABASE_URL=postgresql://usuario:password@host:puerto/nombre_db
PORT=3000
```

---

## ✅ REGLAS DE CALIDAD

1. **Mostrar la estructura de carpetas como artefacto ANTES de crear archivos** — esperar aprobación.
2. **Validar campos obligatorios** en cada endpoint (no aceptar registros vacíos).
3. **Manejar errores** con mensajes claros (no dejar errores sin capturar).
4. **Probar cada endpoint** con datos ficticios antes de pasar al siguiente.
5. **No avanzar al Paso 3** (frontend) sin confirmar que los 4 endpoints responden correctamente.

---

## ⚠️ ERRORES COMUNES A EVITAR

- No olvidar configurar CORS (necesario para que el frontend pueda conectarse)
- No hardcodear credenciales de base de datos (usar siempre `.env`)
- No mezclar lógica en las rutas — separar routes / controllers / models
- No devolver errores de base de datos directamente al cliente (pueden exponer datos sensibles)

---

## 🔄 ENTREGABLE ESPERADO AL TERMINAR ESTE PASO

- [ ] Los 4 endpoints funcionando en localhost
- [ ] Captura de pantalla de cada endpoint respondiendo correctamente
- [ ] Archivo `.env` configurado (sin subir a ningún repositorio público)
- [ ] Confirmación de que el servidor arranca sin errores

---

*SKILL 02 | Proyecto Antigravity | Ana Belén Fontana Pérez*
