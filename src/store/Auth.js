import { Alert } from "react-native";
import App from "../API/firebaseConfig";

// ACTION TYPES
const SET_AUTH_SUCCESS = "SET_AUTH_SUCCESS";
const SET_AUTH_LOGOUT = "SET_AUTH_LOGOUT";
/*const SET_AUTH_PHOTO = "SET_AUTH_PHOTO";*/

// SELECTORS
export const MODULE_NAME = "auth";
export const selectAuthStatus = (state) => state[MODULE_NAME].status;
export const selectAuthUserID = (state) => state[MODULE_NAME].userID;
export const selectAuthUsername = (state) => state[MODULE_NAME].username;
/*export const selectAuthPhoto = (state) => state[MODULE_NAME].photo;*/

// REDUCER
const initialState = {
  status: false,
  userID: null,
  username: null,
  isAdmin:false
  /*photo: null,*/
};

export function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case SET_AUTH_SUCCESS:
      return {
        ...state,
        status: true,
        userID: payload.userID,
        username: payload.username,
        /*photo: payload.photo,*/
      };
    case SET_AUTH_LOGOUT:
      return {
        ...state,
        status: false,
        userID: null,
        username: null,
      };
    /*case SET_AUTH_PHOTO:
      return {
        ...state,
        photo: payload,
      };*/
    default:
      return state;
  }
}

// ACTION CREATORS
export const setAuthSuccess = (payload) => ({
  type: SET_AUTH_SUCCESS,
  payload,
});
/*export const setAuthPhoto = (payload) => ({
  type: SET_AUTH_PHOTO,
  payload,
});*/
export const setAuthLogout = () => ({
  type: SET_AUTH_LOGOUT,
});

// MIDDLEWARES
export const sign = (email, password, username, isSignIn=false) => async (
  dispatch
) => {
    console.log('inside sign method');
  try {
    
    if (isSignIn) { Alert.alert('is sign in')
      ({
        user: { uid },
      } = await App.auth.signInWithEmailAndPassword(email, password));
      const userDataSnapshot = await App.db.ref(`users/${uid}`).once("value");
      ({ username/*,photo*/ } = userDataSnapshot.val());
    } else {
        try {
            console.log('inside signup, email and pass: ',email,password);
            ({
              user: { uid },
            } = await App.auth.createUserWithEmailAndPassword(email, password));
            //const {user} = await App.auth.createUserWithEmailAndPassword(email, password);
            
            App.db.ref(`users/${uid}`).set({ username /*, photo: "" */});
        } catch (error) {
            console.log('catch error:',error);
        }

    }

    dispatch(
      setAuthSuccess({
        userID: uid,
        username,
        status: true,
        /*photo,*/
      })
    );
  } catch (error) {
    Alert.alert(error.message);
  }
};

export const logOut = () => async (dispatch) => {
  try {
    await App.auth.signOut();
    dispatch(setAuthLogout());
  } catch (error) {
    Alert.alert(error.message);
  }
};

