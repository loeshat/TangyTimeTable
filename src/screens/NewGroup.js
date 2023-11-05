import React, { useState } from 'react';
import { theme, progressStyles } from '../styles/Theme';
import { groupStyles } from '../styles/GroupStyles';
import { Image, View, ScrollView } from 'react-native';
import { Button, PaperProvider, Searchbar, Text, TextInput } from 'react-native-paper';
import TitleTopBar from '../components/TitleTopBar';
import FriendCard from '../components/FriendCard';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { FriendsList } from '../services/Data';

// TODO: Add error prevention alert before quitting flow
// TODO: Disable next button if no friends has been selected
// TODO: Look into making search functional
// TODO: Add functionality to confirm stage's buttons

/**
 * Beginning of new group creation workflow
 * @param {*} navigation 
 * @returns 
 */
const CreateNewGroup = ({ navigation }) => {
  const [name, setName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const onChangeSearch = query => setSearchQuery(query);

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
                    />
                  ))
                }
              </ScrollView>
            </View>
          </ProgressStep>
          <ProgressStep 
            label='Confirm'
            previousBtnText='Back'
            finishBtnText=''
            previousBtnTextStyle={{ color: theme.colors.text }}
          >
            <View style={{ alignItems: 'center' }}>
              <View
                style={[groupStyles.outerSpeech, {
                  marginTop: '10%'
                }]}
              >
                <View
                  style={[groupStyles.speechContainer, {
                    width: 200,
                    marginRight: '12%'
                  }]}
                >
                  <Text
                    variant='bodyLarge'
                    style={{ color: theme.colors.text }}
                  >
                    Your group {name} has been successfully created! 
                    Do you want to plan an event for the group?
                  </Text>
                </View>
              </View>
              <View
                style={[groupStyles.imageContainer, {
                  marginLeft: '23%'
                }]}
              >
                <Image 
                  source={require('../assets/wave.png')}
                  style={groupStyles.imageStyle}
                />
              </View>
              <Button
                mode='contained'
                labelStyle={{ 
                  fontSize: 20
                }}
                contentStyle={{ 
                  height: 60,
                  width: 200
                }}
                style={{
                  marginTop: 30
                }}
              >
                Plan an Event
              </Button>
              <Button
                mode='contained'
                buttonColor={theme.colors.success}
                labelStyle={{ 
                  fontSize: 20
                }}
                contentStyle={{ 
                  height: 60,
                  width: 200
                }}
                style={{
                  marginTop: 20
                }}
              >
                See my Group
              </Button>
            </View>
          </ProgressStep>
        </ProgressSteps>
      </View>
    </PaperProvider>
  );
}

export default CreateNewGroup;
