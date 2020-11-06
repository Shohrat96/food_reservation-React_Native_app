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
      console.log('in reducer');
      return payload
    case SET_AUTH_LOGOUT:
      return {
        ...state,
        status: false,
        userID: null,
        username: null,
        isAdmin:null
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
export const sign = (email, password, username, isSignIn) => async (
  dispatch
) => {
    console.log('inside sign method');
    var isAdmin=false;
    let uid=null;
  try {
    
    if (isSignIn) { 
      console.log('is sign in');
      const userRef=await App.auth.signInWithEmailAndPassword(email, password);
      uid=userRef.user.uid;
      console.log('user: ',uid)
      const admins = App.db.ref().child('users').child('admins');
      admins.once('value').then(
        (data)=>{
          Object.keys(data.toJSON()).forEach(uidAdmin=>{
            if (uidAdmin===uid){
              dispatch(
                setAuthSuccess({
                  userID: uid,
                  username,
                  status: true,
                  isAdmin:true
                  /*photo,*/
                })
              );
              return
            }
          })
        }
      )
      
    } else {
        try {
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
        isAdmin:false
        /*photo,*/
      })
    );
    console.log('is admin in end: ',isAdmin)
  } catch (error) {
    console.log(error.message);
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

