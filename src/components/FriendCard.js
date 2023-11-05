import React, { useState } from 'react';
import { theme } from '../styles/Theme';
import { View } from 'react-native';
import { CheckBox } from '@rneui/themed';
import { Avatar, Card, PaperProvider, Text } from 'react-native-paper';

const FriendCard = ({ name, image, isCheckbox }) => {
  const [checked, setChecked] = useState(false);
  const toggleCheck = () => setChecked(!checked);
  return (
    <PaperProvider theme={theme}>
      <View 
        style={{ 
          flexDirection: 'row', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          marginTop: 20 
        }}
      >
        <View style={{ width: 300 }}>
          <Card mode='outlined'>
            <Card.Content 
              style={{ 
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Avatar.Image size={40} source={{ uri: image }} />
              <Text 
                variant='bodyLarge'
                style={{
                  marginLeft: 10
                }}
              >
                {name}
              </Text>
            </Card.Content>
          </Card>
        </View>
        {
          isCheckbox
          &&
          <CheckBox 
            checked={checked}
            onPress={toggleCheck}
            checkedColor={theme.colors.success}
          />
        }
      </View>
    </PaperProvider>
  );
}

export default FriendCard;
