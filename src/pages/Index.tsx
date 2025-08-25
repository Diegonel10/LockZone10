import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { PickCard } from '@/components/PickCard';
import { AdSenseAd } from '@/components/AdSenseAd';
import { PremiumModal } from '@/components/PremiumModal';
import { AdminPanel } from '@/components/AdminPanel';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Zap, Star, Target } from 'lucide-react';
import { mockPicks } from '@/data/mockPicks';
import { usePremium } from '@/contexts/PremiumContext';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Pick } from '@/components/PickCard';

const Index = () => {
  const { isPremium, showUpgradeModal, setShowUpgradeModal } = usePremium();
  const { user, isAdmin, loading } = useAuth();
  const [picks, setPicks] = useState<Pick[]>([]);
  const [showAdmin, setShowAdmin] = useState(false);

  useEffect(() => {
    fetchPicks();
  }, []);

  const fetchPicks = async () => {
    const { data, error } = await supabase
      .from('picks')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) {
      // Transform database picks to match component interface
      const transformedPicks = data.map(pick => ({
        id: pick.id,
        sport: pick.sport,
        game: pick.game,
        pick: pick.pick,
        odds: pick.odds,
        confidence: pick.confidence,
        reasoning: pick.reasoning,
        isPremium: pick.is_premium,
        matchTime: pick.match_time
      }));
      setPicks(transformedPicks);
    } else {
      // Fallback to mock data if no database data
      setPicks(mockPicks);
    }
  };

  const freePicks = picks.filter(pick => !pick.isPremium);
  const premiumPicks = picks.filter(pick => pick.isPremium);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Admin Panel Toggle */}
      {isAdmin && (
        <div className="container mx-auto px-4 pt-4">
          <button
            onClick={() => setShowAdmin(!showAdmin)}
            className="text-accent hover:text-accent-foreground font-medium"
          >
            {showAdmin ? '← Volver a Picks' : '⚙️ Panel de Admin'}
          </button>
        </div>
      )}

      {isAdmin && showAdmin ? (
        <div className="container mx-auto px-4 py-8">
          <AdminPanel />
        </div>
      ) : (
        <>
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
            {freePicks.map((pick, index) => (
              <div key={pick.id} className="animate-slide-up">
                <PickCard pick={pick} />
                {/* Show ad after every 2 free picks */}
                {(index + 1) % 2 === 0 && (
                  <div className="mt-6">
                    <AdSenseAd className="w-full" />
                  </div>
                )}
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
                : "Hazte premium para acceso ilimitado"
              }
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {premiumPicks.map((pick, index) => (
              <div key={pick.id} className="animate-slide-up">
                <PickCard pick={pick} />
                {/* Show ad after every premium pick for non-premium users */}
                {!isPremium && (
                  <div className="mt-6">
                    <AdSenseAd className="w-full" />
                  </div>
                )}
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
        
        {/* Ad Section for non-premium users */}
        {!isPremium && (
          <section className="py-8">
            <div className="max-w-4xl mx-auto">
              <AdSenseAd className="w-full" />
            </div>
          </section>
        )}
      </div>
        </>
      )}

      {/* Modals */}
      <PremiumModal 
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
      />
    </div>
  );
};

export default Index;
