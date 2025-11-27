import Cart from "../js/models/cartSingleton.js";

describe("Cart Singleton - Funcionalidades reales", () => {

  beforeEach(() => {
    // Limpia el estado entre tests
    localStorage.clear();

    // 🔥 Resetear el Singleton es obligatorio para evitar contaminación entre tests
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

