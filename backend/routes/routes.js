const express = require("express");
const router = express.Router();

const PUNE_SITES = [
  {
    id: "shaniwar-wada",
    name: "Shaniwar Wada",
    marathiName: "शनिवार वाडा",
    hindiName: "शनिवार वाड़ा",
    category: "Heritage",
    rating: 4.8,
    reviewCount: 14200,
    approxCost: "₹25 (Indian) / ₹300 (Foreigner)",
    costNum: 25,
    visitingHours: "8:00 AM – 6:30 PM",
    bestTimeToVisit: "Morning (8 AM - 10 AM) or Sunset",
    lat: 18.5196,
    lng: 73.8553,
    image: "https://images.unsplash.com/photo-1627894483216-2138af692e32?q=80&w=1000&auto=format&fit=crop",
    shortDescription: "7-story seat of the Peshwa rulers of the Maratha Empire built in 1732. Symbolic heart of Pune's imperial history."
  },
  {
    id: "aga-khan-palace",
    name: "Aga Khan Palace",
    marathiName: "आगाखान पॅलेस",
    hindiName: "आगा खान पैलेस",
    category: "History",
    rating: 4.7,
    reviewCount: 9800,
    approxCost: "₹25 (Indian) / ₹300 (Foreigner)",
    costNum: 25,
    visitingHours: "9:00 AM – 5:30 PM",
    bestTimeToVisit: "Afternoon (3 PM - 5 PM)",
    lat: 18.5529,
    lng: 73.9015,
    image: "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?q=80&w=1000&auto=format&fit=crop",
    shortDescription: "Italian arches, sprawling lawns, and deeply tied to India's Freedom Movement & Mahatma Gandhi's legacy."
  },
  {
    id: "sinhagad-fort",
    name: "Sinhagad Fort",
    marathiName: "सिंहगड किल्ला",
    hindiName: "सिंहगढ़ किला",
    category: "Forts",
    rating: 4.9,
    reviewCount: 22000,
    approxCost: "₹50 (Vehicle Entry Fee)",
    costNum: 50,
    visitingHours: "5:00 AM – 6:00 PM",
    bestTimeToVisit: "Early Morning (6 AM - 9 AM) or Monsoon",
    lat: 18.3663,
    lng: 73.7559,
    image: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=1000&auto=format&fit=crop",
    shortDescription: "Majestic hill fortress 4,300 ft above sea level, legendary site of Tanaji Malusare's heroic victory in 1670."
  },
  {
    id: "pataleshwar-cave",
    name: "Pataleshwar Cave Temple",
    marathiName: "पाताळेश्वर गुंफा मंदीर",
    hindiName: "पातालेश्वर गुफा मंदिर",
    category: "Heritage",
    rating: 4.6,
    reviewCount: 6100,
    approxCost: "Free",
    costNum: 0,
    visitingHours: "8:30 AM – 5:30 PM",
    bestTimeToVisit: "Morning or Midday (cool stone interiors)",
    lat: 18.5268,
    lng: 73.8504,
    image: "https://images.unsplash.com/photo-1600100397608-f010e423b971?q=80&w=1000&auto=format&fit=crop",
    shortDescription: "8th-century Rashtrakuta period rock-cut cave temple carved out of a single monolithic basalt rock."
  },
  {
    id: "kelkar-museum",
    name: "Raja Dinkar Kelkar Museum",
    marathiName: "राजा दिनकर केळकर संग्रहालय",
    hindiName: "राजा दिनकर केलकर संग्रहालय",
    category: "Museums",
    rating: 4.7,
    reviewCount: 7500,
    approxCost: "₹100 (Adults) / ₹30 (Children)",
    costNum: 100,
    visitingHours: "10:00 AM – 5:30 PM",
    bestTimeToVisit: "11:00 AM – 2:00 PM",
    lat: 18.5109,
    lng: 73.8542,
    image: "https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?q=80&w=1000&auto=format&fit=crop",
    shortDescription: "Mind-boggling collection of 20,000+ Indian everyday antiques, musical instruments, and the reconstructed Mastani Mahal."
  }
];

// Health test endpoint
router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "HeritageAI Pune API server is operational 🚀",
  });
});

// GET all Pune destinations
router.get("/destinations", (req, res) => {
  res.json({
    success: true,
    destinations: PUNE_SITES,
  });
});

// POST /api/plan-trip — AI Itinerary Generator
router.post("/plan-trip", async (req, res) => {
  const { city = "Pune", days = 2, budget = 5000, companions = "Family", interests = [], language = "English", prompt } = req.body;
  const apiKey = process.env.GEMINI_API_KEY || process.env.AI_API_KEY;

  if (apiKey) {
    try {
      const promptText = `You are HeritageAI, an expert AI travel planner for Pune, Maharashtra, India.
Generate a detailed JSON itinerary for a ${days}-day trip to Pune for a ${companions} group with a total budget of ₹${budget}.
Interests: ${interests.join(", ")}.
Output language requested: ${language}.
User special request: "${prompt || 'Authentic Peshwa heritage and food'}".

Format your response EXACTLY as a valid JSON object with the following structure:
{
  "success": true,
  "city": "Pune, Maharashtra",
  "daysCount": ${days},
  "budget": ${budget},
  "language": "${language}",
  "sustainabilityScore": 89,
  "experienceScore": 95,
  "budgetBreakdown": {
    "transport": 1200,
    "food": 1400,
    "entryFees": 500,
    "experiences": 700,
    "totalCost": 3800,
    "remainingBudget": 1200
  },
  "sustainabilityPerks": [
    "✓ Supporting Kasba Peth heritage copper craft masters",
    "✓ Optimized low-carbon walking route between Shaniwar Wada & Laxmi Road",
    "✓ Encouraging public Pune Metro & EV auto-rickshaw transit"
  ],
  "itinerary": [
    {
      "day": 1,
      "theme": "Day 1 Theme Title in ${language}",
      "stops": [
        {
          "time": "09:00 AM",
          "title": "Shaniwar Wada",
          "siteId": "shaniwar-wada",
          "category": "Heritage",
          "lat": 18.5196,
          "lng": 73.8553,
          "activity": "Activity description in ${language}",
          "cost": 25,
          "travelTime": "20 mins",
          "distance": "3.2 km"
        }
      ]
    }
  ]
}`;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: promptText }] }] })
      });

      const data = await response.json();
      if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
        const text = data.candidates[0].content.parts[0].text;
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          return res.json(parsed);
        }
      }
    } catch (err) {
      console.warn("AI API call exception, using Pune fallback engine:", err.message);
    }
  }

  // Fallback Generator
  return res.json(buildFallbackResponse({ days, budget, companions, interests, language }));
});

// POST /api/ask-ai — Natural Language Assistant
router.post("/ask-ai", async (req, res) => {
  const { prompt, context, language = "English" } = req.body;
  const apiKey = process.env.GEMINI_API_KEY || process.env.AI_API_KEY;

  if (apiKey && prompt) {
    try {
      const promptText = `You are HeritageAI, an expert cultural tourism guide for Pune, Maharashtra, India.
Respond politely and knowledgeably in ${language} to the following question:
"${prompt}"
${context ? `Context destination: ${JSON.stringify(context)}` : ""}
Keep the answer engaging, accurate, and under 120 words.`;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: promptText }] }] })
      });

      const data = await response.json();
      if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
        return res.json({
          success: true,
          answer: data.candidates[0].content.parts[0].text
        });
      }
    } catch (err) {
      console.warn("Ask-AI call exception, using fallback response:", err.message);
    }
  }

  // Fallback response
  let answer = `HeritageAI Pune: Pune is rich in Maratha history, Sahyadri fortresses, and delicious Maharashtrian cuisine! For "${prompt}", we recommend visiting Shaniwar Wada in the morning and tasting authentic Puneri Misal.`;
  
  if (language === "Marathi") {
    answer = `HeritageAI पुणे: पुणे हे मराठा साम्राज्य, छत्रपती शिवाजी महाराज, पेशवेकालीन संस्कृती आणि स्वादिष्ट पुणेरी खाद्यान्नाचे केंद्र आहे! आपल्याला "${prompt}" बद्दल अधिक माहिती हवी असल्यास शनिवार वाडा आणि लाल महाल नक्की पहा.`;
  } else if (language === "Hindi") {
    answer = `HeritageAI पुणे: पुणे भारत की मराठा धरोहर और संस्कृति का केंद्र है। आपके प्रश्न "${prompt}" के लिए, हम शनिवार वाड़ा और सिंहगढ़ किले के भ्रमण की सलाह देते हैं।`;
  }

  return res.json({ success: true, answer });
});

function buildFallbackResponse({ days = 2, budget = 5000, companions = "Family", interests = [], language = "English" }) {
  const dCount = parseInt(days, 10) || 2;
  const bAmt = parseInt(budget, 10) || 5000;

  const day1Title = language === 'Marathi' ? "पेशवेकालीन वारसा आणि पुणेरी मिसळ आस्वाद" : language === 'Hindi' ? "पेशवा कालीन विरासत और पुणेरी भोजन" : "Imperial Peshwa Heritage & Misal Tour";
  const day2Title = language === 'Marathi' ? "सिंहगड किल्ला पराक्रम आणि केळकर संग्रहालय" : language === 'Hindi' ? "सिंहगढ़ किला और केलकर संग्रहालय" : "Sinhagad Fortress & Kelkar Artifacts";

  return {
    success: true,
    isFallback: true,
    city: "Pune, Maharashtra",
    daysCount: dCount,
    budget: bAmt,
    language,
    sustainabilityScore: 91,
    experienceScore: 96,
    budgetBreakdown: {
      transport: dCount * 450,
      food: dCount * 650,
      entryFees: dCount * 180,
      experiences: dCount * 300,
      totalCost: dCount * 1580,
      remainingBudget: Math.max(0, bAmt - (dCount * 1580))
    },
    sustainabilityPerks: [
      "✓ Supporting authentic coppersmith craftsmen in Kasba Peth",
      "✓ Walkable monument cluster between Shaniwar Wada & Lal Mahal",
      "✓ Direct patronage of local traditional sweet & misal vendors"
    ],
    itinerary: [
      {
        day: 1,
        theme: day1Title,
        stops: [
          {
            time: "09:00 AM",
            title: language === 'Marathi' ? "शनिवार वाडा" : language === 'Hindi' ? "शनिवार वाड़ा" : "Shaniwar Wada",
            siteId: "shaniwar-wada",
            category: "Heritage",
            lat: 18.5196,
            lng: 73.8553,
            activity: language === 'Marathi' ? "१७३२ मधील पेशवेकालीन वाडा व दिल्ली दरवाजा पाहणे." : "1732 Peshwa Fort exploration and Dilli Darwaza architecture.",
            cost: 25,
            travelTime: "20 mins",
            distance: "3.2 km"
          },
          {
            time: "01:00 PM",
            title: language === 'Marathi' ? "पुणेरी मिसळ पाव भोजनास्वाद" : "Bedekar Puneri Misal Pav",
            siteId: "misal-pav",
            category: "Food",
            lat: 18.5200,
            lng: 73.8550,
            activity: language === 'Marathi' ? "झणझणीत रस्सा मिसळ व सुजाता मस्तानी डेझर्ट." : "Authentic fiery sprouted moth bean curry with Sujata Mastani.",
            cost: 160,
            travelTime: "10 mins",
            distance: "0.8 km"
          },
          {
            time: "03:30 PM",
            title: language === 'Marathi' ? "राजा दिनकर केळकर संग्रहालय" : "Raja Dinkar Kelkar Museum",
            siteId: "kelkar-museum",
            category: "Museums",
            lat: 18.5109,
            lng: 73.8542,
            activity: language === 'Marathi' ? "२०,००० दुर्मिळ वस्तू आणि मस्तानी महाल पाहणे." : "View 20,000 Indian antiques and reconstructed Mastani Mahal.",
            cost: 100,
            travelTime: "15 mins",
            distance: "1.4 km"
          }
        ]
      },
      {
        day: 2,
        theme: day2Title,
        stops: [
          {
            time: "08:00 AM",
            title: language === 'Marathi' ? "सिंहगड किल्ला" : "Sinhagad Fort",
            siteId: "sinhagad-fort",
            category: "Forts",
            lat: 18.3663,
            lng: 73.7559,
            activity: language === 'Marathi' ? "तानाजी मालुसरे यांच्या पराक्रमाची भूमी व गडावर गरमागरम पिठलं भाकरी." : "Historic 1670 Maratha battle fortress & traditional mountain Pithla Bhakri.",
            cost: 50,
            travelTime: "45 mins",
            distance: "28 km"
          },
          {
            time: "02:00 PM",
            title: language === 'Marathi' ? "आगाखान पॅलेस" : "Aga Khan Palace",
            siteId: "aga-khan-palace",
            category: "History",
            lat: 18.5529,
            lng: 73.9015,
            activity: language === 'Marathi' ? "महात्मा गांधींची समाधी व १९४२ भारत छोडो आंदोलनाचे स्मारक." : "Gandhian freedom movement memorial and serene Italian arch architecture.",
            cost: 25,
            travelTime: "40 mins",
            distance: "22 km"
          }
        ]
      }
    ]
  };
}

module.exports = router;
