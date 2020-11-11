import React from 'react';
import { TouchableHighlight, Image, Text, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

export default class MenuButton extends React.Component {
  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        style={styles.btnClickContain}
        underlayColor="rgba(128, 128, 128, 0.1)"
      >
        <View style={styles.btnContainer}>
          <Image source={this.props.source} style={styles.btnIcon} />
          <Text style={styles.btnText}>{this.props.title}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

MenuButton.propTypes = {
  onPress: PropTypes.func,
  source: PropTypes.number,
  title: PropTypes.string
};
