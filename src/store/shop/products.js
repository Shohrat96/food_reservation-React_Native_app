import { Alert } from "react-native";
import App from "../../API/firebaseConfig";
import { convertObToArr } from "../../data/MockDataAPI";

// ACTION TYPES
const SET_PRODUCTS='SET_PRODUCTS'

// SELECTORS
export const MODULE_NAME = "products";
export const selectProducts = (state) => state[MODULE_NAME];

const initialState=[
    {
      categoryId: 3,
      ingredients: [
        [
          'yağ',
          '200ml'
        ],
        [
          'yağ',
          '5g'
        ],
        [
          'yağ',
          '300g'
        ]
      ],
      photo_url: 'https://www.texanerin.com/content/uploads/2019/06/nobake-chocolate-cookies-1-650x975.jpg',
      photosArray: [
        'https://www.texanerin.com/content/uploads/2019/06/nobake-chocolate-cookies-1-650x975.jpg',
        'https://namelymarly.com/wp-content/uploads/2018/04/20180415_Beet_Lasagna_10.jpg',
        'https://advancelocal-adapter-image-uploads.s3.amazonaws.com/image.al.com/home/bama-media/width600/img/news_impact/photo/burger-fijpg-57e7e5907630c2ad.jpg',
        'https://img.thedailybeast.com/image/upload/c_crop,d_placeholder_euli9k,h_1439,w_2560,x_0,y_0/dpr_1.5/c_limit,w_1044/fl_lossy,q_auto/v1492718105/articles/2013/09/24/burger-king-s-new-french-fries-took-ten-years-to-develop/130923-gross-burger-tease_izz59e',
        'https://aht.seriouseats.com/images/2012/02/20120221-193971-fast-food-fries-Burger-King-fries-2.jpg'
      ],
      recipeId: 122,
      time: '15',
      title: 'Oatmeal Cookies'
    }
  ]

    function reducer(state = initialState, { type, payload }) {
    switch (type) {
        case SET_PRODUCTS:
            return payload
        default:
          return state
    }
  }

  export default reducer
  
  //action creators
  export const setData = () => async (
    dispatch
  ) => {
      console.log('inside sign method');
    try {
      fetch('https://restaurant-reservation-33a36.firebaseio.com/products.json',
      {
        method: 'GET',
        headers:{
          Accept: 'application/json',
          'Content-Type':'application/json'
        }
      }).then(resp=>resp.json()).then(data=>{
        dispatch({type:'SET_PRODUCTS',payload: data});
      })
      
    } catch (error) {
      Alert.alert(error.message);
    }
  };