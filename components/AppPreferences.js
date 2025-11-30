import { createContext, useState, useEffect, useContext } from "react";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import lightTheme from "../themes/lightTheme.json";
import darkTheme from "../themes/darkTheme.json";

const AppPreferencesContext = createContext();

const STORAGE_KEY = "APP_PREFERENCES";

// System font per platform
const systemFont = Platform.select({
  ios: "System",
  android: "sans-serif",
});

// Font size presets (for body and title)
const fontSizesMap = {
  small: { body: 14, title: 20 },
  medium: { body: 16, title: 22 },
  large: { body: 18, title: 26 },
};

// Map typography variants using body/title sizes
const generateTypography = (fontSize) => ({
  displayLarge: { fontFamily: systemFont, fontWeight: "400", fontSize: fontSize.title + 4 },
  displayMedium: { fontFamily: systemFont, fontWeight: "400", fontSize: fontSize.title + 2 },
  displaySmall: { fontFamily: systemFont, fontWeight: "400", fontSize: fontSize.title },

  headlineLarge: { fontFamily: systemFont, fontWeight: "400", fontSize: fontSize.title + 2 },
  headlineMedium: { fontFamily: systemFont, fontWeight: "400", fontSize: fontSize.title },
  headlineSmall: { fontFamily: systemFont, fontWeight: "400", fontSize: fontSize.title - 2 },

  titleLarge: { fontFamily: systemFont, fontWeight: "500", fontSize: fontSize.title },
  titleMedium: { fontFamily: systemFont, fontWeight: "500", fontSize: fontSize.title - 2 },
  titleSmall: { fontFamily: systemFont, fontWeight: "500", fontSize: fontSize.title - 4 },

  bodyLarge: { fontFamily: systemFont, fontWeight: "400", fontSize: fontSize.body + 2 },
  bodyMedium: { fontFamily: systemFont, fontWeight: "400", fontSize: fontSize.body },
  bodySmall: { fontFamily: systemFont, fontWeight: "400", fontSize: fontSize.body - 2 },

  labelLarge: { fontFamily: systemFont, fontWeight: "500", fontSize: fontSize.body },
  labelMedium: { fontFamily: systemFont, fontWeight: "500", fontSize: fontSize.body - 1 },
  labelSmall: { fontFamily: systemFont, fontWeight: "500", fontSize: fontSize.body - 2 },
});

export const AppPreferencesProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [fontSizeKey, setFontSizeKey] = useState("medium");
  const [soundEnabled, setSoundEnabled] = useState(true);

  // ------------------------------
  // 🔄 Load saved settings on mount
  // ------------------------------
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed.isDarkTheme !== undefined) setIsDarkTheme(parsed.isDarkTheme);
          if (parsed.fontSizeKey) setFontSizeKey(parsed.fontSizeKey);
          if (parsed.soundEnabled !== undefined) setSoundEnabled(parsed.soundEnabled);
        }
      } catch (e) {
        console.log("⚠️ Failed to load settings:", e);
      }
    };

    loadSettings();
  }, []);

  // --------------------------------
  // 💾 Save settings when they change
  // --------------------------------
  useEffect(() => {
    const saveSettings = async () => {
      try {
        const data = {
          isDarkTheme,
          fontSizeKey,
          soundEnabled,
        };
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      } catch (e) {
        console.log("⚠️ Failed to save settings:", e);
      }
    };

    saveSettings();
  }, [isDarkTheme, fontSizeKey, soundEnabled]);

  // ------------------------------
  // 🎛 Actions
  // ------------------------------
  const toggleSound = () => setSoundEnabled((prev) => !prev);
  const toggleTheme = () => setIsDarkTheme((prev) => !prev);
  const setFontSize = (size) => setFontSizeKey(size);

  // ------------------------------
  // 🎨 Resulting theme sent to app
  // ------------------------------
  const theme = {
    ...(isDarkTheme ? darkTheme : lightTheme),
    fontSizes: fontSizesMap[fontSizeKey],
    // 🔥 Full Material 3 typography (required by React Native Paper v3)
    fonts: generateTypography(fontSizesMap[fontSizeKey]),
  };

  return <AppPreferencesContext.Provider value={{ theme, isDarkTheme, toggleTheme, fontSizeKey, setFontSize, soundEnabled, toggleSound }}>{children}</AppPreferencesContext.Provider>;
};

export const useAppPreferences = () => useContext(AppPreferencesContext);