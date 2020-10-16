import React from 'react';
import { FlatList, ScrollView, Text, View, TouchableHighlight, Image } from 'react-native';
import styles from './styles';
import { recipes } from '../../data/dataArrays';
import MenuImage from '../../components/MenuImage/MenuImage';
import DrawerActions from 'react-navigation';
import { getCategoryName } from '../../data/MockDataAPI';
import SingleOrder from '../SingleOrder/SingleOrder';


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

export default class OrdersScreen extends React.Component {
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
  }

  onPressOrder = item => {
    this.props.navigation.navigate('OrderDetails', { item });
  };

  renderOrders = ({ item }) => (
    <SingleOrder onPress={()=>this.onPressOrder(item)} item={item}/>
  );

  render() {
    return (
      <>
      <View style={styles.container}>
        <FlatList
          vertical
          showsVerticalScrollIndicator={false}
          data={orders}
          renderItem={this.renderOrders}
          keyExtractor={item => `${item.recipeId}`}
        />
      </View>
      </>

    );
  }
}
