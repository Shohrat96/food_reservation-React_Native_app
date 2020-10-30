import { StyleSheet, Dimensions } from 'react-native';

const { width: viewportWidth } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1
  },
  carouselContainer: {
    minHeight: 250
  },
  carousel: {},

  image: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: 250
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    width: viewportWidth,
    height: 250
  },
  paginationContainer: {
    flex: 1,
    position: 'absolute',
    alignSelf: 'center',
    paddingVertical: 8,
    marginTop: 200
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 0
  },
  infoRecipeContainer: {
    flex: 1,
    margin: 25,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  infoPhoto: {
    height: 20,
    width: 20,
    marginRight: 0
  },
  infoRecipe: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  category: {
    fontSize: 14,
    fontWeight: 'bold',
    margin: 10,
    color: '#2cd18a'
  },
  infoDescriptionRecipe: {
    fontSize: 16,
    marginTop: 10,
    margin: 15,
    flexDirection:'row',
    flexWrap:'wrap',
    //justifyContent:'space-between'
  },
  singleIngredient:{
    padding:10,
    paddingVertical:8,
    borderColor:'#2cd18a',
    borderWidth:1,
    borderRadius:10,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#2cd18a',
    margin:10,
    minWidth:60
  },
  infoRecipeName: {
    fontSize: 28,
    margin: 10,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center'
  },
  ingredientsTitle:{
    fontSize:18,
    fontWeight:'bold',
    marginTop:20
  }
});

export default styles;
