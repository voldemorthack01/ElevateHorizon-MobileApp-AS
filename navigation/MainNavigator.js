// navigation/MainNavigator.js
import React, { useState } from "react";
import { BottomNavigation } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";

// Import Screens
import HomeScreen from "../screens/HomeScreen";
import SettingsScreen from "../screens/SettingsScreen";
import EventsNavigator from "./EventsNavigator";

export default function MainNavigator() {
  const [index, setIndex] = useState(0);

  const [routes] = useState([
    { key: "home", title: "Home", icon: "home" },
    { key: "events", title: "Events", icon: "event" },
    { key: "settings", title: "Settings", icon: "settings" },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeScreen,
    events: EventsNavigator,
    settings: SettingsScreen,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      shifting={false}
      sceneAnimationEnabled
      renderIcon={({ route, color }) => (
        <MaterialIcons name={route.icon} size={26} color={color} />
      )}
    />
  );
}