import React, { useState } from 'react';
import {View, Image, Text, FlatList,TouchableOpacity, TextInput, ImageBackground,ScrollView} from 'react-native'
import styles from './styles';

const SingleProductEditScreen=(props)=>{
    
    const product=props.navigation.getParam('product')
    console.log('props in edit page : ',product);


    const [productProperties, editProductProperties]=useState({
        title:product.title,
        category:product.categoryId,
        photoUrl:product.photo_url,
        photosArray:product.photosArray,
    })

    const renderProductImage=({item})=>{
        return (
            <TouchableOpacity>
                <ImageBackground style={[styles.photo, {margin:10}]} source={{ uri: item }}>
                    <View style={{backgroundColor:'rgba(0,0,0,0.5)', position:'absolute', top:0,bottom:0,left:0,right:0,zIndex:99, justifyContent:'center',alignItems:'center'}}>
                        <Text style={{color:'white', borderWidth:2, borderColor:'white', borderRadius:10, padding:10}}>Change</Text>
                    </View>
                </ImageBackground>
            </TouchableOpacity>
        )
    }


    return (
        <View style={styles.container}>
            <ScrollView>
                <TouchableOpacity style={{justifyContent:'center', alignItems:'center'}}>
                    <Image style={[styles.photo, {margin:10}]} source={{ uri: product.photo_url }} />
                </TouchableOpacity>

                <TextInput style={styles.productTitle} value={product.title}/>

                {
                    product.photosArray.length>0? (
                        <FlatList
                        vertical
                        showsVerticalScrollIndicator={true}
                        numColumns={2}
                        data={product.photosArray}
                        renderItem={renderProductImage}
                        keyExtractor={item => `${item.recipeId}`}
                />
                    ):null
                }
            </ScrollView>

            
            

        </View>
    )
}

export default SingleProductEditScreen