# SKILL 04 — Pruebas y Despliegue
## Proyecto Antigravity | Seguimiento de Prácticas Profesionales

---

## 🎯 PROPÓSITO DE ESTA SKILL

Guía a la IA para verificar que la aplicación funciona correctamente y publicarla en internet de forma gratuita. Se usa en el **Paso 4** de la construcción de la PoC. Solo se activa una vez confirmado el Paso 3 (interfaz funcionando).

---

## 🧠 ROL EN ESTE PASO

Actúa como un **ingeniero de QA (calidad) y DevOps**. Tu prioridad es verificar que la aplicación cumple los criterios de éxito del proyecto antes de presentarla a los stakeholders, y que cualquier persona pueda acceder a ella desde un enlace público.

---

## 🧪 PRUEBAS A REALIZAR

### Pruebas del Backend (API)

| Prueba | Endpoint | Qué verificar |
|---|---|---|
| Registro vacío rechazado | POST `/api/logs` | Devuelve error 400 si falta task_description |
| Registro con horas inválidas | POST `/api/logs` | Devuelve error si hours_dedicated = 0 o negativo |
| Feedback sobre registro inexistente | PUT `/api/logs/9999/feedback` | Devuelve error 404 |
| Resumen de clase con datos | GET `/api/reports/class-summary` | Devuelve array con métricas correctas |
| Registros de alumno inexistente | GET `/api/students/9999/logs` | Devuelve array vacío o error 404 |

### Pruebas del Frontend (interfaz)

| Prueba | Componente | Qué verificar |
|---|---|---|
| Lista de alumnos carga al entrar | TeacherPanel | Se muestran los alumnos de prueba |
| Formulario vacío no se envía | StudentPanel | Botón desactivado o mensaje de error |
| Feedback se guarda y actualiza | TeacherPanel | El estado cambia a "revisado" sin recargar |
| Vista en móvil (375px) | Todos | Sin desbordamientos ni elementos cortados |
| Login incorrecto muestra error | Login | Mensaje claro al usuario |

### Prueba de criterios de éxito del proyecto

| Criterio | Cómo verificarlo |
|---|---|
| Independencia tecnológica | El docente puede ver y modificar los datos desde Supabase directamente |
| Automatización operativa | Medir tiempo de generar informe de clase vs. proceso manual anterior |
| Trazabilidad | Comprobar que cada tarea tiene alumno, fecha, horas y competencias vinculadas |
| Usabilidad | Pedir a una persona sin formación técnica que registre una tarea |
| Centralización | Confirmar que todos los datos están en un único entorno |

---

## 🚀 DESPLIEGUE GRATUITO

### Frontend → Vercel
```
1. Crear cuenta en vercel.com
2. Conectar repositorio de GitHub
3. Seleccionar carpeta "frontend"
4. Hacer clic en Deploy
5. Obtener URL pública (ej: antigravity-app.vercel.app)
```

### Backend → Railway
```
1. Crear cuenta en railway.app
2. Nuevo proyecto → Deploy from GitHub
3. Seleccionar carpeta "backend"
4. Añadir variable de entorno DATABASE_URL
5. Obtener URL pública del backend
6. Actualizar la URL del backend en el frontend
```

### Base de datos → Supabase (ya configurado en Paso 1)
```
- Ya está en la nube desde el Paso 1
- Asegurarse de que Railway puede conectarse (configurar IP en Supabase si es necesario)
```

---

## ✅ REGLAS DE CALIDAD

1. **No desplegar sin pasar todas las pruebas del backend primero.**
2. **Usar variables de entorno** para todas las URLs — nunca hardcodear.
3. **Probar la app desplegada** con los datos ficticios antes de dar por finalizado.
4. **Documentar las URLs finales** en el fichero SKILL_ANTIGRAVITY_GLOBAL.md.
5. **Generar captura de pantalla** de la app funcionando en producción como evidencia.

---

## ⚠️ ERRORES COMUNES A EVITAR

- No olvidar actualizar la URL del backend en el frontend tras el despliegue
- No subir el archivo `.env` a GitHub (añadir a `.gitignore`)
- No desplegar con datos reales de alumnos
- No dar el proyecto por terminado sin probar en un dispositivo móvil real

---

## 📋 CHECKLIST FINAL DEL PROYECTO

Antes de presentar la PoC a los stakeholders, confirmar:

- [ ] Base de datos creada con 3 tablas y datos de prueba ✅
- [ ] API con 4 endpoints funcionando ✅
- [ ] Interfaz con flujo alumno y flujo docente ✅
- [ ] Pruebas automatizadas pasadas ✅
- [ ] App desplegada en Vercel + Railway ✅
- [ ] URL pública funcional y compartible ✅
- [ ] Criterios de éxito verificados ✅
- [ ] Capturas de pantalla como evidencia ✅

---

## 🔄 ENTREGABLE ESPERADO AL TERMINAR ESTE PASO

- [ ] URL pública de la app (frontend)
- [ ] URL pública de la API (backend)
- [ ] Capturas de pantalla de la app en producción
- [ ] Informe breve de pruebas realizadas y resultados

---

*SKILL 04 | Proyecto Antigravity | Ana Belén Fontana Pérez*
