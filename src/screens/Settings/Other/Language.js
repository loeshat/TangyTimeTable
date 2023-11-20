import React, { useState, useEffect } from 'react';
import TitleTopBar from "../../../components/TitleTopBar";
import { PaperProvider, Title } from "react-native-paper";
import { theme } from "../../../styles/Theme";
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import WarningAlertTranslate from '../../../components/AlertTranslate';

const Language = ({ navigation }) => {
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [pickerValue, setPickerValue] = useState('');
    const [changesMade, setChangesMade] = useState(false);

    const [alertOpen, setAlertOpen] = useState(false);
    const displayAlert = () => setAlertOpen(true);
    const closeAlert = () => setAlertOpen(false);

    const translations = {
        English: {
            selectLanguage: 'Select Language:',
            saveChanges: 'Save Changes',
            confirmUpdate: 'You are updating your language preferences.',
            returnToSettings: 'Return to Settings',
            cancel: 'Cancel',
        },
        Vietnamese: {
            selectLanguage: 'Chọn Ngôn Ngữ:',
            saveChanges: 'Lưu Thay Đổi',
            confirmUpdate: 'Bạn đang cập nhật các thiết lập ngôn ngữ của mình.',
            returnToSettings: 'Quay lại Cài đặt',
            cancel: 'Hủy',
        },
        French: {
            nativeName: 'Français',
            selectLanguage: 'Sélectionner la langue :',
            saveChanges: 'Enregistrer les modifications',
            confirmUpdate: 'Vous mettez à jour vos préférences linguistiques.',
            returnToSettings: 'Retour aux paramètres',
            cancel: 'Annuler',
        },
        Spanish: {
            nativeName: 'Español',
            selectLanguage: 'Seleccionar idioma:',
            saveChanges: 'Guardar cambios',
            confirmUpdate: 'Estás actualizando tus preferencias de idioma.',
            returnToSettings: 'Volver a la configuración',
            cancel: 'Cancelar',
        },
        Chinese: {
            nativeName: '中文',
            selectLanguage: '选择语言:',
            saveChanges: '保存更改',
            confirmUpdate: '您正在更新语言首选项。',
            returnToSettings: '返回设置',
            cancel: '取消',
        },
    };

    // Set the default language to English on the first render
    useEffect(() => {
        setSelectedLanguage('English');
        setPickerValue('English');
    }, []);

    if (!translations[selectedLanguage]) {
        // Return loading or empty state if translations for the selected language are not available
        return null;
    }

    const saveChanges = () => {
        // Async not implemented as beyond prototype scope

        setSelectedLanguage(pickerValue);        
        setChangesMade(false);

        // Reset changesMade after saving changes
        closeAlert();
    };

    const handleLanguageChange = (language) => {
        if (language === selectedLanguage) {
            setChangesMade(false);
        }
        setPickerValue(language);
    };

    return (
        <PaperProvider theme={theme}>
            <TitleTopBar
                backAction={() => navigation.navigate('Settings')}
                title={translations[selectedLanguage].returnToSettings}
            />
            <WarningAlertTranslate
                description={translations[selectedLanguage].confirmUpdate}
                affirmText={translations[selectedLanguage].saveChanges}
                affirmAction={saveChanges}
                affirmContentStyle={{ width: 125 }}
                cancelText={translations[selectedLanguage].cancel}
                cancelAction={closeAlert}
                closeAction={closeAlert}
                visible={alertOpen}
            />
            
            <View style={styles.container}>
            <Title style={styles.title}>{translations[selectedLanguage].selectLanguage}</Title>
                <View style={styles.pickerContainer}>
                    <View style={styles.pickerWheel}>
                        <Picker
                            selectedValue={pickerValue}
                            style={styles.picker}
                            onValueChange={(itemValue) => {
                                setChangesMade(true);
                                handleLanguageChange(itemValue);
                            }}
                        >
                            <Picker.Item label={`English (English)`} value="English" />
                            <Picker.Item label={`Vietnamese (Tiếng Việt)`} value="Vietnamese" />
                            <Picker.Item label={`French (Français)`} value="French" />
                            <Picker.Item label={`Spanish (Español)`} value="Spanish" />
                            <Picker.Item label={`Chinese (中文)`} value="Chinese" />
                        </Picker>
                    </View>
                </View>

                <Pressable
                    style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }, styles.saveButton, !changesMade && styles.disabledButton]}
                    onPress={changesMade ? displayAlert : null}
                    disabled={!changesMade} // Disable the button if no changes have been made
                >
                    <Text style={styles.saveButtonText}>{translations[selectedLanguage].saveChanges}</Text>
                </Pressable>
                    
            </View>
        </PaperProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 6,
        padding: 20,
        justifyContent: 'flex-start',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
        color: theme.colors.text,
        paddingLeft: 20,
    },
    pickerContainer: {
        marginBottom: 20,
        padding: 10,
        marginLeft: 10,
        justifyContent: 'space-around',
        flexDirection: 'row',
        alignItems: 'center',
    },
    pickerWheel: {
        flex: 3,
        height: 150,
        borderWidth: 1,
        borderColor: theme.colors.primary,
        borderRadius: 5,
        overflow: 'hidden',
    },
    selectedTextContainer: {
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedOption: {
        color: theme.colors.text,
        fontWeight: 'bold',
        fontSize: 20,
        paddingBottom: 40,
    },
    pickerLabel: {
        fontSize: 16,
        marginBottom: 10,
        color: theme.colors.text,
    },
    picker: {
        width: '100%',
        color: theme.colors.text,
        paddingBottom: 10,
    },
    saveButton: {
        backgroundColor: theme.colors.success,
        padding: 10,
        alignItems: 'center',
        borderRadius: 30,
    },
    saveButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        padding: 5,
    },
    disabledButton: {
        backgroundColor: theme.colors.disabled,
    },
});

export default Language;