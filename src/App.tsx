import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { Gamepad2, Search, ArrowLeft, Shield, Flame, Zap, Menu, X, Mail, AlertTriangle, RotateCcw, Play, Check, Cookie, Info } from 'lucide-react';

// --- TYPES ---
interface Game {
  id: string;
  title: string;
  category: 'Action' | 'Racing' | 'Puzzle' | 'Sports' | 'Simulation';
  image: string;
  url: string;
  description: string;
  richContent: {
    gameplay: string;
    strategies: string;
    whyPopular: string;
  };
  rating: number;
  plays: string;
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

// --- DATA ---
const GAMES: Game[] = [
  {
    id: 'subway-surfers',
    title: 'Subway Surfers',
    category: 'Action',
    image: 'https://images.crazygames.com/games/subway-surfers-new-york/cover-16x9.png?auto=format,compress&q=75&cs=strip',
    url: 'https://www.crazygames.com/embed/subway-surfers-new-york',
    description: 'Dash as fast as you can through the subway and dodge the oncoming trains.',
    rating: 4.9,
    plays: '52.1M',
    richContent: {
      gameplay: "Subway Surfers is the quintessential endless runner that defines the genre. Players take on the role of Jake, Tricky, or Fresh, graffiti artists who must escape from the grumpy Inspector and his dog. The core gameplay loop involves swiping up, down, left, and right to dodge oncoming trains, barriers, and obstacles while collecting coins.",
      strategies: "To master Subway Surfers in 2025, focus on staying on top of the trains rather than running on the tracks. This 'high-ground' strategy offers better visibility of upcoming obstacles. Always prioritize the Jetpack power-up as it pauses the difficulty curve while granting invincibility.",
      whyPopular: "Even in 2025, Subway Surfers remains a staple of unblocked gaming because of its vibrant, non-violent visual style and responsive controls. It is an excellent tool for improving hand-eye coordination and reaction time."
    }
  },
  {
    id: 'geometry-dash',
    title: 'Geometry Dash',
    category: 'Action',
    image: 'https://images.crazygames.com/games/geometry-dash/cover-16x9.png?auto=format,compress&q=75&cs=strip',
    url: 'https://www.crazygames.com/embed/geometry-dash',
    description: 'Jump and fly your way through danger in this rhythm-based action platformer.',
    rating: 4.8,
    plays: '12.5M',
    richContent: {
      gameplay: "Geometry Dash is a rhythm-based action platformer that tests your patience and timing. You control a geometric icon that moves automatically; your only input is to jump or fly to avoid spikes and walls.",
      strategies: "Success in Geometry Dash is about muscle memory and music synchronization. Use 'Practice Mode' to place checkpoints before difficult sections.",
      whyPopular: "Geometry Dash is widely played in schools because it fosters resilience and a 'growth mindset'. Failure is instant, but restarts are immediate."
    }
  },
  {
    id: 'moto-x3m',
    title: 'Moto X3M',
    category: 'Racing',
    image: 'https://images.crazygames.com/games/moto-x3m/cover-16x9.png?auto=format,compress&q=75&cs=strip',
    url: 'https://www.crazygames.com/embed/moto-x3m',
    description: 'A time-trial bike racing game with challenging obstacles and stunts.',
    rating: 4.7,
    plays: '85.4M',
    richContent: {
      gameplay: "Moto X3M combines motocross racing with physics-based puzzles. Players must navigate complex levels filled with explosives, spikes, and loop-the-loops.",
      strategies: "The key to Moto X3M is managing your center of gravity. Lean back when landing on rear wheels to maintain momentum, and lean forward to climb steep hills.",
      whyPopular: "This game is a physics sandbox disguised as a racer. It teaches players about momentum, gravity, and trajectory in a fun, engaging way."
    }
  },
  {
    id: 'retro-bowl',
    title: 'Retro Bowl',
    category: 'Sports',
    image: 'https://images.crazygames.com/games/retro-bowl/cover-16x9.png?auto=format,compress&q=75&cs=strip',
    url: 'https://www.crazygames.com/embed/retro-bowl',
    description: 'The perfect mix of football management and retro-style gameplay.',
    rating: 4.8,
    plays: '9.2M',
    richContent: {
      gameplay: "Retro Bowl is a love letter to 8-bit football games, combining roster management with on-field action. As the head coach, you draft players and manage salary caps.",
      strategies: "Invest in your Quarterback and Wide Receivers first. A QB with high arm strength and accuracy can salvage broken plays.",
      whyPopular: "Retro Bowl offers a deep simulation experience without the bloat of modern AAA titles. It respects the player's time, allowing for quick matches."
    }
  },
  {
    id: 'shell-shockers',
    title: 'Shell Shockers',
    category: 'Action',
    image: 'https://images.crazygames.com/games/shell-shockers/cover-16x9.png?auto=format,compress&q=75&cs=strip',
    url: 'https://www.crazygames.com/embed/shell-shockers',
    description: 'The world\'s most popular egg-based multiplayer first-person shooter.',
    rating: 4.6,
    plays: '34.1M',
    richContent: {
      gameplay: "Shell Shockers is a multiplayer FPS where players control egg-shaped characters armed with guns. The premise is absurd but the gameplay is competitive.",
      strategies: "Movement is life in Shell Shockers. Use jump pads to gain high ground and make yourself a harder target. Accuracy is paramount.",
      whyPopular: "It brings console-quality competitive shooting to the browser. The lack of gore (it's eggs!) makes it school-safe."
    }
  },
  {
    id: 'slope',
    title: 'Slope',
    category: 'Action',
    image: 'https://images.crazygames.com/games/slope/cover-16x9.png?auto=format,compress&q=75&cs=strip',
    url: 'https://www.crazygames.com/embed/slope',
    description: 'Drive a ball in the 3D running game in slope city. Easy to start, hard to master.',
    rating: 4.4,
    plays: '105M',
    richContent: {
      gameplay: "Slope is the ultimate test of reflexes. You control a green ball rolling down an endless, procedurally generated neon city. The further you go, the faster the ball rolls.",
      strategies: "Keep your eye on the horizon, not on the ball. Anticipating turns 2-3 seconds in advance is the only way to survive at high speeds.",
      whyPopular: "Slope is popular in 2025 because it induces a 'flow state'. The high speed and total concentration make it an excellent way to clear one's mind."
    }
  },
  {
    id: 'fireboy-watergirl',
    title: 'Fireboy & Watergirl',
    category: 'Puzzle',
    image: 'https://images.crazygames.com/games/fireboy-and-watergirl-the-forest-temple/cover-16x9.png?auto=format,compress&q=75&cs=strip',
    url: 'https://www.crazygames.com/embed/fireboy-and-watergirl-the-forest-temple',
    description: 'Help Fireboy and Watergirl explore the Forest Temple. Solve puzzles together.',
    rating: 4.9,
    plays: '180M',
    richContent: {
      gameplay: "This cooperative puzzle platformer requires two characters to work in tandem. Fireboy walks through lava; Watergirl through water.",
      strategies: "Communication is key. If playing solo, treat it as a brain teaser for ambidexterity, controlling one character with WASD and the other with Arrows.",
      whyPopular: "It remains the gold standard for local co-op browser games. It teaches logic, cooperation, and problem-solving."
    }
  },
  {
    id: 'basket-random',
    title: 'Basket Random',
    category: 'Sports',
    image: 'https://images.crazygames.com/games/basket-random/cover-16x9.png?auto=format,compress&q=75&cs=strip',
    url: 'https://www.crazygames.com/embed/basket-random',
    description: 'Score a basket using only one key with variations from different fields and players.',
    rating: 4.5,
    plays: '15.8M',
    richContent: {
      gameplay: "Basket Random takes basketball and adds a heavy dose of chaos. Physics are exaggerated, and controls are limited to a single button.",
      strategies: "Timing is everything. Wait for your player's arm to be at the right angle before pressing jump. Blocking is often better than stealing.",
      whyPopular: "The unpredictability makes it hilarious and highly replayable. It's a 'ragdoll' physics game that is perfect for quick matches."
    }
  },
  {
    id: 'tunnel-rush',
    title: 'Tunnel Rush',
    category: 'Action',
    image: 'https://images.crazygames.com/games/tunnel-rush/cover-16x9.png?auto=format,compress&q=75&cs=strip',
    url: 'https://www.crazygames.com/embed/tunnel-rush',
    description: 'Dodge obstacles in a kaleidoscope of hazards in this 3D tunnel running game.',
    rating: 4.3,
    plays: '22.1M',
    richContent: {
      gameplay: "Tunnel Rush is a first-person avoidance game where you speed through a colorful, rotating tunnel. Obstacles spin and move.",
      strategies: "Memorize the patterns. The obstacles follow specific geometric patterns. Focus on the center of the screen to spot gaps early.",
      whyPopular: "Its high-contrast visuals and smooth framerate make it visually stunning. It is a pure test of visual processing speed."
    }
  },
  {
    id: 'smash-karts',
    title: 'Smash Karts',
    category: 'Racing',
    image: 'https://images.crazygames.com/games/smash-karts/cover-16x9.png?auto=format,compress&q=75&cs=strip',
    url: 'https://www.crazygames.com/embed/smash-karts',
    description: 'A 3D multiplayer kart battle game. Drive, shoot, and survive.',
    rating: 4.7,
    plays: '18.5M',
    richContent: {
      gameplay: "Smash Karts is essentially 'Mario Kart Battle Mode' in your browser. It's a 3D multiplayer arena battler where you drive karts and use weapons.",
      strategies: "Drifting helps you make tight turns to escape fire. Predict where enemies are going and lay mines in choke points. Keep moving.",
      whyPopular: "It brings a console-quality kart battle experience to the web without a download. The persistent leveling system provides great progression."
    }
  },
  {
    id: 'temple-run-2',
    title: 'Temple Run 2',
    category: 'Action',
    image: 'https://images.crazygames.com/games/temple-run-2/cover-16x9.png?auto=format,compress&q=75&cs=strip',
    url: 'https://www.crazygames.com/embed/temple-run-2',
    description: 'Navigate perilous cliffs, zip lines, mines and forests to escape with the idol.',
    rating: 4.5,
    plays: '40.2M',
    richContent: {
      gameplay: "You steal a cursed idol and must outrun a giant demon monkey. Path is filled with broken bridges, fire traps, and waterfalls.",
      strategies: "Focus on collecting coins to upgrade power-ups. The 'Coin Magnet' is the best early upgrade. Lean into minecart turns.",
      whyPopular: "It translates perfectly to the web. Graphics are updated for 2025 standards, looking crisp on high-resolution monitors."
    }
  },
  {
    id: 'paper-io-2',
    title: 'Paper.io 2',
    category: 'Simulation',
    image: 'https://images.crazygames.com/games/paper-io-2/cover-16x9.png?auto=format,compress&q=75&cs=strip',
    url: 'https://www.crazygames.com/embed/paper-io-2',
    description: 'Conquer territory in this addictive multiplayer strategy game.',
    rating: 4.4,
    plays: '65.3M',
    richContent: {
      gameplay: "Paper.io 2 is about territory control. You leave a trail and enclose area to capture it. If your trail is hit, you die.",
      strategies: "Greed kills. Take small, safe bites of territory. Bait enemies into chasing you, then cut back to hit their trail.",
      whyPopular: "The simple risk-reward mechanic is addictive. It's a strategic game that requires planning but plays out in real-time."
    }
  }
];

// --- AD COMPONENTS ---

const AdBanner: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pushed = useRef(false);
  const location = useLocation();

  useEffect(() => {
    pushed.current = false;
    let timer: any;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !pushed.current) {
        // Wait for layout to settle
        requestAnimationFrame(() => {
          if (!containerRef.current) return;
          
          const width = containerRef.current.offsetWidth;
          // Only push if width is actually determined
          if (width > 0 && containerRef.current.offsetParent !== null) {
            timer = setTimeout(() => {
              try {
                if (window.adsbygoogle && !pushed.current) {
                  (window.adsbygoogle = window.adsbygoogle || []).push({});
                  pushed.current = true;
                  observer.disconnect();
                }
              } catch (e) {
                console.warn("AdSense push skipped safely");
              }
            }, 200);
          }
        });
      }
    }, { threshold: 0.1 });

    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
      if (timer) clearTimeout(timer);
    };
  }, [location.pathname]);

  return (
    <div className="w-full bg-[#1f2937] border-y border-gray-800 my-8 py-6 flex flex-col items-center justify-center min-h-[120px]">
      <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-2 font-semibold">Advertisement</div>
      <div ref={containerRef} className="overflow-hidden bg-gray-800 rounded w-full max-w-[728px] h-[90px] flex items-center justify-center relative shadow-sm min-w-[1px]">
        <ins className="adsbygoogle"
             key={`banner-slot-${location.pathname}`}
             style={{ display: 'inline-block', width: '728px', height: '90px' }}
             data-ad-client="ca-pub-9774042341049510"
             data-ad-slot="1234567890">
        </ins>
        <span className="absolute text-gray-700 text-xs pointer-events-none z-0">Ad Space</span>
      </div>
    </div>
  );
};

const AdRectangle: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pushed = useRef(false);
  const location = useLocation();

  useEffect(() => {
    pushed.current = false;
    let timer: any;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !pushed.current) {
        requestAnimationFrame(() => {
          if (!containerRef.current) return;
          const width = containerRef.current.offsetWidth;
          if (width > 0 && containerRef.current.offsetParent !== null) {
            timer = setTimeout(() => {
              try {
                if (window.adsbygoogle && !pushed.current) {
                  (window.adsbygoogle = window.adsbygoogle || []).push({});
                  pushed.current = true;
                  observer.disconnect();
                }
              } catch (e) {
                console.warn("AdSense push skipped safely");
              }
            }, 200);
          }
        });
      }
    }, { threshold: 0.1 });

    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
      if (timer) clearTimeout(timer);
    };
  }, [location.pathname]);

  return (
    <div className="w-full bg-[#1f2937] border border-gray-700 rounded-xl p-6 flex flex-col items-center justify-center mb-8 shadow-md min-w-[1px]">
      <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-2 font-semibold">Advertisement</div>
      <div ref={containerRef} className="overflow-hidden bg-gray-800 rounded w-[300px] h-[250px] flex items-center justify-center relative">
        <ins className="adsbygoogle"
             key={`rect-slot-${location.pathname}`}
             style={{ display: 'inline-block', width: '300px', height: '250px' }}
             data-ad-client="ca-pub-9774042341049510"
             data-ad-slot="0987654321">
        </ins>
        <span className="absolute text-gray-700 text-xs pointer-events-none z-0">Ad Space</span>
      </div>
    </div>
  );
};

const AdSenseScript: React.FC = () => {
  useEffect(() => {
    if (!document.querySelector('script[src*="adsbygoogle.js"]')) {
      const script = document.createElement("script");
      script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9774042341049510";
      script.async = true;
      script.crossOrigin = "anonymous";
      document.head.appendChild(script);
    }
  }, []);
  return null;
};

// --- COOKIE CONSENT ---
const CookieConsent: React.FC = () => {
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (consent) setAccepted(true);
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'true');
    setAccepted(true);
  };

  if (accepted) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-900/95 backdrop-blur-md border-t border-gray-700 p-4 z-50 shadow-2xl">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-900/50 p-2 rounded-full">
            <Cookie className="w-6 h-6 text-indigo-400" />
          </div>
          <p className="text-sm text-gray-300 max-w-2xl">
            We use cookies to personalize content and ads. 
            <Link to="/privacy" className="text-indigo-400 hover:underline ml-1">Learn more</Link>
          </p>
        </div>
        <button onClick={acceptCookies} className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold rounded-lg transition-colors">
          Accept All
        </button>
      </div>
    </div>
  );
};

// --- COMPONENTS ---

const Header: React.FC<{ searchTerm: string; setSearchTerm: (s: string) => void }> = ({ searchTerm, setSearchTerm }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-[#111827]/95 backdrop-blur-md border-b border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-2.5 rounded-lg">
              <Gamepad2 className="text-white w-6 h-6" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold leading-none text-white">Unblocked Games</h1>
              <span className="text-xs text-indigo-400 font-medium tracking-wide">NO DOWNLOAD 2025</span>
            </div>
          </Link>
          <div className="flex-1 max-w-lg hidden md:block relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-4 h-4 text-gray-500" />
            </div>
            <input 
              type="text"
              placeholder="Search games..."
              className="w-full bg-gray-900/50 text-white border border-gray-700 rounded-lg py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-600"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-gray-400 md:hidden">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <Link to="/about" className="hidden md:block text-sm font-medium text-gray-300 px-3 py-2 rounded-lg hover:bg-gray-800">About</Link>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-800 bg-gray-900 p-4 space-y-4">
          <input 
            type="text"
            placeholder="Search..."
            className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg py-3 px-4"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <nav className="flex flex-col gap-2">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 text-gray-300">Home</Link>
            <Link to="/about" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 text-gray-300">About</Link>
          </nav>
        </div>
      )}
    </header>
  );
};

const Footer: React.FC = () => (
  <footer className="bg-gray-950 border-t border-gray-900 py-10 mt-auto">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <Gamepad2 className="text-indigo-500 w-5 h-5" />
            <span className="font-bold text-white">Unblocked Games 2025</span>
          </div>
          <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
            Play the best HTML5 games for free. Fully compatible with Chromebooks, PC, and Mobile.
          </p>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-3 text-sm uppercase">Links</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-3 text-sm uppercase">Legal</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link to="/privacy">Privacy Policy</Link></li>
          </ul>
        </div>
      </div>
      <p className="text-gray-600 text-xs border-t border-gray-900 pt-6 text-center">© 2025 Unblocked Games Online. All rights reserved.</p>
    </div>
  </footer>
);

const GameCard: React.FC<{ game: Game }> = ({ game }) => (
  <Link to={`/game/${game.id}`} className="group relative block h-full">
    <div className="h-full bg-gray-900 rounded-xl overflow-hidden ring-1 ring-gray-800 hover:ring-indigo-500 transition-all duration-300 flex flex-col">
      <div className="relative aspect-[16/9] overflow-hidden bg-gray-800">
        <img src={game.image} alt={game.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all bg-black/40">
          <div className="bg-indigo-600 rounded-full p-3"><Play className="w-6 h-6 text-white fill-current ml-1" /></div>
        </div>
        <div className="absolute top-2 left-2"><span className="px-2 py-1 bg-black/70 rounded text-[10px] text-white uppercase">{game.category}</span></div>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-white font-bold text-base mb-1 truncate">{game.title}</h3>
        <p className="text-gray-500 text-xs line-clamp-2 mb-3 leading-relaxed flex-grow">{game.description}</p>
        <div className="flex items-center justify-between text-xs text-gray-600 border-t border-gray-800 pt-3">
          <div className="flex items-center gap-1 text-yellow-500/90"><Flame className="w-3 h-3" /><span>{game.rating}</span></div>
          <div className="flex items-center gap-1"><Zap className="w-3 h-3" /><span>{game.plays}</span></div>
        </div>
      </div>
    </div>
  </Link>
);

const Home: React.FC<{ searchTerm: string }> = ({ searchTerm }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const categories = ['All', 'Action', 'Racing', 'Puzzle', 'Sports'];

  const filteredGames = GAMES.filter(g => {
    const matchesSearch = g.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          g.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || g.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-wrap gap-2 mb-8 justify-center md:justify-start">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              selectedCategory === cat ? 'bg-indigo-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 md:gap-6">
        {filteredGames.length > 0 ? (
          filteredGames.map(game => <GameCard key={game.id} game={game} />)
        ) : (
          <div className="col-span-full py-20 text-center text-gray-500">No games found</div>
        )}
      </div>
      <AdBanner />
      <div className="mt-12 bg-[#1f2937] rounded-2xl p-6 md:p-10 border border-gray-700">
        <h2 className="text-2xl font-bold text-white mb-6 border-b border-gray-600 pb-4">Play Unblocked Games No Download in 2025</h2>
        <div className="grid md:grid-cols-2 gap-8 text-gray-300 leading-relaxed text-sm">
          <div>
            <h3 className="font-bold text-white mb-2 text-lg">Why Choose No Download Gaming?</h3>
            <p>Cloud gaming and HTML5 technologies have made downloading obsolete for casual browser gaming.</p>
          </div>
          <div>
            <h3 className="font-bold text-white mb-2 text-lg">Safety and Privacy First</h3>
            <p>We prioritize user safety. All games are scanned for malware and trackers.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const GamePlayer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const game = GAMES.find(g => g.id === id);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoading(true);
    setHasError(false);
  }, [id]);

  if (!game) return null;

  return (
    <div className="container mx-auto px-4 py-6">
      <button onClick={() => navigate('/')} className="flex items-center gap-2 px-3 py-1.5 bg-gray-800 rounded-lg text-sm text-gray-300 mb-4">
        <ArrowLeft className="w-4 h-4" /> Back to Library
      </button>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 space-y-8">
          <div className="relative bg-black rounded-xl overflow-hidden aspect-[16/9] ring-1 ring-gray-800">
            {isLoading && !hasError && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 z-10">
                <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            <iframe
              src={game.url}
              title={game.title}
              className={`w-full h-full border-0 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
              allowFullScreen
              allow="autoplay; gamepad; microphone; camera; gyroscope; accelerometer"
              onLoad={() => setIsLoading(false)}
              onError={() => setHasError(true)}
            />
          </div>
          <div className="bg-[#1f2937] rounded-xl p-6 border border-gray-700">
            <h1 className="text-3xl font-bold text-white mb-6">{game.title}</h1>
            <div className="prose prose-invert max-w-none text-gray-300">
              <section className="mb-8">
                <h2 className="text-xl font-bold text-white mb-2">Gameplay Overview</h2>
                <p>{game.richContent.gameplay}</p>
              </section>
              <div className="grid md:grid-cols-2 gap-8">
                <section>
                  <h2 className="text-xl font-bold text-white mb-2">Strategies</h2>
                  <p>{game.richContent.strategies}</p>
                </section>
                <section>
                  <h2 className="text-xl font-bold text-white mb-2">Popularity</h2>
                  <p>{game.richContent.whyPopular}</p>
                </section>
              </div>
            </div>
          </div>

          {/* Strategy Text Block */}
          <div className="strategy mt-8 text-gray-300 p-4 bg-gray-800 rounded-lg border border-gray-700">
            What is the biggest barrier to gaming on school computers? Usually, it's the "Admin Rights" required to install software. No Download Games Unblocked 2025 solves this perfectly. As the name suggests, everything here runs directly in your browser. No .exe files, no Steam, no Flash. This is a one-stop cloud gaming experience that saves your hard drive space and bypasses installation blocks.
            <br/><br/>
            Security Note: Because there are no downloads, you are safe from viruses or malware. This site is specifically tailored for Chromebook users. From complex RPGs to simple clickers, everything is processed in the cloud. Bookmark this page, and you have a portable arcade in your pocket, accessible from anywhere, anytime, completely unblocked for the 2025 school year.
          </div>

          {/* More Unblocked Games Links Grid */}
          <div className="other-games mt-8 bg-gray-900 p-6 rounded-lg shadow-lg border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-4 border-b border-gray-600 pb-2">More Unblocked Games 2025</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 list-none">
              <li className="mb-2"><a href="https://snakegame.cfd" className="text-blue-400 hover:text-blue-300 transition-colors duration-200">Play Snake Game Unblocked 2025</a></li>
              <li className="mb-2"><a href="https://playzero2025.sbs" className="text-blue-400 hover:text-blue-300 transition-colors duration-200">Play Zero Lag Games Unblocked 2025</a></li>
              <li className="mb-2"><a href="https://freegames2025.sbs" className="text-blue-400 hover:text-blue-300 transition-colors duration-200">Play Free Games Unblocked 2025</a></li>
              <li className="mb-2"><a href="https://nodownload2025.online" className="text-blue-400 hover:text-blue-300 transition-colors duration-200">Play No Download Games Unblocked 2025</a></li>
              <li className="mb-2"><a href="https://unblocked2025.cfd" className="text-blue-400 hover:text-blue-300 transition-colors duration-200">Play Unblocked Games 2025 (Main)</a></li>
              <li className="mb-2"><a href="https://unblocked2025.sbs" className="text-blue-400 hover:text-blue-300 transition-colors duration-200">Play Best Unblocked Games 2025</a></li>
              <li className="mb-2"><a href="https://promax.it.com" className="text-blue-400 hover:text-blue-300 transition-colors duration-200">Play ProMax Games Unblocked 2025</a></li>
              <li className="mb-2"><a href="https://retrobowl2025.online" className="text-blue-400 hover:text-blue-300 transition-colors duration-200">Play Retro Bowl Unblocked 2025</a></li>
              <li className="mb-2"><a href="https://1v1lol2025.online" className="text-blue-400 hover:text-blue-300 transition-colors duration-200">Play 1v1.LOL Unblocked 2025</a></li>
              <li className="mb-2"><a href="https://drift2025.site" className="text-blue-400 hover:text-blue-300 transition-colors duration-200">Play Drift Hunters Unblocked 2025</a></li>
              <li className="mb-2"><a href="https://slope2025.online" className="text-blue-400 hover:text-blue-300 transition-colors duration-200">Play Slope Game Unblocked 2025</a></li>
              <li className="mb-2"><a href="https://gd2025.site" className="text-blue-400 hover:text-blue-300 transition-colors duration-200">Play Geometry Dash Unblocked 2025</a></li>
              <li className="mb-2"><a href="https://motox3m2025.online" className="text-blue-400 hover:text-blue-300 transition-colors duration-200">Play Moto X3M Unblocked 2025</a></li>
              <li className="mb-2"><a href="https://surfers2025.site" className="text-blue-400 hover:text-blue-300 transition-colors duration-200">Play Subway Surfers Unblocked 2025</a></li>
              <li className="mb-2"><a href="https://run32025.online" className="text-blue-400 hover:text-blue-300 transition-colors duration-200">Play Run 3 Unblocked 2025</a></li>
              <li className="mb-2"><a href="https://fireboy2025.site" className="text-blue-400 hover:text-blue-300 transition-colors duration-200">Play Fireboy & Watergirl Unblocked 2025</a></li>
              <li className="mb-2"><a href="https://paperio2025.online" className="text-blue-400 hover:text-blue-300 transition-colors duration-200">Play Paper.io Unblocked 2025</a></li>
              <li className="mb-2"><a href="https://driftbest2025.site" className="text-blue-400 hover:text-blue-300 transition-colors duration-200">Play Drift Hunters MAX Unblocked 2025</a></li>
              <li className="mb-2"><a href="https://gd-full2025.site" className="text-blue-400 hover:text-blue-300 transition-colors duration-200">Play Geometry Dash Full Unblocked 2025</a></li>
              <li className="mb-2"><a href="https://subway2025.online" className="text-blue-400 hover:text-blue-300 transition-colors duration-200">Play Subway Surfers World Unblocked 2025</a></li>
            </ul>
          </div>

          <AdBanner />
        </div>
        <div className="lg:col-span-1 space-y-8">
          <AdRectangle />
          <div className="bg-[#1f2937] rounded-xl p-5 border border-gray-700 sticky top-24">
            <h3 className="font-bold text-white mb-4 uppercase tracking-wide border-b border-gray-600 pb-2">Related Games</h3>
            <div className="space-y-4">
              {GAMES.filter(g => g.id !== game.id).slice(0, 4).map(sg => (
                <Link key={sg.id} to={`/game/${sg.id}`} className="flex gap-3 hover:bg-gray-800 p-2 rounded-lg transition-colors">
                  <img src={sg.image} alt="" className="w-20 h-14 object-cover rounded shrink-0" />
                  <div className="flex flex-col justify-center">
                    <h4 className="text-white text-sm font-medium line-clamp-1">{sg.title}</h4>
                    <p className="text-xs text-gray-500">{sg.rating} rating</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StaticPage: React.FC<{ type: 'about' | 'privacy' | 'contact' }> = ({ type }) => (
  <div className="container mx-auto px-4 py-12 max-w-3xl">
    <div className="bg-[#1f2937] rounded-2xl p-8 border border-gray-700">
      <h1 className="text-3xl font-bold text-white mb-8 capitalize">{type}</h1>
      <div className="text-gray-300 leading-relaxed">
        {type === 'about' ? <p>Welcome to Unblocked Games 2025. We provide the best browser games safe for school.</p> : <p>Privacy Policy and Terms for nodownload2025.online.</p>}
      </div>
    </div>
  </div>
);

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  
  return (
    <div className="min-h-screen flex flex-col bg-[#030712] text-white">
      <AdSenseScript />
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home searchTerm={searchTerm} />} />
          <Route path="/game/:id" element={<GamePlayer />} />
          <Route path="/about" element={<StaticPage type="about" />} />
          <Route path="/privacy" element={<StaticPage type="privacy" />} />
          <Route path="/contact" element={<StaticPage type="contact" />} />
          <Route path="*" element={<div className="text-center py-20 text-gray-500">404 - Not Found</div>} />
        </Routes>
      </main>
      <CookieConsent />
      <Footer />
    </div>
  );
};

export default App;