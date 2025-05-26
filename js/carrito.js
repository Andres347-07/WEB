// js/carrito.js
import Cart from "./cartSingleton.js";                             // <-- Agregado Singleton
import { NoDiscount, PercentageDiscount, FixedCoupon } from "./discountStrategies.js"; // <-- Agregado Strategy

const cart = new Cart();           // <-- Obtiene la instancia
let discountStrategy = new NoDiscount(); // <-- Estrategia por defecto

const contenedorCarritoVacio     = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones  = document.querySelector("#carrito-acciones");
const contenedorTotal            = document.querySelector("#total");
const botonVaciar               = document.querySelector("#carrito-acciones-vaciar");

// Modal y formulario siguen igual (no los listamos aquí para abreviar)

botonVaciar.addEventListener("click", () => {
  Swal.fire({
    title: '¿Estás seguro?',
    icon: 'question',
    html: `Se van a borrar ${cart.getItems().reduce((acc, p) => acc + p.cantidad, 0)} productos.`,
    showCancelButton: true,
    confirmButtonText: 'Sí',
    cancelButtonText: 'No'
  }).then(result => {
    if (result.isConfirmed) {
      cart.clear();             // <-- Vacía usando el singleton
      renderCarrito();
    }
  });
});

function renderCarrito() {
  const productos = cart.getItems();
  if (productos.length === 0) {
    contenedorCarritoVacio.classList.remove("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    return;
  }
  contenedorCarritoVacio.classList.add("disabled");
  contenedorCarritoProductos.classList.remove("disabled");
  contenedorCarritoAcciones.classList.remove("disabled");

  contenedorCarritoProductos.innerHTML = "";
  productos.forEach(prod => {
    const div = document.createElement("div");
    div.classList.add("carrito-producto");
    div.innerHTML = `
      <img class="carrito-producto-imagen" src="${prod.imagen}" alt="${prod.nombre}">
      <div class="carrito-producto-titulo"><small>Nombre</small><h3>${prod.nombre}</h3></div>
      <div class="carrito-producto-cantidad"><small>Cantidad</small><p>${prod.cantidad}</p></div>
      <div class="carrito-producto-precio"><small>Precio</small><p>$${prod.precio}</p></div>
      <div class="carrito-producto-subtotal"><small>Subtotal</small><p>$${prod.precio * prod.cantidad}</p></div>
      <button class="carrito-producto-eliminar" id="${prod.id}"><i class="bi bi-trash-fill"></i></button>
    `;
    contenedorCarritoProductos.append(div);
  });

  document.querySelectorAll(".carrito-producto-eliminar").forEach(btn => {
    btn.addEventListener("click", e => {
      cart.removeItem(e.currentTarget.id); // <-- Elimina usando singleton
      Toastify({ text: "Producto eliminado", duration: 3000, close: true }).showToast();
      renderCarrito();
    });
  });

  actualizarTotal();
}

function actualizarTotal() {
  const rawTotal   = cart.getRawTotal();
  const finalTotal = discountStrategy.calculate(rawTotal); // <-- Se aplica la Strategy
  contenedorTotal.innerText = `$${rawTotal.toLocaleString()} → $${finalTotal.toLocaleString()}`;
}
document.querySelector("#cupon").addEventListener("change", (e) => {
    const val = e.target.value;
    if (val === "none") 
      discountStrategy = new NoDiscount();
    else if (val.endsWith("%")) 
      discountStrategy = new PercentageDiscount(parseFloat(val));
    else 
      discountStrategy = new FixedCoupon(parseFloat(val));
    renderCarrito();
  });

renderCarrito();