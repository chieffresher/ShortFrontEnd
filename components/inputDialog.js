import React, { useState } from 'react';
import { View, TextInput, Button, Modal, StyleSheet } from 'react-native';

const InputDialog = ({ visible, onClose, onSubmit,placeholder }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = () => {
    onSubmit(inputValue);
    setInputValue('');
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          onChangeText={(text) => setInputValue(text)}
          value={inputValue}
        />
        <View style={styles.buttonContainer}>
          <Button style={styles.btn} title="Cancel" onPress={onClose} color='white' />
          <Button style={styles.btn} title="Submit" onPress={handleSubmit} color='white' />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray',
    height:100,
  },
  input: {
    width: '80%',
    height: 40,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
  },
  
});

export default InputDialog;
