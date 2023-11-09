import React, { useState } from 'react';
import { theme, progressStyles } from '../../styles/Theme';
import { flowStyles } from '../../styles/FlowStyles';
import { PaperProvider } from 'react-native-paper';
import {  View } from 'react-native';
import TitleTopBar from '../../components/TitleTopBar';
import WarningAlert from '../../components/Alert';
import { ProgressStep, ProgressSteps } from 'react-native-progress-steps';

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
        <ProgressSteps {...progressStyles}>
          <ProgressStep
            label='Event Date'
            nextBtnTextStyle={{ color: theme.colors.text }}
          >

          </ProgressStep>
          <ProgressStep
            label='Event Time'
            nextBtnTextStyle={{ color: theme.colors.text }}
            previousBtnText='Back'
            previousBtnTextStyle={{ color: theme.colors.text }}
          >

          </ProgressStep>
          <ProgressStep
            label='Activity'
            nextBtnTextStyle={{ color: theme.colors.text }}
            previousBtnText='Back'
            previousBtnTextStyle={{ color: theme.colors.text }}
          >

          </ProgressStep>
          <ProgressStep
            label='Location'
            nextBtnTextStyle={{ color: theme.colors.text }}
            finishBtnText='Next'
            previousBtnText='Back'
            previousBtnTextStyle={{ color: theme.colors.text }}
            onSubmit={() => navigation.navigate('EventRoutes', { screen: 'Event Time Input', params: { eventId: eventId } })}
          >

          </ProgressStep>
        </ProgressSteps>
      </View>
    </PaperProvider>
  );
}

export default NewEventPlan;
