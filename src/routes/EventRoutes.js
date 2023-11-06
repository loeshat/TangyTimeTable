import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateNewEvent from '../screens/events/NewEvent';

const Root = createNativeStackNavigator();

/**
 * Stores event related routes for all event screens
 * which cannot be accessed by clicking on the bottom
 * navigation bar
 * @returns 
 */
export const EventRoutes = () => {
  return (
    <Root.Navigator>
      <Root.Screen 
        name='Create New Event'
        component={CreateNewEvent}
        options={{ headerShown: false }}
      />
    </Root.Navigator>
  );
}
