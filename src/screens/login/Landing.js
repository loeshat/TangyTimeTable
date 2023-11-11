import React from 'react';
import { theme } from '../../styles/Theme';
import { loginStyles } from '../../styles/LoginStyles';
import { flowStyles } from '../../styles/FlowStyles';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { PaperProvider, Text } from 'react-native-paper';

/**
 * Main Events page, containing filters for upcoming, in progress and past events
 * @param {*} navigation 
 * @returns 
 */

const Landing = ({ navigation }) => {
  return (
    <PaperProvider theme={theme}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image
          source={require('../../assets/wave.png')}
          style={{
            ...flowStyles.imageStyle,
            height: 250,
            width: 250,
            marginBottom: 50
          }}
        />
        <Text
          style={{
            color: theme.colors.text,
            fontWeight: 'bold',
            fontSize: 40,
            textAlign: 'center',
          }}
        >
          Welcome to TangyTimeTable!</Text>
        <TouchableOpacity
          style={[loginStyles.buttonPrimary, { width: '60%' }]}
          onPress={() => navigation.navigate('LoginRoutes', { screen: 'Social Media Directory', params: { value: 'Login' } })}>
          <Text style={[loginStyles.buttonPrimaryText, { fontSize: 20 }]}>LOG IN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonSecondary}
          onPress={() => navigation.navigate('LoginRoutes', { screen: 'Social Media Directory', params: { value: 'Sign Up' } })}
        >
          <Text style={styles.buttonTextSecondary}>SIGN UP</Text>
        </TouchableOpacity>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  buttonSecondary: {
    backgroundColor: '#FFEBD0',
    borderColor: '#F0771A',
    borderWidth: 1,
    width: '60%',
    marginTop: 40,
    padding: 15,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTextSecondary: {
    color: '#F0771A',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default Landing;