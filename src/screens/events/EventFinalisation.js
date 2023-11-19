import React, { useState, useCallback, useEffect } from 'react';
import { theme, progressStyles } from '../../styles/Theme';
import { flowStyles } from '../../styles/FlowStyles';
import { 
  Button,
  Card,
  Dialog,
  Icon,
  PaperProvider,
  Portal,
  Snackbar, 
  Text, 
  TextInput,
} from 'react-native-paper';
import { Image, Linking, ScrollView, View } from 'react-native';
import { ProgressStep, ProgressSteps } from 'react-native-progress-steps';
import TitleTopBar from '../../components/TitleTopBar';
import { dateOptions, activityOptions, locationOptions } from '../../services/Data';
import PickTimeCard from '../../components/PickTimeCard';
import ActivityPickCard from '../../components/ActivityCard';
import LocationCard from '../../components/LocationCard';
import { headingStyle, textContainer } from './modals/LocationReadMoreModal';
import { getEvent, getGroupDetails } from '../../services/StoreService';

/**
 * Event Finalisation workflow
 * @param {*} route
 * @param {*} navigation
 * @returns 
 */
const EventFinalisation = ({ route, navigation }) => {
  const { eventId, activeStep } = route.params ?? {};

  // Data load and initial setup
  const [eventObj, setEventObj] = useState({});
  const [eventDate, setEventDate] = useState(0);
  const [groupName, setGroupName] = useState('');
  useEffect(() => {
    getEvent(eventId).then((res) => {
      setEventObj(res);
      setEventDate(res.eventDate);
      setTimeDiabled(res.eventDate === null);
      setActivityDisabled(res.activity === null);
      setLocationDisabled(res.location === null);
      getGroupDetails(res.groupId).then((res) => setGroupName(res.name));
    });
  }, []);
  
  const returnToGroup = () => navigation.navigate('Event Display', { eventId: eventId, groupName: groupName });

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

  const handleTimeNext = () => {
    if (eventObj.organiser === null && eventObj.eventDate === null) {
      handleOpenAlert('Do you want to add the event to your group calendar?');
    }
  }
  
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
    if (eventObj.organiser === null && chosenActivitiesNum > 1) {
      setMessage('You cannot select more than one activity for your event!');
      setVisible(true);
    }
    setActivityDisabled((eventObj.organiser === null && chosenActivitiesNum !== 1) || (eventObj.organiser !== null && chosenActivitiesNum < 1));
  }

  const handleActivityNext = () => {
    if (eventObj.activity === null && eventObj.decider === 'group') {
      navigation.navigate('EventRoutes', { 
        screen: 'Completed Event Confirmation',
        params: {
          speech: `Let's wait for your friends to vote for their favourite activity! I'll let you know when they're all done!`,
          eventId: eventId,
          groupName: groupName,
        }
      });
    } else if (eventObj.activity === null && eventObj.decider === 'single') {
      // Since the organiser is making all decisions, they won't need to wait for other members' input
      handleOpenAlert('Do you want to update your calendar event with your chosen activity?');
    }
  }

  // Custom location controls
  const [customLocation, setCustomLocation] = useState('');
  const [customSelect, setCustomSelect] = useState(false);
  const handleCustomSelect = () => {
    setCustomSelect(!customSelect);
    handleLocationChange(locationStates.length - 1, !customSelect);
  }
  const handleCustomLocation = (text) => {
    setCustomLocation(text);
    if (text && customSelect) {
      setLocationDisabled(false);
    }
  }

  // Location select controls
  const initialLocationStates = Array.from({ length: locationOptions.length + 1 }, () => false);
  const [locationStates, setLocationStates] = useState(initialLocationStates);
  const [locationNextDisabled, setLocationDisabled] = useState(true);
  const handleLocationChange = (id, newState) => {
    setVisible(false);
    const newLocationStates = [...locationStates];
    newLocationStates[id] = newState;
    setLocationStates(newLocationStates);
    const chosenLocationNum = newLocationStates.filter(val => val === true).length;
    if (chosenLocationNum > 1) {
      setMessage('You can only select one location for your event!');
      setVisible(true);
    }
    setLocationDisabled(chosenLocationNum !== 1);
    if (newState && id === locationStates.length - 1 && !customLocation) {
      setMessage('You have not provided a custom location yet!');
      setVisible(true);
      setLocationDisabled(true);
    }
  }

  const handleLocationNext = () => {
    // User is picking a location for the event and may want to update their calendar
    // with the chosen location
    if (eventObj.organiser === null && eventObj.location === null) {
      handleOpenAlert('Do you want to update the calendar event with your chosen location?');
    }
  }

  // For travel time, if organiser, display selected location info
  // Otherwise, display default option (ie. first option in locations array)
  const openWebsite = useCallback(async () => {
    const website = locationOptions[0].other.website; // modify based on scenario
    const supported = await Linking.canOpenURL(website);
    if (supported) {
      await Linking.openURL(website);
    } else {
      console.log(`Error: Cannot open provided URL: ${website}`);
    }
  }, [locationOptions[0].other.website]);

  // Update Calendar alert controls
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const handleOpenAlert = (message) => {
    setAlertMessage(message);
    setOpenAlert(true);
  }
  const handleCloseAlert = () => setOpenAlert(false);

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
        <Portal>
          <Dialog
            visible={openAlert} 
            onDismiss={handleCloseAlert}
            style={{
              backgroundColor: theme.colors.background,
            }}
          >
            <Dialog.Title
              style={{
                color: theme.colors.primary,
                fontWeight: '500'
              }}
            >
              Update Calendar
            </Dialog.Title>
            <Dialog.Content>
              <Text
                variant='bodyLarge'
                style={{
                  color: theme.colors.text,
                }}
              >
                {alertMessage}
              </Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button
                mode='outlined'
                style={{
                  borderColor: theme.colors.text,
                  borderRadius: 12,
                  width: 80,
                }}
                textColor={theme.colors.text}
                onPress={handleCloseAlert}
              >
                Cancel
              </Button>
              <Button
                mode='contained'
                style={{
                  width: 80,
                  borderRadius: 12,
                }}
                onPress={handleCloseAlert}
              >
                Update
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        <ProgressSteps {...progressStyles} activeStep={activeStep}>
          <ProgressStep
            label='Time'
            nextBtnTextStyle={{ color: theme.colors.text }}
            nextBtnDisabled={timeNextDisabled}
            nextBtnText='Confirm'
            onNext={handleTimeNext}
          >
            {
              (eventObj.organiser === null && eventObj.eventDate === null)
              ?
              <View style={{ alignItems: 'center' }}>
                {/** Event Date is still pending selection */}
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
                      Let's pick a time for {eventObj.name}!
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
                          isDisplay={false}
                        />
                      ))
                    }
                  </ScrollView>
                </View>
              </View>
              :
              <View style={{ alignItems: 'center' }}>
                {/** Event Date has been locked in */}
                <View style={[flowStyles.outerSpeech, {
                  marginTop: '10%'
                }]}>
                  <View style={[flowStyles.speechContainer, {
                    marginRight: '18%',
                    width: 180,
                  }]}>
                    <Text
                      variant='bodyLarge'
                      style={{
                        color: theme.colors.text,
                      }}
                    >
                      Your event date has been locked in!
                    </Text>
                  </View>
                </View>
                <View style={[flowStyles.imageContainer, {
                  marginLeft: '28%',
                  marginBottom: '8%',
                }]}>
                  <Image 
                    source={require('../../assets/wave.png')}
                    style={flowStyles.imageStyle}
                  />
                </View>
                <View
                  style={{
                    marginLeft: 21,
                  }}
                >
                  <PickTimeCard 
                    date={dateOptions[eventDate].date}
                    startTime={dateOptions[eventDate].startTime}
                    endTime={dateOptions[eventDate].endTime}
                    isDisplay={true}
                  />
                </View>
                <Button
                  mode='contained'
                  icon='arrow-right'
                  labelStyle={{
                    fontSize: 18,
                  }}
                  contentStyle={{
                    flexDirection: 'row-reverse',
                    height: 60,
                  }}
                  style={{
                    borderRadius: 12,
                    marginTop: '8%',
                  }}
                  onPress={() => alert('This feature is not available yet!')}
                >
                  Suggest Date Change
                </Button>
              </View>
            }
          </ProgressStep>
          <ProgressStep
            label='Activity'
            nextBtnText='Confirm'
            nextBtnTextStyle={{ color: theme.colors.text }}
            previousBtnText='Back'
            previousBtnTextStyle={{ color: theme.colors.text }}
            nextBtnDisabled={activityNextDisabled}
            onNext={handleActivityNext}
          >
            {
              (eventObj.activity === null && eventObj.decider === 'group')
              ?
              <View style={{ alignItems: 'center' }}>
                {/**
                 * Event pending activity selection/vote
                 */}
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
                      Let's pick an activity for {eventObj.name}!
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
                          isDisplay={false}
                        />
                      ))
                    }
                  </ScrollView>
                </View>
              </View>
              :
              <View style={{ alignItems: 'center' }}>
                {/** Activity for Event has been locked in */}
                <View style={[flowStyles.outerSpeech, {
                  marginTop: '10%'
                }]}>
                  <View style={[flowStyles.speechContainer, {
                    marginRight: '15%',
                    width: 200,
                  }]}>
                    <Text
                      variant='bodyLarge'
                      style={{
                        color: theme.colors.text,
                      }}
                    >
                      Your activity has been locked in!
                    </Text>
                  </View>
                </View>
                <View style={[flowStyles.imageContainer, {
                  marginLeft: '28%',
                  marginBottom: '8%',
                }]}>
                  <Image 
                    source={require('../../assets/wave.png')}
                    style={flowStyles.imageStyle}
                  />
                </View>
                <View
                  style={{
                    marginLeft: 21,
                  }}
                >
                  <ActivityPickCard 
                    type={activityOptions[0].type}
                    icon={activityOptions[0].icon}
                    votesNum={activityOptions[0].votesNum}
                    other={activityOptions[0].other}
                    navigation={navigation}
                    isDisplay={true}
                  />
                </View>
                <Button
                  mode='contained'
                  icon='arrow-right'
                  labelStyle={{
                    fontSize: 18,
                  }}
                  contentStyle={{
                    flexDirection: 'row-reverse',
                    height: 50,
                  }}
                  style={{
                    borderRadius: 12,
                    marginTop: '5%',
                  }}
                  onPress={() => alert('This feature is not available yet!')}
                >
                  Change My Vote
                </Button>
              </View>
            }
          </ProgressStep>
          <ProgressStep
            label='Location'
            nextBtnTextStyle={{ color: theme.colors.text }}
            nextBtnDisabled={locationNextDisabled}
            previousBtnText='Back'
            previousBtnTextStyle={{ color: theme.colors.text }}
            nextBtnText='Confirm'
            onNext={handleLocationNext}
          >
            {
              (eventObj.organiser === null && eventObj.location === null)
              ?
               <ScrollView automaticallyAdjustKeyboardInsets={true}> 
                <View style={{ alignItems: 'center' }}>
                  {/** User is organiser and location has not been picked */}
                  <View
                    style={[flowStyles.outerSpeech, {
                      marginRight: '25%',
                      marginTop: '4%',
                    }]}
                  >
                    <View
                      style={[flowStyles.speechContainer, {
                        width: 200,
                      }]}
                    >
                      <Text
                        variant='bodyLarge'
                        style={{
                          color: theme.colors.text,
                        }}
                      >
                        Let's pick a location for {eventObj.name}!
                      </Text>
                    </View>
                  </View>
                  <View
                    style={[flowStyles.imageContainer, {
                      marginLeft: '25%',
                      marginBottom: '2%',
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
                      marginTop: '4%',
                    }}
                  >
                    <ScrollView
                      horizontal={true}
                    >
                      {
                        locationOptions.map((item, id) => (
                          <LocationCard 
                            key={id}
                            name={item.name}
                            rating={item.rating}
                            numReviews={item.numReviews}
                            suburb={item.suburb}
                            image={item.image}
                            other={item.other}
                            onChange={(newState) => handleLocationChange(id, newState)}
                            navigation={navigation}
                            isDisplay={false}
                          />
                        ))
                      }
                      <Card
                        mode='outlined'
                        style={{
                          marginRight: 20,
                          height: 320,
                          borderWidth: customSelect ? 1.25 : 0.1,
                          borderColor: customSelect ? theme.colors.success : theme.colors.text,
                          width: 320,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                        theme={theme}
                      >
                        <Card.Content>
                          <Text
                            variant='titleLarge'
                            style={{
                              color: theme.colors.success,
                              fontWeight: '500',
                              marginBottom: 18,
                              textAlign: 'center',
                            }}
                          >
                            Add Your Own Location
                          </Text>
                          <TextInput 
                            label='Location'
                            value={customLocation}
                            onChangeText={handleCustomLocation}
                            style={{
                              backgroundColor: theme.colors.background,
                              width: 250,
                            }}
                            textColor={theme.colors.text}
                          />
                        </Card.Content>
                        <Card.Actions>
                          <Button
                            mode='contained'
                            onPress={handleCustomSelect}
                            buttonColor={customSelect ? theme.colors.success : theme.colors.primary}
                          >
                            {customSelect ? 'Selected' : 'Select'}
                          </Button>
                        </Card.Actions>
                      </Card>
                    </ScrollView>
                  </View>
                </View>
              </ScrollView>
              :
              <View style={{ alignItems: 'center' }}>
                {/** Location for Event has been locked in */}
                <View style={[flowStyles.outerSpeech, {
                  marginTop: '3%'
                }]}>
                  <View style={[flowStyles.speechContainer, {
                    marginRight: '15%',
                    width: 220,
                  }]}>
                    <Text
                      variant='bodyLarge'
                      style={{
                        color: theme.colors.text,
                      }}
                    >
                      {eventObj.name}'s location has been locked in by the organiser!
                    </Text>
                  </View>
                </View>
                <View style={[flowStyles.imageContainer, {
                  marginLeft: '28%',
                  marginBottom: '4%',
                }]}>
                  <Image 
                    source={require('../../assets/wave.png')}
                    style={flowStyles.imageStyle}
                  />
                </View>
                <View
                  style={{
                    marginLeft: 21,
                  }}
                >
                  <LocationCard 
                    name={locationOptions[0].name}
                    rating={locationOptions[0].rating}
                    numReviews={locationOptions[0].numReviews}
                    suburb={locationOptions[0].suburb}
                    image={locationOptions[0].image}
                    other={locationOptions[0].other}
                    navigation={navigation}
                    isDisplay={true}
                  />
                </View>
              </View>
            }
          </ProgressStep>
          <ProgressStep
            label='Travel Time'
            nextBtnTextStyle={{ color: theme.colors.text }}
            finishBtnText=''
            previousBtnText='Back'
            previousBtnTextStyle={{ color: theme.colors.text }}
          >
            <View 
              style={{ 
                margin: '5%',
              }}
            >
              <Text
                variant='titleLarge'
                style={{
                  color: theme.colors.text,
                  marginBottom: '5%',
                }}
              >
                You're off to {locationOptions[0].name} with {groupName}!
              </Text>
              <Image 
                source={{ uri: locationOptions[0].image }}
                style={{
                  borderRadius: 12,
                  width: '95%',
                  height: 200,
                }}
              />
              {/** Replace with selected details if organiser */}
              <View 
                style={[textContainer, {
                  marginTop: '5%',
                }]}
              >
                <Text 
                  variant='bodyLarge'
                  style={headingStyle}
                >
                  Address:
                </Text>
                <Text
                  variant='bodyLarge'
                  style={{
                    color: theme.colors.text,
                  }}
                >
                  {locationOptions[0].other.address}
                </Text>
              </View>
              <View style={textContainer}>
                <Text 
                  variant='bodyLarge'
                  style={headingStyle}
                >
                  Hours:
                </Text>
                <Text
                  variant='bodyLarge'
                  style={{
                    color: theme.colors.text,
                  }}
                >
                  {locationOptions[0].other.hours}
                </Text>
              </View>
              <View style={textContainer}>
                <Text
                  variant='bodyLarge'
                  style={headingStyle}
                >
                  Phone:
                </Text>
                <Text
                  variant='bodyLarge'
                  style={{
                    color: theme.colors.text,
                  }}
                >
                  {locationOptions[0].other.phone}
                </Text>
              </View>
              <Button
                mode='contained'
                style={{
                  marginTop: '2%',
                  borderRadius: 12,
                }}
                onPress={openWebsite}
              >
                See Website
              </Button>
              <View
                style={{
                  marginTop: '8%',
                }}
              >
                <Text
                  variant='titleLarge'
                  style={{
                    color: theme.colors.text,
                    fontWeight: '500',
                    marginBottom: '3%',
                  }}
                >
                  Transport Methods
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'flex-end',
                      justifyContent: 'space-between',
                      width: '58%'
                    }}
                  >
                    <View
                      style={{ 
                        alignItems: 'center',
                      }}
                    >
                      <Icon 
                        source='bus'
                        color={theme.colors.text}
                        size={58}
                      />
                      <Text
                        variant='bodyMedium'
                        style={{
                          color: theme.colors.text,
                        }}
                      >
                        16 min
                      </Text>
                    </View>
                    <View
                      style={{ 
                        alignItems: 'center',
                      }}
                    >
                      <Icon 
                        source='car'
                        color={theme.colors.text}
                        size={60}
                      />
                      <Text
                        variant='bodyMedium'
                        style={{
                          color: theme.colors.text,
                        }}
                      >
                        9 min
                      </Text>
                    </View>
                    <View
                      style={{ 
                        alignItems: 'center',
                      }}
                    >
                      <Icon 
                        source='walk'
                        color={theme.colors.text}
                        size={52}
                      />
                      <Text
                        variant='bodyMedium'
                        style={{
                          color: theme.colors.text,
                        }}
                      >
                        47 min
                      </Text>
                    </View>
                  </View>
                  <Button
                    mode='outlined'
                    textColor={theme.colors.text}
                    style={{
                      borderColor: theme.colors.text,
                      borderRadius: 12,
                    }}
                    onPress={() => navigation.navigate('EventRoutes', { screen: 'Transport Options', params: { eventId: eventId, groupName: groupName } })}
                  >
                    See More
                  </Button>
                </View>
              </View>
            </View>
          </ProgressStep>
        </ProgressSteps>
      </View>
    </PaperProvider>
  );
}

export default EventFinalisation;
