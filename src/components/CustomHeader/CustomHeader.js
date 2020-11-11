import React from 'react';
import {View,Text,StyleSheet,TouchableOpacity, Alert} from 'react-native';
import BackButton from '../BackButton/BackButton';
import MenuImage from '../MenuImage/MenuImage';

const CustomHeader=(props)=>{
    const {params}=props;
    console.log('props in custom header: ',params);
    return (
        <View style={styles.container}>
            {
                !params.navigation.isFirstRouteInParent() && <BackButton onPress={()=>params.navigation.goBack()}/>
            }
            <View style={styles.headerTitleWrap}>
                <Text style={styles.headerTitle}>{params.navigation.state.routeName}</Text>
            </View>
            <View style={styles.menuImage}>
                <MenuImage onPress={()=>params.navigation.openDrawer()}/>
            </View>
            
        </View>
    )
}

export default CustomHeader

const styles=StyleSheet.create({
    container:{
        height:60,
        flexDirection:'row',
        justifyContent:'space-between',
        padding:20,
        alignItems:'center',
    },
    headerTitleWrap:{

    },
    headerTitle:{
        fontWeight:'bold',
        fontSize:18
    }
})
