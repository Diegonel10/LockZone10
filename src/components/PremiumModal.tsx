import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Crown, Zap, Star, X } from 'lucide-react';
import { SubscriptionCard } from './SubscriptionCard';

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PremiumModal: React.FC<PremiumModalProps> = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);

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
              <Crown className="w-6 h-6 text-primary" />
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

          {/* Subscription Card */}
          <SubscriptionCard onSubscriptionChange={onClose} />
          
          <p className="text-xs text-center text-muted-foreground">
            💳 Pago seguro con Stripe • 🔒 Garantía de 30 días
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};