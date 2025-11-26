// admin-products.js
import {
  collection,
  onSnapshot,
  addDoc,
  doc,
  getDoc,
  updateDoc,
  deleteDoc
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

import { db, storage } from "../../js/core/firebase-init.js";
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-storage.js";

document.addEventListener("DOMContentLoaded", () => {
  const tablaProductos = document.getElementById("tablaProductos");
  const formProducto = document.getElementById("formProducto");

  // Elementos UI
  const btnAgregarEditar = document.getElementById("btnAgregarEditar");
  const btnVerLista = document.getElementById("btnVerLista");
  const seccionAgregarEditar = document.getElementById("seccionAgregarEditar");
  const seccionLista = document.getElementById("seccionLista");

  let editStatus = false;
  let idProductoAEditar = "";

  // ----------------------------------------------------
  // 1. LISTAR PRODUCTOS EN TIEMPO REAL
  // ----------------------------------------------------
  function cargarProductos() {
    const productosRef = collection(db, "productos");
    onSnapshot(
      productosRef,
      (snapshot) => {
        tablaProductos.innerHTML = "";

        snapshot.forEach((docSnap) => {
          let producto = docSnap.data();
          producto.id = docSnap.id;

          const tr = document.createElement("tr");
          tr.innerHTML = `
           <td>
             <img src="${producto.imagen || '../../assets/img/default-product.png'}" 
                  alt="${producto.nombre}" width="50">
           </td>
            <td>${producto.nombre}</td>
            <td>${producto.categoria || "-"}</td>
            <td>$${producto.precio}</td>
            <td>${producto.cantidad || 0}</td>
            <td>
              <button data-id="${producto.id}" class="editar">Editar</button>
              <button data-id="${producto.id}" class="eliminar">Eliminar</button>
            </td>
          `;
          tablaProductos.appendChild(tr);
        });

        // Eventos de editar y eliminar
        document.querySelectorAll(".editar").forEach((btn) => {
          btn.addEventListener("click", (e) => {
            editarProducto(e.currentTarget.dataset.id);
          });
        });

        document.querySelectorAll(".eliminar").forEach((btn) => {
          btn.addEventListener("click", (e) => {
            eliminarProducto(e.currentTarget.dataset.id);
          });
        });
      },
      (error) => {
        console.error("Error al escuchar los productos:", error);
      }
    );
  }

  cargarProductos();

  // ----------------------------------------------------
  // 2. AGREGAR O EDITAR PRODUCTO
  // ----------------------------------------------------
  formProducto.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombreProducto").value;
    const descripcion = document.getElementById("descripcionProducto").value;
    const precio = parseFloat(document.getElementById("precioProducto").value);
    const cantidad = parseInt(document.getElementById("cantidadProducto").value);
    const categoria = document.getElementById("categoriaProducto").value;
    const imagenInput = document.getElementById("imagenProducto");

    // 🔥 CORREGIDO: NO más "", ahora será null si no hay imagen
    let imagenURL = null;
    const imagenFile = imagenInput.files[0];

    if (imagenFile) {
      try {
        const nombreImagen = `${Date.now()}_${imagenFile.name}`;
        const storageRef = ref(storage, `productos/${nombreImagen}`);

        await uploadBytes(storageRef, imagenFile);
        imagenURL = await getDownloadURL(storageRef);

      } catch (error) {
        console.warn("⚠ No se pudo subir la imagen. Storage no disponible:", error);
        imagenURL = null;
      }
    }

    if (editStatus) {
      // EDITAR PRODUCTO
      const docRef = doc(db, "productos", idProductoAEditar);

      const dataActualizada = {
        nombre,
        descripcion,
        precio,
        cantidad,
        categoria
      };

      // Solo actualizar imagen si se subió una
      if (imagenFile && imagenURL) {
        dataActualizada.imagen = imagenURL;
      }

      await updateDoc(docRef, dataActualizada);
      alert("Producto actualizado correctamente.");

      editStatus = false;
      idProductoAEditar = "";

    } else {
      // AGREGAR PRODUCTO NUEVO
      await addDoc(collection(db, "productos"), {
        nombre,
        descripcion,
        precio,
        cantidad,
        categoria,
        imagen: imagenURL   // <-- ahora es null si no hay imagen
      });

      alert("Producto agregado correctamente.");
    }

    formProducto.reset();

    // Alternar secciones
    seccionAgregarEditar.style.display = "none";
    seccionLista.style.display = "block";
    btnVerLista.style.display = "none";
    btnAgregarEditar.style.display = "inline-block";
  });

  // ----------------------------------------------------
  // 3. CARGAR PRODUCTO PARA EDITAR
  // ----------------------------------------------------
  async function editarProducto(id) {
    const docRef = doc(db, "productos", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const prod = docSnap.data();

      document.getElementById("nombreProducto").value = prod.nombre;
      document.getElementById("descripcionProducto").value = prod.descripcion || "";
      document.getElementById("precioProducto").value = prod.precio;
      document.getElementById("cantidadProducto").value = prod.cantidad;
      document.getElementById("categoriaProducto").value = prod.categoria || "";

      editStatus = true;
      idProductoAEditar = id;

      seccionAgregarEditar.style.display = "block";
      seccionLista.style.display = "none";
      btnAgregarEditar.style.display = "none";
      btnVerLista.style.display = "inline-block";
    } else {
      console.error("Producto no encontrado.");
    }
  }

  // ----------------------------------------------------
  // 4. ELIMINAR PRODUCTO
  // ----------------------------------------------------
  async function eliminarProducto(id) {
    if (confirm("¿Estás seguro de eliminar este producto?")) {
      const docRef = doc(db, "productos", id);
      await deleteDoc(docRef);
      alert("Producto eliminado correctamente.");
    }
  }
});
