import {Dimensions, StyleSheet} from 'react-native';
import { RecipeCard } from '../../AppStyles';
const { width: viewportWidth } = Dimensions.get('window');
const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    photo: RecipeCard.photo,
    productTitle:{
        fontSize:16,
        fontWeight:'bold',
        margin:10
    },
    photoOverlay:{
        backgroundColor:'rgba(0,0,0,0.5)', 
        position:'absolute', 
        top:0,
        bottom:0,
        left:0,
        right:0,
        zIndex:99, justifyContent:'center',
        alignItems:'center'
    },
    scrollContent:{
        alignItems:'center'
    },
    changeBtnTxt:{
        color:'white',
        borderWidth:2,
        borderColor:'white',
        borderRadius:10,
        padding:10
    },
    ingredientsEdit:{
        justifyContent:'center',
        alignItems:'center'
    },
    ingredientItem:{
        width:viewportWidth-40,
        borderColor:'#2cd18a',
        padding:10,
        borderWidth:1,
        borderRadius:5,
        marginVertical:10
    }
})

export default styles