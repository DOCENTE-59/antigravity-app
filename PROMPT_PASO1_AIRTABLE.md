# PROMPT PASO 1 — BASE DE DATOS EN AIRTABLE
## Copia y pega esto exactamente en Antigravity

---

Hemos decidido usar Airtable en lugar de Supabase como base de datos para esta PoC, porque es más visual y no requiere código para configurarse. Ya tengo cuenta en Airtable.

**Tu tarea:** Guíame paso a paso para crear la estructura de base de datos del proyecto Antigravity en Airtable, respetando el diseño ya aprobado y las medidas RGPD acordadas.

**Lo que necesito que hagas:**

1. Dime cómo crear una nueva Base en Airtable llamada `Antigravity-PoC`
2. Guíame para crear las 3 tablas con exactamente estos nombres y campos:

**Tabla 1: Students**
- id (Autonumber — identificador único)
- name (Single line text — solo nombre y primer apellido)
- email (Email)
- program_certificate (Single line text)
- consent_given (Checkbox — RGPD: consentimiento explícito)
- consent_date (Date — RGPD: fecha del consentimiento)
- data_retention_until (Date — RGPD: fecha programada de borrado)
- created_at (Created time — automático)

**Tabla 2: Daily_logs**
- id (Autonumber)
- student_id (Link to Students — seudonimización: solo vincula por id, no muestra datos personales)
- date (Date)
- task_description (Long text)
- hours_dedicated (Number — mínimo 0.5, máximo 12)
- competences_worked (Multiple select — lista de competencias del certificado)
- incidents (Long text — campo opcional)
- created_at (Created time — automático)

**Tabla 3: Teacher_feedback**
- id (Autonumber)
- log_id (Link to Daily_logs)
- feedback_text (Long text)
- status (Single select — opciones: pending / reviewed)
- created_at (Created time — automático)
- updated_at (Last modified time — automático)

3. Una vez creadas las tablas, guíame para insertar los datos ficticios de prueba que ya teníamos aprobados (Ana García y Carlos López con sus registros)

4. Al terminar, dime cómo verificar que todo está correcto

**Reglas RGPD que siguen aplicando:**
- Los registros diarios (Daily_logs) NO deben mostrar nombre ni email del alumno directamente — solo el vínculo por id
- El campo consent_given debe estar marcado en los datos de prueba
- Las fechas data_retention_until deben estar definidas (31/12/2026)

**Importante:** Un paso a la vez. Espera mi confirmación en cada paso antes de continuar.
