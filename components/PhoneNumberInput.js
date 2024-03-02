import  { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import PhoneInput from 'react-native-phone-input';


const PhoneNumberInput = ({enteredPhoneNumber,onPhoneNumberChange}) => {
  const [phoneNumber, setPhoneNumber] = useState(enteredPhoneNumber);

  return (
    <View style={styles.container}>
      
      <PhoneInput
        style={styles.phone}
        initialCountry="gh"
        onChangePhoneNumber={(number) => onPhoneNumberChange(number)/*setPhoneNumber(number)*/}
      />
      
    </View>
  );
};

export default PhoneNumberInput;

let styles = StyleSheet.create({
    container : {
      display: 'flex',
      flexDirection:'row',
      justifyContent: 'center',
      alignItems: 'center',
      
    },
    phone : {
      flexGrow:1,
      borderColor:'blue',
      borderWidth:1,
      padding:10,
    },
});