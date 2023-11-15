import React from 'react';
import { theme } from '../styles/Theme';
import { View } from 'react-native';
import { PaperProvider, Text, Button } from 'react-native-paper';
import TitleTopBar from '../components/TitleTopBar';
import { signOutRequest } from '../services/StoreService';

/**
 * Profile Screen displaying user profile picture and general user details
 * Also contains Settings button, leading to Settings screen display
 * @param {*} navigation 
 * @returns 
 */
const Profile = ({ navigation }) => {
  const handleSignOut = async () => {
    const success = await signOutRequest();
    if (success) {
      // log out successful, navigate to the landing page
      navigation.navigate('LoginRoutes', { screen: 'Landing' })
    } else {
      console.error('Could not log out');
    }
  }

  return (
    <PaperProvider theme={theme}>
      <TitleTopBar backAction={() => navigation.navigate('Events')} title={'Return Home'} />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text variant='bodyMedium'>Profile Screen</Text>
        <Button
          variant='contained'
          onPress={handleSignOut}>
          SIGN OUT</Button>
      </View>
    </PaperProvider>
  );
}

export default Profile;
