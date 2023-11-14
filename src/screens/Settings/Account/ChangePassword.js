import React, { useState } from "react";
import TitleTopBar from "../../../components/TitleTopBar";
import { PaperProvider, TextInput } from "react-native-paper";
import { theme } from "../../../styles/Theme";
import { View, Text, Pressable, StyleSheet } from "react-native";
import BasicAlert from "../../../components/BasicAlert";

const ChangePassword = ({ navigation }) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    // Warning alert handling
    const [alertOpen, setAlertOpen] = useState(false);
    const returnToSettings = () => {
        setAlertOpen(false);
        navigation.navigate('Settings');
  }

    const handleChangePassword = () => {
        
        if (!currentPassword || !newPassword || !confirmNewPassword) {
            console.log("case 1");
            return (
                <BasicAlert
                    description={'A password is missing! Please input again.'}
                    affirmText={'Try again'}
                    affirmAction={setAlertOpen(false)}
                    affirmContentStyle={{ width: 125 }}
                    visible={alertOpen}
                />
            );
        }

        if (newPassword !== confirmNewPassword) {
            console.log("case 2");
            return (
                <BasicAlert
                    description={'New passwords do not match! Please input again.'}
                    affirmText={'Try again'}
                    affirmAction={setAlertOpen(false)}
                    affirmContentStyle={{ width: 125 }}
                    visible={alertOpen}
                />
            );
        }
        setAlertOpen(true);
        console.log("success");
        
        return (
            <View>
                <BasicAlert
                description={'Success! Password has been updated.'}
                affirmText={'Return'}
                affirmAction={returnToSettings}
                affirmContentStyle={{ width: 125 }}
                visible={alertOpen}
                />
            </View>
        );
    };

    return (
        <PaperProvider theme={theme} style={styles.container}>
            <TitleTopBar
                backAction={() => navigation.navigate('Settings')}
                title={'Return to Settings'}
            />
            <View style={styles.contentContainer}>
                <Text style={styles.title}>Change Password</Text>

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

                    <Pressable style={styles.button} onPress={handleChangePassword}>
                        <Text style={styles.buttonText}>Change Password</Text>
                    </Pressable>
                </View>
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