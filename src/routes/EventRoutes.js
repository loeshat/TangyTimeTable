import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateNewEvent from '../screens/NewEvent';

const Root = createNativeStackNavigator();

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
