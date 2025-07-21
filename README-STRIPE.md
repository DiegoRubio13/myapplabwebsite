# Configuración de Pagos con Stripe

## Pasos para activar los pagos:

### 1. Crear cuenta en Stripe
1. Ve a https://stripe.com
2. Crea una cuenta
3. Completa la verificación de tu empresa

### 2. Obtener las claves API
1. En el dashboard de Stripe, ve a "Developers" > "API keys"
2. Copia tu **Publishable key** (empieza con `pk_`)
3. Copia tu **Secret key** (empieza con `sk_`)

### 3. Configurar las claves en el código

**En script.js línea 747:**
```javascript
const stripe = Stripe('TU_PUBLISHABLE_KEY_AQUI');
```

**En server.js línea 2:**
```javascript
const stripe = require('stripe')('TU_SECRET_KEY_AQUI');
```

### 4. Instalar dependencias
```bash
npm install
```

### 5. Ejecutar el servidor
```bash
npm start
```

### 6. Acceder al sitio
Ve a: http://localhost:3000

## Precios configurados:
- Website: $5,950 MXN
- App iOS: $9,950 MXN  
- App Dual: $11,950 MXN
- App Premium: $14,950 MXN

## Para producción:
1. Cambia las claves de prueba (`pk_test_` y `sk_test_`) por las de producción (`pk_live_` y `sk_live_`)
2. Configura los webhooks en Stripe para confirmación de pagos
3. Implementa SSL/HTTPS en tu servidor

## Comisiones de Stripe:
- México: 3.6% + $3 MXN por transacción exitosa