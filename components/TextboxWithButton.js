import { View, StyleSheet,TextInput, Image,Pressable,Alert } from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function InputWithSuggestion()
{

  const [shortCode,setShortCode] = useState("");

  async function callNow()
  {
    //get text (short) from textbox
    if(shortCode.trim()==="")
    {
        Alert.alert("Enter a short code")
        return
    }
    //get number associated with short from db
        //get token
      let token = await AsyncStorage.getItem('token')
        //call endpoint
        axios.get("http://72.167.150.61:7002/api/short/getshortnumber/"+shortCode,
         {headers:{Authorization:token}})
        .then(res => 
          {
            if(res.data.trim()==="")
            {
              Alert.alert("ShortCode does not exist.")
              return
            }
            //bring up the call dialog
            Alert.alert("Ready to call.")
          })
        .catch(err => 
          {
             console.log("Error fetching short number : "+err)
          })
  }

    return (<>
        <View style={styles.container}>
            <TextInput style={styles.inputText}
             placeholder = "Enter Short"
             onChangeText={setShortCode}
             
            /> 
        <Pressable onPress={callNow}>
         <Image style={styles.image} 
         source={require('../assets/images/phone-image-small.png')} />
        </Pressable>
         
        </View>
        
    </>);
}



const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection : 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin:30,
  },
  inputText: {
    padding : 5,
    borderColor:'green',
    borderWidth: 2,
    borderRadius:25,
    flexGrow: 4,
    
  },
  image : {
     flexGrow: 1,
  },
});