import React, { useState } from "react";
import SettingsTitleTopBar from "../../../components/SettingsTitleTopBar";
import { PaperProvider, TextInput } from "react-native-paper";
import { theme } from "../../../styles/Theme";
import { View, Text, Pressable, StyleSheet, ScrollView } from "react-native";
import WarningAlert from '../../../components/Alert';

/**
 * Display for user to update their password
 * @param {*} navigation 
 * @returns 
 */
const ChangePassword = ({ navigation }) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    
    // Condition 1: all input fields must be filled
    const missingPassword = !currentPassword || !newPassword || !confirmNewPassword;

    // Condition 2: input to the 'new password' and 'confirm new password' fields must match
    const mismatchingPasswords = newPassword !== confirmNewPassword;
    
    // Prevent user from confirming changes if both conditions are not met
    const isButtonDisabled = () => {
        return missingPassword || mismatchingPasswords;
    }
    
    // Warning alert handling
    const [alertOpen, setAlertOpen] = useState(false);
    const displayAlert = () => setAlertOpen(true);
    const closeAlert = () => setAlertOpen(false);

    // Navigate back to settings when password is updated
    const submitChanges = () => {
        closeAlert();
        navigation.navigate('Settings');
    };

    // Close alert for missing password error recovery
    const handleMissing = () => {
        closeMissingAlert();
    }

    // Close alert for mismatching passwords error recovery
    const handleMismatching = () => {
        closeMismatchingAlert();
    }

    // Missing Password Alert Handling
    const [missingAlert, setMissingAlert] = useState(false);
    const displayMissingAlert = () => setMissingAlert(true);
    const closeMissingAlert = () => setMissingAlert(false);

    // Mismatching Password Alert Handling
    const [mismatchingAlert, setMismatchingAlert] = useState(false);
    const displayMismatchingAlert = () => setMismatchingAlert(true);
    const closeMismatchingAlert = () => setMismatchingAlert(false);

    // Check for conditions when the user provides input
    const handleChangePassword = () => {
        if (missingPassword) {
            displayMissingAlert();
            return;
        }

        if (mismatchingPasswords) {
            displayMismatchingAlert();
            return;
        }

        displayAlert();
        return;
    };

    return (
        <PaperProvider theme={theme} style={styles.container}>
            <SettingsTitleTopBar
                backAction={() => navigation.navigate('Settings')}
                backActionTitle={'Return to Settings'}
            />
            <WarningAlert
                description={`You are updating your password.`}
                affirmText={'Confirm'}
                affirmAction={submitChanges}
                affirmContentStyle={{ width: 125 }}
                cancelAction={closeAlert}
                closeAction={closeAlert}
                visible={alertOpen}
            />
            <WarningAlert
                description={`You are missing a password.`}
                affirmText={'Keep Going'}
                affirmAction={handleMissing}
                affirmContentStyle={{ width: 125 }}
                cancelAction={closeMissingAlert}
                closeAction={closeMissingAlert}
                visible={missingAlert}
            />
            <WarningAlert
                description={`Your new passwords do not match.`}
                affirmText={'Keep Going'}
                affirmAction={handleMismatching}
                affirmContentStyle={{ width: 125 }}
                cancelAction={closeMismatchingAlert}
                closeAction={closeMismatchingAlert}
                visible={mismatchingAlert}
            />
            <View style={styles.contentContainer}>
                <Text style={styles.title}>Change Password</Text>
                <ScrollView automaticallyAdjustKeyboardInsets={true}>
                
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Current Password"
                            placeholderTextColor={theme.colors.disabled}
                            secureTextEntry
                            value={currentPassword}
                            onChangeText={(text) => setCurrentPassword(text)}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="New Password"
                            placeholderTextColor={theme.colors.disabled}
                            secureTextEntry
                            value={newPassword}
                            onChangeText={(text) => setNewPassword(text)}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Confirm New Password"
                            placeholderTextColor={theme.colors.disabled}
                            secureTextEntry
                            value={confirmNewPassword}
                            onChangeText={(text) => setConfirmNewPassword(text)}
                        />

                        <Pressable
                            style={({ pressed }) => [
                                styles.button,
                                { backgroundColor: isButtonDisabled() ? theme.colors.disabled : pressed ? theme.colors.primary : theme.colors.success }, 
                            ]}
                            onPress={handleChangePassword}
                            disabled={isButtonDisabled()}
                        >
                            <Text style={styles.buttonText}>Change Password</Text>
                        </Pressable>
                    </View>
                </ScrollView>
            </View>
        </PaperProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'flex-start',
    },
    contentContainer: {
        flex: 6,
        padding: 16,
        justifyContent: 'flex-start',
    },
    inputContainer: {
        backgroundColor: theme.colors.surface,
        padding:25,
        paddingVertical: 30,
        borderRadius: 30,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 16,
        padding: 10,
        color: theme.colors.text,
    },
    input: {
        height: 40,
        borderColor: theme.colors.primary,
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 20,
        marginTop: 10,
        paddingLeft: 8,
        backgroundColor: theme.colors.background,
        padding: 10,
        paddingHorizontal: 20,
    },
    button: {
        backgroundColor: theme.colors.success,
        padding: 10,
        alignItems: 'center',
        borderRadius: 30,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold",
        padding: 5,
    },
});

export default ChangePassword;