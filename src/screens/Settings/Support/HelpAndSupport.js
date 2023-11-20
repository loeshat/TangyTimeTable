import React, { useState } from "react";
import TitleTopBar from "../../../components/TitleTopBar";
import { PaperProvider } from "react-native-paper";
import { theme } from "../../../styles/Theme";
import { View, Text, Pressable, StyleSheet } from "react-native";
import WarningAlert from '../../../components/Alert';

const supportParagraph1 = 'Welcome to the TangyTimeTable Support Center. We are here to assist you and provide answers to your questions. If you are looking for help or information, here are some ways to get support:';
const supportParagraph2Title = 'Frequently Asked Questions (FAQ):';
const supportParagraph2 = 'Check out our FAQ section to find answers to common questions about using TangyTimeTable. We have compiled a list of frequently asked questions to help you navigate the app with ease.';
const supportParagraph3Title = 'Contact Support:';
const supportParagraph3 = 'If you cannot find the information you need in our FAQ, our support team is ready to assist you. You can reach us by our website or submitting a report.';

const HelpAndSupport = ({ navigation }) => {
    const [alertOpen, setAlertOpen] = useState(false);
    const displayAlert = () => setAlertOpen(true);
    const closeAlert = () => setAlertOpen(false);

    const approveAction = () => {
        closeAlert();
    };

    return (
        <PaperProvider theme={theme}>
            <TitleTopBar
                backAction={() => navigation.navigate('Settings')}
                title={'Return to Settings'}
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
                <Text style={styles.title}>Support and FAQs</Text>
                <View style={styles.paragraphContainer}>
                    <Text style={styles.paragraph}>
                        {supportParagraph1}
                    </Text>

                    <View style={styles.supportParagraphContainer}>
                        <Text style={styles.paragraphTitle}>
                            {supportParagraph2Title}
                        </Text>
                        <Text style={styles.supportParagraph}>
                            {supportParagraph2}
                        </Text>
                    </View>

                    <View style={styles.supportParagraphContainer}>
                        <Text style={styles.paragraphTitle}>
                            {supportParagraph3Title}
                        </Text>
                        <Text style={styles.supportParagraph}>
                            {supportParagraph3}
                        </Text>
                    </View>

                    <Pressable
                        style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }, styles.button]}
                        onPress={displayAlert}
                    >
                        <Text style={styles.buttonText}>Read More</Text>
                    </Pressable>
                </View>

                <View style={styles.websiteButtonContainer}>
                <Pressable
                        style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }, styles.websiteButton]}
                        onPress={displayAlert}
                    >
                        <Text style={styles.websiteButtonText}>See Our Website</Text>
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
    supportParagraphContainer: {
        paddingVertical: 20,
    },
    websiteButtonContainer:{
        alignItems: "flex-end",
        paddingRight: 10,
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
    supportParagraph: {
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
    },
    websiteButton: {
        backgroundColor: theme.colors.primary,
        borderRadius: 10,
        padding: 5,
        alignItems: "center",
        width: 170,
    },
    websiteButtonText: {
        color: theme.colors.surface,
        fontWeight: "bold",
        padding: 5,
        fontSize: 17,
    }
});

export default HelpAndSupport;