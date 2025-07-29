import React, { useEffect, useState } from 'react';
import { adsService, Banner } from '../services/adsService';

interface AdBannerProps {
  position: Banner['posicao'];
  className?: string;
}

const AdBanner: React.FC<AdBannerProps> = ({ position, className = '' }) => {
  const [banner, setBanner] = useState<Banner | null>(null);

  useEffect(() => {
    // Buscar banner ativo para a posição
    const activeBanner = adsService.getActiveBanner(position);
    console.log(`Banner para posição ${position}:`, activeBanner); // Debug
    setBanner(activeBanner);

    if (activeBanner) {
      // Registrar impressão simples
      adsService.registerImpression(activeBanner.id);
    }
  }, [position]);

  const handleBannerClick = () => {
    if (banner) {
      adsService.registerClick(banner.id);
      window.open(banner.link, '_blank', 'noopener,noreferrer');
    }
  };

  if (!banner) {
    console.log(`Nenhum banner encontrado para posição: ${position}`); // Debug
    return null;
  }

  const getSizeClasses = (tamanho: Banner['tamanho']) => {
    // Para news-sidebar, usar o mesmo tamanho da imagem principal
    if (position === 'news-sidebar') {
      return 'w-full h-80';
    }
    
    switch (tamanho) {
      case '728x90':
        return 'w-[728px] h-[90px] max-w-full';
      case '300x250':
        return 'w-[300px] h-[250px]';
      case '160x600':
        return 'w-[160px] h-[600px]';
      case '320x50':
        return 'w-[320px] h-[50px] max-w-full';
      case '970x250':
        return 'w-[970px] h-[250px] max-w-full';
      case '300x600':
        return 'w-[300px] h-[600px]';
      default:
        return 'w-full h-auto';
    }
  };

  const renderBannerContent = () => {
    switch (banner.tipo) {
      case 'html':
        return (
          <div
            className={getSizeClasses(banner.tamanho)}
            dangerouslySetInnerHTML={{ __html: banner.conteudoHtml || '' }}
          />
        );
      
      case 'video':
        return (
          <video
            className={`${getSizeClasses(banner.tamanho)} object-cover`}
            autoPlay
            muted
            loop
            playsInline
          >
            <source src={banner.imagem} type="video/mp4" />
          </video>
        );
      
      case 'gif':
      case 'imagem':
      default:
        return (
          <img
            src={banner.imagem}
            alt={banner.titulo}
            className={`${getSizeClasses(banner.tamanho)} object-cover`}
            loading="lazy"
            onError={(e) => console.log('Erro ao carregar imagem do banner:', e)}
            onLoad={() => console.log('Banner carregado:', banner.titulo)}
          />
        );
    }
  };

  return (
    <div 
      id={`banner-${banner.id}`}
      className={`ad-banner ${className}`}
      onClick={handleBannerClick}
      data-position={position}
      data-banner-id={banner.id}
      style={{ cursor: 'pointer' }}
    >
      {renderBannerContent()}
    </div>
  );
};

export default AdBanner; 