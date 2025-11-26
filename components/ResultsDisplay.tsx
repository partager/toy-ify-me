
import React from 'react';
import { DownloadIcon } from './icons/DownloadIcon';
import { LoadingSpinner } from './icons/LoadingSpinner';

interface ResultsDisplayProps {
  originalImage: string | null;
  generatedImage: string | null;
  isLoading: boolean;
  error: string | null;
  onImageClick: (src: string) => void;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  originalImage,
  generatedImage,
  isLoading,
  error,
  onImageClick,
}) => {

  const handleDownload = () => {
    if (generatedImage) {
      const link = document.createElement('a');
      link.href = generatedImage;
      link.download = 'toy-ified-image.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };
  
  const Placeholder = () => (
    <div className="flex flex-col items-center justify-center h-full text-center text-gray-400 p-8 bg-gray-50 rounded-lg">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      <p className="font-semibold">Your toy will appear here!</p>
      <p className="text-sm mt-1">Upload an image and choose a style to get started.</p>
    </div>
  );

  return (
    <div className="aspect-square w-full">
      {isLoading ? (
        <div className="flex flex-col items-center justify-center h-full text-center p-8 bg-gray-50 rounded-lg">
            <LoadingSpinner/>
            <p className="mt-4 text-lg font-bold text-primary animate-pulse">Assembling your toy...</p>
            <p className="text-sm text-gray-500">This can take a moment.</p>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center h-full text-center p-8 bg-red-50 text-red-600 border border-red-200 rounded-lg">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="font-bold">Oops! Something went wrong.</p>
          <p className="text-sm mt-1">{error}</p>
        </div>
      ) : generatedImage ? (
        <div className="flex flex-col h-full">
          <div className="grid grid-cols-2 gap-4 flex-grow">
            <div className="flex flex-col items-center">
              <h3 className="text-sm font-bold mb-2 text-gray-500">Original</h3>
              <img src={originalImage!} alt="Original" className="w-full h-auto object-contain rounded-lg max-h-[calc(100%-24px)]"/>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-sm font-bold mb-2 text-primary">Toy-ified!</h3>
              <button onClick={() => onImageClick(generatedImage)} className="w-full h-full focus:outline-none focus:ring-2 focus:ring-primary rounded-lg">
                <img src={generatedImage} alt="Generated Toy" className="w-full h-auto object-contain rounded-lg max-h-[calc(100%-24px)] cursor-zoom-in"/>
              </button>
            </div>
          </div>
          <button 
            onClick={handleDownload}
            className="mt-4 w-full bg-secondary text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 hover:bg-teal-500 transition-colors"
          >
            <DownloadIcon/>
            Download
          </button>
        </div>
      ) : (
        <Placeholder/>
      )}
    </div>
  );
};