import React, { useState } from "react";
import TitleTopBar from "../../../components/TitleTopBar";
import { PaperProvider } from "react-native-paper";
import { theme } from "../../../styles/Theme";
import WarningAlert from '../../../components/Alert';
import { View, Text, Pressable, StyleSheet, TextInput, ScrollView } from "react-native";

const ReportAProblem = ({ navigation }) => {
    const [problemDescription, setProblemDescription] = useState('');
    const [inputHeight, setInputHeight] = useState(40);
    
    const [alertOpen, setAlertOpen] = useState(false);
    const displayAlert = () => setAlertOpen(true);
    const closeAlert = () => setAlertOpen(false);

    const submitChanges = () => {
        setProblemDescription('');
        closeAlert();
        navigation.navigate('Settings');
    };

    const handleContentSizeChange = (contentHeight) => {
        setInputHeight(contentHeight);
    };

    const isSubmitDisabled = problemDescription.trim() === '';

    return (
        <PaperProvider theme={theme}>
            <TitleTopBar
                backAction={() => navigation.navigate('Settings')}
                title={'Return to Settings'}
            />
            <WarningAlert
                description={`You are submitting a report.`}
                affirmText={'Submit'}
                affirmAction={submitChanges}
                affirmContentStyle={{ width: 125 }}
                cancelAction={closeAlert}
                closeAction={closeAlert}
                visible={alertOpen}
            />
            
            <View style={styles.contentContainer}>
                <Text style={styles.title}>Report a Problem</Text>
                <ScrollView automaticallyAdjustKeyboardInsets={true}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={[styles.input, { height: Math.max(40, inputHeight) }]}
                            placeholder="What went wrong?"
                            multiline
                            numberOfLines={5}
                            value={problemDescription}
                            onChangeText={(text) => setProblemDescription(text)}
                            onContentSizeChange={(e) =>
                                handleContentSizeChange(e.nativeEvent.contentSize.height)
                            }
                        />  

                        <Pressable
                            style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }, styles.button, isSubmitDisabled && styles.disabledButton]}
                            onPress={!isSubmitDisabled ? displayAlert : null}
                            disabled={isSubmitDisabled}
                        >
                            <Text style={styles.buttonText}>Submit Report</Text>
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
        padding: 25,
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
        backgroundColor: "#F5F5F5",
        padding: 10,
        paddingHorizontal: 20,
        fontSize: 17,
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
    disabledButton: {
        backgroundColor: theme.colors.disabled,
    },
});

export default ReportAProblem;