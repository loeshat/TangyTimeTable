import React from 'react';
import { theme } from '../styles/Theme';
import { Image } from 'react-native';
import { Appbar, PaperProvider } from 'react-native-paper';

const TopNavBar = ({ navigation }) => {
  return (
    <PaperProvider theme={theme}>
      <Appbar.Header
        style={{ 
          backgroundColor: theme.colors.background, 
          justifyContent: 'space-between' 
        }}
      >
        <Image 
          source={require('../assets/tangy_logo.png')}
          style={{ height: 50, marginLeft: 10, marginBottom: 5 }}
        />
        <Appbar.Action 
          icon='account-circle' 
          size={45} 
          color={theme.colors.text} 
          onPress={() => navigation.navigate('Profile')}
        />
      </Appbar.Header>
    </PaperProvider>
  );
}

export default TopNavBar;
