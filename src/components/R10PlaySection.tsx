import React, { useState, useEffect } from 'react';
import { Play, Youtube, Eye, Clock, Calendar, Sparkles, TrendingUp } from 'lucide-react';
import { getRecentVideos, getChannelStats, formatRelativeDate, getVideoCategory } from '../services/youtubeService';

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
  viewCount: string;
  duration: string;
  url: string;
  description: string;
}

const R10PlaySection = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [stats, setStats] = useState(getChannelStats());

  useEffect(() => {
    // Carregar dados reais do canal
    setVideos(getRecentVideos());
  }, []);

  const openVideo = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <section className="relative bg-gradient-to-br from-neutral900 via-neutral800 to-neutral900 py-16 font-body overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-red-600/5 to-orange-500/5"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.1)_1px,transparent_1px),radial-gradient(circle_at_70%_70%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:60px_60px]"></div>
      </div>
      
      {/* Animated Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 via-orange-500/5 to-yellow-400/10 animate-pulse"></div>
      
      <div className="container mx-auto px-4 max-w-[1250px] relative z-10">
        {/* Header da Seção com Muito Destaque */}
        <div className="text-center mb-16">
          {/* Logo R10 PLAY Oficial */}
          <div className="flex items-center justify-center mb-6">
            <div className="relative group">
              <img 
                src="/dist/lovable-uploads/logor10play.png" 
                alt="R10 Play - Canal Oficial" 
                className="h-20 w-auto drop-shadow-2xl transform group-hover:scale-105 transition-all duration-300" 
              />
              <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-orange-500/20 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>

          {/* Linha Decorativa Animada */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-20 h-1 bg-gradient-to-r from-transparent to-red-500"></div>
            <div className="w-4 h-4 bg-red-500 rounded-full animate-bounce"></div>
            <div className="w-20 h-1 bg-gradient-to-l from-transparent to-red-500"></div>
          </div>

          {/* Estatísticas */}
          <div className="flex items-center justify-center gap-8 mt-8">
            <div className="flex items-center gap-2 text-yellow-400">
              <TrendingUp className="w-5 h-5" />
              <span className="font-semibold">+{stats.totalSubscribers} inscritos</span>
            </div>
            <div className="flex items-center gap-2 text-orange-400">
              <Eye className="w-5 h-5" />
              <span className="font-semibold">{stats.totalViews} visualizações</span>
            </div>
            <div className="flex items-center gap-2 text-red-400">
              <Play className="w-5 h-5" />
              <span className="font-semibold">{stats.totalVideos} vídeos</span>
            </div>
          </div>
        </div>

        {/* Grid de Vídeos com Design Premium */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {videos.map((video, index) => (
            <article 
              key={video.id}
              className="group cursor-pointer bg-gradient-to-br from-neutral800 to-neutral900 rounded-2xl overflow-hidden shadow-2xl hover:shadow-red-500/20 transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 border border-neutral700 hover:border-red-500/50"
              onClick={() => openVideo(video.url)}
            >
              {/* Thumbnail com Overlay Premium */}
              <div className="relative overflow-hidden">
                <img 
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Overlay Gradiente */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/60 transition-all duration-300"></div>
                
                {/* Play Button Premium */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <button 
                    className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                    aria-label={`Reproduzir vídeo: ${video.title}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      openVideo(video.url);
                    }}
                  >
                    <Play className="w-6 h-6 text-white ml-1" aria-hidden="true" />
                  </button>
                </div>

                {/* Duração */}
                <div className="absolute bottom-3 right-3 bg-black/90 text-white text-sm px-3 py-1 rounded-full font-medium backdrop-blur-sm">
                  {video.duration}
                </div>

                {/* Indicador de Novo */}
                {formatRelativeDate(video.publishedAt) === 'Ontem' && (
                  <div className="absolute top-3 left-3 bg-gradient-to-r from-red-600 to-orange-500 text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg animate-pulse">
                    🔥 NOVO
                  </div>
                )}

                {/* Número do Vídeo */}
                <div className="absolute top-3 right-3 w-8 h-8 bg-black/80 text-white rounded-full flex items-center justify-center text-sm font-bold backdrop-blur-sm">
                  {index + 1}
                </div>
              </div>

              {/* Informações do Vídeo */}
              <div className="p-6">
                <h3 className="text-base font-bold text-white leading-tight line-clamp-2 mb-4 group-hover:text-red-400 transition-colors duration-300">
                  {video.title}
                </h3>

                {/* Estatísticas */}
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-red-400" />
                    <span className="font-medium">{video.viewCount}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-orange-400" />
                    <span className="font-medium">{formatRelativeDate(video.publishedAt)}</span>
                  </div>
                </div>
              </div>

              {/* Efeito de Brilho no Hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </article>
          ))}
        </div>

        {/* Botão Ver Mais Premium */}
        <div className="text-center mt-12">
          <a 
            href="/r10-play"
            className="group inline-flex items-center gap-3 bg-gradient-to-r from-red-600 via-orange-500 to-red-600 hover:from-red-500 hover:via-orange-400 hover:to-red-500 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-2xl hover:shadow-red-500/30 transform hover:scale-105 border-2 border-red-400/30 hover:border-red-300/50"
          >
            <Youtube className="w-6 h-6 group-hover:scale-110 transition-transform" />
            <span>Ver Todos os Vídeos</span>
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          </a>
          
          {/* Texto adicional */}
          <p className="text-gray-400 mt-4 text-sm">
            🎬 Canal oficial R10 Piauí • Atualizado diariamente
          </p>
        </div>
      </div>
    </section>
  );
};

export default R10PlaySection;