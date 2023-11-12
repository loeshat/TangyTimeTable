import React from 'react';
import { Appbar, Button } from 'react-native-paper';

/**
 * Default top navigation bar, containing TangyTimeTable logo and profile icon button
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
