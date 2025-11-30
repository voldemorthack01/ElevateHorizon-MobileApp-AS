import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { Surface, Text, Divider, Button } from "react-native-paper";
import { Audio } from "expo-av";
import { useAppPreferences } from "../components/AppPreferences";

export default function HomeScreen({ navigation }) {
  const { theme, soundEnabled } = useAppPreferences();

  const imageIndex = {
    logo: require("../assets/images/Logo.jpg"),
  };

  const playSound = async () => {
    if (!soundEnabled) return;
    try {
      const { sound } = await Audio.Sound.createAsync(
        require("../assets/sounds/sound.wav")
      );
      await sound.playAsync();
    } catch (error) {
      console.log("⚠️ Failed to play sound:", error);
    }
  };

  return (
    <Surface style={{ flex: 1, padding: 20 }} elevation={5}>
      <Divider />
      <Text
        variant="displayLarge"
        style={{
          fontWeight: "bold",
          color: theme.colors.primary,
          marginBottom: 20,
          textAlign: "center",
        }}
      >
        Elevate Horizon Connect
      </Text>
      <Divider />

      {/* Logo with sound on click */}
      <TouchableOpacity onPress={playSound} activeOpacity={0.7}>
        <Image
          source={imageIndex.logo}
          resizeMode="contain"
          style={{ width: 300, height: 150, margin: 20, alignSelf: "center" }}
        />
      </TouchableOpacity>

      <Divider />

      {/* Shortcut button */}
      <Button
        mode="contained"
        onPress={() =>
          navigation.navigate("Events", {
            screen: "EventsList",
            params: { initialCategory: "Today" },
          })
        }
        style={{ alignSelf: "center", width: 380, marginTop: 20 }}
      >
        View Todays Events
      </Button >

    </Surface>
  );
}        
