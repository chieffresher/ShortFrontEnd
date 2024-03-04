
import {useState,useEffect} from 'react';
import {View,StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';

export default function DropDown({PickerItems, DisplayName, selectedItem,
     onSelectValueChange,DbValueFieldName, ApiUrl,ApiAuthorizationHeader}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);
  const [selectedValue, setValueSelect] = useState(selectedItem);

  async function setValues()
  {
       try
       {
            if(ApiUrl =="")
            {
              let pickerItems = items.map((item)=> <Picker.Item label={item.label} value={item.value} 
              key={item.label}/>);
            
              //label to to display on picker
              pickerItems.unshift(<Picker.Item label={`Select ${DisplayName}`} value={""} 
                key={""} enabled={false}/>);

              setItems(pickerItems);
            }
            else
            {
               console.log("Token received (DropDown):"+ApiAuthorizationHeader)
               let response = await axios.get(ApiUrl,
                {headers: {Authorization: ApiAuthorizationHeader}}) // (optional) setting authorization header

               let data = response.data
               let pickerItems = data.map((item)=> <Picker.Item label={item[DbValueFieldName]} 
               value={item[DbValueFieldName]} 
               key={item.id}/>);
              
               pickerItems.unshift(<Picker.Item label={`Select ${DisplayName}`} value={""} 
                key={""} enabled={false}/>);

              setItems(pickerItems);
              
            }
       }
       catch(error)
       {
         console.log(`Error fetching data : ${error}`);
       }
  }

  //set values once and never call the method after that
  useEffect(()=>{ setValues()},[])
  
  return (
    <View style={styles.container}>

     <Picker style={styles.picker}
        selectedValue={selectedValue}
        onValueChange={(itemValue, itemIndex) =>
        {
            onSelectValueChange(itemValue); //setting the value in calling component
            setValueSelect(itemValue); //setting the value locally
        }
        
        }>
       
       {[...items]}

      </Picker>
    
    </View>

  );
}

let styles = StyleSheet.create({
    container : {
      display:'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex:100,
      /*borderWidth:1,
      borderColor:'blue', */
      width:'100%',
      
    },
    picker: {
      width:'100%',
    }

});

