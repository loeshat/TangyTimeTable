import React from 'react';
import { theme } from '../../styles/Theme';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { PaperProvider, Text, Appbar, Button } from 'react-native-paper';

/**
 * Sign up flow
 * @param {*} navigation 
 * @returns 
 */

const SMConfirm = ({ navigation }) => {
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
          onPress={() => navigation.navigate('LoginRoutes', { screen: 'Social Media Directory' })}
          style={styles.backButton}
        />
      </Appbar.Header>
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
            Log in as [user name]? </Text>
          <TouchableOpacity
            // onPress={() => navigation.navigate('LoginRoutes', { screen: 'Social Media Confirm' })}
            style={styles.button}
          >
            <Image
              source={require('../../assets/facebook.png')}
              style={styles.icon} />
            <Text style={styles.text}>LOG IN</Text>
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