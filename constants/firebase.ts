import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAi5ceQaTpRpbsv4F-879k55RX5FfC9yo0",
  authDomain: "electrostat-86370.firebaseapp.com",
  projectId: "electrostat-86370",
  storageBucket: "electrostat-86370.appspot.com",
  messagingSenderId: "457158597401",
  appId: "1:457158597401:web:ab456e03f8ba18ab3f0388",
  databaseURL:
    "https://electrostat-86370-default-rtdb.asia-southeast1.firebasedatabase.app",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default app;
export { database };
