import React from 'react';
import { Mail, Phone, MapPin, ArrowUp } from 'lucide-react';
import SocialLinks from './SocialLinks';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-neutral900 text-white font-body">
      {/* Conteúdo Principal do Footer */}
      <div className="container mx-auto px-4 max-w-[1250px] py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Coluna 1 - Sobre o Portal */}
          <div className="space-y-4">
                                    <div className="flex items-center gap-2 mb-4">
                          <img 
                            src="/lovable-uploads/80f9633e-09c0-48af-8357-5f996aa9ff67.png"
                            alt="R10 Piauí - Logo Oficial"
                            className="h-8 w-auto"
                          />
                          <h3 className="text-xl font-bold text-white">R10 Piauí</h3>
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed">
                          Qualidade em primeiro lugar. Desde 2014. O portal de notícias mais completo do Piauí. 
                          Informação de qualidade, atualizada e confiável para você ficar por dentro de tudo 
                          que acontece no estado.
                        </p>
            <div className="flex items-center gap-3 pt-2">
              <SocialLinks 
                variant="footer" 
                iconSize="sm" 
                showLabels={true}
              />
            </div>
          </div>

          {/* Coluna 2 - Editorias */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-white border-b border-brand/30 pb-2">
              Editorias
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-brand transition-colors text-sm flex items-center gap-2">
                  <div className="w-2 h-2 bg-ed-policia rounded-full"></div>
                  Polícia
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-brand transition-colors text-sm flex items-center gap-2">
                  <div className="w-2 h-2 bg-ed-politica rounded-full"></div>
                  Política
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-brand transition-colors text-sm flex items-center gap-2">
                  <div className="w-2 h-2 bg-ed-esporte rounded-full"></div>
                  Esporte
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-brand transition-colors text-sm flex items-center gap-2">
                  <div className="w-2 h-2 bg-ed-entretenimento rounded-full"></div>
                  Entretenimento
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-brand transition-colors text-sm flex items-center gap-2">
                  <div className="w-2 h-2 bg-ed-geral rounded-full"></div>
                  Geral
                </a>
              </li>
            </ul>
          </div>

          {/* Coluna 3 - Municípios */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-white border-b border-brand/30 pb-2">
              Municípios
            </h4>
            <div className="grid grid-cols-2 gap-2">
              <a href="#" className="text-gray-300 hover:text-brand transition-colors text-sm">
                Teresina
              </a>
              <a href="#" className="text-gray-300 hover:text-brand transition-colors text-sm">
                Pedro II
              </a>
              <a href="#" className="text-gray-300 hover:text-brand transition-colors text-sm">
                Campo Maior
              </a>
              <a href="#" className="text-gray-300 hover:text-brand transition-colors text-sm">
                Barras
              </a>
              <a href="#" className="text-gray-300 hover:text-brand transition-colors text-sm">
                Esperantina
              </a>
              <a href="#" className="text-gray-300 hover:text-brand transition-colors text-sm">
                Batalha
              </a>
              <a href="#" className="text-gray-300 hover:text-brand transition-colors text-sm">
                Brasileira
              </a>
              <a href="#" className="text-gray-300 hover:text-brand transition-colors text-sm">
                Piripiri
              </a>
            </div>
          </div>

          {/* Coluna 4 - Contato */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-white border-b border-brand/30 pb-2">
              Contato
            </h4>
            <div className="space-y-3">
                                        <div className="flex items-start gap-3">
                            <Mail className="w-4 h-4 text-brand mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-gray-300 text-sm">contato@r10piaui.com</p>
                              <p className="text-gray-400 text-xs">Redação</p>
                            </div>
                          </div>
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-brand mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm">(86) 99999-9999</p>
                  <p className="text-gray-400 text-xs">WhatsApp</p>
                </div>
              </div>
                                        <div className="flex items-start gap-3">
                            <MapPin className="w-4 h-4 text-brand mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-gray-300 text-sm">Teresina, PI</p>
                              <p className="text-gray-400 text-xs">Piauí</p>
                            </div>
                          </div>
            </div>
          </div>
        </div>
      </div>

      {/* Linha Separadora */}
      <div className="border-t border-gray-700">
        <div className="container mx-auto px-4 max-w-[1250px]">
          
          {/* Seção Inferior */}
          <div className="py-6 flex flex-col md:flex-row justify-between items-center gap-4">
            
            {/* Copyright */}
            <div className="text-center md:text-left">
                                        <p className="text-gray-400 text-sm">
                            © 2024 R10 Piauí. Todos os direitos reservados.
                          </p>
            </div>

            {/* Links Legais */}
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-brand transition-colors">
                Política de Privacidade
              </a>
              <a href="#" className="text-gray-400 hover:text-brand transition-colors">
                Termos de Uso
              </a>
              <a href="#" className="text-gray-400 hover:text-brand transition-colors">
                Sobre Nós
              </a>
              <a href="#" className="text-gray-400 hover:text-brand transition-colors">
                Anuncie Conosco
              </a>
            </div>

            {/* Botão Voltar ao Topo */}
            <button
              onClick={scrollToTop}
              className="w-10 h-10 bg-brand hover:bg-brand/80 rounded-full flex items-center justify-center transition-colors"
              aria-label="Voltar ao topo"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 