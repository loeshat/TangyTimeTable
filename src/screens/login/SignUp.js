import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../styles/Theme';
import { PaperProvider, Text, TextInput, Button, Divider, Appbar } from 'react-native-paper';

/**
 * Sign up flow
 * @param {*} navigation 
 * @returns 
 */

const SignUp = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [hovered, setHovered] = useState(false);

  const handleSignUp = () => {
    // handle sign up logic here
    console.log('handle signup');
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
          <Text style={{
            color: theme.colors.text,
            fontWeight: 'bold',
            fontSize: 50,
            textAlign: 'left',
            padding: 20,
          }}
          >Create an account</Text>
          <TextInput
            label='Full Name'
            value={fullName}
            onChangeText={setFullName}
            style={styles.input}
          />
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
          <TextInput
            label='Confirm Password'
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            style={styles.input}
          />
          <Button mode='contained' onPress={handleSignUp} style={styles.button}>
            Sign Up
          </Button>
          <Divider style={styles.divider}>
            <Text style={styles.dividerText}>or continue with</Text>
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
  container: {
    padding: 20,
    width: '80%',
  },
  input: {
    marginBottom: 10,
    backgroundColor: 'white'
  },
  button: {
    marginTop: 20,
  },
  divider: {
    marginVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
  },
  dividerText: {
    marginHorizontal: 10,
    color: 'lightgrey',
    fontSize: 16,
    backgroundColor: '#f2f2f2',
    margin: 5,
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
  backButton: {
    width: 50,
    backgroundColor: '#FFEBD0',
  },
});

export default SignUp;