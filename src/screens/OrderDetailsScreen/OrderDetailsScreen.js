import React from 'react';
import {View, Text} from 'react-native';
import styles from './styles'


const OrderDetailsScreen=(props)=>{
    const {contactInfo, orderedItem}=props.navigation.state.params.item;
    console.log('props in props in orderdetails: ',props.navigation.state.params.item);

    return (
        <View style={styles.container}>
            <View style={styles.orderDetailSection}>
                <View style={styles.orderDetailWrapper}> 
                        <Text style={styles.orderField}>
                            Sifariş 
                        </Text>
                        <Text style={styles.orderFieldValue}>
                            {orderedItem.title}
                        </Text>
                </View>
                <View style={styles.orderDetailWrapper}> 
                        <Text style={styles.orderField}>
                            Tarix 
                        </Text>
                        <Text style={styles.orderFieldValue}>
                            {contactInfo.dateOnly}
                        </Text>
                </View>
                <View style={styles.orderDetailWrapper}> 
                        <Text style={styles.orderField}>
                            Zaman 
                        </Text>
                        <Text style={styles.orderFieldValue}>
                            {contactInfo.timeOnly}
                        </Text>
                </View>

                <View style={styles.orderDetailWrapper}> 
                        <Text style={styles.orderField}>
                            Porsiya 
                        </Text>
                        <Text style={styles.orderFieldValue}>
                            {contactInfo.countFood}
                        </Text>
                </View>
                <View style={styles.orderDetailWrapper}> 
                        <Text style={styles.orderField}>
                            Adam sayı 
                        </Text>
                        <Text style={styles.orderFieldValue}>
                            {contactInfo.countPerson}
                        </Text>
                </View>
            </View>

            <View style={styles.contactInfoSection}>
                <View style={styles.orderDetailWrapper}> 
                    <Text style={styles.orderField}>
                        Ad 
                    </Text>
                    <Text style={styles.orderFieldValue}>
                        {contactInfo.name}
                    </Text>
                </View>
                <View style={styles.orderDetailWrapper}> 
                    <Text style={styles.orderField}>
                        Soyad 
                    </Text>
                    <Text style={styles.orderFieldValue}>
                        {contactInfo.surname}
                    </Text>
                </View>
                <View style={styles.orderDetailWrapper}> 
                    <Text style={styles.orderField}>
                        Mobil nömrə 
                    </Text>
                    <Text style={styles.orderFieldValue}>
                        {contactInfo.number}
                    </Text>
                </View>
            </View>
            
        </View>
    )
}

export default OrderDetailsScreen