import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface PremiumContextType {
  isPremium: boolean;
  subscriptionTier: string | null;
  subscriptionEnd: string | null;
  isLoading: boolean;
  checkSubscription: () => Promise<void>;
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
  const [isPremium, setIsPremium] = useState(false);
  const [subscriptionTier, setSubscriptionTier] = useState<string | null>(null);
  const [subscriptionEnd, setSubscriptionEnd] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const { user } = useAuth();

  const checkSubscription = async () => {
    if (!user) {
      setIsPremium(false);
      setSubscriptionTier(null);
      setSubscriptionEnd(null);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const { data, error } = await supabase.functions.invoke('check-subscription');
      
      if (error) throw error;
      
      const subscribed = data?.subscribed || false;
      setIsPremium(subscribed);
      setSubscriptionTier(data?.subscription_tier || null);
      setSubscriptionEnd(data?.subscription_end || null);
      
      // Update profiles table
      if (user) {
        await supabase
          .from('profiles')
          .update({ is_premium: subscribed })
          .eq('id', user.id);
      }
    } catch (error) {
      console.error('Error checking subscription:', error);
      setIsPremium(false);
      setSubscriptionTier(null);
      setSubscriptionEnd(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkSubscription();
  }, [user]);

  return (
    <PremiumContext.Provider 
      value={{ 
        isPremium, 
        subscriptionTier, 
        subscriptionEnd, 
        isLoading, 
        checkSubscription,
        showUpgradeModal,
        setShowUpgradeModal
      }}
    >
      {children}
    </PremiumContext.Provider>
  );
};