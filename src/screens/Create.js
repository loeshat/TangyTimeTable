import React from 'react';
import { theme } from '../styles/Theme';
import { View } from 'react-native';
import { Button, IconButton, Text, PaperProvider } from 'react-native-paper';

/**
 * Create pop-up modal, allowing user to move onto create new group or create new event screen
 * @param {*} navigation 
 * @returns 
 */
const Create = ({ navigation }) => {
  const newGroupNavigate = () => {
    navigation.goBack();
    navigation.navigate('Create New Group');
  }
  const newEventNavigate = () => {
    navigation.goBack();
    navigation.navigate('Create New Event');
  }
  return (
    <PaperProvider theme={theme}>
      <View 
        style={{ 
          alignItems: 'flex-end', 
          marginTop: '5%', 
          marginRight: '2%' 
        }}
      >
        <IconButton 
          icon='close'
          iconColor={theme.colors.text}
          onPress={() => navigation.navigate('Events')}
        />
      </View>
      <View style={{ marginLeft: '7%' }}>
        <Text 
          variant='displayMedium'
          style={{
            color: theme.colors.text,
            fontWeight: '500'
          }}
        >
          Create New
        </Text>
        <Button
          mode='contained'
          labelStyle={{
            fontSize: 20
          }}
          style={{
            width: '70%',
            marginTop: '5%'
          }}
          contentStyle={{
            height: 60
          }}
          onPress={newGroupNavigate}
        >
          Create New Group
        </Button>
        <Button
          mode='contained'
          buttonColor={theme.colors.success}
          labelStyle={{
            fontSize: 20
          }}
          style={{
            width: '70%',
            marginTop: '5%'
          }}
          contentStyle={{
            height: 60
          }}
          onPress={newEventNavigate}
        >
          Create New Event
        </Button>
      </View>
    </PaperProvider>
  );
}

export default Create;