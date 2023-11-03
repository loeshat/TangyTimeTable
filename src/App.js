import React from 'react';
import Home from './screens/Home';
import Create from './screens/Create';
import FriendsHome from './screens/FriendsHome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View } from 'react-native';

const Tab = createMaterialBottomTabNavigator();
const RootStack = createNativeStackNavigator();

const theme = {
  ...DefaultTheme,
  myOwnProperty: true,
  colors: {
    ...DefaultTheme.colors,
    secondaryContainer: '#FFEBD0'
  }
}

const CreatePlaceholder = () => {
  return (
    <View>
      Create Placeholder
    </View>
  );
}

const App = () => {
  const BottomBar = () => (
    <PaperProvider theme={theme}>
      <Tab.Navigator
        initialRouteName='Events'
        activeColor='#FF8300'
        inactiveColor='#9E9E9E'
        barStyle={{ backgroundColor: '#F5F5F5' }}
        screenOptions={{ headerShown: false }}
        theme={theme}
      >
        <Tab.Screen 
          name='Events'
          component={Home}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name='home' color={color} size={30} />
            ),
          }}
        />
        <Tab.Screen 
          name='Create'
          component={CreatePlaceholder}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name='plus' color={color} size={30} />
            ),
          }}
          listeners={({ navigation }) => ({
            tabPress: event => {
              event.preventDefault();
              navigation.navigate('CreateNew');
            }
          })}
        />
        <Tab.Screen 
          name='Friends'
          component={FriendsHome}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name='account-multiple' color={color} size={30} />
            ),
          }}
        />
      </Tab.Navigator>
    </PaperProvider>
  );
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen 
          name='Bottom Tab Bar'
          component={BottomBar}
          options={{ headerShown: false }}
        />
        <RootStack.Screen 
          name='CreateNew'
          component={Create}
          options={{ presentation: 'modal', headerShown: false }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default App;
