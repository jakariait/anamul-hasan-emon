"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";

const ImageComponent = ({
                          imageName,
                          className = "",
                          altName = "",
                          height = 200,
                          width = "100%", // ✅ added width prop with default
                          roundedFull = false,
                        }) => {
  const [imageSrc, setImageSrc] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (imageName && process.env.NEXT_PUBLIC_API_URL) {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL.replace("/api", "");
      setImageSrc(`${baseUrl}/uploads/${imageName}`);
      setIsLoading(true);
      setHasError(false);
    }
  }, [imageName]);

  return (
    <div
      className={`relative overflow-hidden ${roundedFull ? "rounded-full" : ""} ${className}`}
      style={{
        width,
        height,
      }}
    >
      {(isLoading || hasError) && (
        <Skeleton height={height} width={typeof width === "number" ? `${width}px` : width} />
      )}

      {imageSrc && !hasError && (
        <Image
          src={imageSrc}
          alt={altName}
          fill
          className={`object-cover ${roundedFull ? "rounded-full" : ""}`}
          style={{
            display: isLoading ? "none" : "block",
          }}
          onLoadingComplete={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
            setImageSrc("");
          }}
          sizes="100vw"
          priority
        />
      )}
    </div>
  );
};

export default ImageComponent;
