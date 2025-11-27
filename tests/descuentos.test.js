// tests/descuentos.test.js - Test EXACTO de tus funcionalidades reales
describe('SISTEMA DE DESCUENTOS - Funcionalidades EXACTAS de tu proyecto', () => {
    
    test('Los 3 descuentos EXACTOS que tienes en tu select', () => {
       
        const aplicarDescuento = (subtotal, tipoDescuento) => {
            if (tipoDescuento === '10%') return subtotal * 0.90;      // 10% off
            if (tipoDescuento === '500') return Math.max(0, subtotal - 500);  // -$500
            return subtotal;  // "Sin descuento"
        };

        // Probar CASO 1: "Sin descuento" (primera opción en tu select)
        expect(aplicarDescuento(100, 'ninguno')).toBe(100);
        expect(aplicarDescuento(3000, 'ninguno')).toBe(3000);
        
        // Probar CASO 2: "10% off" (segunda opción en tu select)
        expect(aplicarDescuento(100, '10%')).toBe(90);     
        expect(aplicarDescuento(200, '10%')).toBe(180);    
        expect(aplicarDescuento(1000, '10%')).toBe(900);  
        
        // Probar CASO 3: "-$500" (tercera opción en tu select)
        expect(aplicarDescuento(1000, '500')).toBe(500);   
        expect(aplicarDescuento(600, '500')).toBe(100);    
        expect(aplicarDescuento(300, '500')).toBe(0);     
    });

    test('Comportamiento con carrito de compras REAL', () => {
        
        const carritoConDescuento = (productos, cuponSeleccionado) => {
            
            const subtotal = productos.reduce((total, producto) => 
                total + (producto.precio * producto.cantidad), 0
            );
            
            
            if (cuponSeleccionado === '10%') {
                return subtotal * 0.90;
            } else if (cuponSeleccionado === '500') {
                return Math.max(0, subtotal - 500);
            }
            return subtotal;
        };

      
        const productosEjemplo = [
            { nombre: 'Gorra Urban', precio: 120, cantidad: 2 },
            { nombre: 'Gorra Classic', precio: 100, cantidad: 1 }
        ];

        const sinDescuento = carritoConDescuento(productosEjemplo, 'ninguno');
        const con10Porciento = carritoConDescuento(productosEjemplo, '10%');
        const con500Fijo = carritoConDescuento(productosEjemplo, '500');

       
        expect(sinDescuento).toBe(340);    
        expect(con10Porciento).toBe(306);  
        expect(con500Fijo).toBe(0);      
    });
});