import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { Gamepad2, Search, ArrowLeft, Flame, Zap, Play, Check, Cookie, Maximize, Monitor, Smartphone, Globe, ShieldCheck, Cpu } from 'lucide-react';

// --- TYPES ---
interface Game {
  id: string;
  title: string;
  category: 'Action' | 'Racing' | 'Puzzle' | 'Sports' | 'Simulation' | 'Adventure' | 'Arcade' | 'Rhythm' | 'Platformer' | 'Classic';
  image: string;
  url: string;
  description: string;
  richContent?: {
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
      gameplay: "Subway Surfers remains the definitive endless runner experience. You control a graffiti artist running along railway tracks while dodging trains, barriers, and a grumpy inspector. The smooth frame rate on Chromebooks makes it a top choice for school breaks.",
      strategies: "Always aim for the high ground. Staying on top of trains gives you a clearer view of upcoming obstacles. Use hoverboards to save yourself during tight corners.",
      whyPopular: "It requires zero downloads and features high-quality assets that render instantly in any modern browser."
    }
  },
  {
    id: 'geometry-dash',
    title: 'Geometry Dash',
    category: 'Rhythm',
    image: 'https://images.crazygames.com/games/geometry-dash/cover-16x9.png?auto=format,compress&q=75&cs=strip',
    url: 'https://www.crazygames.com/embed/geometry-dash',
    description: 'Jump and fly your way through danger in this rhythm-based action platformer.',
    rating: 4.8,
    plays: '12.5M',
    richContent: {
      gameplay: "A rhythm-based platformer that is as challenging as it is addictive. Your character moves automatically; your only job is to jump or fly at the perfect millisecond to match the beat.",
      strategies: "Practice mode is your best friend. Map out the level's rhythm before trying a full run. The music isn't just background noise—it’s your guide.",
      whyPopular: "The instant-restart mechanic is perfect for short gaming sessions on a Chromebook during school hours."
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
      gameplay: "Moto X3M brings physics-based motocross to your browser. Navigate through 22 levels of giant saw blades, falling rocks, and explosive TNT traps.",
      strategies: "Don't just go fast; go smart. Perform front and backflips to reduce your time, but make sure you land on two wheels to maintain speed.",
      whyPopular: "Optimized for no-download environments, it runs flawlessly even on hardware with limited resources."
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
      gameplay: "Control a neon ball in a high-speed descent through a 3D city. The speed increases constantly, and the track is filled with red obstacles that require precise movements.",
      strategies: "Keep your movements subtle. Over-correcting is the number one cause of falling off the track. Focus on the horizon to anticipate turns.",
      whyPopular: "One of the most requested unblocked games for 2026 due to its hypnotic visuals and competitive leaderboards."
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
      gameplay: "A wacky one-button basketball game where the physics change every time you score. You might find yourself playing with long arms, on an icy court, or with a heavy ball.",
      strategies: "Wait for the player's arm to reach the peak height before jumping.",
      whyPopular: "Hilarious unpredictability makes for high replayability."
    }
  }
];

// --- AD COMPONENT ---

const AdBanner: React.FC<{ slotId?: string; className?: string }> = ({ slotId = "default-slot", className = "" }) => {
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
          if (width > 0) {
            timer = setTimeout(() => {
              try {
                if (window.adsbygoogle && !pushed.current) {
                  (window.adsbygoogle = window.adsbygoogle || []).push({});
                  pushed.current = true;
                  observer.disconnect();
                }
              } catch (e) {
                console.warn("AdSense push safely deferred.");
              }
            }, 600);
          }
        });
      }
    }, { threshold: 0.1 });

    if (containerRef.current) observer.observe(containerRef.current);
    return () => {
      observer.disconnect();
      if (timer) clearTimeout(timer);
    };
  }, [location.pathname, slotId]);

  return (
    <div className={`flex justify-center w-full ${className}`}>
      <div ref={containerRef} className="bg-gray-950/40 rounded-2xl flex flex-col items-center justify-center min-h-[120px] min-w-[300px] w-full border border-gray-800/50 relative overflow-hidden backdrop-blur-sm shadow-inner">
        <div className="absolute top-2 text-[8px] text-gray-700 uppercase font-black tracking-[0.2em] pointer-events-none">Advertisement</div>
        <ins className="adsbygoogle"
             key={`ad-unit-${location.pathname}-${slotId}`}
             style={{ display: 'block', width: '100%', minHeight: '90px' }}
             data-ad-client="ca-pub-9774042341049510"
             data-ad-slot={slotId}
             data-ad-format="auto"
             data-full-width-responsive="true">
        </ins>
      </div>
    </div>
  );
};

// --- COMPONENTS ---

const Header: React.FC<{ searchTerm: string; setSearchTerm: (s: string) => void }> = ({ searchTerm, setSearchTerm }) => (
  <header className="bg-gray-950 border-b border-gray-800 sticky top-0 z-50 py-4 backdrop-blur-xl shadow-2xl">
    <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-5">
      <Link to="/" className="flex items-center gap-3 group">
        <div className="bg-indigo-600 p-2.5 rounded-2xl group-hover:rotate-12 transition-all shadow-indigo-500/30 shadow-xl">
          <Gamepad2 className="text-white w-7 h-7" />
        </div>
        <div className="leading-none">
          <h1 className="text-2xl font-black text-white tracking-tighter uppercase italic">NO DOWNLOAD 2025</h1>
          <p className="text-[10px] text-indigo-400 font-black uppercase tracking-[0.3em] mt-1">Unblocked Gaming Pro</p>
        </div>
      </Link>
      <div className="relative w-full md:max-w-xl">
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600" />
        <input 
          type="text" 
          placeholder="Search 5,000+ unblocked games..." 
          className="w-full bg-gray-900 border border-gray-700 rounded-2xl py-3.5 pl-14 pr-6 text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/20 transition-all text-white placeholder:text-gray-600 font-bold"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  </header>
);

const GamePlayer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const game = GAMES.find(g => g.id === id);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'f') toggleFullscreen();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [id]);

  const toggleFullscreen = () => {
    const elem = document.documentElement;
    if (!document.fullscreenElement) {
      elem.requestFullscreen().catch(err => console.warn(err));
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
    }
  };

  if (!game) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <button onClick={() => navigate('/')} className="flex items-center gap-3 px-6 py-3 bg-gray-900 rounded-2xl text-[11px] font-black text-gray-400 mb-8 hover:bg-gray-800 transition-all border border-gray-800 uppercase tracking-widest shadow-lg">
        <ArrowLeft className="w-4 h-4" /> Return to Library
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        <div className="lg:col-span-3">
          
          {/* AD ABOVE GAME AREA */}
          <AdBanner slotId="game-player-top" className="mb-6" />

          {/* TASK 2: MOBILE ADAPTATION TIP */}
          <div className="text-center text-white bg-purple-800 p-4 rounded-lg mb-6 max-w-md mx-auto shadow-md font-bold">
            Tip: Rotate to landscape for better mobile experience! Perfect on phone or Chromebook.
          </div>

          {/* TASK 3: OPTIMIZED FULLSCREEN BUTTON */}
          <button 
            onClick={toggleFullscreen} 
            className="block mx-auto bg-green-600 hover:bg-green-700 text-white font-black py-4 px-8 rounded-xl text-xl mb-6 shadow-[0_10px_20px_-5px_rgba(22,163,74,0.4)] transition-all active:scale-95 transform hover:scale-105 flex items-center justify-center gap-3 uppercase tracking-tight"
          >
            <Maximize className="w-6 h-6" />
            Play Full Screen (Press F - Ultimate Experience!)
          </button>
          
          {/* TASK 4: FULLSCREEN TIP TEXT */}
          <div className="text-center text-white bg-blue-800 p-4 rounded-lg mb-6 max-w-lg mx-auto shadow-md border border-blue-600 font-bold italic">
            Press F for fullscreen - No lag, full immersion on any device!
          </div>

          {/* LOADING HINT */}
          <div className="text-center text-gray-700 mb-4 animate-pulse text-[10px] font-black uppercase tracking-[0.4em]">
            Allocating Node Assets...
          </div>

          {/* GAME FRAME CONTAINER */}
          <div className="relative bg-black rounded-[3rem] overflow-hidden aspect-[16/9] ring-[12px] ring-gray-950 shadow-[0_40px_100px_-20px_rgba(0,0,0,1)]">
            {isLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-950 z-10">
                <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-6"></div>
                <p className="text-indigo-400 text-xs font-black tracking-[0.3em] uppercase">Booting Engine...</p>
              </div>
            )}
            <iframe
              src={game.url}
              title={game.title}
              className="w-full h-full border-0"
              allowFullScreen
              allow="autoplay; gamepad; gyroscope; accelerometer"
              onLoad={() => setIsLoading(false)}
            />
          </div>

          {/* TASK 1: AD BOTTOM (Requested structure) */}
          <div className="ad-bottom mt-8 text-center mb-10">
            <AdBanner slotId="game-player-bottom-custom" />
          </div>

          {/* DETAILED CONTENT AREA (Boost site value/RPM) */}
          <div className="bg-gray-900/50 rounded-[3rem] p-10 border border-gray-800 shadow-2xl mt-12 backdrop-blur-sm">
            <h1 className="text-4xl font-black text-white mb-6 border-b border-gray-800 pb-6 tracking-tighter uppercase italic">
              {game.title} <span className="text-indigo-500">Unblocked 2025/2026</span>
            </h1>
            <div className="prose prose-invert max-w-none text-gray-400">
              <h2 className="text-xl text-white font-black mb-4 uppercase flex items-center gap-2 tracking-tight">
                <Globe className="w-5 h-5 text-indigo-400" /> Professional Overview
              </h2>
              <p className="mb-8 leading-relaxed text-lg font-medium opacity-90 italic">
                Experience {game.title} as never before. Our platform provides high-performance access to <strong>no download unblocked games 2026 school chromebook</strong> optimized hubs. Whether you're in a library or on a commute, our zero-installation standard ensures you're always one click away from the action.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 mb-10">
                <div className="bg-gray-850/40 p-8 rounded-3xl border border-gray-700/30">
                  <h3 className="text-indigo-400 font-black mb-4 flex items-center gap-2 uppercase tracking-widest text-xs">
                    <Flame className="w-5 h-5" /> Game Mechanics
                  </h3>
                  <p className="text-sm leading-relaxed">{game.richContent?.gameplay}</p>
                </div>
                <div className="bg-gray-850/40 p-8 rounded-3xl border border-gray-700/30">
                  <h3 className="text-indigo-400 font-black mb-4 flex items-center gap-2 uppercase tracking-widest text-xs">
                    <Check className="w-5 h-5" /> Competitive Tips
                  </h3>
                  <p className="text-sm leading-relaxed">{game.richContent?.strategies}</p>
                </div>
              </div>

              <div className="bg-gray-950/50 p-8 rounded-3xl border border-gray-800 mb-8">
                <h3 className="text-white font-black mb-4 uppercase text-sm italic flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-indigo-500" /> Security & Accessibility
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed font-bold">
                  Searching for <strong>no download unblocked games 2026 school chromebook</strong> access can be difficult. Our cloud architecture bypasses filters safely while maintaining a strictly "No Installation" policy, protecting your device from local storage bloat and potential security risks.
                </p>
              </div>
            </div>
          </div>
          
          {/* INTERLINKING GRID */}
          <div className="mt-12 p-10 bg-gray-950 rounded-[3rem] border border-gray-800 border-dashed">
            <h3 className="text-white font-black mb-8 text-center uppercase tracking-[0.4em] text-[10px] opacity-40">Network Node Connectivity</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-[9px] font-black uppercase tracking-tighter">
              <a href="https://snakegame.cfd" target="_blank" className="text-gray-500 hover:text-indigo-400 transition-all bg-gray-900/20 p-4 rounded-2xl text-center border border-gray-800">Snake 2026</a>
              <a href="https://slope2025.online" target="_blank" className="text-gray-500 hover:text-indigo-400 transition-all bg-gray-900/20 p-4 rounded-2xl text-center border border-gray-800">Slope 2025</a>
              <a href="https://retrobowl2025.online" target="_blank" className="text-gray-500 hover:text-indigo-400 transition-all bg-gray-900/20 p-4 rounded-2xl text-center border border-gray-800">Retro Bowl</a>
              <a href="https://1v1lol2025.online" target="_blank" className="text-gray-500 hover:text-indigo-400 transition-all bg-gray-900/20 p-4 rounded-2xl text-center border border-gray-800">1v1.LOL Mobile</a>
            </div>
          </div>
        </div>

        {/* SIDEBAR */}
        <div className="lg:col-span-1 space-y-10">
          <div className="bg-gray-900 border border-gray-800 rounded-[2rem] p-6 shadow-3xl backdrop-blur-md">
            <h3 className="text-white font-black mb-6 flex items-center gap-2 border-b border-gray-800 pb-4 text-[11px] uppercase tracking-[0.3em]">
              <Zap className="w-4 h-4 text-yellow-500" /> Trending
            </h3>
            <div className="space-y-6">
              {GAMES.filter(g => g.id !== id).map(sg => (
                <Link key={sg.id} to={`/game/${sg.id}`} className="flex gap-4 group">
                  <div className="w-20 h-14 overflow-hidden rounded-2xl shrink-0 border border-gray-800 group-hover:border-indigo-500 transition-all shadow-md">
                    <img src={sg.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h4 className="text-white text-[11px] font-black line-clamp-1 group-hover:text-indigo-400 transition-colors uppercase italic">{sg.title}</h4>
                    <p className="text-[9px] text-gray-500 uppercase font-black tracking-tighter mt-1">{sg.category}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <AdBanner slotId="sidebar-ad-node" className="sticky top-28" />
        </div>
      </div>
    </div>
  );
};

const GameCard: React.FC<{ game: Game }> = ({ game }) => (
  <Link to={`/game/${game.id}`} className="block group">
    <div className="bg-gray-900 rounded-[2rem] overflow-hidden border border-gray-800 hover:border-indigo-500 transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_25px_50px_-15px_rgba(79,70,229,0.5)]">
      <div className="relative aspect-video overflow-hidden">
        <img src={game.image} alt={game.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-sm">
          <div className="bg-indigo-600 rounded-full p-6 transform scale-50 group-hover:scale-100 transition-all duration-300 shadow-indigo-500/50 shadow-2xl">
            <Play className="text-white w-8 h-8 fill-current" />
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-white font-black text-sm group-hover:text-indigo-400 transition-colors uppercase tracking-tighter italic">{game.title}</h3>
          <span className="bg-indigo-600/20 text-indigo-400 text-[8px] font-black px-2 py-1 rounded-lg uppercase tracking-widest leading-none">HOT</span>
        </div>
        <div className="flex items-center gap-3 text-[10px] text-gray-600 font-black uppercase">
          <span className="flex items-center gap-1 text-yellow-600"><Flame className="w-3 h-3" /> {game.rating}</span>
          <span className="opacity-50">{game.plays} Active</span>
        </div>
      </div>
    </div>
  </Link>
);

const Home: React.FC<{ searchTerm: string }> = ({ searchTerm }) => {
  const filteredGames = GAMES.filter(g => g.title.toLowerCase().includes(searchTerm.toLowerCase()));
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-20 text-center">
        <h2 className="text-7xl md:text-9xl font-black text-white mb-6 tracking-tighter uppercase italic leading-none">
          UNBLOCKED <span className="text-indigo-500">2025</span>
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-gray-500 font-bold uppercase tracking-widest text-[11px] mb-8">
          <span className="flex items-center gap-2 px-4 py-2 bg-gray-900 rounded-full border border-gray-800 shadow-lg"><Monitor className="w-4 h-4" /> PC Optimized</span>
          <span className="flex items-center gap-2 px-4 py-2 bg-gray-900 rounded-full border border-gray-800 shadow-lg"><Smartphone className="w-4 h-4" /> Cloud Hub</span>
          <span className="flex items-center gap-2 px-4 py-2 bg-gray-900 rounded-full border border-gray-800 shadow-lg"><Globe className="w-4 h-4" /> Global Access</span>
        </div>
        <p className="text-gray-500 max-w-4xl mx-auto text-lg font-bold tracking-tight opacity-70 leading-relaxed uppercase">
          The ultimate destination for professional-grade browser entertainment. Zero Installation. Zero Latency. Maximum Accessibility for 2026 school standards.
        </p>
      </div>
      
      <AdBanner slotId="home-top-node" className="mb-12" />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {filteredGames.map(game => <GameCard key={game.id} game={game} />)}
      </div>

      <div className="mt-32 p-12 bg-gray-900/30 rounded-[3.5rem] border border-gray-800 shadow-3xl text-center max-w-6xl mx-auto backdrop-blur-sm">
        <h3 className="text-3xl font-black text-white mb-8 uppercase italic tracking-tighter">Why Choose No Download Unblocked Games 2026 School Chromebook Edition?</h3>
        <div className="prose prose-invert prose-indigo mx-auto text-gray-500 font-bold leading-loose text-base text-justify md:text-center space-y-8 opacity-80">
          <p>
            As technology advances, the demand for <strong>no download unblocked games 2026 school chromebook</strong> compatible sites has skyrocketed. We specialize in delivering high-fidelity gaming experiences that require zero local storage, making them perfect for devices with limited capacity or restricted administrative rights.
          </p>
          <p>
            Our library is curated to ensure that every title—from fast-paced racing games like Moto X3M to rhythm-based challenges like Geometry Dash—runs at maximum frame rates. By utilizing advanced cloud-syncing and a lightweight frontend, we ensure that your gaming sessions are free from lag, allowing for total immersion even on basic school hardware.
          </p>
          <p>
            Safety and performance are our core values. Every game is hosted in a secure sandbox, ensuring your session remains private and protected. As we move closer to 2026, we are committed to updating our infrastructure to provide even more diverse and accessible content for students and workers globally. Bookmark <strong>nodownload2025.online</strong> to stay connected to the future of browser entertainment.
          </p>
        </div>
      </div>

      <AdBanner slotId="home-bottom-node" className="mt-24" />
    </div>
  );
};

const Footer: React.FC = () => (
  <footer className="bg-gray-950 border-t border-gray-900 py-24 mt-40">
    <div className="container mx-auto px-4 text-center">
      <div className="flex flex-wrap justify-center gap-16 mb-16 text-[11px] font-black uppercase tracking-[0.4em] text-gray-600">
        <Link to="/about" className="hover:text-indigo-400 transition-colors">Origins</Link>
        <Link to="/privacy" className="hover:text-indigo-400 transition-colors">Ethics</Link>
        <Link to="/contact" className="hover:text-indigo-400 transition-colors">Connect</Link>
      </div>
      <div className="max-w-xl mx-auto mb-16">
         <p className="text-[10px] text-gray-800 uppercase tracking-widest leading-loose font-black italic border-y border-gray-900 py-10">
           NODOWNLOAD2025.ONLINE - THE DEFINITIVE ARCADE STANDARD. ALL TRADEMARKS BELONG TO THEIR RESPECTIVE VISIONARIES. ZERO INSTALLATION. HIGH FIDELITY. GLOBAL ACCESS.
         </p>
      </div>
      <p className="text-gray-900 text-[11px] uppercase font-black tracking-[1em] select-none opacity-20">© 2025 UNBLOCKED GAMES ONLINE. NO DOWNLOAD REQUIRED.</p>
    </div>
  </footer>
);

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div className="min-h-screen flex flex-col bg-gray-950 text-white font-sans selection:bg-indigo-600/50 antialiased overflow-x-hidden">
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home searchTerm={searchTerm} />} />
          <Route path="/game/:id" element={<GamePlayer />} />
          <Route path="/about" element={<div className="container mx-auto px-4 py-48 text-center text-gray-800 font-black uppercase tracking-[1em] opacity-20">The Evolution of nodownload2025.online</div>} />
          <Route path="/privacy" element={<div className="container mx-auto px-4 py-48 text-center text-gray-800 font-black uppercase tracking-[1em] opacity-20">Secure Cloud Architecture 2026</div>} />
          <Route path="/contact" element={<div className="container mx-auto px-4 py-48 text-center text-gray-800 font-black uppercase tracking-[1em] opacity-20">Global Support Node Active</div>} />
        </Routes>
      </main>
      <Footer />
      <CookieConsent />
    </div>
  );
};

const CookieConsent: React.FC = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (!localStorage.getItem('cookies-accepted')) setShow(true);
  }, []);
  const accept = () => {
    localStorage.setItem('cookies-accepted', 'true');
    setShow(false);
  };
  if (!show) return null;
  return (
    <div className="fixed bottom-0 left-0 w-full bg-indigo-950/95 backdrop-blur-3xl p-10 flex flex-col md:flex-row items-center justify-between z-[100] border-t border-indigo-500/20 gap-10 shadow-3xl">
      <div className="flex items-center gap-8 text-center md:text-left">
        <Cookie className="w-12 h-12 text-indigo-400 shrink-0 hidden md:block" />
        <p className="text-xs text-indigo-100 font-black uppercase tracking-widest leading-loose max-w-2xl">
          WE UTILIZE PERFORMANCE-FOCUSED COOKIES TO MAINTAIN OUR GLOBAL INFRASTRUCTURE. BY PLAYING, YOU ACKNOWLEDGE OUR 2026 DATA ETHICS STANDARDS.
        </p>
      </div>
      <button onClick={accept} className="bg-white text-indigo-950 px-16 py-5 rounded-full text-[11px] font-black uppercase tracking-[0.3em] hover:bg-indigo-100 transition-all shadow-2xl active:scale-95 transform hover:scale-105">
        Accept & Sync
      </button>
    </div>
  );
};

export default App;