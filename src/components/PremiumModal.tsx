import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Crown, Zap, Star, X } from 'lucide-react';
import { usePremium } from '@/contexts/PremiumContext';

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PremiumModal: React.FC<PremiumModalProps> = ({ isOpen, onClose }) => {
  const { setPremium } = usePremium();

  const handleUpgrade = () => {
    // Simular pago de Stripe
    setTimeout(() => {
      setPremium(true);
      onClose();
      // Aquí se integraría con Stripe real
    }, 1500);
  };

  const features = [
    'Todos los picks premium desbloqueados',
    'Sin anuncios molestos',
    'Análisis detallados exclusivos',
    'Picks de deportes especiales',
    'Notificaciones push prioritarias',
    'Soporte premium 24/7'
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg glass-effect">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-center text-2xl font-bold flex items-center gap-2">
              <Crown className="w-6 h-6 text-premium" />
              Hazte Premium
            </DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Hero Section */}
          <div className="text-center space-y-2">
            <div className="w-20 h-20 mx-auto bg-gradient-primary rounded-full flex items-center justify-center animate-pulse-glow">
              <Star className="w-10 h-10 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-semibold">Desbloquea todo el contenido</h3>
            <p className="text-muted-foreground">
              Accede a picks exclusivos y elimina los anuncios para siempre
            </p>
          </div>

          {/* Pricing */}
          <div className="bg-gradient-primary p-6 rounded-lg text-center space-y-2">
            <Badge variant="secondary" className="bg-background/20 text-primary-foreground">
              Oferta de Lanzamiento
            </Badge>
            <div className="text-4xl font-bold text-primary-foreground">
              $9.99
            </div>
            <p className="text-primary-foreground/80 text-sm">
              Pago único • Sin suscripciones
            </p>
          </div>

          {/* Features */}
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground">Lo que obtienes:</h4>
            <div className="space-y-2">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center">
                    <Check className="w-3 h-3 text-success" />
                  </div>
                  <span className="text-sm text-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className="space-y-3">
            <Button 
              onClick={handleUpgrade}
              className="w-full gradient-primary hover:opacity-90 transition-all duration-300 text-lg py-6"
            >
              <Zap className="w-5 h-5 mr-2" />
              Activar Premium Ahora
            </Button>
            
            <p className="text-xs text-center text-muted-foreground">
              💳 Pago seguro con Stripe • 🔒 Garantía de 30 días
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};