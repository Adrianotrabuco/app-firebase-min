import { initializeApp, getApps, getApp } from "firebase/app";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeAuth, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
//import { getReactNativePersistence } from "firebase/auth/react-native";

const firebaseConfig = {
  apiKey: "AIzaSyDxbmyA_Tffhdoz_QNbSsHRU5tE2tJ-A",
  authDomain: "expo-rn-firebase-8d81d.firebaseapp.com",
  projectId: "expo-rn-firebase-8d81d",
  storageBucket: "expo-rn-firebase-8d81d.firebasestorage.app",
  messagingSenderId: "129066110230",
  appId: "1:129066110230:web:b8dcaacceee3261a973937",
};
console.log("FIREBASE CONFIG ",firebaseConfig);

export const app = getApps().length ? getApp() : initializeApp(firebaseConfig)

const getRNPersistence = () =>{
    try {
        //
        const rn = require("firebase/auth/react-native")
        return rn.getReactNativePersistence;
    } catch {
        // fallback: tenta pegar do auth normal (se não existir)
        const auth = require("firebase/auth");
        return auth.getReactNativePersistence;
    }
}
             
export const auth = ( () =>{
    try {
        const getReactNativePersistence = getRNPersistence()
        return initializeAuth(app, {
            persistence: getReactNativePersistence(AsyncStorage)
        });
    } catch (error) {
        return getAuth(app)
    }
})();
export const db = getFirestore(app);




