"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import type { ProjectImage } from "./project-card";

export function ProjectImageShowcase({ images }: { images: ProjectImage[] }) {
  const [activeImage, setActiveImage] = useState(0);

  return (
    <div className="order-1 lg:order-2">
      <div className="bg-surface-container-highest rounded-ui-card h-64 lg:h-80 flex items-center justify-center border border-outline-variant overflow-hidden relative">
        <Image
          src={images[activeImage].src}
          alt={images[activeImage].alt}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
          priority={false}
        />
      </div>

      {images.length > 1 && (
        <div className="flex gap-2 mt-4 justify-center">
          {images.map((img, i) => (
            <Button
              key={img.label}
              type="button"
              variant={activeImage === i ? "active" : "outline"}
              size="sm"
              onClick={() => setActiveImage(i)}
              className="px-3 py-1.5 h-auto text-xs uppercase tracking-wider"
            >
              {img.label}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
