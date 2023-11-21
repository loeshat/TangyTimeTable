import React, { useState } from "react";
import SettingsTitleTopBar from "../../../components/SettingsTitleTopBar";
import { PaperProvider } from "react-native-paper";
import { theme } from "../../../styles/Theme";
import { View, Text, Switch, StyleSheet } from "react-native";

/**
 * Display for user to view and change notification preferences
 * @param {*} navigation 
 * @returns 
*/
const PushNotifications = ({ navigation }) => {
  // Save state for whether each field is toggled
  const [doNotDisturb, setDoNotDisturb] = useState(false);
  const [newFriendNotification, setNewFriendNotification] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [appPushNotifications, setAppPushNotifications] = useState(true);
  const [popupNotifications, setPopupNotifications] = useState(true);

  // Update toggle states for each field
  const toggleSwitch = (option) => {
      switch (option) {
        case 'doNotDisturb':
          setDoNotDisturb(!doNotDisturb);
          break;
        case 'newFriendNotification':
          setNewFriendNotification(!newFriendNotification);
          break;
        case 'emailNotifications':
          setEmailNotifications(!emailNotifications);
          break;
        case 'appPushNotifications':
          setAppPushNotifications(!appPushNotifications);
          break;
        case 'popupNotifications':
          setPopupNotifications(!popupNotifications);
          break;
        default:
          break;
      }
  };

  // The toggle component that adapts view based on the state of the field
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

  return (
    <PaperProvider theme={theme} style={styles.container}>
      <SettingsTitleTopBar
        backAction={() => navigation.navigate('Settings')}
        backActionTitle={'Return to Settings'}
      />

      <View style={styles.contentContainer}>
        <Text style={styles.title}>Update Notification Preferences</Text>
        <OptionToggle
          label="Do Not Disturb"
          value={doNotDisturb}
          onToggle={() => toggleSwitch('doNotDisturb')}
        />

        <OptionToggle
          label="New Friend Notification"
          value={newFriendNotification}
          onToggle={() => toggleSwitch('newFriendNotification')}
        />

        <OptionToggle
          label="Email Notifications"
          value={emailNotifications}
          onToggle={() => toggleSwitch('emailNotifications')}
        />

        <OptionToggle
          label="App Push Notifications"
          value={appPushNotifications}
          onToggle={() => toggleSwitch('appPushNotifications')}
        />

        <OptionToggle
          label="Pop-up Notifications"
          value={popupNotifications}
          onToggle={() => toggleSwitch('popupNotifications')}
        />
      </View>
    </PaperProvider>
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

export default PushNotifications;