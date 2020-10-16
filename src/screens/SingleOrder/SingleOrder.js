import React from 'react';
import {Text, View, TouchableOpacity, Alert} from 'react-native';
import styles from './styles'

const SingleOrder=(props)=>{
    return (
        <TouchableOpacity style={styles.container} onPress={props.onPress}>
            <View>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}> 
                    <Text style={{fontWeight:'bold'}}>
                        Sifariş 
                    </Text>
                    <Text>
                        {props.item.orderItem.title}
                    </Text>
                </View>

                <View style={{flexDirection:'row', justifyContent:'space-between'}}> 
                    <Text style={{fontWeight:'bold'}}>
                        Tarix 
                    </Text>
                    <Text>
                        {props.item.contactInfo.date}
                    </Text>
                </View>

                <View style={{flexDirection:'row', justifyContent:'space-between'}}> 
                    <Text style={{fontWeight:'bold'}}>
                        Zaman 
                    </Text>
                    <Text>
                        {props.item.contactInfo.time}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>

    )
}

export default SingleOrder