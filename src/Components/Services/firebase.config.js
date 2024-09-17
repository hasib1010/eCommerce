
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyD7MHp76OBe8O5_-9g5BmzHoe5nr7lC-kc",
    authDomain: "fabyoh-cd6df.firebaseapp.com",
    projectId: "fabyoh-cd6df",
    storageBucket: "fabyoh-cd6df.appspot.com",
    messagingSenderId: "778452500880",
    appId: "1:778452500880:web:e2931a3d549146544bf315"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


export default auth