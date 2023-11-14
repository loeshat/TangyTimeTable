import React from 'react';
import { theme } from '../styles/Theme';
import TopNavBar from '../components/TopBar';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Button, PaperProvider, Text } from 'react-native-paper';

import { eventOptions, organisedEventOptions } from '../services/Data';
import EventCard from '../components/EventCard';
import OrganisedEventCard from '../components/OrganisedEventCard';



/**
 * Main Events page, containing filters for upcoming, in progress and past events
 * @param {*} navigation 
 * @returns 
 */
const Home = ({ navigation }) => {
  return (
    <PaperProvider theme={theme}>
      <TopNavBar navigation={navigation} />

      {/* Events Section */}
      <View style={styles.container}>
        <Text style={styles.heading}>Events</Text>
        <View style={{ padding: 20, width: '80%' }}>
          
          {/* Tabs */}
          <View style={styles.eventsTabsContainer}>
            {/* TODO: implement routes for different tab views */}
            <TouchableOpacity 
              style={styles.selectedEventsTab}
              onPress={() => navigation.navigate('HomeRoutes', { screen: 'Upcoming Events' })}>
              <Text style={{ color: 'white' }}>Upcoming</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.unselectedEventsTab}
              onPress={() => navigation.navigate('HomeRoutes', { screen: 'In Progress Events' })}>
              <Text style={{ color: '#9E9E9E' }}>In Progress</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.unselectedEventsTab}
              onPress={() => navigation.navigate('HomeRoutes', { screen: 'Past Events' })}>
              <Text style={{ color: '#9E9E9E' }}>Past</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Event Cards */}
        <View style={{ padding: 20}}>
          <ScrollView
            horizontal={true}
          >
            {
              eventOptions.map((item, id) => (
                <EventCard 
                  key={id}
                  name={item.name} 
                  desc={item.desc} 
                  details={item.details}
                />
              ))
            }
          </ScrollView>
        </View>

      
      {/* Organised Events Section */}
      <View style={styles.container}>
        <Text style={[styles.heading, { paddingTop: 60 }]}>Your Organised Events</Text>
        <View style={{ padding: 20}}>
          <ScrollView
            horizontal={true}
          >
            {
              eventOptions.map((item, id) => (
                <OrganisedEventCard 
                  key={id}
                  name={item.name} 
                  desc={item.desc} 
                />
              ))
            }
          </ScrollView>
        </View>  
        
      </View>
        {/* For testing purposes only */}
        <Button
          onPress={() => navigation.navigate('EventRoutes', { screen: 'Event Finalisation' })}
        >
          Event Finalisation Screen
        </Button>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 5,
  },
  cardsContainer: {
    paddingLeft: 20,
  },
  heading: {
    color: theme.colors.text,
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'left',
    paddingTop: 20,
    paddingLeft: 20,
  },
  eventsTabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'left',
  },
  selectedEventsTab: {
    backgroundColor: '#79C1A9',
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unselectedEventsTab: {
    backgroundColor: '#EAEAEA',
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  }, 
});

export default Home;
