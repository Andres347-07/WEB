// assets/js/main.js

import { collection, onSnapshot } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";
import { db } from "../core/firebase-init.js";
import Cart from "../models/cartSingleton.js";

document.addEventListener("DOMContentLoaded", () => {
  const cart = new Cart(); 
  let productos = [];

  const contenedorProductos = document.querySelector("#contenedor-productos");
  const botonesCategorias   = document.querySelectorAll(".boton-categoria");
  const tituloPrincipal     = document.querySelector("#titulo-principal");
  const numerito            = document.querySelector("#numerito");

  actualizarNumerito();

  // Escuchar Firestore
  const productosRef = collection(db, "productos");

  onSnapshot(
    productosRef,
    (snapshot) => {
      productos = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));

      cargarProductos(productos);
    },
    (error) => console.error("Error al obtener productos:", error)
  );

  function cargarProductos(lista) {
    contenedorProductos.innerHTML = "";

    lista.forEach((producto) => {
      const div = document.createElement("div");
      div.classList.add("producto");

      div.innerHTML = `
        <img class="producto-imagen" 
             src="${producto.imagen || './assets/img/default-product.png'}" 
             alt="${producto.nombre}">
             
        <div class="producto-detalles">
          <h3 class="producto-titulo">${producto.nombre}</h3>
          <p class="producto-precio">$${producto.precio}</p>
          <button class="producto-agregar" data-id="${producto.id}">
            Agregar
          </button>
        </div>
      `;

      contenedorProductos.appendChild(div);
    });

    document.querySelectorAll(".producto-agregar").forEach((btn) => {
      btn.addEventListener("click", agregarAlCarrito);
    });
  }

  // Filtro de categorías
  botonesCategorias.forEach((boton) => {
    boton.addEventListener("click", (e) => {
      botonesCategorias.forEach((b) => b.classList.remove("active"));
      e.currentTarget.classList.add("active");

      const categoria = e.currentTarget.id;

      tituloPrincipal.innerText =
        categoria === "todos"
          ? "Todos los productos"
          : e.currentTarget.innerText;

      cargarProductos(
        categoria === "todos"
          ? productos
          : productos.filter((p) => p.categoria === categoria)
      );
    });
  });

  // Agregar al carrito
  function agregarAlCarrito(e) {
    const id = e.currentTarget.dataset.id;
    const producto = productos.find((p) => p.id === id);

    cart.addItem({ ...producto, cantidad: 1 });

    Toastify({
      text: "Producto agregado",
      duration: 3000,
      gravity: "top",
      position: "right",
      close: true,
      style: {
        background: "linear-gradient(to right, #334c54, #7c7e7d)",
        borderRadius: "2rem",
        textTransform: "uppercase",
        fontSize: ".75rem"
      }
    }).showToast();

    actualizarNumerito();
  }

  function actualizarNumerito() {
    const total = cart.getItems().reduce((acc, p) => acc + p.cantidad, 0);
    numerito.innerText = total;
  }
});
