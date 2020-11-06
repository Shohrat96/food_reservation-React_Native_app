import React, { useEffect, useLayoutEffect } from 'react';
import {View, Text, Image, Button, TouchableHighlight, TouchableOpacity,FlatList, ScrollView, Alert} from 'react-native';
import { connect } from 'react-redux';
import { convertObToArr, getCategoryName } from '../../../data/MockDataAPI';
import styles from './styles';
import BackButton from '../../../components/BackButton/BackButton';


const mapStateToProps=(state)=>({
    productsKeyInEdit:state.products,
    categories:state.categories
})
const EditScreen = connect(mapStateToProps)((props)=>{
    console.log('props in Edit page: ',props);
    const {navigation}=props;
    const productEditHandler=(product)=>{
      props.navigation.navigate('EditScreenSingle', { product });
    };
    

  //   useEffect(()=>{
  //     navigation.setOptions({
          
  //         title:'Edit'
  //     })
  // },[]);
  useEffect(()=>{
        navigation.setOptions({
            headerLeft:()=>{
                return (
                    <BackButton
                    onPress={()=>console.log(navigation)}
                />
                )
            },
            title:'Edit'
        })
    }, []);

    const renderProducts = ({ item }) => {
      item=Object.values(item)[0];
      return (
      <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' onPress={() => productEditHandler(item)}>
        <View style={styles.container}>
          <Image style={styles.photo} source={{ uri: item.photo_url }} />
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.category}>{getCategoryName(item.categoryId)}</Text>
        </View>
      </TouchableHighlight>
    )};

    return (
        <View>
            <TouchableOpacity style={
              {
               alignItems:'flex-end',
               padding:10,
               borderBottomWidth:1,
               borderBottomColor:'#2cd18a'
            }} 
            onPress={()=>navigation.navigate('EditCategoriesScreen')}>
                <Text style={{
                  fontSize:16,
                  fontWeight:'bold'
                }}>
                    Kateqoriyalara keçid
                </Text>
            </TouchableOpacity>
            <FlatList
            vertical
            showsVerticalScrollIndicator={true}
            numColumns={2}
            data={ convertObToArr(props.productsKeyInEdit)}
            renderItem={renderProducts}
            keyExtractor={item => `${item.recipeId}`}
            />
            <Button title='create product' onPress={()=>createNewProduct()}/>
      </View>
    )
})
export default EditScreen