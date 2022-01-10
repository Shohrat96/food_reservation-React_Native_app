import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator, HeaderBackButton } from 'react-navigation-stack';
import HomeScreen from '../screens/Home/HomeScreen';
import CategoriesScreen from '../screens/Categories/CategoriesScreen';
import RecipeScreen from '../screens/Recipe/RecipeScreen';
import RecipesListScreen from '../screens/RecipesList/RecipesListScreen';
import DrawerContainer from '../screens/DrawerContainer/DrawerContainer';
import IngredientScreen from '../screens/Ingredient/IngredientScreen';
import SearchScreen from '../screens/Search/SearchScreen';
import IngredientsDetailsScreen from '../screens/IngredientsDetails/IngredientsDetailsScreen';
import OrdersScreen from '../screens/Orders/OrdersScreen';
import SingleOrder from '../screens/SingleOrder/SingleOrder';
import OrderDetailsScreen from '../screens/OrderDetailsScreen/OrderDetailsScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';
import EditStack from './EditStack';
import { Notifications } from 'expo';

let notificationReceived = null;
const listenHandler = (notification) => {
   notificationReceived = notification;
};

// Notifications.addListener(listenHandler);

const MainNavigator = createStackNavigator(
   {
      Home: HomeScreen,
      Categories: CategoriesScreen,
      Recipe: RecipeScreen,
      RecipesList: RecipesListScreen,
      Ingredient: IngredientScreen,
      Search: SearchScreen,
      IngredientsDetails: IngredientsDetailsScreen,
      Orders: OrdersScreen,
      SingleOrder: {
         screen: SingleOrder,
         navigationOptions: ({ navigation }) => ({
            headerLeft: <HeaderBackButton onPress={(_) => navigation.navigate('Orders')} />,
         }),
      },
      OrderDetails: OrderDetailsScreen,
      Register: RegisterScreen,
      Edit: { screen: EditStack, navigationOptions: ({ navigation }) => ({ header: null, headerShown: false }) },
   },
   {
      initialRouteName: 'Home',
      //headerMode: 'float',

      defaultNavigationOptions: ({ navigation }) => ({
         headerTitleStyle: {
            fontWeight: 'bold',
            textAlign: 'left',
         },
         headerStyle: {
            alignItems: 'center',
            justifyContent: 'center',
         },
         headerStatusBarHeight: 0,
      }),
   }
);

const DrawerStack = createDrawerNavigator(
   {
      Main: MainNavigator,
   },
   {
      drawerPosition: 'left',
      initialRouteName: 'Main',
      drawerWidth: 250,
      contentComponent: DrawerContainer,
   }
);

export const AppContainer = createAppContainer(DrawerStack);

console.disableYellowBox = true;
