import React, { useState } from 'react';
import { theme } from '../../styles/Theme';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { PaperProvider, Text, Appbar, Button, TextInput } from 'react-native-paper';
import FriendCard from '../../components/FriendCard';
import { FriendsList } from '../../services/Data';

/**
 * Sign up flow
 * @param {*} navigation 
 * @returns 
 */

const SignUpFlow = ({ navigation }) => {
  const [friendStates, setFriendStates] = useState(new Array(FriendsList.length).fill(false));
  const [confirmDisabled, setDisabled] = useState(true);
  const handleFriendChange = (id, newState) => {
    const newStates = [...friendStates];
    newStates[id] = newState;
    setFriendStates(newStates);
    setDisabled(!newStates.some((state) => state === true));
  }

  return (
    <PaperProvider theme={theme}>
      <Appbar.Header
        style={{
          backgroundColor: '#f2f2f2',
          marginHorizontal: 30,
          zIndex: 2,
          justifyContent: 'space-between'
        }}>
        <Button
          icon='arrow-left'
          onPress={() => navigation.goBack()}
          style={{ backgroundColor: '#FFEBD0' }}
        />
        <TouchableOpacity style={styles.skipContainer}>
          <Text style={styles.skipText}>SKIP</Text>
          <Button
            icon='arrow-right'
            // onPress={() => implement skipping to next stage}
            style={{ backgroundColor: '#FFEBD0' }}
          />
        </TouchableOpacity>
      </Appbar.Header>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={styles.container}>
          <Text
            style={{
              color: theme.colors.text,
              fontWeight: 'bold',
              fontSize: 45,
              padding: 50,
            }}
          >
            Connect with your friends</Text>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchBar}
              placeholder="Search here..."
            />
            <TouchableOpacity
              onPress={() => { }}
              style={styles.selectAllButton}
            >
              <Text style={styles.buttonText}>Select All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            style={{
              display: 'inline-flex',
              height: 300,
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
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  skipContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignContent: 'center',
    flexDirection: 'row',
  },
  skipText: {
    color: theme.colors.primary,
    marginRight: 10,
    fontWeight: 'bold',
    paddingTop: 10,
  },
  container: {
    padding: 20,
    width: '100%',
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
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default SignUpFlow;