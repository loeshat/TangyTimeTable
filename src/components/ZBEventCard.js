import React, { useState } from 'react';
import moment from 'moment';
import { theme } from '../styles/Theme';
import { Button, Card, Divider, Text } from 'react-native-paper';
import { View, TouchableOpacity } from 'react-native';

const ZBEventCard = ({ name, desc, organiser }) => {
  
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
            width: 220,
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
              paddingBottom: 5,
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
              borderRadius: 8,
              padding: 5,
              marginTop: 10, 
              marginRight: 10,
            }}
          >
            <Text style={{ color: 'white', textAlign: 'center' }}>Organiser: {organiser}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: '#79C1A9',
              borderRadius: 8,
              padding: 5,
              marginTop: 10, 
              marginRight: 10,
            }}
          >
            <Text style={{ color: 'white', textAlign: 'center' }}>Details</Text>
          </TouchableOpacity>
        </View>
      </Card.Content>
    </Card>
  );
}

export default ZBEventCard;
