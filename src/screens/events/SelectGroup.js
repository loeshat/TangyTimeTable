import React from 'react';
import { theme } from '../../styles/Theme';
import { flowStyles } from '../../styles/FlowStyles';
import { Button, PaperProvider, Text } from 'react-native-paper';
import { View } from 'react-native';
import TitleTopBar from '../../components/TitleTopBar';

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
              height: 60
            }}
            labelStyle={{
              fontSize: 18,
            }}
            style={{
              width: 200,
              marginTop: '2%'
            }}
            onPress={createNewGroup}
          >
            A New Group
          </Button>
          {
            /** Map list of groups that the logged in user is a part of */
          }
        </View>
      </View>
    </PaperProvider>
  );
}

export default SelectGroupScreen;
