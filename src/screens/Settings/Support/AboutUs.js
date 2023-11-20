import React, { useState } from "react";
import TitleTopBar from "../../../components/TitleTopBar";
import { PaperProvider } from "react-native-paper";
import { theme } from "../../../styles/Theme";
import { View, Text, Pressable, StyleSheet } from "react-native";
import WarningAlert from '../../../components/Alert';

const AboutUsParagraph = 'At TangyTimeTable, our mission is to transform the way people connect and share experiences. We are passionate about creating a platform that fosters meaningful connections, provides valuable information, and enhances your daily life. Founded in 2023, our team of dedicated professionals are committed to delivering an exceptional user experience while ensuring the highest standards of data security and privacy. We understand that your trust is our most valuable asset, and we work tirelessly to maintain the confidentiality and integrity of your data. TangyTimeTable is built on the principles of transparency, innovation, and user-centric design. Thank you for choosing us. We are excited to have you on this journey with us as we strive to make your experience as enjoyable and enriching as possible.';

const AboutUs = ({ navigation }) => {
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
                <Text style={styles.title}>Data Sharing Policy</Text>
                <View style={styles.paragraphContainer}>
                    <Text style={styles.paragraph}>
                        {AboutUsParagraph}
                    </Text>

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

export default AboutUs;