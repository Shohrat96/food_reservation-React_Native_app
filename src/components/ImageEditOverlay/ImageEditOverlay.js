import { useLinkProps } from '@react-navigation/native';
import React from 'react';
import {View, Text,TouchableOpacity, ImageBackground, StyleSheet} from 'react-native'
import { RecipeCard } from '../../AppStyles';

const ImageEditOverlay=({onPress, closeSign, source, onClose,photosize})=>{
    return (
        <TouchableOpacity onPress={onPress}>
            <ImageBackground style={[styles.photo, {margin:10, ...photosize}]} source={source}>
                <View style={styles.photoOverlay}>
                    <Text style={{color:'white', borderWidth:2, borderColor:'white', borderRadius:10, padding:10}}>Change</Text>
                </View> 
                {
                    closeSign && (
                        <TouchableOpacity onPress={onClose} style={{position:'absolute', 
                        right:0, 
                        top:0, 
                        zIndex:999, 
                        width:50, 
                        height:50, 
                        justifyContent:'center',
                        alignItems:'center'
                        }}>
                            <Text style={{color:'white',fontSize:20,fontWeight:'bold'}}>X</Text>
                        </TouchableOpacity>
                    )
                }
               
            </ImageBackground>
        </TouchableOpacity>
    )
}

export default ImageEditOverlay


const styles=StyleSheet.create({
    photo: RecipeCard.photo,
    photoOverlay:{
        backgroundColor:'rgba(0,0,0,0.5)', 
        position:'absolute', 
        top:0,
        bottom:0,
        left:0,
        right:0,
        zIndex:99, justifyContent:'center',
        alignItems:'center'
    },
})
