// import { WorldAlignment } from 'expo/build/AR';
import React from 'react';
import {View, Text, ActivityIndicator, TouchableOpacity, Image, StyleSheet} from 'react-native';
import SavePic from '../../../assets/icons/save.png';

const HeaderBtnSave=({onPress, disabled, loading})=>{
    return (
        <TouchableOpacity style={styles.container} onPress={onPress} disabled={disabled}>
            <View>
                {loading?
                    <ActivityIndicator color='#777' />
                :
                    <Image source={SavePic} style={{tintColor:disabled?'#ccc':'#000'}} />
                }
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