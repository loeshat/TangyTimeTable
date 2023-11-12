import React from 'react';
import { theme } from '../styles/Theme';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Appbar, PaperProvider, Button, Text } from 'react-native-paper';

/**
 * Default top navigation bar, containing TangyTimeTable logo and profile icon button
 * @param {*} navigation 
 * @param {String} section: the section the user navigated FROM
 * @returns 
 */
const SignUpTopBar = ({ navigation, section }) => {
  const skipSection = () => {
    if (section === 'Connect Friends') navigation.navigate('LoginRoutes', { screen: 'Sync Calendar' });
    else if (section === 'Sync Calendar') navigation.navigate('LoginRoutes', { screen: 'Add Location' });
    else if (section === 'Add Location') navigation.navigate('LoginRoutes', { screen: 'Final Sign Up Confirmation' });
  }

  return (
    <Appbar.Header
      style={{
        backgroundColor: '#FFFFFF',
        marginHorizontal: 30,
        zIndex: 2,
        justifyContent: 'space-between',
      }}>
      <Button
        icon='arrow-left'
        onPress={() => navigation.goBack()}
        style={{ backgroundColor: '#FFEBD0' }}
      />
      <TouchableOpacity style={styles.skipContainer}>
        <Text style={styles.skipText}>SKIP</Text>
        <Button
          icon='arrow-right'
          onPress={skipSection}
          style={{ backgroundColor: '#FFEBD0' }}
        />
      </TouchableOpacity>
    </Appbar.Header>
  );
}

const styles = StyleSheet.create({
  skipText: {
    color: theme.colors.primary,
    marginRight: 10,
    fontWeight: 'bold',
    paddingTop: 10,
  },
  skipContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignContent: 'center',
    flexDirection: 'row',
  },
});

export default SignUpTopBar;
