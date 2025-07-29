import React from 'react';
import { Link } from 'react-router-dom';

const MostReadWidget: React.FC = () => {
  const mostReadPosts = [
    {
      id: "1",
      title: "Governador anuncia investimento de R$ 500 milhões em infraestrutura",
      views: 15420
    },
    {
      id: "2", 
      title: "Nova tecnologia promete revolucionar tratamento de câncer no estado",
      views: 12350
    },
    {
      id: "3",
      title: "Ministério da Saúde amplia campanhas de prevenção em Minas Gerais",
      views: 9870
    },
    {
      id: "4",
      title: "Número de casos de dengue diminui 30% no último trimestre",
      views: 8450
    },
    {
      id: "5",
      title: "Educação: novas escolas serão construídas em 15 municípios",
      views: 7230
    }
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 text-gray-800" style={{ fontFamily: 'Rubik, sans-serif', fontWeight: 600 }}>
        MAIS LIDAS
      </h3>
      <div className="space-y-3">
        {mostReadPosts.map((post, index) => (
          <Link 
            key={post.id}
            to={`/artigo/${post.id}`}
            className="block group"
          >
            <div className="flex items-start gap-3">
              <span className="text-brand font-bold text-lg leading-none">{index + 1}</span>
              <p className="text-xs text-gray-700 leading-relaxed line-clamp-2 group-hover:text-brand transition-colors">
                {post.title}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MostReadWidget;