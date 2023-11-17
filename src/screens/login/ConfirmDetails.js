import React, { useState } from 'react';
import { theme } from '../../styles/Theme';
import { loginStyles } from '../../styles/LoginStyles';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { PaperProvider, Text, TextInput } from 'react-native-paper';
import SignUpTopBarTwo from '../../components/SignUpTopBarTwo';

/**
 * Sign up flow
 * @param {*} navigation 
 * @returns 
 */

const ConfirmDetails = ({ navigation }) => {
  const [fullName, setFullName] = useState('Placeholder Name')
  const [email, setEmail] = useState('Placeholder Email')
  const [password, setPassword] = useState('');

  const isDisabled = !email || !password;

  return (
    <PaperProvider theme={theme}>
      <SignUpTopBarTwo navigation={navigation} />
      <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#FFFFFF' }}>
        <View style={{ padding: 20, width: '80%' }}>
          <Text style={[loginStyles.title, { fontSize: 35 }]}>Confirm your account details </Text>
          <Text style={{ marginBottom: 20, color: theme.text }}>Or change the otherwise</Text>
          <TextInput
            label='Full Name'
            value={fullName}
            onChangeText={setFullName}
            autoCapitalize='none'
            style={loginStyles.input}
          />
          <TextInput
            label='Email'
            value={email}
            onChangeText={setEmail}
            autoCapitalize='none'
            style={loginStyles.input}
          />
          <Text style={{ marginVertical: 30, color: theme.text }}>Also, please set your password</Text>
          <TextInput
            label='Password'
            value={password}
            onChangeText={setPassword}
            autoCapitalize='none'
            style={loginStyles.input}
            secureTextEntry
            textContentType="none"
          />
          <TouchableOpacity
            style={[loginStyles.buttonPrimary, { opacity: isDisabled ? 0.3 : 1 }]}
            onPress={() => { navigation.navigate('LoginRoutes', { screen: 'Connect Friends' }) }}
            disabled={isDisabled}
          >
            <Text style={loginStyles.buttonPrimaryText}>CONTINUE</Text>
          </TouchableOpacity>
        </View>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
});

export default ConfirmDetails;