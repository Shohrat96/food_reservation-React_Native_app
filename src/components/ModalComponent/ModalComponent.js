import React, { useState } from 'react';
import {View, TouchableOpacity, Text, Dimensions, Alert, TouchableWithoutFeedback} from 'react-native';
import {StyleSheet} from 'react-native';
import CustomButton from '../CustomButton/CustomButton';


const ModalComponent=(props)=>{
    return (
    <TouchableWithoutFeedback onPress={()=>props.unmountModal()}>
        <View style={styles.container}>
            <TouchableOpacity style={styles.closeButton} onPress={props.unmountModal}>
                <Text style={styles.closeBtnTxt}>X</Text>
            </TouchableOpacity>
            <View style={styles.buttonsContainer}>
                <CustomButton backgroundColor={'#2cd18a'} style={{margin:10}} onPress={props.declineEvent} title={props.declineTitle}/>
                <CustomButton backgroundColor={'#2cd18a'} style={{margin:10}} onPress={props.acceptEvent} title={props.acceptTitle} />
            </View>
        </View>
    </TouchableWithoutFeedback>
    )
}

export default ModalComponent

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
    