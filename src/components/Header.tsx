import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Crown, TrendingUp, Menu } from 'lucide-react';
import { usePremium } from '@/contexts/PremiumContext';

export const Header: React.FC = () => {
  const { isPremium, setShowUpgradeModal } = usePremium();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border glass-effect">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">PicksPro</h1>
              <p className="text-xs text-accent">Picks deportivos inteligentes</p>
            </div>
          </div>

          {/* Premium Status / Upgrade Button */}
          <div className="flex items-center gap-3">
            {isPremium ? (
              <Badge variant="outline" className="border-premium text-premium bg-premium/10">
                <Crown className="w-3 h-3 mr-1" />
                Premium
              </Badge>
            ) : (
              <Button
                onClick={() => setShowUpgradeModal(true)}
                variant="outline"
                size="sm"
                className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
              >
                <Crown className="w-4 h-4 mr-1" />
                Hazte Premium
              </Button>
            )}
            
            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};