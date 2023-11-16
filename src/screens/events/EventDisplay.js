import React from 'react';
import { theme } from '../../styles/Theme';
import { PaperProvider } from 'react-native-paper';
import TitleTopBar from '../../components/TitleTopBar';

const EventDisplay = ({ route, navigation }) => {
  const { eventId, status } = route.params ?? {};
  return (
    <PaperProvider theme={theme}>
      <TitleTopBar backAction={() => navigation.navigate('Events')} title={'Return Home'} />
    </PaperProvider>
  );
}

export default EventDisplay;
