import React, { useEffect, useRef } from 'react';
import { ArrowLeft, Calendar, User, Share2, Bookmark, Facebook, Linkedin, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from './Header';
import BreakingBar from './BreakingBar';
import AudioPlayer from './AudioPlayer';
import AdBox from './AdBox';
import MostReadWidget from './MostReadWidget';
import RelatedWidget from './RelatedWidget';
import NewsletterCTA from './NewsletterCTA';

interface ArticleData {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  publishDate: string;
  category: string;
  image: string;
  content: string[];
  tags: string[];
  readTime: string;
  views: string;
}

interface ArticlePageProps {
  articleData?: ArticleData;
}

const ArticlePage: React.FC<ArticlePageProps> = ({ articleData }) => {
  const articleRef = useRef<HTMLDivElement>(null);

  // Efeito para animar destaque quando entrar na viewport
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const highlightedSpans = entry.target.querySelectorAll('span[class*="bg-red-200"]');
          highlightedSpans.forEach((span) => {
            span.classList.add('animate-highlight-pulse');
          });
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    if (articleRef.current) {
      observer.observe(articleRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Dados padrão caso não sejam fornecidos
  const defaultArticle: ArticleData = {
    id: "1",
    title: "Nova Política de Transporte Público em Teresina Promete Revolucionar Mobilidade Urbana",
    subtitle: "Sistema integrado de ônibus e metrô será implementado em 2024 com investimento de R$ 500 milhões",
    author: "Redação R10 Piauí",
    publishDate: "24 de janeiro de 2025",
    category: "EDITORIAIS",
    image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=600&fit=crop&crop=center",
    content: [
      "A Prefeitura de Teresina anunciou hoje uma nova política de transporte público que promete revolucionar a mobilidade urbana da capital piauiense. O projeto, que será implementado em 2024, representa um investimento de R$ 500 milhões e deve beneficiar mais de 800 mil usuários diários.",
      "### Principais Mudanças",
      "O novo sistema incluirá:",
      "• Integração completa entre ônibus e metrô",
      "• Aplicativo móvel para planejamento de rotas", 
      "• Cartão único para todos os transportes",
      "• Frota de ônibus elétricos",
      "• Estações modernizadas",
      "### Investimento Estratégico",
      "O prefeito Dr. Kleber Montezuma destacou a importância do projeto:",
      "> \"Este é um investimento histórico para Teresina. Vamos transformar completamente a experiência de transporte público na nossa cidade, tornando-a mais eficiente, sustentável e acessível para todos os cidadãos.\"",
      "### Benefícios Esperados",
      "A nova política deve reduzir o tempo de viagem em até 40%, além de diminuir significativamente a poluição ambiental. O sistema integrado permitirá que os usuários planejem suas rotas com antecedência através de um aplicativo móvel.",
      "### Cronograma de Implementação",
      "• Janeiro 2024: Início das obras de modernização",
      "• Março 2024: Lançamento do aplicativo móvel", 
      "• Junho 2024: Inauguração das primeiras estações",
      "• Dezembro 2024: Sistema totalmente operacional",
      "### Reação da População",
      "A população de Teresina recebeu a notícia com grande expectativa. Muitos moradores já enfrentam diariamente os desafios do transporte público atual e veem no novo sistema uma solução para seus problemas de mobilidade.",
      "### Próximos Passos",
      "A Prefeitura iniciará na próxima semana uma série de audiências públicas para ouvir sugestões da população e ajustar o projeto conforme necessário. O edital de licitação será publicado em fevereiro de 2024.",
      "💡 Informação Importante: Os usuários do transporte público atual não precisarão se preocupar com a transição, pois o cartão atual continuará funcionando até a implementação completa do novo sistema."
    ],
    tags: ["transporte público", "Teresina", "mobilidade urbana", "investimento", "prefeitura"],
    readTime: "8 min",
    views: "2.5k"
  };

  const article = articleData || defaultArticle;

  const relatedNews = [
    {
      title: "Ministério da Saúde amplia campanhas de prevenção ao câncer",
      category: "SAÚDE",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=150&h=100&fit=crop"
    },
    {
      title: "Número de casos de câncer aumenta 20% no último ano",
      category: "SAÚDE", 
      image: "https://images.unsplash.com/photo-1576671081837-49000212a370?w=150&h=100&fit=crop"
    },
    {
      title: "Nova tecnologia promete revolucionar tratamento oncológico",
      category: "TECNOLOGIA",
      image: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=150&h=100&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-body">
      <Header />
      <BreakingBar />
      
      <div className="bg-white">
        <div className="container mx-auto px-4 max-w-[1250px] py-6">
          <Link to="/" className="inline-flex items-center gap-2 text-brand hover:text-brand/80 transition-colors duration-300 mb-6">
            <ArrowLeft className="w-4 h-4" />
            <span className="font-medium">Voltar para Home</span>
          </Link>
        </div>
      </div>

      <article className="bg-white">
        <div className="container mx-auto px-4 max-w-[1250px] py-8">
          <div className="grid grid-cols-12 gap-8">
            {/* Share Bar */}
            <div className="col-span-1 hidden lg:block">
              <div className="sticky top-8">
                                <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-3">

                  <div className="space-y-2">
                    <button 
                      onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(article.title + ' - ' + window.location.href)}`, '_blank')}
                      className="w-10 h-10 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center"
                      title="Compartilhar no WhatsApp"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </button>
                    <button className="w-10 h-10 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
                      <Facebook className="w-4 h-4" />
                    </button>
                    <button className="w-10 h-10 bg-blue-800 text-white rounded-lg hover:bg-blue-900 transition-colors flex items-center justify-center">
                      <Linkedin className="w-4 h-4" />
                    </button>
                    <button className="w-10 h-10 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center">
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="border-t border-gray-200 pt-2 mt-2">
                    <button className="w-10 h-10 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center">
                      <Bookmark className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="col-span-12 lg:col-span-8">
              {/* Breadcrumb */}
              <nav className="text-sm text-gray-500 mb-6">
                <Link to="/" className="hover:text-brand">Home</Link>
                <span className="mx-2">•</span>
                <span className="text-brand font-medium">{article.category}</span>
              </nav>

              {/* Article Header */}
              <header className="mb-8">
                <div className="mb-4 flex items-center gap-3">
                  <span className="inline-block bg-red-600 text-white px-3 py-1 text-xs font-bold uppercase tracking-wide rounded">
                    EXCLUSIVO
                  </span>
                  <span className="inline-block bg-gray-600 text-white px-3 py-1 text-xs font-bold uppercase tracking-wide rounded">
                    {article.category}
                  </span>
                </div>
                
                <h1 className="text-3xl md:text-4xl font-black leading-tight text-neutral900 mb-4 font-poppins">
                  {article.title}
                </h1>
                
                <p className="text-xl text-gray-700 leading-relaxed mb-6 font-rubik">
                  {article.subtitle}
                </p>

                {/* Article Meta */}
                <div className="flex flex-wrap items-center gap-4 text-gray-500 text-sm border-b border-gray-200 pb-4">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    <span>Por <strong className="text-gray-700">{article.author}</strong></span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{article.publishDate}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>📖 {article.readTime} de leitura</span>
                  </div>
                </div>
              </header>

              {/* Audio Player */}
              <AudioPlayer content={`${article.title}. ${article.subtitle}. ${article.content.join(' ')}`} />

              {/* Reaction Bar */}
              <div className="mb-6 p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-700">Como você se sentiu?</span>
                  <div className="flex gap-1">
                    <button 
                      className="flex flex-col items-center px-2 py-1 bg-white rounded border hover:bg-green-50 transition-all duration-300 transform hover:scale-105 relative group"
                      title="Feliz"
                    >
                      <span className="text-sm">😊</span>
                      <span className="text-xs text-gray-500">15</span>
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        Feliz
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                      </div>
                    </button>
                    <button 
                      className="flex flex-col items-center px-2 py-1 bg-white rounded border hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 relative group"
                      title="Inspirado"
                    >
                      <span className="text-sm">😍</span>
                      <span className="text-xs text-gray-500">0</span>
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        Inspirado
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                      </div>
                    </button>
                    <button 
                      className="flex flex-col items-center px-2 py-1 bg-white rounded border hover:bg-yellow-50 transition-all duration-300 transform hover:scale-105 relative group"
                      title="Surpreso"
                    >
                      <span className="text-sm">😲</span>
                      <span className="text-xs text-gray-500">1</span>
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        Surpreso
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                      </div>
                    </button>
                    <button 
                      className="flex flex-col items-center px-2 py-1 bg-white rounded border hover:bg-orange-50 transition-all duration-300 transform hover:scale-105 relative group"
                      title="Preocupado"
                    >
                      <span className="text-sm">😟</span>
                      <span className="text-xs text-gray-500">0</span>
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        Preocupado
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                      </div>
                    </button>
                    <button 
                      className="flex flex-col items-center px-2 py-1 bg-white rounded border hover:bg-orange-50 transition-all duration-300 transform hover:scale-105 relative group"
                      title="Triste"
                    >
                      <span className="text-sm">😔</span>
                      <span className="text-xs text-gray-500">0</span>
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        Triste
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                      </div>
                    </button>
                    <button 
                      className="flex flex-col items-center px-2 py-1 bg-white rounded border hover:bg-red-50 transition-all duration-300 transform hover:scale-105 relative group"
                      title="Indignado"
                    >
                      <span className="text-sm">😡</span>
                      <span className="text-xs text-gray-500">0</span>
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        Indignado
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>



              {/* Article Image */}
              <figure className="mb-8">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-96 object-cover rounded-xl shadow-lg"
                />
              </figure>

              {/* Resumo em Tópicos */}
              <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 rounded-2xl max-w-2xl mx-auto">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <span className="text-blue-600 mr-2">📋</span>
                  Resumo da Notícia
                </h3>
                <div className="space-y-2">
                  <div className="flex items-start">
                    <span className="text-blue-600 font-bold mr-3 mt-1">•</span>
                    <span className="text-gray-800">Nova política de transporte público será implementada em Teresina</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-blue-600 font-bold mr-3 mt-1">•</span>
                    <span className="text-gray-800">Sistema integrado entre ônibus e metrô com investimento de R$ 500 milhões</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-blue-600 font-bold mr-3 mt-1">•</span>
                    <span className="text-gray-800">Projeto deve beneficiar mais de 800 mil usuários diários</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-blue-600 font-bold mr-3 mt-1">•</span>
                    <span className="text-gray-800">Implementação prevista para 2024 com cronograma detalhado</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-blue-600 font-bold mr-3 mt-1">•</span>
                    <span className="text-gray-800">Inclui aplicativo móvel e cartão único para todos os transportes</span>
                  </div>
                </div>
              </div>



              {/* Article Content */}
              <div ref={articleRef} className="prose prose-lg max-w-none">
                {article.content.map((paragraph, index) => {
                  // Renderizar diferentes tipos de conteúdo
                  if (paragraph.startsWith('### ')) {
                    // Subtítulo H3
                    return (
                      <h3 key={index} className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                        {paragraph.replace('### ', '')}
                      </h3>
                    );
                  } else if (paragraph.startsWith('> ')) {
                    // Citação
                    return (
                      <blockquote key={index} className="border-l-4 border-blue-500 pl-6 py-4 my-6 bg-blue-50 rounded-r-lg">
                        <p className="text-lg italic text-gray-800">
                          "{paragraph.replace('> ', '')}"
                        </p>
                        <cite className="text-sm text-gray-600 mt-2 block">
                          — Dr. Kleber Montezuma, Prefeito de Teresina
                        </cite>
                      </blockquote>
                    );
                  } else if (paragraph.startsWith('• ')) {
                    // Lista
                    return (
                      <div key={index} className="flex items-start mb-3">
                        <span className="text-blue-600 font-bold mr-3 mt-1">•</span>
                        <span className="text-gray-800 text-lg">{paragraph.replace('• ', '')}</span>
                      </div>
                    );
                  } else if (paragraph.includes('==') && paragraph.includes('==')) {
                    // Destaque simples
                    const highlightedText = paragraph.replace(/==(.*?)==/g, '<span class="bg-yellow-200 px-1 rounded">$1</span>');
                    return (
                      <p key={index} className="text-gray-800 leading-relaxed mb-6 text-lg" 
                         dangerouslySetInnerHTML={{ __html: highlightedText }} />
                    );
                  } else if (paragraph.includes('===') && paragraph.includes('===')) {
                    // Destaque animado
                    const highlightedText = paragraph.replace(/===(.*?)===/g, '<span class="bg-red-200 px-1 rounded border-2 border-red-400">$1</span>');
                    return (
                      <p key={index} className="text-gray-800 leading-relaxed mb-6 text-lg" 
                         dangerouslySetInnerHTML={{ __html: highlightedText }} />
                    );
                  } else if (paragraph.includes('💡')) {
                    // Caixa de informação
                    return (
                      <div key={index} className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6 rounded-r-lg">
                        <p className="text-gray-800 text-lg">
                          {paragraph}
                        </p>
                      </div>
                    );
                  } else {
                    // Parágrafo normal
                    return (
                      <p key={index} className="text-gray-800 leading-relaxed mb-6 text-lg">
                        {paragraph}
                      </p>
                    );
                  }
                })}
              </div>

              {/* Tags */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Tags:</h3>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Mobile Widgets */}
              <div className="lg:hidden mt-8 space-y-6">
                <AdBox />
                <RelatedWidget />
                <MostReadWidget />
                <NewsletterCTA />
              </div>
            </div>

            {/* Sidebar */}
            <aside className="col-span-3 hidden lg:flex flex-col gap-8">
              <AdBox />
              <MostReadWidget />
              <RelatedWidget />
              <NewsletterCTA />
            </aside>
          </div>
        </div>
      </article>

      {/* Related News */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-[1180px]">
          <h2 className="text-2xl font-black text-neutral900 mb-8 font-title">Notícias Relacionadas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedNews.map((news, index) => (
              <article key={index} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer group">
                <img 
                  src={news.image}
                  alt={news.title}
                  className="w-full h-40 object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-4">
                  <span className="text-gray-500 text-xs font-bold uppercase tracking-wide">
                    {news.category}
                  </span>
                  <h3 className="text-gray-900 font-bold mt-2 leading-tight group-hover:text-brand transition-colors duration-300">
                    {news.title}
                  </h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ArticlePage;