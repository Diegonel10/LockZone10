import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Trash2, Edit, Plus, Save, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Pick {
  id: string;
  sport: string;
  game: string;
  pick: string;
  odds: string;
  confidence: number;
  reasoning: string;
  is_premium: boolean;
  match_time: string;
}

export const AdminPanel: React.FC = () => {
  const [picks, setPicks] = useState<Pick[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingPick, setEditingPick] = useState<Pick | null>(null);
  const [formData, setFormData] = useState({
    sport: '',
    game: '',
    pick: '',
    odds: '',
    confidence: 5,
    reasoning: '',
    is_premium: false,
    match_time: ''
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchPicks();
  }, []);

  const fetchPicks = async () => {
    const { data, error } = await supabase
      .from('picks')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "No se pudieron cargar los picks",
        variant: "destructive"
      });
    } else {
      setPicks(data || []);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingPick) {
        const { error } = await supabase
          .from('picks')
          .update(formData)
          .eq('id', editingPick.id);

        if (error) throw error;
        
        toast({
          title: "Pick actualizado",
          description: "El pick se ha actualizado correctamente"
        });
      } else {
        const { error } = await supabase
          .from('picks')
          .insert([formData]);

        if (error) throw error;
        
        toast({
          title: "Pick creado",
          description: "El pick se ha creado correctamente"
        });
      }

      resetForm();
      fetchPicks();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('picks')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast({
        title: "Pick eliminado",
        description: "El pick se ha eliminado correctamente"
      });
      
      fetchPicks();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const handleEdit = (pick: Pick) => {
    setEditingPick(pick);
    setFormData({
      sport: pick.sport,
      game: pick.game,
      pick: pick.pick,
      odds: pick.odds,
      confidence: pick.confidence,
      reasoning: pick.reasoning,
      is_premium: pick.is_premium,
      match_time: pick.match_time
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      sport: '',
      game: '',
      pick: '',
      odds: '',
      confidence: 5,
      reasoning: '',
      is_premium: false,
      match_time: ''
    });
    setEditingPick(null);
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Panel de Administración</h2>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="gradient-primary hover:opacity-90"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Pick
        </Button>
      </div>

      {showForm && (
        <Card className="p-6 glass-effect border-border">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="sport">Deporte</Label>
                <Select value={formData.sport} onValueChange={(value) => setFormData(prev => ({ ...prev, sport: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un deporte" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fútbol">Fútbol</SelectItem>
                    <SelectItem value="básquetbol">Básquetbol</SelectItem>
                    <SelectItem value="tenis">Tenis</SelectItem>
                    <SelectItem value="béisbol">Béisbol</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="game">Partido</Label>
                <Input
                  value={formData.game}
                  onChange={(e) => setFormData(prev => ({ ...prev, game: e.target.value }))}
                  placeholder="Equipo A vs Equipo B"
                  required
                />
              </div>

              <div>
                <Label htmlFor="pick">Pick</Label>
                <Input
                  value={formData.pick}
                  onChange={(e) => setFormData(prev => ({ ...prev, pick: e.target.value }))}
                  placeholder="Equipo A gana"
                  required
                />
              </div>

              <div>
                <Label htmlFor="odds">Cuotas</Label>
                <Input
                  value={formData.odds}
                  onChange={(e) => setFormData(prev => ({ ...prev, odds: e.target.value }))}
                  placeholder="1.85"
                  required
                />
              </div>

              <div>
                <Label htmlFor="confidence">Confianza (1-10)</Label>
                <Input
                  type="number"
                  min="1"
                  max="10"
                  value={formData.confidence}
                  onChange={(e) => setFormData(prev => ({ ...prev, confidence: parseInt(e.target.value) }))}
                  required
                />
              </div>

              <div>
                <Label htmlFor="match_time">Hora del Partido</Label>
                <Input
                  value={formData.match_time}
                  onChange={(e) => setFormData(prev => ({ ...prev, match_time: e.target.value }))}
                  placeholder="15:30"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="reasoning">Análisis</Label>
              <Textarea
                value={formData.reasoning}
                onChange={(e) => setFormData(prev => ({ ...prev, reasoning: e.target.value }))}
                placeholder="Explica por qué este pick es bueno..."
                rows={4}
                required
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                checked={formData.is_premium}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_premium: checked }))}
              />
              <Label>Pick Premium</Label>
            </div>

            <div className="flex gap-2">
              <Button type="submit" className="gradient-primary hover:opacity-90">
                <Save className="w-4 h-4 mr-2" />
                {editingPick ? 'Actualizar' : 'Crear'} Pick
              </Button>
              <Button type="button" variant="outline" onClick={resetForm}>
                <X className="w-4 h-4 mr-2" />
                Cancelar
              </Button>
            </div>
          </form>
        </Card>
      )}

      <div className="grid gap-4">
        <h3 className="text-lg font-semibold text-foreground">Picks Existentes</h3>
        {picks.map((pick) => (
          <Card key={pick.id} className="p-4 glass-effect border-border">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm bg-secondary px-2 py-1 rounded">{pick.sport}</span>
                  {pick.is_premium && (
                    <span className="text-xs bg-premium/20 text-premium px-2 py-1 rounded">Premium</span>
                  )}
                </div>
                <h4 className="font-semibold text-foreground">{pick.game}</h4>
                <p className="text-accent">{pick.pick} - {pick.odds}</p>
                <p className="text-sm text-muted-foreground mt-1">{pick.reasoning}</p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(pick)}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(pick.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};