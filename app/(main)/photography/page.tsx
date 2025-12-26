"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Camera, MapPin, X, Loader2 } from "lucide-react";

interface Photo {
  id: number;
  title: string;
  location: string;
  description: string;
  cloudinary_url: string;
  cloudinary_public_id: string;
  size: "normal" | "tall" | "wide";
  width: number;
  height: number;
}

export default function PhotographyPage() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      const response = await fetch("/api/photos");
      if (response.ok) {
        const data = await response.json();
        setPhotos(data);
      }
    } catch (error) {
      console.error("Error fetching photos:", error);
    } finally {
      setLoading(false);
    }
  };

  // Calculate row span based on actual image dimensions
  const getRowSpan = (photo: Photo) => {
    const aspectRatio = photo.width / photo.height;
    if (aspectRatio < 0.8) return 2; // Tall images span 2 rows
    if (aspectRatio > 1.4) return 1; // Wide images stay 1 row
    return 1; // Normal images
  };

  const getColSpan = (photo: Photo) => {
    const aspectRatio = photo.width / photo.height;
    if (aspectRatio > 1.4) return 2; // Wide images span 2 columns
    return 1;
  };

  return (
    <main className="min-h-screen pt-24 pb-16 relative overflow-hidden">
      {/* Floating decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-28 right-[8%] w-10 h-10 md:w-12 md:h-12 opacity-20"
          animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <Camera className="w-full h-full text-blue-500" />
        </motion.div>
        <motion.div
          className="absolute bottom-40 left-[6%] w-8 h-8 md:w-10 md:h-10 opacity-15"
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <Camera className="w-full h-full text-blue-500" />
        </motion.div>

        {/* Floating dots */}
        <motion.div
          className="absolute top-40 left-[20%] w-2 h-2 rounded-full bg-blue-500/20"
          animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-52 right-[25%] w-3 h-3 rounded-full bg-blue-500/15"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        />
        <motion.div
          className="absolute top-[60%] right-[5%] w-2 h-2 rounded-full bg-blue-500/25"
          animate={{ scale: [1, 1.5, 1], opacity: [0.25, 0.45, 0.25] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">Photography</h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Capturing moments and perspectives through my lens. A collection of my favorite shots from around the world.
          </p>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        )}

        {/* Empty State */}
        {!loading && photos.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <Camera className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
            <p className="text-muted-foreground text-lg">No photos yet</p>
            <p className="text-muted-foreground text-sm mt-2">
              Visit <code className="text-primary">/photography/admin</code> to add photos
            </p>
          </motion.div>
        )}

        {/* Pinterest-style Masonry Grid */}
        {!loading && photos.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4"
          >
            {photos.map((photo, index) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group relative cursor-pointer overflow-hidden rounded-xl bg-muted/30 break-inside-avoid"
                onClick={() => setSelectedPhoto(photo)}
              >
                {/* Image with natural aspect ratio */}
                <Image
                  src={photo.cloudinary_url}
                  alt={photo.title}
                  width={photo.width}
                  height={photo.height}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <h3 className="text-white font-semibold text-lg mb-1">{photo.title}</h3>
                  {photo.location && (
                    <p className="text-white/70 text-sm flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {photo.location}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-10"
            >
              <X className="w-8 h-8" />
            </button>
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-5xl w-full max-h-[85vh] relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-[60vh]">
                <Image
                  src={selectedPhoto.cloudinary_url}
                  alt={selectedPhoto.title}
                  fill
                  className="object-contain rounded-xl"
                  sizes="100vw"
                  priority
                />
              </div>
              
              <div className="mt-4 text-white">
                <h2 className="text-2xl font-bold mb-2">{selectedPhoto.title}</h2>
                {selectedPhoto.location && (
                  <p className="text-white/70 flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4" />
                    {selectedPhoto.location}
                  </p>
                )}
                {selectedPhoto.description && (
                  <p className="text-white/60">{selectedPhoto.description}</p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
