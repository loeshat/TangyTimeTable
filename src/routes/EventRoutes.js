import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateNewEvent from '../screens/events/NewEvent';
import SelectGroupScreen from '../screens/events/SelectGroup';
import NewEventPlan from '../screens/events/EventPlan';
import EventTimeInput from '../screens/events/EventTimeInput';
import AvailabilityInput from '../screens/events/AvailabilityInput';
import TimeInputConfirmScreen from '../screens/events/TimeInputConfirmScreen';
import EventFinalisation from '../screens/events/EventFinalisation';
import ViewInCalendar from '../screens/events/ViewInCalendar';
import ReadMoreModal from '../screens/events/modals/EventReadMoreModal';

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
        name='Group Select'
        component={SelectGroupScreen}
        options={{ headerShown: false }}
      />
      <Root.Screen 
        name='Create New Event'
        component={CreateNewEvent}
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
        name='Availabilities'
        component={AvailabilityInput}
        options={{ headerShown: false }}
      />
      <Root.Screen 
        name='Time Confirmation Screen'
        component={TimeInputConfirmScreen}
        options={{ headerShown: false }}
      />
      <Root.Screen 
        name='Event Finalisation'
        component={EventFinalisation}
        options={{ headerShown: false }}
      />
      <Root.Screen 
        name='View in Calendar'
        component={ViewInCalendar}
        options={{ headerShown: false, presentation: 'modal' }}
      />
      <Root.Screen 
        name='Read More'
        component={ReadMoreModal}
        options={{ headerShown: false, presentation: 'modal' }}
      />
    </Root.Navigator>
  );
}
