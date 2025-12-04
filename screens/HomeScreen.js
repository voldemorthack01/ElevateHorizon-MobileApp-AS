import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { Surface, Text, Divider, Button, Card } from "react-native-paper";
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
      {/* Logo at top */}
      <TouchableOpacity onPress={playSound} activeOpacity={0.7}>
        <Image
          source={imageIndex.logo}
          resizeMode="contain"
          style={{ width: 300, height: 150, marginTop: 20, alignSelf: "center" }}
        />
      </TouchableOpacity>
      <Divider style={{ marginVertical: 10 }} />
      {/* Welcome message */}
      <View style={{ marginTop: 30, marginBottom: 20 }}>
        <Text
          variant="headlineLarge"
          style={{
            fontWeight: "bold",
            color: theme.colors.primary,
            textAlign: "center",
            marginBottom: 8,
          }}
        >
          Welcome to Elevate Horizon Connect
        </Text>
        <Text
          variant="titleMedium"
          style={{
            fontWeight: "400",
            color: theme.colors.onSurface,
            textAlign: "center",
          }}
        >
          Discover amazing community events
        </Text>
      </View>

      {/* Card with Today's Events section */}
      <Divider style={{ marginVertical: 10 }} />
      <Card
        style={{
          marginTop: 20,
          padding: 20,
          borderRadius: 12,
          backgroundColor: theme.colors.primaryContainer,
        }}
        elevation={4}
      >
        <Text
          variant="headlineMedium"
          style={{
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: 8,
            color: theme.colors.onPrimaryContainer,
          }}
        >
          Today's Events
        </Text>
        <Text
          variant="bodyMedium"
          style={{
            textAlign: "center",
            marginBottom: 16,
            color: theme.colors.onPrimaryContainer,
          }}
        >
          Check out what's happening in your community today
        </Text>

        <Button
          mode="contained"
          onPress={() =>
            navigation.navigate("Events", {
              screen: "EventsList",
              params: { initialCategory: "Today" },
            })
          }
          style={{ alignSelf: "center", width: 280 }}
        >
          View Today's Events
        </Button>
      </Card>
    </Surface>
  );
}