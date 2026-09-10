export default function StarIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 }}>
      <defs>
        <linearGradient id={`starGrad-${size}`} x1="10%" y1="0%" x2="90%" y2="100%">
          <stop offset="0%" stopColor="#FFE9A8" />
          <stop offset="45%" stopColor="#FFC93C" />
          <stop offset="100%" stopColor="#E8A317" />
        </linearGradient>
      </defs>
      <path
        d="M12 2.5l2.9 6.06 6.6.77-4.9 4.62 1.27 6.55L12 17.9l-5.87 3.6 1.27-6.55-4.9-4.62 6.6-.77z"
        fill={`url(#starGrad-${size})`}
        stroke="#C98A0F"
        strokeWidth="0.6"
        strokeLinejoin="round"
      />
    </svg>
  )
}
