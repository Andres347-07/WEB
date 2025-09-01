// js/carrito.js
import Cart from "../models/cartSingleton.js"; 
import { NoDiscount, PercentageDiscount, FixedCoupon } from "../models/discountStrategies.js";

const cart = new Cart();                     // <-- Singleton
let discountStrategy = new NoDiscount();    // <-- Estrategia por defecto

const contenedorCarritoVacio     = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones  = document.querySelector("#carrito-acciones");
const contenedorTotal            = document.querySelector("#total");
const botonVaciar                = document.querySelector("#carrito-acciones-vaciar");

// Listener de vaciar carrito
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
      cart.clear();
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

  // Listener para eliminar productos
  document.querySelectorAll(".carrito-producto-eliminar").forEach(btn => {
    btn.addEventListener("click", e => {
      cart.removeItem(e.currentTarget.id);
      Toastify({ text: "Producto eliminado", duration: 3000, close: true }).showToast();
      renderCarrito();
    });
  });

  // Listener botón comprar
  const botonComprar = document.querySelector("#carrito-acciones-comprar");
  if (botonComprar) {
    botonComprar.addEventListener("click", () => {
      if(cart.getItems().length === 0) return;
      Swal.fire({
        icon: "success",
        title: "Compra realizada",
        html: `Gracias por tu compra de ${cart.getItems().reduce((acc,p)=>acc+p.cantidad,0)} productos!`
      });
      cart.clear();
      renderCarrito();
    });
  }

  actualizarTotal();
}

function actualizarTotal() {
  const rawTotal   = cart.getRawTotal();
  const finalTotal = discountStrategy.calculate(rawTotal);
  contenedorTotal.innerText = `$${rawTotal.toLocaleString()} → $${finalTotal.toLocaleString()}`;
}

// Listener para cupones
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

// Render inicial
renderCarrito();
