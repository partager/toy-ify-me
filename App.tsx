
import React, { useState, useCallback, useMemo } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { StyleSelector } from './components/StyleSelector';
import { ResultsDisplay } from './components/ResultsDisplay';
import { ImageModal } from './components/ImageModal';
import { generateToyImage } from './services/geminiService';
import { TOY_STYLES } from './constants';
import type { ToyStyle } from './types';
import { GenerateIcon } from './components/icons/GenerateIcon';

interface UploadedImage {
  file: File;
  dataUrl: string;
}

export default function App() {
  const [originalImage, setOriginalImage] = useState<UploadedImage | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<ToyStyle | null>(null);
  const [customPrompt, setCustomPrompt] = useState<string>('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [modalImageSrc, setModalImageSrc] = useState<string | null>(null);

  const handleImageUpload = useCallback((file: File, dataUrl: string) => {
    setOriginalImage({ file, dataUrl });
    setGeneratedImage(null);
    setError(null);
  }, []);

  const handleGenerate = useCallback(async () => {
    if (!originalImage || !selectedStyle) {
      setError('Please upload an image and select a style.');
      return;
    }

    setIsLoading(true);
    setGeneratedImage(null);
    setError(null);

    try {
      const imageDataUrl = await generateToyImage(
        originalImage.dataUrl,
        originalImage.file.type,
        selectedStyle,
        customPrompt
      );
      setGeneratedImage(imageDataUrl);
    } catch (e) {
      console.error(e);
      setError('Failed to generate image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [originalImage, selectedStyle, customPrompt]);
  
  const isGenerateDisabled = useMemo(() => !originalImage || !selectedStyle || isLoading, [originalImage, selectedStyle, isLoading]);

  const handleOpenModal = (src: string) => {
    setModalImageSrc(src);
  };

  const handleCloseModal = () => {
    setModalImageSrc(null);
  };

  return (
    <div className="bg-light min-h-screen font-sans text-dark">
      <Header />
      <main className="container mx-auto p-4 md:p-8 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: Controls */}
          <div className="flex flex-col gap-8">
            <div className="bg-white p-6 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl">
              <h2 className="text-2xl font-heading text-dark mb-4">1. Upload Your Image</h2>
              <ImageUploader onImageUpload={handleImageUpload} />
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl">
              <h2 className="text-2xl font-heading text-dark mb-4">2. Choose Style &amp; Customize</h2>
              <p className="text-sm text-gray-500 mb-4">Select a base style for your toy.</p>
              <StyleSelector
                styles={TOY_STYLES}
                selectedStyle={selectedStyle}
                onSelectStyle={setSelectedStyle}
              />
              <div className="mt-6">
                <label htmlFor="custom-prompt" className="block text-xl font-heading text-dark mb-2">Optional Instructions</label>
                 <p className="text-sm text-gray-500 mb-3">Give Gemini specific directions. E.g., "make the hair blue" or "add a superhero cape".</p>
                <textarea
                  id="custom-prompt"
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  placeholder="e.g., give it a happy expression and a red hat"
                  className="w-full h-24 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-200"
                  aria-label="Custom prompt for image generation"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Results */}
          <div className="bg-white p-6 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl sticky top-8 h-fit">
             <h2 className="text-2xl font-heading text-dark mb-4">3. See the Magic!</h2>
            <ResultsDisplay
              originalImage={originalImage?.dataUrl ?? null}
              generatedImage={generatedImage}
              isLoading={isLoading}
              error={error}
              onImageClick={handleOpenModal}
            />
          </div>
        </div>
      </main>

      {/* Sticky Generate Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-t border-gray-200 p-4 z-10">
        <div className="container mx-auto flex justify-center">
          <button
            onClick={handleGenerate}
            disabled={isGenerateDisabled}
            className="flex items-center justify-center gap-3 w-full md:w-auto text-white font-bold py-4 px-8 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 bg-primary hover:bg-red-500 disabled:bg-gray-400"
          >
            <GenerateIcon />
            <span className="text-xl">{isLoading ? 'Toy-ifying...' : 'Toy-ify Me!'}</span>
          </button>
        </div>
      </div>

      {modalImageSrc && (
        <ImageModal 
          src={modalImageSrc}
          alt="Enlarged generated toy"
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
