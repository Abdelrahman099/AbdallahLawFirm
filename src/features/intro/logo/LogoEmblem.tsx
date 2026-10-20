import { logoGeometry as shape } from "./geometry";

export function LogoEmblem() {
  return (
    <svg
      className="logo-emblem"
      viewBox="0 0 1000 850"
      fill="currentColor"
      aria-hidden="true"
    >
      <g transform={shape.transform} fillRule="evenodd">
        <g className="logo-rig">
          <path className="logo-part-frame" d={shape.frame} />
          <path className="logo-part-foot" d={shape.foot} />
        </g>
        <g className="logo-quill">
          <path d={shape.quill} />
          <path d={shape.detail} />
        </g>
        <g className="logo-book">
          <path d={shape.book} />
        </g>
      </g>
    </svg>
  );
}
