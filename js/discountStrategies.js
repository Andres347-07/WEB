// js/discountStrategies.js
export class NoDiscount {
    calculate(amount) {
      return amount;
    }
  }
  
  export class PercentageDiscount {
    constructor(percent) {
      this.percent = percent;
    }
    calculate(amount) {
      return amount * (1 - this.percent / 100);
    }
  }
  
  export class FixedCoupon {
    constructor(amountOff) {
      this.amountOff = amountOff;
    }
    calculate(amount) {
      return Math.max(0, amount - this.amountOff);
    }
  }