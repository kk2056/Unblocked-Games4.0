
import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
// Removed conflicting 'Home' import from lucide-react to resolve clash with local 'Home' component.
// Removed unused 'Info' import.
import { Gamepad2, Search, ArrowLeft, Shield, Flame, Star, Zap } from 'lucide-react';

// --- TYPES ---
interface Game {
  id: string;
  title: string;
  category: string;
  image: string;
  url: string;
  description: string;
}

declare global {
  interface window {
    adsbygoogle: any[];
  }
}

// --- DATA ---
const GAMES: Game[] = [
  {
    id: '1',
    title: 'Paper Minecraft',
    category: 'Simulation',
    image: 'https://uploads.scratch.mit.edu/get_image/project/10128431_480x360.png',
    url: 'https://scratch.mit.edu/projects/10128431/embed',
    description: 'A 2D version of the legendary sandbox game. Mine, build, and survive.'
  },
  {
    id: '2',
    title: 'Geometry Dash v1.5',
    category: 'Rhythm',
    image: 'https://uploads.scratch.mit.edu/get_image/project/105500895_480x360.png',
    url: 'https://scratch.mit.edu/projects/105500895/embed',
    description: 'Jump and fly your way through danger in this rhythm-based action platformer.'
  },
  {
    id: '3',
    title: 'Appel',
    category: 'Platformer',
    image: 'https://uploads.scratch.mit.edu/get_image/project/60917032_480x360.png',
    url: 'https://scratch.mit.edu/projects/60917032/embed',
    description: 'Navigate through complex levels in this fast-paced apple platformer.'
  },
  {
    id: '4',
    title: 'Pac-Man',
    category: 'Classic',
    image: 'https://uploads.scratch.mit.edu/get_image/project/16388708_480x360.png',
    url: 'https://scratch.mit.edu/projects/16388708/embed',
    description: 'Eat the dots and avoid the ghosts in this faithful recreation.'
  },
  {
    id: '5',
    title: 'Flappy Bird',
    category: 'Arcade',
    image: 'https://uploads.scratch.mit.edu/get_image/project/16807661_480x360.png',
    url: 'https://scratch.mit.edu/projects/16807661/embed',
    description: 'Tap to fly and dodge the pipes. How high can you score?'
  },
  {
    id: '6',
    title: 'Super Mario Bros',
    category: 'Platformer',
    image: 'https://uploads.scratch.mit.edu/get_image/project/322253723_480x360.png',
    url: 'https://scratch.mit.edu/projects/322253723/embed',
    description: 'The classic platformer experience right in your browser.'
  },
  {
    id: '7',
    title: 'Tetris',
    category: 'Puzzle',
    image: 'https://uploads.scratch.mit.edu/get_image/project/403816768_480x360.png',
    url: 'https://scratch.mit.edu/projects/403816768/embed',
    description: 'Stack the blocks and clear lines in the world\'s most famous puzzle game.'
  },
  {
    id: '8',
    title: 'Ninja',
    category: 'Action',
    image: 'https://uploads.scratch.mit.edu/get_image/project/14299496_480x360.png',
    url: 'https://scratch.mit.edu/projects/14299496/embed',
    description: 'Master the art of the ninja in this stealth action game.'
  },
  {
    id: '9',
    title: 'Basketball Physics',
    category: 'Sports',
    image: 'https://uploads.scratch.mit.edu/get_image/project/138987627_480x360.png',
    url: 'https://scratch.mit.edu/projects/138987627/embed',
    description: 'Wacky physics-based basketball fun for one or two players.'
  },
  {
    id: '10',
    title: 'Terraria',
    category: 'Adventure',
    image: 'https://uploads.scratch.mit.edu/get_image/project/322340626_480x360.png',
    url: 'https://scratch.mit.edu/projects/322340626/embed',
    description: 'Dig, fight, explore, build: The very world is at your fingertips.'
  },
  {
    id: '11',
    title: 'Slope',
    category: 'Arcade',
    image: 'https://uploads.scratch.mit.edu/get_image/project/27599025_480x360.png',
    url: 'https://scratch.mit.edu/projects/27599025/embed',
    description: 'Roll down the slope as fast as possible without falling off.'
  },
  {
    id: '12',
    title: 'Crossy Road',
    category: 'Arcade',
    image: 'https://uploads.scratch.mit.edu/get_image/project/51765161_480x360.png',
    url: 'https://scratch.mit.edu/projects/51765161/embed',
    description: 'Why did the chicken cross the road? Find out in this endless hopper.'
  }
];

// --- COMPONENTS ---

const AdBanner: React.FC = () => {
  useEffect(() => {
    try {
      // Check if script already exists to prevent duplicates
      if (!document.querySelector('script[src*="adsbygoogle.js"]')) {
        const script = document.createElement("script");
        script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9774042341049510";
        script.async = true;
        script.crossOrigin = "anonymous";
        document.head.appendChild(script);
      }
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, []);

  return (
    <div className="w-full h-24 bg-gray-800 my-6 flex items-center justify-center border border-gray-700 rounded overflow-hidden">
      <ins className="adsbygoogle"
           style={{ display: 'block', width: '100%', height: '100%' }}
           data-ad-client="ca-pub-9774042341049510"
           data-ad-slot="auto-generated-slot-id" 
           data-ad-format="auto"
           data-full-width-responsive="true"></ins>
      <span className="absolute text-xs text-gray-500 pointer-events-none">Advertisement</span>
    </div>
  );
};

const Header: React.FC<{ searchTerm: string; setSearchTerm: (s: string) => void }> = ({ searchTerm, setSearchTerm }) => {
  return (
    <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-indigo-600 p-2 rounded-lg group-hover:bg-indigo-500 transition-colors">
            <Gamepad2 className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            Unblocked Games 2025
          </span>
        </Link>
        
        <div className="relative w-full md:w-96">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-5 h-5 text-gray-400" />
          </div>
          <input 
            type="text"
            placeholder="Search 12,000+ games..."
            className="w-full bg-gray-800 text-white border border-gray-700 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-gray-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
    </header>
  );
};

const Footer: React.FC = () => (
  <footer className="bg-gray-950 border-t border-gray-800 py-8 mt-12">
    <div className="container mx-auto px-4 text-center">
      <div className="flex justify-center gap-6 mb-4">
        <Link to="/about" className="text-gray-400 hover:text-indigo-400 transition-colors text-sm">About Us</Link>
        <Link to="/privacy" className="text-gray-400 hover:text-indigo-400 transition-colors text-sm">Privacy Policy</Link>
        <Link to="/" className="text-gray-400 hover:text-indigo-400 transition-colors text-sm">Request Game</Link>
      </div>
      <p className="text-gray-600 text-xs">
        © 2025 Unblocked Games No Download. All rights reserved. 
        <br/>
        "Unblocked Games 2025" is a registered trademark.
      </p>
    </div>
  </footer>
);

const GameCard: React.FC<{ game: Game }> = ({ game }) => (
  <Link to={`/game/${game.id}`} className="block group">
    <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-indigo-500 transition-all duration-300 hover:shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:-translate-y-1 h-full flex flex-col">
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={game.image} 
          alt={game.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-white border border-white/10">
          {game.category}
        </div>
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="bg-indigo-600 rounded-full p-3 transform scale-0 group-hover:scale-100 transition-transform duration-300">
            <Zap className="w-6 h-6 text-white fill-current" />
          </div>
        </div>
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-lg font-bold text-white mb-1 group-hover:text-indigo-400 transition-colors truncate">{game.title}</h3>
        <p className="text-gray-400 text-sm line-clamp-2 mb-3 flex-1">{game.description}</p>
        <div className="flex items-center text-xs text-gray-500 gap-1 mt-auto">
          <Star className="w-3 h-3 text-yellow-500 fill-current" />
          <span>4.9/5</span>
          <span className="mx-1">•</span>
          <span>1.2M Plays</span>
        </div>
      </div>
    </div>
  </Link>
);

const Home: React.FC<{ searchTerm: string }> = ({ searchTerm }) => {
  const filteredGames = GAMES.filter(g => 
    g.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    g.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      {!searchTerm && (
        <div className="mb-10 text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 tracking-tight">
            Play Unblocked Games Instantly
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            No downloads. No restrictions. Just pure browser gaming bliss optimized for 2025.
          </p>
          <div className="flex justify-center gap-4 pt-2">
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 rounded-full border border-gray-700/50 text-sm text-gray-300">
              <Flame className="w-4 h-4 text-orange-500" /> Trending
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 rounded-full border border-gray-700/50 text-sm text-gray-300">
              <Zap className="w-4 h-4 text-yellow-400" /> New
            </div>
          </div>
        </div>
      )}

      <AdBanner />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredGames.length > 0 ? (
          filteredGames.map(game => <GameCard key={game.id} game={game} />)
        ) : (
          <div className="col-span-full text-center py-20">
            <p className="text-gray-500 text-xl">No games found matching "{searchTerm}"</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 text-indigo-400 hover:text-indigo-300 underline"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      <div className="mt-16 prose prose-invert max-w-none text-gray-400">
        <h2 className="text-2xl font-bold text-white mb-4">The Best Unblocked Games Site 2025</h2>
        <p className="mb-4">
          Welcome to the ultimate destination for unblocked games. We provide a curated selection of high-quality HTML5 and WebGL games that work on school Chromebooks, office networks, and home devices without any downloads or plugins.
        </p>
        <p>
          Our catalog is updated daily with the latest hits including io games, arcade classics, racing simulators, and puzzle challenges. Enjoy a seamless gaming experience with our optimized game player that ensures low latency and high frame rates.
        </p>
      </div>
    </div>
  );
};

const GamePlayer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const game = GAMES.find(g => g.id === id);

  useEffect(() => {
    // Scroll to top when entering game player
    window.scrollTo(0, 0);
  }, [id]);

  if (!game) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Game Not Found</h2>
        <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
          <ArrowLeft className="w-5 h-5" /> Return Home
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <button 
        onClick={() => navigate('/')} 
        className="flex items-center gap-2 text-gray-400 hover:text-white mb-4 transition-colors group"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> 
        Back to Games
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-black rounded-xl overflow-hidden shadow-2xl border border-gray-800 aspect-video relative">
             <iframe 
              src={game.url} 
              className="w-full h-full border-0"
              allowFullScreen
              allow="autoplay; gamepad; microphone; camera; gyroscope; accelerometer"
              title={game.title}
            />
          </div>

          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">{game.title}</h1>
              <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                <span className="bg-gray-800 px-2 py-1 rounded border border-gray-700">{game.category}</span>
                <span>•</span>
                <span>1,245,392 Plays</span>
              </div>
              <p className="text-gray-300 leading-relaxed">{game.description}</p>
            </div>
            <div className="flex gap-2">
              <button className="p-3 bg-gray-800 hover:bg-gray-700 rounded-lg text-white transition-colors" title="Report Bug">
                <Shield className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <AdBanner />
          
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h3 className="font-bold text-white mb-4 flex items-center gap-2">
              <Flame className="w-5 h-5 text-orange-500" />
              Recommended
            </h3>
            <div className="space-y-4">
              {GAMES.filter(g => g.id !== id).slice(0, 4).map(g => (
                <Link key={g.id} to={`/game/${g.id}`} className="flex gap-3 group">
                  <img src={g.image} alt={g.title} className="w-20 h-14 object-cover rounded bg-gray-800" />
                  <div>
                    <h4 className="text-white text-sm font-medium group-hover:text-indigo-400 transition-colors line-clamp-1">{g.title}</h4>
                    <p className="text-xs text-gray-500">{g.category}</p>
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

const StaticPage: React.FC<{ type: 'about' | 'privacy' }> = ({ type }) => (
  <div className="container mx-auto px-4 py-12 max-w-3xl">
    <div className="bg-gray-900 rounded-2xl p-8 md:p-12 border border-gray-800">
      <h1 className="text-3xl font-bold text-white mb-8 capitalize">{type === 'about' ? 'About Us' : 'Privacy Policy'}</h1>
      <div className="prose prose-invert prose-indigo max-w-none">
        {type === 'about' ? (
          <>
            <p>Welcome to <strong>Unblocked Games 2025</strong>, the premier destination for seamless browser gaming. Our mission is simple: provide instant access to high-quality games without the hassle of downloads, logins, or paywalls.</p>
            <p>Founded by a team of gaming enthusiasts and web engineers, we've built a platform that optimizes performance for all devices, from high-end gaming rigs to school Chromebooks.</p>
            <h3>Why Choose Us?</h3>
            <ul>
              <li><strong>Zero Installs:</strong> Play directly in your browser.</li>
              <li><strong>School Friendly:</strong> Optimized to work on restricted networks.</li>
              <li><strong>Safe & Secure:</strong> All games are vetted for safety and quality.</li>
            </ul>
          </>
        ) : (
          <>
            <p>Last updated: January 2025</p>
            <p>We respect your privacy and are committed to protecting it through our compliance with this policy.</p>
            <h3>Information We Collect</h3>
            <p>We do not collect personal information (like names or emails) unless you voluntarily provide it. We may automatically collect non-personal information such as browser type, operating system, and IP address for analytics purposes.</p>
            <h3>Cookies and Tracking</h3>
            <p>We use cookies to improve your experience and analyze site traffic. Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to your website or other websites.</p>
            <h3>Third-Party Links</h3>
            <p>Our site contains links to other websites (game providers). We are not responsible for the privacy practices of these other sites.</p>
          </>
        )}
      </div>
    </div>
  </div>
);

// --- APP ---

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#111827] text-white">
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home searchTerm={searchTerm} />} />
          <Route path="/game/:id" element={<GamePlayer />} />
          <Route path="/about" element={<StaticPage type="about" />} />
          <Route path="/privacy" element={<StaticPage type="privacy" />} />
          <Route path="*" element={
            <div className="flex flex-col items-center justify-center h-96">
              <h1 className="text-4xl font-bold text-gray-700 mb-4">404</h1>
              <p className="text-gray-500">Page not found</p>
              <Link to="/" className="mt-4 text-indigo-400 hover:underline">Go Home</Link>
            </div>
          } />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default App;
