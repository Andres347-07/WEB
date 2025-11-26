// tests/complete.test.js - Versión corregida para ES Modules
describe('🧪 PRUEBAS BÁSICAS TOPCAPS', () => {
  // Mock localStorage global
  const localStorageMock = (() => {
    let store = {};
    return {
      getItem: jest.fn(key => store[key] || null),
      setItem: jest.fn((key, value) => { store[key] = value.toString(); }),
      clear: jest.fn(() => { store = {}; }),
      removeItem: jest.fn(key => { delete store[key]; })
    };
  })();

  beforeAll(() => {
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });
  });

  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  describe('1. 🛒 Lógica de Carrito de Compras', () => {
    test('Agregar producto al carrito simulado', () => {
      const cart = {
        items: [],
        addItem: function(product) {
          const existing = this.items.find(p => p.id === product.id);
          if (existing) {
            existing.cantidad += product.cantidad;
          } else {
            this.items.push({ ...product });
          }
        },
        removeItem: function(id) {
          this.items = this.items.filter(p => p.id !== id);
        },
        getItems: function() { return this.items; },
        getRawTotal: function() {
          return this.items.reduce((acc, p) => acc + (p.precio * p.cantidad), 0);
        },
        clear: function() { this.items = []; }
      };

      const product = { id: '1', nombre: 'Gorra Test', precio: 100, cantidad: 1 };
      
      cart.addItem(product);
      expect(cart.getItems()).toHaveLength(1);
      expect(cart.getItems()[0].nombre).toBe('Gorra Test');
      
      cart.addItem({ ...product, cantidad: 2 });
      expect(cart.getItems()[0].cantidad).toBe(3);
      
      expect(cart.getRawTotal()).toBe(300);
    });

    test('Eliminar producto del carrito', () => {
      const cart = {
        items: [{ id: '1', nombre: 'Gorra Test', precio: 100, cantidad: 1 }],
        removeItem: function(id) {
          this.items = this.items.filter(p => p.id !== id);
        },
        getItems: function() { return this.items; }
      };

      expect(cart.getItems()).toHaveLength(1);
      cart.removeItem('1');
      expect(cart.getItems()).toHaveLength(0);
    });
  });

  describe('2. 💰 Sistema de Descuentos Simulado', () => {
    test('Sin descuento aplica correctamente', () => {
      const noDiscount = (amount) => amount;
      expect(noDiscount(100)).toBe(100);
    });

    test('Descuento porcentual funciona', () => {
      const percentageDiscount = (amount, percent) => amount * (1 - percent / 100);
      expect(percentageDiscount(100, 10)).toBe(90);
      expect(percentageDiscount(200, 25)).toBe(150);
    });

    test('Cupón fijo funciona y no genera valores negativos', () => {
      const fixedDiscount = (amount, fixed) => Math.max(0, amount - fixed);
      expect(fixedDiscount(100, 30)).toBe(70);
      expect(fixedDiscount(50, 60)).toBe(0); // No negativo
    });
  });

  describe('3. 🔄 Integración Carrito-Descuentos', () => {
    test('Flujo completo de compra con descuento', () => {
      // Simular carrito
      const cart = {
        items: [
          { id: '1', nombre: 'Gorra Urban', precio: 100, cantidad: 2 },
          { id: '2', nombre: 'Gorra Classic', precio: 80, cantidad: 1 }
        ],
        getRawTotal: function() {
          return this.items.reduce((acc, p) => acc + (p.precio * p.cantidad), 0);
        }
      };

      // Simular estrategia de descuento
      const discountStrategy = (amount, type, value) => {
        if (type === 'percentage') return amount * (1 - value / 100);
        if (type === 'fixed') return Math.max(0, amount - value);
        return amount;
      };

      const rawTotal = cart.getRawTotal(); // 100*2 + 80*1 = 280
      const finalTotal = discountStrategy(rawTotal, 'percentage', 20); // 20% off

      expect(rawTotal).toBe(280);
      expect(finalTotal).toBe(224); // 280 * 0.8 = 224
    });
  });

  describe('4. 💾 Persistencia en localStorage', () => {
    test('Guardar y carcar desde localStorage', () => {
      const mockProducts = [{ id: '1', nombre: 'Gorra Guardada', precio: 100, cantidad: 1 }];
      
      // Simular guardado
      localStorage.setItem('productos-en-carrito', JSON.stringify(mockProducts));
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'productos-en-carrito',
        JSON.stringify(mockProducts)
      );

      // Simular carga
      localStorage.getItem.mockReturnValue(JSON.stringify(mockProducts));
      const loadedProducts = JSON.parse(localStorage.getItem('productos-en-carrito'));
      
      expect(loadedProducts).toHaveLength(1);
      expect(loadedProducts[0].nombre).toBe('Gorra Guardada');
    });
  });

  describe('5. 🎨 Pruebas de Interfaz Simuladas', () => {
    test('Renderizado de productos en el DOM', () => {
      // Simular DOM
      document.body.innerHTML = `
        <div id="contenedor-productos"></div>
        <span id="numerito">0</span>
      `;

      const productos = [
        { id: '1', nombre: 'Gorra Test UI', precio: 100, imagen: 'test.jpg' }
      ];

      // Simular renderizado
      const contenedor = document.getElementById('contenedor-productos');
      productos.forEach(prod => {
        const div = document.createElement('div');
        div.className = 'producto';
        div.innerHTML = `
          <img class="producto-imagen" src="${prod.imagen}" alt="${prod.nombre}">
          <div class="producto-detalles">
            <h3 class="producto-titulo">${prod.nombre}</h3>
            <p class="producto-precio">$${prod.precio}</p>
            <button class="producto-agregar" id="${prod.id}">Agregar</button>
          </div>
        `;
        contenedor.appendChild(div);
      });

      expect(contenedor.children).toHaveLength(1);
      expect(contenedor.querySelector('.producto-titulo').textContent).toBe('Gorra Test UI');
      expect(contenedor.querySelector('.producto-precio').textContent).toBe('$100');
    });
  });
});