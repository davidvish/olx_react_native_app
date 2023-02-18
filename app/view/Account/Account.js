import { View, Text, FlatList, Linking } from 'react-native'
import React, {useEffect, useState} from 'react'
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import { styles } from './Account.style';

const AccountScreen =  () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] =useState(false)

const getDetails = async() => {
 try {
 const querySnap = await firestore().collection('ads').where('uid','==',auth().currentUser.uid).get()
  const result = querySnap.docs.map(docSnap=>docSnap.data())
  console.log(result)
  setItems(result)
 } catch (err) {
   console.log(err)
 }
}
const openDial = (phone) => {
  if (Platform.OS === 'android') {
    Linking.openURL(`tel:${phone}`);

  } else {
    Linking.openURL(`telprompt:${phone}`);
  }
}


  useEffect(()=>{
  getDetails()
  return () => {
    console.log('cleanup')
  }
},[])


const renderItem = (item) => {
    return (
        <Card style={styles.card}>
    <Card.Title title={item.name} />
    <Card.Content>
      <Paragraph>{item.desc}</Paragraph>
    </Card.Content>
    <Card.Cover source={{ uri: item.image }} />
    <Card.Actions>
      <Button>{item.price}</Button>
      <Button onPress={()=>openDial()}>Call Seller</Button>
    </Card.Actions>
  </Card>
    )
};

  return (
    <View>
      <View style={{height:'30%',justifyContent:'space-evenly',alignItems:'center'}}>
      <Text style={{color:'#000'}}>{auth().currentUser.email}</Text>
      <Button  mode="contained" onPress={() => auth().signOut()}>
             LogOut
             </Button>
             <Text style={{color:'#000'}}>You ads!</Text>
      </View>
      <FlatList 
      data={items}
      keyExtractor={(item)=>item.phone}
      renderItem={({item})=>renderItem(item)}
      onRefresh={()=>{
        setLoading(false)
        getDetails()
        setLoading(true)
      }}
      refreshing={loading}
      />
    </View>
  )
}

export default AccountScreen

