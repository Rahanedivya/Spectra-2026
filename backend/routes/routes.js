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
    message: "Atithya AI API server is operational 🚀",
  });
});

// GET all Pune destinations
router.get("/destinations", (req, res) => {
  res.json({
    success: true,
    destinations: PUNE_SITES,
  });
});

// POST /api/plan-trip — AI Smart Trip Planner Route
router.post("/plan-trip", async (req, res) => {
  const {
    city = "Pune",
    days = 2,
    budget = 5000,
    companions = "Family",
    travelType = "Family",
    interests = ["Heritage", "Food"],
    language = "English"
  } = req.body;

  // Input Validation
  const numDays = parseInt(days, 10);
  const numericBudget = Number(budget);

  if (isNaN(numDays) || numDays < 1 || numDays > 30) {
    return res.status(400).json({
      success: false,
      error: "Number of days must be between 1 and 30."
    });
  }

  if (isNaN(numericBudget) || numericBudget <= 0) {
    return res.status(400).json({
      success: false,
      error: "Budget must be a positive number in INR."
    });
  }

  if (!Array.isArray(interests) || interests.length === 0) {
    return res.status(400).json({
      success: false,
      error: "At least one interest must be selected."
    });
  }

  const apiKey = process.env.GEMINI_API_KEY || process.env.AI_API_KEY;

  if (apiKey) {
    try {
      const promptText = `You are an expert Pune travel planner and cultural tourism guide.
Generate a structured personalized JSON itinerary for a ${numDays}-day trip to ${city}, Maharashtra for a ${companions || travelType} group with a total budget of ₹${numericBudget}.
Selected Interests: ${interests.join(", ")}.
Target Language for text values: ${language}.

IMPORTANT: You MUST generate EXACTLY ${numDays} day objects in the "days" array (Day 1, Day 2, Day 3 ... Day ${numDays}). Do NOT stop at 2 days!

Format your response STRICTLY as valid JSON:
{
  "summary": "High-level summary in ${language}",
  "budget": ${numericBudget},
  "daysCount": ${numDays},
  "days": [
    {
      "day": 1,
      "theme": "Day 1 Theme Title in ${language}",
      "activities": [
        {
          "time": "09:00 AM",
          "place": "Shaniwar Wada",
          "category": "Heritage",
          "activity": "Activity description in ${language}",
          "reason": "Why visit based on user interests in ${language}",
          "duration": "2 hours",
          "estimatedCost": 25,
          "transport": "Auto / Cab / Public Transport",
          "foodSuggestion": "Food suggestion in ${language}",
          "safetyTip": "Safety tip in ${language}"
        }
      ]
    }
  ],
  "budgetBreakdown": {
    "food": 1200,
    "transport": 1000,
    "entryFees": 500,
    "activities": 500,
    "shopping": 300,
    "total": 3500
  },
  "travelTips": [ "Tip 1 in ${language}", "Tip 2 in ${language}" ],
  "safetyTips": [ "Safety tip 1 in ${language}", "Safety tip 2 in ${language}" ]
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
          let parsedDays = parsed.days || parsed.itinerary || [];

          // If AI returned fewer days than requested numDays, build exact numDays
          if (parsedDays.length < numDays) {
            const fallback = generateFallbackItinerary({ days: numDays, budget: numericBudget, travelType: companions || travelType, interests, language });
            parsedDays = fallback.days;
          }

          return res.json({
            ...parsed,
            success: true,
            isFallback: false,
            budget: numericBudget,
            daysCount: numDays,
            days: parsedDays,
            itinerary: parsedDays
          });
        }
      }
    } catch (err) {
      console.warn("AI API call failed, using Pune fallback engine:", err.message);
    }
  }

  // Fallback Itinerary
  return res.json(generateFallbackItinerary({ days: numDays, budget: numericBudget, travelType: companions || travelType, interests, language }));
});

// POST /api/ask-ai — Natural Language Assistant
router.post("/ask-ai", async (req, res) => {
  const { prompt, context, language = "English", history = [] } = req.body;
  let rawKey = process.env.GEMINI_API_KEY || process.env.AI_API_KEY || "";
  let apiKey = rawKey.trim();
  if (apiKey.startsWith("PAQ.")) {
    apiKey = apiKey.substring(1);
  }

  if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
    return res.status(400).json({ success: false, error: "Prompt is required." });
  }

  if (apiKey) {
    try {
      const systemInstructionText = `You are Atithya AI, an expert cultural tourism guide and intelligent conversational assistant for Pune and Maharashtra, India.
Key instructions:
- Understand the user's specific question, intent, and nuance, and provide a direct, relevant, and engaging response.
- Answer specifically to what the user asked without repeating canned or generic introductions.
- Use previous conversation messages to understand follow-up questions and preserve context seamlessly.
- Always respond in the exact same language as the user or requested language (${language}) — supporting English, Marathi (मराठी), and Hindi (हिंदी) fluently.
- If information is unknown or you are uncertain, honestly say so rather than inventing details.
- Provide accurate, practical, and helpful facts about heritage, timings, entry tickets, history, food, transport, and travel tips.`;

      // Build Gemini contents array from conversation history
      const contents = [];

      if (Array.isArray(history) && history.length > 0) {
        // Take recent history up to 10 messages
        const recentHistory = history.slice(-10);
        for (const item of recentHistory) {
          const role = item.sender === "user" || item.role === "user" ? "user" : "model";
          const text = item.text || item.content || "";
          if (text && typeof text === "string" && text.trim()) {
            // First item in Gemini contents must be user role
            if (contents.length === 0 && role === "model") {
              continue;
            }
            contents.push({
              role: role,
              parts: [{ text: text.trim() }]
            });
          }
        }
      }

      // Add context if provided
      let currentPrompt = prompt.trim();
      if (context) {
        currentPrompt = `[Context destination: ${typeof context === 'object' ? JSON.stringify(context) : context}]\n${currentPrompt}`;
      }

      // Append current user prompt
      contents.push({
        role: "user",
        parts: [{ text: currentPrompt }]
      });

      const GEMINI_MODELS = ["gemini-3.7-flash", "gemini-3.6-flash", "gemini-3.5-flash", "gemini-3.5-flash-lite", "gemini-1.5-flash"];
      let answerText = null;

      for (const model of GEMINI_MODELS) {
        try {
          const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              systemInstruction: {
                parts: [{ text: systemInstructionText }]
              },
              contents: contents
            })
          });

          const data = await response.json();
          if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
            answerText = data.candidates[0].content.parts[0].text;
            break;
          }

          if (data.error) {
            console.warn(`Model ${model} returned error:`, data.error.message || data.error);
          }
        } catch (mErr) {
          console.warn(`Model ${model} call exception:`, mErr.message);
        }
      }

      if (answerText) {
        return res.json({
          success: true,
          answer: answerText
        });
      }
    } catch (err) {
      console.warn("Ask-AI Gemini call exception:", err.message);
    }
  }

  // Smart Contextual Fallback Response Engine
  const answer = generateSmartAiAnswer(prompt, context, language);
  return res.json({ success: true, answer });
});

function generateSmartAiAnswer(prompt = "", context = null, language = "English") {
  const query = (prompt || "").toLowerCase().trim();
  const isMarathi = language === "Marathi";
  const isHindi = language === "Hindi";

  // Greetings
  if (query.match(/^(hi|hello|hey|namaste|नमस्कार|नमस्ते|hola|greetings)/i)) {
    if (isMarathi) {
      return "नमस्कार! मी तुमचा Atithya AI सांस्कृतिक पर्यटन सहाय्यक आहे. शनिवार वाडा, सिंहगड, किंवा पुणेरी खाद्यान्नाबद्दल मला काहीही विचारा!";
    }
    if (isHindi) {
      return "नमस्ते! मैं आपका Atithya AI सांस्कृतिक पर्यटन सहायक हूँ। शनिवार वाड़ा, सिंहगढ़ किले या पुणे के व्यंजनों के बारे में कुछ भी पूछें!";
    }
    return "Hello! I am your Atithya AI Cultural Tourism Assistant. Ask me anything about Indian heritage sites, Peshwa history, Sahyadri forts, or local cuisine!";
  }

  // Shaniwar Wada
  if (query.includes("shaniwar") || query.includes("शनिवार")) {
    if (query.includes("time") || query.includes("hour") || query.includes("open") || query.includes("वेळ") || query.includes("समय")) {
      if (isMarathi) return "शनिवार वाडा सकाळी ८:०० ते संध्याकाळी ६:३० वाजेपर्यंत उघडा असतो. सकाळी ८ ते १० दरम्यान भेट देणे सर्वोत्तम मानले जाते.";
      if (isHindi) return "शनिवार वाड़ा सुबह 8:00 बजे से शाम 6:30 बजे तक खुला रहता है। सुबह 8 से 10 बजे के बीच जाना सबसे अच्छा रहता है।";
      return "Shaniwar Wada is open daily from 8:00 AM to 6:30 PM. The best time to visit is early morning (8 AM - 10 AM) or near sunset.";
    }
    if (query.includes("ticket") || query.includes("cost") || query.includes("price") || query.includes("fee") || query.includes("तिकीट") || query.includes("शुल्क")) {
      if (isMarathi) return "शनिवार वाड्याचे प्रवेश शुल्क भारतीय नागरिकांसाठी ₹२५ आणि परदेशी पर्यटकांसाठी ₹३०० आहे.";
      if (isHindi) return "शनिवार वाड़ा का प्रवेश शुल्क भारतीय नागरिकों के लिए ₹25 और विदेशी पर्यटकों के लिए ₹300 है।";
      return "Entry fee for Shaniwar Wada is ₹25 for Indian nationals and ₹300 for foreign tourists. Children under 15 enter free.";
    }
    if (query.includes("history") || query.includes("who built") || query.includes("built") || query.includes("इतिहास") || query.includes("कोणी बांधला")) {
      if (isMarathi) return "शनिवार वाडा हा १७३२ मध्ये पेशवे प्रथम बाजीराव यांनी बांधलेला मराठा साम्राज्याचा ७ मजली ऐतिहासिक वाडा आहे. हा वाडा पेशव्यांच्या सत्तेचे मुख्य केंद्र होता.";
      if (isHindi) return "शनिवार वाड़ा 1732 में पेशवा प्रथम बाजीराव द्वारा निर्मित मराठा साम्राज्य का ऐतिहासिक मुख्यालय है। इसका दिल्ली दरवाजा मराठा शौर्य का प्रतीक है।";
      return "Shaniwar Wada was built in 1732 by Peshwa Baji Rao I as the 7-story seat of Peshwa rulers in the Maratha Empire. Its massive Dilli Darwaza (Delhi Gate) remains a masterpiece of Maratha fort architecture.";
    }
    if (isMarathi) return "शनिवार वाडा हा १७३२ मधील पेशवेकालीन वाडा आहे. येथे दिल्ली दरवाजा, कमळ तलाव आणि कारंजे अवश्य पहा. जवळच प्रसिद्ध बेडेकर मिसळ आहे!";
    if (isHindi) return "शनिवार वाड़ा पुणे का दिल और पेशवाओं का ऐतिहासिक केंद्र है। यहाँ दिल्ली दरवाजा और प्रांगण अवश्य देखें।";
    return "Shaniwar Wada is the 1732 historic seat of the Peshwas in Pune. Key features include the massive Dilli Darwaza, lotus fountains, and expansive gardens. Entry is ₹25 and visiting hours are 8 AM - 6:30 PM.";
  }

  // Sinhagad Fort
  if (query.includes("sinhagad") || query.includes("sinhgad") || query.includes("सिंहगड")) {
    if (query.includes("kid") || query.includes("family") || query.includes("easy") || query.includes("child") || query.includes("मुले") || query.includes("बच्चे")) {
      if (isMarathi) return "होय! सिंहगड किल्ल्यावर जाण्यासाठी वरच्या पार्किंगपर्यंत पक्का रस्ता आहे. तेथून केवळ १५ मिनिटांच्या सोप्या दगडी पायऱ्या आहेत, ज्यामुळे मुलांसाठी आणि कुटुंबासाठी हा प्रवास अत्यंत सोपा आहे.";
      if (isHindi) return "हाँ! सिंहगढ़ किले के शीर्ष पार्किंग तक पक्की सड़क उपलब्ध है। वहाँ से केवल 15 मिनट की आसान सीढ़ियाँ हैं, जो बच्चों और परिवारों के लिए आरामदायक हैं।";
      return "Yes! Sinhagad Fort is very family and kid-friendly. A paved vehicle road goes all the way to the top parking lot, followed by a gentle 15-minute stone staircase walk.";
    }
    if (query.includes("food") || query.includes("eat") || query.includes("जेवण") || query.includes("खाद्य")) {
      if (isMarathi) return "सिंहगडावर गरम पिठलं भाकरी, दही हंडी, कांदा भजी आणि ताजे ताक नक्की चाखा! हा गडावरील खाद्यसंस्कृतीचा अतिशय लोकप्रिय भाग आहे.";
      if (isHindi) return "सिंहगढ़ किले पर मिट्टी के मटके का ताजा दही, पिठला भाकरी और कांदा भजी अवश्य खाएं!";
      return "At Sinhagad Fort, don't miss the legendary mountain cuisine: hot Pithla Bhakri, fresh earthen-pot Matka Curd, and crispy Kanda Bhaji!";
    }
    if (isMarathi) return "सिंहगड किल्ला (४,३०० फूट) हा नरवीर तानाजी मालुसरे यांच्या १६७० मधील पराक्रमाची अमर भूमी आहे. गडावर गरमागरम पिठलं भाकरी आणि कांदा भजी नक्की आस्वादा!";
    if (isHindi) return "सिंहगढ़ किला (4,300 फीट) 1670 के तानाजी मालुसरे के पराक्रम की ऐतिहासिक भूमि है।";
    return "Sinhagad Fort is a historic 1670 Maratha cliff fortress at 4,300 ft elevation. Famous for its Tanaji Malusare memorial, Sahyadri views, and authentic Pithla Bhakri.";
  }

  // Food / Misal / Mastani / Snacks
  if (query.includes("misal") || query.includes("food") || query.includes("eat") || query.includes("mastani") || query.includes("मिसळ") || query.includes("खाद्य") || query.includes("भोजन")) {
    if (isMarathi) return "पुण्यातील प्रसिद्ध खाद्यपदार्थ: १) बेडेकर मिसळ (शनिवार पेठ), २) कट्टाकिर्र मिसळ, ३) सुजाता मस्तानी (मँगो मस्तानी), ४) चितळे बाकरवडी, ५) सिंहगड पिठलं भाकरी!";
    if (isHindi) return "पुणे के प्रसिद्ध व्यंजन: 1) बेडेकर मिसळ (शनिवार पेठ), 2) सुजाता मैंगो मस्तानी, 3) चितले बाकरवड़ी, 4) सिंहगढ़ का पिठला भाकरी!";
    return "Top Pune culinary experiences: 1) Fiery Puneri Misal Pav at Bedekar / Kattakirr, 2) Refreshing Mango Mastani at Sujata Mastani on FC Road, 3) Crispy Chitale Bakarwadi, 4) Mountain Pithla Bhakri at Sinhagad Fort!";
  }

  // Aga Khan Palace
  if (query.includes("aga khan") || query.includes("आगाखान")) {
    if (isMarathi) return "आगाखान पॅलेस हे १८९२ मध्ये उभारलेले इटालियन कमानींचे भव्य स्मारक आहे. १९४२ मधील भारत छोडो आंदोलनादरम्यान महात्मा गांधी आणि कस्तुरबा गांधी येथे नजरकैदेत होते.";
    if (isHindi) return "आगा खान पैलेस 1892 में निर्मित भारत के स्वतंत्रता संग्राम का राष्ट्रीय स्मारक है, जहाँ महात्मा गांधी को नजरबंद रखा गया था।";
    return "Aga Khan Palace (built in 1892) is a national monument deeply tied to India's Freedom Movement. Mahatma Gandhi and Kasturba Gandhi were interned here during the 1942 Quit India Movement.";
  }

  // Pataleshwar Cave / Rock Temple
  if (query.includes("pataleshwar") || query.includes("cave") || query.includes("पाताळेश्वर")) {
    if (isMarathi) return "पाताळेश्वर गुंफा मंदिर हे ८ व्या शतकातील राष्ट्रकूट काळातील एकाच कातळात कोरलेले दगडी मंदिर आहे. हे मंदिर जंगली महाराज रोडवर असून मोफत प्रवेश आहे.";
    if (isHindi) return "पातालेश्वर गुफा मंदिर 8वीं शताब्दी का राष्ट्रकूट काल का अखंड चट्टान से तराशा गया मंदिर है।";
    return "Pataleshwar Cave Temple is an 8th-century Rashtrakuta-period monolithic basalt rock-cut cave shrine located on JM Road. Entry is completely free.";
  }

  // Kelkar Museum
  if (query.includes("kelkar") || query.includes("museum") || query.includes("केळकर")) {
    if (isMarathi) return "राजा दिनकर केळकर संग्रहालयात २०,००० पेक्षा जास्त दुर्मिळ भारतीय वस्तू, वाद्ये आणि हुबेहूब पुनर्रचित मस्तानी महाल आहे. प्रवेश शुल्क: ₹१०० (प्रौढ) / ₹३० (मुले).";
    if (isHindi) return "राजा दिनकर केलकर संग्रहालय में 20,000 से अधिक दुर्लभ भारतीय एंटीक वस्तुएं और पुनर्निर्मित मस्तानी महल प्रदर्शित है।";
    return "Raja Dinkar Kelkar Museum houses a remarkable collection of 20,000+ Indian antiques, musical instruments, and the reconstructed Mastani Mahal. Ticket is ₹100 for adults.";
  }

  // Best Places to Visit / Itinerary / Plan
  if (query.includes("best place") || query.includes("visit") || query.includes("top") || query.includes("plan") || query.includes("ठिकाणे") || query.includes("स्थल")) {
    if (isMarathi) return "पुण्यातील प्रमुख ५ ऐतिहासिक ठिकाणे: १) शनिवार वाडा, २) सिंहगड किल्ला, ३) आगाखान पॅलेस, ४) पाताळेश्वर लेणी, ५) राजा दिनकर केळकर संग्रहालय. तुम्ही ✨ AI Trip Planner वापरून २ ते ७ दिवसांचा प्लॅन आखा!";
    if (isHindi) return "पुणे के 5 प्रमुख स्थल: 1) शनिवार वाड़ा, 2) सिंहगढ़ किला, 3) आगा खान पैलेस, 4) पातालबालेश्वर गुफा, 5) केलकर संग्रहालय।";
    return "Top 5 must-visit heritage spots in Pune: 1) Shaniwar Wada, 2) Sinhagad Fort, 3) Aga Khan Palace, 4) Pataleshwar Cave Temple, 5) Raja Dinkar Kelkar Museum. Use our ✨ AI Trip Planner for a customized multi-day itinerary!";
  }

  // General Fallback
  if (isMarathi) {
    return `Atithya AI पुणे: "${prompt}" बद्दल अधिक माहितीसाठी आपण शनिवार वाडा, सिंहगड किल्ला किंवा आगाखान पॅलेसला भेट देऊ शकता. तुम्हाला आणखी काय जाणून घ्यायचे आहे?`;
  }
  if (isHindi) {
    return `Atithya AI पुणे: "${prompt}" के संदर्भ में आप शनिवार वाड़ा या सिंहगढ़ किले का भ्रमण कर सकते हैं। आप अन्य क्या जानना चाहते हैं?`;
  }

  return `Atithya AI: Regarding "${prompt}", Pune offers rich Maratha history, Sahyadri fortresses, and vibrant culinary experiences like Misal Pav and Mastani. Feel free to ask about timings, ticket fees, history, or food!`;
}

function generateFallbackItinerary({ days = 2, budget = 5000, travelType = "Family", interests = [], language = "English" }) {
  const isMarathi = language === "Marathi";
  const isHindi = language === "Hindi";
  const numDays = Math.max(1, parseInt(days, 10) || 2);
  const numericBudget = Math.max(500, parseInt(budget, 10) || 5000);

  const summary = isMarathi
    ? `पुणे शहरासाठी ${numDays} दिवसांची विशेष सांस्कृतिक व ऐतिहासिक सफर (${travelType} प्रवास). एकूण अंदाजपत्रक ₹${numericBudget.toLocaleString()}.`
    : isHindi
    ? `पुणे शहर के लिए ${numDays} दिवसीय सांस्कृतिक और ऐतिहासिक यात्रा (${travelType} समूह)। कुल बजट ₹${numericBudget.toLocaleString()}।`
    : `Customized ${numDays}-day cultural and heritage itinerary for Pune designed for ${travelType} travelers within a ₹${numericBudget.toLocaleString()} budget.`;

  const sitePool = [
    {
      place: isMarathi ? "शनिवार वाडा" : isHindi ? "शनिवार वाड़ा" : "Shaniwar Wada",
      category: "Heritage",
      activity: isMarathi ? "१७३२ मधील भव्य पेशवेकालीन वाडा व दिल्ली दरवाजाची ऐतिहासिक पाहणी." : "Explore the 1732 Peshwa seat of Maratha power, Dilli Darwaza, and lotus fountains.",
      reason: isMarathi ? "मराठा साम्राज्याची ऐतिहासिक राजधानी पाहणे." : "Matches user interest in heritage and Maratha history.",
      duration: "2 hours",
      estimatedCost: 25,
      transport: "Auto / Cab / Public Transport",
      foodSuggestion: isMarathi ? "बेडेकर मिसळ (शनिवार पेठ)" : "Fiery Puneri Misal Pav at Bedekar Misal",
      safetyTip: isMarathi ? "दगडी पायऱ्यांवर जपून चाला." : "Follow monument guidelines and keep valuables secure."
    },
    {
      place: isMarathi ? "लाल महाल" : isHindi ? "लाल महल" : "Lal Mahal",
      category: "History",
      activity: isMarathi ? "छत्रपती शिवाजी महाराज यांचे बालपण व ऐतिहासिक वास्तू." : "Visit Shivaji Maharaj's boyhood home and view historical Maratha war paintings.",
      reason: isMarathi ? "शिवछत्रपतींच्या पराक्रमाची भूमी." : "Birthplace of Hindavi Swarajya ideology.",
      duration: "1 hour",
      estimatedCost: 20,
      transport: "5 min walk from Shaniwar Wada",
      foodSuggestion: isMarathi ? "सुजाता मस्तानी" : "Cooling Mango Mastani at Sujata Mastani",
      safetyTip: "Keep belongings safe in busy street markets."
    },
    {
      place: isMarathi ? "राजा दिनकर केळकर संग्रहालय" : isHindi ? "राजा दिनकर केलकर संग्रहालय" : "Raja Dinkar Kelkar Museum",
      category: "Museums",
      activity: isMarathi ? "२०,००० दुर्मिळ भारतीय वस्तू आणि मस्तानी महालाचे दृश्य." : "View over 20,000 rare everyday Indian antiques and the reconstructed Mastani Mahal.",
      reason: isMarathi ? "दुर्मिळ भारतीय हस्तकला संग्रह." : "Masterpiece of Indian craftsmanship.",
      duration: "2 hours",
      estimatedCost: 100,
      transport: "Cab / Rickshaw",
      foodSuggestion: isMarathi ? "चितळे बाकरवडी" : "Takeaway Chitale Bakarwadi snacks",
      safetyTip: "Bag storage available at entrance counter."
    },
    {
      place: isMarathi ? "सिंहगड किल्ला" : isHindi ? "सिंहगढ़ किला" : "Sinhagad Fort",
      category: "Forts",
      activity: isMarathi ? "नरवीर तानाजी मालुसरे यांच्या पराक्रमाची भूमी व सह्याद्रीचे दृश्य." : "Trek the historic 1670 Maratha cliff fortress 4,300 ft above sea level.",
      reason: isMarathi ? "मराठा शौर्याचा इतिहास." : "Sahyadri mountain trekking and Maratha history.",
      duration: "3 hours",
      estimatedCost: 50,
      transport: "Shared Taxi / Private Car",
      foodSuggestion: isMarathi ? "गडावरील गरमागरम पिठलं भाकरी" : "Hot mountain Pithla Bhakri & Matka Curd",
      safetyTip: "Stay on designated trails; avoid steep cliff edges."
    },
    {
      place: isMarathi ? "आगाखान पॅलेस" : isHindi ? "आगा खान पैलेस" : "Aga Khan Palace",
      category: "History",
      activity: isMarathi ? "महात्मा गांधींची नजरकैद व स्वातंत्र्यलढ्याचे स्मारक." : "Explore Gandhian Quit India movement history, Italian arches, and quiet gardens.",
      reason: isMarathi ? "भारतीय स्वातंत्र्यलढ्याचा इतिहास." : "National monument of freedom struggle.",
      duration: "2 hours",
      estimatedCost: 25,
      transport: "Cab / Auto",
      foodSuggestion: "Kalyani Nagar local snacks",
      safetyTip: "Remove footwear near Samadhi zone."
    },
    {
      place: isMarathi ? "पाताळेश्वर गुंफा मंदिर" : isHindi ? "पातालेश्वर गुफा मंदिर" : "Pataleshwar Cave Temple",
      category: "Heritage",
      activity: isMarathi ? "८ व्या शतकातील राष्ट्रकूट काळातील कातळात कोरलेले मंदिर." : "8th-century Rashtrakuta period monolithic basalt rock-cut cave temple.",
      reason: "Ancient monolithic rock-cut cave architecture.",
      duration: "1.5 hours",
      estimatedCost: 0,
      transport: "JM Road Pune Metro / Auto",
      foodSuggestion: "Wadeshwar JM Road Sabudana Vada",
      safetyTip: "Remove shoes outside temple cavern."
    }
  ];

  const daysArr = [];

  for (let d = 1; d <= numDays; d++) {
    const act1 = sitePool[(d - 1) % sitePool.length];
    const act2 = sitePool[d % sitePool.length];
    const act3 = sitePool[(d + 1) % sitePool.length];

    const themeTitle = isMarathi
      ? `दिवस ${d}: सांस्कृतिक व ऐतिहासिक सफारी`
      : isHindi
      ? `दिन ${d}: सांस्कृतिक और ऐतिहासिक यात्रा`
      : `Day ${d}: Heritage & Cultural Experience`;

    daysArr.push({
      day: d,
      theme: themeTitle,
      activities: [
        { ...act1, time: "09:00 AM" },
        { ...act2, time: "01:30 PM" },
        { ...act3, time: "04:30 PM" }
      ],
      stops: [
        { ...act1, time: "09:00 AM" },
        { ...act2, time: "01:30 PM" },
        { ...act3, time: "04:30 PM" }
      ]
    });
  }

  const estFood = Math.round(numericBudget * 0.35);
  const estTrans = Math.round(numericBudget * 0.25);
  const estEntry = Math.round(numericBudget * 0.10);
  const estAct = Math.round(numericBudget * 0.15);
  const estShop = Math.round(numericBudget * 0.15);
  const total = estFood + estTrans + estEntry + estAct + estShop;

  return {
    success: true,
    isFallback: true,
    fallbackNotice: "AI is temporarily unavailable. Showing a curated Pune itinerary.",
    summary,
    budget: numericBudget,
    daysCount: numDays,
    days: daysArr,
    itinerary: daysArr,
    budgetBreakdown: {
      food: estFood,
      transport: estTrans,
      entryFees: estEntry,
      activities: estAct,
      shopping: estShop,
      total: total,
      totalCost: total,
      remainingBudget: Math.max(0, numericBudget - total)
    },
    travelTips: [
      isMarathi ? "सकाळी ०८:०० वाजेपूर्वी सिंहगड किल्ल्याची यात्रा सुरू करा." : "Start early in the morning to avoid afternoon heat.",
      isMarathi ? "पुणे मेट्रो आणि ऑटो रिक्षा वापरल्यास वाहतूक कोंडी टाळता येते." : "Use Pune Metro for seamless connection between city centers."
    ],
    safetyTips: [
      isMarathi ? "गर्दीच्या पेठ भागात पाकीट व मोबाईल जपून ठेवा." : "Keep personal belongings secure in crowded market areas.",
      isMarathi ? "गडावर जाताना पुरेसे पिण्याचे पाणी सोबत ठेवा." : "Carry carry-on water bottles while hiking hill forts."
    ]
  };
}

module.exports = router;
