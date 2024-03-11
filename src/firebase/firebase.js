import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore} from 'firebase/firestore';
import { firebaseConfig } from "./firebaseConfigExample.js";
import { getStorage}  from 'firebase/storage'

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics();
const db = getFirestore()
const storage = getStorage()
export { app,analytics, db, storage}