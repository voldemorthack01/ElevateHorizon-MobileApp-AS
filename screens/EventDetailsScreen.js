import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { Surface, Text, Button, Card } from "react-native-paper";
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
      <Card style={{ padding: 16, borderRadius: 12 }} elevation={3}>
        <Text
          variant="headlineLarge"
          style={{ marginBottom: 12, fontSize: theme.fontSizes.headlineLarge, fontWeight: "bold" }}
        >
          {event.title}
        </Text>

        <Text style={{ fontSize: theme.fontSizes.title, marginBottom: 4 }}>
          Category: {event.category}
        </Text>
        <Text style={{ fontSize: theme.fontSizes.title, marginBottom: 4 }}>
          Date: {event.date}
        </Text>
        <Text style={{ fontSize: theme.fontSizes.title, marginBottom: 4 }}>
          Location: {event.location}
        </Text>
        <Text style={{ fontSize: theme.fontSizes.title, marginBottom: 4 }}>
          Description: {event.description}
        </Text>
        <Text style={{ fontSize: theme.fontSizes.title, marginBottom: 4 }}>
          Capacity: {event.capacity}
        </Text>
        <Text style={{ fontSize: theme.fontSizes.title, marginBottom: 4 }}>
          Spots Remaining: {event.spotsRemaining}
        </Text>

        {event.isCancelled && (
          <Text
            style={{
              fontSize: theme.fontSizes.title,
              color: "red",
              fontWeight: "bold",
              marginTop: 8,
            }}
          >
            This event has been cancelled
          </Text>
        )}

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 20,
          }}
        >
          <Button
            mode="outlined"
            onPress={() => navigation.goBack()}
            style={{ fontSize: theme.fontSizes.body, flex: 1, marginRight: 8 }}
          >
            Back
          </Button>
          <Button
            mode="contained"
            onPress={() => navigation.navigate("EventRegistration", { event })}
            disabled={event.spotsRemaining <= 0 || event.isCancelled}
            style={{ fontSize: theme.fontSizes.body, flex: 1, marginLeft: 8 }}
          >
            Register
          </Button>
        </View>
      </Card>
    </Surface>
  );
}