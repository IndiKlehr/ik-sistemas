# IK Sistemas — Klehr Indira Ayelén

Sitio web oficial del atelier tecnológico. Estructura modular, segura y mantenible.

## Estructura
ik-sistemas/
├── *.html Páginas
├── css/ Estilos (main + components)
├── js/ Scripts separados por responsabilidad
├── partials/ Header y footer compartidos
└── assets/ Imágenes, fuentes


## Cómo ejecutar en local

Como `layout.js` usa `fetch()`, **no se puede abrir con `file://`**. Hay que servir por HTTP:

```bash
# Opción 1: Python
python -m http.server 8000

# Opción 2: Node
npx serve

# Opción 3: Live Server de VSCode



---

## 🛡️ Resumen de protecciones implementadas

| Capa | Medida | Archivo |
|---|---|---|
| **Servidor** | Cabeceras CSP, X-Frame-Options, HSTS | `.htaccess` / `netlify.toml` / `vercel.json` |
| **Servidor** | Bloqueo de archivos sensibles (`.env`, `.git`) | `.htaccess` |
| **Servidor** | HTTPS forzado (comentado, activar tras SSL) | `.htaccess` |
| **Cliente** | Anti-clickjacking (rompe iframes) | `js/security.js` |
| **Cliente** | Sanitización de query strings | `js/security.js` |
| **Cliente** | Bloqueo de formularios a dominios externos | `js/security.js` |
| **Cliente** | Anti-drag de imágenes | `js/security.js` |
| **Código** | `rel="noopener noreferrer"` en todos los `_blank` | Todos los HTML |
| **Código** | `<meta name="referrer">` | Todos los HTML |
| **Código** | JS separado (permite CSP estricta) | Estructura general |

> ⚠️ **Nota importante:** Las protecciones del `security.js` son **disuasivas** (cliente). Un atacante con acceso a DevTools puede saltarlas. La **única protección real** es la del servidor (`.htaccess`) y nunca exponer secretos en el frontend. No hay tokens, claves ni contraseñas en este código, así que está bien.