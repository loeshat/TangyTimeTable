import React from "react";
import TitleTopBar from "../../../components/TitleTopBar";
import { PaperProvider } from "react-native-paper";
import { theme } from "../../../styles/Theme";
import { View, Text, Pressable, StyleSheet } from "react-native";

const consentTextParagraph = 'At TangyTimeTable, we value your privacy and are committed to protecting your personal information. By using our app, you consent to the collection, use, and sharing of your data as described in our Privacy Policy.';

const privacyTextParagraph = 'Welcome to TangyTimeTable. This Privacy Policy applies to related services. We are committed to protecting and respecting your privacy. This Privacy Policy explains how we collect, use, share, and otherwise process the personal information of users, and other individuals in connection with our platform. If you do no agree with this policy, you should not use the platform.';

const ConsentAndPrivacy = ({ navigation }) => {
    return (
        <PaperProvider theme={theme}>
            <TitleTopBar
                backAction={() => navigation.navigate('Settings')}
                title={'Return to Settings'}
            />
            <View style={styles.contentContainer}>
                <Text style={styles.title}>Consent Policy</Text>
                <View style={styles.paragraphContainer}>
                    <Text style={styles.paragraph}>
                        {consentTextParagraph}
                    </Text>

                    <Pressable style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }, styles.button]}>
                        <Text style={styles.buttonText}>Read More</Text>
                    </Pressable>
                </View>

                <Text style={styles.title}>Privacy Policy</Text>
                <View style={styles.paragraphContainer}>
                    <Text style={styles.paragraph}>
                        {privacyTextParagraph}
                    </Text>

                    <Pressable style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }, styles.button]}>
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
        flex: 7,
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
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 16,
        padding: 10,
        color: theme.colors.text,
    },
    paragraph: {
        fontSize: 16,
        lineHeight: 22,
        color: theme.colors.disabled,
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

export default ConsentAndPrivacy;