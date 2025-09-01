# 🧢 TOPCAPS 

Este proyecto consiste en el desarrollo e implementación de un prototipo digital de **E-commerce para la gestión y venta de gorras y accesorios**.  

---

## Tecnologías principales
- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **Backend/BD:** Firebase (Auth, Firestore, Hosting)
- **Arquitectura:** Modular (MVC adaptado con controladores, modelos y vistas)

---
# TopCaps - Refactorización Inicial (1)

## Problema identificado
El código original estaba mal estructurado: las carpetas y archivos no seguían un orden lógico, lo que dificultaba la mantenibilidad y extensión del proyecto.

## Refactorización realizada
Se reorganizó toda la estructura de carpetas y archivos para que el proyecto sea más claro y modular, facilitando la gestión de scripts, modelos y vistas. Esta es la base para futuras mejoras y refactorizaciones.


## 📂 Estructura Refactorizada del proyecto

TOPCAPS-Refactorizacion/
│ index.html
│ carrito.html
│ firebase.json
│ .firebaserc
│ .gitignore
│ 404.html
│
├───admin/ # Módulo administrativo
│ ├───views/ # Vistas del administrador
│ │   admin-login.html
│ │   admin-orders.html
│ │   admin-panel.html
│ │   admin-products.html
│ │   admin-stock.html
│ │
│ └───controllers/ # Controladores de la lógica admin
│     admin-login.js
│     admin-orders.js
│     admin-panel.js
│     admin-products.js
│     admin-stock.js
│
├───assets/ # Recursos estáticos (imágenes, íconos, etc.)
│ │
│ └───css/ # Estilos globales
│     main.css
│
├───js/ # Scripts generales
│ │
│ ├───core/ # Núcleo de la aplicación
│ │   firebase-init.js # Configuración de Firebase
│ │   menu.js # Lógica del menú principal
│ │   main.js # Inicializador general
│ │
│ └───models/ # Lógica de negocio / patrones
│     cartSingleton.js # Patrón Singleton para carrito 
│     discountStrategies.js # Estrategias de descuentos
│
└───controllers/ # Controladores principales del cliente
carrito.js



---

## 🔑 Funcionalidades principales
- **Tienda online** con carrito de compras.
- **Gestión de usuarios** mediante Firebase Authentication.
- **Panel administrativo** para control de productos, stock y pedidos.
- **Descuentos y promociones** aplicados mediante estrategias configurables.


---


👥 Autores

Diego Andrés Peñaranda Soto

Jailuz Chiquinquirá Colina Graciano

Proyecto académico - FESC (Fundación de Estudios Superiores Comfanorte)
