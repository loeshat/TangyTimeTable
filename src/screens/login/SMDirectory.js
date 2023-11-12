import React from 'react';
import { theme } from '../../styles/Theme';
import { loginStyles } from '../../styles/LoginStyles';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { PaperProvider, Text, Appbar, Button, Divider } from 'react-native-paper';
import SignUpTopBarTwo from '../../components/SignUpTopBarTwo';

/**
 * Sign up flow
 * @param {*} navigation 
 * @returns 
 */

function SMDirectory({ route, navigation }) {
  const { value } = route.params;

  const socialMediaAccounts = [
    { name: 'Facebook', color: 'lavender', icon: require('../../assets/facebook.png') },
    { name: 'Instagram', color: 'lightpink', icon: require('../../assets/instagram.png') },
    { name: 'Google', color: 'lightgreen', icon: require('../../assets/google.png') },
    { name: 'Outlook', color: 'lightblue', icon: require('../../assets/outlook.png') },
    { name: 'Apple', color: 'lightgrey', icon: require('../../assets/apple.png') },
  ];

  const handlePasswordLoginSignup = () => {
    if (value === 'Login') navigation.navigate('LoginRoutes', { screen: 'Login' })
    else navigation.navigate('LoginRoutes', { screen: 'Sign Up' })
  };

  return (
    <PaperProvider theme={theme}>
      <SignUpTopBarTwo navigation={navigation} />
      <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#FFFFFF' }}>
        <View style={styles.container}>
          <Text style={loginStyles.title}>
            {value === 'Login' ? "Let's log in!" : "Let's get started!"}</Text>
          {socialMediaAccounts.map((account) => (
            <TouchableOpacity
              key={account.name}
              onPress={() => navigation.navigate('LoginRoutes',
                { screen: 'Social Media Confirm', params: { value: account.name, type: value } })}
              style={[styles.smContainer, { backgroundColor: account.color }]}
            >
              <Image source={account.icon} style={{ height: 25, width: 25 }} />
              <Text style={{ fontSize: 16 }}>Continue with {account.name}</Text>
            </TouchableOpacity>
          ))}
          <Divider style={loginStyles.divider}>
            <Text style={loginStyles.dividerText}>or</Text>
          </Divider>
          <TouchableOpacity
            style={loginStyles.buttonPrimary}
            onPress={handlePasswordLoginSignup}>
            <Text style={loginStyles.buttonPrimaryText}>
              {value === 'Login' ? "LOG IN WITH PASSWORD" : "SIGN UP USING PASSWORD"}</Text>
          </TouchableOpacity>
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
  button: {
    marginTop: 20,
  },
  smContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 20,
    margin: 10,
    borderRadius: 10,
  },
});

export default SMDirectory;