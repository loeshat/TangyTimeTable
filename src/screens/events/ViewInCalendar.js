import React from 'react';
import { calendarTheme, theme } from '../../styles/Theme';
import { IconButton, Text, PaperProvider } from 'react-native-paper';
import { View } from 'react-native';
import { CalendarProvider, ExpandableCalendar, TimelineList } from 'react-native-calendars';
import { calendarDisplay } from '../../services/Data';

const ViewInCalendar = ({ navigation }) => {
  const marked = Object.keys(calendarDisplay).map(
    date => ({ [date]: 
      { 
        marked: true,
        selected: true,
        dotColor: 'orange', 
      } 
    })
  );
  return (
    <PaperProvider theme={theme}>
      <View
        style={{
          marginTop: '4%',
        }}
      >
        <View
          style={{
            alignItems: 'flex-end',
            marginRight: '2%'
          }}
        >
          <IconButton 
            accessibilityLabel='close-modal-button'
            icon='close'
            iconColor={theme.colors.text}
            onPress={() => navigation.navigate('EventRoutes', { screen: 'Event Finalisation' })}
          />
        </View>
        <Text
          variant='headlineMedium'
          style={{
            color: theme.colors.text,
            textAlign: 'center',
            marginBottom: '3%',
            fontWeight: '500',
          }}
        >
          Your Calendar View
        </Text>
        <View
          style={{
            marginLeft: '2%',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: '1.5%',
            }}
          >
            <View
              style={{
                borderWidth: 1,
                borderColor: theme.colors.text,
                width: 20,
                height: 20,
                marginRight: 5,
                backgroundColor: theme.colors.success,
              }}
            >
            </View>
            <Text
              variant='bodyMedium'
              style={{
                color: theme.colors.text,
              }}
            >
              Event from your Calendar
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: '4%',
            }}
          >
            <View
              style={{
                borderWidth: 1,
                borderColor: theme.colors.text,
                width: 20,
                height: 20,
                marginRight: 5,
                backgroundColor: theme.colors.primary,
              }}
            >
            </View>
            <Text
              variant='bodyMedium'
              style={{
                color: theme.colors.text,
              }}
            >
              {/** Replace with actual event name */}
              Your Potential Hangout
            </Text>
          </View>
        </View>
        <View
          style={{
            height: '82%',
          }}
        >
          <CalendarProvider
            date={Object.keys(calendarDisplay)[0]}
          >
            <ExpandableCalendar 
              theme={calendarTheme}
              pastScrollRange={0}
              markedDates={marked}
              minDate={Object.keys(calendarDisplay)[0]}
              maxDate={Object.keys(calendarDisplay)[calendarDisplay.length - 1]}
              hideExtraDays
              hideArrows
            />
            <TimelineList 
              events={calendarDisplay}
              scrollToFirst
              initialTime={{ hour: 9, minutes: 0 }}
            />
          </CalendarProvider>
        </View>
      </View>
    </PaperProvider>
  );
}

export default ViewInCalendar;
