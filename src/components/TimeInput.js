import React, { useState } from 'react';
import { theme } from '../styles/Theme';
import { Text } from 'react-native-paper';
import { View, TouchableOpacity } from 'react-native';

const TimeInput = ({ time }) => {
  const [selected, setSelected] = useState(false);
  const color = selected ? theme.colors.primary : theme.colors.surface;

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        width: 250
      }}
    >
      <Text
        variant='bodyMedium'
        style={{
          color: theme.colors.text,
          marginRight: 5,
        }}
      >
        {time}
      </Text>
      <TouchableOpacity
        style={{
          borderColor: theme.colors.text,
          borderWidth: 1,
          backgroundColor: color,
          padding: 10,
          height: 40,
          width: 200,
        }}
        onPress={() => setSelected(!selected)}
      >
        {
          !selected
          &&
          <Text
            style={{
              textAlign: 'center',
              color: theme.colors.text,
            }}
          >
            Available
          </Text>
        }
      </TouchableOpacity>
    </View>
  );
}

export default TimeInput;
