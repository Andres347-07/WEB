const { NoDiscount, PercentageDiscount, FixedCoupon } = require('../../../js/models/discountStrategies.js');

describe('Discount Strategies - TopCaps', () => {
  test('NoDiscount debería retornar el monto original', () => {
    const strategy = new NoDiscount();
    expect(strategy.calculate(1000)).toBe(1000);
    expect(strategy.calculate(25000)).toBe(25000);
  });

  test('PercentageDiscount debería aplicar 10% de descuento', () => {
    const strategy = new PercentageDiscount(10);
    expect(strategy.calculate(1000)).toBe(900);
    expect(strategy.calculate(20000)).toBe(18000);
  });

  test('FixedCoupon debería restar monto fijo', () => {
    const strategy = new FixedCoupon(500);
    expect(strategy.calculate(1000)).toBe(500);
    expect(strategy.calculate(300)).toBe(0);
  });

  test('PercentageDiscount 50% debería aplicar mitad de precio', () => {
    const strategy = new PercentageDiscount(50);
    expect(strategy.calculate(10000)).toBe(5000);
  });
});
