import React, { useState } from 'react';
import moment from 'moment';
import { theme } from '../styles/Theme';
import { Button, Card, Divider, Text } from 'react-native-paper';
import { View } from 'react-native';

const EventCard = ({ name, desc, details }) => {
  
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
            justifyContent: 'space-between',
            width: 190,
          }}
        >
          <Text
            style={{
              color: theme.colors.text,
              fontSize: 18,
              fontWeight: 'bold'
            }}
          > {name}
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
          >{desc}
          </Text>
        </View>
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
      </Card.Content>
      <Card.Actions>

      </Card.Actions>
    </Card>
  );
}

export default EventCard;
