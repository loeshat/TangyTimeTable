import React from 'react';
import { theme } from '../../styles/Theme';
import { loginStyles } from '../../styles/LoginStyles';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { PaperProvider, Text, Button } from 'react-native-paper';

/**
 * Final confirmation screen of the sign up flow
 * @param {*} navigation 
 * @returns 
 */

const FinalSignUpConfirmation = ({ navigation }) => {
  return (
    <PaperProvider theme={theme}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF' }}>
        <View style={{ padding: 20, width: '90%', alignItems: 'center' }}>
          <Image
            source={require('../../assets/wave.png')}
            style={{
              height: 250,
              width: 250,
              marginBottom: 50,
            }}
          />
          <Text style={[loginStyles.title, { fontSize: 35, textAlign: 'center' }]}>Congrats on your new profile!</Text>
          <TouchableOpacity
            style={[loginStyles.buttonSecondary, styles.flex]}
            onPress={() => navigation.navigate('Bottom Tab Bar', { screen: 'Events' })}
          >
            <Text style={loginStyles.buttonTextSecondary}>Let's get started!</Text>
            <Button icon={'arrow-right'} style={{ marginRight: -20 }} />
          </TouchableOpacity>
        </View>
      </View>
    </PaperProvider >
  );
}

const styles = StyleSheet.create({
  flex: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%',
  }
});

export default FinalSignUpConfirmation;



