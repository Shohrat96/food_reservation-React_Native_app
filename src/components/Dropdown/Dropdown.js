import React, { useEffect, useState } from 'react';
import {View,Button, Image, Text, FlatList,TouchableOpacity, TextInput, ImageBackground,ScrollView, Alert} from 'react-native'
import RNPickerSelect from 'react-native-picker-select';

const Dropdown = (props) => {

    return (
        <RNPickerSelect {...props}/>
    );
};
export default Dropdown

