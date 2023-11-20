import React, {useState} from 'react';
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
  const [userId, setUserId] = useState(null);
  const [name, setName] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [location, setLocation] = useState("");
  const [friends, setFriends] = useState([]);
  const [interests, setInterests] = useState([]);
  const [connectedAccounts, setConnectedAccounts] = useState([]);

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
      <DoubleTitleTopBar 
        backAction={() => navigation.navigate('Events')}
        backActiontitle={'Return Home'}
        forwardAction={() => navigation.navigate('Settings')}
      />
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
