import React, { useState } from 'react';
import { theme } from '../../styles/Theme';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { PaperProvider, Text } from 'react-native-paper';
import WarningAlert from '../../components/Alert'
import SignUpTopBarTwo from '../../components/SignUpTopBarTwo';
import { loginStyles } from '../../styles/LoginStyles';

/**
 * Sign up flow
 * @param {*} navigation 
 * @returns 
 */

const SMConfirm = ({ navigation, route }) => {
  // value = type of social media user pressed
  const params = route.params;

  const [alertOpen, setAlertOpen] = useState(false);
  const displayAlert = () => setAlertOpen(true);
  const closeAlert = () => setAlertOpen(false);

  const approveLoginSignup = () => {
    console.log('lol cant implement');
    closeAlert();
    if (params.type === 'Login') navigation.navigate('Events');
    else navigation.navigate('LoginRoutes', { screen: 'Connect Friends' });
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
      <SignUpTopBarTwo navigation={navigation} />
      <WarningAlert
        description={`You are being redirected to ${params.value}.`}
        affirmText={'Keep Going'}
        affirmAction={approveLoginSignup}
        affirmContentStyle={{ width: 125 }}
        cancelAction={closeAlert}
        closeAction={closeAlert}
        visible={alertOpen}
      />
      <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#FFFFFF' }}>
        <View style={styles.container}>
          <Image
            source={require('../../assets/wave.png')}
            style={{
              height: 200,
              width: 200,
              marginVertical: 50
            }}
          />
          <Text style={[loginStyles.title, { textAlign: 'center' }]}>
            {params.type === 'Login' ? "Log in as [username]?" : "Sign up as [username]?"} </Text>
          <TouchableOpacity
            onPress={displayAlert}
            style={styles.button}
          >
            <Image
              source={getImageSource(params.value)}
              style={{ height: 50, width: 50 }} />
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
    width: '90%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#FFEBD0',
    borderColor: '#F0771A',
    borderWidth: 1,
    width: '80%',
    marginTop: 40,
    padding: 15,
    paddingLeft: 15,
    borderRadius: 5,
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    color: '#F0771A',
    fontWeight: 'bold',
    paddingLeft: 30,
    fontSize: 20,
  },
});

export default SMConfirm;