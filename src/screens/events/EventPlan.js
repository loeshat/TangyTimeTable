import React, { useState } from 'react';
import moment from 'moment';
import { theme, progressStyles } from '../../styles/Theme';
import { flowStyles } from '../../styles/FlowStyles';
import { PaperProvider, Text, TextInput, HelperText } from 'react-native-paper';
import { Image, View } from 'react-native';
import TitleTopBar from '../../components/TitleTopBar';
import WarningAlert from '../../components/Alert';
import { ProgressStep, ProgressSteps } from 'react-native-progress-steps';
import { CalendarList } from 'react-native-calendars';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Dropdown } from 'react-native-element-dropdown';
import { ActivityCategories } from '../../services/Data';
import { formatTime } from '../../services/helpers';
import { updateEventDetails } from '../../services/StoreService';

// All screens related to finer event details planning such as
// date, time and optional activity and location selection

const calendarTheme = {
  textSectionTitleColor: theme.colors.text,
  dayTextColor: theme.colors.text,
  todayTextColor: theme.colors.success,
  monthTextColor: theme.colors.text,
  textMonthFontWeight: '500',
};

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

  // Dates selection
  const [markedDates, setMarkedDates] = useState({});
  const onDayPress = (day) => {
    const selectedDate = day.dateString;
    const updatedDates = { ...markedDates };
    updatedDates[selectedDate] = {
      ...markedDates[selectedDate],
      selected: !markedDates[selectedDate]?.selected,
      selectedColor: theme.colors.background,
      selectedTextColor: theme.colors.primary,
    };
    setMarkedDates(updatedDates);
  }

  // Time selection
  const [fromTime, setFromTime] = useState(new Date());
  const [toTime, setToTime] = useState(new Date());
  const fromTimeHandler = (e, selected) => setFromTime(selected);
  const toTimeHandler = (e, selected) => setToTime(selected);

  // Activity selection
  const [activity, setActivity] = useState(null);
  const [customActivity, setCustomActivity] = useState('');

  // Location selection
  const [location, setLocation] = useState('');

  // Add further event details to BE
  const updateEvent = async () => {
    const newEventDetails = {
      inputDates: Object.keys(markedDates),
      inputStartTime: formatTime(fromTime),
      inputEndTime: formatTime(toTime),
      activity: activity === 'Other' ? customActivity : activity,
      location: location,
    };
    await updateEventDetails(eventId, newEventDetails);
    navigation.navigate('EventRoutes', { screen: 'Event Time Input', params: { eventId: eventId } });
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
            nextBtnDisabled={Object.keys(markedDates).length === 0}
          >
            <View style={{ alignItems: 'center' }}>
              <View
                style={[flowStyles.outerSpeech, {
                  marginTop: '5%'
                }]}
              >
                <View
                  style={[flowStyles.speechContainer, {
                    width: 200,
                    marginRight: '15%',
                  }]}
                >
                  <Text
                    variant='bodyLarge'
                    style={{
                      color: theme.colors.text,
                    }}
                  >
                    What days would you like to meet on?
                  </Text>
                </View>
              </View>
              <View
                style={[flowStyles.imageContainer, {
                  marginLeft: '22%',
                  marginBottom: '2%'
                }]}
              >
                <Image 
                  source={require('../../assets/wave.png')}
                  style={flowStyles.imageStyle}
                />
              </View>
              <CalendarList 
                pastScrollRange={0}
                futureScrollRange={12}
                horizontal={true}
                pagingEnabled={true}
                minDate={moment().format('YYYY-MM-DD')}
                markedDates={markedDates}
                onDayPress={onDayPress}
                theme={calendarTheme}
              />
            </View>
          </ProgressStep>
          <ProgressStep
            label='Event Time'
            nextBtnTextStyle={{ color: theme.colors.text }}
            nextBtnDisabled={fromTime >= toTime}
            previousBtnText='Back'
            previousBtnTextStyle={{ color: theme.colors.text }}
          >
            <View style={{ alignItems: 'center' }}>
              <View
                style={[flowStyles.outerSpeech, {
                  marginTop: '25%'
                }]}
              >
                <View
                  style={[flowStyles.speechContainer, {
                    width: 200,
                    marginRight: '13%'
                  }]}
                >
                  <Text
                    variant='bodyLarge'
                    style={{
                      color: theme.colors.text,
                    }}
                  >
                    What times would you like to meet between?
                  </Text>
                </View>
              </View>
              <View
                style={[flowStyles.imageContainer, {
                  marginLeft: '13%'
                }]}
              >
                <Image 
                  source={require('../../assets/wave.png')}
                  style={flowStyles.imageStyle}
                />
              </View>
              <View
                style={{
                  width: 130,
                  marginTop: '5%',
                }}
              >
                <Text
                  variant='bodyLarge'
                  style={{
                    color: theme.colors.text,
                    marginBottom: '2%',
                  }}
                >
                  From:
                </Text>
                <DateTimePicker 
                  mode='time'
                  minuteInterval={30}
                  value={fromTime}
                  onChange={fromTimeHandler}
                />
              </View>
              <View
                style={{
                  width: 130,
                  marginTop: '2%',
                }}
              >
                <Text
                  variant='bodyLarge'
                  style={{
                    color: theme.colors.text,
                    marginBottom: '2%',
                    marginTop: '5%',
                  }}
                >
                  To:
                </Text>
                <DateTimePicker 
                  mode='time'
                  minuteInterval={30}
                  value={toTime}
                  onChange={toTimeHandler}
                />
              </View>
            </View>
          </ProgressStep>
          <ProgressStep
            label='Activity'
            nextBtnTextStyle={{ color: theme.colors.text }}
            nextBtnDisabled={!activity || (activity === 'Other' && !customActivity)}
            previousBtnText='Back'
            previousBtnTextStyle={{ color: theme.colors.text }}
          >
            <View style={{ alignItems: 'center' }}>
              <View
                style={[flowStyles.outerSpeech, {
                  marginTop: '15%'
                }]}
              >
                <View
                  style={[flowStyles.speechContainer, {
                    width: 200,
                    marginRight: '15%',
                  }]}
                >
                  <Text
                    variant='bodyLarge'
                    style={{
                      color: theme.colors.text,
                    }}
                  >
                    Any activity plans for the event?
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
                  marginTop: '5%'
                }}
              >
                <Text
                  variant='bodyLarge'
                  style={{
                    color: theme.colors.text,
                    fontWeight: '500',
                    marginBottom: '2%'
                  }}
                >
                  Select an Activity Category
                </Text>
                <Dropdown 
                  maxHeight={200}
                  data={ActivityCategories}
                  labelField='label'
                  valueField='value'
                  placeholder='Activity Category'
                  value={activity}
                  onChange={(e) => setActivity(e.value)}
                  style={{
                    padding: 12,
                    height: 50,
                    borderColor: theme.colors.text,
                    color: theme.colors.text,
                    backgroundColor: theme.colors.background,
                    borderWidth: 0.5,
                    borderRadius: 5,
                    width: 300,
                    elevation: 2,
                  }}
                />
                {
                  activity === 'Other'
                  &&
                  <View
                    style={{
                      marginTop: '10%'
                    }}
                  >
                    <Text
                      variant='bodyLarge'
                      style={{
                        color: theme.colors.text,
                        fontWeight: '500',
                      }}
                    >
                      Add your Own Activity
                    </Text>
                    <TextInput 
                      mode='outlined'
                      value={customActivity}
                      label='Custom Activity'
                      onChangeText={text => setCustomActivity(text)}
                      style={{
                        backgroundColor: theme.colors.surface,
                        marginTop: '1%',
                      }}
                    />
                    <HelperText
                      type='info'
                    >
                      If no preference, type "No Preference"
                    </HelperText>
                  </View>
                }
              </View>
            </View>
          </ProgressStep>
          <ProgressStep
            label='Location'
            nextBtnTextStyle={{ color: theme.colors.text }}
            nextBtnDisabled={!location}
            finishBtnText='Next'
            previousBtnText='Back'
            previousBtnTextStyle={{ color: theme.colors.text }}
            onSubmit={updateEvent}
          >
            <View style={{ alignItems: 'center' }}>
              <View
                style={[flowStyles.outerSpeech, {
                  marginTop: '22%'
                }]}
              >
                <View
                  style={[flowStyles.speechContainer, {
                    width: 225,
                    marginRight: '10%'
                  }]}
                >
                  <Text
                    variant='bodyLarge'
                    style={{
                      color: theme.colors.text,
                    }}
                  >
                    Any location preferences for the event?
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
              <View
                style={{
                  marginTop: '10%'
                }}
              >
                <Text
                  variant='bodyLarge'
                  style={{
                    color: theme.colors.text,
                    fontWeight: '500',
                  }}
                >
                  Add your Location Preference
                </Text>
                <TextInput 
                  mode='outlined'
                  style={{
                    backgroundColor: theme.colors.surface,
                    marginTop: '1%',
                  }}
                  value={location}
                  label='Location'
                  onChangeText={text => setLocation(text)}
                />
                <HelperText
                  type='info'
                >
                  If no preference, type "No Preference"
                </HelperText>
              </View>
            </View>
          </ProgressStep>
        </ProgressSteps>
      </View>
    </PaperProvider>
  );
}

export default NewEventPlan;
