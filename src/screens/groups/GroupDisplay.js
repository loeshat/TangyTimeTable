import React, { useState, useEffect } from 'react';
import { theme } from '../../styles/Theme';
import { flowStyles } from '../../styles/FlowStyles';
import { Avatar, Button, PaperProvider, Text } from 'react-native-paper';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import TitleTopBar from '../../components/TitleTopBar';
import { getGroupDetails, getGroupEvents } from '../../services/StoreService';
import FullEventCard from '../../components/FullEventCard';

const GroupDisplay = ({ route, navigation }) => {
	const { groupId } = route.params ?? {};
	const [groupName, setGroupName] = useState('');
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [planningEvents, setPlanningEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
	const [filter, setFilter] = useState('events');
	const handleFilterChange = (newFilter) => setFilter(newFilter);

	useEffect(() => {
		getGroupDetails(groupId).then((res) => setGroupName(res.name));
		getGroupEvents(groupId).then((res) => {
      setUpcomingEvents(res.filter(e => e.status.includes('upcoming')));
      setPlanningEvents(res.filter(e => e.status.includes('in progress')));
      setPastEvents(res.filter(e => e.status.includes('past')));
    });
	}, [groupId]);

	return (
		<PaperProvider theme={theme}>
			<TitleTopBar
				backAction={() => navigation.navigate('Friends')}
				title={'See All Groups'}
			/>
			<View style={flowStyles.screen}>
				<View style={styles.headingContainer}>
					<Avatar.Image
						size={70}
						source={require('../../assets/pink_tangy.png')}
						style={{
							backgroundColor: theme.colors.surface,
						}}
					/>
					<View>
						<Text
							variant='headlineMedium'
							style={{
								color: theme.colors.text,
								fontWeight: '600',
								marginLeft: 10,
							}}
						>
							{groupName}
						</Text>
						<View style={styles.filterContainer}>
							<TouchableOpacity
								onPress={() => handleFilterChange('events')}
								style={
									filter === 'events'
										? styles.selectedTab
										: styles.unselectedTab
								}
							>
								<Text
									style={
										filter === 'events'
											? styles.selectedText
											: styles.unselectedText
									}
								>
									Events
								</Text>
							</TouchableOpacity>
							<TouchableOpacity
								onPress={() => handleFilterChange('members')}
								style={
									filter === 'members'
										? styles.selectedTab
										: styles.unselectedTab
								}
							>
								<Text
									style={
										filter === 'members'
											? styles.selectedText
											: styles.unselectedText
									}
								>
									Members
								</Text>
							</TouchableOpacity>
							<TouchableOpacity
								onPress={() => handleFilterChange('edit')}
								style={
									filter === 'edit' ? styles.selectedTab : styles.unselectedTab
								}
							>
								<Text
									style={
										filter === 'edit'
											? styles.selectedText
											: styles.unselectedText
									}
								>
									Edit
								</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
        {
          filter === 'events'
          &&
          <View style={styles.eventsContainer}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '5%',
              }}
            >
              <Text style={styles.sectionHeading}>
                Confirmed Events
              </Text>
              <Button
                icon='plus'
                mode='contained'
                buttonColor={theme.colors.success}
                style={{
                  marginRight: '5%',
                }}
              >
                New Event
              </Button>
            </View>
            <View>
              <ScrollView
                horizontal={true}
              >
                {
                  upcomingEvents.map((item, id) => (
                    <FullEventCard 
                      key={id}
                      eventName={item.name}
                      description={item.description}
                      organiser={item.organiser}
                      eventId={item.eventId}
                      groupId={item.groupId}
                      navigation={navigation}
                    />
                  ))
                }
              </ScrollView>
              {
                upcomingEvents.length === 0
                &&
                <Text
                  variant='bodyLarge'
                  style={{
                    color: theme.colors.text,
                  }}
                >
                  You don't have any upcoming events!
                </Text>
              }
            </View>
            <Text 
              style={[styles.sectionHeading, {
                marginTop: '8%',
              }]}
            >
              Events In Planning
            </Text>
            <View style={styles.eventScrollContainer}>
              <ScrollView
                horizontal={true}
              >
                {
                  planningEvents.map((item, id) => (
                    <FullEventCard 
                      key={id}
                      eventName={item.name}
                      description={item.description}
                      organiser={item.organiser}
                      eventId={item.eventId}
                      groupId={item.groupId}
                      navigation={navigation}
                    />
                  ))
                }
              </ScrollView>
              { 
                planningEvents.length === 0
                &&
                <Text
                  variant='bodyLarge'
                  style={{
                    color: theme.colors.text,
                  }}
                >
                  You don't have any events in planning!
                </Text>
              }
            </View>
            <Text
              style={[styles.sectionHeading, {
                marginTop: '8%',
              }]}
            >
              Past Events
            </Text>
            <View style={styles.eventScrollContainer}>
              <ScrollView
                horizontal={true}
              >
                {
                  pastEvents.map((item, id) => (
                    <FullEventCard 
                      key={id}
                      eventName={item.name}
                      description={item.description}
                      organiser={item.organiser}
                      eventId={item.eventId}
                      groupId={item.groupId}
                      navigation={navigation}
                    />
                  ))
                }
              </ScrollView>
              {
                pastEvents.length === 0
                &&
                <Text
                  variant='bodyLarge'
                  style={{
                    color: theme.colors.text,
                  }}
                >
                  You don't have any past events!
                </Text>
              }
            </View>
          </View>
        }
        {
          filter === 'edit'
          &&
          <View style={styles.editContainer}>
            <Button
              mode='contained'
              buttonColor={theme.colors.success}
              style={{
                width: '85%',
                borderRadius: 10,
              }}
            >
              Change Group Name
            </Button>
            <Button
              mode='contained'
              style={{
                width: '85%',
                marginTop: '3%',
                borderRadius: 10,
              }}
            >
              Delete Group
            </Button>
          </View>
        }
			</View>
		</PaperProvider>
	);
};

export default GroupDisplay;

const styles = StyleSheet.create({
	headingContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginLeft: '5%',
    marginTop: '5%',
	},
	selectedTab: {
		backgroundColor: '#79C1A9',
		padding: 7,
		paddingLeft: 15,
		paddingRight: 15,
		borderRadius: 50,
		justifyContent: 'center',
		alignItems: 'center',
	},
	selectedText: {
		color: theme.colors.surface,
	},
	unselectedText: {
		color: theme.colors.text,
	},
	unselectedTab: {
		backgroundColor: '#EAEAEA',
		padding: 7,
		paddingLeft: 15,
		paddingRight: 15,
		borderRadius: 50,
		justifyContent: 'center',
		alignItems: 'center',
	},
	filterContainer: {
		flexDirection: 'row',
		marginLeft: 10,
		gap: 8,
		marginTop: 5,
	},
	sectionHeading: {
		color: theme.colors.text,
		fontSize: 22,
		fontWeight: '600',
	},
  eventsContainer: {
    marginLeft: '5%',
    marginTop: '8%',
  },
  eventScrollContainer: {
    marginTop: '3%',
  },
  editContainer: {
    marginTop: '8%',
    alignItems: 'center',
  }
});
