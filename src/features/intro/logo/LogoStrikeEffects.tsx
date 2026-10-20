import { logoGeometry as shape } from "./geometry";

export function LogoStrikeDefs({ id }: { id: string }) {
  return (
    <>
      <clipPath id={`${id}-shine-clip`}>
        <path d={shape.outline} clipRule="evenodd" />
      </clipPath>
      <linearGradient
        id={`${id}-shine-fill`}
        x1="0"
        y1="0"
        x2="240"
        y2="0"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#FFE7A2" stopOpacity="0" />
        <stop offset="0.42" stopColor="#FFE7A2" stopOpacity="0.35" />
        <stop offset="0.52" stopColor="#FFFBEA" stopOpacity="0.95" />
        <stop offset="1" stopColor="#FFE7A2" stopOpacity="0" />
      </linearGradient>
      <radialGradient id={`${id}-impact-glow`}>
        <stop offset="0" stopColor="var(--logo-impact)" stopOpacity="0.7" />
        <stop offset="1" stopColor="var(--logo-impact)" stopOpacity="0" />
      </radialGradient>
    </>
  );
}

export function LogoStrikeEffects({ id }: { id: string }) {
  return (
    <>
      <g className="logo-strike-effects" transform={shape.transform}>
        <circle
          className="logo-impact-glow"
          cx="486"
          cy="716"
          r="85"
          fill={`url(#${id}-impact-glow)`}
        />
        <circle
          className="logo-impact-ring"
          cx="486"
          cy="716"
          r="16"
          fill="none"
          stroke="var(--logo-impact)"
          strokeWidth="3"
        />
        <circle
          className="logo-impact-point"
          cx="486"
          cy="716"
          r="14"
          fill="var(--logo-impact)"
        />
      </g>
      <g
        className="logo-shine"
        transform={shape.transform}
        clipPath={`url(#${id}-shine-clip)`}
      >
        <g
          className="logo-shine-sweep"
          transform="translate(-350 0) skewX(-18)"
        >
          <rect
            x="0"
            y="-120"
            width="240"
            height="1250"
            fill={`url(#${id}-shine-fill)`}
          />
        </g>
      </g>
    </>
  );
}
