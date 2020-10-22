import React from 'react';
import {View, Text, Image, Button,TouchableHighlight,FlatList, ScrollView} from 'react-native';
import { connect } from 'react-redux';
import { convertObToArr, getCategoryName } from '../../../data/MockDataAPI';
import styles from './styles';


const mapStateToProps=(state)=>({
    productsKeyInEdit:state.products
})
const EditScreen = connect(mapStateToProps)((props)=>{
    console.log('props in Edit page: ',convertObToArr(props.productsKeyInEdit));

    const productEditHandler=(product)=>{
      props.navigation.navigate('SingleProductEdit', { product });
    };

    const createNewProduct=()=>{
    
    }

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