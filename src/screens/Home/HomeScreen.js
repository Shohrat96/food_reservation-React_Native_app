import React from 'react';
import { FlatList, ScrollView, Text, View, TouchableHighlight, Image, Alert, Button } from 'react-native';
import styles from './styles';
import { recipes } from '../../data/dataArrays';
import MenuImage from '../../components/MenuImage/MenuImage';
import DrawerActions from 'react-navigation';
import { convertObToArr, getCategoryName, setAutoId } from '../../data/MockDataAPI';
import { connect } from 'react-redux';
import { setData } from '../../store/shop/products';
import App from '../../API/firebaseConfig';


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
  
  /*convertObToArr=(obj)=>{
    console.log('obj in home: ',obj);
    console.log('props in home: ',this.props)
    

    // let resultArr=[]
    // Object.keys(obj).map(key=>{
    //   resultArr=[...resultArr,obj[key]]
    // })
    // return resultArr
  }*/
  componentDidMount(){
    // fetch('https://restaurant-reservation-33a36.firebaseio.com/products.json',
    // {
    //   method: 'GET',
    //   headers:{
    //     Accept: 'application/json',
    //     'Content-Type':'application/json'
    //   }
    // }).then(resp=>resp.json()).then(data=>{this.setState({data:data});console.log(this.state.data)})
    this.props.setData();
    //setAutoId('products')
  }
  
  onPressRecipe = item => {
    this.props.navigation.navigate('Recipe', { item });
  };

  renderProducts = ({ item }) => {
    item=Object.values(item)[0];
    return (
    <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' onPress={() => this.onPressRecipe(item)}>
      <View style={styles.container}>
        <Image style={styles.photo} source={{ uri: item.photo_url }} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.category}>{getCategoryName(item.categoryId)}</Text>
      </View>
    </TouchableHighlight>
  )};

  render() {
    console.log('productsKeyInHome in home: ',this.props.productsKeyInHome);
    
    const newProd={
      categoryId: 3,
      ingredients: [
        [
          'yağ',
          '200ml'
        ],
        [
          'yağ',
          '5g'
        ],
        [
          'yağ',
          '300g'
        ]
      ],
      photo_url: 'https://www.texanerin.com/content/uploads/2019/06/nobake-chocolate-cookies-1-650x975.jpg',
      photosArray: [
        'https://www.texanerin.com/content/uploads/2019/06/nobake-chocolate-cookies-1-650x975.jpg',
        'https://namelymarly.com/wp-content/uploads/2018/04/20180415_Beet_Lasagna_10.jpg',
        'https://advancelocal-adapter-image-uploads.s3.amazonaws.com/image.al.com/home/bama-media/width600/img/news_impact/photo/burger-fijpg-57e7e5907630c2ad.jpg',
        'https://img.thedailybeast.com/image/upload/c_crop,d_placeholder_euli9k,h_1439,w_2560,x_0,y_0/dpr_1.5/c_limit,w_1044/fl_lossy,q_auto/v1492718105/articles/2013/09/24/burger-king-s-new-french-fries-took-ten-years-to-develop/130923-gross-burger-tease_izz59e',
        'https://aht.seriouseats.com/images/2012/02/20120221-193971-fast-food-fries-Burger-King-fries-2.jpg'
      ],
      recipeId: 122,
      time: '15555',
      title: 'Test'
    }
    
    return (
      <View>
        <FlatList
          vertical
          showsVerticalScrollIndicator={true}
          numColumns={2}
          data={ convertObToArr(this.props.productsKeyInHome)}
          renderItem={this.renderProducts}
          keyExtractor={item => `${item.recipeId}`}
        />
      </View>
    );
  }
})
