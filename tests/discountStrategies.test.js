// tests/discountStrategies.test.js
const { NoDiscount, PercentageDiscount, FixedCoupon } = require('../js/models/discountStrategies.js');

describe('Estrategias de Descuento', () => {
  describe('NoDiscount', () => {
    test('devuelve el mismo monto sin descuento', () => {
      const strategy = new NoDiscount();
      expect(strategy.calculate(100)).toBe(100);
      expect(strategy.calculate(50)).toBe(50);
    });
  });

  describe('PercentageDiscount', () => {
    test('aplica 20% de descuento correctamente', () => {
      const strategy = new PercentageDiscount(20);
      expect(strategy.calculate(100)).toBe(80);
      expect(strategy.calculate(50)).toBe(40);
    });

    test('aplica 50% de descuento correctamente', () => {
      const strategy = new PercentageDiscount(50);
      expect(strategy.calculate(100)).toBe(50);
    });

    test('maneja 0% de descuento', () => {
      const strategy = new PercentageDiscount(0);
      expect(strategy.calculate(100)).toBe(100);
    });
  });

  describe('FixedCoupon', () => {
    test('aplica descuento fijo de $30', () => {
      const strategy = new FixedCoupon(30);
      expect(strategy.calculate(100)).toBe(70);
      expect(strategy.calculate(50)).toBe(20);
    });

    test('no devuelve montos negativos', () => {
      const strategy = new FixedCoupon(50);
      expect(strategy.calculate(30)).toBe(0);
      expect(strategy.calculate(10)).toBe(0);
    });

    test('maneja descuento de $0', () => {
      const strategy = new FixedCoupon(0);
      expect(strategy.calculate(100)).toBe(100);
    });
  });
});