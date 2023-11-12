import React, { useState } from 'react';
import { theme } from '../../styles/Theme';
import { flowStyles } from '../../styles/FlowStyles';
import { calendarTheme } from './EventPlan';
import { Button, PaperProvider, Text } from 'react-native-paper';
import { Image, View, ScrollView } from 'react-native';
import { CalendarProvider, ExpandableCalendar } from 'react-native-calendars';
import TitleTopBar from '../../components/TitleTopBar';
import WarningAlert from '../../components/Alert';
import TimeInput from '../../components/TimeInput';
import { timeRange } from '../../services/helpers';

const ManualTimeInput = ({ route, navigation }) => {
  const { eventId, dates, times } = route.params ?? {};

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
                marginRight: '18%'
              }]}
            >
              <Text
                variant='bodyLarge'
                style={{
                  color: theme.colors.text,
                }}
              >
                When are you free?
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
              marginTop: '8%',
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
                scrollEnabled={true}
                minDate={dates[0]}
                maxDate={dates[dates.length - 1]}
              />
              <View style={{ alignItems: 'center', marginTop: '2%', height: 220 }}>
                <ScrollView>
                  {
                    timeArray.map((time, id) => (
                      <TimeInput key={id} time={time} />
                    ))
                  }
                </ScrollView>
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
            >
              Confirm
            </Button>
          </View>
        </View>
      </View>
    </PaperProvider>
  );
}

export default ManualTimeInput;
