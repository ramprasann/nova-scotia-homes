import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MobileRootLayout } from '../layouts/MobileRootLayout';
import { MobileHomePage } from '../pages/MobileHomePage';
import { MobileBuyPage } from '../pages/MobileBuyPage';
import { MobileSellPage } from '../pages/MobileSellPage';
import { MobileSavedPage } from '../pages/MobileSavedPage';
import { MobileMortgagePage } from '../pages/MobileMortgagePage';
import { MobileAboutPage } from '../pages/MobileAboutPage';
import { MobileContactPage } from '../pages/MobileContactPage';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MobileRootLayout />}>
        <Route index element={<MobileHomePage />} />
        <Route path="buy" element={<MobileBuyPage />} />
        <Route path="search" element={<Navigate to="/buy" replace />} />
        <Route path="sell" element={<MobileSellPage />} />
        <Route path="saved" element={<MobileSavedPage />} />
        <Route path="calculator" element={<MobileMortgagePage />} />
        <Route path="about" element={<MobileAboutPage />} />
        <Route path="contact" element={<MobileContactPage />} />
        <Route path="*" element={<MobileHomePage />} />
      </Route>
    </Routes>
  );
};
