import React from 'react';
import { FlatList, ScrollView, Text, View, TouchableHighlight, Image, Alert } from 'react-native';
import styles from './styles';
import { recipes } from '../../data/dataArrays';
import MenuImage from '../../components/MenuImage/MenuImage';
import DrawerActions from 'react-navigation';
import { getCategoryName } from '../../data/MockDataAPI';
import { connect } from 'react-redux';
import { setData } from '../../store/shop/products';


const mapStateToProps=(state)=>{
  return {
    productsKeyInHome:state.products
  }
}

export default connect(mapStateToProps, {setData})(class HomeScreen extends React.Component {
  
  static navigationOptions = ({ navigation }) => ({
    title: 'Home',
    headerRight: (
      <MenuImage
        onPress={() => {
          navigation.openDrawer();
        }}
      />
    )
  });

  constructor(props) {
    super(props);
    this.state={data:null}
  }
  convertObToArr=(obj)=>{
    let resultArr=[]
    Object.keys(obj).map(key=>{
      resultArr=[...resultArr,obj[key]]
    })
    return resultArr
  }
  componentDidMount(){
    // fetch('https://restaurant-reservation-33a36.firebaseio.com/products.json',
    // {
    //   method: 'GET',
    //   headers:{
    //     Accept: 'application/json',
    //     'Content-Type':'application/json'
    //   }
    // }).then(resp=>resp.json()).then(data=>{this.setState({data:data});console.log(this.state.data)})
    this.props.setData()
  }

  onPressRecipe = item => {
    this.props.navigation.navigate('Recipe', { item });
  };

  renderRecipes = ({ item }) => (
    <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' onPress={() => this.onPressRecipe(item)}>
      <View style={styles.container}>
        <Image style={styles.photo} source={{ uri: item.photo_url }} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.category}>{getCategoryName(item.categoryId)}</Text>
      </View>
    </TouchableHighlight>
  );

  render() {
    console.log('props in home: ',this.props)
    return (
      <View>
        <FlatList
          vertical
          showsVerticalScrollIndicator={true}
          numColumns={2}
          data={this.convertObToArr(this.props.productsKeyInHome)}
          renderItem={this.renderRecipes}
          keyExtractor={item => `${item.recipeId}`}
        />
      </View>
    );
  }
})
