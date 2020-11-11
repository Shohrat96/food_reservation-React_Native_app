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
// modify this function to suit your orders collection properties
exports.sendNotificationToAdminOnNewOrder = functions.firestore.document('orders/{id}').onCreate(async (snap,context) => {
    const uid = snap.data().idClient;
    const title = "New Order Received";
    const products =snap.data().listProducts // change this the respective property: should be the list of orders
    const content = `Nuevo pedido de productos, confirme la compra`;
    
    // get the admin user
    let adminUser = await admin.firestore().collection("users").where("type","==",'admin').get();
    if (!adminUser.empty) {
        adminUser.forEach(async(token) => {
            let fcmToken = token.data()['/expoToken'];
            const messageTemplate=`
            ***New Order Received***
            Sifariş: ${title},
            Tarix: ,
            Zaman: 
          `
          const message = {
            to: fcmToken,
            sound: 'default',
            title: 'Original Title',
            body: messageTemplate,
            data: {message:messageTemplate,id:snap.id,route:"SingleOrder"},
          };
          // request to expo to send Push Notification
            fetch('https://exp.host/--/api/v2/push/send',{
                method:"POST",
                headers: {
                    Accept: 'application/json',
                    'Accept-encoding': 'gzip, deflate',
                    'Content-Type': 'application/json',
                  },
                body:JSON.stringify(message)
            })
        });
    }
});
