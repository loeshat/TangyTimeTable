import React, { useState } from 'react';
import { theme } from '../../styles/Theme';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { PaperProvider, Text, Appbar, Button } from 'react-native-paper';
import WarningAlert from '../../components/Alert'

/**
 * Sign up flow
 * @param {*} navigation 
 * @returns 
 */

const SMConfirm = ({ navigation, route }) => {
  // value = type of social media user pressed
  const params = route.params;
  console.log(params.type);

  const [alertOpen, setAlertOpen] = useState(false);
  const displayAlert = () => setAlertOpen(true);
  const closeAlert = () => setAlertOpen(false);

  const approveLoginSignup = () => {
    console.log('lol cant implement');
    closeAlert();
    if (params.type === 'Login') navigation.navigate('Events');
    else navigation.navigate('LoginRoutes', { screen: 'Sign Up Flow' });
  }

  const getImageSource = (imageName) => {
    switch (imageName) {
      case 'Facebook':
        return require('../../assets/facebook.png');
      case 'Instagram':
        return require('../../assets/instagram.png');
      case 'Google':
        return require('../../assets/google.png');
      case 'Outlook':
        return require('../../assets/outlook.png');
      case 'Apple':
        return require('../../assets/apple.png');
    }
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
      <WarningAlert
        description={`You are being redirected to ${params.value}.`}
        affirmText={'Keep Going'}
        affirmAction={approveLoginSignup}
        affirmContentStyle={{ width: 125 }}
        cancelAction={closeAlert}
        closeAction={closeAlert}
        visible={alertOpen}
      />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={styles.container}>
          <Image
            source={require('../../assets/wave.png')}
            style={{
              height: 200,
              width: 200,
              marginBottom: 50
            }}
          />
          <Text
            style={{
              color: theme.colors.text,
              fontWeight: 'bold',
              fontSize: 45,
            }}
          >
            {params.type === 'Login' ? "Log in as [user name]?" : "Sign up as [user name]?"} </Text>
          <TouchableOpacity
            onPress={displayAlert}
            style={styles.button}
          >
            <Image
              source={getImageSource(params.value)}
              style={styles.icon} />
            <Text style={styles.text}>{params.type === 'Login' ? "LOG IN" : "SIGN UP"}</Text>
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
    backgroundColor: '#FFEBD0',
    borderColor: '#F0771A',
    borderWidth: 1,
    width: '60%',
    marginTop: 40,
    padding: 15,
    borderRadius: 5,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    color: '#F0771A',
    fontWeight: 'bold',
    fontSize: 20,
  },
  backButton: {
    width: 50,
    backgroundColor: '#FFEBD0',
  },
  icon: {
    height: 50,
    width: 50,
  },
});

export default SMConfirm;