import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import MenuButton from '../../components/MenuButton/MenuButton';



export default class DrawerContainer extends React.Component {
  constructor(props){
    super(props);
    this.state={
      flag:true
    }
  }
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.content}>
        <View style={styles.container}>
          <MenuButton
            title="HOME"
            source={require('../../../assets/icons/home.png')}
            onPress={() => {
              navigation.navigate('Home');
              navigation.closeDrawer();
            }}
          />
          <MenuButton
            title="CATEGORIES"
            source={require('../../../assets/icons/category.png')}
            onPress={() => {
              navigation.navigate('Categories');
              navigation.closeDrawer();
            }}
          />
          <MenuButton
            title="SEARCH"
            source={require('../../../assets/icons/search.png')}
            onPress={() => {
              navigation.navigate('Search');
              navigation.closeDrawer();
            }}
          />
          <MenuButton
            title="ORDERS"
            source={require('../../../assets/icons/search.png')}
            onPress={() => {
              navigation.navigate('Orders');
              navigation.closeDrawer();
            }}
          />
          <MenuButton
            title="REGISTER"
            source={require('../../../assets/icons/search.png')}
            onPress={() => {
              navigation.navigate('Register');
              navigation.closeDrawer();
            }}
          />
          {
            this.state.flag?
            <MenuButton
            title="EDIT CONTENT"
            source={require('../../../assets/icons/search.png')}
            onPress={() => {
              navigation.navigate('Register');
              navigation.closeDrawer();
            }}
          />:null
          }
        </View>
      </View>
    );
  }
}

DrawerContainer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  })
};
