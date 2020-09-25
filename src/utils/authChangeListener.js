/*import { setAuthStatus } from "../store/auth";
import App from "../API/firebaseConfig";

export const authChangeListener = (store) => {
  console.log("authChangeListener");
  App.auth.onAuthStateChanged((user) => {
    console.log("authChanged");
    store.dispatch(setAuthStatus(!!user));
  });
};
*/