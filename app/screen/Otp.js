import {StyleSheet, Text, ToastAndroid, View} from 'react-native';
import React, {useState} from 'react';
import {Button, TextInput} from 'react-native-paper';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Otp = props => {
  const [number, setNumber] = useState('');
  const confirm = props.navigation.navigate('confirm');
  const OtpVerify = async () => {
    try {
      let data = await confirm.confirm(number);
      console.log('data', data);
    } catch (error) {
      ToastAndroid.show('Invalid code.', ToastAndroid.SHORT);
    }
  };

  return (
    <View>
      <Text>Otp</Text>
      <TextInput
        value={number}
        maxLength={6}
        onChangeText={value => setNumber(value)}
      />
      <TouchableOpacity
        onPress={OtpVerify}
        disabled={number.length == 6 ? false : true}>
        <Text>submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Otp;

const styles = StyleSheet.create({});
