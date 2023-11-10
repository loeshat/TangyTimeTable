import React, { useState } from 'react';
import { theme, progressStyles } from '../../styles/Theme';
import { flowStyles } from '../../styles/FlowStyles';
import { Image, View, ScrollView } from 'react-native';
import { PaperProvider, Searchbar, Text, TextInput } from 'react-native-paper';
import TitleTopBar from '../../components/TitleTopBar';
import FriendCard from '../../components/FriendCard';
import WarningAlert from '../../components/Alert';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { FriendsList } from '../../services/Data';
import { addGroup, clearGroups } from '../../services/StoreService';

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

  // Friends list search handling - note that search is NOT functional
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
  const createGroup = async () => {
    await clearGroups(); // to keep DB clean while testing, remove later
    const members = friendStates.map((state, id) => (state ? FriendsList[id].userId : null))
                    .filter(id => id !== null && id !== undefined);
    // TODO: Add currently logged in user into list of group members
    const groupBody = {
      name: name,
      members: members,
    }
    const groupId = await addGroup(groupBody);
    console.log(groupId, groupBody);
    navigation.navigate('Confirm Group', { name, groupId });
  }

  return (
    <PaperProvider theme={theme}>
      <TitleTopBar backAction={displayAlert} title={'Return Home'} />
      <View style={flowStyles.screen}>
        <WarningAlert 
          description={'You will lose all your group creation progress. Are you sure?'}
          affirmText={'Return Home'}
          affirmAction={returnHome}
          affirmContentStyle={{ width: 125 }}
          cancelAction={closeAlert}
          closeAction={closeAlert}
          visible={alertOpen}
        />
        <ProgressSteps {...progressStyles}>
          <ProgressStep 
            label='Group Name'
            nextBtnTextStyle={{ color: theme.colors.text }}
            nextBtnDisabled={!name}
          >
            <View style={{ alignItems: 'center' }}>
              <View 
                style={[flowStyles.outerSpeech, {
                  marginRight: '30%',
                  marginTop: '10%' 
                }]}
              >
                <View 
                  style={[flowStyles.speechContainer, {  
                    width: 175,
                    marginBottom: 10,
                  }]}
                >
                  <Text
                    variant='bodyLarge'
                    style={{ color: theme.colors.text }}
                  >
                    Let's name your group!
                  </Text>
                </View>
              </View>
              <View 
                style={[flowStyles.imageContainer, {
                  marginLeft: '30%'
                }]}
              >
                <Image 
                  source={require('../../assets/wave.png')}
                  style={flowStyles.imageStyle}
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
                style={[flowStyles.outerSpeech, {
                  marginRight: '20%',
                  marginTop: '2%'
                }]}
              >
                <View
                  style={[flowStyles.speechContainer, {
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
                style={[flowStyles.imageContainer, {
                  marginLeft: '20%'
                }]}
              >
                <Image 
                  source={require('../../assets/wave.png')}
                  style={flowStyles.imageStyle}
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
