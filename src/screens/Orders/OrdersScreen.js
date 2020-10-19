import React from 'react';
import { FlatList, ScrollView, Text, View, TouchableHighlight, Image } from 'react-native';
import styles from './styles';
import { recipes } from '../../data/dataArrays';
import MenuImage from '../../components/MenuImage/MenuImage';
import DrawerActions from 'react-navigation';
import { getCategoryName } from '../../data/MockDataAPI';
import SingleOrder from '../SingleOrder/SingleOrder';
import { connect } from 'react-redux';
import { setOrders } from '../../store/shop/orders';


const orders=[
  {
    contactInfo:{
      name:'name1',
      surname:'surname1',
      date:'10/10/2020',
      time:'17:00',
      countFood:2,
      countPerson:1,
      number:'0505505050'
    },
    orderItem:{
      title:'Triple Berry Smoothie',
    },
    id:1
  },
  {
    contactInfo:{
      name:'name2',
      surname:'surname2',
      date:'12/10/2020',
      time:'18:00',
      countFood:2,
      countPerson:1,
      number:'0505505050'

    },
    orderItem:{
      title:'Some Title 2',
    },
    id:2
  },
  {
    contactInfo:{
      name:'name3',
      surname:'surname3',
      date:'13/10/2020',
      time:'19:00',
      countFood:2,
      countPerson:1,
      number:'0505505050'

    },
    orderItem:{
      title:'Some Title 3',
    },
    id:3
  }
]

const mapStateToProps=(state)=>({
  orders:state.orders
})

export default connect(mapStateToProps,{setOrders}) (class OrdersScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Orders',
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
    this.state={
      data:null
    }
    this.convertObjToArr=this.convertObjToArr.bind(this)
  }
  
  convertObjToArr(inputObj){
    const keysArray=Object.keys(inputObj);
    const valuesArray=Object.values(inputObj);
    let resultArr=[]
    for (let i=0;i<keysArray.length;i++){
      const curObj={}
      curObj[keysArray[i]]=valuesArray[i];
      resultArr.push(curObj)
    }
    return resultArr
  }
  
  componentDidMount(){
    // fetch('https://restaurant-reservation-33a36.firebaseio.com/orders.json',
    // {
    //   method: 'GET',
    //   headers:{
    //     Accept: 'application/json',
    //     'Content-Type':'application/json'
    //   }
    // }).then(resp=>resp.json()).then(result=>{
    //   this.setState({data:this.convertObjToArr(result)});
      
    //   console.log('state inside fetch : ',this.state.data)
    // })

    this.props.setOrders()
  }

  onPressOrder = item => {
    this.props.navigation.navigate('OrderDetails', { item });
  };

  renderOrders = ({ item }) => (
    <SingleOrder onPress={()=>this.onPressOrder(item)} item={item}/>
  );
  convertObToArr=(obj)=>{
    let resultArr=[]
    Object.keys(obj).map(key=>{
      resultArr=[...resultArr,obj[key]]
    })
    return resultArr
  };
  render() {
    console.log('props in ordersscreen:',this.props.orders)
    return (
      <>
      <View style={styles.container}>
        <FlatList
          vertical
          showsVerticalScrollIndicator={false}
          data={this.convertObToArr(this.props.orders)}
          renderItem={this.renderOrders}
          keyExtractor={item => Object.keys(item)[0]}
        />
      </View>
      </>

    );
  }
})
