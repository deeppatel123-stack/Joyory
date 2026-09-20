import React, { useState } from "react";

// Default elegant beauty fallback image
const DEFAULT_BEAUTY_FALLBACK =
  "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&auto=format&fit=crop&q=80";

export const FallbackImage = ({
  src,
  alt = "Beauty Product",
  className = "",
  fallback = DEFAULT_BEAUTY_FALLBACK,
  loading = "lazy"
}) => {
  const [imgSrc, setImgSrc] = useState(src || fallback);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(fallback);
    }
  };

  return (
    <img
      src={imgSrc || fallback}
      alt={alt}
      loading={loading}
      onError={handleError}
      className={`transition-opacity duration-300 ${className}`}
    />
  );
};
