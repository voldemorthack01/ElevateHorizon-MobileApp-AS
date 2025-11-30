// navigation/EventsNavigator.js
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// Import Screens
import EventsListScreen from "../screens/EventsListScreen";
import EventDetailsScreen from "../screens/EventDetailsScreen";
import EventRegistrationScreen from "../screens/EventRegistrationScreen";

const Stack = createStackNavigator();

export default function EventsNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="EventsList"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="EventsList"
        component={EventsListScreen}
      />
      <Stack.Screen
        name="EventDetails"
        component={EventDetailsScreen}
      />
      <Stack.Screen
        name="EventRegistration"
        component={EventRegistrationScreen}
      />
    </Stack.Navigator>
  );
}