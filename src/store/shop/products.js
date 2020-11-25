import { Alert } from "react-native";
import App from "../../API/firebaseConfig";
import { convertObToArr } from "../../data/MockDataAPI";

// ACTION TYPES
const SET_PRODUCTS='SET_PRODUCTS';
const UPDATE_PRODUCT='UPDATE_PRODUCT';
const DELETE_PRODUCT='DELETE_PRODUCT';
const ADD_PRODUCT='ADD_PRODUCT'

// SELECTORS
export const MODULE_NAME = "products";
export const selectProducts = (state) => state[MODULE_NAME];

const initialState={

}

    function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_PRODUCTS:
          console.log('state in set prod: ',{...state,...action.payload});
          console.log('payload in set prod: ',action.payload)

          return {
            ...state,
            ...action.payload
          }
        case UPDATE_PRODUCT:
          let newState = {...state};
          newState[action.payload.id] = action.payload;
          return newState;
        case DELETE_PRODUCT:
          const stateCopy={...state};
          delete stateCopy[`${action.payload}`];
          state=stateCopy;
          console.log('state after delete : ',stateCopy)
          return state


      case ADD_PRODUCT:
        const {payload}=action;
        const id=payload.id
        console.log('payload in add prod: ',payload)
          return {
            ...state,
            [id]:{...payload}
          }
        default:
          return state
    }
  }

  export default reducer
  
  //action creators
  export const setData = () => async (
    dispatch
  ) => {
    try {
      fetch('https://restaurant-reservation-33a36.firebaseio.com/products.json',
      {
        method: 'GET',
        headers:{
          Accept: 'application/json',
          'Content-Type':'application/json'
        }
      }).then(resp=>resp.json()).then(data=>{
        console.log('payload in setData action: ',)
        dispatch({type:SET_PRODUCTS,payload: data});
      })
      
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  //UPDATE PRODUCT ACTION

export const updateData = async(dispatch, product) => {
  try {
    await App.db.ref('products').child(product.id).update(product);
    dispatch({type: UPDATE_PRODUCT, payload: product});
    
  } catch (error) {
    console.log('error: ',error);
    Alert.alert(error.message);
  }
};

export const deleteProduct =(productId)=>async(dispatch) => {
  try {
    await App.db.ref(`products`).child(`${productId}`).remove().then(
      (res)=>dispatch({type: DELETE_PRODUCT, payload:productId}),
    );
    //dispatch({type: DELETE_PRODUCT, payload: productId});
    
  } catch (error) {
    console.log('error: ',error);
    Alert.alert(error.message);
  }
};

export const addProduct = async(dispatch, product) => {
  try {
    let newProdRef=await App.db.ref('products').push(product);
    const newProdId=newProdRef.toJSON().split('/').reverse()[0];
    await App.db.ref('products').child(newProdId).update({id:newProdId})
    dispatch({type: ADD_PRODUCT, payload: {...product,id:newProdId}});
    
  } catch (error) {
    console.log('error: ',error);
    Alert.alert(error.message);
  }
};