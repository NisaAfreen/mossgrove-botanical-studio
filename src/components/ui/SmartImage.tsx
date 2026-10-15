import { useState, type ImgHTMLAttributes } from 'react';
import { Sprig } from './Botanical';

/** Image with a soft loading state and a branded fallback if the file fails to load. */
export default function SmartImage({ className = '', alt, ...rest }: ImgHTMLAttributes<HTMLImageElement> & { alt: string }) {
  const [state, setState] = useState<'loading' | 'ok' | 'error'>('loading');
  if (state === 'error') {
    return (
      <div role="img" aria-label={alt} className={`flex items-center justify-center bg-gradient-to-br from-sage-100 to-linen-300 text-forest/40 ${className}`}>
        <Sprig className="h-1/2 max-h-32" />
      </div>
    );
  }
  return (
    <img
      alt={alt}
      loading="lazy"
      decoding="async"
      onLoad={() => setState('ok')}
      onError={() => setState('error')}
      className={`${className} bg-sage-100 transition-opacity duration-700 ${state === 'ok' ? 'opacity-100' : 'opacity-0'}`}
      {...rest}
    />
  );
}
