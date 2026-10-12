export function BalanceScales() {
  return (
    <svg
      className="balance-object"
      viewBox="0 0 360 320"
      fill="none"
      aria-hidden="true"
    >
      <g
        className="balance-guides"
        stroke="currentColor"
        strokeWidth="0.7"
        opacity="0.22"
      >
        <path d="M30 125H330M180 30V300M80 108V232M280 108V232" />
        <path d="M30 110V140M330 110V140M165 30H195M165 300H195" />
      </g>
      <g className="balance-base" fill="currentColor">
        <path d="M155 277H205L218 289H142Z" />
        <path d="M175 127H185V277H175Z" />
      </g>
      <g className="balance-rig">
        <path
          className="balance-outline"
          d="M51 139C96 139 124 137 158 124Q180 113 202 124C236 137 264 139 309 139"
          stroke="currentColor"
          strokeWidth="7"
          strokeLinecap="round"
        />
        {[80, 280].map((x) => (
          <g key={x} transform={`translate(${x} 138)`}>
            <g className="balance-hanger">
              <path
                className="balance-outline"
                d="M0 0L-44 68M0 0L44 68"
                stroke="currentColor"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <path
                d="M-47 67H47C36 99-36 99-47 67ZM-34 74C-23 89 23 89 34 74Z"
                fill="currentColor"
                fillRule="evenodd"
              />
            </g>
          </g>
        ))}
      </g>
      <g
        className="balance-impact"
        stroke="var(--balance-metal)"
        strokeWidth="1.5"
        opacity="0"
      >
        <circle cx="180" cy="125" r="27" />
        <circle cx="180" cy="125" r="37" />
      </g>
      <g className="balance-sword" fill="var(--balance-metal)">
        <path d="M180 101L188 108L184 251L180 275L176 251L172 108Z" />
        <rect x="174" y="67" width="12" height="30" rx="3" />
        <path d="M156 93Q180 84 204 93L204 99H156Z" />
        <path d="M180 51L187 59L180 67L173 59Z" />
        <path d="M180 110V251" stroke="var(--deep)" strokeOpacity="0.25" />
      </g>
      <path
        className="balance-horizon"
        d="M90 301H270"
        stroke="var(--balance-metal)"
        strokeWidth="1"
      />
    </svg>
  );
}
