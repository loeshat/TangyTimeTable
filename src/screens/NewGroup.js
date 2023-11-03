import React from 'react';
import { theme } from '../styles/Theme';
import { View } from 'react-native';
import { PaperProvider, Text } from 'react-native-paper';
import TitleTopBar from '../components/TitleTopBar';

// TODO: Add error prevention alert before quitting flow

const CreateNewGroup = ({ navigation }) => {
  return (
    <PaperProvider theme={theme}>
      <TitleTopBar backAction={() => navigation.navigate('Events')} title={'Return Home'} />
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Text>Create New Group Placeholder</Text>
      </View>
    </PaperProvider>
  );
}

export default CreateNewGroup;
