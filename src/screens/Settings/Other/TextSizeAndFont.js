import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PaperProvider, Title, Button } from 'react-native-paper';
import TitleTopBar from '../../../components/TitleTopBar';
import { theme } from '../../../styles/Theme';
import { Picker } from '@react-native-picker/picker';
import * as Font from 'expo-font';

const TextSizeAndFont = ({ navigation }) => {
  const [selectedFontSize, setSelectedFontSize] = useState('medium');
  const [selectedFontFamily, setSelectedFontFamily] = useState('sans-serif');

  Font.loadAsync({
    'Josefin-Sans': require('./assets/fonts/Josefin_Sans/static/JosefinSans-Regular.ttf'),
    'Josefin-Sans-Bold': require('./assets/fonts/Josefin_Sans/static/JosefinSans-Bold.ttf'),
    'Pixelfy-Sans': require('./assets/fonts/Pixelify_Sans/static/PixelifySans-Regular.ttf'),
    'Pixelfy-Sans-Bold': require('./assets/fonts/Pixelify_Sans/static/PixelifySans-Bold.ttf'),
  });

  const handleFontSizeChange = (itemValue) => {
    setSelectedFontSize(itemValue);
  };

  const handleFontFamilyChange = (itemValue) => {
    setSelectedFontFamily(itemValue);
  };

  const getSelectedValueFontSize = () => {
    switch (selectedFontSize) {
      case 'small':
        return 10;
      case 'medium':
        return 16;
      case 'large':
        return 25;
      default:
        return 16;
    }
  };

  const handleSubmit = () => {
    // Handle the submission of text size and font changes
    console.log('Text size:', selectedFontSize);
    console.log('Font family:', selectedFontFamily);
  };

  return (
    <PaperProvider theme={theme} style={styles.container}>
      <TitleTopBar
        backAction={() => navigation.navigate('Settings')}
        title={'Return to Settings'}
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
              <Picker.Item label="Small" value="small" />
              <Picker.Item label="Medium" value="medium" />
              <Picker.Item label="Large" value="large" />
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
                <Picker.Item label="Sans-serif" value="sans-serif" />
                <Picker.Item label="Josefin-Sans" value="Josefin-Sans" />
                <Picker.Item label="Pixelfy-Sans" value="Pixelfy-Sans" />
                </Picker>
            </View>
            <Text style={[styles.selectedValue, { fontFamily: selectedFontFamily }]}>
              {selectedFontFamily}
            </Text>     
        </View>

        <Button
          mode="contained"
          onPress={handleSubmit}
          style={styles.submitButton}
        >
          Save Changes
        </Button>
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
    height: 150, // Adjust the height as needed
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
  },
  submitButton: {
    backgroundColor: theme.colors.primary,
    marginTop: 20,
  },
});

export default TextSizeAndFont;
