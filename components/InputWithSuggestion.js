import { View, StyleSheet,TextInput } from 'react-native';


export default function InputWithSuggestion()
{
    return (<>
        <View>
            <TextInput style={styles.inputText}
             placeholder = "Enter Short"
            />  
        </View>
        
    </>);
}


const styles = StyleSheet.create({
  inputText: {
    margin: 10,
    padding : 5,
    borderColor:'blue',
    borderWidth: 2,
  }
});