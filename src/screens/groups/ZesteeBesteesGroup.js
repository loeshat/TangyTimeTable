import React from 'react';
import { theme } from '../../styles/Theme';
import TitleTopBar from '../../components/TitleTopBar';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Button, PaperProvider, Text, Avatar } from 'react-native-paper';

import { ZBConfirmedEvents, ZBPlanningEvents, ZBPastEvents } from '../../services/Data';

import ZBEventCard from '../../components/ZBEventCard';

/**
 * Group Page for the group ZesteeBestees, containing group specific details and events
 * @param {*} navigation 
 * @returns 
 */
const ZesteeBesteesGroup = ({ navigation }) => {
    const returnToFriends = () => navigation.navigate('Friends');

  return (
    <PaperProvider theme={theme}>
        <TitleTopBar backAction={returnToFriends} title={'Back to Friends'} />
            
            {/* Heading */}
            <View style={styles.row}>
                <View style={styles.imageContainer}> 
                    <Avatar.Image 
                    size={75} 
                    source={require('../../assets/green_tangy.png')} 
                    style={{backgroundColor: 'white'}}
                    />
                </View>
                
                <View style={styles.titleContainer}>
                    <Text style={styles.heading}>ZesteeBestees</Text>
                    {/* Tabs */}
                    <View style={{ paddingTop: 8, paddingLeft: 20, width: '85%', }}>
                        <View style={styles.eventsTabsContainer}>
                            {/* TODO: implement routes for different tab views */}
                            <TouchableOpacity 
                            style={styles.selectedEventsTab}
                            onPress={() => navigation.navigate('HomeRoutes', { screen: 'Upcoming Events' })}>
                            <Text style={{ color: 'white' }}>Events</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                            style={styles.unselectedEventsTab}
                            onPress={() => navigation.navigate('HomeRoutes', { screen: 'In Progress Events' })}>
                            <Text style={{ color: '#9E9E9E' }}>Members</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                            style={styles.unselectedEventsTab}
                            onPress={() => navigation.navigate('HomeRoutes', { screen: 'Past Events' })}>
                            <Text style={{ color: '#9E9E9E' }}>Edit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
            

            <View style={styles.bodyContainer}>
                {/* TODO: event cards navigation */}
                <Text style={styles.sectionHeading}>Confirmed Events</Text>
                <ScrollView horizontal={true}>{
                    ZBConfirmedEvents.map((item, id) => (
                        <ZBEventCard 
                            key={id}
                            name={item.name} 
                            desc={item.desc} 
                            organiser={item.organiser}
                        />
                    ))
                }
                </ScrollView>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingRight: 20, }}> 
                    <Text style={styles.sectionHeading}>Events in Planning</Text>
                    <TouchableOpacity 
                        onPress={() => navigation.navigate('EventRoutes', { screen: 'Create New Event' })}
                        style={styles.newEventButton}
                        >

                        <Text style={{ color: 'white' }}>+  New Event</Text>
                    </TouchableOpacity>
                </View>
                
                <ScrollView horizontal={true}>{
                    ZBPlanningEvents.map((item, id) => (
                        <ZBEventCard 
                            key={id}
                            name={item.name} 
                            desc={item.desc} 
                            organiser={item.organiser}
                        />
                    ))
                }
                </ScrollView>
                <Text style={styles.sectionHeading}>Past Events</Text>
                <ScrollView horizontal={true}>{
                    ZBPastEvents.map((item, id) => (
                        <ZBEventCard 
                            key={id}
                            name={item.name} 
                            desc={item.desc} 
                            organiser={item.organiser}
                        />
                    ))
                }
                </ScrollView>
            </View>
    </PaperProvider>

  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    row: {
        flexDirection: 'row'
    },
    titleContainer: {
      flex: 4,
      backgroundColor: 'white',
    },
    imageContainer: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 30, 
        paddingLeft: 20,
    },
    bodyContainer: {
        flex: 6,
        paddingTop: 40,
        paddingLeft: 20,
        backgroundColor: 'white',
    },
    sectionHeading: {
        color: theme.colors.text,
        fontSize: 22,
        fontWeight: '600',
        paddingBottom: 15,
    },
    cardsContainer: {
      paddingLeft: 20,
    },
    heading: {
      color: theme.colors.text,
      fontWeight: 'bold',
      fontSize: 30,
      textAlign: 'left',
      paddingTop: 30,
      paddingLeft: 20,
    },
    eventsTabsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'left',
    },
    selectedEventsTab: {
      backgroundColor: '#79C1A9',
      padding: 7,
      paddingLeft: 15,
      paddingRight: 15,
      borderRadius: 50,
      justifyContent: 'center',
      alignItems: 'center',
    },
    unselectedEventsTab: {
      backgroundColor: '#EAEAEA',
      padding: 7,
      paddingLeft: 15,
      paddingRight: 15,
      borderRadius: 50,
      justifyContent: 'center',
      alignItems: 'center',
    }, 
    newEventButton: {
        backgroundColor: '#79C1A9',
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 15,
        paddingRight: 15,
    },
  });


export default ZesteeBesteesGroup;