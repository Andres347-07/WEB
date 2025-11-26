// js/models/discountStrategies.js

// Sin descuento
export class NoDiscount {
    calculate(amount) {
        return amount;
    }
}

// Descuento porcentual
export class PercentageDiscount {
    constructor(percent) {
        this.percent = percent;
    }
    calculate(amount) {
        return amount * (1 - this.percent / 100);
    }
}

// Cupón fijo (resta un valor específico)
export class FixedCoupon {
    constructor(amountOff) {
        this.amountOff = amountOff;
    }
    calculate(amount) {
        return Math.max(0, amount - this.amountOff);
    }
}
