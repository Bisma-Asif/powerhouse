'use client';

import NextImage from 'next/image';

/**
 * next/image wrapper safe to use from Server Components.
 * Handles remote-image load failures internally (graceful dim) so pages
 * never need to pass event-handler functions across the server/client boundary.
 */
export default function Img({ fallbackOpacity = 0.2, ...props }) {
  return (
    <NextImage
      {...props}
      onError={(e) => {
        e.currentTarget.style.opacity = String(fallbackOpacity);
      }}
    />
  );
}
