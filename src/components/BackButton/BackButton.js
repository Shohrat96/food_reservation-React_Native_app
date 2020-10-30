import React from 'react';
import { TouchableHighlight, Image, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import {withNavigation} from 'react-navigation';


class BackButton extends React.Component {
  render() {
    return (
      <TouchableHighlight onPress={this.props.onPress} style={styles.btnContainer}>
        <Image source={require('../../../assets/icons/backArrow.png')} style={styles.btnIcon} />
      </TouchableHighlight>
    );
  }
}

export default withNavigation(BackButton)

BackButton.propTypes = {
  onPress: PropTypes.func,
  source: PropTypes.number,
  title: PropTypes.string
};
