import { View, Text, KeyboardAvoidingView,Alert } from 'react-native'
import React, {useState} from 'react';
import { TextInput,Button } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import { styles } from './CreateAds.style';



const CreateAdsScreen = () => {
  const [name,setName] = useState('')
  const [desc,setDesc] = useState('')
  const [year, setYear] = useState('')
  const [price, setPrice] = useState('')
  const [phone, setPhone] = useState('')
  const [image, setImage] = useState('')

  const sendNotification = () => {
    firestore().collection('usertoken').get().then(querySnap=>{
     const userDevicetoken = querySnap.docs.map(docSnap=>{
        return docSnap.data().token
      })
      console.log(userDevicetoken)
      fetch('https://66d3-103-203-230-34.ngrok.io/send-noti'), ({
        method:'post',
        headers: {
          'Content-Type': 'application/json'
         
        },
        body:JSON.stringify({
          tokens:userDevicetoken
        })
      })
    })
  }

  const postData = async () => {
    if(!name||!desc||!year||!price||!phone) {
      Alert.alert('Please all the fields');
      return
  } 
    try {
    const result =  await firestore().collection('ads')
      .add({
        name,
        desc,
        year,
        price,
        phone,
        image,
        uid:auth().currentUser.uid
      })
      Alert.alert('Posted you Ads.')
    } catch (error) {
      Alert.alert('Something Wrong try again.')
    }
  }

  const openCamera = () => {
    launchImageLibrary({quality:0.5},(fileObj) =>{
      console.log(fileObj.assets[0].uri)
     const uploadTask = storage().ref().child(`/items/${Date.now()}`).putFile(fileObj.assets[0].uri.split('file://')[1]);
     uploadTask.on('state_changed', 
        (snapshot) => {
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          //console.log('Upload is ' + progress + '% done');
          if(progress==100){
            alert("uploaded")

          }
        }, 
        (error) => {
          alert(error)
        }, 
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            //console.log('File available at', downloadURL);
            setImage(downloadURL)
          });
        }
      );
          })
        }


  return (
   
    <View style={styles.container}>
      <Text style={styles.text}>CreateAdsScreen</Text>
      <TextInput
        label="Name"
        value={name}
        onChangeText={text => setName(text)}
        mode="outlined"
        />
         <TextInput
        label="Descriptions"
        value={desc}
        numberOfLines={3}
        onChangeText={text => setDesc(text)}
        mode="outlined"
        />
         <TextInput
        label="Year of purchase"
        value={year}
        keyboardType="numeric"
        onChangeText={text => setYear(text)}
        mode="outlined"
        />
         <TextInput
        label="Price in INR"
        value={price}
        keyboardType="numeric"
        onChangeText={text => setPrice(text)}
        mode="outlined"
        />
         <TextInput
        label="Your Contact Number"
        value={phone}
        keyboardType="numeric"
        onChangeText={text => setPhone(text)}
        mode="outlined"
        />
       <Button  icon="camera" mode="contained" onPress={() => sendNotification()}>
      send notification
        </Button>
        <Button  icon="camera" mode="contained" onPress={() => openCamera()}>
               Upload Image
        </Button>
        <View style={styles.box2}>
        <Button disabled={image?false:true} style={{marginHorizontal:20}} mode="contained" onPress={() => postData()}>
                Post
             </Button>
        </View>
             
    </View>
    
  )
}



export default CreateAdsScreen