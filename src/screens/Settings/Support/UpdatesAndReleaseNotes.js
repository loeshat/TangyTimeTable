import React, { useState } from "react";
import SettingsTitleTopBar from "../../../components/SettingsTitleTopBar";
import { PaperProvider } from "react-native-paper";
import { theme } from "../../../styles/Theme";
import { View, Text, Pressable, StyleSheet } from "react-native";
import WarningAlert from '../../../components/Alert';

// Hard-coded information paragraph
const releaseNotesTitle = 'Release Notes - Version 2.0.1 (October 1, 2023)';
const releaseNotesParagraph1 = 'In this latest update of TangyTimeTable, we have focused on enhancing your experience and addressing important improvements. Here is what is new:';
const releaseNotesParagraph2 = 'We have fixed a bug that caused occasional crashes when opening the app on older devices.';
const releaseNotesSubtitle = 'Bug Fixes:';

/**
 * Display of Application Updates and Release Notes details
 * @param {*} navigation 
 * @returns 
*/
const UpdatesAndReleaseNotes = ({ navigation }) => {
    // Handle warning alert
    const [alertOpen, setAlertOpen] = useState(false);
    const displayAlert = () => setAlertOpen(true);
    const closeAlert = () => setAlertOpen(false);

    // Redirect back to settings
    const approveAction = () => {
        closeAlert();
        navigation.navigate('Settings');
    };

    return (
        <PaperProvider theme={theme}>
            <SettingsTitleTopBar
                backAction={() => navigation.navigate('Settings')}
                backActionTitle={'Return to Settings'}
            />
            <WarningAlert
                description={`You are being redirected to Tangy's website!`}
                affirmText={'Keep Going'}
                affirmAction={approveAction}
                affirmContentStyle={{ width: 125 }}
                cancelAction={closeAlert}
                closeAction={closeAlert}
                visible={alertOpen}
            />

            <View style={styles.contentContainer}>
                <Text style={styles.title}>App Version</Text>
                <View style={styles.versionTextContainer}>
                    <Text style={styles.versionText}>v 2.0.1</Text>
                    <Text style={styles.versionText}>14th July 2023</Text>
                </View>

                <Text style={styles.title}>Release Notes</Text>
                <View style={styles.paragraphContainer}>
                    <Text style={styles.paragraphTitle}>
                        {releaseNotesTitle}
                    </Text>
                    <View style={styles.paragraphContainerInner}>
                        <Text style={styles.paragraph}>
                                {releaseNotesParagraph1}
                        </Text>
                    </View>
                    
                    <Text style={styles.paragraphSubtitle}>
                        {releaseNotesSubtitle}
                    </Text>
                    <View style={styles.paragraphContainerInner}>
                        <Text style={styles.paragraph}>
                                {releaseNotesParagraph2}
                        </Text>
                    </View>

                    <Pressable
                        style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }, styles.button]}
                        onPress={displayAlert}
                    >
                        <Text style={styles.buttonText}>Read More</Text>
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
    paragraphContainer: {
        padding: 16,
        justifyContent: 'flex-start',
        backgroundColor: "white",
        borderRadius: 20,
        marginBottom: 20,
        marginHorizontal: 10,
    },
    versionTextContainer:{
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
    },
    paragraphContainerInner: {
        padding: 10,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 16,
        padding: 10,
        color: theme.colors.text,
    },
    paragraphTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: theme.colors.text,
    },
    paragraphSubtitle: {
        color: theme.colors.text,
        fontSize: 16,
    },
    paragraph: {
        fontSize: 16,
        lineHeight: 22,
        color: theme.colors.disabled,
    },
    versionText: {
        color: theme.colors.disabled,
        fontSize: 16,
    },
    button: {
        padding: 10,
        alignItems: "flex-end",
        borderRadius: 30,
        marginTop: 10,
    },
    buttonText: {
        color: theme.colors.success,
        fontSize: 17,
        padding: 5,
    },
});


export default UpdatesAndReleaseNotes;