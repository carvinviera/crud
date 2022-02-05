//tutorial zuluoaga
import firebase from 'firebase/app'
import 'firebase/firestore'

  const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_FIREBASE_APPID
  };

  export const firebaseApp = firebase.initializeApp(firebaseConfig)



// apiKey: "AIzaSyBnpWAY9TdPiPm2mhP00fnrmwyLO-u-9H4",
//     authDomain: "crud-dca78.firebaseapp.com",
//     projectId: "crud-dca78",
//     storageBucket: "crud-dca78.appspot.com",
//     messagingSenderId: "18647305666",
//     appId: "1:18647305666:web:868031cae391b6f8aa1a5b"