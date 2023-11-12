import React from 'react';
import { theme } from '../../styles/Theme';
import { loginStyles } from '../../styles/LoginStyles';
import { View, Image, TouchableOpacity } from 'react-native';
import { PaperProvider, Text, Divider } from 'react-native-paper';
import SignUpTopBarTwo from '../../components/SignUpTopBarTwo';

/**
 * Directory where you can choose what social media account that you will be logging in/signing up with 
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
        <View style={{ padding: 20, width: '80%' }}>
          <Text style={loginStyles.title}>
            {value === 'Login' ? "Let's log in!" : "Let's get started!"}</Text>
          {socialMediaAccounts.map((account) => (
            <TouchableOpacity
              key={account.name}
              onPress={() => navigation.navigate('LoginRoutes',
                { screen: 'Social Media Confirm', params: { value: account.name, type: value } })}
              style={[loginStyles.smContainer, { backgroundColor: account.color }]}
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
    </PaperProvider >
  );
}

export default SMDirectory;