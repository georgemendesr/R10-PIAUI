import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HeroGrid from './components/HeroGrid';
import TopAdStrip from './components/TopAdStrip';
import Header from './components/Header';
import BreakingBar from './components/BreakingBar';
import HeroHeadline from './components/HeroHeadline';
import NewsGeneralSection from './components/NewsGeneralSection';
import MostReadSection from './components/MostReadSection';
import R10PlaySection from './components/R10PlaySection';
import R10PlayPage from './components/R10PlayPage';
import MunicipiosSection from './components/MunicipiosSection';
import Footer from './components/Footer';
import ArticlePage from './components/ArticlePage';
import Dashboard from './components/Dashboard';
import PostForm from './components/PostForm';
import AdminLink from './components/AdminLink';
import LoginPage from './components/LoginPage';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  const HomePage = () => (
    <>
      <TopAdStrip />
      <Header />
      <main id="conteudo">
        <BreakingBar />
        <div data-e2e="hero-headline">
          <HeroHeadline />
        </div>
        <div data-e2e="hero-grid">
          <HeroGrid />
        </div>
        <NewsGeneralSection />
        <MostReadSection />
        <div data-e2e="r10-play">
          <R10PlaySection />
        </div>
        <MunicipiosSection />
      </main>
      <Footer />
      <AdminLink />
    </>
  );

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/artigo/:id" element={<ArticlePage />} />
          <Route path="/r10-play" element={<R10PlayPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/dashboard" element={<Navigate to="/admin" replace />} />
          <Route path="/admin/nova-materia" element={<PostForm />} />
          <Route path="/admin/editar-materia/:id" element={<PostForm />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;