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
import { db, storage } from "../../js/core/firebase-init.js"; // se ajusto la ruta
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-storage.js";

document.addEventListener("DOMContentLoaded", () => {
  const tablaProductos = document.getElementById("tablaProductos");
  const formProducto = document.getElementById("formProducto");
  
  // Elementos para alternar secciones
  const btnAgregarEditar = document.getElementById("btnAgregarEditar");
  const btnVerLista = document.getElementById("btnVerLista");
  const seccionAgregarEditar = document.getElementById("seccionAgregarEditar");
  const seccionLista = document.getElementById("seccionLista");

  let editStatus = false;       // Para distinguir entre agregar y editar
  let idProductoAEditar = "";   // Guarda el ID del producto a editar

  // 1. Listar productos en tiempo real desde Firestore
  function cargarProductos() {
    const productosRef = collection(db, "productos");
    onSnapshot(productosRef, (snapshot) => {
      tablaProductos.innerHTML = ""; // Limpia la tabla antes de actualizar

      snapshot.forEach((docSnap) => {
        let producto = docSnap.data();
        producto.id = docSnap.id;
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td><img src="${producto.imagen || 'ruta_default.jpg'}" alt="${producto.nombre}" width="50"></td>
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

      // Asignar eventos a los botones de editar y eliminar
      const btnsEditar = document.querySelectorAll(".editar");
      const btnsEliminar = document.querySelectorAll(".eliminar");

      btnsEditar.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const id = e.currentTarget.dataset.id;
          editarProducto(id);
        });
      });

      btnsEliminar.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const id = e.currentTarget.dataset.id;
          eliminarProducto(id);
        });
      });
    }, (error) => {
      console.error("Error al escuchar los productos: ", error);
    });
  }

  cargarProductos();

  //  Manejo del formulario para agregar o editar producto
  formProducto.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombreProducto").value;
    const descripcion = document.getElementById("descripcionProducto").value;
    const precio = parseFloat(document.getElementById("precioProducto").value);
    const cantidad = parseInt(document.getElementById("cantidadProducto").value);
    const categoria = document.getElementById("categoriaProducto").value; // Nuevo campo categoría
    const imagenInput = document.getElementById("imagenProducto");
    let imagenURL = "";
    const imagenFile = imagenInput.files[0];

    if (imagenFile) {
      // Subir imagen a Storage
      const nombreImagen = `${Date.now()}_${imagenFile.name}`;
      const storageRef = ref(storage, `productos/${nombreImagen}`);
      await uploadBytes(storageRef, imagenFile);
      imagenURL = await getDownloadURL(storageRef);
    }

    if (editStatus) {
      // Editar producto existente
      const docRef = doc(db, "productos", idProductoAEditar);
      await updateDoc(docRef, {
        nombre,
        descripcion,
        precio,
        cantidad,
        categoria,
        ...(imagenFile && { imagen: imagenURL })
      });
      alert("Producto actualizado correctamente.");
      editStatus = false;
      idProductoAEditar = "";
    } else {
      // Agregar nuevo producto
      await addDoc(collection(db, "productos"), {
        nombre,
        descripcion,
        precio,
        cantidad,
        categoria,
        imagen: imagenURL
      });
      alert("Producto agregado correctamente.");
    }

    formProducto.reset();

    // Tras guardar, mostramos la lista y ocultamos el formulario
    seccionAgregarEditar.style.display = "none";
    seccionLista.style.display = "block";
    btnVerLista.style.display = "none";
    btnAgregarEditar.style.display = "inline-block";
  });

  // 3. Función para editar un producto: rellena el formulario con los datos actuales
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

      // Mostramos el formulario y ocultamos la lista
      seccionAgregarEditar.style.display = "block";
      seccionLista.style.display = "none";
      btnAgregarEditar.style.display = "none";
      btnVerLista.style.display = "inline-block";
    } else {
      console.error("Producto no encontrado.");
    }
  }

  // 4. Función para eliminar un producto
  async function eliminarProducto(id) {
    if (confirm("¿Estás seguro de eliminar este producto?")) {
      const docRef = doc(db, "productos", id);
      await deleteDoc(docRef);
      alert("Producto eliminado correctamente.");
    }
  }
});
