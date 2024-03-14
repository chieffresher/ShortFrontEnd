import { Text, View, SafeAreaView, StyleSheet,Button } from 'react-native';
import {useState} from "react";
import { Link } from 'expo-router';

//textbox with call button
import ShortCodeCaller from "../components/TextboxWithButton";


export default function Home() {
   const [btnName,setBtnName] = useState("Sign Up")

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.paragraph}>
        Short
      </Text>

      <ShortCodeCaller />

      <View style={styles.btnContainer}> 
         
      <Link href={"/register"} style={styles.paragraph}>
         <Text>{btnName}</Text>
      </Link>
      
      <Link href={"/login"} style={styles.paragraph}>
         <Text>{"Login"}</Text>
      </Link>
      
      <Link href={"/addshort"} style={styles.paragraph}>
         <Text>{"Add Short"}</Text>
      </Link>
      
      </View> 

      </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  btnContainer : {
    flex:1,
    marginTop:20,
    marginLeft:10,
    marginBottom:10, 
    width:100,
    alignSelf:'flex-start',
  },
  
  paragraph: {
    margin: 15,
    fontWeight: 'bold',
    
  },
});
