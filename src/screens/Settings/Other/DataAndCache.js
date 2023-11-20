import React, { useState } from "react";
import TitleTopBar from "../../../components/TitleTopBar";
import { PaperProvider } from "react-native-paper";
import { theme } from "../../../styles/Theme";
import { View, Text, Pressable, StyleSheet } from "react-native";
import WarningAlert from '../../../components/Alert';

const cacheParagraph = 'Clear your cache to free up your space. This will not affect your Tangy experience.';

const DataAndCache = ({ navigation }) => {
    const [cache, setCache] = useState(37.4);
    const [alertOpen, setAlertOpen] = useState(false);
    const displayAlert = () => setAlertOpen(true);
    const closeAlert = () => setAlertOpen(false);

    const approveAction = () => {
        closeAlert();
        setCache(0);
    };

    return (
        <PaperProvider theme={theme}>
            <TitleTopBar
                backAction={() => navigation.navigate('Settings')}
                title={'Return to Settings'}
            />
            <WarningAlert
                description={`You will lose all your cache!`}
                affirmText={'Keep Going'}
                affirmAction={approveAction}
                affirmContentStyle={{ width: 125 }}
                cancelAction={closeAlert}
                closeAction={closeAlert}
                visible={alertOpen}
            />

            <View style={styles.contentContainer}>
                <Text style={styles.title}>Update Data and Preferences</Text>
                <View style={styles.paragraphContainer}>
                    <Text style={styles.paragraphTitle}>
                        {`Cache: ${cache} MB`}
                    </Text>
                    <Text style={styles.paragraph}>
                        {cacheParagraph}
                    </Text>
                    <View style={styles.buttonContainer}>
                        <Pressable
                            style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }, styles.button]}
                            onPress={displayAlert}
                        >
                            <Text style={styles.buttonText}>Clear</Text>
                        </Pressable>
                    </View>
                    
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
    buttonContainer: {
        alignContent: 'center',
        padding: 5,
        width: "100%",
        alignItems: "center",
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 16,
        padding: 10,
        color: theme.colors.text,
    },
    paragraphTitle: {
        fontSize: 25,
        color: theme.colors.text,
        padding: 5,
    },
    paragraph: {
        fontSize: 16,
        lineHeight: 22,
        color: theme.colors.disabled,
        padding: 5,
    },
    button: {
        padding: 5,
        alignItems: "center",
        borderRadius: 30,
        marginTop: 10,
        backgroundColor: "#E14818",
        width: 100,
    },
    buttonText: {
        color: theme.colors.surface,
        fontWeight: "bold",
        fontSize: 17,
        padding: 5,
    },
});

export default DataAndCache;