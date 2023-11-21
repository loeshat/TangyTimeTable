import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { PaperProvider, Title } from 'react-native-paper';
import SettingsTitleTopBar from '../../../components/SettingsTitleTopBar';
import { theme } from '../../../styles/Theme';
import { Picker } from '@react-native-picker/picker';
import WarningAlert from '../../../components/Alert';
import { useFonts, Inter_400Regular } from '@expo-google-fonts/inter';
import { Raleway_400Regular } from '@expo-google-fonts/raleway';
import { Lusitana_400Regular } from '@expo-google-fonts/lusitana';
import { Jost_400Regular } from '@expo-google-fonts/jost';

/**
 * Display for user to view and change text size and font preferences
 * @param {*} navigation 
 * @returns 
*/
const TextSizeAndFont = ({ navigation }) => {
  // States for selected font and size options
  const [selectedFontSize, setSelectedFontSize] = useState('Medium');
  const [selectedFontFamily, setSelectedFontFamily] = useState('Inter_400Regular');
  const [selectedFont, setSelectedFont] = useState('Inter');

  // Disable save button if selected options are the default options
  const isButtonDisabled = selectedFontSize === 'Medium' && selectedFontFamily === 'Inter_400Regular';

  // Warning alert handling
  const [alertOpen, setAlertOpen] = useState(false);
  const displayAlert = () => setAlertOpen(true);
  const closeAlert = () => setAlertOpen(false);

  // Database of fonts
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Raleway_400Regular,
    Lusitana_400Regular,
    Jost_400Regular,
  });

  // Return null if fonts have not finished loading into the environment
  if (!fontsLoaded) {
    return null;
  };

  // Handle updating the selected text size
  const handleFontSizeChange = (itemValue) => {
    setSelectedFontSize(itemValue);
  };

  // Handle updating the selected text font
  const handleFontFamilyChange = (itemValue) => {
    setSelectedFontFamily(itemValue);
    setSelectedFont(itemValue.replace('_400Regular', ''));
  };

  // Database of style font sizes for each option
  const getSelectedValueFontSize = () => {
    switch (selectedFontSize) {
      case 'Small':
        return 10;
      case 'Medium':
        return 16;
      case 'Large':
        return 25;
      default:
        return 16;
    }
  };

  // Handle submit button pressed
  const submitChanges = () => {
    // Return to settings when changes confirmed
    closeAlert();
    navigation.navigate('Settings');
  };

  return (
    <PaperProvider theme={theme} style={styles.container}>
      <SettingsTitleTopBar
        backAction={() => navigation.navigate('Settings')}
        backActionTitle={'Return to Settings'}
      />
      <WarningAlert
        description={`You are updating your text prefrences.`}
        affirmText={'Confirm'}
        affirmAction={submitChanges}
        affirmContentStyle={{ width: 125 }}
        cancelAction={closeAlert}
        closeAction={closeAlert}
        visible={alertOpen}
      />
      <View style={styles.contentContainer}>
        <Title style={styles.title}>Update Text Size:</Title>
        <View style={styles.pickerContainer}>
          <View style={styles.pickerWheel}>
            <Picker
              selectedValue={selectedFontSize}
              style={styles.picker}
              itemStyle={styles.pickerItem}
              onValueChange={handleFontSizeChange}
            >
              <Picker.Item label="Small" value="Small" />
              <Picker.Item label="Medium" value="Medium" />
              <Picker.Item label="Large" value="Large" />
            </Picker>
          </View>
          <View style={styles.selectedTextContainer}>
            <Text style={[styles.selectedValue, { fontSize: getSelectedValueFontSize() }]}>
              {selectedFontSize}
            </Text>
          </View>
        </View>

        <Title style={styles.title}>Update Font:</Title>
        <View style={styles.pickerContainer}>
            <View style={styles.pickerWheel}>
                <Picker
                selectedValue={selectedFontFamily}
                style={styles.picker}
                itemStyle={styles.pickerItem}
                onValueChange={handleFontFamilyChange}
                >
                  <Picker.Item label="Inter" value="Inter_400Regular" />
                  <Picker.Item label="Raleway" value="Raleway_400Regular" />
                  <Picker.Item label="Lusitana" value="Lusitana_400Regular" />
                  <Picker.Item label="Jost" value="Jost_400Regular" />
                </Picker>
            </View>
            <Text style={[styles.selectedValue, { fontFamily: selectedFontFamily }]}>
              {selectedFont}
            </Text>     
        </View>

        <Pressable 
          style={({ pressed }) => [
            { opacity: pressed ? 0.5 : 1 },
            styles.submitButton,
            isButtonDisabled && styles.disabledButton
            ]}
          onPress={!isButtonDisabled ? displayAlert : null}
          disabled={isButtonDisabled}
        >
            <Text style={styles.submitText} >Save Changes</Text>
        </Pressable>
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 6,
    padding: 20,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: theme.colors.text,
    paddingLeft: 20,
  },
  pickerContainer: {
    marginBottom: 20,
    padding: 20,
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  pickerWheel: {
    flex: 3,
    height: 150,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: 5,
    overflow: 'hidden',
  },
  selectedTextContainer: {
    marginTop: 10,
    flex: 1,
    justifyContent: 'center',
  },
  pickerLabel: {
    fontSize: 16,
    marginBottom: 10,
    color: theme.colors.text,
  },
  picker: {
    width: '100%',
    color: theme.colors.text,
    paddingBottom: 10,
  },
  pickerItem: {
    color: theme.colors.text,
    paddingBottom: 10,
  },
  selectedValue: {
    marginLeft: 10,
    color: theme.colors.text,
    fontSize: 20,
  },
  submitButton: {
    backgroundColor: theme.colors.success,
    padding: 10,
    alignItems: "center",
    borderRadius: 30,
  },
  submitText: {
    color: "white",
    fontSize: 16,
    fontWeight: 'bold',
    padding: 5,
  },
  disabledButton: {
    backgroundColor: theme.colors.disabled,
  },
});

export default TextSizeAndFont;
