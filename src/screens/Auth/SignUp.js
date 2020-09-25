import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import App from '../../API/firebaseConfig';
import { sign } from '../../store/Auth';
import { connect } from "react-redux";
import { authChangeListener } from "../../utils/authChangeListener";
import { createRestaurant } from '../../store/shop';


/*import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCMT1K832HGadLlX6S_rNuCDUgoiP8QWaY",
  authDomain: "restaurant-reservation-33a36.firebaseapp.com",
  databaseURL: "https://restaurant-reservation-33a36.firebaseio.com",
  projectId: "restaurant-reservation-33a36",
  storageBucket: "restaurant-reservation-33a36.appspot.com",
  messagingSenderId: "68147655954",
  appId: "1:68147655954:web:e688b1dbceec64227b2fcb",
  measurementId: "G-2LBCEY788Z"
};
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}*/

function mapStateToProps(state){
  return {
    shop:state.shop,
    auth:state.auth
  }
}

const SignUp= connect(mapStateToProps, {sign}) ((props)=>{
    const {sign}=props;
    console.log('props in shop: ',props);
    const [credentials,setCredentials]=useState({
        email:'',
        password:''
      })
      const signUpHandler=(credentials)=>{
        console.log('sign up fired');
        const {email, password}=credentials;
        console.log('email and pass',email,password);
        try {
            console.log('inside try block');
          //App.auth.createUserWithEmailAndPassword(email,password).then((userCredential)=>console.log(userCredential), (reason)=>console.log(reason));
          sign(email,password, 'test',false);          
        } catch (error) {
          console.log('error: ',error);
        }
    
      }
      const createRestHandler=()=>{
        createRestaurant('testREST','testLocation');
      }
      return (
         <View style={styles.container}>
           <Text>email</Text>
           <TextInput keyboardType={"email-address"} value={credentials.email} placeholder='email@sample.com' onChangeText={value=>{setCredentials(prevState=>{
             return {
               ...prevState,
               email:value
             }
           })}} />
           <Text>password</Text>
           <TextInput secureTextEntry placeholder='password' onChangeText={value=>{setCredentials(prevState=>{
             return {
               ...prevState,
               password:value
             }
           })}}/>
           <View style={{paddingTop:10}}>
            <Button style={{marginTop:20}} title='SignUp' onPress={()=>signUpHandler(credentials)} />
            <Button style={{marginTop:20}} title='CreateRestaurant' onPress={createRestHandler} />
           </View>
         </View>
      );
})



const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})
export default SignUp

  