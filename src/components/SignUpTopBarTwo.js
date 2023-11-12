import React from 'react';
import { Appbar, Button } from 'react-native-paper';

/**
 * top nav bar of the log in/sign up flow. only has a back button
 * @param {*} navigation 
 * @returns 
 */
const SignUpTopBarTwo = ({ navigation }) => {
  return (
    <Appbar.Header
      style={{
        backgroundColor: '#FFFFFF',
        marginLeft: 30,
        zIndex: 2,
      }}>
      <Button
        icon='arrow-left'
        onPress={() => navigation.navigate('LoginRoutes', { screen: 'Landing' })}
        style={{ backgroundColor: '#FFEBD0' }}
      />
    </Appbar.Header>
  );
}

export default SignUpTopBarTwo;
