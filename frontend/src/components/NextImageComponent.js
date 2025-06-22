"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";

const NextImageComponent = ({
                              imageName,
                              className = "",
                              altName = "",
                              height = 200,
                              width = 200,
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
      className={`relative ${roundedFull ? "rounded-full overflow-hidden" : ""} ${className}`}
      style={{ width, height }}
    >
      {(isLoading || hasError) && (
        <Skeleton
          height={height}
          width={typeof width === "number" ? `${width}px` : width}
        />
      )}

      {!hasError && imageSrc && (
        <Image
          src={imageSrc}
          alt={altName}
          layout="fill"
          objectFit="cover"
          className={roundedFull ? "rounded-full" : ""}
          style={{ display: isLoading ? "none" : "block" }}
          onLoadingComplete={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
          }}
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      )}

      {hasError && (
        <div className="flex items-center justify-center h-full bg-gray-100 text-gray-500 text-sm">
          Image not found
        </div>
      )}
    </div>
  );
};

export default NextImageComponent;
