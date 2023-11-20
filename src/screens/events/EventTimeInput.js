import React from 'react';
import { theme } from '../../styles/Theme';
import { flowStyles } from '../../styles/FlowStyles';
import { Button, PaperProvider, Text } from 'react-native-paper';
import { Image, View } from 'react-native';
import TitleTopBar from '../../components/TitleTopBar';

// For the user to add their own availabilities during event
// planning process

const EventTimeInput = ({ route, navigation }) => {
  const { eventId, dates, times } = route.params ?? {};

  const inputNav = (inputType) => {
    navigation.navigate(
      'EventRoutes', 
      { 
        screen: 'Availabilities', 
        params: { 
          type: inputType,
          eventId: eventId, 
          dates: dates, 
          times: times, 
        } 
      }
    );
  }

  return (
    <PaperProvider theme={theme}>
      <TitleTopBar backAction={() => navigation.navigate('Events')} title={'Return Home'} />
      <View
        style={flowStyles.screen}
      >
        <View
          style={{ alignItems: 'center' }}
        >
          <View
            style={[flowStyles.outerSpeech, {
              marginTop: '40%',
              marginRight: '30%'
            }]}
          >
            <View
              style={[flowStyles.speechContainer]}
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
              marginLeft: '28%',
              marginBottom: '8%'
            }]}
          >
            <Image 
              source={require('../../assets/wave.png')}
              style={flowStyles.imageStyle}
            />
          </View>
          <Button
            mode='contained'
            accessibilityLabel='sync-calendar-navigation-button'
            contentStyle={{
              height: 60
            }}
            labelStyle={{
              fontSize: 18
            }}
            style={{
              marginBottom: '5%',
              width: 200,
              borderRadius: 12,
            }}
            onPress={() => inputNav('auto')}
          >
            Sync My Calendar
          </Button>
          <Button
            mode='contained'
            accessibilityLabel='manual-availability-input-navigation-button'
            buttonColor={theme.colors.success}
            contentStyle={{
              height: 60
            }}
            labelStyle={{
              fontSize: 18
            }}
            style={{
              width: 200,
              borderRadius: 12,
            }}
            onPress={() => inputNav('manual')}
          >
            Enter Manually
          </Button>
        </View>
      </View>
    </PaperProvider>
  );
}

export default EventTimeInput;
