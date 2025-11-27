const Cart = require('../../js/models/cartSingleton.js').default;
const { NoDiscount, PercentageDiscount, FixedCoupon } = require('../../js/models/discountStrategies.js');

// Mock localStorage
const localStorageMock = {
  store: {},
  getItem: function(key) { return this.store[key] || null; },
  setItem: function(key, value) { this.store[key] = value.toString(); },
  clear: function() { this.store = {}; }
};
global.localStorage = localStorageMock;

describe('Integración Carrito + Descuentos - TopCaps', () => {
  let cart;

  beforeEach(() => {
    localStorage.clear();
    if (Cart._instance) {
      delete Cart._instance;
    }
    cart = new Cart();
  });

  test('TEST 1: Flujo completo de compra con productos reales', () => {
    // Productos reales de TopCaps
    const gorras = [
      { id: 'urban-1', nombre: 'Gorra Urban Black', precio: 25000, cantidad: 1 },
      { id: 'classic-1', nombre: 'Gorra Classic Navy', precio: 20000, cantidad: 2 }
    ];

    gorras.forEach(gorra => cart.addItem(gorra));
    
    expect(cart.getItems()).toHaveLength(2);
    expect(cart.getRawTotal()).toBe(65000); // 25000 + (20000*2)
  });

  test('TEST 2: Aplicar cupón de 10% de descuento', () => {
    cart.addItem({ id: '1', nombre: 'Gorra Test', precio: 30000, cantidad: 1 });
    
    const descuento10 = new PercentageDiscount(10);
    const totalConDescuento = descuento10.calculate(cart.getRawTotal());
    
    expect(totalConDescuento).toBe(27000); // 30000 - 10%
  });

  test('TEST 3: Cupón fijo de $5000', () => {
    cart.addItem({ id: '1', nombre: 'Gorra Premium', precio: 35000, cantidad: 1 });
    
    const cupon5000 = new FixedCoupon(5000);
    const totalConDescuento = cupon5000.calculate(cart.getRawTotal());
    
    expect(totalConDescuento).toBe(30000); // 35000 - 5000
  });

  test('TEST 4: Eliminar producto del carrito', () => {
    const gorra = { id: 'remove-test', nombre: 'Gorra a Eliminar', precio: 15000, cantidad: 1 };
    cart.addItem(gorra);
    
    expect(cart.getItems()).toHaveLength(1);
    
    cart.removeItem('remove-test');
    expect(cart.getItems()).toHaveLength(0);
  });

  test('TEST 5: Vaciar carrito completo', () => {
    const productos = [
      { id: '1', nombre: 'Gorra 1', precio: 10000, cantidad: 1 },
      { id: '2', nombre: 'Gorra 2', precio: 15000, cantidad: 2 }
    ];
    
    productos.forEach(p => cart.addItem(p));
    expect(cart.getItems()).toHaveLength(2);
    
    cart.clear();
    expect(cart.getItems()).toHaveLength(0);
    expect(cart.getRawTotal()).toBe(0);
  });
});
