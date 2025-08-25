import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lock, TrendingUp, Clock, Star } from 'lucide-react';
import { usePremium } from '@/contexts/PremiumContext';

export interface Pick {
  id: string;
  sport: string;
  game: string;
  pick: string;
  odds: string;
  confidence: number;
  reasoning: string;
  isPremium: boolean;
  matchTime: string;
}

interface PickCardProps {
  pick: Pick;
  onUnlock?: () => void;
}

export const PickCard: React.FC<PickCardProps> = ({ pick, onUnlock }) => {
  const { isPremium } = usePremium();
  const isLocked = pick.isPremium && !isPremium;

  const getSportIcon = () => {
    switch (pick.sport.toLowerCase()) {
      case 'fútbol':
        return '⚽';
      case 'básquetbol':
        return '🏀';
      case 'tenis':
        return '🎾';
      case 'béisbol':
        return '⚾';
      default:
        return '🏆';
    }
  };

  const getConfidenceColor = () => {
    if (pick.confidence >= 8) return 'text-success';
    if (pick.confidence >= 6) return 'text-premium';
    return 'text-muted-foreground';
  };

  return (
    <Card className={`gradient-card border-border hover:border-accent/50 transition-all duration-300 ${
      isLocked ? 'opacity-80' : 'hover:glow-green'
    }`}>
      <div className="p-6 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{getSportIcon()}</span>
            <Badge variant="secondary" className="text-xs">
              {pick.sport}
            </Badge>
            {pick.isPremium && (
              <Badge variant="outline" className="text-premium border-premium">
                <Star className="w-3 h-3 mr-1" />
                Premium
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            {pick.matchTime}
          </div>
        </div>

        {/* Game */}
        <div>
          <h3 className="font-semibold text-lg text-foreground mb-1">
            {pick.game}
          </h3>
          <div className="flex items-center justify-between">
            <p className="text-accent font-medium">{pick.pick}</p>
            <span className="text-sm font-mono bg-secondary px-2 py-1 rounded">
              {pick.odds}
            </span>
          </div>
        </div>

        {/* Confidence */}
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-accent" />
          <span className="text-sm text-muted-foreground">Confianza:</span>
          <span className={`font-semibold ${getConfidenceColor()}`}>
            {pick.confidence}/10
          </span>
        </div>

        {/* Reasoning */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-foreground">Análisis:</p>
          {isLocked ? (
            <div className="space-y-3">
              <div className="bg-locked/20 p-3 rounded-lg border border-locked/30 text-center">
                <Lock className="w-6 h-6 mx-auto mb-2 text-locked" />
                <p className="text-locked-foreground text-sm">
                  Contenido premium - Hazte premium para ver el análisis completo
                </p>
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground leading-relaxed">
              {pick.reasoning}
            </p>
          )}
        </div>
      </div>
    </Card>
  );
};