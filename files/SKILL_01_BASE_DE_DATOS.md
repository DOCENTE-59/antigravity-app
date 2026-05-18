# SKILL 01 — Base de Datos
## Proyecto Antigravity | Seguimiento de Prácticas Profesionales

---

## 🎯 PROPÓSITO DE ESTA SKILL

Guía a la IA para diseñar y crear la base de datos PostgreSQL del proyecto de forma correcta, ordenada y sin errores. Se usa en el **Paso 1** de la construcción de la PoC.

---

## 🧠 ROL EN ESTE PASO

Actúa como un **experto en bases de datos relacionales** para una plataforma educativa. Tu prioridad es la claridad de las relaciones entre tablas y la integridad de los datos.

---

## 📐 ESTRUCTURA DE TABLAS REQUERIDA

### Tabla: `students`
| Campo | Tipo | Descripción |
|---|---|---|
| id | SERIAL PRIMARY KEY | Identificador único |
| name | VARCHAR(100) | Nombre completo del alumno |
| email | VARCHAR(150) UNIQUE | Correo electrónico |
| program_certificate | VARCHAR(200) | Nombre del certificado de profesionalidad |
| created_at | TIMESTAMP DEFAULT NOW() | Fecha de registro |

### Tabla: `daily_logs`
| Campo | Tipo | Descripción |
|---|---|---|
| id | SERIAL PRIMARY KEY | Identificador único |
| student_id | INTEGER REFERENCES students(id) | Vinculación al alumno |
| date | DATE | Fecha de la tarea |
| task_description | TEXT | Descripción detallada de la tarea |
| hours_dedicated | INTEGER | Horas dedicadas |
| competences_worked | JSONB | Competencias trabajadas (array) |
| incidents | TEXT | Incidencias (opcional) |
| created_at | TIMESTAMP DEFAULT NOW() | Fecha de registro |

### Tabla: `teacher_feedback`
| Campo | Tipo | Descripción |
|---|---|---|
| id | SERIAL PRIMARY KEY | Identificador único |
| log_id | INTEGER REFERENCES daily_logs(id) | Vinculación al registro diario |
| feedback_text | TEXT | Texto del feedback del docente |
| status | VARCHAR(20) DEFAULT 'pending' | Estado: pending / reviewed |
| created_at | TIMESTAMP DEFAULT NOW() | Fecha del feedback |

---

## 🔗 RELACIONES ENTRE TABLAS

```
students (1) ──────────── (N) daily_logs
                                    │
                                    │ (1)
                                    │
                              (N) teacher_feedback
```

Un alumno tiene muchos registros diarios.
Cada registro diario puede tener un feedback del docente.

---

## ✅ REGLAS DE CALIDAD

1. **Mostrar el diagrama de relaciones ANTES de crear nada** — esperar aprobación.
2. **Usar Supabase** como plataforma (gratuita, sin instalación local).
3. **Incluir datos de prueba ficticios** al final (mínimo 2 alumnos, 3 registros, 1 feedback).
4. **Nombrar las tablas en inglés y en minúsculas** (ya definido arriba).
5. **No usar datos reales** de alumnos en ningún momento.

---

## 📋 DATOS DE PRUEBA FICTICIOS (insertar tras crear tablas)

```sql
-- Alumnos de prueba
INSERT INTO students (name, email, program_certificate) VALUES
('María García López', 'maria.garcia@prueba.com', 'Certificado de Profesionalidad: Atención Sociosanitaria'),
('Carlos Martínez Ruiz', 'carlos.martinez@prueba.com', 'Certificado de Profesionalidad: Atención Sociosanitaria');

-- Registros diarios de prueba
INSERT INTO daily_logs (student_id, date, task_description, hours_dedicated, competences_worked, incidents) VALUES
(1, '2025-01-15', 'Asistencia a usuarios en actividades de la vida diaria. Apoyo en higiene personal y alimentación.', 6, '["UC0249_2: Atención higiénica", "UC0250_2: Apoyo en actividades"]', NULL),
(1, '2025-01-16', 'Acompañamiento en terapia ocupacional. Registro de evolución en ficha de seguimiento.', 5, '["UC0251_2: Atención psicosocial"]', 'Usuario con dificultad de movilidad: se notificó a enfermería.'),
(2, '2025-01-15', 'Recepción y acogida de nuevos usuarios. Revisión de protocolos de centro.', 4, '["UC0249_2: Atención higiénica"]', NULL);

-- Feedback de prueba
INSERT INTO teacher_feedback (log_id, feedback_text, status) VALUES
(1, 'Buen registro. Añade más detalle sobre las técnicas utilizadas en higiene personal.', 'reviewed');
```

---

## ⚠️ ERRORES COMUNES A EVITAR

- No crear las tablas en orden incorrecto (primero `students`, luego `daily_logs`, luego `teacher_feedback`)
- No olvidar la restricción UNIQUE en el email
- No usar tipos de dato incorrectos para `competences_worked` (debe ser JSONB, no TEXT)
- No avanzar al Paso 2 (backend) sin confirmar que las 3 tablas existen y tienen datos de prueba

---

## 🔄 ENTREGABLE ESPERADO AL TERMINAR ESTE PASO

- [ ] Captura de pantalla de las 3 tablas creadas en Supabase
- [ ] Confirmación de que los datos ficticios se han insertado correctamente
- [ ] Diagrama de relaciones validado

---

*SKILL 01 | Proyecto Antigravity | Ana Belén Fontana Pérez*
