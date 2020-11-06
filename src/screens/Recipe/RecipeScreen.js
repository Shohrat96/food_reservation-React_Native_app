import React, { useEffect } from 'react';
import {
  FlatList,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  TouchableHighlight, Alert, Vibration, Platform
} from 'react-native';
import styles from './styles';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { getIngredientName, getCategoryName, getCategoryById } from '../../data/MockDataAPI';
import BackButton from '../../components/BackButton/BackButton';
import ViewIngredientsButton from '../../components/ViewIngredientsButton/ViewIngredientsButton';
import PlaceOrderButton from '../../components/PlaceOrderButton/PlaceOrder';
import OrderFormModal from '../../components/orderFormModal/OrderFormModal';
import IngredientsDetailsScreen from '../IngredientsDetails/IngredientsDetailsScreen';
import OrdersScreen from '../Orders/OrdersScreen'

import App from '../../API/firebaseConfig';
import * as Permissions from 'expo-permissions'
import { Notifications } from 'expo';
import Constants from 'expo-constants';
//import Notifications from 'expo-notifications'

const { width: viewportWidth } = Dimensions.get('window');

async function sendPushNotification(expoPushToken,order) {
  const {title, dateOnly, timeOnly, number, name, surname, countFood, countPerson}=order;
  const messageTemplate=`
    ***New Order Received***
    Sifariş: ${title},
    Tarix: ${dateOnly},
    Zaman: ${timeOnly}
  `
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Original Title',
    body: messageTemplate,
    data: {message:messageTemplate},
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}


const registerForPushNotificationsAsync = async (order) => {

  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(
        Permissions.NOTIFICATIONS
      );
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    let token = await Notifications.getExpoPushTokenAsync();
    updates={};
    updates['/expoToken']=token;
    App.db.ref('users').child('6GX8plM7xQUdikbbIi3bpsGqDUI3').update(updates)
    sendPushNotification(token, order)
  } else {
    alert('Must use physical device for Push Notifications');
  }
  if (Platform.OS === 'android') {
    Notifications.createChannelAndroidAsync('default', {
      name: 'default',
      sound: 'true',
      priority: 'max',
      vibrate: [0, 250, 250, 250],
    });
  }
};



export default class RecipeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const item = navigation.getParam('item');

    return {
      title:item.title,
      //headerTransparent: 'true',
      headerLeft: (
        <BackButton
          onPress={() => {
            navigation.goBack();
          }}
        />
      )
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      activeSlide: 0,
      orderSuccess:null,
      orderStart:false,
      orderModalShow:false,
      notification:null
    };
  }
  ingredientss=[
    {name:'yag'},
    {name:'duz'},
    {name:'şəkər tozu'},
    {name:'yag'},
    {name:'dsfdsfsd fdsf duz'},
    {name:'un'},
    {name:'yag'},
    {name:'dsadasd dasdas '},
    {name:'udasdasdas dasdas n'},
    {name:'yadasdasdg'},
    {name:'ddasdasdasuz'},
  ]
  listenHandler=(notification)=>{
    this.setState({notification:notification})
  }
  componentDidMount(){
    this.listener=Notifications.addListener(this.listenHandler)
  }
  /*componentWillUnmount(){

  }*/
  renderImage = ({ item }) => (
    <TouchableHighlight>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: item }} />
      </View>
    </TouchableHighlight>
  );

  onPressIngredient = item => {
    var name = getIngredientName(item);
    let ingredient = item;
    this.props.navigation.navigate('Ingredient', { ingredient, name });
  };
  orderSuccess=(order)=>{
    this.setState({
      ...this.state,
      orderSuccess:true,
      orderStart:false
    });
    registerForPushNotificationsAsync(order);
  };
  orderFailed=()=>{
    this.setState({
      ...this.state,
      orderSuccess:false,
      orderStart:false
    })
  }
  orderStart=()=>{
    this.setState({
      ...this.state,
      orderStart:true,
      orderModalShow:true
    })
  }
  modalHide=()=>{
    this.setState({
      ...this.state,
      orderModalShow:false
    })
  };
  navigation=this.props.navigation;
  render() {
    const { activeSlide } = this.state;
    const { navigation } = this.props;
    const item = navigation.getParam('item');
    const category = getCategoryById(item.categoryId);
    const title = getCategoryName(item.categoryId);

    const submitOrderHandler=(contactInfo)=>{
      App.db.ref(`orders/`).push({ orderedItem:item, contactInfo:contactInfo}).then(
        ()=>this.orderSuccess({
          ...contactInfo,
          ...item
        }),
        ()=>this.orderFailed()
    );
      this.modalHide()
    }
    return (
      <>
        {
          this.state.notification?.origin==='selected'? this.navigation.navigate('Orders')
          :
          <>
      {
        this.state.orderModalShow?<OrderFormModal clickToClose={this.modalHide} submitOrderHandler={submitOrderHandler} />:null
      }
      
      <ScrollView style={styles.container}>
        <View style={styles.carouselContainer}>
          <View style={styles.carousel}>
            <Carousel
              ref={c => {
                this.slider1Ref = c;
              }}
              data={item.photosArray}
              renderItem={this.renderImage}
              sliderWidth={viewportWidth}
              itemWidth={viewportWidth}
              inactiveSlideScale={1}
              inactiveSlideOpacity={1}
              firstItem={0}
              loop={true}
              autoplay={true}
              autoplayDelay={500}
              autoplayInterval={2000}
              onSnapToItem={index => this.setState({ activeSlide: index })}
            />
            <Pagination
              dotsLength={item.photosArray.length}
              activeDotIndex={activeSlide}
              containerStyle={styles.paginationContainer}
              dotColor="rgba(255, 255, 255, 0.92)"
              dotStyle={styles.paginationDot}
              inactiveDotColor="white"
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
              carouselRef={this.slider1Ref}
              tappableDots={!!this.slider1Ref}
            />
          </View>
        </View>
        <View style={styles.infoRecipeContainer}>
          <Text style={styles.infoRecipeName}>{item.title}</Text>
          <View style={styles.infoContainer}>
            <TouchableHighlight
              onPress={() => navigation.navigate('RecipesList', { category, title })}
            >
              <Text style={styles.category}>{getCategoryName(item.categoryId).toUpperCase()}</Text>
            </TouchableHighlight>
          </View>

          <View style={styles.infoContainer}>
            <Image style={styles.infoPhoto} source={require('../../../assets/icons/time.png')} />
            <Text style={styles.infoRecipe}>{item.time} minutes </Text>
          </View>

          <View style={styles.infoContainer}>
            {/* <ViewIngredientsButton
              onPress={() => {
                let ingredients = item.ingredients;
                let title = 'Ingredients for ' + item.title;
                navigation.navigate('IngredientsDetails', { ingredients, title });
              }}
            /> */}
            <PlaceOrderButton orderStart={this.orderStart}/>
            
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.ingredientsTitle}>Tərkibi</Text>
            <View style={styles.infoDescriptionRecipe}>
              {
                this.ingredientss.map((item,key)=>{
                  return (
                    <View key={item.id} style={styles.singleIngredient}>
                      <Text style={{color:'white', fontWeight:'bold'}}>{item.name}</Text>
                    </View>
                  )
                })
              }

            </View>
            
          </View>
        </View>
      </ScrollView>
      </>
        }
      </>
    );
  }
}

/*cooking steps
<View style={styles.infoContainer}>
  <Image style={styles.infoPhoto} source={require('../../../assets/icons/info.png')} />
  <Text style={styles.infoRecipe}>Cooking Steps</Text>
</View>
<Text style={styles.infoDescriptionRecipe}>{item.description}</Text>
*/
