import React from 'react';
import { Link } from 'react-router-dom';

const HeroHeadline = () => {
  return (
    <section className="bg-white py-8 font-body">
      <div className="container mx-auto px-4 max-w-[1250px]">
        {/* Supermanchete Principal */}
        <div className="relative">
          <div className="relative overflow-hidden rounded-lg shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&h=600&fit=crop"
              alt="Manchete Principal"
              className="w-full h-96 object-cover rounded-xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            

            
            {/* Conteúdo da Manchete */}
            <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
              <h1 className="headline text-4xl md:text-5xl mb-4 text-white font-bold">
                Nova Política de Transporte Público em Teresina Promete Revolucionar Mobilidade Urbana
              </h1>
              <p className="text-xl text-white/90 leading-relaxed max-w-3xl font-rubik mx-auto">
                Sistema integrado de ônibus e metrô será implementado em 2024 com investimento de R$ 500 milhões
              </p>
            </div>
          </div>
        </div>
        
        {/* Separador discreto */}
        <div className="h-px bg-gray-100 my-4"></div>
      </div>
    </section>
  );
};

export default HeroHeadline;