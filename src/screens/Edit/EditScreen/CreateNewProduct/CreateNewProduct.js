import React, { useEffect, useState } from 'react';
import {View, Image, Text, StyleSheet, Dimensions} from 'react-native';
import ImageEditOverlay from '../../../../components/ImageEditOverlay/ImageEditOverlay';

const { width: viewportWidth } = Dimensions.get('window');

const defaultImageUri=`https://firebasestorage.googleapis.com/v0/b/restaurant-reservation-33a36.appspot.com/o/default_avatar%2FWebp.net-compress-image.jpg?alt=media&token=de5b3fcb-09c0-4bb1-bdeb-5df6237d3b58`

const CreateNewProduct=(props)=>{

    const {navigation}=props;
    const [modal, setModal]=useState(false)
    const [newProduct, setNewProduct]=useState({
        mainImageUri:"",
        category:'',
        title:'',
        price:'',
        secondaryPhotos:[],
        ingredients:[]
    })
    useEffect(()=>{
        navigation.setOptions({
            title:'Create New Product'
        })
    }, []);
    return (
        <View style={styles.container}>
            <ImageEditOverlay
            onPress={()=>setModal(true)}
            closeSign={false}
            source={mainImageUri || defaultImageUri }
            photosize={viewportWidth}
            />
        </View>
    )
}

export default CreateNewProduct

const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})