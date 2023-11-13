import React, { useState } from 'react';
import { theme } from '../../styles/Theme';
import { View, TouchableOpacity } from 'react-native';
import { PaperProvider, Text, TextInput } from 'react-native-paper';
import SignUpTopBarTwo from '../../components/SignUpTopBarTwo';
import { loginStyles } from '../../styles/LoginStyles';

/**
 * Verification Code Screen of the Forgot Password flow
 * @param {*} navigation 
 * @returns 
 */

const VerificationCode = ({ navigation }) => {
  const [code, setCode] = useState('')
  const handleVerifyCode = () => {
    navigation.navigate('Bottom Tab Bar', { screen: 'Events' });
  }

  return (
    <PaperProvider theme={theme}>
      <SignUpTopBarTwo navigation={navigation} />
      <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#FFFFFF' }}>
        <View style={{ padding: 20, width: '80%' }}>
          <Text style={[loginStyles.title, { paddingLeft: 0 }]}>Enter your verification code</Text>
          <TextInput
            label='Enter the OTP'
            value={code}
            onChangeText={setCode}
            style={[loginStyles.input, { width: '100%' }]}
          />
          <Text style={{ color: 'blue', textAlign: 'right' }}>Resend Code</Text>
          <TouchableOpacity
            style={[loginStyles.buttonPrimary, { marginTop: 40 }]}
            onPress={handleVerifyCode}
          >
            <Text style={loginStyles.buttonPrimaryText}>VERIFY</Text>
          </TouchableOpacity>
        </View>
      </View>
    </PaperProvider>
  );
}

export default VerificationCode;