import React from 'react';
import { theme } from '../styles/Theme';
import TopNavBar from '../components/TopBar';
import { View } from 'react-native';
import { Button, PaperProvider, Text } from 'react-native-paper';

/**
 * Main Events page, containing filters for upcoming, in progress and past events
 * @param {*} navigation 
 * @returns 
 */
const Home = ({ navigation }) => {
  return (
    <PaperProvider theme={theme}>
      <TopNavBar navigation={navigation} />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text variant='bodyMedium'>All Events</Text>
        {/** For testing purposes only */}
        <Button
          onPress={() => navigation.navigate('EventRoutes', { screen: 'Event Finalisation' })}
        >
          Event Finalisation Screen
        </Button>
      </View>
    </PaperProvider>
  );
}

export default Home;
