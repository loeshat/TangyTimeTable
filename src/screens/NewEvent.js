import React from 'react';
import { theme } from '../styles/Theme';
import { View } from 'react-native';
import { PaperProvider, Text } from 'react-native-paper';
import TitleTopBar from '../components/TitleTopBar';

// TODO: Add error prevention alert before quitting flow

/**
 * Display a list of groups, allowing user to select a group to plan an event with
 * @param {*} navigation 
 * @returns 
 */
const CreateNewEvent = ({ navigation }) => {
  const handleReturn = () => navigation.navigate('Events');
  return (
    <PaperProvider theme={theme}>
      <TitleTopBar backAction={handleReturn} title={'Return Home'} />
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Text>Create New Event Placeholder</Text>
      </View>
    </PaperProvider>
  );
}

export default CreateNewEvent;
