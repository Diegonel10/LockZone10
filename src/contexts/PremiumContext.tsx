import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

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

  // Load premium status from localStorage on mount
  useEffect(() => {
    const savedPremiumStatus = localStorage.getItem('isPremium');
    if (savedPremiumStatus === 'true') {
      setIsPremium(true);
    }
  }, []);

  const setPremium = async (value: boolean) => {
    setIsPremium(value);
    localStorage.setItem('isPremium', value.toString());
    
    // Try to update database if user is logged in
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        await supabase
          .from('profiles')
          .update({ is_premium: value })
          .eq('id', session.user.id);
      }
    } catch (error) {
      console.log('Could not update premium status in database:', error);
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