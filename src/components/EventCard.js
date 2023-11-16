import React, { useState, useEffect } from 'react';
import { theme } from '../styles/Theme';
import { Avatar, Card, Text } from 'react-native-paper';
import { View } from 'react-native';
import { getGroupDetails } from '../services/StoreService';

const EventCard = ({ eventName, status, details, groupId }) => {
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
              style={{
                  color: theme.colors.text,
                  fontSize: 15,
                  fontWeight: '400',
                  paddingTop: 5,
              }}
            >
              {details}
            </Text>
          </View>
        }
      </Card.Content>
    </Card>
  );
}

export default EventCard;
