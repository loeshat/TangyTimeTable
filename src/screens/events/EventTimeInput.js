import React from 'react';
import { theme } from '../../styles/Theme';
import { PaperProvider } from 'react-native-paper';

// For the user to add their own availabilities during event
// planning process

const EventTimeInput = ({ navigation }) => {
  return (
    <PaperProvider theme={theme}></PaperProvider>
  );
}

export default EventTimeInput;
