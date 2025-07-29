import React from 'react';
import AdBanner from './AdBanner';

const NewsGeneralSection = () => {
  // Função para mapear categoria para classes CSS
  const getEditorialClasses = (category: string) => {
    const categoryMap: { [key: string]: { title: string, bar: string, tint: string } } = {
      'POLÍCIA': { title: 'title-policia', bar: 'bar-policia', tint: 'policia' },
      'POLÍTICA': { title: 'title-politica', bar: 'bar-politica', tint: 'politica' },
      'ESPORTE': { title: 'title-esporte', bar: 'bar-esporte', tint: 'esporte' },
      'ENTRETENIMENTO': { title: 'title-entretenimento', bar: 'bar-entretenimento', tint: 'entretenimento' },
      'GERAL': { title: 'title-geral', bar: 'bar-geral', tint: 'geral' }
    };
    return categoryMap[category] || categoryMap['GERAL'];
  };
  const mainNews = {
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&h=320&fit=crop",
    category: "POLÍTICA",
    chapeu: "DIGITALIZAÇÃO",
    title: "Governo anuncia digitalização de serviços públicos em todo o estado",
    subtitle: "Investimento de R$ 50 milhões vai modernizar atendimento à população"
  };

  const centerNews = [
    {
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=80&h=60&fit=crop",
      category: "GERAL",
      chapeu: "VAGAS",
      title: "Universidade Federal do Piauí abre 500 novas vagas para cursos técnicos"
    },
    {
      image: "https://images.unsplash.com/photo-1485833077593-4278bba3f11f?w=80&h=60&fit=crop",
      category: "ESPORTE",
      chapeu: "REFLORESTAMENTO",
      title: "Projeto de reflorestamento planta 10 mil mudas na região do cerrado"
    },
    {
      image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=80&h=60&fit=crop",
      category: "ENTRETENIMENTO",
      chapeu: "FESTIVAL",
      title: "Festival de inverno de Oeiras recebe mais de 50 mil visitantes"
    },
    {
      image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=80&h=60&fit=crop",
      category: "POLÍCIA",
      chapeu: "TURISMO",
      title: "Litoral piauiense registra alta temporada com ocupação de 95%"
    }
  ];

  const rightNews = [
    {
      image: "https://images.unsplash.com/photo-1473091534298-04dcbce3278c?w=80&h=60&fit=crop",
      category: "ESPORTE",
      chapeu: "ECONOMIA",
      title: "PIB do Piauí cresce 4,2% no último trimestre"
    },
    {
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=80&h=60&fit=crop",
      category: "POLÍTICA",
      chapeu: "SAÚDE",
      title: "Novo hospital regional será inaugurado em dezembro"
    }
  ];



  return (
    <section className="py-8 bg-white font-body">
      <div className="container mx-auto px-4 max-w-[1250px]">
        {/* Super Banner */}
        <div className="w-full flex justify-center mb-8">
          <AdBanner position="super-banner" />
        </div>

        {/* 3 Equal Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column - Main News */}
          <div className="space-y-4">
            <div className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg">
                <img 
                  src={mainNews.image}
                  alt={mainNews.title}
                  className="w-full h-80 object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="tag">
                    {mainNews.chapeu}
                  </span>
                </div>
              </div>
              <div className="mt-4">
                <h3 className={`headline ${getEditorialClasses(mainNews.category).title} text-2xl md:text-3xl mb-3`}>
                  {mainNews.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {mainNews.subtitle}
                </p>
              </div>
            </div>
          </div>

          {/* Center Column - Multiple Small News */}
          <div className="space-y-4">
            {centerNews.map((news, index) => (
              <div key={index} className="group cursor-pointer border-b border-gray-50 last:border-b-0 pb-3 last:pb-0">
                <div className="flex gap-3">
                  <div className="flex-shrink-0">
                    <img 
                      src={news.image}
                      alt={news.title}
                      className="w-28 h-20 object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex-1">
                    <span className="tag mb-1 block">
                      {news.chapeu}
                    </span>
                    <h4 className={`headline ${getEditorialClasses(news.category).title} text-lg md:text-xl leading-none`}>
                      {news.title}
                    </h4>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column - Banner acima das notícias */}
          <div className="space-y-6">
            {/* Banner no topo da coluna direita */}
            <div className="w-full">
              <AdBanner position="news-sidebar" />
            </div>
            
            {/* Right News abaixo do banner */}
            <div className="space-y-4">
              {rightNews.map((news, index) => (
                <div key={index} className="group cursor-pointer border-b border-gray-50 last:border-b-0 pb-3 last:pb-0">
                  <div>
                    <span className="tag mb-1 block">
                      {news.chapeu}
                    </span>
                    <h4 className={`headline ${getEditorialClasses(news.category).title} text-lg md:text-xl leading-none`}>
                      {news.title}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsGeneralSection;