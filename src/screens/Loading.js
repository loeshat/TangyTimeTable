import React from 'react';
import { theme } from '../styles/Theme';
import { View } from 'react-native';
import { PaperProvider, Text } from 'react-native-paper';

/**
 * Sign up flow
 * @param {*} navigation 
 * @returns 
 */

const ForgotPassword = () => {
  return (
    <PaperProvider theme={theme}>
      <View style={{ padding: 20, width: '100%' }}>
        <Text>LOADING SCREEN</Text>
      </View>
    </PaperProvider>
  );
}

export default ForgotPassword;