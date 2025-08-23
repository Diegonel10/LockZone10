import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface PremiumContextType {
  isPremium: boolean;
  setPremium: (value: boolean) => void;
  showUpgradeModal: boolean;
  setShowUpgradeModal: (value: boolean) => void;
}

const PremiumContext = createContext<PremiumContextType | undefined>(undefined);

export const usePremium = () => {
  const context = useContext(PremiumContext);
  if (!context) {
    throw new Error('usePremium must be used within a PremiumProvider');
  }
  return context;
};

export const PremiumProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPremium, setIsPremium] = useState<boolean>(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const { user, profile } = useAuth();

  // Load premium status from profile or localStorage
  useEffect(() => {
    if (user && profile) {
      setIsPremium(profile.is_premium);
    } else {
      const savedPremiumStatus = localStorage.getItem('isPremium');
      if (savedPremiumStatus === 'true') {
        setIsPremium(true);
      }
    }
  }, [user, profile]);

  const setPremium = async (value: boolean) => {
    setIsPremium(value);
    localStorage.setItem('isPremium', value.toString());
    
    // Update database if user is logged in
    if (user) {
      await supabase
        .from('profiles')
        .update({ is_premium: value })
        .eq('id', user.id);
    }
  };

  return (
    <PremiumContext.Provider 
      value={{ 
        isPremium, 
        setPremium, 
        showUpgradeModal, 
        setShowUpgradeModal 
      }}
    >
      {children}
    </PremiumContext.Provider>
  );
};