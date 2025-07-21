# MyAppLab Website

Sitio web profesional para MyAppLab con integración de pagos mediante Stripe.

## 🚀 Configuración en Netlify

### 1. Variables de Entorno

Ve a Netlify → Site configuration → Environment variables y agrega:

- `STRIPE_SECRET_KEY`: Tu clave secreta de Stripe (empieza con `sk_test_` para pruebas o `sk_live_` para producción)

### 2. Configurar Stripe

1. Crea una cuenta en [Stripe](https://stripe.com)
2. Obtén tus claves API desde el dashboard de Stripe
3. Agrega la clave secreta en las variables de entorno de Netlify

### 3. Actualizar el Frontend

En tu código JavaScript donde manejas los pagos, actualiza la URL para usar la función de Netlify:

```javascript
// En lugar de:
// fetch('http://localhost:3000/create-checkout-session', ...)

// Usa:
fetch('/.netlify/functions/create-checkout-session', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    price: 10000, // en centavos (100.00 MXN)
    name: 'Nombre del servicio',
    currency: 'mxn'
  })
})
```

### 4. Agregar Stripe.js a tu HTML

En tu `index.html`, agrega antes del cierre de `</body>`:

```html
<script src="https://js.stripe.com/v3/"></script>
```

## 📝 Estructura del Proyecto

```
/
├── index.html          # Página principal
├── styles.css          # Estilos
├── script.js           # JavaScript del frontend
├── success.html        # Página de pago exitoso
├── netlify.toml        # Configuración de Netlify
└── netlify/
    └── functions/
        └── create-checkout-session.js  # Función serverless para Stripe
```

## 🔧 Desarrollo Local

Para desarrollo local, puedes usar:

```bash
npm start
```

Esto iniciará el servidor Express en `http://localhost:3000`

## 💳 Pruebas de Pago

Para probar los pagos, usa las tarjetas de prueba de Stripe:

- Número: `4242 4242 4242 4242`
- Fecha: Cualquier fecha futura
- CVC: Cualquier 3 dígitos
- ZIP: Cualquier código postal

## 🌐 Dominio Personalizado

El sitio está configurado para usar el dominio `myapplabmx.com`

## 📞 Soporte

Si necesitas ayuda, contacta a: soporte@myapplabmx.com
