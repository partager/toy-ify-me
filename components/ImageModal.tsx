
import React, { useEffect } from 'react';

interface ImageModalProps {
  src: string;
  alt: string;
  onClose: () => void;
}

export const ImageModal: React.FC<ImageModalProps> = ({ src, alt, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4 transition-opacity duration-300"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="image-modal-title"
    >
      <div 
        className="relative bg-white p-2 rounded-lg shadow-2xl max-w-4xl max-h-[90vh] transition-transform duration-300 scale-95 animate-scale-in"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on the image container
      >
        <h2 id="image-modal-title" className="sr-only">Enlarged Image View</h2>
        <img src={src} alt={alt} className="max-w-full max-h-[calc(90vh-2rem)] object-contain rounded" />
        <button
          onClick={onClose}
          className="absolute top-0 right-0 -mt-4 -mr-4 bg-primary text-white rounded-full h-10 w-10 flex items-center justify-center text-2xl font-bold shadow-lg hover:bg-red-500 transition-all transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-white"
          aria-label="Close image view"
        >
          &times;
        </button>
      </div>
      <style>{`
        @keyframes scale-in {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-scale-in {
          animation: scale-in 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
};
