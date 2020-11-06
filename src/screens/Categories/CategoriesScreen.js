import React from 'react';
import {
  FlatList,
  Text,
  View,
  Image,
  TouchableHighlight, Button
} from 'react-native';
import styles from './styles';
import { categories } from '../../data/dataArrays';
import { convertObToArr, getNumberOfRecipes, setAutoId } from '../../data/MockDataAPI';
import { connect } from 'react-redux';
import { setCategories } from '../../store/shop/categories';
import App from '../../API/firebaseConfig';


const mapStateToProps=(state)=>({
  categories:state.categories
})

export default connect(mapStateToProps,{setCategories}) (class CategoriesScreen extends React.Component {
  static navigationOptions = {
    title: 'Categories'
  };

  constructor(props) {
    super(props);
  }
  sendNewCategory= async (category)=>{
    App.db.ref(`categories/`).push(category);
  }
  onPressCategory = item => {
    console.log('item in onpress: ',item)
    const title = item.name;
    const category = item;
    this.props.navigation.navigate('RecipesList', { category, title });
  };
  
  renderCategory = ({ item }) => {
    item=Object.values(item)[0];
    console.log('item in categ',item)

    return (
    <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' onPress={() => this.onPressCategory(item)}>
      <View style={styles.categoriesItemContainer}>
        <Image style={styles.categoriesPhoto} source={{ uri: item.photo_url }} />
        <Text style={styles.categoriesName}>{item.name}</Text>
        <Text style={styles.categoriesInfo}>{getNumberOfRecipes(item.id)} product</Text>
      </View>
    </TouchableHighlight>
  );}

  componentDidMount(){
    this.props.setCategories();
    //setAutoId('categories');
  }
  render() {
    
    
    console.log('props in categories: ',convertObToArr(this.props.categories))
    return (
      <View>
        
        <FlatList
          data={convertObToArr(this.props.categories)}
          renderItem={this.renderCategory}
          keyExtractor={item => `${item.id}`}
        />
        
      </View>
    );
  }
})
