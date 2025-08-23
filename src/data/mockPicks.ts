import { Pick } from '@/components/PickCard';

export const mockPicks: Pick[] = [
  {
    id: '1',
    sport: 'Fútbol',
    game: 'Real Madrid vs Barcelona',
    pick: 'Más de 2.5 goles',
    odds: '+145',
    confidence: 9,
    reasoning: 'Ambos equipos han mostrado un juego ofensivo muy sólido en los últimos 5 partidos. El Real Madrid promedia 2.8 goles por partido y el Barcelona 2.4. Considerando que es El Clásico, ambos equipos saldrán a atacar desde el primer minuto.',
    isPremium: false,
    matchTime: '15:00'
  },
  {
    id: '2',
    sport: 'Básquetbol',
    game: 'Lakers vs Warriors',
    pick: 'Lakers +3.5',
    odds: '-110',
    confidence: 7,
    reasoning: 'Los Lakers han ganado 4 de sus últimos 6 enfrentamientos contra Warriors en casa. LeBron James está en gran forma y Anthony Davis regresa de lesión. Las estadísticas defensivas de los Lakers han mejorado significativamente.',
    isPremium: true,
    matchTime: '22:30'
  },
  {
    id: '3',
    sport: 'Tenis',
    game: 'Djokovic vs Nadal',
    pick: 'Djokovic en sets',
    odds: '+120',
    confidence: 8,
    reasoning: 'Djokovic ha mostrado un nivel excepcional en superficie dura esta temporada. Su récord contra Nadal en canchas rápidas es favorable (8-2 en los últimos 10). La forma física actual de Djokovic es superior.',
    isPremium: true,
    matchTime: '14:00'
  },
  {
    id: '4',
    sport: 'Fútbol',
    game: 'Manchester City vs Liverpool',
    pick: 'Ambos equipos anotan',
    odds: '-135',
    confidence: 6,
    reasoning: 'Históricamente, los enfrentamientos entre estos equipos son muy abiertos. Manchester City ha anotado en todos sus partidos de local esta temporada, mientras que Liverpool tiene la segunda mejor ofensiva de la Premier League.',
    isPremium: false,
    matchTime: '12:30'
  },
  {
    id: '5',
    sport: 'Béisbol',
    game: 'Yankees vs Red Sox',
    pick: 'Bajo 9.5 carreras',
    odds: '+105',
    confidence: 7,
    reasoning: 'Los pitchers abrildores de ambos equipos están en excelente forma. El clima frío favorece a los pitchers, y los últimos 3 enfrentamientos han tenido menos de 8 carreras totales. Las ofensivas han estado inconsistentes.',
    isPremium: true,
    matchTime: '19:15'
  },
  {
    id: '6',
    sport: 'Básquetbol',
    game: 'Celtics vs Heat',
    pick: 'Más de 215.5 puntos',
    odds: '-115',
    confidence: 8,
    reasoning: 'Ambos equipos juegan a un ritmo muy alto. Los Celtics promedian 118 puntos por partido y los Heat 112. Las defensas han mostrado inconsistencias y se espera un juego muy dinámico con muchas posesiones.',
    isPremium: false,
    matchTime: '20:00'
  }
];