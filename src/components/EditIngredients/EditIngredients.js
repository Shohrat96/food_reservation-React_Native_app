import React from 'react';
import {View, Text, Image, TouchableOpacity, TextInput, StyleSheet, Dimensions, Alert} from 'react-native';

import SingleIngredientInput from './SingleIngredientInput'

const { width: viewportWidth } = Dimensions.get('window');

const EditIngredients=({ingredients, onChangeText, onClose})=>{
    return (
        <View style={styles.container}>
            {
                ingredients.length>0?(
                    ingredients.map((ingredient, index)=>{
                        return (
                            <SingleIngredientInput onClose={(index)=>onClose(index)} onChangeText={(text,index)=>onChangeText(text, index)} idx={index} key={index} name={ingredient.name}/>
                        )
                    })
                ):<Text>Məlumat yoxdur...</Text>
            }
        </View>
    )
}

export default EditIngredients

const styles=StyleSheet.create({
    container:{
        width:viewportWidth-40,
        borderColor:'#2cd18a',
        padding:10,
        borderRadius:5,
        justifyContent:'center',
        alignItems:'center',
    },
    closeBtn:{
        right:10,
    }
})