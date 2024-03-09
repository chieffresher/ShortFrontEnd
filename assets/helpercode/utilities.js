import { Alert } from "react-native";
import * as SMS from 'expo-sms';

export function isValidEmail(email) {
    // Regular expression for a basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    return emailRegex.test(email);
  }

  export const sendMessage = async(msg,phoneNumber) =>
  {
    try
    {
        const isAvailable = await SMS.isAvailableAsync();
        if (isAvailable) 
        {
          const { result } = await SMS.sendSMSAsync(
            [phoneNumber],
             msg.toString()
          );
          if (result === SMS.SentStatus.Sent) 
          {
            Alert.alert('Message sent successfully!');
          } 
          else 
          {
            Alert.alert('Failed to send message.');
          }
        } 
        else 
        {
          Alert.alert('SMS is not available on this device.');
        }
    }
    catch(error)
    {
       console.log(`Error send message : ${error}`)
    }
    
  }

   //random number function
   export function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  
  