import React, { useState } from "react";
import SettingsTitleTopBar from "../../../components/SettingsTitleTopBar";
import { PaperProvider } from "react-native-paper";
import { theme } from "../../../styles/Theme";
import { View, Text, Pressable, StyleSheet } from "react-native";
import WarningAlert from '../../../components/Alert';

// Hard-coded information paragraph
const TermsParagraph1 = 'Welcome to TangyTimeTable! By using our app, you agree to comply with and be bound by the following terms and conditions. Please review these terms carefully. If you do not agree to these terms, please do not use the app.';
const TermsParagraph2Title = '1. User Obligations: ';
const TermsParagraph2 = 'You agree to use the app only for lawful purposes and in a way that does not infringe upon the rights of others or restrict their use and enjoyment of the app. You also agree not to engage in any unauthorized or unlawful activities.';
const TermsParagraph3Title = '2. Privacy and Data Usage: ';
const TermsParagraph3 = 'Our app data usage and privacy practices are governed by our Privacy Policy. By using the app, you consent to the collection, use, and sharing of your data as described in that policy.';

/**
 * Display of Terms and Policies details
 * @param {*} navigation 
 * @returns 
*/
const TermsAndPolicies = ({ navigation }) => {
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
                <Text style={styles.title}>Terms of Use</Text>
                <View style={styles.paragraphContainer}>
                    <Text style={styles.paragraph}>
                        {TermsParagraph1}
                    </Text>

                    <View style={styles.TermsParagraphContainer}>
                        <Text style={styles.paragraphTitle}>
                            {TermsParagraph2Title}
                        </Text>
                        <Text style={styles.TermsParagraph}>
                            {TermsParagraph2}
                        </Text>
                    </View>

                    <View style={styles.TermsParagraphContainer}>
                        <Text style={styles.paragraphTitle}>
                            {TermsParagraph3Title}
                        </Text>
                        <Text style={styles.TermsParagraph}>
                            {TermsParagraph3}
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
    TermsParagraphContainer: {
        paddingVertical: 20,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 18,
        padding: 10,
        color: theme.colors.text,
    },
    paragraphTitle: {
        color: theme.colors.text,
        fontWeight: "bold",
        fontSize: 15,
        paddingBottom: 10,
    },
    paragraph: {
        fontSize: 16,
        lineHeight: 22,
        color: theme.colors.disabled,
    },
    TermsParagraph: {
        fontSize: 16,
        lineHeight: 22,
        color: theme.colors.disabled,
        marginLeft: 20,
    },
    button: {
        alignItems: "flex-end",
        borderRadius: 30,
    },
    buttonText: {
        color: theme.colors.success,
        fontSize: 17,
        padding: 5,
    }
});

export default TermsAndPolicies;