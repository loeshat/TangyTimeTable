import React from 'react';
import { theme } from '../styles/Theme';
import { Avatar, Card, Text } from 'react-native-paper';
import { View } from 'react-native';

/**
 * This component displays key details of a group
 * @param {*} name
 * @param {*} membersNum
 * @returns 
 */
const GroupCard = ({ name, membersNum, onPress }) => {
  const memberText = membersNum === 1 ? 'member' : 'members';
  return (
    <View
      style={{
        marginTop: '2%',
        width: '90%',
      }}
    >
      <Card 
        mode='contained'
        style={{
          backgroundColor: theme.colors.background,
        }}
        onPress={onPress}
      >
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
              backgroundColor: theme.colors.background,
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
                fontWeight: '600',
              }}
            >
              {name}
            </Text>
            <Text
              variant='bodyMedium'
              style={{
                color: '#000000',
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
