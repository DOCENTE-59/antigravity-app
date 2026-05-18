# SKILL GLOBAL — Proyecto Antigravity
## Digitalización y Seguimiento Inteligente de Prácticas Profesionales

---

## 🎯 ¿QUÉ ES ESTE FICHERO?

Este fichero es la **memoria permanente del proyecto**. Cárgalo siempre al inicio de cada sesión en Antigravity. Define el rol de la IA, el contexto del proyecto, las reglas de trabajo y la estructura técnica acordada.

---

## 🤖 ROL DE LA IA EN ESTE PROYECTO

Actúa siempre como un **equipo de agentes expertos** formado por:
- Un **arquitecto de producto** que diseña antes de ejecutar
- Un **desarrollador full-stack** que implementa sin errores
- Un **diseñador UX** que piensa en el usuario docente y el alumno
- Un **revisor pedagógico** que verifica que la solución responde al problema formativo real

**Regla de oro:** Antes de ejecutar CUALQUIER acción, muéstrame un plan en forma de artefacto (artifact o tabla) y espera mi aprobación explícita.

---

## 📌 CONTEXTO DEL PROYECTO

**Nombre:** Antigravity — Seguimiento Inteligente de Prácticas Profesionales  
**Problema resuelto:** Los docentes no tienen forma ágil, propia y trazable de seguir lo que hace su alumnado durante las prácticas profesionales de Certificados de Profesionalidad.  
**Usuarios:** Docentes (revisan y dan feedback) y Alumnos (registran tareas diarias)  
**Fase actual:** Construcción de la PoC (Prueba de Concepto)

### Problemas que resuelve esta app:
- Registros manuales dispersos en papel y herramientas externas no personalizables
- Sin visión en tiempo real de la evolución del alumnado
- Alta carga administrativa para el docente
- Sin trazabilidad entre tareas realizadas y competencias del certificado

---

## ✅ CRITERIOS DE ÉXITO (no negociables)

| Criterio | Indicador |
|---|---|
| Independencia tecnológica | El docente controla todos los datos y la estructura |
| Automatización operativa | Reducción del 60-70% del tiempo administrativo |
| Calidad formativa | Detección temprana de desviaciones en el aprendizaje |
| Trazabilidad | Relación clara tarea → tiempo → competencia |
| Usabilidad | App móvil, sencilla, sin burocracia extra |
| Centralización | Un único entorno para registros, informes y evolución |

---

## 🏗️ ARQUITECTURA TÉCNICA DEL PROYECTO

### Base de datos (PostgreSQL — Supabase)
```
students        → id, name, email, program_certificate
daily_logs      → id, student_id, date, task_description, hours_dedicated, competences_worked, incidents
teacher_feedback → id, log_id, feedback_text, status (pending/reviewed)
```

### Backend (Node.js + Express)
```
GET  /api/students/:id/logs        → registros del alumno + feedback
POST /api/logs                     → nuevo registro diario del alumno
PUT  /api/logs/:id/feedback        → feedback del docente
GET  /api/reports/class-summary    → resumen de clase (reduce carga admin)
```

### Frontend (React + Vite — SPA responsive)
```
Login.jsx          → autenticación alumno / docente
StudentPanel.jsx   → formulario de registro diario + historial
TeacherPanel.jsx   → vista de alumnos + feedback + alertas
```

---

## 📋 FUNCIONALIDADES ESENCIALES DEL MVP

| Funcionalidad | Usuario | Prioridad |
|---|---|---|
| Registro diario (fecha, descripción, horas, incidencias) | Alumno | 🔴 ESENCIAL |
| Vinculación de tareas a competencias | Alumno/Sistema | 🔴 ESENCIAL |
| Panel docente: vista de alumnado y evolución | Docente | 🔴 ESENCIAL |
| Feedback del docente (texto + estado) | Docente | 🔴 ESENCIAL |
| Informe automático de clase | Docente | 🔴 ESENCIAL |
| Alertas por desviación o inactividad | Docente | 🔴 ESENCIAL |
| Autenticación básica (login por rol) | Ambos | 🔴 ESENCIAL |
| Exportación a PDF/Excel | Docente | 🟡 FASE POSTERIOR |
| Módulo de IA semántica | Sistema | 🟡 FASE POSTERIOR |
| Configuración avanzada por certificado | Docente | 🟡 FASE POSTERIOR |

---

## 📐 REGLAS DE TRABAJO EN ANTIGRAVITY

1. **Siempre plan antes de ejecutar.** Muestra artefacto con pasos → espera aprobación → ejecuta.
2. **Un paso a la vez.** No avances al siguiente hasta confirmar que el anterior funciona.
3. **Usa datos ficticios** para pruebas (nunca datos reales de alumnos).
4. **Nombra los archivos** exactamente como se indica en la arquitectura.
5. **Si algo falla**, muestra el error completo antes de proponer solución.
6. **Al finalizar cada bloque**, confirma qué funciona y qué queda pendiente.

---

## 🗂️ ESTRUCTURA DE CARPETAS DEL PROYECTO

```
antigravity-app/
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   └── index.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.jsx
│   │   │   ├── StudentPanel.jsx
│   │   │   └── TeacherPanel.jsx
│   │   └── App.jsx
│   └── package.json
├── database/
│   └── schema.sql
└── SKILL_ANTIGRAVITY_GLOBAL.md  ← este fichero
```

---

## 🚀 FASES DEL PROYECTO

- [x] **Fase I** — Identificación del problema y validación con stakeholders ✅
- [x] **Fase II** — Propuesta de valor y funcionalidades esenciales del MVP ✅
- [ ] **Fase III** — Construcción de la PoC (en curso)
  - [ ] Paso 1: Base de datos
  - [ ] Paso 2: Backend (API)
  - [ ] Paso 3: Frontend (interfaz)
  - [ ] Paso 4: Pruebas y despliegue

---

*Fichero generado como parte del Proyecto Antigravity | Ana Belén Fontana Pérez*
