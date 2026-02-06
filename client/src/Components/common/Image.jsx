import React, { useState, useEffect } from "react";
import useOfflineDetection from "../../hooks/useOfflineDetection";
import ImagePlaceholder from "./ImagePlaceholder";

function Image({
  alt = "",
  link,
  class_name = "h-full object-cover rounded-full",
  width,
  height,
  fallbackSrc,
}) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const isOffline = useOfflineDetection();

  // Reset error state when link changes
  useEffect(() => {
    setImageError(false);
    setImageLoaded(false);
  }, [link]);

  const handleImageError = () => {
    setImageError(true);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  // Determine if we should show placeholder
  const shouldShowPlaceholder =
    isOffline || imageError || (!link && !fallbackSrc);

  // Determine the final src
  const finalSrc = shouldShowPlaceholder
    ? fallbackSrc ||
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjZjNmNGY2Ii8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjE1MCIgcj0iNjAiIGZpbGw9IiNlNWU3ZWIiLz4KPGNpcmNsZSBjeD0iMjAwIiBjeT0iMTUwIiByPSI0MCIgZmlsbD0iIzljYTNhZiIvPgo8cmVjdCB4PSI1MCIgeT0iNTAiIHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiByeD0iOCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZDFkNWRiIiBzdHJva2Utd2lkdGg9IjIiLz4KPGNpcmNsZSBjeD0iMzUwIiBjeT0iNTAiIHI9IjEwIiBmaWxsPSIjOWNhM2FmIi8+CjxyZWN0IHg9IjgwIiB5PSIyMjAiIHdpZHRoPSIyNDAiIGhlaWdodD0iMTAiIHJ4PSI1IiBmaWxsPSIjZDFkNWRiIi8+CjxyZWN0IHg9IjgwIiB5PSIyNDAiIHdpZHRoPSIxODAiIGhlaWdodD0iMTAiIHJ4PSI1IiBmaWxsPSIjZDFkNWRiIi8+Cjwvc3ZnPgo="
    : link;

  return (
    <div className={`relative ${class_name}`}>
      {!shouldShowPlaceholder && (
        <img
          src={finalSrc}
          alt={alt}
          className={`w-full h-full object-cover ${imageLoaded ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}
          loading="lazy"
          width={width}
          height={height}
          decoding="async"
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      )}

      {shouldShowPlaceholder && (
        <ImagePlaceholder
          width={width || 400}
          height={height || 300}
          className={`w-full h-full ${class_name}`}
        />
      )}

      {/* Loading indicator when image is loading */}
      {!shouldShowPlaceholder && !imageLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-orange-500 rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}

export default Image;
