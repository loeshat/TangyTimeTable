import React, { useState } from 'react';
import { theme } from '../../styles/Theme';
import { loginStyles } from '../../styles/LoginStyles';
import { View, TouchableOpacity } from 'react-native';
import { PaperProvider, Text, Button, TextInput } from 'react-native-paper';
import SignUpTopBar from '../../components/SignUpTopBar';
import WarningAlert from '../../components/Alert'

/**
 * Add Location screen of the sign up flow
 * @param {*} navigation 
 * @returns 
 */

const AddLocation = ({ navigation }) => {
  // for the tipbit on why we take your location
  const [alertOpen, setAlertOpen] = useState(false);
  const [location, setLocation] = useState('');
  const [hasTextInput, setHasTextInput] = useState(false);
  const displayAlert = () => setAlertOpen(true);
  const closeAlert = () => setAlertOpen(false);

  return (
    <PaperProvider theme={theme}>
      <SignUpTopBar
        navigation={navigation}
        section='Add Location' />
      <WarningAlert
        description={`We're asking you for your suburb and postcode so that we can suggest activity locations nearby your whereabouts to minimise your travel time to events!`}
        affirmText={'Ok'}
        affirmAction={closeAlert}
        affirmContentStyle={{ width: 125 }}
        cancelAction={closeAlert}
        closeAction={closeAlert}
        visible={alertOpen}
      />
      <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#FFFFFF' }}>
        <View style={{ padding: 20, width: '90%' }}>
          <TouchableOpacity onPress={displayAlert}>
            <Text style={loginStyles.title}>
              Add your location<Button icon={'comment-question'} /></Text>
          </TouchableOpacity>
          <TextInput
            label='Suburb, Postcode'
            value={location}
            onChangeText={(text) => {
              setLocation(text);
              setHasTextInput(text.length > 0);
              if (location === '') setHasTextInput(false);
            }}
            style={loginStyles.input}
          />
          <TouchableOpacity
            style={[
              loginStyles.buttonPrimary,
              { opacity: !hasTextInput ? 0.3 : 1 },
            ]}
            onPress={() => { navigation.navigate('LoginRoutes', { screen: 'Final Sign Up Confirmation' }) }}
            disabled={!hasTextInput}
          >
            <Text style={loginStyles.buttonPrimaryText}>SAVE LOCATION</Text>
          </TouchableOpacity>
        </View>
      </View>
    </PaperProvider>
  );
}

export default AddLocation;