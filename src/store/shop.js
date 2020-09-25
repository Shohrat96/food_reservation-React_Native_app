import { Alert } from "react-native";
import App from "../API/firebaseConfig";

// ACTION TYPES
const CREATE_RESTAURANT = "CREATE_RESTAURANT";


// SELECTORS
export const MODULE_NAME = "shop";
export const selectShop = (state) => state[MODULE_NAME];


// REDUCER
const initialState = {
    name:'',
    location:'',
    tables:[
        {
            id:'table1',
            busyTimes:[
                {
                    start:null,
                    end:null,
                    id: 'busyTime1'
                },
                {
                    start:null,
                    end:null,
                    id: 'busyTime2'
                }
            ]

        },
        {
            id:'table2',
            busyTimes:[
                {
                    start:null,
                    end:null,
                    id: 'busyTimeTable1'
                },
                {
                    start:null,
                    end:null,
                    id: 'busyTimeTable2'
                }
            ]

        }
    ],
    menu:{
        cookies:{
            image:'',
            content:[
                {
                    id:'cookie1',
                    image:'',
                    price:'25$',
                    prepareTime:null,
                    name:'cookie1'
                },
                {
                    id:'cookie2',
                    image:'',
                    price:'35$',
                    prepareTime:null,
                    name:'cookie2'
                }
            ] 
        },

        meals:{
            image:'',
            content:[
                {
                    name:'sampleMeal1',
                    price:'15$',
                    prepareTime:null,
                    image:'',
                    id:'sampleMeal1'
                },
                {
                    name:'sampleMeal2',
                    price:'55$',
                    prepareTime:null,
                    image:'',
                    id:'sampleMeal2'
                }
            ]

        }
    }
};

export function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case CREATE_RESTAURANT:
      return {
        ...state,
        name: payload.name,
        location:payload.location
      };
    default:
      return state;
  }
}

// ACTION CREATORS
export const createRestaurantAction = (payload) => ({
  type: CREATE_RESTAURANT,
  payload,
});


// MIDDLEWARES
export const createRestaurant = (name,location) => async (
  dispatch
) => {
  try {
        try {
            const {user} = await App.auth.createUserWithEmailAndPassword(email, password);
            const {uid}=await user;
            App.db.ref(`users/${uid}`).set({ 
                username, /*, photo: "" */
                restaurant:{
                    name:name,
                    location:location
                }
            });
        } catch (error) {
            console.log('catch error:',error);
        }

    dispatch(
        createRestaurantAction({
        name: name,
        location:location,
        uid:uid
        /*photo,*/
      })
    );
  } catch (error) {
    Alert.alert(error.message);
  }
};
