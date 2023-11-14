import React from 'react';
import { theme } from '../../styles/Theme';
import { Text, PaperProvider } from 'react-native-paper';
import { Image, View } from 'react-native';

const ReadMoreModal = ({ route, navigation }) => {
  const { type, other } = route.params ?? {};

  return (
    <PaperProvider theme={theme}>
      <View
        style={{
          marginTop: '10%',
          marginLeft: '4%',
          marginRight: '4%',
          alignItems: 'center',
        }}
      >
        <Text
          variant='headlineMedium'
          style={{
            color: theme.colors.success,
            textAlign: 'center',
            marginBottom: '3%',
            fontWeight: '500',
          }}
        >
          {type}
        </Text>
        <Image 
          source={{ uri: other.image }}
          style={{
            width: 375,
            height: 300,
            borderRadius: 10,
            marginBottom: '3%',
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '92%',
            marginTop: '2%',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Text
              variant='bodyLarge'
              style={{
                color: theme.colors.text,
                fontWeight: '500',
                marginRight: 2,
              }}
            >
              Group Size:
            </Text>
            <Text
              variant='bodyLarge'
              style={{
                color: theme.colors.text,
              }}
            >
              {other.groupSize}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Text
              variant='bodyLarge'
              style={{
                color: theme.colors.text,
                fontWeight: '500',
                marginRight: 2,
              }}
            >
              Price: 
            </Text>
            <Text
              variant='bodyLarge'
              style={{
                color: theme.colors.text,
              }}
            >
              {other.price}
            </Text>
          </View>
        </View>
        <View
          style={{
            width: '92%'
          }}
        >
          <Text
            variant='bodyLarge'
            style={{
              color: theme.colors.text,
              fontWeight: '500',
            }}
          >
            Nearby Locations:
          </Text>
          <Text
            variant='bodyLarge'
            style={{
              color: theme.colors.text,
            }}
          >
            {other.nearby}
          </Text>
        </View>
      </View>
    </PaperProvider>
  );
}

export default ReadMoreModal;
