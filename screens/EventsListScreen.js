import React, { useEffect, useState } from "react";
import { View, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { Surface, Text, Button, TextInput } from "react-native-paper";
import { fetchEvents } from "../utils/api";
import { useAppPreferences } from "../components/AppPreferences";

export default function EventsListScreen({ navigation, route }) {
  const initialCategory = route.params?.initialCategory || "All";
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  const { theme } = useAppPreferences();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [offline, setOffline] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  // const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["Today", "All", "Sports", "Music", "Tech", "Education", "Community"];

  useEffect(() => {
    async function loadEvents() {
      try {
        const data = await fetchEvents();
        setEvents(data);
        setOffline(false);
      } catch (err) {
        setError(err.message);
        setOffline(true);
      } finally {
        setLoading(false);
      }
    }
    loadEvents();
  }, []);

  if (loading) return <ActivityIndicator style={{ marginTop: 50 }} />;

  // ✅ Apply search + filter
  let filteredEvents = [...events];

  // Filter by category
  if (selectedCategory === "Today") {
    const today = new Date().toISOString().split("T")[0];
    filteredEvents = filteredEvents.filter((e) => e.date.startsWith(today));
  } else if (selectedCategory !== "All") {
    filteredEvents = filteredEvents.filter((e) => e.category === selectedCategory);
  }

  // Filter by search query
  if (searchQuery.trim() !== "") {
    const q = searchQuery.toLowerCase();
    filteredEvents = filteredEvents.filter(
      (e) =>
        e.title.toLowerCase().includes(q) ||
        e.description?.toLowerCase().includes(q)
    );
  }

  return (
    <Surface style={{ flex: 1, padding: 16 }} elevation={5}>
      {/* Offline banner */}
      {offline && (
        <View
          style={{
            backgroundColor: "#ffcc00",
            padding: 10,
            marginBottom: 10,
            borderRadius: 6,
          }}
        >
          <Text style={{ fontWeight: "bold", color: "white", textAlign: "center" }}>
            You are using the app in Offline Mode
          </Text>
        </View>
      )}

      {/* Error banner */}
      {error && (
        <View
          style={{
            backgroundColor: "#ff4444",
            padding: 10,
            marginBottom: 10,
            borderRadius: 6,
          }}
        >
          <Text style={{ fontWeight: "bold", color: "white", textAlign: "center" }}>
            {error}
          </Text>
        </View>
      )}

      {/* Search box */}
      <TextInput
        placeholder="Search events..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={{
          padding: 8,
          borderRadius: 6,
          borderWidth: 1,
          borderColor: "#ddd",
          marginBottom: 16,
        }}
      />

      {/* Filter buttons */}
      <View style={{ flexDirection: "row", flexWrap: "wrap", marginBottom: 16 }}>
        {categories.map((cat) => (
          <View key={cat} style={{ width: "30%", marginBottom: 8 }}>
            <Button
              mode={selectedCategory === cat ? "contained" : "outlined"}
              onPress={() => setSelectedCategory(cat)}
              style={{ margin: 2 }}
            >
              {cat}
            </Button>
          </View>
        ))}
      </View>

      {/* Events list */}
      <ScrollView>
        {filteredEvents.map((event) => (
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