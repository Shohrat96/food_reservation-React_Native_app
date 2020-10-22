import {StyleSheet} from 'react-native';
import { RecipeCard } from '../../AppStyles';

const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    photo: RecipeCard.photo,
    productTitle:{
        fontSize:16,
        fontWeight:'bold',
        margin:10
    }
})

export default styles