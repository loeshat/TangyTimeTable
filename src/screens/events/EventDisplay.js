import React, { useState, useEffect } from 'react';
import { theme } from '../../styles/Theme';
import { flowStyles } from '../../styles/FlowStyles';
import { Button, Divider, PaperProvider, Text } from 'react-native-paper';
import { Image, View } from 'react-native';
import TitleTopBar from '../../components/TitleTopBar';
import { getEvent } from '../../services/StoreService';

const buttonContentStyle = {
  height: 60,
};

const buttonLabelStyle = {
  fontSize: 18,
};

const buttonStyle = {
  width: '80%',
  borderRadius: 12,
};

const EventDisplay = ({ route, navigation }) => {
  const { eventId, groupName } = route.params ?? {};

  // Load event object for appropriate routing
  const [eventObj, setEventObj] = useState({});
  const [status, setStatus] = useState('');
  const [speech, setSpeech] = useState('');
  const [buttonVisible, setButtonVisible] = useState(true);
  const [buttonText, setButtonText] = useState('');
  useEffect(() => {
    getEvent(eventId).then((res) => {
      setEventObj(res);
      const statusDisplay = res.status.includes('in progress') 
                            ? 'Planning In Progress' 
                            : 'No Action Required';
      setStatus(statusDisplay);
      if (res.status === 'in progress for availabilities input') {
        setSpeech(`Let's add your availabilities for this event!`);
        setButtonText('Add My Availabilities');
      } else if (res.status === 'in progress for members time input') {
        setSpeech(`I'm still waiting for other members to submit their availabilities. You don't need to do anything yet!`);
        setButtonText('Change My Availabilities');
      } else if (res.status === 'in progress for finalisation') {
        setSpeech(`Let's plan the final details for your event!`);
        setButtonText('Continue Planning');
      } else {
        setSpeech(`No action required for this event!`);
        setButtonVisible(false);
      }
    });
  }, []);

  const navigateAction = () => {
    if (status === 'in progress for availabilities input'
        || status === 'in progress for members time input') 
    {
      const inputDates = eventObj.inputDates;
      const inputTimes = {
        start: eventObj.inputStartTime,
        end: eventObj.inputEndTime,
      };
      navigation.navigate('EventRoutes', { screen: 'Event Time Input', params: { eventId: eventId, dates: inputDates, times: inputTimes }});
    } else if (status === 'in progress for finalisation') {
      
    }
  }

  return (
    <PaperProvider theme={theme}>
      <TitleTopBar backAction={() => navigation.navigate('Events')} title={'Return Home'} />
      <View style={flowStyles.screen}>
        <Text
          variant='headlineMedium'
          style={{
            color: theme.colors.success,
            fontWeight: '500',
            marginLeft: '5%',
            marginTop: 20,
          }}
        >
          {eventObj.name}
        </Text>
        <View
          style={{
            alignItems: 'flex-start',
            marginLeft: '2%',
          }}
        >
          <Button
            icon='account-group'
            textColor={theme.colors.text}
            labelStyle={{
              fontSize: 18,
            }}
            style={{
              marginTop: '2%',
            }}
            onPress={() => {
              /** TODO: Take the user to group screen */
            }}
          >
            {groupName}
          </Button>
          <Button
            icon='list-status'
            textColor={theme.colors.text}
            labelStyle={{
              fontSize: 18,
            }}
          >
            {status}
          </Button>
        </View>
        <Divider 
          horizontalInset
          style={{
            marginTop: '5%',
            marginBottom: '3%',
          }}
          theme={theme}
        />
        <View>
          <View
            style={{
              marginLeft: '30%',
              marginTop: '8%',
            }}
          >
            <View
              style={[flowStyles.speechContainer, {
                width: 210,
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
            style={{
              marginLeft: '3%',
            }}
          >
            <Image 
              source={require('../../assets/wave.png')}
              style={flowStyles.imageStyle}
            />
          </View>
        </View>
        <View
          style={{
            alignItems: 'center',
            marginTop: '8%',
          }}
        >
          {
            buttonVisible
            &&
            <Button
              mode='contained'
              buttonColor={theme.colors.success}
              contentStyle={buttonContentStyle}
              labelStyle={buttonLabelStyle}
              style={buttonStyle}
              onPress={navigateAction}
            >
              {buttonText}
            </Button>
          }
        </View>
      </View>
    </PaperProvider>
  );
}

export default EventDisplay;
