// contexts/AuthContext.tsx
'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../utilities/firebase/firebase';

// User profile interface - matches your onboarding data
interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  school: string;
  gradDate: string;
  pushNotifications: boolean;
  createdAt: Date;
}

// Auth context interface
interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signup: (email: string, password: string, profileData: Omit<UserProfile, 'uid' | 'email' | 'createdAt'>) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Create user profile in Firestore

  //These functions are wrapper functions for what happens in the
  //onboarding file. The onboardingfil has the access to the individual data
  // and this just well uploads it to firebase and catches any errors that firebase throws. 
  const createUserProfile = async (
    user: User, 
    profileData: Omit<UserProfile, 'uid' | 'email' | 'createdAt'>
  ) => {
    try {
      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        const profile: UserProfile = {
          uid: user.uid,
          email: user.email || '',
          createdAt: new Date(),
          ...profileData
        };

        await setDoc(userRef, profile);
        setUserProfile(profile);
        console.log('✅ User profile created:', profile);
      } else {
        setUserProfile(userSnap.data() as UserProfile);
        console.log('✅ User profile loaded:', userSnap.data());
      }
    } catch (error: any) {
      console.error('❌ Error creating user profile:', error);
      throw new Error('Failed to create user profile');
    }
  };

  // Sign up function - creates new user account
  const signup = async (
    email: string, 
    password: string, 
    profileData: Omit<UserProfile, 'uid' | 'email' | 'createdAt'>
  ) => {
    try {
      setError(null);
      console.log('🔥 Creating Firebase account for:', email);

      // Create Firebase auth user
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      console.log('✅ Firebase user created:', user.uid);
      
      // Update display name in Firebase Auth
      await updateProfile(user, { 
        displayName: profileData.displayName 
      });
      console.log('✅ Display name updated');

      // Create user profile in Firestore
      await createUserProfile(user, profileData);
      console.log('✅ Signup complete!');

    } catch (error: any) {
      console.error('❌ Signup error:', error);
      
      // Handle specific Firebase auth errors
      if (error.code === 'auth/email-already-in-use') {
        throw new Error('An account with this email already exists');
      } else if (error.code === 'auth/weak-password') {
        throw new Error('Password should be at least 6 characters');
      } else if (error.code === 'auth/invalid-email') {
        throw new Error('Invalid email address');
      } else {
        throw new Error(error.message || 'Failed to create account. Please try again.');
      }
    }
  };

  // Login function - authenticates existing user
  const login = async (email: string, password: string) => {
    try {
      setError(null);
      console.log('🔥 Logging in user:', email);
      
      await signInWithEmailAndPassword(auth, email, password);
      console.log('✅ Login successful!');
      
    } catch (error: any) {
      console.error('❌ Login error:', error);
      
      // Handle specific Firebase auth errors
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        throw new Error('Invalid email or password');
      } else if (error.code === 'auth/invalid-email') {
        throw new Error('Invalid email address');
      } else if (error.code === 'auth/too-many-requests') {
        throw new Error('Too many failed attempts. Please try again later.');
      } else {
        throw new Error('Login failed. Please try again.');
      }
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await signOut(auth);
      setUserProfile(null);
      console.log('✅ User logged out');
    } catch (error: any) {
      console.error('❌ Logout error:', error);
      throw new Error('Failed to log out');
    }
  };

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          console.log('🔥 User authenticated:', user.email);
          setUser(user);
          
          // Fetch user profile from Firestore
          const userRef = doc(db, 'users', user.uid);
          const userSnap = await getDoc(userRef);
          
          if (userSnap.exists()) {
            setUserProfile(userSnap.data() as UserProfile);
            console.log('✅ User profile loaded');
          } else {
            console.log('⚠️ No user profile found');
          }
        } else {
          console.log('🔥 User not authenticated');
          setUser(null);
          setUserProfile(null);
        }
      } catch (error) {
        console.error('❌ Error in auth state change:', error);
        setError('Failed to load user profile');
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const value: AuthContextType = {
    user,
    userProfile,
    loading,
    signup,
    login,
    logout,
    error
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-lg">Loading...</div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}