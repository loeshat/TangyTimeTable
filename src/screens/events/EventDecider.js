import React from 'react';
import { theme } from '../../styles/Theme';
import { PaperProvider } from 'react-native-paper';

// For event final time, activity and location selection
const NewEventDecider = ({ navigation }) => {
  return (
    <PaperProvider theme={theme}></PaperProvider>
  );
}

export default NewEventDecider;
