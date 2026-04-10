import { useState, useEffect, useRef } from "react";
import FoodRadar from "@/components/FoodRadar";
import SingaporeMap from "@/components/SingaporeMap";

const rollingWords = ["Blogged", "Talked", "Posted"];

function RollingWord() {
  const [index, setIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setExiting(true);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % rollingWords.length);
        setExiting(false);
        setAnimating(true);
        setTimeout(() => setAnimating(false), 400);
      }, 300);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <span
      className="inline-block overflow-hidden relative"
      style={{ minWidth: "140px", verticalAlign: "bottom" }}
      data-testid="rolling-word-container"
    >
      <span
        className="inline-block transition-all duration-300"
        style={{
          color: "hsl(25, 95%, 53%)",
          transform: exiting ? "translateY(-100%)" : animating ? "translateY(0%)" : "translateY(0%)",
          opacity: exiting ? 0 : 1,
        }}
        data-testid="rolling-word"
      >
        {rollingWords[index]}
      </span>
    </span>
  );
}

const howItWorks = [
  {
    icon: "📍",
    title: "Drop a Pin",
    desc: "Tell us where you are — a neighbourhood, MRT stop, or postal code.",
  },
  {
    icon: "🔍",
    title: "We Scan the Web",
    desc: "FoodRadar sweeps blogs, social media, and food communities near you.",
  },
  {
    icon: "🍜",
    title: "Discover Local Gems",
    desc: "Get ranked results based on real buzz — not paid ads or algorithms.",
  },
];

const featureCards = [
  {
    icon: "🗺️",
    title: "Hyper-Local Discovery",
    desc: "Results filtered by your exact neighbourhood, not just the whole city.",
  },
  {
    icon: "📝",
    title: "Blog-Sourced Reviews",
    desc: "Real food bloggers, not anonymous reviewers with 1 review ever written.",
  },
  {
    icon: "📱",
    title: "Social Pulse",
    desc: "See what's trending on Instagram, TikTok, and Twitter right near you.",
  },
  {
    icon: "🏆",
    title: "Community-Ranked",
    desc: "Ranked by genuine online chatter, not sponsored placements.",
  },
];

export default function LandingPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-md border-b border-border/30 bg-background/70">
        <span
          className="font-display font-bold text-xl tracking-tight"
          style={{ color: "hsl(25, 95%, 53%)" }}
          data-testid="nav-logo"
        >
          FoodRadar
        </span>
        <div className="flex items-center gap-3">
          <a
            href="#how-it-works"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden sm:block"
            data-testid="nav-how-it-works"
          >
            How It Works
          </a>
          <button
            className="text-sm px-4 py-2 rounded-full font-medium transition-all hover:scale-105 active:scale-95"
            style={{
              background: "hsl(25, 95%, 53%)",
              color: "hsl(20, 14%, 6%)",
            }}
            data-testid="button-get-started-nav"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 overflow-hidden"
        data-testid="hero-section"
      >
        {/* Background glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(234,130,34,0.12) 0%, rgba(234,130,34,0.04) 50%, transparent 70%)",
          }}
        />

        <div
          className="relative z-10 text-center max-w-4xl mx-auto"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-8 border"
            style={{
              background: "rgba(234,130,34,0.1)",
              borderColor: "rgba(234,130,34,0.3)",
              color: "hsl(25, 95%, 60%)",
            }}
            data-testid="badge-singapore"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
            Singapore's Food Discovery Radar
          </div>

          {/* Big title */}
          <h1
            className="font-display font-black leading-none tracking-tight mb-6"
            style={{ fontSize: "clamp(4rem, 12vw, 9rem)" }}
            data-testid="hero-title"
          >
            <span
              style={{
                background: "linear-gradient(135deg, hsl(25, 95%, 65%) 0%, hsl(25, 95%, 45%) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Food
            </span>
            <span className="text-foreground">Radar</span>
          </h1>

          {/* Subtitle with rolling word */}
          <p
            className="text-xl sm:text-2xl md:text-3xl font-medium text-muted-foreground leading-snug mb-4"
            data-testid="hero-subtitle"
          >
            Find what's{" "}
            <RollingWord /> about
            <br className="hidden sm:block" />
            <span className="text-foreground"> near you</span>
          </p>

          <p
            className="text-base text-muted-foreground max-w-xl mx-auto mb-10"
            data-testid="hero-description"
          >
            FoodRadar scans Singapore's food blogs, social media, and community
            posts to surface the most talked-about hawker stalls, cafes, and
            restaurants in your exact neighbourhood.
          </p>

          {/* Search bar */}
          <div className="flex flex-col sm:flex-row items-center gap-3 max-w-lg mx-auto mb-12">
            <div className="relative flex-1 w-full">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                📍
              </span>
              <input
                type="text"
                placeholder="Enter MRT, neighbourhood or postal code..."
                className="w-full pl-9 pr-4 py-3.5 rounded-xl text-sm border transition-all focus:outline-none focus:ring-2"
                style={{
                  background: "hsl(20, 12%, 11%)",
                  borderColor: "hsl(25, 15%, 22%)",
                  color: "hsl(35, 30%, 92%)",
                }}
                data-testid="input-location-search"
              />
            </div>
            <button
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-semibold text-sm transition-all hover:scale-105 active:scale-95 whitespace-nowrap animate-glow"
              style={{
                background: "hsl(25, 95%, 53%)",
                color: "hsl(20, 14%, 6%)",
              }}
              data-testid="button-radar-search"
            >
              Radar Search
            </button>
          </div>

          {/* Trending tags */}
          <div className="flex flex-wrap items-center justify-center gap-2" data-testid="trending-tags">
            <span className="text-xs text-muted-foreground">Trending now:</span>
            {["Tiong Bahru Market", "Maxwell Food Centre", "Lau Pa Sat", "Chinatown Complex", "Old Airport Road"].map(
              (tag) => (
                <button
                  key={tag}
                  className="text-xs px-3 py-1 rounded-full border transition-all hover:border-orange-500/50 hover:text-orange-400"
                  style={{
                    borderColor: "hsl(25, 15%, 22%)",
                    color: "hsl(30, 15%, 60%)",
                  }}
                  data-testid={`tag-${tag.replace(/\s+/g, "-").toLowerCase()}`}
                >
                  {tag}
                </button>
              )
            )}
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-40">
          <span className="text-xs text-muted-foreground">Scroll to explore</span>
          <div className="w-0.5 h-6 bg-muted-foreground/40 rounded-full" />
        </div>
      </section>

      {/* RADAR SECTION */}
      <section
        className="relative py-24 px-6 overflow-hidden"
        data-testid="radar-section"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className="font-display font-bold text-3xl sm:text-4xl mb-4"
              data-testid="radar-section-title"
            >
              Food Buzz,{" "}
              <span style={{ color: "hsl(25, 95%, 53%)" }}>Visualised</span>
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Watch the radar sweep your neighbourhood for the most talked-about
              dishes and eateries in real time.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
            <FoodRadar />

            {/* Blip legend */}
            <div className="flex flex-col gap-4 max-w-xs" data-testid="radar-legend">
              <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">
                Detected near Tanjong Pagar
              </h3>
              {[
                { icon: "🍜", name: "Ah Heng Chicken Rice", mentions: 342, category: "Hawker" },
                { icon: "☕", name: "Nylon Coffee Roasters", mentions: 218, category: "Cafe" },
                { icon: "🍢", name: "Satay by the Bay", mentions: 189, category: "Hawker" },
                { icon: "🫕", name: "Burnt Ends", mentions: 156, category: "Restaurant" },
                { icon: "🥮", name: "Tong Heng Pastry", mentions: 134, category: "Bakery" },
              ].map((item, i) => (
                <div
                  key={item.name}
                  className="flex items-center gap-3 p-3 rounded-xl border transition-all hover:border-orange-500/40 cursor-pointer"
                  style={{
                    background: "hsl(20, 12%, 9%)",
                    borderColor: "hsl(25, 12%, 16%)",
                    animationDelay: `${i * 0.1}s`,
                  }}
                  data-testid={`radar-result-${i}`}
                >
                  <span className="text-2xl">{item.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold" style={{ color: "hsl(25, 95%, 53%)" }}>
                      {item.mentions}
                    </p>
                    <p className="text-xs text-muted-foreground">mentions</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MAP SECTION */}
      <section
        className="relative py-24 px-6 overflow-hidden"
        data-testid="map-section"
        style={{ background: "hsl(20, 12%, 8%)" }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className="font-display font-bold text-3xl sm:text-4xl mb-4"
              data-testid="map-section-title"
            >
              Explore by{" "}
              <span style={{ color: "hsl(25, 95%, 53%)" }}>Location</span>
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Tap any food court or hawker centre on the map to see what's being
              blogged, posted, and talked about right now.
            </p>
          </div>
          <SingaporeMap />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        id="how-it-works"
        className="py-24 px-6"
        data-testid="how-it-works-section"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className="font-display font-bold text-3xl sm:text-4xl mb-4"
              data-testid="how-it-works-title"
            >
              How FoodRadar Works
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Three simple steps from craving to eating.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map((step, i) => (
              <div
                key={step.title}
                className="relative flex flex-col items-center text-center p-8 rounded-2xl border transition-all hover:-translate-y-1"
                style={{
                  background: "hsl(20, 12%, 9%)",
                  borderColor: "hsl(25, 12%, 16%)",
                }}
                data-testid={`step-${i + 1}`}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-6"
                  style={{ background: "rgba(234,130,34,0.12)" }}
                >
                  {step.icon}
                </div>
                <div
                  className="absolute top-6 right-6 text-4xl font-black font-display opacity-10"
                  style={{ color: "hsl(25, 95%, 53%)" }}
                >
                  {i + 1}
                </div>
                <h3 className="font-display font-semibold text-lg mb-3">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section
        className="py-24 px-6"
        style={{ background: "hsl(20, 12%, 8%)" }}
        data-testid="features-section"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className="font-display font-bold text-3xl sm:text-4xl mb-4"
              data-testid="features-title"
            >
              Why FoodRadar?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {featureCards.map((f, i) => (
              <div
                key={f.title}
                className="flex gap-4 p-6 rounded-2xl border transition-all hover:border-orange-500/30"
                style={{
                  background: "hsl(20, 12%, 9%)",
                  borderColor: "hsl(25, 12%, 16%)",
                }}
                data-testid={`feature-card-${i}`}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0"
                  style={{ background: "rgba(234,130,34,0.1)" }}
                >
                  {f.icon}
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-24 px-6"
        data-testid="cta-section"
      >
        <div className="max-w-2xl mx-auto text-center">
          <h2
            className="font-display font-black text-4xl sm:text-5xl mb-6 leading-tight"
            data-testid="cta-title"
          >
            Ready to find your next{" "}
            <span style={{ color: "hsl(25, 95%, 53%)" }}>favourite makan?</span>
          </h2>
          <p className="text-muted-foreground mb-10 text-lg">
            Join thousands of Singaporeans discovering hidden gems in their neighbourhood.
          </p>
          <button
            className="px-10 py-4 rounded-full font-bold text-lg transition-all hover:scale-105 active:scale-95 animate-glow"
            style={{
              background: "hsl(25, 95%, 53%)",
              color: "hsl(20, 14%, 6%)",
            }}
            data-testid="button-start-radar"
          >
            Start Your Radar
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="py-10 px-6 border-t text-center"
        style={{ borderColor: "hsl(25, 15%, 16%)" }}
        data-testid="footer"
      >
        <p className="text-muted-foreground text-sm">
          <span style={{ color: "hsl(25, 95%, 53%)" }} className="font-display font-bold">
            FoodRadar
          </span>{" "}
          — Discover Singapore's food scene through the power of local chatter. 🇸🇬
        </p>
      </footer>
    </div>
  );
}
