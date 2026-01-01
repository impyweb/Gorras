# Tienda de Gorras Online

Gorras Chidas es una tienda online de gorras que permite a los clientes explorar el catálogo, realizar compras de manera segura mediante Stripe y, al mismo tiempo, brinda a los empleados la capacidad de actualizar el stock de forma manual. El proyecto está organizado en dos partes principales:

- **Frontend**: sitio estático con HTML, CSS y JS, alojado en GitHub Pages.
- **Backend**: Web Service en Render con Python y SQLite, maneja la lógica, pagos con Stripe y la base de datos.

---

## Estructura del proyecto

```
prototipo/
├── backend/
│ ├── app.py # Servidor principal (API, login, Stripe)
│ ├── auth.py # Funciones de autenticación empleados
│ ├── db.py # Funciones para conectar y manejar SQLite
│ ├── stripe_webhook.py # Manejo de webhooks de Stripe
│ ├── requirements.txt # Dependencias Python
│
├── frontend/
│ ├── css/
│ │ └── styles.css
│ ├── images/
│ │ └── imagen1.png #etc
│ ├── js/
│ │ └── script.js
│ ├── videos/
│ │ └── videos1.mp4 #etc
├── acerca.html
├── catalogo.html
├── contacto.html
├── gorras.html
├── index.html
├── modificardor.html
├── politicas.html
├── terminos.html
├── licence
├── .gitignore
├── terminos.html
│
└── README.md # Este archivo

            ┌───────────────────────────┐
            │        Cliente            │
            │ Navegador / Usuario Final │
            └─────────┬─────────────────┘
                      │ Accede al sitio
                      ▼
            ┌───────────────────────────┐
            │       Web Service         │
            │  (Render, Backend + HTML)│
            └─────────┬─────────────────┘
                      │
          ┌───────────┼───────────┐
          │                       │
Verifica stock SQLite       Panel de empleados
          │                       │
          ▼                       ▼
   ┌───────────────┐       ┌───────────────┐
   │   Persistent   │       │ Persistent    │
   │    Disk con    │       │ Disk con      │
   │  database.db   │       │ database.db   │
   └───────────────┘       └───────────────┘
          │                       │
          ▼                       ▼
    SQLite: products,           SQLite: products,
    product_images, orders       stock_adjustments
          │                       │
          ▼                       │
  Actualiza stock automáticamente │
  tras compra Stripe              │
                                  │
                                  ▼
                        Actualiza stock manual
                        y registra historial
                                  │
                                  ▼
                        Cambios visibles para
                        clientes en Web Service

---------------------------------------------
            ┌───────────────┐
            │   Stripe      │
            │  Checkout     │
            └───────┬───────┘
                    │
                    ▼
      Pago exitoso → Web Service recibe webhook
                    │
                    ▼
             Actualiza SQLite
             orders + stock

```

## Configuración y despliegue

### Backend (Render)

1. Crear cuenta en [Render](https://render.com) y conectar tu repositorio GitHub con la carpeta `backend/`.
2. Crear un **Persistent Disk** para almacenar `database.db` y evitar pérdida de datos.
3. Configurar Web Service para que ejecute `app.py`.
4. Configurar variables de entorno necesarias para Stripe (por ejemplo, claves API).
5. Desplegar y probar que la API funciona (endpoints para productos, stock, pagos, login).

### Frontend (GitHub Pages)

1. Crear repositorio con la carpeta `frontend/`.
2. Activar GitHub Pages para servir el sitio estático.
3. Asegurarse que los archivos JS hagan peticiones al backend en Render (URL correcta).
4. Probar navegación, catálogo, compra y panel de empleados.

---

## Tecnologías usadas

- Python (Flask)
- SQLite para base de datos ligera
- Stripe para pagos en línea
- GitHub Pages para frontend estático
- Render para backend y hosting persistente

---

## Uso

- Clientes pueden navegar y comprar gorras.
- Empleados pueden hacer login y actualizar stock con un panel simple.
- El stock se actualiza automáticamente tras cada compra y manualmente desde el panel.
- Todos los ajustes manuales quedan registrados en la base de datos (`stock_adjustments`).

---

## Consideraciones

- SQLite está montado en Persistent Disk para evitar pérdida de datos en reinicios.
- La autenticación del panel de empleados es básica, se recomienda mejorar para producción.
- Stripe debe configurarse con claves reales para producción.
- Mantener copias de seguridad periódicas de la base de datos.

---

## Ejecutar el backend con Gunicorn

Para producción, se recomienda usar **Gunicorn**, que es un servidor WSGI confiable para ejecutar aplicaciones Flask. Esto permite manejar múltiples solicitudes simultáneamente y es más seguro que el servidor de desarrollo de Flask.

### Comando para ejecutar el backend

Con el entorno virtual activado, navegar a la carpeta `backend/` y ejecutar:

```bash
gunicorn --workers 3 --bind 0.0.0.0:8000 app:app
