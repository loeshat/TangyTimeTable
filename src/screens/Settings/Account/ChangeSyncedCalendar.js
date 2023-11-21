import React, { useState } from 'react';
import SettingsTitleTopBar from "../../../components/SettingsTitleTopBar";
import { PaperProvider } from "react-native-paper";
import { theme } from "../../../styles/Theme";
import { Text, Pressable, View, Modal, StyleSheet, Image } from "react-native";
import { Picker } from "@react-native-picker/picker";

/**
 * Display for user to view and change calendars connected to the account
 * @param {*} navigation 
 * @returns 
 */
const ChangeSyncedCalendar = ({ navigation }) => {
    // Hard-coded pre-existing connected calendars
    const [syncedCalendars, setSyncedCalendars] = useState([
        { name: 'Google Calendar', logo: require('../../../assets/google.png'), color: 'rgba(41,134,204, 0.5)' },
        { name: 'Apple Calendar', logo: require('../../../assets/apple.png'), color: 'rgba(0, 0, 0, 0.5)' },
    ]);

    const [selectedCalendar, setSelectedCalendar] = useState('');
    const [isAddModalVisible, setAddModalVisible] = useState(false);

    // If calendar is not already connected, connect the new calendar and close the picker
    const addCalendar = () => {
        if (selectedCalendar && !syncedCalendars.find((cal) => cal.name === selectedCalendar)) {
          const newCalendar = { name: selectedCalendar, logo: require('../../../assets/think.png'), color: 'rgba(255, 131, 0, 0.5)' };
          setSyncedCalendars((prevCalendars) => [...prevCalendars, newCalendar]);
          setAddModalVisible(false);
        }
    };

    // Remove the calendar from the list of calendars
    const deleteCalendar = (calendar) => {
        setSyncedCalendars((prevCalendars) =>
          prevCalendars.filter((cal) => cal.name !== calendar.name)
        );
    };

    // Disable 'Add' button if no new calendar selected
    const isAddButtonDisabled = selectedCalendar === '';

    return (
        <PaperProvider theme={theme}>
            <SettingsTitleTopBar
                backAction={() => navigation.navigate('Settings')}
                backActionTitle={'Return to Settings'}
            />
            
            <View style={styles.container}>
                <Text style={styles.title}>Synced Calendars</Text>
                <View style={styles.calendarList}>
                    {syncedCalendars.map((calendar) => (
                        <View key={calendar.name} style={[styles.calendarItem, { backgroundColor: calendar.color }]}>
                            <Image source={calendar.logo} style={styles.calendarLogo} />
                            <Text style={styles.calendarName}>{calendar.name}</Text>
                            <Pressable onPress={() => deleteCalendar(calendar)} style={styles.deleteButton}>
                                <Text style={styles.deleteButtonText}>Delete</Text>
                            </Pressable>
                        </View>
                    ))}
                </View>
                <Pressable style={styles.addButton} onPress={() => setAddModalVisible(true)}>
                    <Text style={styles.addButtonText}>Add Calendar</Text>
                </Pressable>
                <Modal
                    visible={isAddModalVisible}
                    transparent={true}
                    animationType="fade"
                    onRequestClose={() => setAddModalVisible(false)}
                    style={styles.modal}
                >
                    <View style={styles.modalContainer}>
                        <Picker
                            selectedValue={selectedCalendar}
                            style={styles.picker}
                            onValueChange={(itemValue) => setSelectedCalendar(itemValue)}
                        >
                            <Picker.Item label="Select Calendar" value="" />
                            <Picker.Item label="Outlook Calendar" value="Outlook Calendar" />
                            <Picker.Item label="Yahoo Calendar" value="Yahoo Calendar" />
                        </Picker>

                        <View style={styles.modalButtonContainer}>
                            <Pressable
                                style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }, styles.addButtonModal, { backgroundColor: isAddButtonDisabled ? theme.colors.disabled : theme.colors.success }]}
                                onPress={addCalendar}
                                disabled={isAddButtonDisabled}
                            >
                                <Text style={styles.addButtonText}>Add</Text>
                            </Pressable>
                            <Pressable
                                style={styles.cancelButtonModal}
                                onPress={() => setAddModalVisible(false)}
                            >
                                <Text style={styles.addButtonText}>Cancel</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            </View>
        </PaperProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 6,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 16,
        padding: 10,
        color: theme.colors.text,
    },
    calendarList: {
        marginBottom: 20,
    },
    calendarItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        padding: 10,
        borderRadius: 8,
    },
    calendarLogo: {
        width: 30,
        height: 30,
        marginRight: 10,
    },
    calendarName: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
    },
    deleteButton: {
        backgroundColor: '#E14818',
        padding: 10,
        borderRadius: 5,
    },
    deleteButtonText: {
        color: 'white',
    },
    addButton: {
        backgroundColor: theme.colors.success,
        padding: 10,
        alignItems: 'center',
        borderRadius: 30,
    },
    addButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        padding: 5,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    picker: {
        width: '80%',
        backgroundColor: theme.colors.background,
        marginBottom: 20,
        borderRadius: 20,
    },
    modalButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    addButtonModal: {
        backgroundColor: theme.colors.success,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        paddingHorizontal: 20,
        marginHorizontal: 20,
    },
    cancelButtonModal: {
        backgroundColor: theme.colors.disabled,
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 7,
    },
});

export default ChangeSyncedCalendar;