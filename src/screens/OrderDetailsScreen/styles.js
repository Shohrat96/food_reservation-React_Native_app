import {StyleSheet} from 'react-native';
const PRIMARY_COLOR='#2cd18a'


const styles=StyleSheet.create({
    container:{
        flex:1,
        padding:10,
    },
    orderDetailSection:{
        marginBottom: 15
    },
    contactInfoSection:{
        backgroundColor:'grey',
        borderRadius:5,
    },
    orderDetailWrapper:{
        borderBottomWidth:1,
        borderColor:PRIMARY_COLOR,
        marginBottom:10,
        padding:5
    },
    orderField:{
        fontWeight:'bold',
        fontSize:18
    },
    orderFieldValue:{
        fontSize:16
    }
})

export default styles