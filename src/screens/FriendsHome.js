import React from 'react';
import { theme } from '../styles/Theme';
import TopNavBar from '../components/TopBar';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Button, PaperProvider, Text } from 'react-native-paper';

import { groupOptions } from '../services/Data';
import GroupCard from '../components/GroupCard';
import OrganisedEventCard from '../components/OrganisedEventCard';

/**
 * Friends 'Home' Page, containing all groups and friends list display
 * @param {*} navigation 
 * @returns 
 */
const FriendsHome = ({ navigation }) => {
  return (
    <PaperProvider theme={theme}>
    <TopNavBar navigation={navigation} />

    {/* Groups Section */}
    <View style={styles.container}>
      <Text style={styles.heading}>Your Groups</Text>

      {/* Group Cards */}
      <View style={{ padding: 20 }}>
        <ScrollView
          horizontal={true}
        >
          {
            groupOptions.map((item, id) => (
              <TouchableOpacity onPress={() => navigation.navigate('GroupRoutes', { screen: 'ZesteeBesteesGroup' })}>
              {/* <TouchableOpacity> */}
                <GroupCard 
                key={id}
                name={item.name} 
                membersText={item.membersText}
                />
              </TouchableOpacity>
              
            ))
          }
        </ScrollView>
      </View>

    
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

export default FriendsHome;