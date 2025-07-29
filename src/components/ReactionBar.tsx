import React, { useState, useEffect } from 'react';

interface ReactionBarProps {
  articleId: string;
}

interface ReactionCounts {
  feliz: number;
  inspirado: number;
  surpreso: number;
  preocupado: number;
  triste: number;
  indignado: number;
}

const reactions = [
  { key: 'feliz', emoji: '😀', label: 'Feliz' },
  { key: 'inspirado', emoji: '🤩', label: 'Inspirado' },
  { key: 'surpreso', emoji: '😲', label: 'Surpreso' },
  { key: 'preocupado', emoji: '😟', label: 'Preocupado' },
  { key: 'triste', emoji: '😔', label: 'Triste' },
  { key: 'indignado', emoji: '😡', label: 'Indignado' }
];

const ReactionBar: React.FC<ReactionBarProps> = ({ articleId }) => {
  const [counts, setCounts] = useState<ReactionCounts>({
    feliz: 8,
    inspirado: 12,
    surpreso: 3,
    preocupado: 15,
    triste: 2,
    indignado: 5
  });
  
  const [userReaction, setUserReaction] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    // Verificar se usuário já reagiu
    const savedReaction = localStorage.getItem(`r10_rx_${articleId}`);
    if (savedReaction) {
      setUserReaction(savedReaction);
      setShowResult(true);
    }
  }, [articleId]);

  const handleReaction = (emotionKey: string) => {
    if (userReaction) return; // Já reagiu

    // Simular incremento (em produção seria uma API call)
    setCounts(prev => ({
      ...prev,
      [emotionKey]: prev[emotionKey as keyof ReactionCounts] + 1
    }));

    // Salvar reação do usuário
    localStorage.setItem(`r10_rx_${articleId}`, emotionKey);
    setUserReaction(emotionKey);
    setShowResult(true);

    // Analytics (se disponível)
    if (typeof window !== 'undefined' && (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag) {
      (window as unknown as { gtag: (...args: unknown[]) => void }).gtag('event', 'reaction_click', {
        post_id: articleId,
        emotion: emotionKey
      });
    }
  };

  const getMajorityEmotion = () => {
    const entries = Object.entries(counts) as [keyof ReactionCounts, number][];
    const max = entries.reduce((a, b) => a[1] > b[1] ? a : b);
    const reaction = reactions.find(r => r.key === max[0]);
    return reaction?.label || 'Feliz';
  };

  const getTotalReactions = () => {
    return Object.values(counts).reduce((sum, count) => sum + count, 0);
  };

  return (
    <div className="my-8 p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-200" data-e2e="reaction-bar">
      <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">
        Como esta notícia te fez sentir?
      </h3>
      
      {/* Botões de reação */}
      <div className="flex gap-2 md:gap-4 flex-wrap justify-center mb-4">
        {reactions.map((reaction) => (
          <button
            key={reaction.key}
            onClick={() => handleReaction(reaction.key)}
            disabled={!!userReaction}
            aria-label={`Reagir com ${reaction.label}`}
            data-e2e={`rx-${reaction.key}`}
            className={`flex flex-col items-center gap-1 cursor-pointer text-xs md:text-sm p-2 rounded-lg transition-all duration-300 ${
              userReaction === reaction.key 
                ? 'bg-brand/10 border-2 border-brand scale-110' 
                : userReaction 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:bg-white hover:shadow-md hover:scale-105'
            }`}
          >
            <span className="text-3xl md:text-4xl" aria-hidden="true">{reaction.emoji}</span>
            <span className="font-medium text-gray-700">{reaction.label}</span>
            <span className="text-[10px] text-gray-500 font-bold">
              {counts[reaction.key as keyof ReactionCounts]}
            </span>
            <span className="sr-only">{reaction.label}</span>
          </button>
        ))}
      </div>

      {/* Resultado */}
      {showResult && (
        <div className="text-center space-y-2">
          <p className="text-sm font-medium text-brand">
            A maioria ficou {getMajorityEmotion()}.
          </p>
          <div className="flex justify-center items-center gap-2 text-xs text-gray-500">
            {reactions.map((reaction) => (
              <span key={reaction.key} className="flex items-center gap-1">
                <span className="text-base" aria-hidden="true">{reaction.emoji}</span>
                <span>{counts[reaction.key as keyof ReactionCounts]}</span>
              </span>
            ))}
            <span className="ml-2 font-bold">• Total: {getTotalReactions()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReactionBar;