import React, { useState } from 'react';
import {View, TouchableOpacity, Text, Dimensions, Alert, TouchableWithoutFeedback} from 'react-native';
import {StyleSheet} from 'react-native';

const Modal=(props)=>{
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

export default Modal

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
    }
})
    