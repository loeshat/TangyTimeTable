import React, { useState } from 'react';
import { theme } from '../../styles/Theme';
import { View } from 'react-native';
import { PaperProvider, Text } from 'react-native-paper';
import DoubleTitleTopBar from '../../components/DoubleTitleTopBar';
import { styles } from './Profile.styles';

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



  return (
    <PaperProvider theme={theme}>
      <DoubleTitleTopBar 
        backAction={() => navigation.navigate('Events')}
        backActiontitle={'Return Home'}
        forwardAction={() => navigation.navigate('Settings')}
      />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text variant='bodyMedium'>Profile Screen</Text>
      </View>
    </PaperProvider>
  );
}

export default Profile;
