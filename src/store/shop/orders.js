import { Alert } from "react-native";
import App from "../../API/firebaseConfig";





// SELECTORS
export const MODULE_NAME = "orders";
export const selectCategories = (state) => state[MODULE_NAME];
// ACTION TYPES
const SET_ORDERS='SET_ORDERS'

const initialState=[
  {
    '-MJg44k-rL4tEYlmQ3pf': {
      contactInfo: {
        countFood: '2',
        countPerson: '6',
        dateOnly: '10/15/20',
        name: 'ad',
        number: '5555555',
        surname: 'soyad',
        timeOnly: '15:45'
      },
      orderedItem: {
        categoryId: 4,
        ingredients: [
          [
            'yağ',
            '1'
          ],
          [
             'yağ',
            '1/2 lbs'
          ],
          [
            'yağ',
            '1/2 liters'
          ]
        ],
        photo_url: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/delish-how-to-make-a-smoothie-horizontal-1542310071.png?crop=0.803xw:0.923xh;0.116xw,0.00510xh&resize=768:*',
        recipeId:3,
        time: '10',
        title: 'Triple Berry Smoothie'
      },
      notification:{}
    }
  }
    
]

  function reducer(state = initialState, { type, payload }) {
    switch (type) {
        case SET_ORDERS:
            console.log('payload',payload)
            return payload
        default:
          return state
    }
  }

  export default reducer

    //action creators
    export const setOrders = () => async (
      dispatch
    ) => {
        console.log('inside setOrder method');
      try {
        fetch('https://restaurant-reservation-33a36.firebaseio.com/orders.json',
        {
          method: 'GET',
          headers:{
            Accept: 'application/json',
            'Content-Type':'application/json'
          }
        }).then(resp=>resp.json()).then(data=>{
        
          dispatch({type:'SET_ORDERS',payload:data});
        })
        
      } catch (error) {
        Alert.alert(error.message);
      }
    };