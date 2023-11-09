import React from 'react';
import { theme } from '../styles/Theme';
import { Avatar, Card, Text } from 'react-native-paper';
import { View } from 'react-native';

const GroupCard = ({ name, membersNum }) => {
  const memberText = membersNum === 1 ? 'member' : 'members';
  return (
    <View
      style={{
        marginTop: '2%',
        width: '90%'
      }}
    >
      <Card mode='outlined'>
        <Card.Content
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Avatar.Image 
            size={45} 
            source={require('../assets/pink_tangy.png')} 
            style={{
              backgroundColor: '#FFFFFF'
            }}
          />
          <View
            style={{
              marginLeft: 10
            }}
          >
            <Text
              variant='bodyLarge'
              style={{
                color: theme.colors.text,
                fontWeight: '500'
              }}
            >
              {name}
            </Text>
            <Text
              variant='bodyMedium'
              style={{
                color: theme.colors.disabled
              }}
            >
              {membersNum} {memberText}
            </Text>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
}

export default GroupCard;
