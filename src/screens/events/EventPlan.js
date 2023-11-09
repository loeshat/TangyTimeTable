import React, { useState } from 'react';
import { theme } from '../../styles/Theme';
import { flowStyles } from '../../styles/FlowStyles';
import { PaperProvider } from 'react-native-paper';
import {  View } from 'react-native';
import TitleTopBar from '../../components/TitleTopBar';
import WarningAlert from '../../components/Alert';

// All screens related to finer event details planning such as
// date, time and optional activity and location selection

const NewEventPlan = ({ route, navigation }) => {
  const { eventId } = route.params ?? {};

  // Warning alert handling
  const [alertOpen, setAlertOpen] = useState(false);
  const openAlert = () => setAlertOpen(true);
  const closeAlert = () => setAlertOpen(false);
  const returnHome = () => {
    closeAlert();
    navigation.navigate('Events');
  }

  return (
    <PaperProvider theme={theme}>
      <TitleTopBar backAction={openAlert} title={'Return Home'} />
      <View style={flowStyles.screen}>
        <WarningAlert 
          description={'You will lose all your event planning progress! Are you sure?'}
          affirmText={'Return Home'}
          affirmAction={returnHome}
          affirmContentStyle={{ width: 125 }}
          cancelAction={closeAlert}
          closeAction={closeAlert}
          visible={alertOpen}
        />
      </View>
    </PaperProvider>
  );
}

export default NewEventPlan;
