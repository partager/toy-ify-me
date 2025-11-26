
import React from 'react';
import { LogoIcon } from './icons/LogoIcon';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-20">
          <div className="flex items-center space-x-3">
            <LogoIcon />
            <h1 className="text-4xl font-display text-primary tracking-wider">
              Toy-ify Me!
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
};
