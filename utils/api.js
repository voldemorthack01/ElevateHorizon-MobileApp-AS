// utils/api.js

const API_BASE_URL = "http://localhost:3000/api";

/**
 * jh-f : Fetch
 * Fetches all events from the API
 */
export async function fetchEvents() {
  try {
    const response = await fetch(`${API_BASE_URL}/events`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to fetch events");
    }

    return data; // array of events
  } catch (error) {
    console.error("⚠️ fetchEvents error:", error.message);
    return [];
  }
}

/**
 * jh-fbi : Fetch By ID
 * Fetches a single event by its ID
 */
export async function getEventById(eventId) {
  try {
    const response = await fetch(`${API_BASE_URL}/events/${eventId}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to fetch event");
    }

    return data; // single event object
  } catch (error) {
    console.error("⚠️ getEventById error:", error.message);
    return null;
  }
}

/**
 * jh-fa : Fetch Add
 * Adds a new registration (POST)
 */
export async function addRegistration(eventId, fullName, email) {
  try {
    const response = await fetch(`${API_BASE_URL}/registrations`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ eventId, fullName, email }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Registration failed");
    }

    return data; // success response
  } catch (error) {
    console.error("⚠️ addRegistration error:", error.message);
    return { success: false, error: error.message };
  }
}

/**
 * jh-fu : Fetch Update
 * Updates an event (PUT)
 */
export async function updateEvent(eventId, updateData) {
  try {
    const response = await fetch(`${API_BASE_URL}/events/${eventId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Update failed");
    }

    return data;
  } catch (error) {
    console.error("⚠️ updateEvent error:", error.message);
    return null;
  }
}

/**
 * jh-fd : Fetch Delete
 * Deletes an event (DELETE)
 */
export async function deleteEvent(eventId) {
  try {
    const response = await fetch(`${API_BASE_URL}/events/${eventId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Delete failed");
    }

    return { success: true };
  } catch (error) {
    console.error("⚠️ deleteEvent error:", error.message);
    return { success: false, error: error.message };
  }
}