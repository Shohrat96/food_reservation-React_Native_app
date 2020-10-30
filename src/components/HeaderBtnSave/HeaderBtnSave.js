import { WorldAlignment } from 'expo/build/AR';
import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import SavePic from '../../../assets/icons/save.png';

const HeaderBtnSave=({onPress})=>{
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View>
                <Image source={SavePic}/>
            </View>
        </TouchableOpacity>
    )
}

export default HeaderBtnSave

const styles=StyleSheet.create({
    container:{
        width:50,
        height:50,
        position:'absolute',
        justifyContent:'center',
        alignItems:'center'
    }
})