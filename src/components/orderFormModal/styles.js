import { Dimensions, StyleSheet } from 'react-native';
const PRIMARY_COLOR='#2cd18a'
const SECONDARY_COLOR='rgba(0,0,0,0.3)'

const styles=StyleSheet.create({
    container:{
        position:'absolute',
        zIndex:5,
        width:'100%',
        height:Dimensions.get('window').height,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        justifyContent:'center',
        alignItems:'center',
        flex:1,
    },
    contentWrap:{
        marginTop:-70,
        width:'70%',
        backgroundColor:'white',
        borderWidth:2,
        borderColor:PRIMARY_COLOR,
        borderRadius:10,
        padding:10
    },
    buttonsContainer:{
        flexDirection:'row',
        justifyContent:'space-around',
        marginBottom:10,
        marginTop:10
    },
    button:{
        padding:10,
        borderWidth:1,
        borderRadius:10
    },
    buttonCancel:{
        borderColor:SECONDARY_COLOR,
    },
    buttonConfirm:{
        borderColor:PRIMARY_COLOR,
        backgroundColor:PRIMARY_COLOR,
    },
    inputField:{
        
    },
    dateAndTime:{
        justifyContent:'space-between',
        flexDirection:'row',
        marginTop:10
    },
    selectDateBtn:{
        borderWidth:1,
        padding:10,
        borderRadius:10
    },
    selectTimeBtn:{
        borderWidth:1,
        padding:10,
        borderRadius:10
    }

})
export default styles