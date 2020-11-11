import React, { useState,useEffect, useRef } from 'react';
import {Text, View, TouchableOpacity, Alert, BackHandler} from 'react-native';
import styles from './styles'

const SingleOrder=({item,route,navigation,onPress})=>{
    const backHandler = useRef(), {contactInfo, orderedItem}=item||navigation.getParam("item");
    console.log('item in single oredr,',contactInfo,orderedItem)
    function onBackButtonPressAndroid () {
        const navigator = {...navigation}
       if(navigator.navigate){
        navigator.goBack()
        navigator.navigate("Orders")
        return true
       }
       return false
      };
    useEffect(() => {
       backHandler.current= BackHandler.addEventListener('hardwareBackPress', onBackButtonPressAndroid)
        return ()=> {BackHandler.removeEventListener('hardwareBackPress', onBackButtonPressAndroid)};
    }, []);
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}> 
                    <Text style={{fontWeight:'bold'}}>
                        Sifariş 
                    </Text>
                    <Text>
                        {orderedItem?.title}
                    </Text>
                </View>

                <View style={{flexDirection:'row', justifyContent:'space-between'}}> 
                    <Text style={{fontWeight:'bold'}}>
                        Tarix 
                    </Text>
                    <Text>
                        {contactInfo?.dateOnly}
                    </Text>
                </View>

                <View style={{flexDirection:'row', justifyContent:'space-between'}}> 
                    <Text style={{fontWeight:'bold'}}>
                        Zaman
                    </Text>
                    <Text>
                        {contactInfo?.timeOnly}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>

    )
}

export default SingleOrder