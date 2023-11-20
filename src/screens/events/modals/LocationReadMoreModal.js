import React, { useCallback } from 'react';
import { theme } from '../../../styles/Theme';
import { Button, IconButton, Text, PaperProvider } from 'react-native-paper';
import { Image, Linking, View } from 'react-native';

export const textContainer = {
  flexDirection: 'row',
  alignItems: 'flex-start',
  marginBottom: 3,
  width: '82%',
}

export const headingStyle = {
  color: theme.colors.text,
  fontWeight: '500',
  marginRight: 4,
}

const LocationModal = ({ route, navigation }) => {
  const { name, image, other } = route.params ?? {};
  const handlePress = useCallback(async () => {
    const supported = await Linking.canOpenURL(other.website);
    if (supported) {
      await Linking.openURL(other.website);
    } else {
      console.log(`Error: Cannot open provided URL: ${other.website}`);
    }
  }, [other.website]);
  return (
    <PaperProvider theme={theme}>
      <View
        style={{
          alignItems: 'center',
          marginLeft: '4%',
          marginRight: '4%',
          marginTop: '5%',
        }}
      >
        <View
          style={{
            alignItems: 'flex-end',
            width: '100%',
          }}
        >
          <IconButton 
            icon='close'
            accessibilityLabel='close-modal-button'
            iconColor={theme.colors.text}
            onPress={() => navigation.navigate('EventRoutes', { screen: 'Event Finalisation', params: { activeStep: 2 } })}
          />
        </View>
        <Text
          variant='headlineMedium'
          style={{
            color: theme.colors.success,
            fontWeight: '500',
            marginTop: '5%',
            marginBottom: '8%',
            width: 300,
            textAlign: 'center',
          }}
        >
          {name}
        </Text>
        <Image 
          source={{ uri: image }}
          style={{
            width: 375,
            height: 300,
            borderRadius: 10,
            marginBottom: '8%',
          }}
        />
        <View
          style={{
            marginBottom: '5%',
          }}
        >
          <View style={textContainer}>
            <Text
              variant='bodyLarge'
              style={headingStyle}
            >
              Address: 
            </Text>
            <Text
              variant='bodyLarge'
              style={{
                color: theme.colors.text,
              }}
            >
              {other.address}
            </Text>
          </View>
          <View style={textContainer}>
            <Text
              variant='bodyLarge'
              style={headingStyle}
            >
              Hours: 
            </Text>
            <Text
              variant='bodyLarge'
              style={{
                color: theme.colors.text,
              }}
            >
              {other.hours}
            </Text>
          </View>
          <View style={textContainer}>
            <Text
              variant='bodyLarge'
              style={headingStyle}
            >
              Phone:
            </Text>
            <Text
              variant='bodyLarge'
              style={{
                color: theme.colors.text,
              }}
            >
              {other.phone}
            </Text>
          </View>
        </View>
        <Button
          mode='contained'
          accessibilityLabel='see-website-button'
          onPress={handlePress}
          style={{
            width: 250,
            borderRadius: 12,
          }}
        >
          See Website
        </Button>
      </View>
    </PaperProvider>
  );
}

export default LocationModal;
