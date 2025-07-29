import React, { useState } from 'react';
import { Menu, X, Search } from 'lucide-react';
import SocialLinks from './SocialLinks';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header role="banner" className="h-[100px] bg-white py-4 font-body shadow-sm">
      {/* Skip to content link */}
      <a 
        href="#conteudo" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-blue-600 text-white px-4 py-2 rounded z-50"
      >
        Ir para o conteúdo
      </a>
      
      <div className="container mx-auto px-4 h-full flex items-center justify-between max-w-[1250px]">
        {/* Redes Sociais - Lado Esquerdo */}
        <SocialLinks variant="header" />
        
        {/* Logo Centralizada no Meio */}
        <div className="flex-1 flex justify-center">
          <a 
            href="/" 
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
            aria-label="R10 Piauí - página inicial"
            data-e2e="logo"
          >
            <img 
              src="/lovable-uploads/80f9633e-09c0-48af-8357-5f996aa9ff67.png" 
              alt="R10 Piauí - Qualidade em primeiro lugar" 
              className="h-20 w-auto" 
            />
            {/* Selo de 11 Anos */}
            <div className="relative">
              <img 
                src="/dist/lovable-uploads/selo11anos.png" 
                alt="R10 Piauí - 11 Anos" 
                className="h-12 w-auto" 
              />
            </div>
          </a>
        </div>
        
        {/* Busca e Menu - Lado Direito */}
        <nav aria-label="Navegação principal" data-e2e="nav-principal">
          <div className="flex items-center space-x-4">
            {/* Botão Buscar */}
            <button 
              className="h-12 px-4 border border-gray-300 rounded-full flex items-center gap-2 hover:bg-gray-50 transition-colors font-rubik shadow-sm"
              aria-label="Buscar"
              data-e2e="btn-buscar"
            >
              <Search className="w-4 h-4 text-gray-600" aria-hidden="true" />
              <span className="text-sm font-medium">Buscar</span>
            </button>
            
            {/* Botão Menu Expansível */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="h-12 w-12 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm"
              aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={isMenuOpen}
              data-e2e="btn-menu"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5 text-gray-600" aria-hidden="true" />
              ) : (
                <Menu className="w-5 h-5 text-gray-600" aria-hidden="true" />
              )}
            </button>
          </div>
        </nav>
      </div>
      
      {/* Menu Expansível */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
          <div className="container mx-auto px-4 py-6 max-w-[1250px]">
            <nav className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              <a href="#" className="uppercase text-sm font-semibold text-gray-700 hover:text-red-600 transition-colors">POLÍTICA</a>
              <a href="#" className="uppercase text-sm font-semibold text-gray-700 hover:text-red-600 transition-colors">POLICIAL</a>
              <a href="#" className="uppercase text-sm font-semibold text-gray-700 hover:text-red-600 transition-colors">ESPORTES</a>
              <a href="#" className="uppercase text-sm font-semibold text-gray-700 hover:text-red-600 transition-colors">PIRIPIRI</a>
              <a href="#" className="uppercase text-sm font-semibold text-gray-700 hover:text-red-600 transition-colors">MUNICÍPIOS</a>
              <a href="#" className="uppercase text-sm font-semibold text-gray-700 hover:text-red-600 transition-colors">ENTRETENIMENTO</a>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;