import { Alert } from "react-native";
import App from "../../API/firebaseConfig";

// ACTION TYPES
const SET_CATEGORIES='SET_CATEGORIES'
const UPDATE_CATEGORY='UPDATE_CATEGORY'

// SELECTORS
export const MODULE_NAME = "categories";
export const selectCategories = (state) => state[MODULE_NAME];


// REDUCER
const initialState = {
    categories:[
        // {
        //     id: 3,
        //     name: 'Cookies',
        //     photo_url:
        //     'https://www.telegraph.co.uk/content/dam/Travel/2019/January/france-food.jpg?imwidth=1400'
        // },
        // {
        //     id: 1,
        //     name: 'Mexican Food',
        //     photo_url: 'https://ak1.picdn.net/shutterstock/videos/19498861/thumb/1.jpg'
        // },
        // {
        //     id: 2,
        //     name: 'Italian Food',
        //     photo_url:
        //       'https://images.unsplash.com/photo-1533777324565-a040eb52facd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'
        // },
        // {
        //     id: 4,
        //     name: 'Smoothies',
        //     photo_url:
        //     'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/still-life-of-three-fresh-smoothies-in-front-of-royalty-free-image-561093647-1544042068.jpg?crop=0.715xw:0.534xh;0.0945xw,0.451xh&resize=768:*'
        // },
        // {
        //     id: 0,
        //     name: 'Pizza',
        //     photo_url: 'https://amp.businessinsider.com/images/5c084bf7bde70f4ea53f0436-750-563.jpg'
        // },
    ]
};

function reducer(state = initialState, { type, payload }) {
  switch (type) {
      case SET_CATEGORIES:
          return payload
      case UPDATE_CATEGORY:
        let newState = {...state};
        newState[payload.id] = payload;
        return newState;
      default:
        return state
  }
}

export default reducer

//action creators
export const setCategories = () => async (
  dispatch
) => {
  try {
    fetch('https://restaurant-reservation-33a36.firebaseio.com/categories.json',
    {
      method: 'GET',
      headers:{
        Accept: 'application/json',
        'Content-Type':'application/json'
      }
    }).then(resp=>resp.json()).then(data=>{
      console.log('data from set catego:',data)
      dispatch({type:'SET_CATEGORIES',payload:data});
    })
    
  } catch (error) {
    Alert.alert(error.message);
  }
};

//UPDATE CATEGORY

export const updateCategory = (data) => async (dispatch)=> {
  try {
    
    await App.db.ref('categories').child(data.id).update(data);
    dispatch({type: UPDATE_CATEGORY, payload: data});
    
  } catch (error) {
    console.log('error: ',error);
    Alert.alert(error.message);
  }
};