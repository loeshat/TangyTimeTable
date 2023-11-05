import React, { useState } from 'react';
import { theme } from '../styles/Theme';
import { Image, View } from 'react-native';
import { PaperProvider, Text, TextInput } from 'react-native-paper';
import TitleTopBar from '../components/TitleTopBar';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';

// TODO: Add error prevention alert before quitting flow

const progressStyles = {
  activeStepIconBorderColor: theme.colors.primary,
  activeStepNumColor: theme.colors.primary,
  activeLabelColor: theme.colors.text,
  completedStepIconColor: theme.colors.success,
  completedProgressBarColor: theme.colors.success,
  completedLabelColor: theme.colors.success,
  borderWidth: 1,
  labelFontSize: 15,
  progressBarColor: theme.colors.disabled,
  disabledStepIconColor: '#D6D6D6',
  labelColor: theme.colors.disabled,
}

/**
 * Beginning of new group creation workflow
 * @param {*} navigation 
 * @returns 
 */
const CreateNewGroup = ({ navigation }) => {
  const [name, setName] = useState('');

  return (
    <PaperProvider theme={theme}>
      <TitleTopBar backAction={() => navigation.navigate('Events')} title={'Return Home'} />
      <View style={{ width: '100%', height: '88%' }}>
        <ProgressSteps {...progressStyles}>
          <ProgressStep 
            label='Group Name'
            nextBtnTextStyle={{ color: theme.colors.text }}
            nextBtnDisabled={!name}
          >
            <View style={{ alignItems: 'center' }}>
              <View 
                style={{ 
                  width: '100%', 
                  alignItems: 'flex-end',
                  marginRight: '30%',
                  marginTop: '10%' 
                }}
              >
                <View 
                  style={{ 
                    borderColor: theme.colors.text, 
                    borderWidth: 1,
                    borderRadius: 10,
                    padding: 10, 
                    width: 175,
                    marginBottom: 10,
                  }}
                >
                  <Text
                    variant='bodyLarge'
                  >
                    What would you like to name the group?
                  </Text>
                </View>
              </View>
              <View 
                style={{ 
                  alignItems: 'flex-start', 
                  width: '100%', 
                  marginLeft: '30%' 
                }}
              >
                <Image 
                  source={require('../assets/wave.png')}
                  style={{ width: 150, height: 150 }}
                />
              </View>
              <TextInput 
                label='Group Name'
                mode='outlined'
                outlineColor={theme.colors.text}
                textColor={theme.colors.text}
                style={{ 
                  width: '70%',
                  marginTop: '5%'
                }}
                value={name}
                onChangeText={e => setName(e)}
              />
            </View>
          </ProgressStep>
          <ProgressStep 
            label='Group Members'
            previousBtnText='Back'
            nextBtnTextStyle={{ color: theme.colors.text }}
            previousBtnTextStyle={{ color: theme.colors.text }}
          >
            <View style={{ alignItems: 'center' }}>
              <Text>Add your group members</Text>
            </View>
          </ProgressStep>
          <ProgressStep 
            label='Confirm'
            previousBtnText='Back'
            finishBtnText='Confirm'
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
