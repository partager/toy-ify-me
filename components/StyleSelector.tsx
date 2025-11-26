import React from 'react';
import type { ToyStyle } from '../types';

interface StyleSelectorProps {
  styles: ToyStyle[];
  selectedStyle: ToyStyle | null;
  onSelectStyle: (style: ToyStyle) => void;
}

export const StyleSelector: React.FC<StyleSelectorProps> = ({ styles, selectedStyle, onSelectStyle }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {styles.map((style) => (
        <button
          key={style.id}
          onClick={() => onSelectStyle(style)}
          className={`relative p-2 border-4 rounded-lg text-center transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-opacity-50
            ${selectedStyle?.id === style.id ? 'border-primary focus:ring-primary' : 'border-transparent hover:border-secondary focus:ring-secondary'}
          `}
        >
          <img
            src={style.preview}
            alt={style.name}
            className="w-full h-32 md:h-40 object-cover rounded-md"
          />
          <p className={`mt-2 font-bold ${selectedStyle?.id === style.id ? 'text-primary' : 'text-dark'}`}>
            {style.name}
          </p>
           {selectedStyle?.id === style.id && (
            <div className="absolute top-1 right-1 bg-primary text-white rounded-full p-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}
        </button>
      ))}
    </div>
  );
};
