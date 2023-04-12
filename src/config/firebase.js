import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";


/*
const firebaseConfig = {
  apiKey: "AIzaSyDXYDyDFyCGZm1ukPFjGcgltftOBDeqqPM",
  authDomain: "coworkpay.firebaseapp.com",
  projectId: "coworkpay",
  storageBucket: "coworkpay.appspot.com",
  messagingSenderId: "1087411400971",
  appId: "1:1087411400971:web:b34d3ebc1da344c6e1b20e",
  measurementId: "G-2TF1H866QZ"
};*/

const firebaseConfig = {
  apiKey: "AIzaSyAdF0x0UldWU9dSvppRzyuYF2F57Scx1LU",
  authDomain: "mawu-b6634.firebaseapp.com",
  projectId: "mawu-b6634",
  storageBucket: "mawu-b6634.appspot.com",
  messagingSenderId: "812106625364",
  appId: "1:812106625364:web:32187bbdda82931654d8c1",
  measurementId: "G-6SH9XM0T89"
};

// Initialize Firebase
export const fb = firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = firebase.firestore();

export const storage = firebase.storage();

export const auth = firebase.auth();

export const static_img = 'https://firebasestorage.googleapis.com/v0/b/bridgetech-advance-project.appspot.com/o/profile_images%2Fprofile.jpg?alt=media&token=b3c94ada-1b08-4834-bbd1-647882c7195a';






