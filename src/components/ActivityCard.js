import React, { useState } from 'react';
import { theme } from '../styles/Theme';
import { View } from 'react-native';
import { Button, Card, Icon, Text } from 'react-native-paper';

const ActivityPickCard = ({ type, icon, votesNum, other, onChange, navigation }) => {
  
  const [selected, setSelected] = useState(false);
  const toggleSelect = () => {
    setSelected(!selected);
    onChange(!selected);
  }
  const friendsPlural = votesNum > 1 ? 'friends' : 'friend';
  const subText = votesNum > 0
                  ? `${votesNum} other ${friendsPlural} voted for this activity!`
                  : 'Be the first person to vote for this activity!';
                  
  return (
    <Card
      mode='outlined'
      theme={theme}
      style={{
        marginRight: 20,
        borderColor: selected ? theme.colors.success : theme.colors.text,
        borderWidth: selected ? 1.25 : 0.1,
      }}
    >
      <Card.Content>
        <View
          style={{
            alignItems: 'center',
          }}
        >
          <Icon 
            source={icon}
            color={theme.colors.success}
            size={35}
          />
          <Text
            variant='titleLarge'
            style={{
              color: theme.colors.success,
              fontWeight: '500',
            }}
          >
            {type}
          </Text>
          <Text
            variant='bodyLarge'
            style={{
              color: theme.colors.text,
            }}
          >
            {subText}
          </Text>
        </View>
      </Card.Content>
      <Card.Actions
        style={{
          marginBottom: 5,
        }}
      >
        <Button
          mode='outlined'
          labelStyle={{
            color: theme.colors.text,
          }}
          onPress={() => navigation.navigate('EventRoutes', { screen: 'Read More', params: { type: type, other: other } })}
        >
          Read More
        </Button>
        <Button
          mode='contained'
          onPress={toggleSelect}
          buttonColor={selected
                      ? theme.colors.success
                      : theme.colors.primary}
        >
          { selected ? 'Selected' : 'Select' }
        </Button>
      </Card.Actions>
    </Card>
  );
}

export default ActivityPickCard;
