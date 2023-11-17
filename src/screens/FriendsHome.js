import React, { useState, useEffect } from 'react';
import { theme } from '../styles/Theme';
import { styles } from './Home';
import { ScrollView, View } from 'react-native';
import { Button, IconButton, PaperProvider, Text } from 'react-native-paper';
import TopNavBar from '../components/TopBar';
import GroupDisplayCard from '../components/GroupDisplayCard';
import { getAllGroups, getCurrentUser } from '../services/StoreService';
import { FriendsList } from '../services/Data';
import FriendCard from '../components/FriendCard';

/**
 * Friends 'Home' Page, containing all groups and friends list display
 * @param {*} navigation 
 * @returns 
 */
const FriendsHome = ({ navigation }) => {
  const [currUser, setCurrUser] = useState(null);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    getCurrentUser().then((id) => setCurrUser(id));
  }, []);

  useEffect(() => {
    getAllGroups(currUser).then((res) => setGroups(res));
  }, [currUser]);

  return (
    <PaperProvider theme={theme}>
      <TopNavBar navigation={navigation} />
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            margin: '5%',
          }}
        >
          <Text
            variant='headlineMedium'
            style={{
              color: theme.colors.text,
              fontWeight: '600',
            }}
          >
            Your Groups
          </Text>
          <Button
            mode='contained'
            buttonColor={theme.colors.success}
            style={{
              borderRadius: 10,
            }}
            onPress={() => navigation.navigate('GroupRoutes', { screen: 'Create New Group' })}
          >
            Create Group
          </Button>
        </View>
        <View
          style={{
            marginLeft: 20,
          }}
        >
          <ScrollView
            horizontal={true}
          >
            {
              groups.map((item, id) => (
                <GroupDisplayCard
                  key={id}
                  name={item.name}
                  membersNum={item.members.length}
                />
              ))
            }
          </ScrollView>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginLeft: '5%',
            marginRight: '5%',
            marginTop: '5%',
          }}
        >
          <Text
            variant='headlineMedium'
            style={{
              color: theme.colors.text,
              fontWeight: '600',
            }}
          >
            Your Friends
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <IconButton 
              icon='magnify'
              iconColor={theme.colors.surface}
              size={25}
              mode='contained'
              containerColor={theme.colors.success}
              style={{
                borderRadius: 12,
              }}
              onPress={() => alert('This feature is not available yet!')}
            />
            <Button
              mode='contained'
              buttonColor={theme.colors.success}
              style={{
                borderRadius: 10,
                marginLeft: 2,
              }}
              onPress={() => alert('This feature is not available yet!')}
            >
              Add Friends
            </Button>
          </View>
        </View>
        <View
          style={{
            marginLeft: 20,
          }}
        >
          <ScrollView>
            {
              FriendsList.map((item, id) => (
                <FriendCard 
                  key={id}
                  name={item.name}
                  image={item.image}
                  isCheckbox={false}
                />
              ))
            }
          </ScrollView>
        </View>
      </View>
    </PaperProvider>
  );
}

export default FriendsHome;