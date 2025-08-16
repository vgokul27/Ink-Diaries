import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBnqa5ywd66JIZ6ml37RunSdIa5EL6bHiY",
  authDomain: "ink-diaries.firebaseapp.com",
  projectId: "ink-diaries",
  storageBucket: "ink-diaries.firebasestorage.app",
  messagingSenderId: "1059077256065",
  appId: "1:1059077256065:web:3daface20d414f61c8ae80"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);