// tests/complete.test.js
import Cart from '../js/models/cartSingleton.js';
import { NoDiscount, PercentageDiscount, FixedCoupon } from '../js/models/discountStrategies.js';

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: jest.fn(key => store[key] || null),
    setItem: jest.fn((key, value) => { store[key] = value.toString(); }),
    clear: jest.fn(() => { store = {}; }),
    removeItem: jest.fn(key => { delete store[key]; })
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('🧪 SUITE DE PRUEBAS COMPLETA - TOPCAPS', () => {
  
  beforeEach(() => {
    localStorage.clear();
    // Reset Singleton instance
    if (Cart._instance) {
      Cart._instance = null;
    }
  });

  describe('1. 🛒 CARRITO DE COMPRAS', () => {
    test('Singleton pattern funciona correctamente', () => {
      const cart1 = new Cart();
      const cart2 = new Cart();
      
      expect(cart1).toBe(cart2);
      expect(Cart._instance).toBeDefined();
    });

    test('Agregar producto al carrito', () => {
      const cart = new Cart();
      const product = { id: '1', nombre: 'Gorra Test', precio: 100, cantidad: 1 };
      
      cart.addItem(product);
      const items = cart.getItems();
      
      expect(items).toHaveLength(1);
      expect(items[0].nombre).toBe('Gorra Test');
    });

    test('Eliminar producto del carrito', () => {
      const cart = new Cart();
      const product = { id: '1', nombre: 'Gorra Test', precio: 100, cantidad: 1 };
      
      cart.addItem(product);
      expect(cart.getItems()).toHaveLength(1);
      
      cart.removeItem('1');
      expect(cart.getItems()).toHaveLength(0);
    });

    test('Calcular total correctamente', () => {
      const cart = new Cart();
      const products = [
        { id: '1', nombre: 'Gorra 1', precio: 100, cantidad: 2 },
        { id: '2', nombre: 'Gorra 2', precio: 50, cantidad: 3 }
      ];
      
      products.forEach(p => cart.addItem(p));
      const total = cart.getRawTotal();
      
      expect(total).toBe(100 * 2 + 50 * 3); // 200 + 150 = 350
    });
  });

  describe('2. 💰 SISTEMA DE DESCUENTOS', () => {
    test('Sin descuento aplica correctamente', () => {
      const strategy = new NoDiscount();
      expect(strategy.calculate(100)).toBe(100);
    });

    test('Descuento porcentual funciona', () => {
      const strategy = new PercentageDiscount(10); // 10% off
      expect(strategy.calculate(100)).toBe(90);
    });

    test('Cupón fijo funciona', () => {
      const strategy = new FixedCoupon(50); // $50 off
      expect(strategy.calculate(100)).toBe(50);
    });

    test('Cupón no genera valores negativos', () => {
      const strategy = new FixedCoupon(150); // $150 off de $100
      expect(strategy.calculate(100)).toBe(0);
    });
  });

  describe('3. 🔄 INTEGRACIÓN CARRITO-DESCUENTOS', () => {
    test('Integración completa funciona', () => {
      const cart = new Cart();
      const discount = new PercentageDiscount(20); // 20% off
      
      cart.addItem({ id: '1', nombre: 'Gorra', precio: 100, cantidad: 2 });
      
      const rawTotal = cart.getRawTotal(); // 200
      const finalTotal = discount.calculate(rawTotal); // 160
      
      expect(rawTotal).toBe(200);
      expect(finalTotal).toBe(160);
    });
  });

  describe('4. 💾 PERSISTENCIA LOCALSTORAGE', () => {
    test('Carrito persiste en localStorage', () => {
      const cart = new Cart();
      const product = { id: '1', nombre: 'Gorra Persistente', precio: 100, cantidad: 1 };
      
      cart.addItem(product);
      
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'productos-en-carrito',
        JSON.stringify([product])
      );
    });

    test('Carrito carga desde localStorage', () => {
      const mockProducts = [{ id: '1', nombre: 'Gorra Guardada', precio: 100, cantidad: 1 }];
      localStorage.getItem.mockReturnValue(JSON.stringify(mockProducts));
      
      const cart = new Cart();
      const items = cart.getItems();
      
      expect(items).toHaveLength(1);
      expect(items[0].nombre).toBe('Gorra Guardada');
    });
  });
});

// Pruebas de interfaz simulada
describe('5. 🎨 PRUEBAS DE INTERFAZ SIMULADAS', () => {
  test('Renderizado de productos simulado', () => {
    document.body.innerHTML = `
      <div id="contenedor-productos"></div>
      <span id="numerito">0</span>
    `;
    
    const productos = [
      { id: '1', nombre: 'Gorra Test', precio: 100, imagen: 'test.jpg' }
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
    expect(contenedor.querySelector('.producto-titulo').textContent).toBe('Gorra Test');
  });
});