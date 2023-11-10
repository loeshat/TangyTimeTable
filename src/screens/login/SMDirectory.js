import React from 'react';
import { theme } from '../../styles/Theme';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { PaperProvider, Text, Appbar, Button, Divider } from 'react-native-paper';

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
      <Appbar.Header style={styles.appbar}>
        <Button
          icon='arrow-left'
          onPress={() => navigation.navigate('LoginRoutes', { screen: 'Landing' })}
          style={styles.backButton}
        />
      </Appbar.Header>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={styles.container}>
          <Text style={styles.title}>
            {value === 'Login' ? "Let's log in!" : "Let's get started!"}</Text>
          {socialMediaAccounts.map((account) => (
            <TouchableOpacity
              key={account.name}
              onPress={() => navigation.navigate('LoginRoutes',
                { screen: 'Social Media Confirm', params: { value: account.name, type: value } })}
              style={[styles.smContainer, { backgroundColor: account.color }]}
            >
              <Image source={account.icon} style={styles.smIcon} />
              <Text style={styles.smText}>Continue with {account.name}</Text>
            </TouchableOpacity>
          ))}
          <Divider style={styles.divider}>
            <Text style={styles.dividerText}>or</Text>
          </Divider>
          <Button
            mode='contained'
            onPress={handlePasswordLoginSignup}
            style={styles.button}
          >
            {value === 'Login' ? "LOG IN WITH PASSWORD" : "SIGN UP USING PASSWORD"}
          </Button>
        </View>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  appbar: {
    backgroundColor: '#f2f2f2',
    marginLeft: 30,
    zIndex: 2,
  },
  container: {
    padding: 20,
    width: '80%',
  },
  title: {
    color: theme.colors.text,
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'left',
    padding: 20,
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
  smIcon: {
    height: 25,
    width: 25,
  },
  smText: {
    fontSize: 16,
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
  backButton: {
    width: 50,
    backgroundColor: '#FFEBD0',
  },
});

export default SMDirectory;