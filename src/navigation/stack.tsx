// import React, { use, useContext } from 'react';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { NavigationContainer } from '@react-navigation/native';
// import { useAuth } from '../../contexts/AuthContext'

// import LoginScreen from '../screens/LoginScreen';
// import HomeScreen from '../screens/HomeScreen';
// import RegisterScreen from '../screens/RegisterScreen';
// import AccountScreen from '../screens/AccountScreen';
// import ResetRequestScreen from '../screens/auth/ResetRequestScreen';
// import VerifyCodeScreen from '../screens/auth/VerifyCodeScreen';
// import NewPasswordScreen from '../screens/auth/NewPasswordScreen';
// import MovieDetailScreen from '../screens/MovieDetailScreen';
// import ForYouContent from '../screens/ForYouContent';

// const Stack = createNativeStackNavigator<AccountStackParamList>();
// export type AccountStackParamList = {
//   Account: undefined;
//   Login: undefined;
//   Register: undefined;
//   ResetRequestScreen: undefined;
//   VerifyCodeScreen: { identifier: string };
//   NewPasswordScreen: { identifier: string };
//   MovieDetail: { id: number };
//   ForYou: undefined;
// };

// export default function AppNavigator() {
//   const { user } = useAuth();
//   return (
//       <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: false }}>
//       {user ? (
//         <>
//         <Stack.Screen name="Account" component={AccountScreen} />
//         <Stack.Screen name="MovieDetail" component={MovieDetailScreen} />
//         <Stack.Screen name="ForYou" component={ForYouContent} />
//         </>
//       ) : (
//         <>
//         <Stack.Screen name="Account" component={AccountScreen} />
//         <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
//         <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Register' }} />
//         <Stack.Screen name="ResetRequestScreen" component={ResetRequestScreen} />
//         <Stack.Screen name="VerifyCodeScreen" component={VerifyCodeScreen} />
//         <Stack.Screen name="NewPasswordScreen" component={NewPasswordScreen} />
//         <Stack.Screen name="ForYou" component={ForYouContent} />
//         <Stack.Screen name="MovieDetail" component={MovieDetailScreen} />
//         </>
//       )}
//     </Stack.Navigator>
//   );
// }