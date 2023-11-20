import React, { useState, useEffect } from "react";
import TitleTopBarDark from "../../../components/TitleTopBarDark";
import { PaperProvider } from "react-native-paper";
import { theme, invertedTheme } from "../../../styles/Theme";
import { View, Text, Switch, StyleSheet } from "react-native";


const AppearencePreferences = ({ navigation }) => {
    const [darkMode, setDarkMode] = useState(false);
    const [highContrastMode, setHighContrastMode] = useState(false);
    const [gifsAndAnimations, setGifsAndAnimations] = useState(true);
    const [displayTheme, setDisplayTheme] = useState(theme);

    // const isDark = highContrastMode === invertedTheme;

    useEffect(() => {
      setDisplayTheme(highContrastMode ? invertedTheme : theme);
  }, [highContrastMode]);

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
    const OptionToggle = ({ label, value, onToggle }) => {
      return (
        <View
          style={[
            highContrastMode && styles.notificationOptionDark,
            styles.notificationOption,
            { backgroundColor: value ? displayTheme.colors.APbuttonOn : displayTheme.colors.APbuttonOff },
          ]}
        >
          <Text
            style={[
              styles.optionText,
              { color: value? displayTheme.colors.APtextOn : displayTheme.colors.APtextOff, fontWeight: value ? "bold" : "normal" },
            ]}
          >
            {label}
          </Text>
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
            
            <View style={highContrastMode ? styles.contentContainerDark : styles.contentContainer}>
                <Text style={highContrastMode ? styles.titleDark : styles.title}>Update Appearence Preferences</Text>
                <OptionToggle
                    label="Dark Mode"
                    value={darkMode}
                    onToggle={() => toggleSwitch('darkMode')}
                />

                <OptionToggle
                    label="High Contrast Mode"
                    value={highContrastMode}
                    onToggle={() => toggleSwitch('highContrastMode')}
                />

                <OptionToggle
                    label="Gifs and Animations"
                    value={gifsAndAnimations}
                    onToggle={() => toggleSwitch('gifsAndAnimations')}
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