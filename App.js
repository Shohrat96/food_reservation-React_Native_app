import React, { useState, useEffect, Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import {AppContainer} from './src/navigations/AppNavigation';
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import SignUp from './src/screens/Auth/SignUp';
import store, { persistor } from "./src/store";
import { authChangeListener } from "./src/utils/authChangeListener";
import * as Permissions from 'expo-permissions'
import * as Notificationss from 'expo-notifications';
import { Notifications } from 'expo';
import Constants from 'expo-constants';

/*registerForPushNotifications=async()=>{

  const { status:existingStatus}=await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  Alert.alert('exisSta:')

  let finalStatus=existingStatus;
  if (existingStatus !== 'granted'){
    const {status}=await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus=status;
  }

  if (finalStatus!=='granted'){
    return;
  }

  let token=await Notifications.getExpoPushTokenAsync();
  Alert.alert('token:',token);
}

*/
const registerForPushNotificationsAsync = async () => {
  if (Constants.isDevice) {
    Alert.alert('sasdad')
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
    Alert.alert(JSON.stringify(token));
  } else {
    alert('Must use physical device for Push Notifications');
  }
};
export default function  App ()  {
  const chooseImage = async () => {
    
    try {
      const {status} = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      const { status:existingStatus}=await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      if (existingStatus) {
        Alert.alert(JSON.stringify(existingStatus))
        let token=await Notifications.getExpoPushTokenAsync();
        Alert.alert('token:');
      }
    } catch (error) {
      console.log("chooseImage", error);
    }
  };

    return (
      //<AppContainer />
      /*<Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppContainer />
        </PersistGate>
      </Provider>*/
      <View style={{marginTop:50}}>
      <Button title='choose image' onPress={registerForPushNotificationsAsync}/>
      </View>
    )
}

