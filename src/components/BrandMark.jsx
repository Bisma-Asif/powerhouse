/** Typographic brand mark — used where official logo assets are not licensed. */
export default function BrandMark({ brand, size = 'md' }) {
  const sizes = {
    sm: 'h-16 text-lg px-4',
    md: 'h-20 text-xl px-5',
    lg: 'h-24 text-2xl px-6',
  };
  return (
    <div
      className={`flex w-full items-center justify-center rounded-xl font-serif font-bold tracking-tight shadow-card ${sizes[size]}`}
      style={{ backgroundColor: brand.color, color: brand.textColor }}
      role="img"
      aria-label={`${brand.name} logo`}
    >
      {brand.name}
    </div>
  );
}
