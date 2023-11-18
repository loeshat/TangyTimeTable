import React from 'react';
import { theme } from '../styles/Theme';
import { Image } from 'react-native';
import { Appbar } from 'react-native-paper';

/**
 * Top Navigation Bar which only contains return action and the return button's text
 * @param {Function} backAction
 * @param {String} title
 * @returns 
 */
const TitleTopBar = ({ navigation }) => {
  return (
    <Appbar.Header
      style={{
        backgroundColor: theme.colors.background,
        justifyContent: 'space-between'
      }}
    >
      <Image
        source={require('../assets/tangy_logo.png')}
        style={{ height: 50, marginLeft: 10, marginBottom: 5 }}
      />
      <Appbar.Action
        icon='account-circle'
        size={45}
        color={theme.colors.text}
        onPress={() => navigation.navigate('Profile')}
      />
    </Appbar.Header>
  );
}

export default TitleTopBar;
