// assets/js/models/cartSingleton.js

class Cart {
  constructor() {
    // Si ya existe una instancia, se devuelve
    if (Cart._instance) {
      return Cart._instance;
    }

    // Primera inicialización
    this.items = JSON.parse(localStorage.getItem("productos-en-carrito")) || [];

    Cart._instance = this;
  }

  addItem(product) {
    const index = this.items.findIndex((p) => p.id === product.id);

    if (index !== -1) {
      // Si ya existe, solo aumenta la cantidad
      this.items[index].cantidad += product.cantidad;
    } else {
      // Si no existe, se agrega
      this.items.push({ ...product });
    }

    this._save();
  }

  removeItem(id) {
    this.items = this.items.filter((p) => p.id !== id);
    this._save();
  }

  clear() {
    this.items = [];
    this._save();
  }

  getItems() {
    return this.items;
  }

  getRawTotal() {
    return this.items.reduce(
      (acc, p) => acc + p.precio * p.cantidad,
      0
    );
  }

  _save() {
    localStorage.setItem("productos-en-carrito", JSON.stringify(this.items));
  }
}

// Export correcto para Jest y navegador
if (typeof module !== "undefined") {
  module.exports = Cart;
}

export default Cart;
