import React from 'react';
import {View, Text, Image, TouchableOpacity, TextInput, StyleSheet, Dimensions, Alert} from 'react-native';

const { width: viewportWidth } = Dimensions.get('window');

const SingleIngredientInput=({name, onChangeText, onClose, idx})=>{
    return (
        <View style={styles.container}>
            <TextInput style={{width:'100%', paddingHorizontal:10}} value={name} onChangeText={(text)=>onChangeText(text,idx)}/>
            <TouchableOpacity style={styles.closeBtn} onPress={()=>onClose(idx)}>
                <Text style={{fontSize:20, color:'#2cd18a'}}>X</Text>
            </TouchableOpacity>
        </View>
    )
}

export default SingleIngredientInput

const styles=StyleSheet.create({
    container:{
        width:viewportWidth-40,
        borderColor:'#2cd18a',
        padding:10,
        borderWidth:1,
        borderRadius:5,
        marginVertical:10,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    closeBtn:{
        right:10,
    }
})