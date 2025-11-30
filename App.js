import { StatusBar } from "expo-status-bar";
import { enableScreens } from "react-native-screens";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider as PaperProvider } from "react-native-paper";

import { AppPreferencesProvider, useAppPreferences } from "./components/AppPreferences";
import MainNavigator from "./navigation/MainNavigator";

enableScreens();

export default function App() {
  return (
    <SafeAreaProvider>
      <AppPreferencesProvider>
        <Main />
      </AppPreferencesProvider>
    </SafeAreaProvider>
  );
}

function Main() {
  const { theme } = useAppPreferences();

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
      <StatusBar style="auto" />
    </PaperProvider>
  );
}