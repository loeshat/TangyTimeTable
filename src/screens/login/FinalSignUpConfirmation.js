import React from 'react';
import { theme } from '../../styles/Theme';
import { View, StyleSheet } from 'react-native';
import { PaperProvider, Text, Button } from 'react-native-paper';

/**
 * Sign up flow
 * @param {*} navigation 
 * @returns 
 */

const FinalSignUpConfirmation = ({ navigation }) => {
  return (
    <PaperProvider theme={theme}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={styles.container}>
          <Text>Yay! congrats you signed up</Text>
          <Button
            onPress={() => navigation.navigate('Events')}>Press me!</Button>
        </View>
      </View>
    </PaperProvider >
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: '100%',
  },
});

export default FinalSignUpConfirmation;



