
import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCMT1K832HGadLlX6S_rNuCDUgoiP8QWaY",
    authDomain: "restaurant-reservation-33a36.firebaseapp.com",
    databaseURL: "https://restaurant-reservation-33a36.firebaseio.com",
    projectId: "restaurant-reservation-33a36",
    storageBucket: "restaurant-reservation-33a36.appspot.com",
    messagingSenderId: "68147655954",
    appId: "1:68147655954:web:e688b1dbceec64227b2fcb",
    measurementId: "G-2LBCEY788Z"
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const App = {
    root: firebase,
    db: firebase.database(),
    auth: firebase.auth(),
    storage: firebase.storage(),
  };
  
  export default App;
  