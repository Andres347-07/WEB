// admin-login.js
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import {
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";
import { auth, db } from "./firebase-init.js";

document.addEventListener("DOMContentLoaded", () => {
  // =======================
  // LOGIN
  // =======================
  const loginForm = document.getElementById("loginForm");
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Login exitoso
        window.location.href = "admin-panel.html"; // Ajusta la ruta
      })
      .catch((error) => {
        alert(error.message);
      });
  });

  // =======================
  // MODAL DE REGISTRO
  // =======================
  const linkRegister = document.getElementById("linkRegister");
  const modalRegister = document.getElementById("modalRegister");
  const closeRegister = document.getElementById("closeRegister");

  linkRegister.addEventListener("click", () => {
    modalRegister.style.display = "flex";
  });
  closeRegister.addEventListener("click", () => {
    modalRegister.style.display = "none";
  });

  // =======================
  // MODAL DE RECUPERACIÓN
  // =======================
  const linkReset = document.getElementById("linkReset");
  const modalReset = document.getElementById("modalReset");
  const closeReset = document.getElementById("closeReset");

  linkReset.addEventListener("click", () => {
    modalReset.style.display = "flex";
  });
  closeReset.addEventListener("click", () => {
    modalReset.style.display = "none";
  });

  // =======================
  // REGISTRO CON EMAIL Y PASSWORD
  // =======================
  const registerForm = document.getElementById("registerForm");
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const regNombre = document.getElementById("regNombre").value;
    const regApellido = document.getElementById("regApellido").value;
    const regEmail = document.getElementById("regEmail").value;
    const regPassword = document.getElementById("regPassword").value;
    const regPasswordConfirm = document.getElementById("regPasswordConfirm").value;

    if (regPassword !== regPasswordConfirm) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    try {
      // Crear usuario en Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, regEmail, regPassword);
      const user = userCredential.user;

      // Guardar nombre y apellido en Firestore
      await setDoc(doc(db, "administradores", user.uid), {
        nombre: regNombre,
        apellido: regApellido,
        email: regEmail,
        creadoEn: new Date()
      });

      alert("Registro exitoso. Ahora inicie sesión.");
      modalRegister.style.display = "none";
    } catch (error) {
      alert(error.message);
    }
  });

  // =======================
  // REGISTRO CON GOOGLE (opcional)
  // =======================
  const btnGoogle = document.getElementById("btnGoogle");
  btnGoogle.addEventListener("click", async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Guardar datos básicos en Firestore (colección administradores)
      await setDoc(doc(db, "administradores", user.uid), {
        nombre: user.displayName || "",
        apellido: "",
        email: user.email,
        creadoEn: new Date()
      });

      alert("Registro con Google exitoso. Redirigiendo al panel...");
      window.location.href = "admin-panel.html";
    } catch (error) {
      alert(error.message);
    }
  });

  // =======================
  // RECUPERACIÓN DE CONTRASEÑA
  // =======================
  const resetForm = document.getElementById("resetForm");
  resetForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const resetEmail = document.getElementById("resetEmail").value;
    sendPasswordResetEmail(auth, resetEmail)
      .then(() => {
        alert("Se ha enviado un correo para recuperar la contraseña.");
        modalReset.style.display = "none";
      })
      .catch((error) => {
        alert(error.message);
      });
  });
});
