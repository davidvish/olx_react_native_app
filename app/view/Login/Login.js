import { View, Text, Image, KeyboardAvoidingView,TouchableOpacity } from 'react-native'
import React, { useState } from 'react';
import { TextInput,Button } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import { styles } from './Login.style';



const login = ({navigation}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const userLogin = async () => {
        if(!email||!password) {
            Alert.alert('Please all the fields');
            return
        } 
        try {
          const result =  await auth().signInWithEmailAndPassword(email,password)
          console.log(result.user)
        } catch (err) {
            Alert.alert('Something Wrong Please try different password');
        }
    }

    return (
        <KeyboardAvoidingView behavior='position'>
        <View>
            <View style={styles.box1}>
                <Image
                    source={require('../assets/image/olx.png')}
                    style={{ width: 200, height: 200 }}
                />
                <Text style={{color:'#000'}}>Please Login Here</Text>
            </View>
           <View style={styles.box2}>
           <TextInput
                label="Email"
                value={email}
                onChangeText={text => setEmail(text)}
                mode="outlined"
            />
             <TextInput
                label="Password"
                value={password}
                secureTextEntry={true}
                onChangeText={text => setPassword(text)}
                mode="outlined"
            />
             <Button  mode="contained" onPress={() => userLogin()}>
                Login
             </Button>
            <TouchableOpacity 
             onPress={()=> navigation.navigate("signup")}> 
            <Text style={styles.text}>Dont have a Account ?</Text> 
            </TouchableOpacity>
           </View>
        </View>
        </KeyboardAvoidingView>
    )
};


export default login