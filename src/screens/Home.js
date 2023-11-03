import React from 'react';
import { theme } from '../styles/Theme';
import TopNavBar from '../components/TopBar';
import { View } from 'react-native';
import { PaperProvider, Text } from 'react-native-paper';

const Home = ({ navigation }) => {
  return (
    <PaperProvider theme={theme}>
      <TopNavBar navigation={navigation}/>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text variant='bodyMedium'>All Events</Text>
      </View>
    </PaperProvider>
  );
}

export default Home;
