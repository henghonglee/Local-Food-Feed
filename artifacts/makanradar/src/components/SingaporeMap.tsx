import { useState } from "react";

interface FoodCourt {
  id: string;
  name: string;
  area: string;
  x: number;
  y: number;
  posts: number;
  topDish: string;
  icon: string;
}

const foodCourts: FoodCourt[] = [
  { id: "tiong-bahru", name: "Tiong Bahru Market", area: "Tiong Bahru", x: 28, y: 52, posts: 1240, topDish: "Pork Liver Congee", icon: "🍲" },
  { id: "maxwell", name: "Maxwell Food Centre", area: "Chinatown", x: 42, y: 58, posts: 2180, topDish: "Tian Tian Chicken Rice", icon: "🍗" },
  { id: "lau-pa-sat", name: "Lau Pa Sat", area: "CBD", x: 52, y: 55, posts: 1650, topDish: "Satay", icon: "🍢" },
  { id: "old-airport", name: "Old Airport Road FC", area: "Mountbatten", x: 68, y: 45, posts: 980, topDish: "Hokkien Mee", icon: "🍜" },
  { id: "chinatown-complex", name: "Chinatown Complex", area: "Chinatown", x: 38, y: 60, posts: 1420, topDish: "Braised Duck Rice", icon: "🍱" },
  { id: "newton", name: "Newton Food Centre", area: "Novena", x: 40, y: 32, posts: 890, topDish: "BBQ Stingray", icon: "🐟" },
  { id: "bedok-interchange", name: "Bedok Interchange", area: "Bedok", x: 82, y: 50, posts: 760, topDish: "Carrot Cake", icon: "🥕" },
  { id: "tekka", name: "Tekka Centre", area: "Little India", x: 37, y: 28, posts: 1100, topDish: "Roti Prata", icon: "🧆" },
  { id: "amoy-street", name: "Amoy Street FC", area: "Tanjong Pagar", x: 50, y: 60, posts: 1380, topDish: "Economy Rice", icon: "🍛" },
  { id: "clementi", name: "Clementi Food Centre", area: "Clementi", x: 15, y: 50, posts: 620, topDish: "Lor Mee", icon: "🥣" },
];

function getBubbleSize(posts: number): number {
  const min = 620, max = 2180;
  const normalised = (posts - min) / (max - min);
  return 14 + normalised * 20;
}

export default function SingaporeMap() {
  const [selected, setSelected] = useState<FoodCourt | null>(foodCourts[1]);
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start" data-testid="singapore-map">
      {/* Map container */}
      <div
        className="relative w-full lg:flex-1 rounded-2xl border overflow-hidden"
        style={{
          aspectRatio: "16/9",
          background: "hsl(20, 12%, 7%)",
          borderColor: "hsl(25, 12%, 16%)",
        }}
      >
        {/* Map grid pattern */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(234,130,34,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(234,130,34,0.04) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Singapore outline (simplified SVG paths) */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 75"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Singapore island outline (simplified) */}
          <path
            d="M 8 40 C 8 35 12 28 20 25 C 28 22 38 20 50 20 C 62 20 72 22 80 26 C 88 30 92 35 92 40 C 92 50 88 60 78 65 C 68 70 55 72 45 70 C 35 68 22 64 14 58 C 9 54 8 47 8 40 Z"
            fill="none"
            stroke="rgba(234,130,34,0.15)"
            strokeWidth="0.8"
          />

          {/* Sentosa island */}
          <path
            d="M 30 70 C 30 68 33 67 37 67 C 41 67 44 68 44 70 C 44 72 41 73 37 73 C 33 73 30 72 30 70 Z"
            fill="none"
            stroke="rgba(234,130,34,0.1)"
            strokeWidth="0.5"
          />

          {/* Major roads/expressways (simplified) */}
          <path d="M 20 40 L 80 40" stroke="rgba(234,130,34,0.06)" strokeWidth="0.5" />
          <path d="M 50 22 L 50 70" stroke="rgba(234,130,34,0.06)" strokeWidth="0.5" />
          <path d="M 25 30 L 75 55" stroke="rgba(234,130,34,0.04)" strokeWidth="0.4" />

          {/* Water body labels */}
          <text x="12" y="56" fontSize="2.5" fill="rgba(234,130,34,0.2)" fontFamily="monospace">STRAIT OF SINGAPORE</text>
          <text x="50" y="16" fontSize="2.5" fill="rgba(234,130,34,0.2)" fontFamily="monospace" textAnchor="middle">JOHOR BAHRU</text>

          {/* Compass */}
          <g transform="translate(90, 8)">
            <circle r="4" fill="rgba(20,14,8,0.8)" stroke="rgba(234,130,34,0.3)" strokeWidth="0.5" />
            <text x="0" y="1.5" textAnchor="middle" fontSize="3" fill="rgba(234,130,34,0.6)" fontFamily="monospace">N</text>
          </g>

          {/* Food court blips */}
          {foodCourts.map((fc) => {
            const isSelected = selected?.id === fc.id;
            const isHovered = hovered === fc.id;
            const r = getBubbleSize(fc.posts) / 7;

            return (
              <g
                key={fc.id}
                transform={`translate(${fc.x}, ${fc.y})`}
                onClick={() => setSelected(fc)}
                onMouseEnter={() => setHovered(fc.id)}
                onMouseLeave={() => setHovered(null)}
                style={{ cursor: "pointer" }}
                data-testid={`map-blip-${fc.id}`}
              >
                {/* Pulse ring */}
                {isSelected && (
                  <circle
                    r={r + 4}
                    fill="none"
                    stroke="rgba(234,130,34,0.3)"
                    strokeWidth="0.8"
                    style={{
                      animation: "radar-ping 2s ease-out infinite",
                    }}
                  />
                )}
                {/* Main dot */}
                <circle
                  r={r}
                  fill={
                    isSelected
                      ? "rgba(234,130,34,0.85)"
                      : isHovered
                      ? "rgba(234,130,34,0.5)"
                      : "rgba(234,130,34,0.3)"
                  }
                  stroke={isSelected ? "rgba(234,130,34,1)" : "rgba(234,130,34,0.5)"}
                  strokeWidth="0.5"
                  style={{ transition: "all 0.2s ease" }}
                />
                {/* Emoji icon */}
                <text
                  x="0"
                  y="1"
                  textAnchor="middle"
                  fontSize={r * 0.95}
                  style={{ userSelect: "none", pointerEvents: "none" }}
                >
                  {fc.icon}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Legend */}
        <div
          className="absolute bottom-3 left-3 text-xs rounded-lg p-2 border"
          style={{
            background: "rgba(20,14,8,0.85)",
            borderColor: "hsl(25, 12%, 20%)",
            color: "hsl(30, 15%, 60%)",
            backdropFilter: "blur(4px)",
          }}
        >
          <p className="font-medium mb-1" style={{ color: "hsl(35, 30%, 85%)" }}>Bubble size = post volume</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ background: "rgba(234,130,34,0.3)" }} />
            <span>Less buzz</span>
            <div className="w-4 h-4 rounded-full" style={{ background: "rgba(234,130,34,0.8)" }} />
            <span>More buzz</span>
          </div>
        </div>
      </div>

      {/* Info panel */}
      <div className="w-full lg:w-72 shrink-0">
        {selected ? (
          <div
            className="rounded-2xl border p-6 transition-all"
            style={{
              background: "hsl(20, 12%, 9%)",
              borderColor: "rgba(234,130,34,0.3)",
            }}
            data-testid="map-info-panel"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">{selected.icon}</span>
              <div>
                <h3 className="font-display font-bold text-base leading-tight">{selected.name}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{selected.area}</p>
              </div>
            </div>

            <div className="flex items-baseline gap-1 mb-1">
              <span
                className="text-3xl font-black font-display"
                style={{ color: "hsl(25, 95%, 53%)" }}
              >
                {selected.posts.toLocaleString()}
              </span>
              <span className="text-sm text-muted-foreground">online mentions</span>
            </div>

            <div
              className="w-full rounded-full h-1.5 mb-5 overflow-hidden"
              style={{ background: "hsl(25, 15%, 18%)" }}
            >
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${(selected.posts / 2180) * 100}%`,
                  background: "linear-gradient(90deg, hsl(25,95%,53%), hsl(35,90%,60%))",
                }}
              />
            </div>

            <div className="space-y-3">
              <div
                className="flex items-center gap-2 p-3 rounded-xl"
                style={{ background: "rgba(234,130,34,0.08)" }}
              >
                <span className="text-base">{selected.icon}</span>
                <div>
                  <p className="text-xs text-muted-foreground">Most talked-about dish</p>
                  <p className="text-sm font-semibold">{selected.topDish}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {(["Blogs", "Instagram", "Reddit"] as const).map((platform) => (
                  <div
                    key={platform}
                    className="flex flex-col items-center p-2 rounded-lg"
                    style={{ background: "hsl(20, 12%, 11%)" }}
                  >
                    <span className="text-xs font-medium" style={{ color: "hsl(25, 95%, 53%)" }}>
                      {Math.floor(selected.posts * (platform === "Blogs" ? 0.25 : platform === "Instagram" ? 0.45 : 0.3))}
                    </span>
                    <span className="text-xs text-muted-foreground">{platform}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              className="w-full mt-4 py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
              style={{
                background: "hsl(25, 95%, 53%)",
                color: "hsl(20, 14%, 6%)",
              }}
              data-testid="button-explore-location"
            >
              Explore {selected.area}
            </button>
          </div>
        ) : (
          <div
            className="rounded-2xl border p-6 text-center"
            style={{
              background: "hsl(20, 12%, 9%)",
              borderColor: "hsl(25, 12%, 16%)",
            }}
            data-testid="map-info-empty"
          >
            <span className="text-4xl mb-3 block">📍</span>
            <p className="text-sm text-muted-foreground">
              Tap any bubble on the map to see food buzz details for that location.
            </p>
          </div>
        )}

        {/* Location list */}
        <div className="mt-4 space-y-2">
          {foodCourts
            .sort((a, b) => b.posts - a.posts)
            .slice(0, 5)
            .map((fc, i) => (
              <button
                key={fc.id}
                onClick={() => setSelected(fc)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border text-left transition-all hover:border-orange-500/40"
                style={{
                  background: selected?.id === fc.id ? "rgba(234,130,34,0.1)" : "hsl(20, 12%, 9%)",
                  borderColor: selected?.id === fc.id ? "rgba(234,130,34,0.4)" : "hsl(25, 12%, 16%)",
                }}
                data-testid={`map-list-item-${fc.id}`}
              >
                <span className="text-muted-foreground text-xs w-4">{i + 1}</span>
                <span className="text-base">{fc.icon}</span>
                <span className="text-sm font-medium flex-1 truncate">{fc.name}</span>
                <span className="text-xs" style={{ color: "hsl(25, 95%, 53%)" }}>
                  {fc.posts.toLocaleString()}
                </span>
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}
