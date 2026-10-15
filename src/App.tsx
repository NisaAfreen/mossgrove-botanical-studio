import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom';
import type { ReactNode } from 'react';
import { StoreProvider } from './context/StoreContext';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import LandscapingPage from './pages/LandscapingPage';
import InspirationPage from './pages/InspirationPage';
import ArticlePage from './pages/ArticlePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import CheckoutPage from './pages/CheckoutPage';
import NotFoundPage from './pages/NotFoundPage';
import { LegalPage, WishlistPage } from './pages/MiscPages';

// The single-file preview runs inside a sandboxed frame, so it routes in memory.
// The normal build uses real URLs.
function Router({ children }: { children: ReactNode }) {
  return import.meta.env.MODE === 'single' ? <MemoryRouter>{children}</MemoryRouter> : <BrowserRouter>{children}</BrowserRouter>;
}

export default function App() {
  return (
    <Router>
      <StoreProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="shop" element={<ShopPage />} />
            <Route path="landscaping" element={<LandscapingPage />} />
            <Route path="inspiration" element={<InspirationPage />} />
            <Route path="journal/:slug" element={<ArticlePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="checkout" element={<CheckoutPage />} />
            <Route path="wishlist" element={<WishlistPage />} />
            <Route path="legal" element={<LegalPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </StoreProvider>
    </Router>
  );
}
