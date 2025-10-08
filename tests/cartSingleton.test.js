// tests/cartSingleton.test.js
const Cart = require('../js/models/cartSingleton.js');

// Mock de localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: jest.fn((key) => store[key] || null),
    setItem: jest.fn((key, value) => {
      store[key] = value.toString();
    }),
    clear: jest.fn(() => {
      store = {};
    }),
    // ✅ AGREGAR para limpiar específico
    removeItem: jest.fn((key) => {
      delete store[key];
    })
  };
})();

Object.defineProperty(global, 'localStorage', {
  value: localStorageMock
});

// ✅ SOLUCIÓN AL PROBLEMA DEL SINGLETON: Resetear entre tests
beforeEach(() => {
  localStorage.clear();
  // Limpiar la instancia singleton
  if (Cart._instance) {
    Cart._instance = null;
  }
});

describe('Carrito de Compras', () => {
  let cart;

  beforeEach(() => {
    cart = new Cart();
  });

  describe('Patrón Singleton', () => {
    test('siempre devuelve la misma instancia', () => {
      const cart1 = new Cart();
      const cart2 = new Cart();
      expect(cart1).toBe(cart2);
    });
  });

  describe('Agregar productos', () => {
    test('agrega un producto nuevo al carrito', () => {
      const product = { id: 1, nombre: 'Gorra Nike', precio: 25, cantidad: 1 };
      cart.addItem(product);
      
      const items = cart.getItems();
      expect(items).toHaveLength(1);
      expect(items[0]).toEqual(product);
    });

    test('incrementa cantidad si el producto ya existe', () => {
      const product = { id: 1, nombre: 'Gorra Nike', precio: 25, cantidad: 1 };
      
      cart.addItem(product);
      cart.addItem({ ...product, cantidad: 2 });
      
      const items = cart.getItems();
      expect(items).toHaveLength(1);
      expect(items[0].cantidad).toBe(3); // 1 + 2
    });

    test('maneja productos diferentes correctamente', () => {
      const product1 = { id: 1, nombre: 'Gorra Nike', precio: 25, cantidad: 1 };
      const product2 = { id: 2, nombre: 'Gorra Adidas', precio: 30, cantidad: 1 };
      
      cart.addItem(product1);
      cart.addItem(product2);
      
      const items = cart.getItems();
      expect(items).toHaveLength(2);
    });
  });

  describe('Remover productos', () => {
    beforeEach(() => {
      // Setup común para pruebas de remover
      cart.addItem({ id: 1, nombre: 'Gorra Nike', precio: 25, cantidad: 1 });
      cart.addItem({ id: 2, nombre: 'Gorra Adidas', precio: 30, cantidad: 1 });
    });

    test('remueve un producto por id', () => {
      cart.removeItem(1);
      expect(cart.getItems()).toHaveLength(1);
      expect(cart.getItems()[0].id).toBe(2);
    });

    test('no hace nada si el producto no existe', () => {
      const itemsAntes = cart.getItems().length;
      cart.removeItem(999);
      expect(cart.getItems()).toHaveLength(itemsAntes);
    });
  });

  describe('Cálculos de total', () => {
    test('calcula total correctamente con un producto', () => {
      cart.addItem({ id: 1, nombre: 'Gorra Nike', precio: 25, cantidad: 2 });
      expect(cart.getRawTotal()).toBe(50); // 25 * 2
    });

    test('calcula total correctamente con múltiples productos', () => {
      cart.addItem({ id: 1, nombre: 'Gorra Nike', precio: 25, cantidad: 2 });
      cart.addItem({ id: 2, nombre: 'Gorra Adidas', precio: 30, cantidad: 1 });
      expect(cart.getRawTotal()).toBe(80); // (25*2) + (30*1)
    });

    test('devuelve 0 cuando el carrito está vacío', () => {
      expect(cart.getRawTotal()).toBe(0);
    });
  });

  describe('Limpiar carrito', () => {
    test('vacía completamente el carrito', () => {
      cart.addItem({ id: 1, nombre: 'Gorra Nike', precio: 25, cantidad: 2 });
      cart.addItem({ id: 2, nombre: 'Gorra Adidas', precio: 30, cantidad: 1 });
      
      cart.clear();
      
      expect(cart.getItems()).toHaveLength(0);
      expect(cart.getRawTotal()).toBe(0);
    });
  });
});