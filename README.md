# 🧢 TOPCAPS 

Este proyecto consiste en el desarrollo e implementación de un prototipo digital de **E-commerce para la gestión y venta de gorras y accesorios**.  

# 🧢 TOPCAPS 

Este proyecto consiste en el desarrollo e implementación de un prototipo digital de **E-commerce para la gestión y venta de gorras y accesorios**.  



🚀 Características Principales
🛒 Módulo de Ventas
Carrito de compras con patrón Singleton

Gestión de productos y cantidades

Persistencia en localStorage

Cálculos automáticos de totales

🎯 Sistema de Descuentos
Múltiples estrategias de descuento

Cupones promocionales

Descuentos porcentuales y fijos

Integración completa con el carrito

⚙ Panel Administrativo
Gestión de productos

Control de inventario

Administración de pedidos

Sistema de autenticación

📊 Estado del Proyecto
Módulo	Estado	Cobertura
Carrito de Compras	✅ Completado	100%
Estrategias de Descuento	✅ Completado	100%
Integración Carrito-Descuentos	✅ Completado	100%
Servicio de Cupones	✅ Completado	100%
🛠 Tecnologías Utilizadas
Frontend: HTML5, CSS3, JavaScript ES6+

Testing: Jest + Coverage Reports

Persistencia: localStorage + Firebase (pendiente)

Arquitectura: MVC + Singleton Pattern

📁 Estructura del Proyecto
text
gorras-ecommerce/
├── 📁 admin/                   # Panel administrativo
│   ├── 📁 views/              # Vistas del admin
│   └── 📁 controllers/        # Lógica del admin
├── 📁 assets/                 # Recursos estáticos
│   └── 📁 css/               # Estilos globales
├── 📁 js/                     # Lógica de la aplicación
│   ├── 📁 core/              # Núcleo de la app
│   └── 📁 models/            # Modelos de negocio
├── 📁 tests/                  # Suite de pruebas
│   ├── cartSingleton.test.js
│   ├── discountStrategies.test.js
│   └── cartDiscountIntegration.test.js
└── 📁 controllers/            # Controladores principales
🧪 Sistema de Testing
Pruebas Implementadas
17 pruebas unitarias - Todas pasando ✅

100% cobertura en módulos críticos

Pruebas de integración entre componentes

Mocking de dependencias (localStorage)


---------------------------------------------------------------------------------------------------------

🔧 Cambios realizados (actualización reciente)
🔹 1. Manejo de imagen opcional y fallback por defecto

Se corrigió el manejo del campo imagen para evitar errores cuando Firebase Storage no está disponible.
Cambios principales:

admin-products.js ahora maneja la carga de imagen dentro de try/catch.

Si no se sube imagen, se guarda imagen: null en Firestore.

Al editar, la imagen solo se actualiza si se selecciona una nueva.

En la visualización de productos y carrito, se utiliza:

const imagen = producto.imagen && producto.imagen.length > 5 
    ? producto.imagen 
    : "./assets/img/default-product.png";


Se añadió la imagen por defecto: ./assets/img/default-product.png.

🔹 2. Corrección del filtrado por categorías

El sistema de categorías fue corregido para que los botones coincidan con los valores almacenados en Firestore.
Se aplicaron dos ajustes:

Normalización del texto en main.js para que no falle por mayúsculas, espacios o tildes.

Revisión de IDs de botones en index.html.

🔹 3. Migración completa a ES Modules

Se reemplazó module.exports por export en los módulos:

cartSingleton.js

discountStrategies.js

Esto soluciona problemas de importación en el navegador y hace consistente el uso de type="module".

🔹 4. Mejoras en carrito y vista de productos

Carrito y tienda ahora muestran siempre una imagen válida, incluso si el producto no tiene foto subida.

Se unificó el manejo del fallback para evitar rutas rotas o imágenes vacías.

🔹 5. Ajustes administrativos

Eliminado el required del input de imagen en el panel admin.

Corrección de flujo al alternar entre lista y edición de productos.

Mensajes de alerta y manejo de errores más robusto.

🔹 6. Revisión final de tests

Confirmada compatibilidad de los tests existentes con la migración a ES Modules.

Mocking adecuado de localStorage y reinicio del Singleton entre pruebas.





👥 Autores

Diego Andrés Peñaranda Soto

Jailuz Chiquinquirá Colina Graciano

Proyecto académico - FESC (Fundación de Estudios Superiores Comfanorte)

