import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { ReviewSection } from './ReviewSection';
import { Footer } from './Footer';

export const RootLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface overflow-x-hidden">
      <Header />
      <main className="flex-1 w-full">
        <Outlet />
      </main>
      <ReviewSection />
      <Footer />
    </div>
  );
};
