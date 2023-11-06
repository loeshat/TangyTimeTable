import React, { useState } from 'react';
import { theme, progressStyles } from '../../styles/Theme';
import { groupStyles } from '../../styles/GroupStyles';
import { Image, View, ScrollView } from 'react-native';
import { Button, Dialog, PaperProvider, Portal, Searchbar, Text, TextInput } from 'react-native-paper';
import TitleTopBar from '../../components/TitleTopBar';
import FriendCard from '../../components/FriendCard';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { FriendsList } from '../../services/Data';

/**
 * Beginning of new group creation workflow
 * @param {*} navigation 
 * @returns 
 */
const CreateNewGroup = ({ navigation }) => {
  // Alert state handling
  const [alertOpen, setAlertOpen] = useState(false);
  const displayAlert = () => setAlertOpen(true);
  const closeAlert = () => setAlertOpen(false);
  const returnHome = () => {
    closeAlert();
    navigation.navigate('Events');
  }

  // Group related states
  const [name, setName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const onChangeSearch = query => setSearchQuery(query);

  // Friend selection state handling
  const initialStates = Array.from({ length: FriendsList.length }, () => false);
  const [friendStates, setFriendStates] = useState(initialStates);
  const [confirmDisabled, setDisabled] = useState(true);
  const handleFriendChange = (id, newState) => {
    const newStates = [...friendStates];
    newStates[id] = newState;
    setFriendStates(newStates);
    setDisabled(!newStates.some((state) => state === true));
  }

  // New Group data
  const createGroup = () => {
    const members = friendStates.map((state, id) => (state ? FriendsList[id].userId : null))
                    .filter(id => id !== null && id !== undefined);
    console.log(name, members); // To modify to actually store data
    navigation.navigate('Confirm Group', { name: name });
  }

  return (
    <PaperProvider theme={theme}>
      <TitleTopBar backAction={displayAlert} title={'Return Home'} />
      <View style={groupStyles.screen}>
        <Portal>
          <Dialog 
            visible={alertOpen} 
            onDismiss={closeAlert}
            style={{
              backgroundColor: theme.colors.background
            }}
          >
            <Dialog.Title
              style={{
                color: theme.colors.primary,
                fontWeight: '500'
              }}
            >
              Warning
            </Dialog.Title>
            <Dialog.Content>
              <Text
                variant='bodyLarge'
              >
                You will lose all your group creation progress. Are you sure?
              </Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button
                mode='outlined'
                textColor={theme.colors.text}
                onPress={closeAlert}
                style={{
                  borderColor: theme.colors.text
                }}
                contentStyle={{
                  width: 80
                }}
              >
                Cancel
              </Button>
              <Button
                mode='contained'
                onPress={returnHome}
                contentStyle={{
                  width: 125
                }}
              >
                Return Home
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        <ProgressSteps {...progressStyles}>
          <ProgressStep 
            label='Group Name'
            nextBtnTextStyle={{ color: theme.colors.text }}
            nextBtnDisabled={!name}
          >
            <View style={{ alignItems: 'center' }}>
              <View 
                style={[groupStyles.outerSpeech, {
                  marginRight: '30%',
                  marginTop: '10%' 
                }]}
              >
                <View 
                  style={[groupStyles.speechContainer, {  
                    width: 175,
                    marginBottom: 10,
                  }]}
                >
                  <Text
                    variant='bodyLarge'
                    style={{ color: theme.colors.text }}
                  >
                    What would you like to name the group?
                  </Text>
                </View>
              </View>
              <View 
                style={[groupStyles.imageContainer, {
                  marginLeft: '30%'
                }]}
              >
                <Image 
                  source={require('../../assets/wave.png')}
                  style={groupStyles.imageStyle}
                />
              </View>
              <TextInput 
                label='Group Name'
                mode='outlined'
                outlineColor={theme.colors.text}
                textColor={theme.colors.text}
                style={{ 
                  width: '70%',
                  marginTop: '5%',
                  backgroundColor: theme.colors.surface
                }}
                value={name}
                onChangeText={e => setName(e)}
              />
            </View>
          </ProgressStep>
          <ProgressStep 
            label='Group Members'
            previousBtnText='Back'
            finishBtnText='Confirm'
            nextBtnTextStyle={{ color: theme.colors.text }}
            previousBtnTextStyle={{ color: theme.colors.text }}
            nextBtnDisabled={confirmDisabled}
            onSubmit={createGroup}
          >
            <View style={{ alignItems: 'center' }}>
              <View
                style={[groupStyles.outerSpeech, {
                  marginRight: '20%',
                  marginTop: '2%'
                }]}
              >
                <View
                  style={[groupStyles.speechContainer, {
                    width: 200
                  }]}
                >
                  <Text
                    variant='bodyLarge'
                    style={{ color: theme.colors.text }}
                  >
                    Who do you want to add to {name}?
                  </Text>
                </View>
              </View>
              <View 
                style={[groupStyles.imageContainer, {
                  marginLeft: '20%'
                }]}
              >
                <Image 
                  source={require('../../assets/wave.png')}
                  style={groupStyles.imageStyle}
                />
              </View>
              <Searchbar 
                placeholder='Search...'
                onChangeText={onChangeSearch}
                value={searchQuery}
                style={{
                  width: 375,
                  backgroundColor: theme.colors.background,
                  marginTop: 10
                }}
              />
              <ScrollView
                style={{
                  display: 'inline-flex',
                  height: 300
                }}
              >
                {
                  FriendsList.map((item, index) => (
                    <FriendCard 
                      key={index}
                      name={item.name}
                      image={item.image}
                      isCheckbox={true}
                      onChange={(newState) => handleFriendChange(index, newState)}
                    />
                  ))
                }
              </ScrollView>
            </View>
          </ProgressStep>
        </ProgressSteps>
      </View>
    </PaperProvider>
  );
}

export default CreateNewGroup;
