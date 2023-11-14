import React, { useState } from 'react';
import moment from 'moment';
import { theme } from '../styles/Theme';
import { Button, Card, Divider, Text } from 'react-native-paper';
import { View, TouchableOpacity } from 'react-native';

const OrganisedEventCard = ({ name, desc }) => {
  
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
          >
            {name}
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
          >
            {desc}
          </Text>
        </View>  

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'left',}}>
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: '#79C1A9',
              borderRadius: 10,
              padding: 6,
              marginTop: 10, 
              marginRight: 10,
            }}
            onPress={() => {
              // TODO: Implement Organise button functionality
            }}
          >
            <Text style={{ color: 'white', textAlign: 'center' }}>Organise</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: '#EAEAEA',
              borderRadius: 10,
              padding: 6,
              marginTop: 10, 
              marginRight: 10,
            }}
            onPress={() => {
              // TODO: Implement Delete button functionality
            }}
          >
            <Text style={{ color: '#9E9E9E', textAlign: 'center' }}>Delete</Text>
          </TouchableOpacity>
        </View>
      </Card.Content>
    </Card>
  );
}

export default OrganisedEventCard;
