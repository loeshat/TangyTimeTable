import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Landing from '../screens/login/Landing';
import Login from '../screens/login/Login';
import SignUp from '../screens/login/SignUp';
import ForgotPassword from '../screens/login/ForgotPassword';
import SMDirectory from '../screens/login/SMDirectory';
import SMConfirm from '../screens/login/SMConfirm';

const Root = createNativeStackNavigator();

/**
 * Stores all login related routes for all screens
 * @returns 
 */
export const LoginRoutes = () => {
  return (
    <Root.Navigator>
      <Root.Screen
        name='Landing'
        component={Landing}
        options={{ headerShown: false }}
      />
      <Root.Screen
        name='Login'
        component={Login}
        options={{ headerShown: false }}
      />
      <Root.Screen
        name='Sign Up'
        component={SignUp}
        options={{ headerShown: false }}
      />
      <Root.Screen
        name='Forgot Password'
        component={ForgotPassword}
        options={{ headerShown: false }}
      />
      <Root.Screen
        name='Social Media Directory'
        component={SMDirectory}
        options={{ headerShown: false }}
      />
      <Root.Screen
        name='Social Media Confirm'
        component={SMConfirm}
        options={{ headerShown: false }}
      />
    </Root.Navigator>
  );
}
