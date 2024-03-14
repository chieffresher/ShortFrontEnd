import { View, StyleSheet,TextInput, Image,Pressable,Alert } from 'react-native';


export default function InputWithSuggestion()
{
    return (<>
        <View style={styles.container}>
            <TextInput style={styles.inputText}
             placeholder = "Enter Short"
            /> 
        <Pressable onPress={callNow}>
         <Image style={styles.image} 
         source={require('../assets/images/phone-image-small.png')} />
        </Pressable>
         
        </View>
        
    </>);
}

function callNow(){
   Alert.alert("Call Button","Call button pressed");
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