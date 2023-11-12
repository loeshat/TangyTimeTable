import React, { useState } from 'react';
import { theme } from '../../styles/Theme';
import { flowStyles } from '../../styles/FlowStyles';
import { PaperProvider, Text } from 'react-native-paper';
import { Image, View, TouchableOpacity } from 'react-native';
import TitleTopBar from '../../components/TitleTopBar';
import WarningAlert from '../../components/Alert';

const ManualTimeInput = ({ route, navigation }) => {
  const { eventId } = route.params ?? {};

  // Warning alert handling
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
        <View style={{ alignItems: 'center' }}>
          <View
            style={[flowStyles.outerSpeech, {
              marginTop: '15%'
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
              marginLeft: '25%'
            }]}
          >
            <Image 
              source={require('../../assets/wave.png')}
              style={flowStyles.imageStyle}
            />
          </View>
          
        </View>
      </View>
    </PaperProvider>
  );
}

export default ManualTimeInput;
