import React, { useState } from 'react';
import { TouchableOpacity, Image, Text, View, Alert, StyleSheet } from 'react-native';



const CustomButton=(props)=> {
    const {title,backgroundColor}=props;
    return (
      <TouchableOpacity {...props}>
        <View style={[styles.container, {backgroundColor}]}>
            <Text style={styles.title}>{title}</Text>
        </View>
      </TouchableOpacity>
    );
}

export default CustomButton

const styles=StyleSheet.create({
    container:{
        padding:10,
        borderWidth:1,
        borderRadius:5,
        borderColor:'#2cd18a',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'gray',
        minWidth:150,
        minHeight:50,
        marginBottom:10
    },
    title:{
        fontSize:16,
        color:'white',
        fontWeight:'bold'
    }
})
