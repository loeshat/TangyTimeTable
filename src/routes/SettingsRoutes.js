import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChangeSyncedCalendar from "../screens/Settings/Account/ChangeSyncedCalendar";
import ChangeConnectedAccounts from "../screens/Settings/Account/ChangeConnectedAccounts";
import ChangePassword from "../screens/Settings/Account/ChangePassword";
import PushNotifications from "../screens/Settings/Notifications/PushNotifications";
import ConsentAndPrivacy from "../screens/Settings/PrivacyAndData/ConsentAndPrivacy";
import DataAndSharing from "../screens/Settings/PrivacyAndData/DataAndSharing";
import Language from "../screens/Settings/Other/Language";
import RegionAndTimezone from "../screens/Settings/Other/RegionAndTimezone";
import TextSizeAndFont from "../screens/Settings/Other/TextSizeAndFont";
import AppearencePreferences from "../screens/Settings/Other/AppearencePreferences";
import HighContrast from '../screens/Settings/Other/HighContrast';
import DataAndCache from "../screens/Settings/Other/DataAndCache";
import HelpAndSupport from "../screens/Settings/Support/HelpAndSupport";
import TermsAndPolicies from "../screens/Settings/Support/TermsAndPolicies";
import AboutUs from "../screens/Settings/Support/AboutUs";
import ReportAProblem from "../screens/Settings/Support/ReportAProblem";
import UpdatesAndReleaseNotes from "../screens/Settings/Support/UpdatesAndReleaseNotes";

const Root = createNativeStackNavigator();

/**
 * Stores settings related routes for all settings screens
 * which cannot be accessed by clicking on the bottom
 * navigation bar
 * @returns 
 */

export const SettingsRoutes = () => {
    return (
        <Root.Navigator>
            <Root.Screen
                name='ChangeSyncedCalendar'
                component={ChangeSyncedCalendar}
                options={{ headerShown: false }}
            />
            <Root.Screen
                name='ChangeConnectedAccounts'
                component={ChangeConnectedAccounts}
                options={{ headerShown: false }}
            />
            <Root.Screen
                name='ChangePassword'
                component={ChangePassword}
                options={{ headerShown: false }}
            />
            <Root.Screen
                name='PushNotifications'
                component={PushNotifications}
                options={{ headerShown: false }}
            />
            <Root.Screen
                name='ConsentAndPrivacy'
                component={ConsentAndPrivacy}
                options={{ headerShown: false }}
            />
            <Root.Screen
                name='DataAndSharing'
                component={DataAndSharing}
                options={{ headerShown: false }}
            />
            <Root.Screen
                name='Language'
                component={Language}
                options={{ headerShown: false }}
            />
            <Root.Screen
                name='RegionAndTimezone'
                component={RegionAndTimezone}
                options={{ headerShown: false }}
            />
            <Root.Screen
                name='TextSizeAndFont'
                component={TextSizeAndFont}
                options={{ headerShown: false }}
            />
            <Root.Screen
                name='AppearencePreferences'
                component={AppearencePreferences}
                options={{ headerShown: false }}
            />
            <Root.Screen
                name='HighContrast'
                component={HighContrast}
                options={{ headerShown: false }}
            />
            <Root.Screen
                name='DataAndCache'
                component={DataAndCache}
                options={{ headerShown: false }}
            />
            <Root.Screen
                name='HelpAndSupport'
                component={HelpAndSupport}
                options={{ headerShown: false }}
            />
            <Root.Screen
                name='TermsAndPolicies'
                component={TermsAndPolicies}
                options={{ headerShown: false }}
            />
            <Root.Screen
                name='AboutUs'
                component={AboutUs}
                options={{ headerShown: false }}
            />
            <Root.Screen
                name='ReportAProblem'
                component={ReportAProblem}
                options={{ headerShown: false }}
            />
            <Root.Screen
                name='UpdatesAndReleaseNotes'
                component={UpdatesAndReleaseNotes}
                options={{ headerShown: false }}
            />
        </Root.Navigator>
    );
}

