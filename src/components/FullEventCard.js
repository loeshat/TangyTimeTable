import React, { useState, useEffect } from 'react';
import { theme } from '../styles/Theme';
import { Card, Text } from 'react-native-paper';
import { View, TouchableOpacity } from 'react-native';
import { getCurrentUser, getGroupDetails, getUserDetails } from '../services/StoreService';

const pillStyle = {
  backgroundColor: theme.colors.success,
  borderRadius: 12,
  padding: 5,
  paddingLeft: 10,
  paddingRight: 10,
  width: 'auto',
};

const pillTextStyle = {
  color: theme.colors.surface,
  textAlign: 'center',
}

const FullEventCard = ({ 
  eventName,
  description,
  organiser,
  eventId, 
  groupId,
  navigation,
}) => {
  const [groupName, setGroupName] = useState('');
  const [organiserName, setOrganiserName] = useState('');

  useEffect(() => {
    getGroupDetails(groupId).then(group => setGroupName(group.name));
    if (organiser !== null) {
      getUserDetails(organiser).then(user => setOrganiserName(user.name));
    } else {
      getCurrentUser().then((id) => {
        getUserDetails(id).then(user => setOrganiserName(user.name));
      });
    }
  }, []);

  return (
    <View
      style={{ marginRight: 20 }}
    >
      <Card
        mode='contained'
        style={{
          backgroundColor: theme.colors.background,
        }}
      >
        <Card.Content>
          <Text
            variant='titleLarge'
            style={{
              color: theme.colors.text,
              fontWeight: '500',
            }}
          >
            {eventName}
          </Text>
          <Text
            variant='bodyLarge'
            style={{
              color: '#555555',
            }}
          >
            {description}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              gap: 7,
              marginTop: 5,
            }}
          >
            <View
              style={pillStyle}
            >
              <Text
                style={pillTextStyle}
              >
                Organiser: {organiserName}
              </Text>
            </View>
            <TouchableOpacity 
              style={pillStyle}
              onPress={() => navigation.navigate('EventRoutes', { screen: 'Event Display', params: { eventId: eventId, groupName: groupName } })}
            >
              <Text
                style={pillTextStyle}
              >
                View Details
              </Text>
            </TouchableOpacity>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
}

export default FullEventCard;
