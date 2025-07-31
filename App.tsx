import React, { useCallback, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import HomeScreen from "./src/screens/HomeScreen";
import DealsScreen from "./src/screens/DealsScreen";
import FavoriteScreen from "./src/screens/ActivityScreen";
import AccountScreen from "./src/screens/AccountScreen";
import { AuthProvider } from "./contexts/AuthContext";
import AppNavigator from "./src/navigation/stack";
import { navigationRef } from "./src/navigation/RootNavigation";
import MainTabs from "./src/navigation/MainTabs";

// 👇 Prevent auto hiding the splash screen
SplashScreen.preventAutoHideAsync();

const Tab = createBottomTabNavigator();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  // Load fonts and prepare app
  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          "Futura-Bold": require("./assets/fonts/futuramdbt_bold.otf"),
          "WorkSans-Regular": require("./assets/fonts/WorkSans-Regular.ttf"),
          "WorkSans-Medium": require("./assets/fonts/WorkSans-Medium.ttf"),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  // Hide splash screen once ready
  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) return null;

  return (
    <AuthProvider>
      <NavigationContainer ref={navigationRef} onReady={onLayoutRootView}>
        <StatusBar style="auto" />
        <MainTabs />
      </NavigationContainer>
    </AuthProvider>
  );
}
