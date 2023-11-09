import React, { useState } from 'react';
import { theme } from '../../styles/Theme';
import { flowStyles } from '../../styles/FlowStyles';
import { Button, PaperProvider, Text } from 'react-native-paper';
import { Image, View } from 'react-native';
import TitleTopBar from '../../components/TitleTopBar';
import WarningAlert from '../../components/Alert';

// For the user to add their own availabilities during event
// planning process

const EventTimeInput = ({ route, navigation }) => {
  const { eventId } = route.params ?? {};

  const [alertOpen, setAlertOpen] = useState(false);
  const openAlert = () => setAlertOpen(true);
  const closeAlert = () => setAlertOpen(false);
  const returnHome = () => {
    closeAlert();
    navigation.navigate('Events');
  }

  return (
    <PaperProvider theme={theme}>
      <TitleTopBar backAction={openAlert} title={'Return Home'} />
      <View
        style={flowStyles.screen}
      >
        <WarningAlert 
          description={'You will lose all your event planning progress! Are you sure?'}
          affirmText={'Return Home'}
          affirmAction={returnHome}
          affirmContentStyle={{ width: 125 }}
          cancelAction={closeAlert}
          closeAction={closeAlert}
          visible={alertOpen}
        />
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
            contentStyle={{
              height: 60
            }}
            labelStyle={{
              fontSize: 18
            }}
            style={{
              marginBottom: '5%',
              width: 200
            }}
          >
            Sync My Calendar
          </Button>
          <Button
            mode='contained'
            buttonColor={theme.colors.success}
            contentStyle={{
              height: 60
            }}
            labelStyle={{
              fontSize: 18
            }}
            style={{
              width: 200
            }}
          >
            Enter Manually
          </Button>
        </View>
      </View>
    </PaperProvider>
  );
}

export default EventTimeInput;
