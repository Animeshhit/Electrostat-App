import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: PROCESS.ENV.MESSAGINGSENDERID,
  appId: process.env.APPID,
  databaseURL:process.env.DATABASEURL
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default app;
export { database };
