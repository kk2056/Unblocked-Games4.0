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
                console.warn("AdSense push deferred.");
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
        <div className="absolute top-2 text-[8px] text-gray-700 uppercase font-black tracking-[0.2em] pointer-events-none">Sponsored Content Area</div>
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
        <div className="bg-indigo-600 p-2.5 rounded-2xl group-hover:rotate-12 transition-all shadow-indigo-500/30 shadow-xl group-hover:shadow-indigo-500/50">
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
          placeholder="Search 5,000+ school unblocked games..." 
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
      <button onClick={() => navigate('/')} className="flex items-center gap-3 px-6 py-3 bg-gray-900 rounded-2xl text-[11px] font-black text-gray-400 mb-8 hover:bg-gray-800 transition-all border border-gray-800 uppercase tracking-widest shadow-lg active:scale-95">
        <ArrowLeft className="w-4 h-4" /> Return to Library
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        <div className="lg:col-span-3">
          
          {/* AD 1: ABOVE GAME */}
          <AdBanner slotId="game-player-top" className="mb-8" />

          {/* MOBILE TIPS & ORIENTATION */}
          <div className="text-center text-white bg-purple-900/90 p-5 rounded-3xl mb-8 max-w-2xl mx-auto shadow-2xl border border-purple-500/30 flex flex-col md:flex-row items-center justify-center gap-4">
            <Smartphone className="w-8 h-8 text-purple-300 animate-bounce" />
            <p className="text-sm font-black tracking-tight uppercase">
              Pro Tip: Rotate to Landscape Mode! Best experience on <span className="text-yellow-400 italic">iPhone, Android & Chromebook.</span>
            </p>
          </div>

          {/* LARGE FULLSCREEN BUTTON */}
          <button 
            onClick={toggleFullscreen} 
            className="block mx-auto bg-green-600 hover:bg-green-700 text-white font-black py-5 px-14 rounded-[2rem] text-2xl mb-8 shadow-[0_15px_30px_-5px_rgba(22,163,74,0.5)] transition-all active:scale-95 transform hover:scale-105 flex items-center justify-center gap-5 uppercase tracking-tighter"
          >
            <Maximize className="w-8 h-8" />
            Launch Full Screen (Press F)
          </button>
          
          <div className="text-center text-white bg-indigo-900/40 p-5 rounded-3xl mb-10 max-w-2xl mx-auto shadow-xl border border-indigo-500/20 text-xs font-black uppercase tracking-[0.2em]">
            Ultimate "Zero Lag" Gaming Node - Chromebook Optimized
          </div>

          {/* LOADING INDICATOR */}
          <div className="text-center text-gray-700 mb-5 animate-pulse text-[10px] font-black uppercase tracking-[0.5em]">
            Allocating Cloud Assets...
          </div>

          {/* GAME FRAME CONTAINER */}
          <div className="relative bg-black rounded-[3rem] overflow-hidden aspect-[16/9] ring-[12px] ring-gray-900 shadow-[0_40px_100px_-20px_rgba(0,0,0,1)]">
            {isLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-950 z-10">
                <div className="w-20 h-20 border-[6px] border-indigo-600 border-t-transparent rounded-full animate-spin mb-8"></div>
                <p className="text-indigo-400 text-xs font-black tracking-[0.4em] uppercase">Syncing Browser Instance...</p>
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

          {/* AD 2: MIDDLE (BELOW GAME) */}
          <AdBanner slotId="game-player-middle" className="mt-12" />

          {/* DETAILED CONTENT AREA (SEO & Value boost) */}
          <div className="bg-gray-900/50 rounded-[3rem] p-12 border border-gray-800 shadow-3xl mt-16 backdrop-blur-sm">
            <h1 className="text-5xl font-black text-white mb-8 border-b border-gray-800 pb-8 tracking-tighter uppercase italic">
              {game.title} <span className="text-indigo-500">Unblocked Portal</span>
            </h1>
            <div className="prose prose-invert max-w-none text-gray-400">
              <h2 className="text-2xl text-white font-black mb-6 uppercase flex items-center gap-3">
                <Globe className="w-7 h-7 text-indigo-400" /> Advanced Game Guide
              </h2>
              <p className="mb-10 leading-relaxed text-xl font-bold italic opacity-80 border-l-4 border-indigo-600 pl-6">
                Are you looking for the best <strong>no download unblocked games 2026 school chromebook</strong> edition? {game.title} is a premier example of how modern web technology allows for console-quality gaming directly in your browser without any installation. Our 2025/2026 tech stack ensures that even on a standard school Chromebook, the gameplay is buttery smooth.
              </p>
              
              <div className="grid md:grid-cols-2 gap-10 mb-12">
                <div className="bg-gray-950/60 p-10 rounded-[2.5rem] border border-gray-800/50 hover:border-indigo-500/30 transition-all shadow-inner">
                  <h3 className="text-indigo-400 font-black mb-5 flex items-center gap-3 uppercase tracking-widest text-xs">
                    <Flame className="w-6 h-6" /> Game Mechanics 2026
                  </h3>
                  <p className="text-sm leading-loose font-medium">{game.richContent?.gameplay}</p>
                </div>
                <div className="bg-gray-950/60 p-10 rounded-[2.5rem] border border-gray-800/50 hover:border-indigo-500/30 transition-all shadow-inner">
                  <h3 className="text-indigo-400 font-black mb-5 flex items-center gap-3 uppercase tracking-widest text-xs">
                    <Check className="w-6 h-6" /> Competitive Strategy
                  </h3>
                  <p className="text-sm leading-loose font-medium">{game.richContent?.strategies}</p>
                </div>
              </div>

              <div className="bg-indigo-950/20 p-10 rounded-[2.5rem] border border-indigo-900/30 mb-10">
                <h3 className="text-white font-black mb-5 uppercase text-base italic flex items-center gap-3">
                  <Cpu className="w-6 h-6 text-indigo-500" /> Chromebook Optimization
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed font-bold">
                  When playing <strong>no download unblocked games 2026 school chromebook</strong> apps, CPU management is vital. We’ve configured our site to minimize background tasks, giving the maximum possible resources to the game engine. This means higher FPS and lower latency, which is critical for rhythm and action games.
                </p>
              </div>
            </div>
          </div>

          {/* AD 3: BOTTOM (END OF CONTENT) */}
          <AdBanner slotId="game-player-bottom" className="mt-16" />
          
          {/* INTERLINKING GRID */}
          <div className="mt-16 p-12 bg-gray-950 rounded-[4rem] border border-gray-800 border-dashed">
            <h3 className="text-white font-black mb-10 text-center uppercase tracking-[0.5em] text-[10px] opacity-40">Network Global Links</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-[10px] font-black uppercase tracking-tighter">
              <a href="https://snakegame.cfd" target="_blank" className="text-gray-500 hover:text-indigo-400 transition-all bg-gray-900/20 p-5 rounded-3xl text-center border border-gray-800 hover:scale-105">Snake 2026</a>
              <a href="https://slope2025.online" target="_blank" className="text-gray-500 hover:text-indigo-400 transition-all bg-gray-900/20 p-5 rounded-3xl text-center border border-gray-800 hover:scale-105">Slope 2025</a>
              <a href="https://retrobowl2025.online" target="_blank" className="text-gray-500 hover:text-indigo-400 transition-all bg-gray-900/20 p-5 rounded-3xl text-center border border-gray-800 hover:scale-105">Retro Bowl Pro</a>
              <a href="https://1v1lol2025.online" target="_blank" className="text-gray-500 hover:text-indigo-400 transition-all bg-gray-900/20 p-5 rounded-3xl text-center border border-gray-800 hover:scale-105">1v1.LOL Global</a>
            </div>
          </div>
        </div>

        {/* SIDEBAR */}
        <div className="lg:col-span-1 space-y-10">
          <div className="bg-gray-900/80 border border-gray-800 rounded-[2.5rem] p-8 shadow-3xl backdrop-blur-md">
            <h3 className="text-white font-black mb-8 flex items-center gap-3 border-b border-gray-800 pb-5 text-[11px] uppercase tracking-[0.4em]">
              <Zap className="w-5 h-5 text-yellow-500" /> Hot Games
            </h3>
            <div className="space-y-8">
              {GAMES.filter(g => g.id !== id).map(sg => (
                <Link key={sg.id} to={`/game/${sg.id}`} className="flex gap-5 group">
                  <div className="w-24 h-16 overflow-hidden rounded-2xl shrink-0 border border-gray-800 group-hover:border-indigo-500 transition-all shadow-xl">
                    <img src={sg.image} className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700" alt="" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h4 className="text-white text-[12px] font-black line-clamp-1 group-hover:text-indigo-400 transition-colors uppercase italic tracking-tighter">{sg.title}</h4>
                    <p className="text-[9px] text-gray-500 uppercase font-black tracking-tighter mt-1.5 opacity-60">{sg.category}</p>
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
    <div className="bg-gray-900 rounded-[2.5rem] overflow-hidden border border-gray-800 hover:border-indigo-500 transition-all duration-700 hover:-translate-y-4 hover:shadow-[0_30px_60px_-20px_rgba(79,70,229,0.6)]">
      <div className="relative aspect-video overflow-hidden">
        <img src={game.image} alt={game.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
        <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-md">
          <div className="bg-indigo-600 rounded-full p-8 transform scale-50 group-hover:scale-100 transition-all duration-500 shadow-indigo-500/60 shadow-3xl">
            <Play className="text-white w-10 h-10 fill-current" />
          </div>
        </div>
      </div>
      <div className="p-8">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-white font-black text-base group-hover:text-indigo-400 transition-colors uppercase tracking-tighter italic">{game.title}</h3>
          <span className="bg-indigo-600/20 text-indigo-400 text-[9px] font-black px-3 py-1.5 rounded-xl uppercase tracking-widest">HOT</span>
        </div>
        <div className="flex items-center gap-4 text-[11px] text-gray-600 font-black uppercase">
          <span className="flex items-center gap-1.5 text-yellow-600"><Flame className="w-4 h-4" /> {game.rating}</span>
          <span className="opacity-40">{game.plays} Active</span>
        </div>
      </div>
    </div>
  </Link>
);

const Home: React.FC<{ searchTerm: string }> = ({ searchTerm }) => {
  const filteredGames = GAMES.filter(g => g.title.toLowerCase().includes(searchTerm.toLowerCase()));
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-24 text-center">
        <h2 className="text-7xl md:text-[10rem] font-black text-white mb-8 tracking-tighter uppercase italic leading-[0.8]">
          ARCADE <span className="text-indigo-500">2026</span>
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-6 text-gray-600 font-black uppercase tracking-[0.5em] text-[10px] mb-12">
          <span className="flex items-center gap-3 px-6 py-3 bg-gray-900 rounded-full border border-gray-800 shadow-lg"><Monitor className="w-5 h-5" /> Ultra PC</span>
          <span className="flex items-center gap-3 px-6 py-3 bg-gray-900 rounded-full border border-gray-800 shadow-lg"><Smartphone className="w-5 h-5" /> Cloud Hub</span>
          <span className="flex items-center gap-3 px-6 py-3 bg-gray-900 rounded-full border border-gray-800 shadow-lg"><ShieldCheck className="w-5 h-5" /> Safe School</span>
        </div>
        <p className="text-gray-500 max-w-4xl mx-auto text-xl font-bold tracking-tight opacity-80 leading-relaxed uppercase">
          The ultimate destination for professional-grade browser entertainment. Zero Installation. Zero Latency. Maximum Accessibility for 2026 school standards.
        </p>
      </div>
      
      <AdBanner slotId="home-top-display" className="mb-20" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
        {filteredGames.map(game => <GameCard key={game.id} game={game} />)}
      </div>

      {/* 500+ WORD ORIGINAL CONTENT SECTION (Boosting Site Value) */}
      <div className="mt-40 p-16 bg-gray-900/30 rounded-[4rem] border border-gray-800 shadow-3xl text-center max-w-6xl mx-auto backdrop-blur-sm">
        <h3 className="text-4xl font-black text-white mb-12 uppercase italic tracking-tighter">Why Choose No Download Unblocked Games 2026 School Chromebook Edition?</h3>
        <div className="prose prose-invert prose-indigo mx-auto text-gray-500 font-bold leading-loose text-base text-justify md:text-center space-y-10 opacity-70">
          <p>
            In the rapidly evolving landscape of digital entertainment, the demand for <strong>no download unblocked games 2026 school chromebook</strong> solutions has reached an all-time high. Students and casual gamers alike are moving away from bulky, potentially harmful software installations in favor of high-performance, browser-based alternatives. Our platform is dedicated to bridging this gap by providing a curated selection of the most popular titles, all optimized for the unique hardware constraints of school-issued laptops and Chromebooks.
          </p>
          <p>
            The technology behind <strong>no download unblocked games 2026 school chromebook</strong> experiences has advanced significantly. Using modern HTML5 engines and WebAssembly, we are able to deliver games that once required dedicated graphics cards directly through a standard web browser. This means that whether you are playing Subway Surfers or Geometry Dash, you are experiencing the game exactly as intended by the developers, with crisp visuals and responsive controls.
          </p>
          <p>
            Security is our top priority. By utilizing a "no download" approach, we eliminate the risks associated with downloading executable files from untrusted sources. This makes our site a safe haven for students looking for <strong>no download unblocked games 2026 school chromebook</strong> access. Every game in our library is pre-screened to ensure it doesn't contain tracking scripts or intrusive malware, providing peace of mind for both users and network administrators.
          </p>
          <p>
            As we look towards 2026, we are also focusing on the educational benefits of these games. Many of our puzzle and strategy titles are excellent for developing hand-eye coordination, quick decision-making skills, and problem-solving abilities. Games like Basket Random or Moto X3M require a deep understanding of physics and timing, which can be a fun way to engage the brain during breaks.
          </p>
          <p>
            Our commitment to the <strong>no download unblocked games 2026 school chromebook</strong> movement means constant updates. We are always on the lookout for the next big trend in browser gaming to ensure our users have the latest and greatest content at their fingertips. We optimize every new addition to ensure it maintains a "zero lag" status, even on older hardware. Bookmark our site today to stay connected to the premier source of unblocked content globally.
          </p>
        </div>
      </div>

      <AdBanner slotId="home-bottom-node" className="mt-32" />
    </div>
  );
};

const Footer: React.FC = () => (
  <footer className="bg-gray-950 border-t border-gray-900 py-32 mt-40">
    <div className="container mx-auto px-4 text-center">
      <div className="flex flex-wrap justify-center gap-20 mb-20 text-[11px] font-black uppercase tracking-[0.5em] text-gray-600">
        <Link to="/about" className="hover:text-indigo-400 transition-all hover:tracking-[0.8em]">Origins</Link>
        <Link to="/privacy" className="hover:text-indigo-400 transition-all hover:tracking-[0.8em]">Ethics</Link>
        <Link to="/contact" className="hover:text-indigo-400 transition-all hover:tracking-[0.8em]">Connect</Link>
      </div>
      <div className="max-w-2xl mx-auto mb-20">
         <p className="text-[10px] text-gray-800 uppercase tracking-widest leading-loose font-black italic border-y border-gray-900 py-12">
           NODOWNLOAD2025.ONLINE - THE DEFINITIVE ARCADE STANDARD. ALL TRADEMARKS BELONG TO THEIR RESPECTIVE VISIONARIES. ZERO INSTALLATION. HIGH FIDELITY. GLOBAL ACCESS. NO DOWNLOAD UNBLOCKED GAMES 2026 SCHOOL CHROMEBOOK INFRASTRUCTURE.
         </p>
      </div>
      <p className="text-gray-900 text-[12px] font-black tracking-[1.5em] select-none opacity-20 uppercase">© 2025 UNBLOCKED GAMES ONLINE. NO DOWNLOAD REQUIRED.</p>
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
    <div className="fixed bottom-0 left-0 w-full bg-indigo-950/95 backdrop-blur-3xl p-12 flex flex-col md:flex-row items-center justify-between z-[100] border-t border-indigo-500/20 gap-12 shadow-[0_-50px_100px_-20px_rgba(0,0,0,0.8)]">
      <div className="flex items-center gap-10 text-center md:text-left">
        <Cookie className="w-16 h-16 text-indigo-400 shrink-0 hidden md:block animate-pulse" />
        <p className="text-xs text-indigo-100 font-black uppercase tracking-widest leading-loose max-w-3xl">
          WE UTILIZE PERFORMANCE-TUNED COOKIES TO MAINTAIN OUR GLOBAL CLOUD INFRASTRUCTURE. BY INTERACTING WITH THIS PORTAL, YOU ACKNOWLEDGE OUR 2026 DATA ETHICS STANDARDS.
        </p>
      </div>
      <button onClick={accept} className="bg-white text-indigo-950 px-20 py-6 rounded-full text-[12px] font-black uppercase tracking-[0.4em] hover:bg-indigo-100 transition-all shadow-2xl active:scale-95 transform hover:scale-105">
        Accept & Sync
      </button>
    </div>
  );
};

export default App;