import React from 'react';
import { TouchableHighlight, Image, Text, View, Alert } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import App from '../../API/firebaseConfig';


export default class PlaceOrderButton extends React.Component {

    onPress=()=>{
        this.props.orderStart();
    }
  render() {
    return (
      <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' onPress={this.onPress}>
        <View style={styles.container}>
          <Text style={styles.text}>Place Order</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

PlaceOrderButton.propTypes = {
  onPress: PropTypes.func,
  source: PropTypes.number,
  title: PropTypes.string
};
