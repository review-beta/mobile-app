import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import ForYouContent from '../screens/ForYouContent';
import MoviesContent from '../screens/MoviesContent';
import DiningContent from '../screens/DiningContent';
import EventsContent from '../screens/EventsContent';
import BusinessesContent from '../screens/BusinessesScreen';
import HangoutsContent from '../screens/HangoutsScreen';
import MovieDetailScreen from '../screens/MovieDetailScreen';
import LoginScreen from '../screens/LoginScreen';
// import DetailScreen from '../screens/DetailScreen'; // dynamic details screen

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="ForYouContent" component={ForYouContent} />
      <Stack.Screen name="MoviesContent" component={MoviesContent} />
      <Stack.Screen name="DiningContent" component={DiningContent} />
      <Stack.Screen name="EventsContent" component={EventsContent} />
      <Stack.Screen name="BusinessesContent" component={BusinessesContent} />
      <Stack.Screen name="HangoutsContent" component={HangoutsContent} />
      <Stack.Screen name="MovieDetailScreen" component={MovieDetailScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
}