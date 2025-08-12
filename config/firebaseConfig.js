import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDws7bw5aD-LqV2oMuM3EOV3oavo0RVpnA",
  authDomain: "bombay-canvas.firebaseapp.com",
  projectId: "bombay-canvas",
  storageBucket: "bombay-canvas.firebasestorage.app",
  messagingSenderId: "145295638585",
  appId: "1:145295638585:web:986ea42f4238675fbb0de8",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
