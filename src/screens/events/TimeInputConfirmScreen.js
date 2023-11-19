import React from 'react';
import { theme } from '../../styles/Theme';
import { flowStyles } from '../../styles/FlowStyles';
import { Button, PaperProvider, Text } from 'react-native-paper';
import { Image, View } from 'react-native';

const TimeInputConfirmScreen = ({ navigation }) => {
  return (
    <PaperProvider theme={theme}>
      <View style={{ alignItems: 'center', marginTop: '65%' }}>
        <View
          style={[flowStyles.outerSpeech, {
            marginRight: '22%'
          }]}
        >
          <View
            style={[flowStyles.speechContainer, {
              width: 210
            }]}
          >
            <Text
              variant='bodyLarge'
              style={{
                color: theme.colors.text,
              }}
            >
              Thanks for providing your availabilities!
              Sit tight while your friends input theirs!
            </Text>
          </View>
        </View>
        <View
          style={[flowStyles.imageContainer, {
            marginLeft: '22%'
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
            height: 60,
          }}
          labelStyle={{
            fontSize: 18
          }}
          style={{
            marginTop: '10%',
            borderRadius: 12,
            width: '65%',
          }}
          onPress={() => alert('This functionality is currently not available!')}
        >
          Change My Availabilities
        </Button>
        <Button
          mode='contained'
          buttonColor={theme.colors.success}
          contentStyle={{
            height: 60,
          }}
          labelStyle={{
            fontSize: 18
          }}
          style={{
            marginTop: '8%',
            borderRadius: 12,
            width: '65%',
          }}
          onPress={() => navigation.navigate('Events')}
        >
          Return Home
        </Button>
      </View>
    </PaperProvider>
  );
}

export default TimeInputConfirmScreen;
