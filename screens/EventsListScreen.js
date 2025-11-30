import React, { useEffect, useState } from "react";
import { View, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { Surface, Text, Button } from "react-native-paper";
import { fetchEvents } from "../utils/api";
import { useAppPreferences } from "../components/AppPreferences";

export default function EventsListScreen({ navigation }) {
  const { theme } = useAppPreferences();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadEvents() {
      try {
        const data = await fetchEvents();
        setEvents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadEvents();
  }, []);

  if (loading) return <ActivityIndicator style={{ marginTop: 50 }} />;

  return (
    <Surface style={{ flex: 1, padding: 16 }} elevation={5}>
      {error && (
        <View style={{ backgroundColor: "#ff4444", padding: 10, borderRadius: 6, marginBottom: 10 }}>
          <Text style={{ color: "white", textAlign: "center" }}>{error}</Text>
        </View>
      )}

      <ScrollView>
        {events.map((event) => (
          <TouchableOpacity
            key={event.id}
            onPress={() => navigation.navigate("EventDetails", { eventId: event.id })}
            style={{
              backgroundColor: theme.colors.surfaceVariant,
              padding: 16,
              borderRadius: 10,
              marginBottom: 12,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>{event.title}</Text>
            <Text style={{ color: theme.colors.secondary }}>{event.category}</Text>
            <Text style={{ color: theme.colors.onSurface }}>{event.date}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </Surface>
  );
}