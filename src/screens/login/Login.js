import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../styles/Theme';
import { loginStyles } from '../../styles/LoginStyles';
import { PaperProvider, Text, TextInput, Button, Divider, Checkbox, Appbar } from 'react-native-paper';
import SignUpTopBarTwo from '../../components/SignUpTopBarTwo';

/**
 * Login flow
 * @param {*} navigation 
 * @returns 
 */

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hovered, setHovered] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = () => {
    // handle login logic here
  };

  return (
    <PaperProvider theme={theme}>
      <SignUpTopBarTwo navigation={navigation} />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={styles.container}>
          <Text style={{
            color: theme.colors.text,
            fontWeight: 'bold',
            fontSize: 50,
            textAlign: 'left',
            padding: 20,
          }}
          >Log in with password</Text>
          <TextInput
            label='Email'
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />
          <TextInput
            label='Password'
            value={password}
            onChangeText={setPassword}
            style={styles.input}
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
          <Button mode='contained' onPress={handleLogin} style={{ marginTop: 20 }}>
            LOG IN
          </Button>
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
  container: {
    padding: 20,
    width: '80%',
  },
  input: {
    marginBottom: 10,
    backgroundColor: 'white',
  },
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