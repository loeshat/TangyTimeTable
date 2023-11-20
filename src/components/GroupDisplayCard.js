import React from 'react';
import { theme } from '../styles/Theme';
import { Avatar, Card, Text } from 'react-native-paper';
import { View } from 'react-native';

const GroupDisplayCard = ({ name, membersNum, onPress }) => {
  const memberText = membersNum === 1 ? 'member' : 'members';
  return (
    <View
      style={{
        marginRight: 20,
      }}
    >
      <Card
        mode='contained'
        style={{
          backgroundColor: theme.colors.background,
          minWidth: 160,
        }}
        onPress={onPress}
      >
        <Card.Content>
          <Avatar.Image 
            size={45}
            source={require('../assets/pink_tangy.png')}
            style={{
              backgroundColor: theme.colors.background,
            }}
          />
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
        </Card.Content>
      </Card>
    </View>
  );
}

export default GroupDisplayCard;
