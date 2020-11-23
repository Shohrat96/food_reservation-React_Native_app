import React,{useRef,useEffect,useState, Children} from 'react'
import { Platform, View } from 'react-native'
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications';
import { withNavigation } from 'react-navigation';
import App from './src/API/firebaseConfig';



// Top level Component to handle push notification 
/*
  This component serves as a provider for the entire App
*/

 function PushNotificationManager (props) {

  // const notificationListener = useRef(),responseListener = useRef(),tokenListener = useRef(),[token,setToken]= useState('');
  // useEffect(() => {
  //   registerForPushNotificationsAsync().then(data => setToken(data.data));
  //   // This listener is fired whenever a notification is received while the app is foregrounded
  //   notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
  //     // setNotification(notification);
  //     // here can update state
  //   });

  //   // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
  //   responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
  //     const data = response.notification,route=data.request.content.data.route
  //     // setTimeout(()=>props.navigation.navigate(route, {
  //     //   item:data.request.content.data
  //     // }),200)
  //     props.navigation.navigate(route, {
  //       item:data.request.content.data
  //     })
  //   });

  //   tokenListener.current = Notifications.addPushTokenListener((data)=>setToken(data.data));
  //   Notifications.setNotificationHandler({
  //     handleNotification: async () => ({
  //       shouldShowAlert: true,
  //       shouldPlaySound: true,
  //       shouldSetBadge: true,
  //     }),
  //   });
  // },[])

  // const { children } = props
  //   return <>{children({token:token})}</>
 return <View></View>
}
// this function register listen to notifications
async function registerForPushNotificationsAsync() {
  // let token;
  // if (Constants.isDevice) {
  //   const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  //   let finalStatus = existingStatus;
  //   if (existingStatus !== 'granted') {
  //     const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  //     finalStatus = status;
  //   }
  //   if (finalStatus !== 'granted') {
  //     alert('Failed to get push token for push notification!');
  //     return;
  //   }
  //   token = (await Notifications.getExpoPushTokenAsync()).data;
  //   // where we make a call to the server to set the user Notification token
  //   updates={};
  //   updates['/expoToken']=token;
  //   App.db.ref('users').child('6GX8plM7xQUdikbbIi3bpsGqDUI3').update(updates)

  // } else {
  //   alert('Must use physical device for Push Notifications');
  // }

  // if (Platform.OS === 'android') {
  //   Notifications.setNotificationChannelAsync('orders', {
  //     name: 'orders',
  //     importance: Notifications.AndroidImportance.MAX,
  //     vibrationPattern: [0, 250, 250, 250],
  //     lightColor: '#FF231F7C',
  //   });
  // }

  return token;
}

// We want to export the component with navigation props, so we can nagivate to specific screens inside the component it self.
export default PushNotificationManager