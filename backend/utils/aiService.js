import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

// export const generateItinerary = async (
//   extractedText
// ) => {
//   const model =
//     genAI.getGenerativeModel({
//       model: "gemini-2.0-flash",
//     });
//     console.log(
//       "Gemini Key:",
//       process.env.GEMINI_API_KEY
//     );
//   const prompt = `
// You are a travel assistant. Based on the following travel booking information, generate a detailed day-by-day travel itinerary.

// Booking Information:
// ${extractedText}

// Return a JSON object (no markdown, just raw JSON) with this structure:
// {
//   "title": "Trip title based on destination",
//   "summary": "Brief trip summary",
//   "destination": "Primary destination",
//   "duration": "e.g. 5 days",
//   "travelers": "number if mentioned",
//   "days": [
//     {
//       "day": 1,
//       "date": "if available, else null",
//       "label": "Arrival Day",
//       "activities": [
//         {
//           "time": "09:00 AM",
//           "title": "Activity name",
//           "description": "What to do",
//           "type": "flight|hotel|sightseeing|food|transport"
//         }
//       ],
//       "tips": "Optional tips"
//     }
//   ],
//   "bookingHighlights": {
//     "flights": [],
//     "hotels": [],
//     "transport": []
//   }
// }`;

//   const result =
//     await model.generateContent(
//       prompt
//     );

//   const text = result.response
//     .text()
//     .trim();

//   const cleaned = text
//     .replace(/^```json\s*/i, "")
//     .replace(/```$/i, "")
//     .trim();

//   return JSON.parse(cleaned);
// };


export const generateItinerary = async (extractedText) => {
  return {
    title: "Trip to Paris & London",
    summary: "A wonderful 5-day European adventure covering the best of Paris and London.",
    destination: "Paris, France & London, UK",
    duration: "5 days",
    travelers: "2",
    days: [
      {
        day: 1,
        date: "Day 1",
        label: "Arrival in Paris",
        activities: [
          { time: "10:00 AM", title: "Arrive at Charles de Gaulle Airport", description: "Land at CDG, collect baggage and take RER B train to city center.", type: "flight" },
          { time: "01:00 PM", title: "Check-in at Hotel", description: "Check into your hotel near the Eiffel Tower area.", type: "hotel" },
          { time: "03:00 PM", title: "Eiffel Tower Visit", description: "Visit the iconic Eiffel Tower and enjoy views of Paris.", type: "sightseeing" },
          { time: "07:00 PM", title: "Dinner at Le Jules Verne", description: "Enjoy a fine dining experience with panoramic Paris views.", type: "food" }
        ],
        tips: "Buy Eiffel Tower tickets online in advance to skip the queue."
      },
      {
        day: 2,
        date: "Day 2",
        label: "Paris Exploration",
        activities: [
          { time: "09:00 AM", title: "Louvre Museum", description: "Explore the world's largest art museum including the Mona Lisa.", type: "sightseeing" },
          { time: "01:00 PM", title: "Lunch at Cafe de Flore", description: "Famous Parisian cafe with great croissants and coffee.", type: "food" },
          { time: "03:00 PM", title: "Notre Dame Cathedral", description: "Visit the historic cathedral and surrounding Île de la Cité.", type: "sightseeing" },
          { time: "06:00 PM", title: "Seine River Cruise", description: "Relaxing boat cruise along the Seine river at sunset.", type: "transport" }
        ],
        tips: "Get a Paris Museum Pass for free entry to 50+ museums."
      },
      {
        day: 3,
        date: "Day 3",
        label: "Travel to London",
        activities: [
          { time: "08:00 AM", title: "Check out of Paris Hotel", description: "Pack up and head to Gare du Nord station.", type: "hotel" },
          { time: "09:30 AM", title: "Eurostar to London", description: "Board the Eurostar train from Paris to London St Pancras.", type: "transport" },
          { time: "11:30 AM", title: "Arrive London St Pancras", description: "Arrive in London and take the tube to your hotel.", type: "transport" },
          { time: "02:00 PM", title: "Big Ben & Westminster", description: "Walk around Westminster, see Big Ben and the Houses of Parliament.", type: "sightseeing" },
          { time: "07:00 PM", title: "Dinner in Covent Garden", description: "Explore the lively Covent Garden area for dinner options.", type: "food" }
        ],
        tips: "Book Eurostar tickets early for best prices."
      },
      {
        day: 4,
        date: "Day 4",
        label: "London Highlights",
        activities: [
          { time: "09:00 AM", title: "Tower of London", description: "Explore the historic castle and see the Crown Jewels.", type: "sightseeing" },
          { time: "12:00 PM", title: "Tower Bridge Walk", description: "Walk across Tower Bridge and enjoy views of the Thames.", type: "sightseeing" },
          { time: "02:00 PM", title: "Borough Market Lunch", description: "London's famous food market with amazing street food.", type: "food" },
          { time: "04:00 PM", title: "British Museum", description: "Explore ancient artifacts including the Rosetta Stone.", type: "sightseeing" }
        ],
        tips: "Most London museums are free entry!"
      },
      {
        day: 5,
        date: "Day 5",
        label: "Departure Day",
        activities: [
          { time: "09:00 AM", title: "Morning at Notting Hill", description: "Explore the colorful Portobello Road market.", type: "sightseeing" },
          { time: "12:00 PM", title: "Last Lunch in London", description: "Final meal at a traditional British pub.", type: "food" },
          { time: "03:00 PM", title: "Head to Heathrow Airport", description: "Take the Heathrow Express from Paddington station.", type: "transport" },
          { time: "06:00 PM", title: "Departure Flight", description: "Board your flight home from Heathrow Terminal 5.", type: "flight" }
        ],
        tips: "Heathrow Express takes only 15 minutes from Paddington."
      }
    ],
    bookingHighlights: {
      flights: ["Outbound: Flight AI302 - Mumbai to Paris CDG", "Return: Flight BA107 - London Heathrow to Mumbai"],
      hotels: ["Hotel Eiffel Seine, Paris - 2 nights", "The Strand Palace Hotel, London - 2 nights"],
      transport: ["Eurostar: Paris Gare du Nord to London St Pancras"]
    }
  };
};