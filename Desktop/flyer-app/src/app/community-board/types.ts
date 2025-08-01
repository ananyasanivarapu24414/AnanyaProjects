// lib/types.ts
export interface Flyer {
  id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  clubName: string;
  category?: string;
  userId?: string;
  userEmail?: string;
  createdAt?: Date | string;
  likes?: number;
  saves?: number;
  color: string;  // For placeholder colors
  height: string; // For masonry layout
}

export interface User {
  id: string;
  name: string;
  email: string;
  schoolYear: string;
  college: string;
  createdAt?: Date | string;
}

export interface SavedFlyer {
  userId: string;
  flyerId: string;
  savedAt: Date | string;
}

export interface PostAnalytics {
  views: number;
  demographics: {
    male: number;
    female: number;
    classYear: {
      freshman: number;
      sophomore: number;
      junior: number;
      senior: number;
    };
  };
  categories: string[];
  avgTimeViewed?: string;
}