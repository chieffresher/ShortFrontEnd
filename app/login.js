import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet,Text,
  TouchableOpacity,Alert } from 'react-native';
import { Link } from 'expo-router';
import axios  from 'axios';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = () => {
    // Handle the button press, you can add validation logic here
    if(email.trim()==="")
    {
      Alert.alert("Email is required.")
      return
    }
    if(password.trim()==="")
    {
      Alert.alert("Password is required.")
      return
    }
    //send login request
    axios.post("http://72.167.150.61:7002/api/login",
    {Id:0,
     UserEmail:email,
     UserPassword:password})
     .then(res => 
      {
        let data = res.data
        if(data.isUser === true)
        {
           console.log("login successful")
           let token = data.jwtToken;
           console.log("Token : "+token)
        }
        else
        {
          console.log("login failed.");
        }
      })
     .catch(err => console.log(`Error validating user : ${err}`))

  };

  const handleForgotPassword = () => {
    // Handle the link press, you can navigate or perform other actions here
    console.log('Link pressed');
  };

  return (
    <View style={styles.container}>
       <TextInput
        style={styles.input}
        placeholder="Enter your email"
        onChangeText={(eml) => setEmail(eml)}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
      />

      <Link href={"/forgotpassword"} style={styles.linkContainer}>
         <Text style={styles.linkText}>Forgot password?</Text>
      </Link>

      <Button title="Login" onPress={submit} />
    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap:15,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 8,
  },
  linkContainer : {
       marginBottom: 10,
       alignSelf: 'flex-start',
  },
  linkText : {
    color: 'blue',
    textDecorationLine: 'underline',
  }
});

export default Login;
