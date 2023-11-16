import React, { useState, useEffect } from 'react';
import Home from './screens/Home';
import Create from './screens/Create';
import FriendsHome from './screens/FriendsHome';
import Loading from './screens/Loading';
import Profile from './screens/Profile';
import { GroupRoutes } from './routes/GroupRoutes';
import { EventRoutes } from './routes/EventRoutes';
import { LoginRoutes } from './routes/LoginRoutes';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { MD3LightTheme as DefaultTheme, PaperProvider, Text } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View } from 'react-native';
import { getCurrentUser } from './services/StoreService';

const Tab = createMaterialBottomTabNavigator();
const RootStack = createNativeStackNavigator();

const themeExtended = {
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
      <Text>Create Placeholder</Text>
    </View>
  );
}

const BottomBar = () => (
  <PaperProvider theme={themeExtended}>
    <Tab.Navigator
      initialRouteName='Events'
      activeColor='#FF8300'
      inactiveColor='#9E9E9E'
      barStyle={{ backgroundColor: '#F5F5F5' }}
      screenOptions={{ headerShown: false }}
      theme={themeExtended}
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

const App = () => {
  const [startingScreen, setStartingScreen] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCurrentUser = async () => {
    try {
      const user = await getCurrentUser();
      // if user is null, then no user is logged in. otherwise, user is logged in
      if (user === null) {
        setStartingScreen('LoginRoutes');
      } else {
        setStartingScreen('Bottom Tab Bar');
      }
      setIsLoading(false);
    } catch (e) {
      console.error('Error fetching current user:', e);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  // loading when setStartingScreen is still waiting to finish running
  if (isLoading) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName={startingScreen}>
        <RootStack.Screen
          name='Bottom Tab Bar'
          component={BottomBar}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name='CreateNew'
          component={Create}
          options={{ headerShown: false, presentation: 'modal' }}
        />
        <RootStack.Screen
          name='Profile'
          component={Profile}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name='GroupRoutes'
          component={GroupRoutes}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name='EventRoutes'
          component={EventRoutes}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name='LoginRoutes'
          component={LoginRoutes}
          options={{ headerShown: false }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default App;
