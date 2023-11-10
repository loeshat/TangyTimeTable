import React from 'react';
import { theme } from '../../styles/Theme';
import { flowStyles } from '../../styles/FlowStyles';
import { Button, PaperProvider, Text } from 'react-native-paper';
import { View } from 'react-native';
import TitleTopBar from '../../components/TitleTopBar';
import GroupCard from '../../components/GroupCard';

const SelectGroupScreen = ({ navigation }) => {
  const returnHome = () => navigation.navigate('Events');
  const createNewGroup = () => navigation.navigate('GroupRoutes', { screen: 'Create New Group' });
  return (
    <PaperProvider theme={theme}>
      <TitleTopBar backAction={returnHome} title={'Return Home'} />
      <View style={flowStyles.screen}>
        <View 
          style={{
            marginLeft: '5%',
            marginTop: '2%'
          }}
        >
          <Text 
            variant='headlineMedium'
            style={{
              color: theme.colors.text,
              fontWeight: '500',
            }}
          >
            Create New Event with...
          </Text>
          <Button
            icon='plus'
            mode='contained'
            contentStyle={{
              height: 50
            }}
            labelStyle={{
              fontSize: 18,
            }}
            style={{
              width: '90%',
              marginTop: '3%',
              marginBottom: '2%',
              borderRadius: 12,
            }}
            onPress={createNewGroup}
          >
            A New Group
          </Button>
          {
            /** 
             * Map list of groups that the logged in user is a part of 
             * Will need group ID passed through for appropriate new event
             * creation handling
            */
          }
        </View>
      </View>
    </PaperProvider>
  );
}

export default SelectGroupScreen;
