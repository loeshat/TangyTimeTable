import React from "react";
import TitleTopBar from "../../../components/TitleTopBar";
import { PaperProvider } from "react-native-paper";
import { theme } from "../../../styles/Theme";
import { View, Text } from "react-native";


const RegionAndTimezone = ({ navigation }) => {
    return (
        <PaperProvider theme={theme}>
            <TitleTopBar
                backAction={() => navigation.navigate('Settings')}
                title={'Return to Settings'}
            />
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text variant='bodyMedium'>Region And Timezone Screen</Text>
            </View>
        </PaperProvider>
    );
}

export default RegionAndTimezone;