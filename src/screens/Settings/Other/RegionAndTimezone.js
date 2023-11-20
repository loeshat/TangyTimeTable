import React, { useState, useEffect } from 'react';
import TitleTopBar from "../../../components/TitleTopBar";
import { PaperProvider, Title } from "react-native-paper";
import { theme } from "../../../styles/Theme";
import { Text, Pressable, View, StyleSheet } from "react-native";
import { Picker } from '@react-native-picker/picker';
import WarningAlert from '../../../components/Alert';

const RegionAndTimezone = ({ navigation }) => {
    const [selectedRegion, setSelectedRegion] = useState('');
    const [selectedTimezone, setSelectedTimezone] = useState('');

    const [regionChangesMade, setRegionChangesMade] = useState(false);
    const [timezoneChangesMade, setTimezoneChangesMade] = useState(false);

    const [regionPickerValue, setRegionPickerValue] = useState('');
    const [timezonepickerValue, setTimezonePickerValue] = useState('');

    const [alertOpen, setAlertOpen] = useState(false);
    const displayAlert = () => setAlertOpen(true);
    const closeAlert = () => setAlertOpen(false);

    const regions = {
        Oceania: {
            timezone: '+11:00',
        },
        NorthAmerica: {
            timezone: '-05:00',
        },
        Europe: {
            timezone: '+01:00',
        },
    };
    
    const timezones = {
        '+11:00': {
            region: 'Oceania',
        },
        '-05:00': {
            region: 'North America',
        },
        '+01:00': {
            region: 'Europe',
        },
    };

    // Set the default region to Oceania and timezone to +11:00 on the first render
    useEffect(() => {
        setSelectedRegion('Oceania');
        setRegionPickerValue('Oceania');
        setSelectedTimezone('+11:00');
        setTimezonePickerValue('+11:00');
    }, []);

    if (!regions[selectedRegion] || !timezones[selectedTimezone]) {
        return null;
    }

    const saveChanges = () => {
        // Async not impelmented as beyond prototype scope

        setSelectedRegion(regionPickerValue);
        setSelectedTimezone(timezonepickerValue);
        setRegionChangesMade(false);
        setTimezoneChangesMade(false);

        closeAlert();
        navigation.navigate('Settings');
    };

    const handleRegionChange = (region) => {
        if (region === selectedRegion) {
            setRegionChangesMade(false);
        }
        setRegionPickerValue(region);
    
        // Set corresponding timezone based on the selected region
        if (regions[region].timezone === selectedTimezone) {
            setTimezoneChangesMade(false);
        }
        setTimezonePickerValue(regions[region].timezone);
    };

    const handleTimezoneChange = (timezone) => {
        if (timezone === selectedTimezone) {
            setTimezoneChangesMade(false);
        }
        setTimezonePickerValue(timezone);
    
        // Set corresponding region based on the selected timezone
        if (timezones[timezone].region === selectedRegion) {
            setRegionChangesMade(false);
        }
        setRegionPickerValue(timezones[timezone].region);
    };

    return (
        <PaperProvider theme={theme}>
            <TitleTopBar
                backAction={() => navigation.navigate('Settings')}
                title={'Return to Settings'}
            />
            <WarningAlert
                description={`You are updating your region and timezone prefrences.`}
                affirmText={'Confirm'}
                affirmAction={saveChanges}
                affirmContentStyle={{ width: 125 }}
                cancelAction={closeAlert}
                closeAction={closeAlert}
                visible={alertOpen}
            />

            <View style={styles.container}>
                <Text style={styles.title}>Update Region:</Text>
                <View style={styles.pickerContainer}>
                    <View style={styles.pickerWheel}>
                        <Picker
                            selectedValue={regionPickerValue}
                            style={styles.picker}
                            onValueChange={(itemValue) => {
                                setRegionChangesMade(true);
                                setTimezoneChangesMade(true);
                                handleRegionChange(itemValue.replace(/ /g, ''));
                            }}
                        >
                            <Picker.Item label="Oceania" value="Oceania" />
                            <Picker.Item label="North America" value="North America" />
                            <Picker.Item label="Europe" value="Europe" />
                        </Picker>
                    </View>
                    <View style={styles.selectedTextContainer}>
                        <Text style={styles.selectedOption}>{regionPickerValue}</Text>
                    </View>
                </View>

                <Title style={styles.title}>Update Timezone:</Title>
                <View style={styles.pickerContainer}>
                    <View style={styles.pickerWheel}>
                        <Picker
                            selectedValue={timezonepickerValue}
                            style={styles.picker}
                            onValueChange={(itemValue) => {
                                setTimezoneChangesMade(true);
                                setRegionChangesMade(true);
                                handleTimezoneChange(itemValue);
                            }}
                        >
                            <Picker.Item label="GMT+11:00" value="+11:00" />
                            <Picker.Item label="GMT-05:00" value="-05:00" />
                            <Picker.Item label="GMT+01:00" value="+01:00" />
                        </Picker>
                    </View >
                    <View style={styles.selectedTextContainer}>
                        <Text style={styles.selectedOption}>{timezonepickerValue}</Text>
                    </View>
                    
                </View>

                <Pressable
                    style={({ pressed }) => [
                        { opacity: pressed ? 0.5 : 1 },
                        styles.saveButton,
                        !(regionChangesMade && timezoneChangesMade) && styles.disabledButton
                    ]}
                    onPress={(regionChangesMade && timezoneChangesMade) ? displayAlert : null}
                    disabled={!(regionChangesMade && timezoneChangesMade)} // Disable the button if no changes have been made
                >
                    <Text style={styles.saveButtonText}>Save Changes</Text>
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
        justifyContent: 'space-around',
        flexDirection: 'row',
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginLeft: 5,
    },
    selectedOption: {
        color: theme.colors.text,
        fontWeight: '500',
        fontSize: 18,
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

export default RegionAndTimezone;