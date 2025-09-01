// js/main.js
import { collection, onSnapshot } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";
import { db } from "../core/firebase-init.js";          // <-- Ajuste de ruta
import Cart from "../models/cartSingleton.js";           // <-- Ajuste de ruta


document.addEventListener("DOMContentLoaded", () => {
  const cart = new Cart();            // <-- Instancia Singleton
  let productos = [];
  const contenedorProductos = document.querySelector("#contenedor-productos");
  const botonesCategorias   = document.querySelectorAll(".boton-categoria");
  const tituloPrincipal     = document.querySelector("#titulo-principal");
  const numerito            = document.querySelector("#numerito");

  // Inicializa el numerito desde el carrito
  actualizarNumerito();

  // Escuchar la colección "productos"
  const productosRef = collection(db, "productos");
  onSnapshot(productosRef, (snapshot) => {
    productos = [];
    snapshot.forEach((docSnap) => {
      let producto = docSnap.data();
      producto.id = docSnap.id;
      productos.push(producto);
    });
    cargarProductos(productos);
  }, (error) => {
    console.error("Error al obtener productos: ", error);
  });

  function cargarProductos(productosElegidos) {
    contenedorProductos.innerHTML = "";
    productosElegidos.forEach(producto => {
      const div = document.createElement("div");
      div.classList.add("producto");
      div.innerHTML = `
        <img class="producto-imagen" src="${producto.imagen}" alt="${producto.nombre}">
        <div class="producto-detalles">
          <h3 class="producto-titulo">${producto.nombre}</h3>
          <p class="producto-precio">$${producto.precio}</p>
          <button class="producto-agregar" id="${producto.id}">Agregar</button>
        </div>
      `;
      contenedorProductos.append(div);
    });
    document.querySelectorAll(".producto-agregar").forEach(boton => {
      boton.addEventListener("click", agregarAlCarrito);
    });
  }

  // Filtrar por categoría (igual que antes)
  botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {
      botonesCategorias.forEach(b => b.classList.remove("active"));
      e.currentTarget.classList.add("active");
      if (e.currentTarget.id !== "todos") {
        const filtrados = productos.filter(p => p.categoria === e.currentTarget.id);
        tituloPrincipal.innerText = e.currentTarget.innerText;
        cargarProductos(filtrados);
      } else {
        tituloPrincipal.innerText = "Todos los productos";
        cargarProductos(productos);
      }
    });
  });

  function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(p => p.id === idBoton);
    productoAgregado.cantidad = 1;
    cart.addItem(productoAgregado);      // <-- Uso del singleton

    Toastify({
      text: "Producto agregado",
      duration: 3000,
      close: true,
      gravity: "top",
      position: "right",
      stopOnFocus: true,
      style: {
        background: "linear-gradient(to right, #334c54, #7c7e7d)",
        borderRadius: "2rem",
        textTransform: "uppercase",
        fontSize: ".75rem"
      },
      offset: { x: '1.5rem', y: '1.5rem' }
    }).showToast();

    actualizarNumerito();
  }

  function actualizarNumerito() {
    const totalCant = cart.getItems().reduce((acc, p) => acc + p.cantidad, 0);
    numerito.innerText = totalCant;
  }
});