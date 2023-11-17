import React, { useState } from 'react';
import { theme } from '../../styles/Theme';
import { flowStyles } from '../../styles/FlowStyles';
import { IconButton, PaperProvider, SegmentedButtons, Text } from 'react-native-paper';
import { Image, TouchableOpacity, View } from 'react-native';

const buttonsTheme = {
  colors: {
    onSecondaryContainer: theme.colors.primary,
    secondaryContainer: theme.colors.background,
    primary: theme.colors.primary,
    outline: theme.colors.text,
  },
};

const imageStyle = {
  width: '90%',
  height: 290,
  marginTop: '5%',
  borderRadius: 12,
}

const TransportOptions = ({ navigation }) => {
  const [value, setValue] = useState('bus');
  const [speech, setSpeech] = useState('Taking a Bus will take 16 minutes!');
  const handleValueChange = (val) => {
    setValue(val);
    if (val === 'bus') {
      setSpeech('Taking a Bus will take 16 minutes!'); 
    } else if (val === 'car') {
      setSpeech('I suggest driving to the venue!');
    } else {
      setSpeech('Walking will take 47 minutes!');
    }
  }
  const options = [
    {
      value: 'bus',
      label: 'Bus',
      icon: 'bus',
      checkedColor: theme.colors.primary,
      uncheckedColor: theme.colors.text,
    },
    {
      value: 'car',
      label: 'Car',
      icon: 'car',
      checkedColor: theme.colors.primary,
      uncheckedColor: theme.colors.text,
    },
    {
      value: 'walking',
      label: 'Walking',
      icon: 'walk',
      checkedColor: theme.colors.primary,
      uncheckedColor: theme.colors.text,
    },
  ];

  return (
    <PaperProvider theme={theme}>
      <View
        style={{
          marginTop: '15%',
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
          onPress={() => navigation.navigate('EventRoutes', { screen: 'Event Finalisation' })}
        >
          <IconButton 
            icon='chevron-left'
            iconColor={theme.colors.text}
            size={40}
            style={{
              marginRight: 0,
            }}
          />
          <Text
            variant='bodyLarge'
            style={{
              color: theme.colors.text,
            }}
          >
            Return
          </Text>
        </TouchableOpacity>
        <Text
          variant='headlineLarge'
          style={{
            color: theme.colors.text,
            fontWeight: '500',
            marginLeft: '5%',
            marginTop: '2%',
          }}
        >
          View Transport Methods
        </Text>
        <View
          style={{
            alignItems: 'center',
            marginTop: '5%',
          }}
        >
          <SegmentedButtons 
            value={value}
            onValueChange={handleValueChange}
            buttons={options}
            style={{
              width: '90%',
            }}
            theme={buttonsTheme}
          />
          {
            value === 'bus'
            &&
            <Image 
              source={require('../../assets/bus.png')}
              style={imageStyle}
            />
          }
          {
            value === 'car'
            &&
            <Image 
              source={require('../../assets/driving.png')}
              style={imageStyle}
            />
          }
          {
            value === 'walking'
            &&
            <Image 
              source={require('../../assets/walking.png')}
              style={imageStyle}
            />
          }
          <View 
            style={[flowStyles.outerSpeech, {
              marginTop: '6%',
              marginRight: '62%',
            }]}
          >
            <View 
              style={[flowStyles.speechContainer, {
                width: 180,
              }]}
            >
              <Text
                variant='bodyLarge'
                style={{
                  color: theme.colors.text,
                }}
              >
                {speech}
              </Text>
            </View>
          </View>
          <View
            style={{
              width: '100%',
              alignItems: 'flex-end',
              marginLeft: '5%',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Image 
              source={require('../../assets/wave.png')}
              style={flowStyles.imageStyle}
            />
            <TouchableOpacity
              style={{
                backgroundColor: theme.colors.success,
                borderRadius: 12,
                padding: 15,
                width: 220,
                marginRight: '8%',
              }}
              onPress={() => navigation.navigate('EventRoutes', { screen: 'Completed Event Confirmation' })}
            >
              <Text
                variant='bodyLarge'
                style={{
                  color: theme.colors.surface,
                  textAlign: 'center',
                  fontWeight: '500',
                }}
              >
                Add {value.charAt(0).toUpperCase() + value.slice(1)} Travel Time to Calendar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </PaperProvider>
  );
}

export default TransportOptions; 
