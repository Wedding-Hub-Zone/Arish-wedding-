export interface ParentDetails {
  father: string;
  mother: string;
  fatherHi?: string;
  motherHi?: string;
}

export interface IndividualDetails {
  fullName: string;
  shortName: string;
  fullNameHi?: string;
  shortNameHi?: string;
  parents: ParentDetails;
  address: string;
  addressHi?: string;
}

export interface WeddingEvent {
  id: string;
  name: string;
  nameHi?: string;
  date: string; // e.g., "2 October" or "5 October 2026"
  dateHi?: string;
  dateObj: Date; // For logical scheduling or sorting if needed
  time: string;
  timeHi?: string;
  venue: string;
  venueHi?: string;
  description: string;
  descriptionHi?: string;
  googleMapsUrl: string;
  iconName: "milad" | "mehndi" | "barat" | "nikah" | "walima";
}

export interface BrandConfig {
  name: string;
  whatsapp: string;
  instagram: string;
  instagramUrl: string;
}

export interface InvitationData {
  brand: BrandConfig;
  groom: IndividualDetails;
  bride: IndividualDetails;
  weddingDate: string; // "5 October 2026"
  weddingDateHi?: string;
  weddingCountdownTarget: string; // ISO format "2026-10-05T17:00:00"
  scratchDate: string; // Text shown under scratch card: "5 October 2026"
  scratchDateHi?: string;
  musicPath: string;
  personalMessage: string;
  personalMessageHi?: string;
  events: WeddingEvent[];
  galleryPlaceholders: string[];
}

export const invitationData: InvitationData = {
  brand: {
    name: "Wedding Hub",
    whatsapp: "+919407887133",
    instagram: "@weddinghubzone",
    instagramUrl: "https://instagram.com/weddinghubzone",
  },
  groom: {
    fullName: "Arish Khan",
    fullNameHi: "आरिश खान",
    shortName: "ARISH",
    shortNameHi: "आरिश",
    parents: {
      father: "Mr. Shafi Khan",
      fatherHi: "जनाब शफ़ी खान साहब",
      mother: "Late Mrs. Shama Khan",
      motherHi: "मरहूमा शमा खान",
    },
    address: "Chhindwara, Madhya Pradesh",
    addressHi: "छिंदवाड़ा, मध्य प्रदेश",
  },
  bride: {
    fullName: "Shaba Khan",
    fullNameHi: "शबा खान",
    shortName: "SHABA",
    shortNameHi: "शबा",
    parents: {
      father: "Mr. Rafique Khan",
      fatherHi: "जनाब रफ़ीक खान साहब",
      mother: "Mrs. Nilofar Khan",
      motherHi: "मोहतरमा नीलोफर खान",
    },
    address: "Chandameta, Madhya Pradesh",
    addressHi: "चांदामेटा, मध्य प्रदेश",
  },
  weddingDate: "5 October 2026",
  weddingDateHi: "5 अक्टूबर 2026",
  weddingCountdownTarget: "2026-10-05T17:00:00-07:00", // Standard target time in 2026
  scratchDate: "5 October 2026",
  scratchDateHi: "5 अक्टूबर 2026",
  musicPath: "https://assets.mixkit.co/music/preview/mixkit-forest-flute-1090.mp3",
  personalMessage: "With joyful hearts, we invite you to celebrate this beautiful beginning with us. Your presence and blessings will make our special occasion even more memorable.",
  personalMessageHi: "अल्लाह रब्बुल इज़्ज़त के फ़ज़्ल-ओ-करम से, हम आपको हमारे इस मुक़द्दस सफ़र की शुरुआत का गवाह बनने के लिए शिरकत की बा-अदब गुज़ारिश करते हैं। आपकी शिरकत और दुआएं हमारे इस निकाह को और भी बा-बरकत बनाएंगी।",
  events: [
    {
      id: "milad",
      name: "Milad",
      nameHi: "मिलाद-ए-पाक",
      date: "2 October 2026",
      dateHi: "2 अक्टूबर 2026",
      dateObj: new Date("2026-10-02"),
      time: "",
      timeHi: "",
      venue: "Khan Colony, Chhindwara, Madhya Pradesh",
      venueHi: "खान कॉलोनी, छिंदवाड़ा, मध्य प्रदेश",
      description: "Beginning our beautiful celebration with prayers, blessings, and praise for the Holy Prophet.",
      descriptionHi: "हुज़ूर-ए-अकरम की शान-ए-अक़्दस में नात-ओ-सलाम और दुआओं की मुक़द्दस महफ़िल से हमारे इस जश्न का पाक आग़ाज़।",
      googleMapsUrl: "https://maps.google.com/?q=Khan+Colony,Chhindwara,Madhya+Pradesh",
      iconName: "milad",
    },
    {
      id: "mehndi",
      name: "Mehndi Ceremony",
      nameHi: "रस्म-ए-हिना (मेहंदी)",
      date: "4 October 2026",
      dateHi: "4 अक्टूबर 2026",
      dateObj: new Date("2026-10-04"),
      time: "",
      timeHi: "",
      venue: "Khan Colony, Chhindwara, Madhya Pradesh",
      venueHi: "खान कॉलोनी, छिंदवाड़ा, मध्य प्रदेश",
      description: "An evening filled with beautiful green henna, traditional songs, warmth, laughter, and family celebrations.",
      descriptionHi: "मेहंदी की खुशबू, पारंपरिक गीतों और अज़ीज़-ओ-अक़ारिब के हुजूम से सजी एक पुर-मसर्रत शाम।",
      googleMapsUrl: "https://maps.google.com/?q=Khan+Colony,Chhindwara,Madhya+Pradesh",
      iconName: "mehndi",
    },
    {
      id: "barat",
      name: "Barat Assembly",
      nameHi: "रवानगी-ए-बारात",
      date: "5 October 2026",
      dateHi: "5 अक्टूबर 2026",
      dateObj: new Date("2026-10-05"),
      time: "",
      timeHi: "",
      venue: "Chhindwara to Chandameta",
      venueHi: "छिंदवाड़ा से चांदामेटा",
      description: "The groom's wedding procession departs from Chhindwara to receive our beautiful bride.",
      descriptionHi: "नौशा (दूल्हा) अपनी बारात के साथ दुल्हनिया को ब्याहने के लिए छिंदवाड़ा से चांदामेटा के लिए रवाना होंगे।",
      googleMapsUrl: "https://maps.google.com/?q=Chhindwara,Madhya+Pradesh",
      iconName: "barat",
    },
    {
      id: "nikah",
      name: "Nikah Ceremony",
      nameHi: "तक़रीब-ए-निकाह",
      date: "5 October 2026",
      dateHi: "5 अक्टूबर 2026",
      dateObj: new Date("2026-10-05"),
      time: "After Namaz-e-Asr",
      timeHi: "नमाज़-ए-अस्र के बाद",
      venue: "Chandameta, Madhya Pradesh",
      venueHi: "चांदामेटा, मध्य प्रदेश",
      description: "The sacred bond of marriage solemnized under Islamic tradition. Two souls united in the presence of witnesses.",
      descriptionHi: "अल्लाह रब्बुल इज़्ज़त की रहमत और गवाहों के हुज़ूर में दो पाक रूहों का मुक़द्दस निकाह और ईमानदार अहद-ओ-पैमान।",
      googleMapsUrl: "https://maps.google.com/?q=Chandameta,Madhya+Pradesh",
      iconName: "nikah",
    },
    {
      id: "walima",
      name: "Walima Reception",
      nameHi: "दावत-ए-वलीमा",
      date: "7 October 2026",
      dateHi: "7 अक्टूबर 2026",
      dateObj: new Date("2026-10-07"),
      time: "7:00 PM onwards",
      timeHi: "शाम 7:30 बजे से",
      venue: "Shagun Marriage Lawn, Jhenda Road, Chhindwara",
      venueHi: "शगुन मैरिज लॉन, झंडा रोड, छिंदवाड़ा",
      description: "A formal reception hosted by the Groom's family to celebrate the union of the newly wedded couple.",
      descriptionHi: "सुन्नत-ए-रसूल के पाक साये में, नौ-दम्पति के इस मुक़द्दस मिलाप की मसर्रत में दूल्हा पक्ष की जानिब से वलीमे का एहतेमाम।",
      googleMapsUrl: "https://maps.google.com/?q=Shagun+Marriage+Lawn,Jhenda+Road,Chhindwara",
      iconName: "walima",
    },
  ],
  galleryPlaceholders: [
    "/assets/gallery/photo-1.jpg",
    "/assets/gallery/photo-2.jpg",
    "/assets/gallery/photo-3.jpg",
    "/assets/gallery/photo-4.jpg",
    "/assets/gallery/photo-5.jpg",
    "/assets/gallery/photo-6.jpg",
  ],
};
