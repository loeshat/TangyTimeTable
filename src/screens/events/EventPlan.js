import React, { useState } from 'react';
import moment from 'moment';
import { theme, progressStyles } from '../../styles/Theme';
import { flowStyles } from '../../styles/FlowStyles';
import { PaperProvider, Text } from 'react-native-paper';
import { Image, View } from 'react-native';
import TitleTopBar from '../../components/TitleTopBar';
import WarningAlert from '../../components/Alert';
import { ProgressStep, ProgressSteps } from 'react-native-progress-steps';
import { CalendarList } from 'react-native-calendars';
import DateTimePicker from '@react-native-community/datetimepicker';

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
  // Object.keys(markedDates) -> to extract selected dates
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
                  value={toTime}
                  onChange={toTimeHandler}
                />
              </View>
            </View>
          </ProgressStep>
          <ProgressStep
            label='Activity'
            nextBtnTextStyle={{ color: theme.colors.text }}
            previousBtnText='Back'
            previousBtnTextStyle={{ color: theme.colors.text }}
          >

          </ProgressStep>
          <ProgressStep
            label='Location'
            nextBtnTextStyle={{ color: theme.colors.text }}
            finishBtnText='Next'
            previousBtnText='Back'
            previousBtnTextStyle={{ color: theme.colors.text }}
            onSubmit={() => navigation.navigate('EventRoutes', { screen: 'Event Time Input', params: { eventId: eventId } })}
          >

          </ProgressStep>
        </ProgressSteps>
      </View>
    </PaperProvider>
  );
}

export default NewEventPlan;
