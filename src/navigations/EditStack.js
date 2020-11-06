import React, { useEffect } from 'react';
import {View, Text, Alert} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native'
import SingleProductEditScreen from '../screens/singleProductEdit/SingleProductEditScreen';
import EditScreen from '../screens/Edit/EditScreen/EditScreen';
import HeaderBtnSave from '../components/HeaderBtnSave/HeaderBtnSave';
import EditCategoriesScreen from '../screens/Edit/EditCategories/EditCategoriesScreen';
import EditSingleCategoryScreen from '../screens/Edit/EditCategories/EditSingleCategory/EditSingleCategoryScreen';

const EditStack=({navigation})=>{
    const {Navigator, Screen}=createStackNavigator();
    
    return (
            <Navigator>
                <Screen name="EditScreen" component={EditScreen}/>
                <Screen name="EditScreenSingle" component={SingleProductEditScreen}/>
                <Screen name="EditCategoriesScreen" component={EditCategoriesScreen}/>
                <Screen name="EditSingleCategoryScreen" component={EditSingleCategoryScreen}/>

            </Navigator>
    )
}
export default EditStack

EditStack.navigationOptions=({navigation})=>({
    header:null
})