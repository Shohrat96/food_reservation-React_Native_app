import React, { useState, useEffect, Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import {AppContainer} from './src/navigations/AppNavigation';
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import store, { persistor } from "./src/store";

export default class  App extends Component  {
    
    render(){
      return (
        //<AppContainer />
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <AppContainer/>
          </PersistGate>
        </Provider>
        /*<View style={{marginTop:50}}>
          <Button title='allow notification'/>
        </View>*/
      )
    }
    
}

