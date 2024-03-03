import DropDown from "../components/DropDown";
import PhoneNumberInput from "../components/PhoneNumberInput";

import {SafeAreaView,Text,TextInput,StyleSheet,Button,Alert} from "react-native";
import {useState} from "react";

import Industries from "../assets/data/industries";
import AccountTypes from "../assets/data/AccountTypes";



export default function AddShort()
{
    const [accountTypes, setItems] = useState(AccountTypes);
    const [industries,setIndustry] = useState(Industries);
    const [name,setName] = useState("");
    const [selectedAccountType,setSelectedAccountType] = useState("");
    const [selectedIndustry,setSelectedIndustry] = useState("");
    const [phoneNumber,setPhoneNumber] = useState("");

    const submit = () => {
       /* Alert.alert(`Account Type : ${selectedAccountType} Name : ${name}
        Industry : ${selectedIndustry} Phone Number : ${phoneNumber}`) */

        //validate input
          //emptyness
          if(selectedAccountType.trim()==="")
          {
            Alert.alert("Account Type cannot be empty.")
            return
          }
          if(selectedIndustry.trim()==="")
          {
            Alert.alert("Industry cannot be empty.")
            return
          }
          if(name.trim()==="")
          {
            Alert.alert("Name cannot be empty.")
            return 
          }
          if(phoneNumber.trim() === "")
          {
            Alert.alert("Phone number cannot be empty.")
            return
          }

        //send data to server
    }

    return (
      <SafeAreaView style={styles.container}>
      
      {/** Form Title */}
      <Text style={styles.paragraph}>
        New Short Form
      </Text>

      {/** Account Type : Personal/Individual/Institution    */}
      <DropDown 
      PickerItems={accountTypes} 
      DisplayName={"Account Type"}  
      style={styles.shortType}
      selectedItem={selectedAccountType}
      onSelectValueChange={setSelectedAccountType}/>
    

      {/**Name : name of person or institution */}
      <TextInput 
      placeholder="Name of person, business, or institution"
      style={styles.inputText}
      onChangeText={setName}
      />

      {/**Phone number including country code */}
      <PhoneNumberInput 
      style={styles.phone}
      enteredPhoneNumber={phoneNumber}
      onPhoneNumberChange={setPhoneNumber}/>


      {/**Primary Industry: industry person or business belong to */}
      
      <DropDown 
      PickerItems={industries} 
      DisplayName={"Industry"}  
      style={styles.dropdown}
      selectedItem={selectedIndustry}
      onSelectValueChange={setSelectedIndustry}/>
       
      <Button
      style = {styles.btn}
      onPress={submit}
      title="Add Short"
      accessibilityLabel="click this button to register"

      />


      </SafeAreaView>
    );    
}



const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection : 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
    margin:12,
  
  },
  inputText: {
    padding : 10,
    borderColor:'blue',
    borderWidth:1,
    width:'100%',
    zIndex:1, 
  },
   paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  btn : {
     zIndex:1,
  },
  phone : {
    zIndex:1,
  },
  dropdown : {
    
  },
  shortType :{
    
  }
});