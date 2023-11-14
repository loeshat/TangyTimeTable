import React, { useState } from 'react';
import { theme, progressStyles } from '../../styles/Theme';
import { flowStyles } from '../../styles/FlowStyles';
import { Button, PaperProvider, Portal, Snackbar, Text } from 'react-native-paper';
import { Image, ScrollView, View } from 'react-native';
import { ProgressStep, ProgressSteps } from 'react-native-progress-steps';
import TitleTopBar from '../../components/TitleTopBar';
import { dateOptions, activityOptions } from '../../services/Data';
import PickTimeCard from '../../components/PickTimeCard';
import ActivityPickCard from '../../components/ActivityCard';

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

  // Snackbar popup controls
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');

  // Time select controls
  const initialTimeStates = Array.from({ length: dateOptions.length }, () => false);
  const [timeStates, setTimeStates] = useState(initialTimeStates);
  const [timeNextDisabled, setTimeDiabled] = useState(true);
  const handleTimeChange = (id, newState) => {
    setVisible(false);
    const newStates = [...timeStates];
    newStates[id] = newState;
    setTimeStates(newStates);
    const chosenTimesNum = newStates.filter(val => val === true).length;
    if (chosenTimesNum > 1) {
      setMessage('You cannot select more than one event time!');
      setVisible(true);
    }
    setTimeDiabled(chosenTimesNum !== 1);
  }
  
  // TODO: When user navigates to next screen, update event details with selected date and times
  
  // Activity select controls
  const initialActivityStates = Array.from({ length: activityOptions.length }, () => false);
  const [activityStates, setActivityStates] = useState(initialActivityStates);
  const [activityNextDisabled, setActivityDisabled] = useState(true);
  const handleActivityChange = (id, newState) => {
    setVisible(false);
    const newAStates = [...activityStates];
    newAStates[id] = newState;
    setActivityStates(newAStates);
    const chosenActivitiesNum = newAStates.filter(val => val === true).length;
    // If organiser, only allow one select
    // Otherwise, allow multiple select
    if (chosenActivitiesNum > 1) {
      setMessage('You cannot select more than one activity for your event!');
      setVisible(true);
    }
    setActivityDisabled(chosenActivitiesNum !== 1);
  }

  // TODO: When user navigates to next screen, update event details with selected activities

  return (
    <PaperProvider theme={theme}>
      <TitleTopBar backAction={returnToGroup} title={'Back to Group'} />
      <View style={flowStyles.screen}>
        <Portal>
          <Snackbar
            visible={visible}
            onDismiss={() => setVisible(false)}
            action={{
              label: 'Close',
              onPress: () => setVisible(false),
              textColor: theme.colors.primary,           
            }}
          >
            {message}
          </Snackbar>
        </Portal>
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
            nextBtnDisabled={activityNextDisabled}
          >
            <View style={{ alignItems: 'center' }}>
              <View
                style={[flowStyles.outerSpeech, {
                  marginRight: '25%', 
                  marginTop: '15%',
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
              <View
                style={{
                  marginLeft: '10%',
                  marginTop: '5%'
                }}
              >
                <ScrollView
                  horizontal={true}
                >
                  {
                    activityOptions.map((item, id) => (
                      <ActivityPickCard 
                        key={id}
                        type={item.type}
                        icon={item.icon}
                        votesNum={item.votesNum}
                        other={item.other}
                        onChange={(newState) => handleActivityChange(id, newState)}
                        navigation={navigation}
                      />
                    ))
                  }
                </ScrollView>
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
