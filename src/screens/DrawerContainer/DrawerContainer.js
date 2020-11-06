import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import MenuButton from '../../components/MenuButton/MenuButton';
import { connect } from 'react-redux';
import { logOut } from '../../store/Auth';


const mapStateToProps=(state)=>({
  auth:state.auth
})
export default connect(mapStateToProps, {logOut})(class DrawerContainer extends React.Component {
  constructor(props){
    super(props);
  }


  render() {
    const auth=this.props.auth;

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
          {
            auth.userID?(
              <MenuButton
                title="LOG OUT"
                source={require('../../../assets/icons/register.png')}
                onPress={() => {
                  //LOG OUT ACTION
                  this.props.logOut()
                  navigation.closeDrawer();
            }}
          />
            ):(
              <MenuButton
                title="REGISTER"
                source={require('../../../assets/icons/register.png')}
                onPress={() => {
                  //LOG OUT ACTION
                  navigation.navigate('Register');
                  navigation.closeDrawer();
            }}
          />
            )
          }
          
          {
            auth?.isAdmin?(
              <>
              <MenuButton
            title="ORDERS"
            source={require('../../../assets/icons/order.png')}
            onPress={() => {
              navigation.navigate('Orders');
              navigation.closeDrawer();
            }}
          />
            <MenuButton
            title="EDIT CONTENT"
            source={require('../../../assets/icons/edit.png')}
            onPress={() => {
              navigation.navigate('Edit');
              navigation.closeDrawer();
            }}
          />
              </>
            ):null
          }
          
        </View>
      </View>
    );
  }
})

// DrawerContainer.propTypes = {
//   navigation: PropTypes.shape({
//     navigate: PropTypes.func.isRequired
//   })
// };
