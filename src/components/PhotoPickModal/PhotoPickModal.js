import React, { useState } from 'react';
import {View, TouchableOpacity, Text, Dimensions, Alert, TouchableWithoutFeedback} from 'react-native';
import {StyleSheet} from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';

import CustomButton from '../CustomButton/CustomButton';

const PhotoPickModal=(props)=>{
    
    const selectPhoto=() => {
        (async () => {
          if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
            if (status !== 'granted') {
              alert('Sorry, we need camera roll permissions to make this work!');
            }
          }
        })();
      };
      
      const pickImage = async (mode) => {
        const {ratio}=props || [1,1]
        selectPhoto();
        let result;
        if (mode === 'select'){
          result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.All,
              allowsEditing: true,
              aspect: ratio,
              quality: 1,
            });
        } else if (mode==='take'){
          result = await ImagePicker.launchCameraAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.All,
              allowsEditing: true,
              aspect: ratio,
              quality: 1,
            });
        }
        
    
        console.log(result);
    
        if (!result.cancelled) {
          switch(props.mode){
            case 'changePhoto':
              props.changeUrl(result.uri);
              return
            case 'addPhoto':
              props.addUrl(result.uri)
              return
            default:
              return null
          }
        }
      };
      

    return (
        <TouchableWithoutFeedback onPress={()=>props.unmountModal()}>
            <View style={styles.container}>
                <TouchableOpacity style={styles.closeButton} onPress={()=>props.unmountModal()}>
                    <Text style={styles.closeBtnTxt}>X</Text>
                </TouchableOpacity>
                <View style={styles.buttonsContainer}>
                    <CustomButton backgroundColor={'#2cd18a'} style={{margin:10}} onPress={()=>{pickImage('select');props.unmountModal()}} title={'Seç'}/>
                    <CustomButton backgroundColor={'#2cd18a'} style={{margin:10}} onPress={()=>{pickImage('take');props.unmountModal()}} title={'Çək'} />
                </View>
            </View>
        </TouchableWithoutFeedback>

        
        
        
        
    )
}
export default PhotoPickModal


const styles=StyleSheet.create({
    container:{
        position:'absolute',
        zIndex:5,
        width:'100%',
        height:Dimensions.get('window').height,
        backgroundColor: 'rgba(0,0,0,0.9)',
        justifyContent:'center',
        alignItems:'center',
        flex:1,
        margin:0,
        top:0
    },
    closeButton:{
        position:'absolute',
        right:'7%',
        top:'5%'
    },
    closeBtnTxt:{
        color:'white',
        fontSize:35
    },
    buttonsContainer:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'center'
    },
    button:{
        padding:10
    },
    choosePhoto:{

    },
    takePhoto:{

    }
})