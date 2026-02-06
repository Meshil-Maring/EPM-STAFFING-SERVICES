/**
 * Lightweight SVG placeholder component for images
 * This component renders a simple, lightweight SVG placeholder
 * that will work even when offline or when images fail to load
 */

function ImagePlaceholder({ width = 400, height = 300, className = "" }) {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox="0 0 400 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Image placeholder"
    >
      {/* Background */}
      <rect width="400" height="300" fill="#f3f4f6" />

      {/* Placeholder icon - a simple camera/sun icon */}
      <circle cx="200" cy="150" r="60" fill="#e5e7eb" />
      <circle cx="200" cy="150" r="40" fill="#9ca3af" />

      {/* Decorative elements */}
      <rect
        x="50"
        y="50"
        width="300"
        height="200"
        rx="8"
        fill="none"
        stroke="#d1d5db"
        strokeWidth="2"
      />
      <circle cx="350" cy="50" r="10" fill="#9ca3af" />

      {/* Text placeholder lines */}
      <rect x="80" y="220" width="240" height="10" rx="5" fill="#d1d5db" />
      <rect x="80" y="240" width="180" height="10" rx="5" fill="#d1d5db" />
    </svg>
  );
}

export default ImagePlaceholder;
