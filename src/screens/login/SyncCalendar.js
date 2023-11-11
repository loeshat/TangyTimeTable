import React, { useState } from 'react';
import { theme } from '../../styles/Theme';
import { loginStyles } from '../../styles/LoginStyles';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { PaperProvider, Text, Divider, TextInput } from 'react-native-paper';
import SignUpTopBar from '../../components/SignUpTopBar';

/**
 * Sign up flow
 * @param {*} navigation 
 * @returns 
 */

const SyncCalendar = ({ navigation }) => {
  const [calendarLink, setCalendarLink] = useState('');
  const [selectedCalendar, setSelectedCalendar] = useState(null);
  const [hasTextInput, setHasTextInput] = useState(false);

  const calendarMethods = [
    { name: 'Google', color: 'lightgreen', icon: require('../../assets/google.png') },
    { name: 'Outlook', color: 'lightblue', icon: require('../../assets/outlook.png') },
    { name: 'Apple', color: 'lightgrey', icon: require('../../assets/apple.png') },
  ];

  const highlightCalendar = (name) => {
    if (hasTextInput) setSelectedCalendar(null)
    else setSelectedCalendar(name);
  }

  const handleSyncCalendar = () => {
    // Not included in the data base because of MVP. Now only navigates to the next stage
    navigation.navigate('LoginRoutes', { screen: 'Add Location' });
  }

  return (
    <PaperProvider theme={theme}>
      <SignUpTopBar
        navigation={navigation}
        section='Sync Calendar' />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={styles.container}>
          <Text style={styles.title}>
            Sync your calendar</Text>
          {calendarMethods.map((account) => (
            <TouchableOpacity
              key={account.name}
              onPress={() => highlightCalendar(account.name)}
              style={[
                styles.smContainer,
                { backgroundColor: account.name === selectedCalendar ? theme.colors.primary : account.color }
              ]}
            >
              <Image source={account.icon} style={{ height: 25, width: 25 }} />
              <Text style={{ fontSize: 16 }}>Continue with {account.name}</Text>
            </TouchableOpacity>
          ))}
          <Divider style={loginStyles.divider}>
            <Text style={loginStyles.dividerText}>or</Text>
          </Divider>
          <TextInput
            label='iCal Link...'
            value={calendarLink}
            onChangeText={(text) => {
              setCalendarLink(text);
              setHasTextInput(text.length > 0);
              highlightCalendar();
            }}
            style={styles.input}
          />
          <TouchableOpacity
            style={[
              loginStyles.buttonPrimary,
              { opacity: !selectedCalendar && !hasTextInput ? 0.3 : 1 },
            ]}
            onPress={handleSyncCalendar}
            disabled={!selectedCalendar && !hasTextInput}
          >
            <Text style={loginStyles.buttonPrimaryText}>SYNC CALENDAR</Text>
          </TouchableOpacity>
        </View>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: '80%',
  },
  input: {
    marginBottom: 10,
    backgroundColor: 'white',
  },
  title: {
    color: theme.colors.text,
    fontWeight: 'bold',
    fontSize: 40,
    textAlign: 'left',
    padding: 20,
  },
  smContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 20,
    margin: 10,
    borderRadius: 10,
  },
});

export default SyncCalendar;