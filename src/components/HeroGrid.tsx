import React from 'react';
import { Link } from 'react-router-dom';

const HeroGrid = () => {
  // Função para mapear categoria para classes CSS
  const getEditorialClasses = (category: string) => {
    const categoryMap: { [key: string]: { title: string, bar: string, tint: string } } = {
      'POLÍCIA': { title: 'title-policia', bar: 'bar-policia', tint: 'policia' },
      'POLÍTICA': { title: 'title-politica', bar: 'bar-politica', tint: 'politica' },
      'PIRIPIRI': { title: 'title-politica', bar: 'bar-politica', tint: 'politica' }, // Piripiri é política
      'ESPORTE': { title: 'title-esporte', bar: 'bar-esporte', tint: 'esporte' },
      'ENTRETENIMENTO': { title: 'title-entretenimento', bar: 'bar-entretenimento', tint: 'entretenimento' },
      'GERAL': { title: 'title-geral', bar: 'bar-geral', tint: 'geral' }
    };
    return categoryMap[category] || categoryMap['GERAL'];
  };

  const mainArticle = {
    id: 1,
    title: "Governador anuncia investimento de R$ 200 milhões em infraestrutura",
    subtitle: "Projetos incluem asfaltamento de estradas e construção de pontes no interior do estado",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=620&h=350&fit=crop"
  };

  const sideArticles = [
    {
      id: 2,
      title: "Operação policial prende 15 suspeitos em Teresina",
      subtitle: "Ação conjunta da Polícia Civil e Militar apreende drogas e armas",
      category: "POLÍCIA",
      chapeu: "EXCLUSIVO",
      image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=300&h=160&fit=crop"
    },
    {
      id: 3,
      title: "Prefeito de Piripiri anuncia investimentos em infraestrutura",
      subtitle: "Projetos incluem asfaltamento e iluminação pública",
      category: "PIRIPIRI",
      chapeu: "INVESTIMENTOS",
      image: "https://images.unsplash.com/photo-1495020689067-958852a7765e?w=300&h=160&fit=crop"
    },
    {
      id: 4,
      title: "Time de Pedro II vence campeonato regional",
      subtitle: "Equipe conquista título após final emocionante",
      category: "ESPORTE",
      chapeu: "CAMPEONATO",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=160&fit=crop"
    },
    {
      id: 5,
      title: "Festival de música em Brasileira atrai milhares",
      subtitle: "Evento cultural promove artistas locais",
      category: "ENTRETENIMENTO",
      chapeu: "FESTIVAL",
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=300&h=160&fit=crop"
    }
  ];

  return (
    <section className="bg-gray-50 py-6 font-body">
      <div className="container mx-auto px-4 max-w-[1250px]">
        <div className="grid grid-cols-1 lg:grid-cols-[620px_1fr] gap-6">
          {/* Notícia Principal */}
          <article className="bg-white bar-left bar-geral rounded-xl shadow-lg p-6 border-l-4 border-brand">
            <div className="w-full h-[400px] rounded-xl overflow-hidden mb-5 tint geral">
              <img 
                src={mainArticle.image}
                alt={mainArticle.title}
                className="w-full h-full object-cover"
                style={{ borderRadius: '12px' }}
              />
            </div>
            <h1 className="headline title-geral text-4xl md:text-5xl mb-4">
              {mainArticle.title}
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed font-rubik">
              {mainArticle.subtitle}
            </p>
          </article>

          {/* Grid de Notícias Laterais */}
          <div className="space-y-3">
            {/* Primeira linha - 2 notícias de cima */}
            <div className="grid grid-cols-2 gap-5">
              <Link to={`/artigo/${sideArticles[0].id}`} className="group">
                <article className={`bg-white overflow-hidden transition-shadow duration-300 bar-left ${getEditorialClasses(sideArticles[0].category).bar}`}>
                  <div className={`w-full h-36 rounded-xl overflow-hidden tint ${getEditorialClasses(sideArticles[0].category).tint}`}>
                    <img 
                      src={sideArticles[0].image}
                      alt={sideArticles[0].title}
                      className="w-full h-full object-cover"
                      style={{ borderRadius: '12px' }}
                    />
                  </div>
                  <div className="p-4 flex flex-col h-full">
                    <span className="tag mb-2">
                      {sideArticles[0].chapeu}
                    </span>
                    <h3 className={`headline ${getEditorialClasses(sideArticles[0].category).title} text-lg md:text-xl mb-2 flex-1`}>
                      {sideArticles[0].title}
                    </h3>
                    {sideArticles[0].subtitle && (
                      <p className="text-sm text-gray-600 leading-relaxed mt-auto font-rubik">
                        {sideArticles[0].subtitle}
                      </p>
                    )}
                  </div>
                </article>
              </Link>

              <Link to={`/artigo/${sideArticles[1].id}`} className="group">
                <article className={`bg-white overflow-hidden transition-shadow duration-300 bar-left ${getEditorialClasses(sideArticles[1].category).bar}`}>
                  <div className={`w-full h-36 rounded-xl overflow-hidden tint ${getEditorialClasses(sideArticles[1].category).tint}`}>
                    <img 
                      src={sideArticles[1].image}
                      alt={sideArticles[1].title}
                      className="w-full h-full object-cover"
                      style={{ borderRadius: '12px' }}
                    />
                  </div>
                  <div className="p-4 flex flex-col h-full">
                    <span className="tag mb-2">
                      {sideArticles[1].chapeu}
                    </span>
                    <h3 className={`headline ${getEditorialClasses(sideArticles[1].category).title} text-lg md:text-xl mb-2 flex-1`}>
                      {sideArticles[1].title}
                    </h3>
                    {sideArticles[1].subtitle && (
                      <p className="text-sm text-gray-600 leading-relaxed mt-auto font-rubik">
                        {sideArticles[1].subtitle}
                      </p>
                    )}
                  </div>
                </article>
              </Link>
            </div>

            {/* Linha separadora */}
            <div className="h-px bg-gray-200 my-2"></div>

            {/* Segunda linha - 2 notícias de baixo */}
            <div className="grid grid-cols-2 gap-5">
              <Link to={`/artigo/${sideArticles[2].id}`} className="group">
                <article className={`bg-white overflow-hidden transition-shadow duration-300 bar-left ${getEditorialClasses(sideArticles[2].category).bar}`}>
                  <div className={`w-full h-36 rounded-xl overflow-hidden tint ${getEditorialClasses(sideArticles[2].category).tint}`}>
                    <img 
                      src={sideArticles[2].image}
                      alt={sideArticles[2].title}
                      className="w-full h-full object-cover"
                      style={{ borderRadius: '12px' }}
                    />
                  </div>
                  <div className="p-4 flex flex-col h-full">
                    <span className="tag mb-2">
                      {sideArticles[2].chapeu}
                    </span>
                    <h3 className={`headline ${getEditorialClasses(sideArticles[2].category).title} text-lg md:text-xl mb-2 flex-1`}>
                      {sideArticles[2].title}
                    </h3>
                    {sideArticles[2].subtitle && (
                      <p className="text-sm text-gray-600 leading-relaxed mt-auto font-rubik">
                        {sideArticles[2].subtitle}
                      </p>
                    )}
                  </div>
                </article>
              </Link>

              <Link to={`/artigo/${sideArticles[3].id}`} className="group">
                <article className={`bg-white overflow-hidden transition-shadow duration-300 bar-left ${getEditorialClasses(sideArticles[3].category).bar}`}>
                  <div className={`w-full h-36 rounded-xl overflow-hidden tint ${getEditorialClasses(sideArticles[3].category).tint}`}>
                    <img 
                      src={sideArticles[3].image}
                      alt={sideArticles[3].title}
                      className="w-full h-full object-cover"
                      style={{ borderRadius: '12px' }}
                    />
                  </div>
                  <div className="p-4 flex flex-col h-full">
                    <span className="tag mb-2">
                      {sideArticles[3].chapeu}
                    </span>
                    <h3 className={`headline ${getEditorialClasses(sideArticles[3].category).title} text-lg md:text-xl mb-2 flex-1`}>
                      {sideArticles[3].title}
                    </h3>
                    {sideArticles[3].subtitle && (
                      <p className="text-sm text-gray-600 leading-relaxed mt-auto font-rubik">
                        {sideArticles[3].subtitle}
                      </p>
                    )}
                  </div>
                </article>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroGrid;