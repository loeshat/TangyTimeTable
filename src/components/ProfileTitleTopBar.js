import React from 'react';
import { theme } from '../styles/Theme';
import { Appbar } from 'react-native-paper';
import { Image, TouchableWithoutFeedback } from 'react-native';

/**
 * Top Navigation Bar for the Profile screen offering access to Settings 
 * @param {*} navigation
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
      <TouchableWithoutFeedback onPress={() => navigation.navigate('Events')}>
        <Image
          source={require('../assets/tangy_logo.png')}
          style={{ height: 50, marginLeft: 10, marginBottom: 5 }}
        />
      </TouchableWithoutFeedback>
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
