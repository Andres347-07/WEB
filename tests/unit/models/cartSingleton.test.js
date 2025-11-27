// Para export default transformado por Babel
const Cart = require('../../../js/models/cartSingleton.js').default;

// Mock de localStorage
const localStorageMock = {
  store: {},
  getItem: function(key) { return this.store[key] || null; },
  setItem: function(key, value) { this.store[key] = value.toString(); },
  clear: function() { this.store = {}; }
};
global.localStorage = localStorageMock;

describe('Cart Singleton - TopCaps', () => {
  let cart;
  
  beforeEach(() => {
    localStorage.clear();
    // Limpiar instancia singleton
    if (typeof Cart === 'function' && Cart._instance) {
      delete Cart._instance;
    }
    cart = new Cart();
  });

  test('debería ser una instancia singleton', () => {
    const cart1 = new Cart();
    const cart2 = new Cart();
    expect(cart1).toBe(cart2);
  });

  test('debería agregar productos al carrito', () => {
    const product = { 
      id: '1', 
      nombre: 'Gorra Urban Test', 
      precio: 25000, 
      cantidad: 1 
    };
    
    cart.addItem(product);
    const items = cart.getItems();
    
    expect(items).toHaveLength(1);
    expect(items[0].nombre).toBe('Gorra Urban Test');
    expect(items[0].precio).toBe(25000);
  });

  test('debería calcular el total bruto correctamente', () => {
    const products = [
      { id: '1', nombre: 'Gorra 1', precio: 10000, cantidad: 2 },
      { id: '2', nombre: 'Gorra 2', precio: 15000, cantidad: 1 }
    ];
    
    products.forEach(p => cart.addItem(p));
    expect(cart.getRawTotal()).toBe(35000);
  });

  test('debería persistir en localStorage', () => {
    const product = { 
      id: 'test-1', 
      nombre: 'Gorra Test', 
      precio: 15000, 
      cantidad: 2 
    };
    
    cart.addItem(product);
    expect(localStorage.store['productos-en-carrito']).toContain('Gorra Test');
  });
});
