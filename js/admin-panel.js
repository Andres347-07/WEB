// admin-dashboard.js
import { auth, db } from "./firebase-init.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      // Usuario logueado, obtenemos su uid
      const uid = user.uid;
      try {
        // Buscamos el documento del administrador en Firestore
        const docRef = doc(db, "administradores", uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const adminData = docSnap.data();
          const nombreCompleto = `${adminData.nombre} ${adminData.apellido}`;
          // Insertamos el nombre en el aside, debajo del logo
          document.getElementById("adminName").textContent = nombreCompleto;
        } else {
          console.error("No se encontró el documento del administrador.");
        }
      } catch (error) {
        console.error("Error al obtener datos del administrador:", error);
      }
    } else {
      // Si no hay usuario logueado, redirigimos al login
      window.location.href = "admin-login.html";
    }
  });
});
