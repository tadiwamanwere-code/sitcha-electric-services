interface LogoProps {
  className?: string;
}

/**
 * Sitcha Electric Services mark — the "SA" monogram from the client's logo:
 * a warm lightning bolt struck across a structural blue "A".
 *
 * Rebuilt as vector from the client's supplied artwork, which was a 3D mockup
 * render (grey backdrop, extrusion, glow, drop shadow) with no extractable
 * transparent layer. This version has a genuinely transparent background, stays
 * sharp at every size, costs no network request, and holds up on both the light
 * (#F4F7FA) and navy (#0e2a5e) sections.
 *
 * Size it only via the `className` height so the nav and footer stay consistent.
 * Colours are brand literals rather than CSS vars so the mark also renders
 * correctly in the favicon and in social previews.
 */
export default function Logo({className = 'h-10 w-auto'}: LogoProps) {
  return (
    <svg
      viewBox="0 0 120 112"
      className={className}
      role="img"
      aria-label="Sitcha Electric Services logo"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* The "A" — drawn first so the bolt strikes across it */}
      <path
        d="M42 102 L72 34 L102 102"
        stroke="#1f4fa0"
        strokeWidth="18"
        strokeLinejoin="miter"
        strokeMiterlimit="4"
      />
      {/* The bolt / "S" stroke */}
      <path d="M62 10 L28 58 L47 58 L38 102 L76 52 L55 52 Z" fill="#f5a833" />
    </svg>
  );
}
