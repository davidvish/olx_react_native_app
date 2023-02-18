import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PhoneNumberLogin from '../view/PhoneNumber/PhoneNumberLogin';
import Signup from '../view/Signup/Signup';
import Otp from '../view/Otp/Otp';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

    const AuthNavigator = () => {
        return(
          <Stack.Navigator 
          initialRouteName='signup'>
            <Stack.Screen name="login" component={PhoneNumberLogin} options={{headerShown:false}}/>
            <Stack.Screen name="phone" component={PhoneNumberLogin} options={{headerShown:false}}/>
            <Stack.Screen name="signup" component={Signup} options={{headerShown:false}}/>
            <Stack.Screen name="OTP" component={Otp} options={{headerShown:false}}/>
      
          </Stack.Navigator>
        )
      }


export default AuthNavigator;

const styles = StyleSheet.create({})