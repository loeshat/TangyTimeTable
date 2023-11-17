import React, { useState } from 'react';
import { theme } from '../styles/Theme';
import { Image, View } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import { Rating } from 'react-native-ratings';

const LocationCard = ({ 
  name, 
  rating, 
  numReviews,
  suburb, 
  image,
  other, 
  onChange, 
  navigation 
}) => {
  const [selected, setSelected] = useState(false);
  const toggleSelect = () => {
    setSelected(!selected);
    onChange(!selected);
  }
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
      <Card.Content
        style={{
          alignItems: 'center',
        }}
      >
        <Text
          variant='titleLarge'
          style={{
            color: theme.colors.success,
            fontWeight: '500',
            width: 220,
            textAlign: 'center',
            marginBottom: 5,
          }}
        >
          {name}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
          }}
        >
          <Text
            variant='bodyMedium'
            style={{
              color: theme.colors.text,
              marginRight: 5,
            }}
          >
            {rating}
          </Text>
          <Rating 
            type='custom'
            ratingColor={theme.colors.primary}
            imageSize={20}
            fractions={1}
            readonly
            startingValue={rating}
            ratingTextColor={theme.colors.text}
          />
          <Text
            variant='bodyMedium'
            style={{
              color: theme.colors.text,
              marginLeft: 3,
              marginRight: 2,
            }}
          >
            ({numReviews})
          </Text>
          <Text
            variant='bodyMedium'
            style={{
              color: theme.colors.text,
            }}
          >
            | {suburb}
          </Text>
        </View>
        <Image 
          source={{ uri: image }}
          style={{
            width: 275,
            height: 150,
            borderRadius: 10,
          }}
        />
      </Card.Content>
      <Card.Actions
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 7,
          marginTop: 2,
          marginBottom: 2,
        }}
      >
        <Button
          mode='outlined'
          labelStyle={{
            color: theme.colors.text,
          }}
          style={{
            borderColor: theme.colors.text,
            borderRadius: 12,
          }}
          onPress={() => navigation.navigate('EventRoutes', { screen: 'Location Read More', params: { name: name, image: image, other: other } })}
        >
          Read More
        </Button>
        <Button
          mode='contained'
          onPress={toggleSelect}
          buttonColor={selected ? theme.colors.success : theme.colors.primary}
          style={{
            borderRadius: 12,
          }}
        >
          {selected ? 'Selected' : 'Select'}
        </Button>
      </Card.Actions>
    </Card>
  );
}

export default LocationCard;
