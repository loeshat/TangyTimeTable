import React from 'react';
import { theme } from '../../styles/Theme';
import { IconButton, PaperProvider, Text } from 'react-native-paper';
import { View } from 'react-native';

// TODO: Navigate to final confirmation screen from here!

const TransportOptions = ({ navigation }) => {
  return (
    <PaperProvider theme={theme}>
      <View
        style={{
          marginTop: '15%',
        }}
      >
        <IconButton 
          icon='arrow-left-circle'
          iconColor={theme.colors.text}
          size={40}
          onPress={() => navigation.navigate('EventRoutes', { screen: 'Event Finalisation' })}
        />
        <Text
          variant='headlineLarge'
          style={{
            color: theme.colors.text,
            fontWeight: '500',
            marginLeft: '5%',
          }}
        >
          View Transport Methods
        </Text>
      </View>
    </PaperProvider>
  );
}

export default TransportOptions; 
