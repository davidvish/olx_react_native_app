const admin = require('firebase-admin')
const express = require('express')
const app = express()

var serviceAccount = require("./olxreactnative-61ddc-firebase-adminsdk-k1la9-9e202e29d8.json");

app.use(express.json())

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

app.post('/send-noti',(req,res)=>{
    console.log(req.body)
    const message = {
        notification:{
            title:"new ad",
            body:"new posted add imahegksjcj"
        },
        tokens:req.body.tokens
    }
    
    admin.messaging().sendMulticast(message).then(res=>{
        console.log("send success")
    }).catch(err  =>{
    console.log(err)
    })
    
})

app.listen(3000, ()=>{
    console.log('surver running')
})
