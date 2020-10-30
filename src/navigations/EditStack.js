import React from 'react';
import {View, Text} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native'
import SingleProductEditScreen from '../screens/singleProductEdit/SingleProductEditScreen';
import EditScreen from '../screens/Edit/EditScreen/EditScreen';

const EditStack=({navigation})=>{
    const {Navigator, Screen}=createStackNavigator();
    return (
            <Navigator>
                <Screen name="EditScreen" component={EditScreen}/>
                <Screen name="EditScreenSingle" component={SingleProductEditScreen}/>
            </Navigator>
    )
}
export default EditStack

EditStack.navigationOptions=({navigation})=>({
    header:null
})