import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Alert } from 'react-native';
import App from '../../API/firebaseConfig';
import { sign } from '../../store/Auth';
import { connect } from "react-redux";
import { auth } from 'firebase';
import { registerForPushNotificationsAsync } from '../../../PushNotificationManager';

function mapStateToProps(state){
  return {
    auth:state.auth
  }
}

const RegisterScreen= React.memo(connect(mapStateToProps, {sign}) ((props)=>{
    const {sign,navigation}=props;
    console.log('props in shop: ',props);
    const [credentials,setCredentials]=useState({
        email:'',
        password:'',
        repeatPass:''
      });
      const [curState,setCurState]=useState('login');
      const signUpHandler= async (credentials)=>{
        const {email, password, repeatPass}=credentials;
        if (curState==='login'){
          try {
            if (email.trim().length && password.trim().length){            
             const login= await sign(email,password, 'test',true); 
             console.log('uesr in aut hfdsknfkldsnfkldsnfkldsnfkn sl: ',props.auth)
             registerForPushNotificationsAsync(props.auth.userID);

              console.log('login result: ',login)        
            } else {
              Alert.alert('Bütün xanaları doldurun...');
              console.log('Bütün xanaları doldurun...');
              
            }
          } catch (error) {
            console.log('error: ',error);
          }
        } else if (curState==='signup'){
          try {
            let check=(Object.values(credentials).every(field=>{
              return field.trim().length>0;
            }))
            if (check){
              if (repeatPass===password){
                sign(email,password, 'test',false);          
              } else {
                console.log("password doesn't match...")
                Alert.alert("password doesn't match...")
              }
            } else {
              console.log('Bütün xanaları doldurun...');

              Alert.alert('Bütün xanaları doldurun...');
            }
          } catch (error) {
            console.log('error: ',error);
            Alert.alert('error: ',error);
          }
        }
      }
      console.log('props in register: ',props);
      useEffect(()=>{
        if (props.auth.userID){

          navigation.navigate('Home');
        }
      },[props.auth?.userID])
      return (
        
         <View style={styles.container}>
           <View style={{
             flexDirection:'row',
             justifyContent:'center',
             backgroundColor:'red'
           }}>
              <TouchableOpacity 
              style={{
                marginRight:10
              }}
              onPress={()=>setCurState('signup')}
              >
                  <Text>Sign Up</Text>
              </TouchableOpacity>
              <TouchableOpacity
              onPress={()=>setCurState('login')}
              >
                  <Text>Log In</Text>
              </TouchableOpacity>
           </View>
           <Text>email</Text>
           <TextInput keyboardType={"email-address"} value={credentials.email} placeholder='email@sample.com' onChangeText={value=>{setCredentials(prevState=>{
             return {
               ...prevState,
               email:value
             }
           })}} />
           <Text>password</Text>
           <TextInput secureTextEntry placeholder='password' value={credentials.password} onChangeText={value=>{setCredentials(prevState=>{
             return {
               ...prevState,
               password:value
             }
           })}}/>
           {
             curState==='signup'?(
               <>
                  <Text>Repeat password</Text>
                  <TextInput secureTextEntry placeholder='repeat password' value={credentials.repeatPass} onChangeText={value=>{setCredentials(prevState=>{
                    return {
                      ...prevState,
                      repeatPass:value
                    }
                  })}}/>
                
               </>):null
           }
           <View style={{paddingTop:10}}>
            <Button style={{marginTop:20}} title='Submit' onPress={()=>signUpHandler(credentials)} />
           </View>
         </View>
      );
}))



const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})
export default RegisterScreen

  