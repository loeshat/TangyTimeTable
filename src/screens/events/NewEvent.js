import React, { useState } from 'react';
import { theme, progressStyles } from '../../styles/Theme';
import { Image, View } from 'react-native';
import { PaperProvider, Text, TextInput } from 'react-native-paper';
import TitleTopBar from '../../components/TitleTopBar';
import WarningAlert from '../../components/Alert';
import { flowStyles } from '../../styles/FlowStyles';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';

/**
 * Display a list of groups, allowing user to select a group to plan an event with
 * @param {*} navigation 
 * @returns 
 */
const CreateNewEvent = ({ navigation }) => {
  // Warning alert handling
  const [alertOpen, setAlertOpen] = useState(false);
  const openAlert = () => setAlertOpen(true);
  const closeAlert = () => setAlertOpen(false);
  const returnHome = () => {
    closeAlert();
    navigation.navigate('Events');
  }

  // Group basic details handling
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

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
            label='Event Name'
            nextBtnTextStyle={{ color: theme.colors.text }}
          >
            <View style={{ alignItems: 'center' }}>
              <View
                style={[flowStyles.outerSpeech]}
              >
                <View
                  stylle={[flowStyles.speechContainer]}
                >
                  <Text
                    variant='bodyLarge'
                    style={{ color: theme.colors.text }}
                  >
                    Let's name your event!
                  </Text>
                </View>
              </View>
              <View
                style={[flowStyles.imageContainer]}
              >
                <Image 
                  source={require('../../assets/wave.png')}
                  style={flowStyles.imageStyle}
                />
              </View>
              <TextInput 
                label='Event Name'
                mode='outlined'
                outlineColor={theme.colors.text}
                textColor={theme.colors.text}
                style={{
                  width: '70%',
                  marginTop: '5%',
                  backgroundColor: theme.colors.surface
                }}
                value={name}
                onChangeText={e => setName(e)}
              />
            </View>
          </ProgressStep>
          <ProgressStep
            label='Event Details'
            previousBtnText='Back'
          >
            {/** TBC */}
          </ProgressStep>
        </ProgressSteps>
      </View>
    </PaperProvider>
  );
}

export default CreateNewEvent;
