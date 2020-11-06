import React, { useEffect } from 'react';
import {View, Image, Text, StyleSheet, FlatList, TouchableHighlight} from 'react-native';
import { connect } from 'react-redux';
import { convertObToArr, getNumberOfRecipes } from '../../../data/MockDataAPI';
import { setCategories } from '../../../store/shop/categories';

import styles from './styles'

const mapStateToProps=(state)=>({
    categories:state.categories
})




const EditCategories=connect(mapStateToProps, {setCategories})((props)=>{
  const {navigation}=props;
  const renderCategory = ({ item }) => {
    item=Object.values(item)[0];
    console.log('item in categ',item)
  
    
    return (
    <TouchableHighlight 
    underlayColor='rgba(73,182,77,1,0.9)' 
    onPress={() =>props.navigation.navigate('EditSingleCategoryScreen',{item})}>
      <View style={styles.categoriesItemContainer}>
        <Image style={styles.categoriesPhoto} source={{ uri: item.photo_url }} />
        <Text style={styles.categoriesName}>{item.name}</Text>
        <Text style={styles.categoriesInfo}>{getNumberOfRecipes(item.id)} product</Text>
      </View>
    </TouchableHighlight>
  );
}

    console.log('props in edit categories: ',props);
    useEffect(()=>{
      props.setCategories()
      navigation.setOptions({
        title:'Edit Category'
      })
    },[])
    return (
        <View>
            <FlatList
            data={convertObToArr(props.categories)}
            renderItem={renderCategory}
            keyExtractor={item => `${item.id}`}
            />
        </View>
    )
})

export default EditCategories
