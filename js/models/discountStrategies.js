// js/models/discountStrategies.js - VERIFICA que tenga module.exports
class NoDiscount {
    calculate(amount) {
      return amount;
    }
  }
  
  class PercentageDiscount {
    constructor(percent) {
      this.percent = percent;
    }
    calculate(amount) {
      return amount * (1 - this.percent / 100);
    }
  }
  
  class FixedCoupon {
    constructor(amountOff) {
      this.amountOff = amountOff;
    }
    calculate(amount) {
      return Math.max(0, amount - this.amountOff);
    }
  }

// ✅ ESTA LÍNEA DEBE ESTAR AL FINAL
module.exports = { NoDiscount, PercentageDiscount, FixedCoupon };