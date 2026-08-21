import { db } from './firebase';
import { collection, getDocs, doc, getDoc, addDoc, serverTimestamp } from 'firebase/firestore';

// Uniform image for all local guides as requested
export const UNIFORM_GUIDE_PHOTO = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop";

// Sample fallback guides for seamless hackathon demo execution
export const DEMO_GUIDES = [
  {
    id: "guide-aarav-kulkarni",
    name: "Aarav Kulkarni",
    photoUrl: UNIFORM_GUIDE_PHOTO,
    city: "Pune",
    languages: ["English", "Hindi", "Marathi"],
    specialties: ["Heritage", "History", "Food"],
    experienceYears: 6,
    rating: 4.8,
    reviewCount: 124,
    pricePerHour: 500,
    bio: "Local heritage enthusiast and history graduate helping visitors discover Peshwa history, ancient wadas, and secret misal spots across Pune.",
    locations: ["Shaniwar Wada", "Lal Mahal", "Kasba Peth", "Pataleshwar"],
    verified: true,
    available: true,
    contactMethod: "WhatsApp"
  },
  {
    id: "guide-ananya-deshmukh",
    name: "Ananya Deshmukh",
    photoUrl: UNIFORM_GUIDE_PHOTO,
    city: "Pune",
    languages: ["English", "Marathi"],
    specialties: ["Forts", "Nature", "Photography"],
    experienceYears: 4,
    rating: 4.9,
    reviewCount: 96,
    pricePerHour: 650,
    bio: "Sahyadri trekking guide & professional landscape photographer. Specializing in Sinhagad Fort sunrise treks and biodiversity trails.",
    locations: ["Sinhagad Fort", "Rajgad Fort", "Torna Fort"],
    verified: true,
    available: true,
    contactMethod: "Phone & WhatsApp"
  },
  {
    id: "guide-vikram-singh",
    name: "Vikramjit Singh",
    photoUrl: UNIFORM_GUIDE_PHOTO,
    city: "Jaipur",
    languages: ["English", "Hindi"],
    specialties: ["Architecture", "Heritage", "Shopping"],
    experienceYears: 8,
    rating: 4.9,
    reviewCount: 210,
    pricePerHour: 800,
    bio: "Royal Rajputana heritage storyteller & gemologist. Guided official delegations through Amber Palace, Hawa Mahal and Johari Bazaar.",
    locations: ["Amber Palace", "Hawa Mahal", "City Palace", "Johari Bazaar"],
    verified: true,
    available: true,
    contactMethod: "WhatsApp"
  },
  {
    id: "guide-rajesh-sharma",
    name: "Pt. Rajesh Sharma",
    photoUrl: UNIFORM_GUIDE_PHOTO,
    city: "Varanasi",
    languages: ["English", "Hindi"],
    specialties: ["Culture", "History", "Photography"],
    experienceYears: 10,
    rating: 4.95,
    reviewCount: 310,
    pricePerHour: 600,
    bio: "Varanasi native & spiritual historian explaining 3,000 years of Kashi ghats, morning boat rituals, and evening Ganga Aarti.",
    locations: ["Dashashwamedh Ghat", "Kashi Vishwanath", "Assi Ghat", "Sarnath"],
    verified: true,
    available: true,
    contactMethod: "WhatsApp"
  },
  {
    id: "guide-priya-nair",
    name: "Priya Nair",
    photoUrl: UNIFORM_GUIDE_PHOTO,
    city: "Delhi",
    languages: ["English", "Hindi", "Tamil"],
    specialties: ["Heritage", "Food", "Shopping"],
    experienceYears: 5,
    rating: 4.7,
    reviewCount: 88,
    pricePerHour: 550,
    bio: "Mughal architecture enthusiast and Old Delhi street food specialist. Leading heritage walks through Chandni Chowk & Qutub Minar.",
    locations: ["Chandni Chowk", "Humayun's Tomb", "Qutub Minar", "Red Fort"],
    verified: true,
    available: false,
    contactMethod: "Email & WhatsApp"
  }
];

// Fetch all local guides from Firestore collection 'localGuides'
export async function getGuides() {
  try {
    const querySnapshot = await getDocs(collection(db, "localGuides"));
    const guides = [];
    querySnapshot.forEach((doc) => {
      guides.push({ id: doc.id, ...doc.data() });
    });

    if (guides.length > 0) {
      return guides.map(g => ({ ...g, photoUrl: UNIFORM_GUIDE_PHOTO }));
    }
    return DEMO_GUIDES;
  } catch (err) {
    console.warn("Firestore fetch for localGuides failed, returning demo guides:", err.message);
    return DEMO_GUIDES;
  }
}

// Fetch single guide by ID
export async function getGuideById(id) {
  try {
    const docRef = doc(db, "localGuides", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data(), photoUrl: UNIFORM_GUIDE_PHOTO };
    }
  } catch (err) {
    console.warn("Firestore fetch for guide ID failed:", err.message);
  }
  const found = DEMO_GUIDES.find(g => g.id === id);
  return found ? { ...found, photoUrl: UNIFORM_GUIDE_PHOTO } : null;
}

// Save tourist guide request to Firestore collection 'guideRequests' (Instant Non-Blocking execution)
export async function createGuideRequest(requestData) {
  const payload = {
    guideId: requestData.guideId || "",
    guideName: requestData.guideName || "",
    userName: requestData.userName || "",
    email: requestData.email || "",
    phone: requestData.phone || "",
    date: requestData.date || "",
    groupSize: Number(requestData.groupSize) || 1,
    message: requestData.message || "",
    status: "pending",
    createdAt: new Date().toISOString()
  };

  // Fire-and-forget background Firestore write (0ms UI latency)
  try {
    addDoc(collection(db, "guideRequests"), {
      ...payload,
      createdAt: serverTimestamp()
    }).catch(err => {
      console.warn("Background Firestore write error (non-fatal):", err.message);
    });
  } catch (err) {
    console.warn("Background Firestore trigger error (non-fatal):", err.message);
  }

  // Instant response (0ms delay)
  return { success: true, id: `req-${Date.now()}` };
}
