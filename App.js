import React, { useState, useEffect, Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import {AppContainer} from './src/navigations/AppNavigation';
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import SignUp from './src/screens/Auth/SignUp';
import store, { persistor } from "./src/store";
import { authChangeListener } from "./src/utils/authChangeListener";



export default function  App ()  {
    /*useEffect(()=>{
      registerForPushNotificationsAsync()
    },[])*/
    return (
      //<AppContainer />
      /*<Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppContainer sendPush={()=>registerForPushNotificationsAsync()} />
        </PersistGate>
      </Provider>*/
      <View style={{marginTop:50}}>
        <Button title='choose image'/>
      </View>
    )
}

