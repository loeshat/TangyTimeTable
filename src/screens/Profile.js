import React from 'react';
import { theme } from '../styles/Theme';
import { View } from 'react-native';
import { PaperProvider, Text } from 'react-native-paper';
import TitleTopBar from '../components/TitleTopBar';

const Profile = ({ navigation }) => {
  return (
    <PaperProvider theme={theme}>
      <TitleTopBar backAction={() => navigation.navigate('Events')} title={'Return Home'}/>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text variant='bodyMedium'>Profile Screen</Text>
      </View>
    </PaperProvider>
  );
}

export default Profile;
