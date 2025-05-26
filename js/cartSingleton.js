// js/cartSingleton.js
export default class Cart {
    constructor() {
      if (Cart._instance) return Cart._instance;
      this.items = JSON.parse(localStorage.getItem("productos-en-carrito")) || [];
      Cart._instance = this;
    }
  
    addItem(product) {
      const idx = this.items.findIndex(p => p.id === product.id);
      if (idx !== -1) {
        this.items[idx].cantidad += product.cantidad;
      } else {
        this.items.push(product);
      }
      this._save();
    }
  
    removeItem(id) {
      this.items = this.items.filter(p => p.id !== id);
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
      return this.items.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
    }
  
    _save() {
      localStorage.setItem("productos-en-carrito", JSON.stringify(this.items));
    }
  }