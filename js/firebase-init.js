// firebase-init.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyCnWOxIi3HjXgXoOInHC23cm8cqp4wkQZo",
  authDomain: "topcaps-5cbfe.firebaseapp.com",
  projectId: "topcaps-5cbfe",
  storageBucket: "topcaps-5cbfe.firebasestorage.app",
  messagingSenderId: "805512566676",
  appId: "1:805512566676:web:48aa98cc4a60e4e7cc2181"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);