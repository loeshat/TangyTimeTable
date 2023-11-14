import React from 'react';
import { theme } from '../styles/Theme';
import { Avatar, Card, Text } from 'react-native-paper';
import { View } from 'react-native';

const GroupCard = ({ name, membersText }) => {
  return (
    <View>
      <Card
        style={{
          backgroundColor: '#FFEBD0',
          marginRight: 20,
          borderRadius: 20,
          width: 200,
        }}
      >
        <Card.Content>
          <Avatar.Image 
            size={45} 
            source={require('../assets/pink_tangy.png')} 
            style={{
              backgroundColor: '#FFEBD0'
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              marginBottom: 8,
              alignItems: 'center',
              justifyContent: 'space-between',
              width: 190,
              paddingTop: 10,
            }}
          >
            <Text
              style={{
                color: theme.colors.text,
                fontSize: 18,
                fontWeight: '600'
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
              flexDirection: 'row',
              marginBottom: 8,
              alignItems: 'center',
              justifyContent: 'space-between',
              width: 190,
              paddingTop: 10,
            }}
          >
            <Text
              style={{
                color: theme.colors.text,
                fontSize: 15,
                fontWeight: '400'
              }}
            > {membersText}
            </Text>
          </View>
        </Card.Content>
      </Card>        

    </View>
  );
}

export default GroupCard;
