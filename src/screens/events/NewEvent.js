import React, { useState } from 'react';
import { theme, progressStyles } from '../../styles/Theme';
import { Image, View } from 'react-native';
import { Button, PaperProvider, Text, TextInput } from 'react-native-paper';
import TitleTopBar from '../../components/TitleTopBar';
import WarningAlert from '../../components/Alert';
import { flowStyles } from '../../styles/FlowStyles';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { addGroupEvent, clearEvents } from '../../services/StoreService';

/**
 * Display a list of groups, allowing user to select a group to plan an event with
 * @param {*} navigation 
 * @returns 
 */
const CreateNewEvent = ({ route, navigation }) => {
  const { groupId } = route.params ?? {};

  // Warning alert handling
  const [alertOpen, setAlertOpen] = useState(false);
  const openAlert = () => setAlertOpen(true);
  const closeAlert = () => setAlertOpen(false);
  const returnHome = () => {
    closeAlert();
    navigation.navigate('Events');
  }

  // Event basic details handling
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  // Create first part of event
  const createEvent = async (deciderType) => {
    await clearEvents();
    // TODO: Add ID of currently logged in user as the organiser
    const eventBody = {
      name: name,
      description: description,
      decider: deciderType,
      status: 'in progress',
    }
    addGroupEvent(groupId, eventBody).then((eventId) => {
      console.log(groupId, eventId, eventBody);
      navigation.navigate('EventRoutes', { screen: 'New Event Plan', params: { eventId: eventId } });
    });
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
            label='Event Name'
            nextBtnTextStyle={{ color: theme.colors.text }}
            nextBtnDisabled={!name}
          >
            <View style={{ alignItems: 'center' }}>
              <View
                style={[flowStyles.outerSpeech, {
                  marginTop: '30%'
                }]}
              >
                <View
                  style={[flowStyles.speechContainer, {
                    marginRight: '15%'
                  }]}
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
                style={[flowStyles.imageContainer, {
                  marginLeft: '20%'
                }]}
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
            previousBtnTextStyle={{ color: theme.colors.text }}
            nextBtnDisabled={!description}
            nextBtnTextStyle={{ color: theme.colors.text }}
          >
            <View style={{ alignItems: 'center' }}>
              <View
                style={[flowStyles.outerSpeech, {
                  marginTop: '30%'
                }]}
              >
                <View
                  style={[flowStyles.speechContainer, {
                    marginRight: '15%'
                  }]}
                >
                  <Text
                    variant='bodyLarge'
                    style={{ color: theme.colors.text }}
                  >
                    What's your event about?
                  </Text>
                </View>
              </View>
              <View
                style={[flowStyles.imageContainer, {
                  marginLeft: '20%'
                }]}
              >
                <Image 
                  source={require('../../assets/wave.png')}
                  style={flowStyles.imageStyle}
                />
              </View>
              <TextInput 
                label='Event Description'
                mode='outlined'
                outlineColor={theme.colors.text}
                textColor={theme.colors.text}
                style={{
                  width: '70%',
                  marginTop: '5%',
                  backgroundColor: theme.colors.surface
                }}
                value={description}
                onChangeText={(e) => setDescription(e)}
              />
            </View>
          </ProgressStep>
          <ProgressStep
            label='Decision Maker'
            previousBtnText='Back'
            previousBtnTextStyle={{ color: theme.colors.text }}
            finishBtnText=''
            nextBtnTextStyle={{ color: theme.colors.text }}
          >
            <View style={{ alignItems: 'center' }}>
              <View
                style={[flowStyles.outerSpeech, {
                  marginTop: '20%'
                }]}
              >
                <View
                  style={[flowStyles.speechContainer, {
                    marginRight: '15%',
                    width: 200
                  }]}
                >
                  <Text
                    variant='bodyLarge'
                    style={{ color: theme.colors.text }}
                  >
                    Who will decide on your event's activity?
                  </Text>
                </View>
              </View>
              <View
                style={[flowStyles.imageContainer, {
                  marginLeft: '25%'
                }]}
              >
                <Image 
                  source={require('../../assets/wave.png')}
                  style={flowStyles.imageStyle}
                />
              </View>
              <Button
                mode='contained'
                contentStyle={{
                  height: 60,
                  width: 200
                }}
                labelStyle={{
                  fontSize: 20
                }}
                style={{
                  marginTop: '5%',
                  marginBottom: '5%'
                }}
                buttonColor={theme.colors.success}
                onPress={() => createEvent('single')}
              >
                Just Me
              </Button>
              <Button
                mode='contained'
                contentStyle={{
                  height: 60,
                  width: 200
                }}
                labelStyle={{
                  fontSize: 20
                }}
                onPress={() => createEvent('group')}
              >
                Group Vote
              </Button>
            </View>
          </ProgressStep>
        </ProgressSteps>
      </View>
    </PaperProvider>
  );
}

export default CreateNewEvent;
