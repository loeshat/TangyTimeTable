import React from 'react';
import { theme } from '../../styles/Theme';
import { View, StyleSheet } from 'react-native';
import { PaperProvider, Text } from 'react-native-paper';
import SignUpTopBar from '../../components/SignUpTopBar';

/**
 * Sign up flow
 * @param {*} navigation 
 * @returns 
 */

const AddLocation = ({ navigation }) => {
  return (
    <PaperProvider theme={theme}>
      <SignUpTopBar
        navigation={navigation}
        section='Add Location' />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={styles.container}>
          <Text style={styles.title}>
            Add your location</Text>
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
});

export default AddLocation;