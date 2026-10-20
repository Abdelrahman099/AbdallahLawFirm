import { useId } from "react";
import { logoGeometry as shape } from "./geometry";
import { LogoStrikeDefs, LogoStrikeEffects } from "./LogoStrikeEffects";

export function LogoEmblem({
  still = false,
  strike = false,
}: {
  still?: boolean;
  strike?: boolean;
}) {
  const id = useId().replace(/:/g, "");
  const left = `${id}-left-pan`;
  const right = `${id}-right-pan`;
  const frame = `${id}-frame`;
  const leftRegion = "M76 438H127V480L221 668V716H-3V668L79 482Z";
  const rightRegion = "M1026 438H1075V484L1151 668V716H928V668L1025 482Z";
  return (
    <svg
      className="logo-emblem"
      viewBox="0 0 1000 850"
      fill="currentColor"
      aria-hidden="true"
    >
      {!still && (
        <defs>
          <clipPath id={left}>
            <path d={leftRegion} />
          </clipPath>
          <clipPath id={right}>
            <path d={rightRegion} />
          </clipPath>
          <mask
            id={frame}
            maskUnits="userSpaceOnUse"
            x="-20"
            y="-30"
            width="1200"
            height="1050"
            style={{ maskType: "luminance" }}
          >
            <rect x="-20" y="-30" width="1200" height="1050" fill="white" />
            <path d={`${leftRegion} ${rightRegion}`} fill="black" />
          </mask>
          {strike && <LogoStrikeDefs id={id} />}
        </defs>
      )}
      {!still && (
        <g
          className="logo-moving"
          transform={shape.transform}
          fillRule="evenodd"
        >
          <g className="logo-rig">
            <path
              className="logo-part-frame"
              d={shape.frame}
              mask={`url(#${frame})`}
            />
            <g className="logo-pan-entry-left" transform="translate(0 0)">
              <g className="logo-pan-left">
                <path d={shape.frame} clipPath={`url(#${left})`} />
              </g>
            </g>
            <g className="logo-pan-entry-right" transform="translate(0 0)">
              <g className="logo-pan-right">
                <path d={shape.frame} clipPath={`url(#${right})`} />
              </g>
            </g>
          </g>
          <path className="logo-part-foot" d={shape.foot} />
          <g className="logo-book">
            <path d={shape.book} />
          </g>
          {strike && (
            <g className="logo-quill-trail">
              <path d={shape.quill} />
            </g>
          )}
          <g className="logo-quill">
            <path d={shape.quill} />
          </g>
          <path
            className="logo-lock-line"
            d="M510 716H640"
            fill="none"
            stroke="var(--bronze)"
            strokeWidth="4"
          />
        </g>
      )}
      <g className="logo-rest" transform={shape.transform} fillRule="evenodd">
        <path d={shape.outline} />
      </g>
      {!still && strike && <LogoStrikeEffects id={id} />}
    </svg>
  );
}
