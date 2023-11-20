import React from 'react';
import { theme } from '../../styles/Theme';
import { flowStyles } from '../../styles/FlowStyles';
import { Button, Text, PaperProvider } from 'react-native-paper';
import { Image, View } from 'react-native';
import TitleTopBar from '../../components/TitleTopBar';

const ConfirmGroup = ({ route, navigation }) => {
  const { name, groupId } = route.params ?? {};
  const returnHome = () => navigation.navigate('Events');
  const planEvent = () => navigation.navigate('EventRoutes', { screen: 'Create New Event', params: { groupId: groupId } });
  return (
    <PaperProvider theme={theme}>
      <TitleTopBar backAction={returnHome} title={'Return Home'} />
      <View style={flowStyles.screen}>
        <View style={{ alignItems: 'center'}}>
          <View
            style={[flowStyles.outerSpeech, {
              marginTop: '25%'
            }]}
          >
            <View
              style={[flowStyles.speechContainer, {
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
            style={[flowStyles.imageContainer, {
              marginLeft: '23%'
            }]}
          >
            <Image 
              source={require('../../assets/wave.png')}
              style={flowStyles.imageStyle}
            />
          </View>
          <Button
            accessibilityLabel='new-event-navigation-button'
            mode='contained'
            labelStyle={{ 
              fontSize: 20
            }}
            contentStyle={{ 
              height: 60,
              width: 200
            }}
            style={{
              marginTop: 30,
              borderRadius: 12,
            }}
            onPress={planEvent}
          >
            Plan an Event
          </Button>
          <Button
            accessibilityLabel='see-group-navigation-button'
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
              marginTop: 20,
              borderRadius: 12,
            }}
            onPress={() => navigation.navigate('GroupRoutes', { screen: 'Group Display', params: { groupId: groupId }})}
          >
            See my Group
          </Button>
        </View>
      </View>
    </PaperProvider>
  );
}

export default ConfirmGroup;
