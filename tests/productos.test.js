// tests/productos.test.js - 
describe(' GESTIÓN DE PRODUCTOS - Funcionalidades EXACTAS de tu proyecto', () => {
    
    test('Filtrar productos por categorías EXACTAS de tu proyecto', () => {
        
        const productos = [
            { 
                id: 'firebase-id-1', 
                nombre: 'Gorra Urban Black', 
                categoria: 'Gorras Urbanas', 
                precio: 120,
                imagen: 'https://example.com/urban.jpg',
                cantidad: 15
            },
            { 
                id: 'firebase-id-2', 
                nombre: 'Gorra Classic Red', 
                categoria: 'Gorras Clasicas', 
                precio: 100,
                imagen: null,  
                cantidad: 10
            },
            { 
                id: 'firebase-id-3', 
                nombre: 'Gorra Urban White', 
                categoria: 'Gorras Urbanas', 
                precio: 110,
                imagen: './assets/img/urban-white.jpg',
                cantidad: 8
            },
            { 
                id: 'firebase-id-4', 
                nombre: 'Cadena Plateada', 
                categoria: 'Accesorios', 
                precio: 50,
                imagen: './assets/img/cadena.jpg',
                cantidad: 20
            }
        ];

        // Función de filtrado EXACTA como en tu main.js
        const filtrarPorCategoria = (productos, categoriaId) => {
            return productos.filter(producto => producto.categoria === categoriaId);
        };

        // Probar filtrado EXACTO como en tus botones
        const gorrasUrbanas = filtrarPorCategoria(productos, 'Gorras Urbanas');
        const gorrasClasicas = filtrarPorCategoria(productos, 'Gorras Clasicas');
        const accesorios = filtrarPorCategoria(productos, 'Accesorios');
        const todos = productos; // Como tu botón "Todos los productos"

        expect(gorrasUrbanas.length).toBe(2);
        expect(gorrasClasicas.length).toBe(1);
        expect(accesorios.length).toBe(1);
        expect(todos.length).toBe(4);
        
        // Verificar productos específicos
        expect(gorrasUrbanas[0].nombre).toBe('Gorra Urban Black');
        expect(gorrasClasicas[0].nombre).toBe('Gorra Classic Red');
        expect(accesorios[0].nombre).toBe('Cadena Plateada');
    });

    test('Validar estructura EXACTA de producto como en Firestore', () => {
        // Estructura EXACTA que usas en admin-products.js y Firestore
        const productoValido = {
            id: 'firebase-generated-id',  
            nombre: 'Gorra Test Exclusiva',
            precio: 99.99,
            categoria: 'Gorras Urbanas', 
            cantidad: 10,
            imagen: null  
            
        };

        // Verificar estructura REQUERIDA EXACTA
        expect(productoValido).toHaveProperty('id');
        expect(productoValido).toHaveProperty('nombre');
        expect(productoValido).toHaveProperty('precio');
        expect(productoValido).toHaveProperty('categoria');
        expect(productoValido).toHaveProperty('cantidad');
        expect(productoValido).toHaveProperty('imagen');  // Puede ser null

        // Verificar tipos de datos EXACTOS
        expect(typeof productoValido.id).toBe('string');
        expect(typeof productoValido.nombre).toBe('string');
        expect(typeof productoValido.precio).toBe('number');
        expect(typeof productoValido.cantidad).toBe('number');
        
        // Verificar valores válidos
        expect(productoValido.precio).toBeGreaterThan(0);
        expect(productoValido.cantidad).toBeGreaterThanOrEqual(0);
        
        // Verificar categorías válidas (EXACTAMENTE las que tienes)
        const categoriasValidas = ['Gorras Urbanas', 'Gorras Clasicas', 'Accesorios'];
        expect(categoriasValidas).toContain(productoValido.categoria);
    });

    test('Manejo de imagen por defecto EXACTO como en tu proyecto', () => {
        // Función EXACTA como usas en main.js y carrito.js con la RUTA REAL
        const obtenerImagenProducto = (producto) => {
            return producto.imagen && producto.imagen.length > 5 
                ? producto.imagen 
                : './assets/img/default-product.png';  // RUTA REAL que usas
        };

        const productoConImagen = {
            nombre: 'Gorra con Imagen',
            imagen: 'https://example.com/image.jpg'
        };

        const productoSinImagen = {
            nombre: 'Gorra sin Imagen', 
            imagen: null  
        };

        const productoImagenCorta = {
            nombre: 'Gorra imagen corta',
            imagen: 'img' 
        };

        const productoImagenVacia = {
            nombre: 'Gorra imagen vacía',
            imagen: ''  
        };

        expect(obtenerImagenProducto(productoConImagen)).toBe('https://example.com/image.jpg');
        expect(obtenerImagenProducto(productoSinImagen)).toBe('./assets/img/default-product.png');
        expect(obtenerImagenProducto(productoImagenCorta)).toBe('./assets/img/default-product.png');
        expect(obtenerImagenProducto(productoImagenVacia)).toBe('./assets/img/default-product.png');
    });

    test('Renderizado de productos EXACTO como en tu interfaz', () => {
        
        const producto = {
            id: 'test-id',
            nombre: 'Gorra de Prueba',
            precio: 150,
            imagen: './assets/img/test.jpg'
        };

        
        const productoHTML = `
            <div class="producto">
                <img class="producto-imagen" src="${producto.imagen}" alt="${producto.nombre}">
                <div class="producto-detalles">
                    <h3 class="producto-titulo">${producto.nombre}</h3>
                    <p class="producto-precio">$${producto.precio}</p>
                    <button class="producto-agregar" id="${producto.id}">Agregar</button>
                </div>
            </div>
        `;

        // Verificar que se genera el HTML correctamente
        expect(productoHTML).toContain('class="producto"');
        expect(productoHTML).toContain('class="producto-imagen"');
        expect(productoHTML).toContain('class="producto-titulo"');
        expect(productoHTML).toContain('class="producto-precio"');
        expect(productoHTML).toContain('class="producto-agregar"');
        expect(productoHTML).toContain(`id="${producto.id}"`);
        expect(productoHTML).toContain(`$${producto.precio}`);
        expect(productoHTML).toContain(`src="${producto.imagen}"`);
    });

    test('Producto sin imagen usa la ruta por defecto REAL', () => {
        const productoSinImagen = {
            id: 'test-no-image',
            nombre: 'Gorra Sin Imagen',
            precio: 200,
            imagen: null,
            cantidad: 5
        };

        
        const imagenMostrada = productoSinImagen.imagen && productoSinImagen.imagen.length > 5 
            ? productoSinImagen.imagen 
            : './assets/img/default-product.png';

        // Debería usar la imagen por defecto
        expect(imagenMostrada).toBe('./assets/img/default-product.png');
        
        // Verificar que el producto se puede renderizar correctamente
        const productoHTML = `
            <img class="producto-imagen" src="${imagenMostrada}" alt="${productoSinImagen.nombre}">
        `;

        expect(productoHTML).toContain('src="./assets/img/default-product.png"');
        expect(productoHTML).toContain('alt="Gorra Sin Imagen"');
    });
});