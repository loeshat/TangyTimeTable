import React from 'react';
import { theme } from '../../styles/Theme';
import { groupStyles } from '../../styles/FlowStyles';
import { Button, Text, PaperProvider } from 'react-native-paper';
import { Image, View } from 'react-native';
import TitleTopBar from '../../components/TitleTopBar';

const ConfirmGroup = ({ route, navigation }) => {
  const { name } = route.params ?? {};
  const returnHome = () => navigation.navigate('Events');
  return (
    <PaperProvider theme={theme}>
      <TitleTopBar backAction={returnHome} title={'Return Home'} />
      <View style={groupStyles.screen}>
        <View style={{ alignItems: 'center'}}>
          <View
            style={[groupStyles.outerSpeech, {
              marginTop: '25%'
            }]}
          >
            <View
              style={[groupStyles.speechContainer, {
                width: 200,
                marginRight: '12%'
              }]}
            >
              <Text
                variant='bodyLarge'
                style={{
                  color: theme.colors.text
                }}
              >
                Your group {name} has been successfully created!
                Do you want to
              </Text>
              <Text
                variant='bodyLarge'
                style={{
                  color: theme.colors.primary,
                  fontWeight: '700'
                }}
              >
                plan an event
              </Text>
              <Text
                variant='bodyLarge'
                style={{
                  color: theme.colors.text
                }}
              >
                for the group?
              </Text>
            </View>
          </View>
          <View
            style={[groupStyles.imageContainer, {
              marginLeft: '23%'
            }]}
          >
            <Image 
              source={require('../../assets/wave.png')}
              style={groupStyles.imageStyle}
            />
          </View>
          <Button
            mode='contained'
            labelStyle={{ 
              fontSize: 20
            }}
            contentStyle={{ 
              height: 60,
              width: 200
            }}
            style={{
              marginTop: 30
            }}
          >
            Plan an Event
          </Button>
          <Button
            mode='contained'
            buttonColor={theme.colors.success}
            labelStyle={{ 
              fontSize: 20
            }}
            contentStyle={{ 
              height: 60,
              width: 200
            }}
            style={{
              marginTop: 20
            }}
          >
            See my Group
          </Button>
        </View>
      </View>
    </PaperProvider>
  );
}

export default ConfirmGroup;
