import React from 'react';
import { StyleSheet, Text, View } from 'react-native'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Account from '../view/Account/Account';
import CreateAds from '../view/CreateAd/CreateAds';
import ListItem from '../view/ListItem/ListItem';
import Feather from 'react-native-vector-icons/Feather';

const Tab = createBottomTabNavigator();


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
      <Tab.Screen name="Home" initialParams="Create" component={ListItem} options={{title:""}}/>
      <Tab.Screen name="Create" component={CreateAds} options={{title:""}}/>
      <Tab.Screen name="Account" component={Account} options={{title:""}}/>
    </Tab.Navigator>
  );
}

export default TabNavigator;