import React, { useState } from 'react';
import { theme } from '../../styles/Theme';
import { flowStyles } from '../../styles/FlowStyles';
import { View, StyleSheet, Image } from 'react-native';
import { PaperProvider, Text, TextInput, Button, Appbar } from 'react-native-paper';

/**
 * Sign up flow
 * @param {*} navigation 
 * @returns 
 */

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const handleSendCode = () => {
    console.log('Send Verification Code to Email Address');
  };

  return (
    <PaperProvider theme={theme}>
      <Appbar.Header
        style={{
          backgroundColor: '#f2f2f2',
          marginLeft: 30,
          zIndex: 2,
        }}>
        <Button
          icon='arrow-left'
          onPress={() => navigation.navigate('LoginRoutes', { screen: 'Landing' })}
          style={styles.backButton}
        />
      </Appbar.Header>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={styles.container}>

          <Image
            source={require('../../assets/think.png')}
            style={{
              height: 200,
              width: 200,
            }}
          />
          <Text
            style={{
              color: theme.colors.text,
              fontWeight: 'bold',
              fontSize: 40,
              marginBottom: 20,
            }}
          >
            Forgot your password?</Text>
          <Text style={{ marginBottom: 20, }}>
            No need to worry! Just give us your email and wait for the verification code.</Text>
          <TextInput
            label='Email'
            value={email}
            onChangeText={setEmail}
            style={{ marginBottom: 20 }}
          />
          <Button mode='contained' onPress={handleSendCode} style={styles.button}>
            SEND CODE
          </Button>
        </View>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: '80%',
  },
  backButton: {
    width: 50,
    backgroundColor: '#FFEBD0',
  },
  button: {
    marginTop: 20,
  },
});

export default ForgotPassword;
