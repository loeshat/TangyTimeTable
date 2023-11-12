import React from 'react';
import { theme } from '../../styles/Theme';
import { loginStyles } from '../../styles/LoginStyles';
import { View, Image, TouchableOpacity } from 'react-native';
import { PaperProvider, Text } from 'react-native-paper';

/**
 * Main Events page, containing filters for upcoming, in progress and past events
 * @param {*} navigation 
 * @returns 
 */

const Landing = ({ navigation }) => {
  return (
    <PaperProvider theme={theme}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF' }}>
        <Image
          source={require('../../assets/wave.png')}
          style={{
            height: 250,
            width: 250,
            marginBottom: 50
          }}
        />
        <Text style={loginStyles.title}>Welcome to TangyTimeTable!</Text>
        <TouchableOpacity
          style={[loginStyles.buttonPrimary, { width: '60%' }]}
          onPress={() => navigation.navigate('LoginRoutes', { screen: 'Social Media Directory', params: { value: 'Login' } })}>
          <Text style={[loginStyles.buttonPrimaryText, { fontSize: 20 }]}>LOG IN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[loginStyles.buttonSecondary, { width: '60%', marginTop: 40 }]}
          onPress={() => navigation.navigate('LoginRoutes', { screen: 'Social Media Directory', params: { value: 'Sign Up' } })}
        >
          <Text style={loginStyles.buttonTextSecondary}>SIGN UP</Text>
        </TouchableOpacity>
      </View>
    </PaperProvider>
  );
}

export default Landing;