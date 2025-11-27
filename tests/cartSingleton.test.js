// tests/cartSingleton.test.js
import Cart from "./../js/models/cartSingleton.js";


// Mock de localStorage
const mockLocalStorage = {
  store: {},
  getItem(key) {
    return this.store[key] || null;
  },
  setItem(key, value) {
    this.store[key] = value;
  },
  clear() {
    this.store = {};
  }
};

describe("Cart Singleton - Funcionalidades reales", () => {

  beforeEach(() => {
    global.localStorage = mockLocalStorage;
    mockLocalStorage.clear();

    // 🔥 Resetear el Singleton en cada test
    Cart._instance = null;
  });

  test("Agregar producto al carrito agrega el item correctamente", () => {
    const cart = new Cart();

    cart.addItem({ id: "p1", nombre: "Urban", precio: 120, cantidad: 1 });

    expect(cart.getItems().length).toBe(1);
    expect(cart.getItems()[0].id).toBe("p1");
    expect(cart.getItems()[0].cantidad).toBe(1);
  });

  test("Agregar el mismo producto aumenta la cantidad", () => {
    const cart = new Cart();

    cart.addItem({ id: "p2", nombre: "Urban", precio: 120, cantidad: 1 });
    cart.addItem({ id: "p2", nombre: "Urban", precio: 120, cantidad: 2 });

    expect(cart.getItems()[0].cantidad).toBe(3);
  });

  test("removeItem elimina un producto por su ID", () => {
    const cart = new Cart();

    cart.addItem({ id: "p3", nombre: "Urban", precio: 120, cantidad: 1 });
    cart.removeItem("p3");

    expect(cart.getItems().length).toBe(0);
  });

  test("clear vacía completamente el carrito", () => {
    const cart = new Cart();

    cart.addItem({ id: "p4", nombre: "Urban", precio: 120, cantidad: 1 });
    cart.addItem({ id: "p5", nombre: "Classic", precio: 100, cantidad: 1 });

    cart.clear();

    expect(cart.getItems().length).toBe(0);
  });

  test("getRawTotal calcula el total bruto correctamente", () => {
    const cart = new Cart();

    cart.addItem({ id: "p6", nombre: "Urban", precio: 120, cantidad: 2 }); // 240
    cart.addItem({ id: "p7", nombre: "Classic", precio: 100, cantidad: 1 }); // 100

    expect(cart.getRawTotal()).toBe(340);
  });

  test("Los items se guardan correctamente en localStorage", () => {
    const cart = new Cart();

    cart.addItem({ id: "p7", nombre: "Urban", precio: 120, cantidad: 1 });

    const guardado = JSON.parse(localStorage.getItem("productos-en-carrito"));

    expect(guardado.length).toBe(1);
    expect(guardado[0].id).toBe("p7");
  });
});


beforeEach(() => {
    global.localStorage = mockLocalStorage;
    mockLocalStorage.clear();

    
    Cart._instance = null;
});


test("Agregar producto al carrito agrega el item correctamente", () => {
    const cart = new Cart();

    cart.addItem({
        id: "p1",
        nombre: "Gorra Negra",
        precio: 100,
        cantidad: 1
    });

    expect(cart.getItems().length).toBe(1);
    expect(cart.getItems()[0].id).toBe("p1");
});


test("Agregar el mismo producto aumenta la cantidad", () => {
    const cart = new Cart();

    cart.addItem({ id: "p2", nombre: "Urban", precio: 120, cantidad: 1 });
    cart.addItem({ id: "p2", nombre: "Urban", precio: 120, cantidad: 2 });

    expect(cart.getItems()[0].cantidad).toBe(3);
});


test("removeItem elimina un producto por su ID", () => {
    const cart = new Cart();

    cart.addItem({ id: "p3", nombre: "Gorra Roja", precio: 80, cantidad: 1 });
    cart.removeItem("p3");

    expect(cart.getItems().length).toBe(0);
});


test("clear vacía completamente el carrito", () => {
    const cart = new Cart();

    cart.addItem({ id: "p4", nombre: "Gorra Azul", precio: 90, cantidad: 2 });

    cart.clear();

    expect(cart.getItems().length).toBe(0);
});


test("getRawTotal calcula el total bruto correctamente", () => {
    const cart = new Cart();

    cart.addItem({ id: "p5", nombre: "Classic", precio: 50, cantidad: 2 });
    cart.addItem({ id: "p6", nombre: "Urban", precio: 100, cantidad: 1 });

    expect(cart.getRawTotal()).toBe(200);
});


test("Los items se guardan correctamente en localStorage", () => {
    const cart = new Cart();

    cart.addItem({
        id: "p7",
        nombre: "Gorra Blanca",
        precio: 110,
        cantidad: 1
    });

    const guardado = JSON.parse(localStorage.getItem("productos-en-carrito"));

    expect(guardado.length).toBe(1);
    expect(guardado[0].id).toBe("p7");
});
