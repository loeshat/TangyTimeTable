import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateNewEvent from '../screens/events/NewEvent';
import SelectGroupScreen from '../screens/events/SelectGroup';
import NewEventPlan from '../screens/events/EventPlan';
import EventTimeInput from '../screens/events/EventTimeInput';
import NewEventDecider from '../screens/events/EventDecider';

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
      <Root.Screen 
        name='Group Select'
        component={SelectGroupScreen}
        options={{ headerShown: false }}
      />
      <Root.Screen 
        name='New Event Plan'
        component={NewEventPlan}
        options={{ headerShown: false }}
      />
      <Root.Screen 
        name='Event Time Input'
        component={EventTimeInput}
        options={{ headerShown: false }}
      />
      <Root.Screen 
        name='Event Finalisation'
        component={NewEventDecider}
        options={{ headerShown: false }}
      />
    </Root.Navigator>
  );
}
