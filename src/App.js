import React from 'react';
import { theme } from './styles/Theme';
import { PaperProvider } from 'react-native-paper';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';

const Tab = createMaterialBottomTabNavigator();

// NOTE: This will NOT load yet since nothing has been set up
const App = () => {
  return (
    <PaperProvider theme={theme}>
      <Tab.Navigator
        initialRouteName='Events'
        activeColor='primary'
        inactiveColor='disabled'
      >
      </Tab.Navigator>
    </PaperProvider>
  );
}

export default App;
