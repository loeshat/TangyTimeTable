import React from 'react';
import { calendarTheme, theme, progressStyles } from '../../styles/Theme';
import { flowStyles } from '../../styles/FlowStyles';
import { Button, PaperProvider, Text } from 'react-native-paper';
import { Image, ScrollView, View } from 'react-native';
import { ProgressStep, ProgressSteps } from 'react-native-progress-steps';
import TitleTopBar from '../../components/TitleTopBar';
import { dateOptions } from '../../services/Data';
import PickTimeCard from '../../components/PickTimeCard';

/** 
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
  // TODO: Array to keep track of time select states
  // TODO: Do not allow user to select more than one date
  // TODO: Popup alert OR display at the bottom to say which date option the user selected

  // TODO: Modal display for view in calendar -> separate screen

  return (
    <PaperProvider theme={theme}>
      <TitleTopBar backAction={returnToGroup} title={'Back to Group'} />
      <View style={flowStyles.screen}>
        <ProgressSteps {...progressStyles}>
          <ProgressStep
            label='Time'
            nextBtnTextStyle={{ color: theme.colors.text }}
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
