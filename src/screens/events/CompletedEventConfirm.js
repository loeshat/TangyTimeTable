import React from 'react';
import { theme } from '../../styles/Theme';
import { flowStyles } from '../../styles/FlowStyles';
import { Button, PaperProvider, Text } from 'react-native-paper';
import { Image, View } from 'react-native';
import TitleTopBar from '../../components/TitleTopBar';

const CompletedEventConfirmScreen = ({ route, navigation }) => {
  const { speech, eventId, groupName } = route.params ?? {};

  const returnToGroup = () => navigation.navigate('Event Display', { eventId: eventId, groupName: groupName });

  return (
    <PaperProvider theme={theme}>
      <TitleTopBar backAction={returnToGroup} title={'Back to Group'} />
      <View style={[flowStyles.screen, {
        alignItems: 'center',
      }]}>
        <View
          style={[flowStyles.outerSpeech, {
            marginRight: '20%',
            marginTop: '30%',
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
              {speech}
            </Text>
          </View>
        </View>
        <View
          style={[flowStyles.imageContainer, {
            marginLeft: '25%',
          }]}
        >
          <Image 
            source={require('../../assets/wave.png')}
            style={flowStyles.imageStyle}
          />
        </View>
        <View
          style={{
            marginTop: '10%',
          }}
        >
          <Button
            mode='contained'
            contentStyle={{
              height: 60,
            }}
            labelStyle={{
              fontSize: 18,
            }}
            style={{
              borderRadius: 12,
            }}
            onPress={() => alert('This functionality is not available yet!')}
          >
            See My Calendar
          </Button>
          <Button
            mode='outlined'
            buttonColor='#F5F5F5'
            contentStyle={{
              height: 60,
            }}
            labelStyle={{
              fontSize: 18,
              color: theme.colors.text,
            }}
            style={{
              borderRadius: 12,
              marginTop: '5%',
              borderColor: theme.colors.text,
            }}
            onPress={() => navigation.navigate('Events')}
          >
            Return Home
          </Button>
        </View>
      </View>
    </PaperProvider>
  );
}

export default CompletedEventConfirmScreen;
