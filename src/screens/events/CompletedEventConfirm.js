import React from 'react';
import { theme } from '../../styles/Theme';
import { flowStyles } from '../../styles/FlowStyles';
import { Button, PaperProvider, Text } from 'react-native-paper';
import { Image, View } from 'react-native';
import TitleTopBar from '../../components/TitleTopBar';

const CompletedEventConfirmScreen = ({ navigation }) => {
  // TODO: Change route to group page
  const returnToGroup = () => navigation.navigate('Events');

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
              You're all set! Remember to make any necessary bookings before the event!
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
            mode='outlined'
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
