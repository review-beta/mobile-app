import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStack from "./HomeStack";
import DealsScreen from "../screens/DealsScreen";
import ActivityScreen from "../screens/ActivityScreen";
import AccountStack from "./AccountStack";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator 
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "ellipse-outline";

          if (route.name === "Home") iconName = "home-outline";
          else if (route.name === "Deals") iconName = "flame-outline";
          else if (route.name === "Activity") iconName = "apps-outline";
          else if (route.name === "Account") iconName = "person-outline";

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#5A3EFF",
        tabBarInactiveTintColor: "gray",
        tabBarLabelStyle: {
          fontFamily: "Worksans-Regular",
          fontSize: 12,
        },
        tabBarStyle: {
          paddingBottom: 0,
        },
        headerShown: false,
      })}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{ title: "Home" }}
      />
      <Tab.Screen
        name="Deals"
        component={DealsScreen}
        options={{ title: "Deals" }}
      />
      <Tab.Screen
        name="Activity"
        component={ActivityScreen}
        options={{ title: "Activity" }}
      />
      <Tab.Screen
        name="Account"
        component={AccountStack}
        options={{ title: "Account" }}
      />
    </Tab.Navigator>
  );
}
