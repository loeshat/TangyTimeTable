import React from 'react';
import { theme } from '../../styles/Theme';
import { flowStyles } from '../../styles/FlowStyles';
import { Button, PaperProvider, Text } from 'react-native-paper';
import { Image, View } from 'react-native';

const TimeInputConfirmScreen = ({ navigation }) => {
  return (
    <PaperProvider theme={theme}>
      <View style={{ alignItems: 'center', marginTop: '70%' }}>
        <View
          style={[flowStyles.outerSpeech, {
            marginRight: '18%'
          }]}
        >
          <View
            style={[flowStyles.speechContainer, {
              width: 225
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
          buttonColor={theme.colors.success}
          contentStyle={{
            height: 60,
          }}
          labelStyle={{
            fontSize: 18
          }}
          style={{
            marginTop: '10%',
            borderRadius: 10,
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
