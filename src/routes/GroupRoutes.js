import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateNewGroup from '../screens/groups/NewGroup';
import ConfirmGroup from '../screens/groups/ConfirmGroup';
import GroupDisplay from '../screens/groups/GroupDisplay';

const Root = createNativeStackNavigator();

/**
 * Stores all group/friends related routes for all screens which
 * cannot be accessed by clicking on the bottom navigation bar
 * @returns 
 */
export const GroupRoutes = () => {
  return (
    <Root.Navigator>
      <Root.Screen 
        name='Create New Group'
        component={CreateNewGroup}
        options={{ headerShown: false }}
      />
      <Root.Screen 
        name='Confirm Group'
        component={ConfirmGroup}
        options={{ headerShown: false }}
      />
      <Root.Screen 
        name='Group Display'
        component={GroupDisplay}
        options={{ headerShown: false }}
      />
    </Root.Navigator>
  );
}
