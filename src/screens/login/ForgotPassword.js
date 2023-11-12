import React, { useState } from 'react';
import { theme } from '../../styles/Theme';
import { View, Image, TouchableOpacity } from 'react-native';
import { PaperProvider, Text, TextInput } from 'react-native-paper';
import SignUpTopBarTwo from '../../components/SignUpTopBarTwo';
import { loginStyles } from '../../styles/LoginStyles';

/**
 * Forgot password screen of the login with password flow
 * @param {*} navigation 
 * @returns 
 */

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const handleSendCode = () => {
    console.log('Send Verification Code to Email Address');
    navigation.navigate('LoginRoutes', { screen: 'Verification Code' })
  };

  return (
    <PaperProvider theme={theme}>
      <SignUpTopBarTwo navigation={navigation} />
      <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#FFFFFF' }}>
        <View style={{ padding: 20, width: '80%', alignItems: 'center' }}>
          <Image
            source={require('../../assets/think.png')}
            style={{
              height: 200,
              width: 200,
            }}
          />
          <Text style={[loginStyles.title, { textAlign: 'center' }]}>Forgot your password?</Text>
          <Text style={{ marginBottom: 20, }}>No need to worry! Just give us your email and wait for the verification code.</Text>
          <TextInput
            label='Email'
            value={email}
            onChangeText={setEmail}
            style={[loginStyles.input, { width: '100%' }]}
          />
          <TouchableOpacity
            style={[loginStyles.buttonPrimary, { width: '100%' }]}
            onPress={handleSendCode}
          >
            <Text style={loginStyles.buttonPrimaryText}>SEND CODE</Text>
          </TouchableOpacity>
        </View>
      </View>
    </PaperProvider>
  );
}

export default ForgotPassword;
