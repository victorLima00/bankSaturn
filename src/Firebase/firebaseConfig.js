import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: "AIzaSyC8OOAinXBVs0O5RLTTGeIkkOO8Ubfvt08",
  authDomain: "bancosaturn-56742.firebaseapp.com",
  projectId: "bancosaturn-56742",
  storageBucket: "bancosaturn-56742.appspot.com",
  messagingSenderId: "36273896905",
  appId: "1:36273896905:web:e3da90f196b0290f2e7c18",
  measurementId: "G-317YKWG9L8"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;