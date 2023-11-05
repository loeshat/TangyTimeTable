import React from 'react';
import { theme } from '../styles/Theme';
import { View } from 'react-native';
import { PaperProvider, Text } from 'react-native-paper';
import TitleTopBar from '../components/TitleTopBar';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';

// TODO: Add error prevention alert before quitting flow

const progressStyles = {
  activeStepIconBorderColor: theme.colors.primary,
  activeStepNumColor: theme.colors.primary,
  activeLabelColor: theme.colors.text,
  completedStepIconColor: theme.colors.success,
  completedProgressBarColor: theme.colors.success,
  borderWidth: 1,
  labelFontSize: 15,
}

/**
 * Beginning of new group creation workflow
 * @param {*} navigation 
 * @returns 
 */
const CreateNewGroup = ({ navigation }) => {

  return (
    <PaperProvider theme={theme}>
      <TitleTopBar backAction={() => navigation.navigate('Events')} title={'Return Home'} />
      <View style={{ flex: 1 }}>
        <ProgressSteps {...progressStyles}>
          <ProgressStep 
            label='Group Name'
            nextBtnText='Next >'
            nextBtnTextStyle={{ color: theme.colors.text }}
          >
            <View style={{ alignItems: 'center' }}>
              <Text>Add your group name</Text>
            </View>
          </ProgressStep>
          <ProgressStep 
            label='Group Members'
            previousBtnText='< Back'
            nextBtnText='Next >'
            nextBtnTextStyle={{ color: theme.colors.text }}
            previousBtnTextStyle={{ color: theme.colors.text }}
          >
            <View style={{ alignItems: 'center' }}>
              <Text>Add your group members</Text>
            </View>
          </ProgressStep>
          <ProgressStep 
            label='Confirm'
            previousBtnText='< Back'
            finishBtnText='Confirm >'
            nextBtnTextStyle={{ color: theme.colors.text }}
            previousBtnTextStyle={{ color: theme.colors.text }}
          >
            <View style={{ alignItems: 'center' }}>
              <Text>Confirm group creation</Text>
            </View>
          </ProgressStep>
        </ProgressSteps>
      </View>
    </PaperProvider>
  );
}

export default CreateNewGroup;
