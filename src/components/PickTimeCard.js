import React, { useState } from 'react';
import moment from 'moment';
import { theme } from '../styles/Theme';
import { Button, Card, Divider, Text } from 'react-native-paper';
import { View } from 'react-native';

const PickTimeCard = ({ date, startTime, endTime, onChange }) => {
  const dateMoment = moment(date, 'YYYY-MM-DD');
  const dayOfWeek = dateMoment.format('dddd');
  const formattedDate = dateMoment.format('DD/MM/YYYY');

  const [select, setSelected] = useState(false);
  const toggleSelect = () => {
    setSelected(!select);
    onChange(!select);
  }
  
  return (
    <Card 
      mode='outlined'
      theme={theme}
      style={{
        marginRight: 20,
        borderColor: select ? theme.colors.success : theme.colors.text,
        borderWidth: select ? 1.25 : 0.1,
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
            variant='titleMedium'
            style={{
              color: theme.colors.primary,
            }}
          >
            Event Date:
          </Text>
          <View
            style={{
              marginLeft: 10,
              alignItems: 'flex-end',
            }}
          >
            <Text
              variant='bodyLarge'
              style={{
                color: theme.colors.text,
                fontWeight: '500',
              }}
            >
              {dayOfWeek}
            </Text>
            <Text
              variant='bodyMedium'
              style={{
                color: theme.colors.text,
              }}
            >
              {formattedDate}
            </Text>
          </View>
        </View>
        <Divider />
        <View
          style={{
            marginTop: 8,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Text
            variant='bodyLarge'
            style={{
              color: theme.colors.success,
              fontWeight: '500',
            }}
          >
            Start Time:
          </Text>
          <Text
            variant='bodyLarge'
            style={{
              color: theme.colors.text,
            }}
          >
            {startTime}
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
            variant='bodyLarge'
            style={{
              color: theme.colors.success,
              fontWeight: '500',
            }}
          >
            End Time:
          </Text>
          <Text
            variant='bodyLarge'
            style={{
              color: theme.colors.text,
            }}
          >
            {endTime}
          </Text>
        </View>
      </Card.Content>
      <Card.Actions>
        <Button
          mode='contained'
          onPress={toggleSelect}
          buttonColor={select 
                      ? theme.colors.success 
                      : theme.colors.primary}
          style={{
            marginBottom: 3,
          }}
        >
          {select ? 'Selected' : 'Select'}
        </Button>
      </Card.Actions>
    </Card>
  );
}

export default PickTimeCard;
