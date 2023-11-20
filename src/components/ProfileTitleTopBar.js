import React from 'react';
import { theme } from '../styles/Theme';
import { Appbar } from 'react-native-paper';
import { Image } from 'react-native';

/**
 * Top Navigation Bar which contains return action,return button's text, 
 * @param {Function} backAction
 * @param {String} backActiontitle
 * @param {Function} forwardAction
 * @returns 
 */
const ProfileTitleTopBar = ({ navigation }) => {
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
          icon='cog'
          size={45}
          color={theme.colors.text}
          onPress={() => navigation.navigate('Settings')}
      />
    </Appbar.Header>
  );
}

export default ProfileTitleTopBar;
