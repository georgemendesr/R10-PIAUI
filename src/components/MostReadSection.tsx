import React from 'react';
import { TrendingUp, Eye, Clock, ArrowRight } from 'lucide-react';

const MostReadSection = () => {
  const mostReadNews = [
    {
      id: 1,
      title: "Guilherme explica afastamento de Renata Saldanha em festa de famosa",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&h=80&fit=crop",
      views: "15.2K",
      timeAgo: "2h"
    },
    {
      id: 2,
      title: "Prefeito anuncia obras de infraestrutura para região metropolitana",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=120&h=80&fit=crop",
      views: "12.8K",
      timeAgo: "4h"
    },
    {
      id: 3,
      title: "Novo shopping center será inaugurado no centro da cidade",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=120&h=80&fit=crop",
      views: "9.5K",
      timeAgo: "6h"
    },
    {
      id: 4,
      title: "Festival de música atrai milhares de pessoas ao centro histórico",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=120&h=80&fit=crop",
      views: "8.1K",
      timeAgo: "8h"
    },
    {
      id: 5,
      title: "Empresa local recebe prêmio nacional de inovação tecnológica",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=120&h=80&fit=crop",
      views: "7.3K",
      timeAgo: "12h"
    }
  ];

  // Estatísticas das reações de sentimento
  const reactionStats = {
    feliz: 1247,
    inspirado: 892,
    surpreso: 567,
    preocupado: 234,
    triste: 156,
    irritado: 89
  };

  return (
    <section className="bg-white py-8">
      <div className="container mx-auto px-4 max-w-[1250px]">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <TrendingUp className="w-6 h-6 text-brand" />
            <h2 className="text-2xl font-black text-neutral900 tracking-wider font-title">
              MAIS LIDAS
            </h2>
            <TrendingUp className="w-6 h-6 text-brand" />
          </div>
          <div className="w-16 h-1 bg-gradient-to-r from-brand to-accent mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {mostReadNews.map((news, index) => (
            <article 
              key={news.id} 
              className="group cursor-pointer bg-gradient-to-br from-brand to-brand/80 hover:from-brand/90 hover:to-brand/70 transition-all duration-300 rounded-xl p-4 text-white shadow-lg hover:shadow-2xl hover:-translate-y-1 transform relative overflow-hidden"
            >

              
              <div className="relative z-10">
                {/* Miniatura da matéria */}
                <div className="mb-3 relative">
                  <img 
                    src={news.image}
                    alt={news.title}
                    className="w-full h-20 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 rounded-lg group-hover:bg-black/10 transition-colors"></div>
                  
                  {/* Ranqueamento por cima da imagem */}
                  <div className="absolute top-2 right-2 w-8 h-8 bg-brand/90 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white shadow-lg">
                    <span className="text-white font-black text-lg">{index + 1}</span>
                  </div>
                </div>
                
                {/* Título */}
                <h3 className="text-sm font-bold leading-tight text-white group-hover:text-white/95 transition-colors duration-300 line-clamp-3 mb-3">
                  {news.title}
                </h3>
                
                {/* Estatísticas */}
                <div className="flex items-center text-white/80 text-xs">
                  <div className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    <span>{news.views}</span>
                  </div>
                </div>
                
                {/* Ícone de seta */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowRight className="w-4 h-4 text-white/60" />
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Estatísticas das Reações */}
        <div className="mt-12 bg-gray-50 rounded-xl p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">Como os leitores se sentiram hoje</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="text-center">
              <div className="text-3xl mb-2">😊</div>
              <div className="text-sm font-semibold text-gray-900">{reactionStats.feliz}</div>
              <div className="text-xs text-gray-600">Feliz</div>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">😍</div>
              <div className="text-sm font-semibold text-gray-900">{reactionStats.inspirado}</div>
              <div className="text-xs text-gray-600">Inspirado</div>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">😲</div>
              <div className="text-sm font-semibold text-gray-900">{reactionStats.surpreso}</div>
              <div className="text-xs text-gray-600">Surpreso</div>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">😟</div>
              <div className="text-sm font-semibold text-gray-900">{reactionStats.preocupado}</div>
              <div className="text-xs text-gray-600">Preocupado</div>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">😔</div>
              <div className="text-sm font-semibold text-gray-900">{reactionStats.triste}</div>
              <div className="text-xs text-gray-600">Triste</div>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">😡</div>
              <div className="text-sm font-semibold text-gray-900">{reactionStats.irritado}</div>
              <div className="text-xs text-gray-600">Irritado</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MostReadSection;