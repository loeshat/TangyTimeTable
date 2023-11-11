import React, { useState } from 'react';
import { theme } from '../../styles/Theme';
import { loginStyles } from '../../styles/LoginStyles';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { PaperProvider, Text, TextInput } from 'react-native-paper';
import FriendCard from '../../components/FriendCard';
import { FriendsList } from '../../services/Data';
import SignUpTopBar from '../../components/SignUpTopBar';

/**
 * Sign up flow
 * @param {*} navigation 
 * @returns 
 */

const ConnectFriends = ({ navigation }) => {
  const [friendStates, setFriendStates] = useState(new Array(FriendsList.length).fill(false));
  const [confirmDisabled, setDisabled] = useState(false);
  const handleFriendChange = (id, newState) => {
    const newStates = [...friendStates];
    newStates[id] = newState;
    setFriendStates(newStates);
    setDisabled(newStates.some(state => state === true));
  }
  const selectAll = () => {
    // doesn't work at the moment
    const newStates = new Array(FriendsList.length).fill(true);
    setFriendStates(newStates);
    setDisabled(true);
  }

  const handleAddFriends = () => {
    // Not included in the data base because of MVP. Now only navigates to the next stage
    navigation.navigate('LoginRoutes', { screen: 'Sync Calendar' });
  }

  return (
    <PaperProvider theme={theme}>
      <SignUpTopBar
        navigation={navigation}
        section='Connect Friends' />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={styles.container}>
          <Text
            style={{
              color: theme.colors.text,
              fontWeight: 'bold',
              fontSize: 45,
              padding: 30,
            }}
          >
            Connect with your friends</Text>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchBar}
              placeholder="Search here..."
            />
            <TouchableOpacity
              onPress={selectAll}
              style={styles.selectAllButton}
            >
              <Text style={loginStyles.buttonPrimaryText}>Select All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            style={{
              display: 'inline-flex',
              height: 320,
            }}
          >
            {
              FriendsList.map((item, index) => (
                <FriendCard
                  key={index}
                  name={item.name}
                  image={item.image}
                  isCheckbox={true}
                  onChange={(newState) => {
                    handleFriendChange(index, newState)
                  }}
                />
              ))
            }
          </ScrollView>
          <TouchableOpacity
            style={[
              loginStyles.buttonPrimary,
              { opacity: !confirmDisabled ? 0.3 : 1 },
            ]}
            onPress={handleAddFriends}
            disabled={!confirmDisabled}
          >
            <Text style={loginStyles.buttonPrimaryText}>ADD FRIENDS</Text>
          </TouchableOpacity>
        </View>
      </View>
    </PaperProvider >
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: '90%',
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  searchBar: {
    flex: 1,
    borderWidth: 1,
    marginRight: 10,
    borderRadius: 5,
    paddingLeft: 10,
    backgroundColor: 'white',
  },
  selectAllButton: {
    backgroundColor: '#7ac1a9',
    padding: 10,
    height: 60,
    width: 100,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ConnectFriends;