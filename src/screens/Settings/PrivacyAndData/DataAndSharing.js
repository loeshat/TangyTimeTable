import React from "react";
import TitleTopBar from "../../../components/TitleTopBar";
import { PaperProvider } from "react-native-paper";
import { theme } from "../../../styles/Theme";
import { View, Text, Pressable, StyleSheet } from "react-native";

const dataSharingParagraph = 'At TangyTimeTable, we are dedicated to providing you with a valuable and personalized experience. To enhance our services, we may need to share some of your data with trusted partners and service providers. This data sharing is limited to what is necessary for the functioning of the app and the fulfillment of your requests. We may share your data with third parties for purposes such as analytics, customer support, payment processing, and security. Rest assured, we carefully select our partners and require them to adhere to strict data protection standards. We will never sell your personal information to third parties for marketing purposes. We are committed to your privacy and strive to maintain the security and confidentiality of your data. If you have any questions or concerns about data sharing, please refer to our Privacy Policy or contact our support team.';

const DataAndSharing = ({ navigation }) => {
    return (
        <PaperProvider theme={theme}>
            <TitleTopBar
                backAction={() => navigation.navigate('Settings')}
                title={'Return to Settings'}
            />
            <View style={styles.contentContainer}>
                <Text style={styles.title}>Data Sharing Policy</Text>
                <View style={styles.paragraphContainer}>
                    <Text style={styles.paragraph}>
                        {dataSharingParagraph}
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

export default DataAndSharing;