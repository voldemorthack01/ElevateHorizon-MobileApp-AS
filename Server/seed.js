// seed.js
require("dotenv").config();
const sequelize = require("./database");
const { Event, Registration } = require("./models");

async function seed() {
  try {
    console.log("Seeding database...");

    // force sync: drops all tables
    await sequelize.sync({ force: true });

    // Prepare events (20+), dates across Nov & Dec 2025
    // Start at 2025-11-16 (today)
    const eventsData = [
      // Nov 2025
      {
        title: "Morning Yoga",
        date: "2025-11-16",
        startTime: "08:00",
        endTime: "09:00",
        location: "Community Hall A",
        category: "Fitness",
        description: "Gentle yoga for all levels.",
        capacity: 20,
      },
      {
        title: "Walking Club - Riverside",
        date: "2025-11-17",
        startTime: "07:00",
        endTime: "08:00",
        location: "Riverside Park",
        category: "Fitness",
        description: "Community walking group.",
        capacity: 30,
      },
      {
        title: "Trivia Night",
        date: "2025-11-18",
        startTime: "19:00",
        endTime: "21:30",
        location: "Town Library",
        category: "Social",
        description: "Teams, prizes, and fun.",
        capacity: 50,
      },
      {
        title: "Kids Art Workshop",
        date: "2025-11-19",
        startTime: "10:00",
        endTime: "12:00",
        location: "Arts Centre",
        category: "Arts",
        description: "Creative art session for children aged 6-12.",
        capacity: 25,
      },
      {
        title: "Community Swimming Session",
        date: "2025-11-20",
        startTime: "14:00",
        endTime: "15:00",
        location: "Public Pool",
        category: "Fitness",
        description: "Open swim for families.",
        capacity: 40,
      },
      {
        title: "Local Band Night",
        date: "2025-11-21",
        startTime: "18:30",
        endTime: "21:30",
        location: "Town Square",
        category: "Music",
        description: "Live local music performances.",
        capacity: 200,
      },
      {
        title: "Technology Basics For Seniors",
        date: "2025-11-22",
        startTime: "13:00",
        endTime: "15:00",
        location: "Library Room 2",
        category: "Education",
        description: "Intro to smartphones and tablets.",
        capacity: 15,
      },
      {
        title: "Board Games Afternoon",
        date: "2025-11-23",
        startTime: "15:00",
        endTime: "18:00",
        location: "Community Centre",
        category: "Social",
        description: "Bring a game or play one here.",
        capacity: 30,
      },
      {
        title: "Evening Meditation",
        date: "2025-11-24",
        startTime: "18:00",
        endTime: "19:00",
        location: "Wellbeing Room",
        category: "Health",
        description: "Guided mindfulness meditation.",
        capacity: 20,
      },
      {
        title: "Community Gardening Meetup",
        date: "2025-11-25",
        startTime: "09:00",
        endTime: "11:00",
        location: "Community Garden",
        category: "Community",
        description: "Volunteer gardening and seed swap.",
        capacity: 25,
      },

      // more late Nov / early Dec
      {
        title: "Film Screening: Classic Movies",
        date: "2025-11-28",
        startTime: "19:00",
        endTime: "21:30",
        location: "Town Hall",
        category: "Entertainment",
        description: "Free screening of family classics.",
        capacity: 120,
      },
      {
        title: "Guitar Workshop",
        date: "2025-11-29",
        startTime: "10:00",
        endTime: "12:00",
        location: "Music Room",
        category: "Music",
        description: "Beginner guitar techniques.",
        capacity: 12,
      },
      {
        title: "Community BBQ",
        date: "2025-11-30",
        startTime: "12:00",
        endTime: "15:00",
        location: "Lake Park",
        category: "Food",
        description: "Bring a plate to share.",
        capacity: 150,
      },

      // December 2025 events
      {
        title: "Holiday Crafts Market",
        date: "2025-12-03",
        startTime: "09:00",
        endTime: "14:00",
        location: "Market Street",
        category: "Arts",
        description: "Local makers and holiday gifts.",
        capacity: 100,
      },
      {
        title: "Community Choir Rehearsal",
        date: "2025-12-05",
        startTime: "18:00",
        endTime: "20:00",
        location: "Chapel Hall",
        category: "Music",
        description: "Weekly choir practice.",
        capacity: 60,
      },
      {
        title: "First Aid Refresher",
        date: "2025-12-07",
        startTime: "09:00",
        endTime: "13:00",
        location: "Training Room",
        category: "Education",
        description: "CPR and first aid basics.",
        capacity: 20,
      },
      {
        title: "Senior Social Lunch",
        date: "2025-12-10",
        startTime: "12:00",
        endTime: "14:00",
        location: "Community Centre",
        category: "Social",
        description: "Lunch & social activities for seniors.",
        capacity: 30,
      },
      {
        title: "Outdoor Bootcamp",
        date: "2025-12-12",
        startTime: "06:30",
        endTime: "07:30",
        location: "Football Oval",
        category: "Fitness",
        description: "Outdoor group fitness.",
        capacity: 25,
      },
      {
        title: "Photography Walk",
        date: "2025-12-15",
        startTime: "16:00",
        endTime: "18:30",
        location: "Old Town",
        category: "Arts",
        description: "Guided photography tips around town.",
        capacity: 20,
      },
      {
        title: "Kids Coding Club",
        date: "2025-12-18",
        startTime: "15:00",
        endTime: "17:00",
        location: "Library Tech Lab",
        category: "Technology",
        description: "Intro to block coding for kids.",
        capacity: 18,
      },
      {
        title: "New Year Planning Meetup",
        date: "2025-12-28",
        startTime: "18:00",
        endTime: "19:30",
        location: "Community Hall B",
        category: "Community",
        description: "Plan community events for new year.",
        capacity: 50,
      },
    ];

    // create events
    for (const e of eventsData) {
      const ev = await Event.create({
        title: e.title,
        date: e.date,
        startTime: e.startTime,
        endTime: e.endTime,
        location: e.location,
        category: e.category,
        description: e.description,
        capacity: e.capacity,
        spotsRemaining: e.capacity,
        isCancelled: e.isCancelled || false,
      });
      console.log(`Created event: ${ev.title} (${ev.date})`);
    }

    // Add a few fictitious registrations for some November events
    // Find some events in November
    const novRegs = [
      {
        eventTitle: "Morning Yoga",
        fullName: "Alice Morgan",
        email: "alice@example.com",
      },
      {
        eventTitle: "Morning Yoga",
        fullName: "Ben Turner",
        email: "ben.t@example.com",
      },
      {
        eventTitle: "Trivia Night",
        fullName: "Catherine Lee",
        email: "catherine@example.com",
      },
      {
        eventTitle: "Community BBQ",
        fullName: "Dan Wilson",
        email: "dan.w@example.com",
      },
      {
        eventTitle: "Walking Club - Riverside",
        fullName: "Eva Santos",
        email: "eva.s@example.com",
      },
    ];

    for (const r of novRegs) {
      const ev = await Event.findOne({ where: { title: r.eventTitle } });
      if (!ev) continue;
      // create registration if spots available
      if (ev.spotsRemaining > 0) {
        const reg = await Registration.create({
          eventId: ev.id,
          fullName: r.fullName,
          email: r.email,
        });
        ev.spotsRemaining = ev.spotsRemaining - 1;
        await ev.save();
        console.log(`Registered ${r.fullName} to ${ev.title}`);
      }
    }

    console.log("Seeding complete.");
    process.exit(0);
  } catch (err) {
    console.error("Seeding failed:", err);
    process.exit(1);
  }
}

seed();
