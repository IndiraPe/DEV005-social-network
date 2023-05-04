// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {
  getFirestore, doc, deleteDoc, collection, addDoc,
  getDocs, onSnapshot, orderBy, updateDoc, getDoc, arrayUnion, arrayRemove, query,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBv03NHN5lAkjrHGRBVeYMBbS7m9irvxg8',
  authDomain: 'sn6-frikis.firebaseapp.com',
  projectId: 'sn6-frikis',
  storageBucket: 'sn6-frikis.appspot.com',
  messagingSenderId: '56919205183',
  appId: '1:56919205183:web:171a99c9496bb729995f8a',
  measurementId: 'G-G07V9NVKNW',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
// Función para guardar posts
// se crea la colección
export const savePost = (idUser, post, date, likes) => {
  addDoc(collection(db, 'posts'), {
    idUser, post, date, likes,
  });
};
export const getPosts = () => getDocs(collection(db, 'posts'));
export const onGetPosts = (callback) => onSnapshot(query(collection(db, 'posts'), orderBy('date', 'desc')), callback);
export const deletePost = (id) => deleteDoc(doc(db, 'posts', id));
export const getPost = (id) => getDoc(doc(db, 'posts', id));
export const editPost = (id, newPost) => updateDoc(doc(db, 'posts', id), newPost);
export const likePost = (id, idUser) => updateDoc(doc(db, 'posts', id), {
  likes: arrayUnion(idUser),
});
export const dislikePost = (id, idUser) => updateDoc(doc(db, 'posts', id), {
  likes: arrayRemove(idUser),
});
export const verifyUser = () => {
  onAuthStateChanged(auth, (user) => {
    console.log(user);
    if (window.location.pathname === '/dashboard' && user === null) {
      window.location.pathname = '/';
    } else if (window.location.pathname === '/' && user) {
      window.location.pathname = '/dashboard';
    } else if (window.location.pathname === '/login' && user) {
      window.location.pathname = '/dashboard';
    } else if (window.location.pathname === '/register' && user) {
      window.location.pathname = '/dashboard';
    } else if (window.location.pathname === '' && user) {
      window.location.pathname = '/dashboard';
    }
  });
};
