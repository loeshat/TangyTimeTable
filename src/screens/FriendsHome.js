import React from 'react';
import { theme } from '../styles/Theme';
import { View } from 'react-native';
import { PaperProvider, Text } from 'react-native-paper';
import TopNavBar from '../components/TopBar';

/**
 * Friends 'Home' Page, containing all groups and friends list display
 * @param {*} navigation 
 * @returns 
 */
const FriendsHome = ({ navigation }) => {
  return (
    <PaperProvider theme={theme}>
      <TopNavBar navigation={navigation} />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text variant='bodyMedium'>Groups & Friends List</Text>
      </View>
    </PaperProvider>
  );
}

export default FriendsHome;