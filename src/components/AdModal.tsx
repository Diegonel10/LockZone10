import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Play, CheckCircle } from 'lucide-react';

interface AdModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdComplete: () => void;
}

export const AdModal: React.FC<AdModalProps> = ({ isOpen, onClose, onAdComplete }) => {
  const [adPhase, setAdPhase] = useState<'waiting' | 'playing' | 'completed'>('waiting');
  const [countdown, setCountdown] = useState(30);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setAdPhase('waiting');
      setCountdown(30);
      setProgress(0);
    }
  }, [isOpen]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (adPhase === 'playing' && countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prev) => {
          const newValue = prev - 1;
          setProgress(((30 - newValue) / 30) * 100);
          
          if (newValue === 0) {
            setAdPhase('completed');
          }
          
          return newValue;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [adPhase, countdown]);

  const startAd = () => {
    setAdPhase('playing');
  };

  const handleAdComplete = () => {
    onAdComplete();
    onClose();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg glass-effect">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold">
            {adPhase === 'waiting' && 'Ver Anuncio'}
            {adPhase === 'playing' && 'Reproduciendo Anuncio'}
            {adPhase === 'completed' && 'Pick Desbloqueado'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {adPhase === 'waiting' && (
            <div className="text-center space-y-4">
              <div className="w-24 h-24 mx-auto bg-gradient-primary rounded-full flex items-center justify-center">
                <Play className="w-12 h-12 text-primary-foreground" />
              </div>
              <p className="text-muted-foreground">
                Mira este anuncio de 30 segundos para desbloquear el pick premium
              </p>
              <Button 
                onClick={startAd}
                className="w-full gradient-primary hover:opacity-90 transition-opacity"
              >
                Iniciar Anuncio
              </Button>
            </div>
          )}

          {adPhase === 'playing' && (
            <div className="text-center space-y-4">
              <div className="w-32 h-32 mx-auto bg-secondary rounded-lg flex items-center justify-center border border-border">
                <div className="text-center">
                  <div className="text-4xl mb-2">📺</div>
                  <div className="text-xs text-muted-foreground">Anuncio de Prueba</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Tiempo restante:</span>
                  <span className="font-mono">{formatTime(countdown)}</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
              
              <p className="text-sm text-muted-foreground">
                Por favor, mantente en esta pantalla durante el anuncio
              </p>
            </div>
          )}

          {adPhase === 'completed' && (
            <div className="text-center space-y-4">
              <div className="w-24 h-24 mx-auto bg-success/20 rounded-full flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-success" />
              </div>
              <p className="text-foreground font-medium">
                ¡Excelente! Ya puedes ver el pick premium.
              </p>
              <Button 
                onClick={handleAdComplete}
                className="w-full gradient-primary hover:opacity-90 transition-opacity"
              >
                Ver Pick Desbloqueado
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};