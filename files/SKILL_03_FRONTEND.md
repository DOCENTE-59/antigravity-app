# SKILL 03 — Frontend (Interfaz de Usuario)
## Proyecto Antigravity | Seguimiento de Prácticas Profesionales

---

## 🎯 PROPÓSITO DE ESTA SKILL

Guía a la IA para crear la interfaz visual de la aplicación, pensada para ser usada a diario por docentes y alumnos desde el móvil. Se usa en el **Paso 3** de la construcción de la PoC. Solo se activa una vez confirmado el Paso 2 (API funcionando).

---

## 🧠 ROL EN ESTE PASO

Actúa como un **diseñador UI/UX y desarrollador frontend experto en React**. Tu prioridad es que la interfaz sea clara, rápida de usar y sin fricción para el usuario. El alumno debe poder registrar una tarea en menos de 2 minutos. El docente debe ver el estado de su clase de un vistazo.

---

## 🎨 ESTILO Y TONO VISUAL

| Elemento | Criterio |
|---|---|
| Vibe general | Clara, profesional, educativa |
| Paleta de color | Tonos verdes y blancos (transmite calma y confianza) |
| Tipografía | Sans-serif, legible en pantallas pequeñas |
| Tamaño mínimo de botones | 44px (apto para dedos en móvil) |
| Densidad de información | Baja — una cosa a la vez, sin saturar |
| Tono del texto | Cercano, sin tecnicismos |

---

## 📱 COMPONENTES A CREAR

### `Login.jsx`
- Formulario simple: email + contraseña
- Botón "Entrar como Alumno" y "Entrar como Docente"
- Sin registro público (el docente crea las cuentas)
- Mensaje de error claro si las credenciales son incorrectas

### `StudentPanel.jsx` — "Mi Panel"
**Sección superior: Nuevo registro**
- Campo: Fecha (por defecto hoy)
- Campo: Descripción de la tarea (textarea grande)
- Campo: Horas dedicadas (número, 1-10)
- Campo: Competencias trabajadas (lista desplegable o chips seleccionables)
- Campo: Incidencias (opcional, texto libre)
- Botón: "Guardar registro" (grande, prominente)

**Sección inferior: Mis registros anteriores**
- Feed cronológico de tareas pasadas
- Cada tarjeta muestra: fecha, tarea, horas, estado del feedback (pendiente / revisado)
- Si hay feedback del docente, se muestra en verde dentro de la tarjeta

### `TeacherPanel.jsx` — "Seguimiento de clase"
**Vista principal: Lista de alumnos**
- Tarjeta por alumno con: nombre, horas totales esta semana, última actividad, alertas
- Indicador visual si un alumno lleva más de 2 días sin registrar
- Botón "Ver detalle" por alumno

**Vista detalle de alumno:**
- Historial de registros ordenado por fecha
- Por cada registro: descripción, horas, competencias, incidencias
- Campo de texto para escribir feedback
- Botón "Marcar como revisado"
- Botón "Volver a la lista"

### `ReportPanel.jsx` — "Informe de clase" (acceso desde TeacherPanel)
- Tabla resumen: alumno, horas totales, tareas completadas, feedbacks pendientes
- Botón "Exportar" (fase posterior — mostrar desactivado con tooltip explicativo)

---

## 🔗 CONEXIÓN CON EL BACKEND

| Componente | Endpoint que consume |
|---|---|
| StudentPanel (nuevo registro) | POST `/api/logs` |
| StudentPanel (historial) | GET `/api/students/:id/logs` |
| TeacherPanel (lista clase) | GET `/api/reports/class-summary` |
| TeacherPanel (detalle alumno) | GET `/api/students/:id/logs` |
| TeacherPanel (feedback) | PUT `/api/logs/:id/feedback` |

---

## 📦 DEPENDENCIAS A INSTALAR

```bash
npm create vite@latest frontend -- --template react
cd frontend
npm install
npm install axios react-router-dom
```

---

## ✅ REGLAS DE CALIDAD

1. **Mostrar boceto de componentes como artefacto ANTES de codificar** — esperar aprobación.
2. **Diseño mobile-first** — probar siempre en vista estrecha (375px).
3. **Estados de carga:** mostrar "Cargando..." mientras se espera respuesta de la API.
4. **Estados de error:** mostrar mensaje amigable si falla la conexión.
5. **No avanzar al Paso 4** (pruebas) sin que el flujo alumno y el flujo docente funcionen de extremo a extremo.

---

## ⚠️ ERRORES COMUNES A EVITAR

- No crear botones demasiado pequeños (mínimo 44px de alto)
- No mostrar mensajes de error técnicos al usuario (traducirlos a lenguaje natural)
- No olvidar el estado de "sin registros aún" en el historial del alumno
- No mezclar la lógica de alumno y docente en el mismo componente

---

## 🔄 ENTREGABLE ESPERADO AL TERMINAR ESTE PASO

- [ ] Flujo completo del alumno funcionando (login → registro → historial)
- [ ] Flujo completo del docente funcionando (login → lista clase → feedback)
- [ ] Capturas de pantalla en vista móvil
- [ ] Confirmación de que los datos viajan correctamente entre frontend y backend

---

*SKILL 03 | Proyecto Antigravity | Ana Belén Fontana Pérez*
