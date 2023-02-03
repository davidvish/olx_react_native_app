/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import Login from './src/screen/LoginScreen'
import { DefaultTheme,Provider as PaperProvider } from 'react-native-paper';
import Signup from './src/screen/SignupScreen';
import CreateAdsScreen from './src/screen/CreateAdsScreen';
import HomeScree from './src/screen/ListItemScreen';
import { NavigationContainer , DefaultTheme as DefaultThemeNav} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Feather from 'react-native-vector-icons/Feather';
import Account from './src/screen/AccountScreen'
import 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import  PhoneNumberLogin  from './src/screen/PhoneNumberLogin';
import Otp from './src/screen/Otp';
import {requestUserPermission, notificationListener} from './src/component/pushNotification'

const MyTheme = {
  ...DefaultThemeNav,
  colors: {
    ...DefaultThemeNav.colors,
    background: '#fff',
  },
};

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

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
const TabNavigator = () =>{
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = 'home'
           
        }else if(route.name === 'Create'){
          iconName = 'plus-circle'
        }else if(route.name === 'Account'){
          iconName ='user'

        }

        // You can return any component that you like here!
        return <View style={{borderWidth:1,borderColor:'#fff',borderRadius:50}}><Feather name={iconName} size={30} color={color} />
        </View>
      },
    })}
    tabBarOptions={{
      activeTintColor: 'red',
      inactiveTintColor: 'gray',
    }}
    >
      <Tab.Screen name="Home" initialParams="Create" component={HomeScree} options={{title:""}}/>
      <Tab.Screen name="Create" component={CreateAdsScreen} options={{title:""}}/>
      <Tab.Screen name="Account" component={Account} options={{title:""}}/>
    </Tab.Navigator>
  );
}

const Navigation = () =>{
  const [user, setUser] = useState('')
  useEffect(()=> {
   const unsubscribe = auth().onAuthStateChanged((userExist)=> {
      if(userExist){
        setUser(userExist)
      }else{
        setUser('')
      }

    })
    return unsubscribe
  },[])
  return(
    <NavigationContainer theme={MyTheme}>
      {user? <TabNavigator/> : <AuthNavigator/>} 
        
    </NavigationContainer>
  )
}

const App = () => {

  const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: 'red',
      accent: '#f1c40f',
    },
  };

  useEffect(()=>{
    requestUserPermission()
    notificationListener()
  },[])
  return (
    <PaperProvider theme={theme}>
      <Navigation />
    </PaperProvider>
    
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
