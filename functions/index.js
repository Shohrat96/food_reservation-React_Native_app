const functions = require('firebase-functions');
const fetch=require('node-fetch');

const admin=require('firebase-admin');
const { Alert } = require('react-native');
admin.initializeApp(functions.config().firebase);

/*exports.sendPushNotification=functions.database.ref(`orders/{id}`).onCreate(
    (event)=>{
        const root=event.data.ref.root;
        var messages=[];
        return root.child('/users').once('value').then(function(snapshot){
            snapshot.forEach(function(childSnapshot){
                var expoToken=childSnapshot.val().expoToken;
                if (expoToken){
                    messages.push({
                        "to":'ExponentPushToken[_PlJ-4DHJ5DNALuR6_xDQg]',
                        "body":"new note added"
                    })
                }
            })
            return Promise.all(messages)
        }).then(messages=>{
            fetch('https://exp.host/--/api/v2/push/send',{
                method:"POST",
                headers:{
                    "Accept":"application/json",
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(messages)
            })
        })
    }
)*/

exports.sendPushNotification=functions.database.ref("orders/").onCreate(
    ()=>{
        fetch('https://exp.host/--/api/v2/push/send',{
                method:"POST",
                headers: {
                    Accept: 'application/json',
                    'Accept-encoding': 'gzip, deflate',
                    'Content-Type': 'application/json',
                  },
                body:JSON.stringify({
                    "to":'ExponentPushToken[_PlJ-4DHJ5DNALuR6_xDQg]',
                    "body":"new note added"
                })
            })
    }
)
