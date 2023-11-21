import React, { Fragment, useState } from "react";
import { PaperProvider } from "react-native-paper";
import { theme } from "../../styles/Theme";
import TitleTopBar from "../../components/TitleTopBar";
import { View, Text, ScrollView, Pressable } from "react-native";
import { Card, Title, Searchbar, Divider, List } from 'react-native-paper';
import { StyleSheet } from "react-native";

// Database for settings categories and sub-topics
const settingsCategories = {
    Account: ['Change Synced Calendar', 'Change Connected Accounts', 'Change Password'],
    Notifications: ['Push Notifications'],
    Privacy_And_Data: ['Consent And Privacy', 'Data And Sharing'],
    Other: ['Language', 'Region And Timezone', 'Text Size And Font', 'Appearence Preferences', 'Data And Cache'],
    FAQ_And_Support: ['Help And Support', 'Terms And Policies', 'About Us', 'Report A Problem', 'Updates And Release Notes']
};

// Database for icons for each category
const categoryIcons = {
    Settings: 'cog',
    Account: 'account',
    Notifications: 'bell-ring',
    Privacy_And_Data: 'server-security',
    Other: 'playlist-edit',
    FAQ_And_Support: 'help-circle',
};

/**
 * Display of main Settings Directory
 * @param {*} navigation 
 * @returns 
*/
const Settings = ({ navigation }) => {
    // Get details from  settings categories database
    const getCategory = (setting) => {
        return Object.keys(settingsCategories).find(key => settingsCategories[key].includes(setting));
    };

    // Group sub-topics by category
    const groupByCategory = (settings) => {
        return settings.reduce((acc, setting) => {
            if (!acc[setting.category]) acc[setting.category] = [];
            acc[setting.category].push(setting.value);
            return acc;
        }, {});
    };

    // Search function so only sub-topics with same words are displayed
    const [filteredSettings, setFilteredSettings] = useState(() => {
        const allSettings = Object.values(settingsCategories)
            .reduce((accumulator, currentArray) => accumulator.concat(currentArray), [])
        return allSettings.map(setting => ({ value: setting, category: getCategory(setting) }));
    });

    // Handle displaying available subtopics within their appropriate grouping
    const handleSearch = (query) => {
        const allSettings = Object.values(settingsCategories)
            .reduce((accumulator, currentArray) => accumulator.concat(currentArray), []);

        const filteredSettings = allSettings
            .filter(setting => setting.toLowerCase().includes(query.toLowerCase()))
            .map(setting => ({ value: setting, category: getCategory(setting) }));

        setFilteredSettings(filteredSettings);
    };

    return (
        <PaperProvider theme={theme} style={styles.container}>
            <TitleTopBar navigation={navigation} />
            
            <View style={styles.contentContainer}>
                <View style={styles.titleContainer}>
                    {categoryIcons.Settings && <List.Icon icon={categoryIcons.Settings} size={30} color={theme.colors.text} style={styles.icon} />}
                    <Text style={styles.title}>Settings</Text>
                </View>
                <Searchbar
                    placeholder="Search"
                    onChangeText={(query) => handleSearch(query)}
                    style={styles.searchbar}
                    elevation={1}
                />
                <Divider style={styles.divider} />
                <ScrollView style={styles.scrollContainer} automaticallyAdjustKeyboardInsets={true}>
                    {Object.entries(groupByCategory(filteredSettings)).map(([category, subheadings], index) => (
                        <Card key={index} style={styles.card} theme={{ colors: { outline: 'transparent' },}}>
                            <Card.Content>
                                <List.Item
                                    title={<Title style={styles.category}>{category.replace(/_/g, ' ')}</Title>}
                                    left={() => {
                                        const icon = categoryIcons[category];
                                        return icon ? <List.Icon icon={icon} color={theme.colors.text} /> : null;
                                    }}
                                />
                                {subheadings.map((subheading, subIndex) => (
                                    <Fragment key={subIndex}>
                                        <Pressable
                                            key={index}
                                            style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }, styles.button]}
                                            onPress={() => navigation.navigate('SettingsRoutes', { screen: subheading.replace(/ /g,'') })}
                                        >
                                            <Text style={styles.subheading}>{subheading}</Text>
                                        </Pressable>
                                        {subIndex < subheadings.length - 1 && <Divider /> }
                                    </Fragment>
                                ))}
                            </Card.Content>
                        </Card> 
                    ))}
                </ScrollView>
            </View>
        </PaperProvider>
        
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        flex: 5,
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    titleContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 22,
    },
    scrollContainer: {
        padding: 16,
    },
    searchbar: {
        backgroundColor: theme.colors.background,
    },
    card: {
        marginVertical: 8,
        backgroundColor: theme.colors.background,
        width: "100%",
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 16,
        color: theme.colors.text,
    },
    icon: {
        paddingBottom: 15,
        paddingRight: 10,
    },
    button: {
        padding: 10,
    },
    category: {
        color: theme.colors.text,
        fontWeight: "bold",
    },
    subheading: {
        fontSize: 15,
        marginLeft: 30,
    },
    divider: {
        marginTop: 10,
        padding: 1,
        width: "91%",
        marginLeft: 16,
        borderRadius: 10,
        backgroundColor: theme.colors.text,
    },
});

export default Settings;
