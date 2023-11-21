import React, { useState, useEffect } from "react";
import TitleTopBarDark from "../../../components/TitleTopBarDark";
import { PaperProvider, Button } from "react-native-paper";
import { theme, invertedTheme } from "../../../styles/Theme";
import { View, Text, Switch, StyleSheet, TouchableOpacity } from "react-native";
import WarningAlert from '../../../components/Alert';

/**
 * Display for user to view and change appearance preferences
 * @param {*} navigation 
 * @returns 
*/
const AppearencePreferences = ({ navigation }) => {
  // Save state for whether each field is toggled
  const [darkMode, setDarkMode] = useState(false);
  const [highContrastMode, setHighContrastMode] = useState(false);
  const [gifsAndAnimations, setGifsAndAnimations] = useState(true);
  const [displayTheme, setDisplayTheme] = useState(theme);

  // Handle warning alert for tipbits: Dark Mode
  const [alertDark, setAlertDark] = useState(false);
  const displayAlertDark = () => setAlertDark(true);
  const closeAlertDark = () => setAlertDark(false);
  // Handle warning alert for tipbits: High Contrast Mode
  const [alertHighContrast, setAlertHighContrast] = useState(false);
  const displayAlertHighContrast = () => setAlertHighContrast(true);
  const closeAlertHighContrast = () => setAlertHighContrast(false);
  // Handle warning alert for tipbits: Gifs and Animations
  const [alertAnimations, setAlertAnimations] = useState(false);
  const displayAlertAnimations = () => setAlertAnimations(true);
  const closeAlertAnimations = () => setAlertAnimations(false);

  // When High Contrast is toggled, change the theme accordingly
  useEffect(() => {
    setDisplayTheme(highContrastMode ? invertedTheme : theme);
  }, [highContrastMode]);

  // Update toggle states for each field
  const toggleSwitch = (option) => {
      switch (option) {
        case 'darkMode':
          setDarkMode(!darkMode);
          break;
        case 'highContrastMode':
          setHighContrastMode(!highContrastMode);
          break;
        case 'gifsAndAnimations':
          setGifsAndAnimations(!gifsAndAnimations);
          break;
        default:
          break;
      }
  };

  // The toggle component that adapts view based on the state of the field
  const OptionToggle = ({ label, value, onToggle, displayAlert }) => {
    return (
      <View
        style={[
          highContrastMode && styles.notificationOptionDark,
          styles.notificationOption,
          { backgroundColor: value ? displayTheme.colors.APbuttonOn : displayTheme.colors.APbuttonOff },
        ]}
      >
        <TouchableOpacity onPress={displayAlert ? displayAlert : null}>
          <Text
            style={[
              styles.optionText,
              { color: value? displayTheme.colors.APtextOn : displayTheme.colors.APtextOff, fontWeight: value ? "bold" : "normal" },
            ]}
          >
            {label}<Button icon={'comment-question'} />
          </Text>
        </TouchableOpacity>
        
        <Switch
          value={value}
          onValueChange={onToggle}
          trackColor={{ true: displayTheme.colors.APtrackOn, false: displayTheme.colors.APtrackOff }}
          thumbColor={value ? displayTheme.colors.APthumbOn : displayTheme.colors.APthumbOff}
        />
      </View>
    );
  };

  return (
    <PaperProvider theme={displayTheme}>
      {highContrastMode ? 
        <TitleTopBarDark
          backAction={() => navigation.navigate('Settings')}
          title={'Return to Settings'}
          darkTheme={true}
        /> : 
        <TitleTopBarDark
          backAction={() => navigation.navigate('Settings')}
          title={'Return to Settings'}
          darkTheme={false}
        />
      }

      <WarningAlert
        description={`Dark mode offers a visually comfortable experience in low-light settings, appealing to users who prefer a darker interface.`}
        affirmText={'Ok'}
        affirmAction={closeAlertDark}
        affirmContentStyle={{ width: 125 }}
        cancelAction={closeAlertDark}
        closeAction={closeAlertDark}
        visible={alertDark}
      />
      <WarningAlert
        description={`High contrast enhances visibility by emphasizing color contrast, benefiting users who require or prefer a more distinct and easily readable interface.`}
        affirmText={'Ok'}
        affirmAction={closeAlertHighContrast}
        affirmContentStyle={{ width: 125 }}
        cancelAction={closeAlertHighContrast}
        closeAction={closeAlertHighContrast}
        visible={alertHighContrast}
      />

      <WarningAlert
        description={`GIFs and animations boost engagement with dynamic visuals, catering to users who prefer interactive and visually stimulating content.`}
        affirmText={'Ok'}
        affirmAction={closeAlertAnimations}
        affirmContentStyle={{ width: 125 }}
        cancelAction={closeAlertAnimations}
        closeAction={closeAlertAnimations}
        visible={alertAnimations}
      />
        
      <View style={highContrastMode ? styles.contentContainerDark : styles.contentContainer}>
        <Text style={highContrastMode ? styles.titleDark : styles.title}>Update Appearence Preferences</Text>
        <OptionToggle
          label="Dark Mode"
          value={darkMode}
          onToggle={() => toggleSwitch('darkMode')}
          displayAlert={displayAlertDark}
        />

        <OptionToggle
          label="High Contrast Mode"
          value={highContrastMode}
          onToggle={() => toggleSwitch('highContrastMode')}
          displayAlert={displayAlertHighContrast}
        />

        <OptionToggle
          label="Gifs and Animations"
          value={gifsAndAnimations}
          onToggle={() => toggleSwitch('gifsAndAnimations')}
          displayAlert={displayAlertAnimations}
        />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  contentContainer: {
      flex: 6,
      padding: 20,
      backgroundColor: theme.colors.APbackground,
  },
  contentContainerDark: {
    flex: 6,
    padding: 20,
    backgroundColor: invertedTheme.colors.background,
  },
  notificationOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  notificationOptionDark: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: invertedTheme.colors.surface,
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  optionText: {
    fontSize: 18,
  },
  title: {
      fontSize: 30,
      fontWeight: 'bold',
      marginBottom: 16,
      padding: 10,
      color: theme.colors.text,
  },
  titleDark: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 16,
    padding: 10,
    color: invertedTheme.colors.text,
  },
});

export default AppearencePreferences;