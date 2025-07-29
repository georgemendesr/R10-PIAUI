import React from 'react';
import { Link } from 'react-router-dom';

const RelatedWidget: React.FC = () => {
  const relatedPosts = [
    {
      id: "2",
      title: "Ministério da Saúde amplia campanhas de prevenção ao câncer"
    },
    {
      id: "3", 
      title: "Número de casos de câncer aumenta 20% no último ano"
    },
    {
      id: "4",
      title: "Nova tecnologia promete revolucionar tratamento oncológico"
    },
    {
      id: "5",
      title: "Especialistas alertam para importância da detecção precoce"
    }
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 text-gray-800" style={{ fontFamily: 'Rubik, sans-serif', fontWeight: 600 }}>
        RELACIONADAS
      </h3>
      <div className="space-y-3">
        {relatedPosts.map((post) => (
          <Link 
            key={post.id}
            to={`/artigo/${post.id}`}
            className="block group"
          >
            <div className="flex items-start gap-2">
              <span className="text-brand text-xs mt-1">•</span>
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

export default RelatedWidget;