import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateNewGroup from '../screens/NewGroup';

const Root = createNativeStackNavigator();

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
