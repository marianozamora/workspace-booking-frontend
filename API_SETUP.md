# API Configuration Guide

## 🔧 Setup

### 1. Environment Variables

Copia el archivo de ejemplo y configura tus variables:

```bash
cp .env.example .env
```

Edita `.env` con tu configuración:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:3000
VITE_API_KEY=your-actual-api-key-here

# App Configuration
VITE_APP_NAME="Workspace Booking System"
VITE_APP_VERSION="1.0.0"

# Development
VITE_ENABLE_DEV_TOOLS=true
```

### 2. Backend Requirements

Asegúrate de que tu backend API:

- **Esté ejecutándose** en `http://localhost:3000` (o la URL configurada)
- **Soporte autenticación** vía header `X-API-Key`
- **Tenga un endpoint** `/health` para verificar conectividad
- **Devuelva respuestas** en el formato esperado

### 3. API Endpoints Esperados

```
GET /api/v1/spaces          # Obtener espacios
GET /api/v1/spaces/:id      # Obtener espacio por ID
POST /api/v1/spaces         # Crear espacio

GET /api/v1/bookings        # Obtener reservas (con paginación)
GET /api/v1/bookings/:id    # Obtener reserva por ID
POST /api/v1/bookings       # Crear reserva
PUT /api/v1/bookings/:id    # Actualizar reserva
DELETE /api/v1/bookings/:id # Eliminar reserva

GET /health                 # Health check
```

## 🚨 Troubleshooting

### Error: "Invalid or missing API Key"

**Causas posibles:**
1. API Key incorrecto en `.env`
2. Backend no configurado para ese API Key
3. Header `X-API-Key` no enviado correctamente

**Soluciones:**
1. Verifica que `VITE_API_KEY` en `.env` coincida con tu backend
2. Consulta con tu backend developer sobre el API Key correcto
3. Reinicia el servidor de desarrollo después de cambiar `.env`

### Error: "API Connection refused"

**Causas posibles:**
1. Backend no está ejecutándose
2. URL incorrecta en `VITE_API_BASE_URL`
3. Puerto incorrecto

**Soluciones:**
1. Inicia tu servidor backend
2. Verifica la URL en `.env`
3. Confirma que el puerto sea correcto

### Error: "Network Error"

**Causas posibles:**
1. CORS no configurado en el backend
2. Firewall bloqueando conexiones
3. Backend no accesible desde el frontend

**Soluciones:**
1. Configura CORS en tu backend para permitir requests desde `http://localhost:5173`
2. Verifica configuración de firewall
3. Prueba la API directamente con curl/Postman

## 🧪 Testing API Connection

La aplicación incluye verificación automática de la API. Revisa la consola del navegador para:

```
🔧 API Configuration:
  Base URL: http://localhost:3000
  API Key: dev-api-...
  Timeout: 10000ms
```

Si ves warnings, revisa tu configuración.

### Manual Testing

Puedes probar la conexión manualmente:

```javascript
// En la consola del navegador
import { testApiConnection } from './src/utils/apiConfig';
testApiConnection();
```

## 📋 API Response Format

### Espacios (Spaces)
```json
{
  "data": [
    {
      "id": "1",
      "name": "Meeting Room A",
      "location": "Floor 1",
      "capacity": 8,
      "description": "Conference room with projector",
      "active": true,
      "createdAt": "2023-01-01T00:00:00Z",
      "updatedAt": "2023-01-01T00:00:00Z"
    }
  ],
  "success": true
}
```

### Reservas (Bookings)
```json
{
  "data": {
    "bookings": [
      {
        "id": "1",
        "spaceId": "1", 
        "space": { /* space object */ },
        "clientEmail": "user@example.com",
        "date": "2023-12-01T00:00:00Z",
        "startTime": "09:00",
        "endTime": "10:00", 
        "status": "ACTIVE",
        "createdAt": "2023-01-01T00:00:00Z",
        "updatedAt": "2023-01-01T00:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 50,
      "totalPages": 5
    }
  },
  "success": true
}
```

## 🔐 Security Notes

- **Nunca** commits el archivo `.env` con API Keys reales
- **Usa** API Keys diferentes para desarrollo y producción
- **Considera** implementar autenticación JWT para mayor seguridad
- **Valida** todas las respuestas del API en el frontend

## 📝 Development vs Production

### Development
```env
VITE_API_BASE_URL=http://localhost:3000
VITE_API_KEY=dev-api-key-12345
```

### Production
```env
VITE_API_BASE_URL=https://api.yourdomain.com
VITE_API_KEY=prod-secure-api-key-xyz789
```