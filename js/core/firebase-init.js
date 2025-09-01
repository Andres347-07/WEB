// js/core/firebase-init.js

// Importa módulos de Firebase desde el CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-storage.js";

// Configuración del proyecto en Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyCnWOxIi3HjXgXoOInHC23cm8cqp4wkQZo",
  authDomain: "topcaps-5cbfe.firebaseapp.com",
  projectId: "topcaps-5cbfe",
  storageBucket: "topcaps-5cbfe.firebasestorage.app",
  messagingSenderId: "805512566676",
  appId: "1:805512566676:web:48aa98cc4a60e4e7cc2181"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Exporta servicios listos para usar
export const db = getFirestore(app);   // Firestore
export const auth = getAuth(app);      // Autenticación
export const storage = getStorage(app); // Storage
