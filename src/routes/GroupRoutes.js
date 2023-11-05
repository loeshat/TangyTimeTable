import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateNewGroup from '../screens/NewGroup';

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
    </Root.Navigator>
  );
}
