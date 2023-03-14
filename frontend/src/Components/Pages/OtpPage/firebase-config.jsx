import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyCgbttdY8kOooL7YltsM6Zv0vxDOun9OmI",
  authDomain: "gold-courage-281606.firebaseapp.com",
  projectId: "gold-courage-281606",
  storageBucket: "gold-courage-281606.appspot.com",
  messagingSenderId: "901134871140",
  appId: "1:901134871140:web:fea4eaa622da79fd394d71"
};

const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app)