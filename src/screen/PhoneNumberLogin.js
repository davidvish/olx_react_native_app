import { StyleSheet, Text, Touchable, View } from 'react-native'
import React, { useState } from 'react';
import auth from '@react-native-firebase/auth'
import { Button, TextInput } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';

const PhoneNumberLogin = (props) => {
  const [number , setNumber] = useState('');
  const [confirm, setConfirm] = useState(null);

  const signUp = async() => {
    const confirmation = await auth().signInWithPhoneNumber('+91'+number);
    console.log('confirmation' ,confirmation)
    if(confirmation){
      setConfirm(confirmation);
      props.navigation.navigate('OTP',{'confirm':confirmation})
    }
  }

  return (
    <View>
      <Text>PhoneNumberLogin</Text>
      <TextInput
      style={{borderWidth:1, borderColor:'red'}}
      placeholder='Enter Your 10 digits number'
      keyboardType='number-pad'
      maxLength={10}
      onChangeText={(value) => setNumber(value)}
      value={number}
      />
      <TouchableOpacity 
      onPress={signUp}
      disabled={number.length == 10 ? false : true}
      >
        <Text style={{color:'#000'}}>
          Send
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default PhoneNumberLogin

const styles = StyleSheet.create({})