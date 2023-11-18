import React, { useState, useEffect } from 'react';
import { theme } from '../styles/Theme';
import { Avatar, Card, Text } from 'react-native-paper';
import { View } from 'react-native';
import { getGroupDetails } from '../services/StoreService';

const descTextStyle = {
  color: theme.colors.text,
  fontSize: 15,
  fontWeight: '400',
  paddingTop: 5,
};

const EventCard = ({ 
  eventId, 
  eventName, 
  status, 
  details, 
  groupId, 
  navigation,
}) => {
  const [groupName, setGroupName] = useState(null);
  useEffect(() => {
    getGroupDetails(groupId).then((res) => setGroupName(res.name));
  }, [groupId]);
  return (
    <Card 
      style={{
        backgroundColor: '#FFEBD0',
        marginRight: 20,
        borderRadius: 20,
      }}
      onPress={() => navigation.navigate('EventRoutes', { screen: 'Event Display', params: { eventId: eventId, groupName: groupName } })}
    >
      <Card.Content>
        <View
          style={{
            flexDirection: 'row',
            marginBottom: 8,
            alignItems: 'center',
            width: 190,
          }}
        >
          <Avatar.Image 
            size={40}
            source={require('../assets/pink_tangy.png')}
            style={{
              backgroundColor: theme.colors.background,
              marginRight: 5,
            }}
          />
          <Text
            style={{
              color: theme.colors.text,
              fontSize: 18,
              fontWeight: 'bold',
            }}
          > {groupName}
          </Text>
          <View
            style={{
              marginLeft: 10,
              alignItems: 'flex-end',
            }}
          >
          </View>
        </View>
        <View
          style={{
            marginTop: 8,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Text
            style={{
              color: theme.colors.text,
              fontSize: 15,
              fontWeight: '400',
            }}
          >{eventName}
          </Text>
        </View>
        {
          status.includes('upcoming')
          &&
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Text
              style={descTextStyle}
            >
              {details}
            </Text>
          </View>
        }
        {
          status.includes('in progress')
          &&
          <Text
            style={descTextStyle}
          >
            Event In Planning
          </Text>
        }
      </Card.Content>
    </Card>
  );
}

export default EventCard;
