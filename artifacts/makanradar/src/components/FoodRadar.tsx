import { useState, useEffect, useRef } from "react";

const foodBlips = [
  { icon: "🍜", label: "Bak Chor Mee", angle: 30, radius: 0.35, delay: 0 },
  { icon: "🍛", label: "Nasi Lemak", angle: 80, radius: 0.6, delay: 0.4 },
  { icon: "🦀", label: "Chilli Crab", angle: 140, radius: 0.45, delay: 0.8 },
  { icon: "🍢", label: "Satay", angle: 200, radius: 0.7, delay: 1.2 },
  { icon: "🥟", label: "Dim Sum", angle: 260, radius: 0.4, delay: 0.6 },
  { icon: "🍱", label: "Chicken Rice", angle: 310, radius: 0.65, delay: 1.0 },
  { icon: "🧆", label: "Roti Prata", angle: 170, radius: 0.28, delay: 1.4 },
  { icon: "☕", label: "Kopi", angle: 45, radius: 0.75, delay: 0.2 },
  { icon: "🍮", label: "Kaya Toast", angle: 350, radius: 0.5, delay: 1.6 },
];

export default function FoodRadar() {
  const size = 340;
  const center = size / 2;
  const [sweepAngle, setSweepAngle] = useState(0);
  const [litBlips, setLitBlips] = useState<Set<number>>(new Set());
  const animRef = useRef<number>();
  const lastTimeRef = useRef<number>(0);

  useEffect(() => {
    let startTime: number;

    const animate = (time: number) => {
      if (!startTime) startTime = time;
      const elapsed = time - startTime;
      const angle = (elapsed / 4000) * 360;
      setSweepAngle(angle % 360);

      const newLit = new Set<number>();
      foodBlips.forEach((blip, idx) => {
        const blipAngle = blip.angle;
        const sweep = angle % 360;
        const diff = ((sweep - blipAngle + 360) % 360);
        if (diff < 60) {
          newLit.add(idx);
        }
      });
      setLitBlips(newLit);

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  const getBlipPos = (angle: number, radius: number) => {
    const rad = ((angle - 90) * Math.PI) / 180;
    const r = radius * (center - 20);
    return {
      x: center + r * Math.cos(rad),
      y: center + r * Math.sin(rad),
    };
  };

  return (
    <div className="relative flex items-center justify-center" data-testid="food-radar">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="relative"
        style={{ filter: "drop-shadow(0 0 30px rgba(234,130,34,0.15))" }}
      >
        {/* Background circle */}
        <circle
          cx={center}
          cy={center}
          r={center - 2}
          fill="hsl(20, 14%, 6%)"
          stroke="hsl(25, 15%, 22%)"
          strokeWidth="1.5"
        />

        {/* Grid rings */}
        {[0.25, 0.5, 0.75, 1].map((r) => (
          <circle
            key={r}
            cx={center}
            cy={center}
            r={(center - 20) * r}
            fill="none"
            stroke="rgba(234,130,34,0.1)"
            strokeWidth="1"
          />
        ))}

        {/* Cross hairs */}
        <line x1={center} y1={20} x2={center} y2={size - 20} stroke="rgba(234,130,34,0.1)" strokeWidth="1" />
        <line x1={20} y1={center} x2={size - 20} y2={center} stroke="rgba(234,130,34,0.1)" strokeWidth="1" />
        <line
          x1={center + Math.cos(-45 * Math.PI / 180) * (center - 20)}
          y1={center + Math.sin(-45 * Math.PI / 180) * (center - 20)}
          x2={center - Math.cos(-45 * Math.PI / 180) * (center - 20)}
          y2={center - Math.sin(-45 * Math.PI / 180) * (center - 20)}
          stroke="rgba(234,130,34,0.06)"
          strokeWidth="1"
        />
        <line
          x1={center + Math.cos(45 * Math.PI / 180) * (center - 20)}
          y1={center + Math.sin(45 * Math.PI / 180) * (center - 20)}
          x2={center - Math.cos(45 * Math.PI / 180) * (center - 20)}
          y2={center - Math.sin(45 * Math.PI / 180) * (center - 20)}
          stroke="rgba(234,130,34,0.06)"
          strokeWidth="1"
        />

        {/* Radar sweep using a gradient approach */}
        <g
          transform={`rotate(${sweepAngle}, ${center}, ${center})`}
        >
          {/* Sweep cone */}
          <path
            d={`M ${center} ${center} L ${center} ${20} A ${center - 20} ${center - 20} 0 0 1 ${
              center + Math.sin(60 * Math.PI / 180) * (center - 20)
            } ${center - Math.cos(60 * Math.PI / 180) * (center - 20)} Z`}
            fill="url(#sweepGrad)"
            opacity="0.6"
          />
          {/* Sweep line */}
          <line
            x1={center}
            y1={center}
            x2={center}
            y2={20}
            stroke="hsl(25, 95%, 53%)"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.9"
          />
        </g>

        <defs>
          <radialGradient id="sweepGrad" cx="50%" cy="0%" r="100%">
            <stop offset="0%" stopColor="hsl(25, 95%, 53%)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="hsl(25, 95%, 53%)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Center dot */}
        <circle cx={center} cy={center} r="4" fill="hsl(25, 95%, 53%)" />
        <circle cx={center} cy={center} r="8" fill="none" stroke="hsl(25, 95%, 53%)" strokeWidth="1" opacity="0.4" />

        {/* Food blips */}
        {foodBlips.map((blip, idx) => {
          const pos = getBlipPos(blip.angle, blip.radius);
          const isLit = litBlips.has(idx);
          return (
            <g key={idx} data-testid={`blip-${idx}`}>
              {isLit && (
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r="16"
                  fill="rgba(234,130,34,0.2)"
                  style={{
                    animation: "radar-ping 0.8s ease-out"
                  }}
                />
              )}
              <circle
                cx={pos.x}
                cy={pos.y}
                r="14"
                fill={isLit ? "rgba(234,130,34,0.15)" : "rgba(30,24,20,0.9)"}
                stroke={isLit ? "rgba(234,130,34,0.6)" : "rgba(234,130,34,0.2)"}
                strokeWidth="1"
                style={{ transition: "all 0.3s ease" }}
              />
              <text
                x={pos.x}
                y={pos.y + 5}
                textAnchor="middle"
                fontSize="14"
                style={{ userSelect: "none" }}
              >
                {blip.icon}
              </text>
            </g>
          );
        })}

        {/* Cardinal labels */}
        <text x={center} y={14} textAnchor="middle" fontSize="10" fill="rgba(234,130,34,0.5)" fontFamily="monospace">N</text>
        <text x={size - 8} y={center + 4} textAnchor="middle" fontSize="10" fill="rgba(234,130,34,0.5)" fontFamily="monospace">E</text>
        <text x={center} y={size - 6} textAnchor="middle" fontSize="10" fill="rgba(234,130,34,0.5)" fontFamily="monospace">S</text>
        <text x={8} y={center + 4} textAnchor="middle" fontSize="10" fill="rgba(234,130,34,0.5)" fontFamily="monospace">W</text>
      </svg>
    </div>
  );
}
