import React, { useState, useCallback } from 'react';
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

  // TODO: Manually specify activeStep on load based on event status
  // This can be done by setting activeStep in ProgressSteps component

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
  // TODO: If logged in user is NOT organiser, only display info about what the selected date is
  
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
  // If group vote -> store group vote data
  // If single decider -> directly store selected event in event object

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

  const onSubmit = () => {
    // Update event details with selected location if applicable (ie. if logged in user is organiser)
    // Custom render based on deciderType + logged in user's permissions
    navigation.navigate('EventRoutes', { screen: 'Completed Event Confirmation' });
  }

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
                  borderRadius: 10,
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
                  borderRadius: 10,
                  width: 80,
                }}
                onPress={handleCloseAlert}
              >
                Update
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        <ProgressSteps {...progressStyles}>
          <ProgressStep
            label='Time'
            nextBtnTextStyle={{ color: theme.colors.text }}
            nextBtnDisabled={timeNextDisabled}
            nextBtnText='Confirm'
            onNext={() => handleOpenAlert('Do you want to add the event to your group calendar?')}
          >
            <View style={{ alignItems: 'center' }}>
              <View
                style={[flowStyles.outerSpeech, {
                  marginRight: '25%',
                  marginTop: '10%'
                }]}
              >
                {/**
                 * Depending on event status, load info display OR actual selection
                 */}
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
            nextBtnText='Confirm'
            nextBtnTextStyle={{ color: theme.colors.text }}
            previousBtnText='Back'
            previousBtnTextStyle={{ color: theme.colors.text }}
            nextBtnDisabled={activityNextDisabled}
            onNext={() => handleOpenAlert('Do you want to update the calendar event with your chosen activity?')}
          >
            <View style={{ alignItems: 'center' }}>
              {/**
               * Depending on event status, load info display OR actual selection
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
            nextBtnDisabled={locationNextDisabled}
            previousBtnText='Back'
            previousBtnTextStyle={{ color: theme.colors.text }}
            nextBtnText='Confirm'
            onNext={() => handleOpenAlert('Do you want to update the calendar event with your chosen location?')}
          >
            <View style={{ alignItems: 'center' }}>
              {/** Conditional rendering depending on if user is organiser */}
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
                    {/** Replace event name with actual data */}
                    Let's pick a location for event name!
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
                {/** Replace with actual group name */}
                You're off to {locationOptions[0].name} with group name!
              </Text>
              <Image 
                source={{ uri: locationOptions[0].image }}
                style={{
                  borderRadius: 12,
                  width: '95%',
                  height: 200,
                }}
              />
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
                      alignItems: 'center',
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
                        size={60}
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
                        6 min
                      </Text>
                    </View>
                    <View
                      style={{ 
                        alignItems: 'center',
                      }}
                    >
                      <Icon 
                        source='train'
                        color={theme.colors.text}
                        size={60}
                      />
                      <Text
                        variant='bodyMedium'
                        style={{
                          color: theme.colors.text,
                        }}
                      >
                        15 min
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
                    onPress={() => navigation.navigate('EventRoutes', { screen: 'Transport Options' })}
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
