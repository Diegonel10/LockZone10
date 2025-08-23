import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { PickCard } from '@/components/PickCard';
import { AdModal } from '@/components/AdModal';
import { PremiumModal } from '@/components/PremiumModal';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Zap, Star, Target } from 'lucide-react';
import { mockPicks } from '@/data/mockPicks';
import { usePremium } from '@/contexts/PremiumContext';

const Index = () => {
  const { isPremium, showUpgradeModal, setShowUpgradeModal } = usePremium();
  const [showAdModal, setShowAdModal] = useState(false);
  const [unlockedPicks, setUnlockedPicks] = useState<Set<string>>(new Set());

  const freePicks = mockPicks.filter(pick => !pick.isPremium);
  const premiumPicks = mockPicks.filter(pick => pick.isPremium);

  const handleUnlockPick = (pickId: string) => {
    setShowAdModal(true);
    // Store the pick ID to unlock after ad
    sessionStorage.setItem('pickToUnlock', pickId);
  };

  const handleAdComplete = () => {
    const pickId = sessionStorage.getItem('pickToUnlock');
    if (pickId) {
      setUnlockedPicks(prev => new Set(prev.add(pickId)));
      sessionStorage.removeItem('pickToUnlock');
    }
  };

  const isPickUnlocked = (pickId: string) => {
    return isPremium || unlockedPicks.has(pickId);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <div className="space-y-4">
            <Badge variant="outline" className="border-accent text-accent bg-accent/10">
              <Star className="w-3 h-3 mr-1" />
              Picks deportivos profesionales
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
              Los mejores
              <span className="gradient-primary bg-clip-text text-transparent"> picks deportivos</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Análisis profesional, estadísticas avanzadas y picks con alta probabilidad de éxito.
              Únete a miles de apostadores que confían en nuestros pronósticos.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Target className="w-4 h-4 text-success" />
              <span>85% precisión</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <TrendingUp className="w-4 h-4 text-accent" />
              <span>+2,400 usuarios activos</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Zap className="w-4 h-4 text-premium" />
              <span>Actualizados en tiempo real</span>
            </div>
          </div>

          {!isPremium && (
            <Button 
              onClick={() => setShowUpgradeModal(true)}
              className="gradient-primary text-lg px-8 py-3 hover:opacity-90 transition-opacity animate-pulse-glow"
            >
              <Star className="w-5 h-5 mr-2" />
              Obtener acceso premium
            </Button>
          )}
        </div>
      </section>

      {/* Picks Sections */}
      <div className="container mx-auto px-4 space-y-12 pb-12">
        
        {/* Free Picks */}
        <section>
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">Picks Gratuitos</h2>
            <p className="text-muted-foreground">
              Disfruta de nuestros mejores picks sin costo alguno
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {freePicks.map((pick) => (
              <div key={pick.id} className="animate-slide-up">
                <PickCard pick={pick} />
              </div>
            ))}
          </div>
        </section>

        {/* Premium Picks */}
        <section>
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-3xl font-bold text-foreground">Picks Premium</h2>
              <Badge variant="outline" className="border-premium text-premium bg-premium/10">
                <Star className="w-3 h-3 mr-1" />
                Exclusivo
              </Badge>
            </div>
            <p className="text-muted-foreground">
              {isPremium 
                ? "Acceso completo a todos nuestros picks premium"
                : "Desbloquea con anuncios o hazte premium para acceso ilimitado"
              }
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {premiumPicks.map((pick) => (
              <div key={pick.id} className="animate-slide-up">
                <PickCard 
                  pick={{
                    ...pick,
                    reasoning: isPickUnlocked(pick.id) ? pick.reasoning : pick.reasoning
                  }}
                  onUnlock={() => handleUnlockPick(pick.id)}
                />
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        {!isPremium && (
          <section className="text-center py-16">
            <div className="bg-gradient-primary p-8 rounded-2xl max-w-2xl mx-auto space-y-4">
              <h3 className="text-2xl font-bold text-primary-foreground">
                ¿Cansado de los anuncios?
              </h3>
              <p className="text-primary-foreground/80">
                Hazte premium y accede a todos los picks sin restricciones
              </p>
              <Button 
                onClick={() => setShowUpgradeModal(true)}
                variant="secondary"
                className="bg-background text-foreground hover:bg-background/90"
              >
                Upgrade a Premium - $9.99
              </Button>
            </div>
          </section>
        )}
      </div>

      {/* Modals */}
      <AdModal 
        isOpen={showAdModal}
        onClose={() => setShowAdModal(false)}
        onAdComplete={handleAdComplete}
      />
      
      <PremiumModal 
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
      />
    </div>
  );
};

export default Index;
