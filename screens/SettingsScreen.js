import React from "react";
import { View } from "react-native";
import { Surface, Text, Switch, RadioButton, Card } from "react-native-paper";
import { useAppPreferences } from "../components/AppPreferences";

export default function SettingsScreen() {
  const {
    fontSizeKey,
    isDarkTheme,
    setFontSize,
    soundEnabled,
    theme,
    toggleSound,
    toggleTheme,
  } = useAppPreferences();

  return (
    <Surface style={{ flex: 1, padding: 20 }} elevation={5}>
      <Text
        variant="headlineLarge"
        style={{
          marginBottom: 24,
          fontWeight: "bold",
          color: theme.colors.primary,
          textAlign: "center",
        }}
      >
        Settings
      </Text>

      {/* Theme switch card */}
      <Card style={{ marginBottom: 16, padding: 16, borderRadius: 12 }} elevation={3}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontSize: theme.fontSizes.title, fontWeight: "bold" }}>
            Dark Theme
          </Text>
          <Switch value={isDarkTheme} onValueChange={toggleTheme} />
        </View>
      </Card>

      {/* Sound switch card */}
      <Card style={{ marginBottom: 16, padding: 16, borderRadius: 12 }} elevation={3}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontSize: theme.fontSizes.title, fontWeight: "bold" }}>
            Enable Sounds
          </Text>
          <Switch value={soundEnabled} onValueChange={toggleSound} />
        </View>
      </Card>

      {/* Font size card */}
      <Card style={{ marginBottom: 16, padding: 16, borderRadius: 12 }} elevation={3}>
        <Text
          style={{
            fontSize: theme.fontSizes.title,
            fontWeight: "bold",
            marginBottom: 12,
          }}
        >
          Font Size
        </Text>
        <RadioButton.Group onValueChange={setFontSize} value={fontSizeKey}>
          <RadioButton.Item label="Small" value="small" />
          <RadioButton.Item label="Medium" value="medium" />
          <RadioButton.Item label="Large" value="large" />
        </RadioButton.Group>
      </Card>
    </Surface>
  );
}