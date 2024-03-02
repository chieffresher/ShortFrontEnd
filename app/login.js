import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet,Text,
  TouchableOpacity,Alert } from 'react-native';
import { Link } from 'expo-router';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = () => {
    // Handle the button press, you can add validation logic here
    Alert.alert(`Email : ${email} Password : ${password}`);
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
