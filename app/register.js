import {useState} from 'react';
import { View, TextInput, Button, StyleSheet,Alert } from 'react-native';
import Picker from "../components/DropDown";
import {isValidEmail} from "../assets/helpercode/utilities";
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const Register = () => {

  //variable
  const [name, setName] = useState("");
  const [country,setCountry] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");
  const navigation = useNavigation();

  //submit method
   submit = () => {
       if(password !==confirmPassword)
       {
         Alert.alert("Password Mismatch","Password and Confirm Password are not the same.");
         return;
       }
       //validate input
       if(name.trim()==="")
       {
         Alert.alert("Name is required.");
         return;
       }
       if(country.trim()==="")
       {
         Alert.alert("Country is required.");
         return;
       }
       if(email.trim()==="")
       {
         Alert.alert("Email is required.");
         return;
       }
       if(!isValidEmail(email))
       {
         Alert.alert("Email provided is not valid.");
         return;
       }
       if(password.trim()==="")
       {
         Alert.alert("Password cannot be empty.");
         return;
       }

       //send data to server
       axios.post("http://72.167.150.61:7002/api/registered",
       {Id:0,
        RegisteredName:name,
        FromCountry:country,
        EmailAddress:email,
        EmailPassword:password})
        .then((response)=>
        { 
          Alert.alert("Registration was successful.");
          //redirect to dashboard or home page
          navigation.navigate('login')

        })
        .catch(err => console.log(`Error saving new account : ${err}`))
  }
   
  return (
    <View style={styles.container}>

      <TextInput style={styles.input} 
      placeholder="Enter your name"
      onChangeText={setName} />

      <Picker 
      PickerItems={[]} 
      DisplayName={"Country"}
      selectedItem = {country}
      onSelectValueChange = {setCountry}
      ApiUrl={"http://72.167.150.61:7002/api/country"}
      DbValueFieldName={"countryName"}
      ApiAuthorizationHeader={""}
      />

      <TextInput style={styles.input} 
      placeholder="Enter your email"
      onChangeText = {setEmail} />
       
      <TextInput style={styles.input} 
      secureTextEntry={true}
      placeholder="Enter your password"
      onChangeText = {setPassword} />

      <TextInput style={styles.input} 
      secureTextEntry={true}
      placeholder="Confirm your password"
      onChangeText = {setConfirmPassword} />

      <Button title="Sign Up" onPress={submit} />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16, // Adjust padding as needed
    gap:15,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 8, // Adjust padding as needed
  },
  dropdown : {
      borderWidth: 1,
      borderColor: 'blue',
  }
});

export default Register;
