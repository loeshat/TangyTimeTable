import React, { useState, useEffect } from 'react';
import { theme } from '../styles/Theme';
import { Avatar, Card, Text } from 'react-native-paper';
import { View } from 'react-native';
import { getUserDetails } from '../services/StoreService';

const FriendDisplayCard = ({ userId }) => {
  const [userObj, setUserObj] = useState({});
  useEffect(() => {
    getUserDetails(userId).then((res) => setUserObj(res));
  }, [userId]);
  return (
    <View style={{ width: '95%', marginTop: 20 }}>
      <Card
        mode='contained'
        style={{
          backgroundColor: theme.colors.background,
        }}
      >
        <Card.Content
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          {
            userObj.image
            ?
            <Avatar.Image size={40} source={{ uri: userObj.image }} />
            :
            <Avatar.Image 
              size={40} 
              source={{ uri: 'https://img.freepik.com/premium-photo/3d-character-male-cartoon-with-square-pattern-red-black-flanel-good-profile-picture_477250-9.jpg' }} 
              style={{
                backgroundColor: theme.colors.background,
              }}
            />
          }
          <Text
            variant='bodyLarge'
            style={{ marginLeft: 10 }}
          >
            {userObj.name}
          </Text>
        </Card.Content>
      </Card>
    </View>
  );
}

export default FriendDisplayCard;
