interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
  alt?: string;
}

export function Logo({
  className = 'h-10 w-auto',
  width = 420,
  height = 56,
  alt = 'TimeAtlas',
}: LogoProps) {
  return (
    <picture>
      <source srcSet="/logo-wordmark.webp 1x, /logo-wordmark.webp 2x" type="image/webp" />
      <img
        src="/logo-wordmark.png"
        alt={alt}
        width={width}
        height={height}
        className={className}
        style={{ objectFit: 'contain' }}
      />
    </picture>
  );
}
