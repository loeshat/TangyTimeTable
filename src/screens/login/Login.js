import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../styles/Theme';
import { loginStyles } from '../../styles/LoginStyles';
import { PaperProvider, Text, TextInput, Button, Divider, Checkbox } from 'react-native-paper';
import SignUpTopBarTwo from '../../components/SignUpTopBarTwo';
import { loginRequest } from '../../services/StoreService';

/**
 * Login with password screen
 * @param {*} navigation 
 * @returns 
 */

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hovered, setHovered] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async () => {
    // handle login logic here
    const success = await loginRequest(email, password);
    if (success) {
      navigation.navigate('Events');
    }
    // TODO: remember me functionality
  };

  const isDisabled = !email || !password;

  return (
    <PaperProvider theme={theme}>
      <SignUpTopBarTwo navigation={navigation} />
      <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#FFFFFF' }}>
        <View style={{ padding: 20, width: '80%' }}>
          <Text style={[loginStyles.title, { textAlign: 'center' }]}
          >Log in with password</Text>
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
            autoCapitalize='none'
            secureTextEntry
            style={loginStyles.input}
          />
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Checkbox
                status={rememberMe ? 'checked' : 'indeterminate'}
                onPress={() => setRememberMe(!rememberMe)}
              />
              <Text>Remember me</Text>
            </View>
            <View style={{ flexDirection: 'row-reverse', alignItems: 'center' }}>
              <TouchableOpacity onPress={() => navigation.navigate('LoginRoutes', { screen: 'Forgot Password' })}>
                <Text>Forgot password</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            style={[loginStyles.buttonPrimary, { opacity: isDisabled ? 0.3 : 1 }]}
            onPress={handleLogin}
            disabled={isDisabled}
          >
            <Text style={loginStyles.buttonPrimaryText}>LOG IN</Text>
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
            onPress={() => navigation.navigate('LoginRoutes', { screen: 'Sign Up' })}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <Text style={[styles.loginText, { color: hovered ? 'blue' : 'black' }]}>Don't have an account? Sign Up</Text>
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

export default Login;