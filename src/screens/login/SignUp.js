import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../styles/Theme';
import { loginStyles } from '../../styles/LoginStyles';
import { PaperProvider, Text, TextInput, Button, Divider, Appbar } from 'react-native-paper';
import SignUpTopBarTwo from '../../components/SignUpTopBarTwo';
import { signUpRequest } from '../../services/StoreService'

/**
 * Sign up with password screen
 * @param {*} navigation 
 * @returns 
 */

const SignUp = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [hovered, setHovered] = useState(false);

  const handleSignUp = async () => {
    // handle sign up logic here
    console.log('handle signup');
    // check that the password and confirmPassword are the same
    if (password === confirmPassword) {
      const success = await signUpRequest(fullName, email, password);
      if (success) navigation.navigate('LoginRoutes', { screen: 'Connect Friends' })
    } else {
      console.error('Passwords do not match');
    }
  };

  return (
    <PaperProvider theme={theme}>
      <SignUpTopBarTwo navigation={navigation} />
      <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#FFFFFF' }}>
        <View style={{ padding: 20, width: '80%' }}>
          <Text style={[loginStyles.title, { textAlign: 'center' }]}>Create an account</Text>
          <TextInput
            label='Full Name'
            value={fullName}
            onChangeText={setFullName}
            style={loginStyles.input}
          />
          <TextInput
            label='Email'
            value={email}
            onChangeText={setEmail}
            autoCapitalize='none'
            style={loginStyles.input}
          />
          <TextInput
            label='Password'
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize='none'
            style={loginStyles.input}
          />
          <TextInput
            label='Confirm Password'
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            autoCapitalize='none'
            style={loginStyles.input}
          />
          <TouchableOpacity
            style={loginStyles.buttonPrimary}
            onPress={handleSignUp}>
            <Text style={loginStyles.buttonPrimaryText}>SIGN UP</Text>
          </TouchableOpacity>
          <Divider style={loginStyles.divider}>
            <Text style={loginStyles.dividerText}>or continue with</Text>
          </Divider>
          <View style={styles.socialButtonsContainer}>
            <Button icon='facebook' style={styles.socialButton} />
            <Button icon='instagram' style={styles.socialButton} />
            <Button icon='google' style={styles.socialButton} />
            <Button icon='email' style={styles.socialButton} />
            <Button icon='apple' style={styles.socialButton} />
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('LoginRoutes', { screen: 'Login' })}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <Text style={[styles.loginText, { color: hovered ? 'blue' : 'black' }]}>Already have an account? Log in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </PaperProvider >
  )
}

const styles = StyleSheet.create({
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  socialButton: {
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 5,
    marginHorizontal: 5,
    padding: 5,
    paddingRight: -10,
  },
  loginText: {
    marginTop: 20,
    textAlign: 'center',
  },
});

export default SignUp;