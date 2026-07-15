# Finanz Frontend — Helpdesk CRM

Panel corporativo para la gestión de **clientes** y **tickets de soporte**, construido con React + Vite. Incluye un listado de clientes y un tablero Kanban de tickets, consumiendo una API REST mediante Axios.

## Tecnologías

- **React 19** + **Vite** (bundler y servidor de desarrollo)
- **React Router** para el enrutamiento de páginas
- **Tailwind CSS v4** para los estilos
- **Axios** para las peticiones HTTP
- **react-hot-toast** para las notificaciones
- **lucide-react** para los íconos

## Requisitos previos

- **Node.js 18 o superior** (recomendado 20+)
- **npm** (incluido con Node.js)
- El **backend** de la prueba corriendo y accesible (por defecto en `http://127.0.0.1:8000`)

## Instalación

1. Clona el repositorio y entra a la carpeta del proyecto:

```bash
git clone <url-del-repositorio>
cd finanz-frontend
```

2. Instala las dependencias:

```bash
npm install
```

## Configuración de variables de entorno

La URL del backend **no está quemada** en el código; se lee desde una variable de entorno.

1. Crea un archivo `.env` en la raíz del proyecto (puedes partir de la plantilla incluida):

```bash
cp .env.example .env
```

2. Ajusta la URL del backend si es necesario:

```env
VITE_API_URL=http://127.0.0.1:8000
```

> Nota: en Vite las variables deben tener el prefijo `VITE_`. Si cambias el `.env`, **reinicia** el servidor de desarrollo para que tome el nuevo valor.

## Ejecución

### Modo desarrollo

```bash
npm run dev
```

La app quedará disponible en `http://localhost:5173` (Vite mostrará la URL exacta en la consola).

### Compilar para producción

```bash
npm run build
```

Genera la versión optimizada en la carpeta `dist/`.

### Previsualizar el build de producción

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

### Pruebas automatizadas

```bash
npm run test
```

Para ejecutar las pruebas en modo watch durante el desarrollo:

```bash
npm run test:watch
```

## CI/CD (GitHub Actions)

El proyecto incluye un pipeline básico en `.github/workflows/ci.yml` que se ejecuta automáticamente en cada **push** y **pull request** hacia `main` o `master`.

El pipeline realiza los siguientes pasos:

1. **Instalación de dependencias** (`npm ci`)
2. **Ejecución del linter** (`npm run lint`)
3. **Ejecución de pruebas automatizadas** (`npm run test`)
4. **Compilación del proyecto** (`npm run build`) — paso adicional para verificar que el build no falle

No incluye despliegue automático.

## Funcionalidades

- **Clientes** (`/clients`)
  - Listado de clientes cargado desde el backend.
  - Búsqueda en vivo por nombre o empresa.
  - Registro de un nuevo cliente mediante un modal (con spinner y notificaciones de éxito/error).
- **Tickets de Soporte** (`/tickets`)
  - Tablero Kanban con tres estados: **Pendiente**, **En progreso** y **Finalizado**.
  - Creación de tickets asociados a un cliente.
  - Cambio de estado de un ticket directamente desde su tarjeta (se persiste en el backend).

## Endpoints consumidos

La app espera un backend con los siguientes endpoints (base: `VITE_API_URL`):

| Método | Ruta                     | Descripción                          |
| ------ | ------------------------ | ------------------------------------ |
| GET    | `/clientes`              | Lista de clientes                    |
| GET    | `/clientes/{id}`         | Detalle de un cliente                |
| POST   | `/clientes`             | Crear un cliente                     |
| GET    | `/tickets`               | Lista de tickets                     |
| POST   | `/tickets`               | Crear un ticket                      |
| PATCH  | `/tickets/{ticket_id}/estado` | Actualizar el estado de un ticket |

> Si tu backend corre en un host o puerto distinto, solo actualiza `VITE_API_URL` en el `.env`.
>
> El navegador puede bloquear las peticiones por **CORS** si el backend no habilita el origen del frontend (`http://localhost:5173`). Asegúrate de tener CORS configurado en el backend.

## Estructura del proyecto

```
src/
├── api/            # Configuración base de Axios (apiClient)
├── components/     # Componentes de UI reutilizables y por dominio
│   ├── ui/         # Button, Modal, Input, Select, Textarea, Badge, etc.
│   ├── clients/    # Tabla y modal de clientes
│   └── tickets/    # Tablero Kanban, tarjeta y modal de tickets
├── constants/      # Configuración de estados de tickets
├── layouts/        # Layout principal con la barra lateral
├── pages/          # Páginas Clients y Tickets
├── services/       # Llamados a la API (clientServices, ticketServices)
├── App.jsx         # Definición de rutas
└── main.jsx        # Punto de entrada
```

## Notas para el revisor

- Los **llamados a la API** están separados por dominio en `src/services/`, mientras que `src/api/apiClient.js` contiene únicamente la instancia de Axios.
- El manejo de errores se realiza con `try/catch` en la capa de servicios, propagando mensajes claros que se muestran al usuario mediante toasts.
- La URL del backend se gestiona por `.env` (no está quemada en el código).
