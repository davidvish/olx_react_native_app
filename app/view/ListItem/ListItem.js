import { View, Text, FlatList, Linking } from 'react-native'
import React, {useEffect, useState} from 'react'
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore'
import { styles } from './ListItem.style';

const ListItemScreen =  () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] =useState(false)


const getDetails = async() => {
 try {
 const querySnap = await firestore().collection('ads').get()
  const result = querySnap.docs.map(docSnap=>docSnap.data())
  console.log(result)
  setItems(result)
 } catch (err) {
   console.log("error")
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
      <FlatList 
      data={items.reverse()}
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

export default ListItemScreen