import { useState } from 'react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
}

export function ImageWithFallback({
  alt,
  src,
  ...props
}: ImageWithFallbackProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className="w-full h-full bg-zinc-100 flex items-center justify-center">
        <span className="text-zinc-400 text-sm">Image unavailable</span>
      </div>
    );
  }

  return (
    <img alt={alt} src={src} onError={() => setHasError(true)} {...props} />
  );
}
