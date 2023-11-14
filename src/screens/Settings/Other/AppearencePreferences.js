import React, { useState } from "react";
import TitleTopBar from "../../../components/TitleTopBar";
import { PaperProvider } from "react-native-paper";
import { theme } from "../../../styles/Theme";
import { View, Text, Switch, StyleSheet } from "react-native";


const AppearencePreferences = ({ navigation }) => {
    const [darkMode, setDarkMode] = useState(false);
    const [highContrastMode, setHighContrastMode] = useState(false);
    const [gifsAndAnimations, setGifsAndAnimations] = useState(true);

    const toggleSwitch = (option) => {
        switch (option) {
          case 'darkMode':
            setDarkMode(!darkMode);
            break;
          case 'highContrastMode':
            setHighContrastMode(!highContrastMode);
            if (!highContrastMode) {
                navigation.navigate('SettingsRoutes', { screen: 'HighContrast' });
                setHighContrastMode(false);
            }
            break;
          case 'gifsAndAnimations':
            setGifsAndAnimations(!gifsAndAnimations);
            break;
          default:
            break;
        }
    };

    return (
        <PaperProvider theme={theme}>
            <TitleTopBar
                backAction={() => navigation.navigate('Settings')}
                title={'Return to Settings'}
            />
            <View style={styles.contentContainer}>
                <Text style={styles.title}>Update Appearence Preferences</Text>
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

const OptionToggle = ({ label, value, onToggle }) => {
    return (
      <View style={[styles.notificationOption, { backgroundColor: value ? theme.colors.background : theme.colors.surface }]}>
        <Text style={[styles.optionText, { color: theme.colors.text, fontWeight: value ? "bold" : "normal" }]}>{label}</Text>
        <Switch
          value={value}
          onValueChange={onToggle}
          trackColor={{ false: theme.colors.disabled, true: theme.colors.primary }}
          thumbColor={value ? '#fff' : '#fff'}
        />
      </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      justifyContent: 'center',
    },
    contentContainer: {
        flex: 6,
        padding: 20,
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
    optionText: {
      fontSize: 16,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 16,
        padding: 10,
        color: theme.colors.text,
    },
});

export default AppearencePreferences;