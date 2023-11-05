import React, { useState } from 'react';
import { theme, progressStyles } from '../styles/Theme';
import { groupStyles } from '../styles/GroupStyles';
import { Image, View, ScrollView } from 'react-native';
import { PaperProvider, Searchbar, Text, TextInput } from 'react-native-paper';
import TitleTopBar from '../components/TitleTopBar';
import FriendCard from '../components/FriendCard';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';

// TODO: Add error prevention alert before quitting flow

/**
 * Beginning of new group creation workflow
 * @param {*} navigation 
 * @returns 
 */
const CreateNewGroup = ({ navigation }) => {
  const [name, setName] = useState('');
  const [friendSearch, setSearch] = useState('');

  return (
    <PaperProvider theme={theme}>
      <TitleTopBar backAction={() => navigation.navigate('Events')} title={'Return Home'} />
      <View style={{ width: '100%', height: '88%', backgroundColor: '#FFFFFF' }}>
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
                  source={require('../assets/wave.png')}
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
                  marginTop: '5%'
                }}
                value={name}
                onChangeText={e => setName(e)}
              />
            </View>
          </ProgressStep>
          <ProgressStep 
            label='Group Members'
            previousBtnText='Back'
            nextBtnTextStyle={{ color: theme.colors.text }}
            previousBtnTextStyle={{ color: theme.colors.text }}
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
                  source={require('../assets/wave.png')}
                  style={groupStyles.imageStyle}
                />
              </View>
              <Searchbar 
                placeholder='Search'
                value={friendSearch}
                onChangeText={query => setSearch(query)}
                mode='bar'
              />
              <ScrollView>
                <FriendCard name={'Sam'} image={'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'} isCheckbox={true}/>
                <FriendCard name={'Sam'} image={'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'} isCheckbox={true}/>
              </ScrollView>
            </View>
          </ProgressStep>
          <ProgressStep 
            label='Confirm'
            previousBtnText='Back'
            finishBtnText='Confirm'
            nextBtnTextStyle={{ color: theme.colors.text }}
            previousBtnTextStyle={{ color: theme.colors.text }}
          >
            <View style={{ alignItems: 'center' }}>
              <Text>Confirm group creation</Text>
            </View>
          </ProgressStep>
        </ProgressSteps>
      </View>
    </PaperProvider>
  );
}

export default CreateNewGroup;
