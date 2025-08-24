import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Home, Crown } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const PaymentSuccess = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Verificar suscripción después del pago
    const checkSubscription = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('check-subscription');
        if (error) throw error;
        
        if (data?.subscribed) {
          toast({
            title: "¡Suscripción Activada!",
            description: "Tu suscripción premium ya está activa.",
          });
        }
      } catch (error) {
        console.error('Error verificando suscripción:', error);
      }
    };

    checkSubscription();
  }, [toast]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 flex items-center justify-center p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="w-20 h-20 mx-auto bg-success/20 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-12 h-12 text-success" />
          </div>
          <CardTitle className="text-2xl font-bold text-foreground">
            ¡Pago Exitoso!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2 text-primary">
              <Crown className="w-5 h-5" />
              <span className="font-medium">Suscripción Premium Activada</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Ahora tienes acceso completo a todos los picks premium sin anuncios.
            </p>
          </div>
          
          <div className="bg-primary/5 rounded-lg p-4">
            <h3 className="font-medium text-foreground mb-2">
              ¿Qué tienes ahora?
            </h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>✓ Acceso a picks premium ilimitados</li>
              <li>✓ Sin anuncios</li>
              <li>✓ Análisis detallados</li>
              <li>✓ Soporte prioritario</li>
            </ul>
          </div>

          <Button 
            onClick={() => navigate('/')}
            className="w-full gradient-primary hover:opacity-90 transition-opacity"
          >
            <Home className="w-4 h-4 mr-2" />
            Ir al Inicio
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};