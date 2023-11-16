import React, { useState, useEffect } from 'react';
import { theme } from '../styles/Theme';
import TopNavBar from '../components/TopBar';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Button, PaperProvider, SegmentedButtons, Text } from 'react-native-paper';

import { eventOptions, organisedEventOptions } from '../services/Data';
import EventCard from '../components/EventCard';
import OrganisedEventCard from '../components/OrganisedEventCard';
import { getAllEvents, getCurrentUser } from '../services/StoreService';

const filterTheme = {
  colors: {
    secondaryContainer: theme.colors.success,
    primary: theme.colors.success,
    outline: theme.colors.disabled,
  }
}

/**
 * Main Events page, containing filters for upcoming, in progress and past events
 * @param {*} navigation 
 * @returns 
 */
const Home = ({ navigation }) => {
  const [filter, setFilter] = useState('upcoming');
  const [allEvents, setAllEvents] = useState([]);
  const [events, setEvents] = useState([]);
  const [myEvents, setMyEvents] = useState([]);
  const handleFilterChange = (val) => {
    setFilter(val);
    const filteredEvents = allEvents.filter(e => e.status.includes(val));
    setEvents(filteredEvents);
  }

  useEffect(() => {
    getAllEvents().then((res) => {
      setAllEvents(res);
      setEvents(res.filter(e => e.status.includes('upcoming')));
      getCurrentUser().then((userId) => setMyEvents(res.filter(event => event.organiser === userId)));
    });
  }, []);

  const filterButtons = [
    {
      value: 'upcoming',
      label: 'Upcoming',
      checkedColor: theme.colors.surface,
      uncheckedColor: theme.colors.disabled,
    },
    {
      value: 'in progress',
      label: 'In Progress',
      checkedColor: theme.colors.surface,
      uncheckedColor: theme.colors.disabled,
    },
    {
      value: 'past',
      label: 'Past',
      checkedColor: theme.colors.surface,
      uncheckedColor: theme.colors.disabled,
    },
  ];
  return (
    <PaperProvider theme={theme}>
      <TopNavBar navigation={navigation} />

      {/* Events Section */}
      <View style={styles.container}>
        <Text style={styles.heading}>Events</Text>
          <View
            style={{
              width: '80%',
              marginLeft: 20,
              marginTop: 10,
            }}
          >
            {/* Tabs */}
            <SegmentedButtons 
              value={filter}
              onValueChange={handleFilterChange}
              buttons={filterButtons}
              theme={filterTheme}
            />
          </View>

        {/* Event Cards */}
        <View
          style={{
            marginLeft: 20,
            marginTop: 20,
          }}
        >
          <ScrollView
            horizontal={true}
          >
            {
              events.map((item, id) => (
                <EventCard 
                  key={id}
                  eventName={item.name}
                  status={item.status}
                  details={`${item.location} | ${item.eventDate} ${item.startTime}`}
                  groupId={item.groupId}
                />
              ))
            }
          </ScrollView>
          {
            events.length === 0
            &&
            <Text
              variant='bodyLarge'
              style={{
                color: theme.colors.text,
              }}
            >
              You don't have any {filter} events!
            </Text>
          }
        </View>
        
      {/* Organised Events Section */}
      <View style={styles.container}>
        <Text style={[styles.heading, { paddingTop: 60 }]}>Your Organised Events</Text>
        <View style={{ padding: 20 }}>
          <ScrollView
            horizontal={true}
          >
            {
              myEvents.map((item, id) => (
                <OrganisedEventCard 
                  key={id}
                  eventName={item.name}
                  groupId={item.groupId}
                />
              ))
            }
            {
              myEvents.length === 0
              &&
              <Text
                variant='bodyLarge'
                style={{
                  color: theme.colors.text,
                }}
              >
                You haven't organised any events yet!
              </Text>
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
