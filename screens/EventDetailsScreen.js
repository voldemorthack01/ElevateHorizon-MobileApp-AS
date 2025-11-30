import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { Surface, Text, Button } from "react-native-paper";
import { getEventById } from "../utils/api";
import { useAppPreferences } from "../components/AppPreferences";

export default function EventDetailsScreen({ route, navigation }) {
  const { theme } = useAppPreferences();
  const { eventId } = route.params;

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadDetails() {
      try {
        const data = await getEventById(eventId);
        setEvent(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadDetails();
  }, [eventId]);

  if (loading) return <ActivityIndicator style={{ marginTop: 50 }} />;
  if (error) return <Text style={{ color: "red", margin: 20 }}>{error}</Text>;

  return (
    <Surface style={{ flex: 1, padding: 16 }} elevation={5}>
      <Text variant="headlineLarge" style={{ marginBottom: 8 }}>
        {event.title}
      </Text>
      <Text>Category: {event.category}</Text>
      <Text>Date: {event.date}</Text>
      <Text>Location: {event.location}</Text>
      <Text>Description: {event.description}</Text>
      <Text>Capacity: {event.capacity}</Text>
      <Text>Spots Remaining: {event.spotsRemaining}</Text>

      {event.isCancelled && (
        <Text style={{ color: "red", fontWeight: "bold", marginTop: 8 }}>
          This event has been cancelled
        </Text>
      )}

      <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 16 }}>
        <Button onPress={() => navigation.goBack()}>Back</Button>
        <Button
          onPress={() => navigation.navigate("EventRegistration", { event })}
          disabled={event.spotsRemaining <= 0 || event.isCancelled}
        >
          Register
        </Button>
      </View>
    </Surface>
  );
}