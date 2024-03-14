import DropDown from "../components/DropDown";
import PhoneNumberInput from "../components/PhoneNumberInput";
import {SafeAreaView,Text,TextInput,StyleSheet,Button,Alert} from "react-native";
import {useState,useEffect} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import { getRandomNumber, sendMessage } from "../assets/helpercode/utilities";
import InputDialog from "../components/inputDialog";

export default function AddShort()
{
    const [accountTypes, setItems] = useState([]);
    const [industries,setIndustry] = useState([]);
    const [name,setName] = useState("");
    const [selectedAccountType,setSelectedAccountType] = useState("");
    const [selectedIndustry,setSelectedIndustry] = useState("");
    const [phoneNumber,setPhoneNumber] = useState("");
    const [token,setToken] = useState("")
    //dialog
    const [dialogVisible, setDialogVisible] = useState(false);
    const [verificationCode, setVerificationCode] = useState('');
    const[generatedCode,setGeneratedCode] = useState("");

    //event handlers for dialog
    const handleOpenDialog = () => {
      setDialogVisible(true);
    };
  
    const handleCloseDialog = () => {
      setDialogVisible(false);
    };
  
    const handleSubmitDialog = (value) => {
       setVerificationCode(value);
       
    };

    const saveShort = () => 
    {
          //save short if code is valid
          axios.post("http://72.167.150.61:7002/api/short/",
          { Id: 0,
          ShortName : name,
          ShortAccountType:selectedAccountType,
          PhoneNumber:phoneNumber,
          ShortIndustry:selectedIndustry},
          {headers:{Authorization:token}})
          .then((res)=>
          {
               Alert.alert("Short Code created successfully.")
                //reset generated code
               setGeneratedCode("")
          })
          .catch(
            error=>
            {
              //log error
              console.log(`Error saving short code : ${error}`)
              //inform user
              Alert.alert("Short Code saving failed. Try again later.")
            }
            )
    }

    //set token
    useEffect(() => {
      const retrieveToken = async () => {
        try {
          const storedToken = await AsyncStorage.getItem('token');
          if (storedToken !== null) {
            setToken(storedToken);
          }
        } catch (error) {
          console.error('Error retrieving token:', error);
        }
      };
  
      retrieveToken();
    }, []); 

    //submit form when code is verified
    useEffect(() => {
      const verifyCode = () => 
      {
         if(verificationCode.trim() !== "" && verificationCode ===generatedCode)
         {
              //save short
              saveShort()
              //reset verification code and generated code
              setVerificationCode("")
              setGeneratedCode("")
              return 
         }
         else if(verificationCode.trim() !=="" && generatedCode !== verificationCode)
          Alert.alert("Wrong code")
      };
  
      verifyCode();
    }, [verificationCode]); 

    //set generated code
    if(generatedCode.trim() === "")
      setGeneratedCode(getRandomNumber(1000,9999).toString())


    const submit = () => {
         
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
        axios.post("http://72.167.150.61:7002/api/short/isshortvalid/",
        { Id: 0,
         ShortName : name,
         ShortAccountType:selectedAccountType,
         PhoneNumber:phoneNumber,
         ShortIndustry:selectedIndustry},
         {headers:{Authorization:token}})
         .then((res) => 
         {
           //valid request
           if(res.status == 200)
           {
               //send 4 digits code to check that phone number is active
               console.log("code : "+generatedCode)
               setDialogVisible(true)
               //sent code to phone : call api endpoint to do that.
               
               //creating or saving short code is delegated to verification code event handler
           }
           else
           {
              //invalid record
              console.log("Could not validate short from client.")
              Alert.alert("Error validating your data now. Try again later.")
           }
         })
         .catch(err=> 
          {
            if(err.response)
                Alert.alert(err.response.data)
            else
            {
              console.log(`Error checking validity of data : ${err}`)
              Alert.alert("Error validating your data now. Try again later.")
            }
              
          })
    }

    return (
      <SafeAreaView style={styles.container}>
      
      {/** Form Title */}
      <Text style={styles.paragraph}>
        New Short Form
      </Text>

      {/** Account Type : Personal/Individual/Institution    */}
      {/**Check if token is set before rendering this element */}
      { token &&
      <DropDown 
      PickerItems={[]} 
      DisplayName={"Account Type"}
      ApiUrl={"http://72.167.150.61:7002/api/accounttypes/"}
      DbValueFieldName={"typeName"}
      ApiAuthorizationHeader={token}  
      style={styles.shortType}
      selectedItem={selectedAccountType}
      onSelectValueChange={setSelectedAccountType}/>
     }
    

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
      {/**Check if token is set before rendering this element */}
      { token &&
      <DropDown 
      PickerItems={[]} 
      DisplayName={"Industry"} 
      ApiUrl={"http://72.167.150.61:7002/api/industry/"}
      DbValueFieldName={"industryName"} 
      ApiAuthorizationHeader={token}
      style={styles.dropdown}
      selectedItem={selectedIndustry}
      onSelectValueChange={setSelectedIndustry}/>
      }
       
      {/**Dialog for sms code validation (phone number verification) */}
      <InputDialog
        visible={dialogVisible}
        onClose={handleCloseDialog}
        onSubmit={handleSubmitDialog}
        placeholder={"Enter 4 digit code sent to you"}
      />

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