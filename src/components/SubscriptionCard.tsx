import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Crown, Star, Check } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface SubscriptionCardProps {
  isPremium?: boolean;
  onSubscriptionChange?: () => void;
}

export const SubscriptionCard: React.FC<SubscriptionCardProps> = ({ 
  isPremium = false, 
  onSubscriptionChange 
}) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout');
      
      if (error) throw error;
      
      if (data?.url) {
        window.open(data.url, '_blank');
      } else {
        throw new Error('No se pudo crear la sesión de pago');
      }
    } catch (error) {
      console.error('Error al crear checkout:', error);
      toast({
        title: "Error",
        description: "No se pudo procesar el pago. Inténtalo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleManageSubscription = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('customer-portal');
      
      if (error) throw error;
      
      if (data?.url) {
        window.open(data.url, '_blank');
      } else {
        throw new Error('No se pudo abrir el portal de cliente');
      }
    } catch (error) {
      console.error('Error al abrir portal:', error);
      toast({
        title: "Error",
        description: "No se pudo abrir el portal de gestión. Inténtalo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (isPremium) {
    return (
      <Card className="relative overflow-hidden border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
        <div className="absolute top-0 right-0 w-0 h-0 border-l-[60px] border-l-transparent border-t-[60px] border-t-primary">
          <Crown className="absolute -top-[45px] -right-[15px] w-6 h-6 text-primary-foreground" />
        </div>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <Star className="w-5 h-5" />
            Suscripción Premium Activa
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Check className="w-4 h-4 text-primary" />
              <span>Acceso a todos los picks premium</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Check className="w-4 h-4 text-primary" />
              <span>Sin anuncios</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Check className="w-4 h-4 text-primary" />
              <span>Análisis detallados</span>
            </div>
          </div>
          <Button 
            onClick={handleManageSubscription}
            disabled={loading}
            variant="outline"
            className="w-full"
          >
            {loading ? "Cargando..." : "Gestionar Suscripción"}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="relative overflow-hidden border-primary/20 hover:border-primary/40 transition-colors">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Crown className="w-5 h-5 text-primary" />
          Suscripción Premium
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className="text-3xl font-bold text-primary">$100</div>
          <div className="text-sm text-muted-foreground">MXN / mes</div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Check className="w-4 h-4 text-primary" />
            <span>Acceso a todos los picks premium</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Check className="w-4 h-4 text-primary" />
            <span>Sin anuncios</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Check className="w-4 h-4 text-primary" />
            <span>Análisis detallados</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Check className="w-4 h-4 text-primary" />
            <span>Soporte prioritario</span>
          </div>
        </div>

        <Button 
          onClick={handleSubscribe}
          disabled={loading}
          className="w-full gradient-primary hover:opacity-90 transition-opacity"
        >
          {loading ? "Procesando..." : "Suscribirse Ahora"}
        </Button>
      </CardContent>
    </Card>
  );
};