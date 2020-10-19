import React, { useState } from 'react';
import {Text, View, TouchableOpacity, Alert} from 'react-native';
import styles from './styles'

const SingleOrder=(props)=>{
    console.log('item in single oredr,',props.item)
    const {contactInfo, orderedItem}=props.item;
    

    return (
        <TouchableOpacity style={styles.container} onPress={props.onPress}>
            <View>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}> 
                    <Text style={{fontWeight:'bold'}}>
                        Sifariş 
                    </Text>
                    <Text>
                        {orderedItem.title}
                    </Text>
                </View>

                <View style={{flexDirection:'row', justifyContent:'space-between'}}> 
                    <Text style={{fontWeight:'bold'}}>
                        Tarix 
                    </Text>
                    <Text>
                        {contactInfo.date}
                    </Text>
                </View>

                <View style={{flexDirection:'row', justifyContent:'space-between'}}> 
                    <Text style={{fontWeight:'bold'}}>
                        Zaman
                    </Text>
                    <Text>
                        {contactInfo.time}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>

    )
}

export default SingleOrder