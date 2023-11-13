import React, { useState } from 'react';
import { theme, progressStyles } from '../../styles/Theme';
import { flowStyles } from '../../styles/FlowStyles';
import { Button, PaperProvider, Snackbar, Text } from 'react-native-paper';
import { Image, ScrollView, View } from 'react-native';
import { ProgressStep, ProgressSteps } from 'react-native-progress-steps';
import TitleTopBar from '../../components/TitleTopBar';
import { dateOptions } from '../../services/Data';
import PickTimeCard from '../../components/PickTimeCard';

/** 
 * Conditional rendering based on whether the logged in user 
 * is the event organiser and/or if event decision type is single
 * or group.
 * 
 * If logged in user is the event organiser:
 * - Let them pick time
 * else if decision type is group:
 * - go straight to activity screen -> then wait for others to vote
 * else (single decider and not organiser):
 * - screen says pending organiser actions
 * 
 * If decision type is group:
 * - Vote for activity then wait for others to vote
 * else:
 * - Immediately pick activity for event
 * - Then user can go straight to picking a location
 * 
*/

const EventFinalisation = ({ route, navigation }) => {
  const { eventId } = route.params ?? {};
  
  // TODO: Change route to group page
  const returnToGroup = () => navigation.navigate('Events');

  // Time select controls
  const initialTimeStates = Array.from({ length: dateOptions.length }, () => false);
  const [timeStates, setTimeStates] = useState(initialTimeStates);
  const [timeNextDisabled, setTimeDiabled] = useState(true);
  const [visible, setVisible] = useState(false);
  const handleTimeChange = (id, newState) => {
    const newStates = [...timeStates];
    newStates[id] = newState;
    setTimeStates(newStates);
    const chosenTimesNum = newStates.filter(val => val === true).length;
    if (chosenTimesNum > 1) {
      setVisible(true);
    }
    setTimeDiabled(chosenTimesNum !== 1);
  }
  
  // TODO: When user navigates to next screen, update event details with selected date and times

  return (
    <PaperProvider theme={theme}>
      <TitleTopBar backAction={returnToGroup} title={'Back to Group'} />
      <View style={flowStyles.screen}>
        <Snackbar
          visible={visible}
          onDismiss={() => setVisible(false)}
          action={{
            label: 'Close',
            onPress: () => setVisible(false),
            textColor: theme.colors.primary,           
          }}
        >
          You cannot select more than one event time!
        </Snackbar>
        <ProgressSteps {...progressStyles}>
          <ProgressStep
            label='Time'
            nextBtnTextStyle={{ color: theme.colors.text }}
            nextBtnDisabled={timeNextDisabled}
            nextBtnText='Confirm'
          >
            <View style={{ alignItems: 'center' }}>
              <View
                style={[flowStyles.outerSpeech, {
                  marginRight: '25%',
                  marginTop: '10%'
                }]}
              >
                <View
                  style={[flowStyles.speechContainer, {
                    width: 180,
                  }]}
                >
                  <Text
                    variant='bodyLarge'
                    style={{
                      color: theme.colors.text,
                    }}
                  >
                    {/** Change to actual event name */}
                    Let's pick a time for your event name!
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
              <View
                style={{
                  width: '82%',
                  alignItems: 'flex-end',
                  marginTop: '2%',
                }}
              >
                <Button
                  icon='calendar-month-outline'
                  labelStyle={{
                    color: theme.colors.text,
                  }}
                  onPress={() => navigation.navigate('EventRoutes', { screen: 'View in Calendar' })}
                >
                  View in Calendar
                </Button>
              </View>
              <View
                style={{
                  marginTop: '5%',
                  marginLeft: '15%',
                }}
              >
                <ScrollView
                  horizontal={true}
                >
                  {
                    dateOptions.map((item, id) => (
                      <PickTimeCard 
                        key={id} 
                        date={item.date} 
                        startTime={item.startTime}
                        endTime={item.endTime}
                        onChange={(newState) => handleTimeChange(id, newState)}
                      />
                    ))
                  }
                </ScrollView>
              </View>
            </View>
          </ProgressStep>
          <ProgressStep
            label='Activity'
            nextBtnTextStyle={{ color: theme.colors.text }}
            previousBtnText='Back'
            previousBtnTextStyle={{ color: theme.colors.text }}
          >
            <View style={{ alignItems: 'center' }}>
              <View
                style={[flowStyles.outerSpeech, {
                  marginRight: '25%', 
                  marginTop: '10%',
                }]}
              >
                <View
                  style={[flowStyles.speechContainer, {
                    width: 180,
                  }]}
                >
                  <Text
                    variant='bodyLarge'
                    style={{
                      color: theme.colors.text,
                    }}
                  >
                    {/** Replace event name with actual data from BE */}
                    Let's pick an activity for event name!
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
            </View>
          </ProgressStep>
          <ProgressStep
            label='Location'
            nextBtnTextStyle={{ color: theme.colors.text }}
            previousBtnText='Back'
            previousBtnTextStyle={{ color: theme.colors.text }}
            finishBtnText='Confirm'
          >

          </ProgressStep>
        </ProgressSteps>
      </View>
    </PaperProvider>
  );
}

export default EventFinalisation;
