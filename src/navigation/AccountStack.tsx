import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AccountScreen from '../screens/AccountScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import { useAuth } from '../../contexts/AuthContext';
import ResetRequestScreen from '../screens/auth/ResetRequestScreen';
import VerifyCodeScreen from '../screens/auth/VerifyCodeScreen';
import NewPasswordScreen from '../screens/auth/NewPasswordScreen';

const Stack = createNativeStackNavigator();

export default function AccountStack() {
  const { user } = useAuth();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: false }}>
      {user ? (
        <>
      <Stack.Screen name="Account" component={AccountScreen} />
        </>
      ) : (
        <>
        <Stack.Screen name="Account" component={AccountScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="ResetRequestScreen" component={ResetRequestScreen} />
        <Stack.Screen name="VerifyCodeScreen" component={VerifyCodeScreen} />
        <Stack.Screen name="NewPasswordScreen" component={NewPasswordScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}