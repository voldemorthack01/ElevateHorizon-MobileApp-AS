import React, { useState } from "react";
import { View, ScrollView, ActivityIndicator } from "react-native";
import { Surface, Text, TextInput, Button } from "react-native-paper";
import { addRegistration } from "../utils/api";
import { useAppPreferences } from "../components/AppPreferences";

export default function EventRegistrationScreen({ route, navigation }) {
  const { theme } = useAppPreferences();
  const { event } = route.params;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleRegister = async () => {
    if (!name || !email) {
      setMessage("Please fill in all fields");
      return;
    }
    setLoading(true);
    try {
      const result = await addRegistration(event.id, name, email);
      if (result.success) {
        setMessage(`Registration successful! - you are booked for ${event.title}.\nNow returning to events list...`);
        setTimeout(() => {
          navigation.reset({ index: 0, routes: [{ name: "EventsList" }] });
        }, 5500);
      } else {
        setMessage(result.error || "Registration failed");
      }
    } catch (err) {
      setMessage("Network error during registration");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <ActivityIndicator style={{ marginTop: 50 }} />;

  return (
    <Surface style={{ flex: 1, padding: 16 }} elevation={5}>
      <ScrollView>
        <Text variant="headlineLarge" style={{ marginBottom: 12 }}>
          Register for: {event.title}
        </Text>
        <Text>Available Spots: {event.spotsRemaining}</Text>

        <TextInput
          label="Name"
          value={name}
          onChangeText={setName}
          style={{ marginBottom: 12 }}
        />
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          style={{ marginBottom: 12 }}
        />

        {message && (
          <Text style={{ marginBottom: 12, color: message.includes("success") ? "green" : "red" }}>
            {message}
          </Text>
        )}

        <Button mode="contained" onPress={handleRegister} disabled={event.spotsRemaining <= 0}>
          Submit
        </Button>
      </ScrollView>
    </Surface>
  );
}