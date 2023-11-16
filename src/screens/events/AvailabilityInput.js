import React, { useState } from 'react';
import { calendarTheme, theme } from '../../styles/Theme';
import { flowStyles } from '../../styles/FlowStyles';
import { Button, PaperProvider, Text } from 'react-native-paper';
import { Image, View, ScrollView } from 'react-native';
import { CalendarProvider, ExpandableCalendar } from 'react-native-calendars';
import TitleTopBar from '../../components/TitleTopBar';
import WarningAlert from '../../components/Alert';
import TimeInput from '../../components/TimeInput';
import { timeRange } from '../../services/helpers';
import { updateEventDetails } from '../../services/StoreService';

const AvailabilityInput = ({ route, navigation }) => {
  const { type, eventId, dates, times } = route.params ?? {};
  const speech = type === 'manual' 
                ? 'Let me know when you are busy!' 
                : 'I found the following availabilities...';

  // Warning alert handling
  const [alertOpen, setAlertOpen] = useState(false);
  const openAlert = () => setAlertOpen(true);
  const closeAlert = () => setAlertOpen(false);
  const returnHome = () => {
    closeAlert();
    navigation.navigate('Events');
  }

  // Availabilities input handling
  const timeArray = timeRange(times.start, times.end);
  const [selectedDate, setSelectedDate] = useState(dates[0]);
  const handleDayPress = (day) => setSelectedDate(day.dateString);

  const updateEvent = () => {
    updateEventDetails(eventId, { status: 'in progress for members time input' });
    navigation.navigate('EventRoutes', { screen: 'Time Confirmation Screen' });
  }

  return (
    <PaperProvider theme={theme}>
      <TitleTopBar backAction={openAlert} title={'Return Home'} />
      <View
        style={flowStyles.screen}
      >
        <WarningAlert 
          description={'You will lose all your availabilities input progress! Are you sure?'}
          affirmText={'Return Home'}
          affirmAction={returnHome}
          affirmContentStyle={{ width: 125 }}
          cancelAction={closeAlert}
          closeAction={closeAlert}
          visible={alertOpen}
        />
        <View style={{ alignItems: 'center' }}>
          <View
            style={[flowStyles.outerSpeech, {
              marginTop: '12%'
            }]}
          >
            <View
              style={[flowStyles.speechContainer, {
                marginRight: '18%',
                width: 200,
              }]}
            >
              <Text
                variant='bodyLarge'
                style={{
                  color: theme.colors.text,
                }}
              >
                {speech}
              </Text>
            </View>
          </View>
          <View
            style={[flowStyles.imageContainer, {
              marginLeft: '30%'
            }]}
          >
            <Image 
              source={require('../../assets/wave.png')}
              style={flowStyles.imageStyle}
            />
          </View>
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              marginLeft: '70%',
              marginTop: '5%',
            }}
          >
            <View
              style={{
                borderColor: theme.colors.text,
                borderWidth: 1,
                backgroundColor: theme.colors.primary,
                width: 20,
                height: 20,
                marginRight: 4,
              }}
            ></View>
            <Text
              style={{
                color: theme.colors.text,
              }}
            >
              Busy
            </Text>
          </View>
          <View
            style={{
              height: 400,
              alignItems: 'center',
            }}
          >
            <CalendarProvider
              date={dates[0]}
            >
              <ExpandableCalendar 
                theme={calendarTheme}
                allowShadow={false}
                pastScrollRange={0}
                onDayPress={handleDayPress}
                minDate={dates[0]}
                maxDate={dates[dates.length - 1]}
              />
              <View style={{ alignItems: 'center', marginTop: '2%', height: 220 }}>
                {
                  !dates.includes(selectedDate)
                  &&
                  <View
                    style={{
                      width: 300,
                    }}
                  >
                    <Text
                      variant='bodyLarge'
                      style={{
                        color: theme.colors.text,
                        textAlign: 'center',
                      }}
                    >
                      Availability Input Not Required for Selected Date
                    </Text>
                  </View>
                }
                {
                  dates.includes(selectedDate)
                  &&
                  <ScrollView>
                    {
                      timeArray.map((time, id) => (
                        <TimeInput key={id} time={time} />
                      ))
                    }
                  </ScrollView>
                }
              </View>
            </CalendarProvider>
          </View>
          <View style={{ alignItems: 'flex-end', width: '90%' }}>
            <Button
              mode='contained'
              icon='arrow-right'
              contentStyle={{
                flexDirection: 'row-reverse'
              }}
              onPress={updateEvent}
            >
              Confirm
            </Button>
          </View>
        </View>
      </View>
    </PaperProvider>
  );
}

export default AvailabilityInput;
