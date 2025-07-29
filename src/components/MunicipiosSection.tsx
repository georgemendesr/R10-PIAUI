import React from 'react';
import { MapPin, AlertTriangle } from 'lucide-react';

const MunicipiosSection = () => {
  // Função para aplicar cores das editorias
  const getCategoryTitleColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'POLÍCIA': 'text-ed-policia',
      'POLÍTICA': 'text-ed-politica',
      'ESPORTE': 'text-ed-esporte',
      'ENTRETENIMENTO': 'text-ed-entretenimento',
      'GERAL': 'text-ed-geral',
      'ECONOMIA': 'text-ed-geral',
      'CULTURA': 'text-ed-entretenimento',
      'TECNOLOGIA': 'text-ed-geral',
      'MEIO AMBIENTE': 'text-ed-geral',
      'TURISMO': 'text-ed-geral'
    };
    return colors[category] || 'text-ed-geral';
  };

  const municipios = [
    {
      id: 1,
      nome: "PEDRO II",
      categoria: "GERAL",
      noticiaPrincipal: {
        title: "Prefeito de Pedro II anuncia investimento de R$ 15 milhões em infraestrutura",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=250&fit=crop"
      },
      noticiasSecundarias: [
        "Escola municipal recebe novos equipamentos de informática",
        "Feira de artesanato atrai turistas de toda região"
      ]
    },
    {
      id: 2,
      nome: "CAMPO MAIOR",
      categoria: "ECONOMIA",
      noticiaPrincipal: {
        title: "Campo Maior sedia encontro regional de agricultores",
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=250&fit=crop"
      },
      noticiasSecundarias: [
        "Cooperativa local exporta produtos para outros estados",
        "Festival de cultura popular reúne milhares de pessoas"
      ]
    },
    {
      id: 3,
      nome: "BARRAS",
      categoria: "CULTURA",
      noticiaPrincipal: {
        title: "Barras celebra 150 anos com programação cultural especial",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=250&fit=crop"
      },
      noticiasSecundarias: [
        "Museu histórico recebe exposição temporária",
        "Projeto de turismo rural é lançado"
      ]
    },
    {
      id: 4,
      nome: "ESPERANTINA",
      categoria: "TECNOLOGIA",
      noticiaPrincipal: {
        title: "Esperantina investe em tecnologia para modernizar gestão pública",
        image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=250&fit=crop"
      },
      noticiasSecundarias: [
        "Parque municipal é revitalizado",
        "Programa de capacitação profissional é iniciado"
      ]
    },
    {
      id: 5,
      nome: "BATALHA",
      categoria: "MEIO AMBIENTE",
      noticiaPrincipal: {
        title: "Batalha promove semana de conscientização ambiental",
        image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=400&h=250&fit=crop"
      },
      noticiasSecundarias: [
        "Projeto de reciclagem é implementado",
        "Escola municipal ganha prêmio de sustentabilidade"
      ]
    },
    {
      id: 6,
      nome: "BRASILEIRA",
      categoria: "TURISMO",
      noticiaPrincipal: {
        title: "Brasileira recebe investimento em turismo histórico",
        image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=400&h=250&fit=crop"
      },
      noticiasSecundarias: [
        "Centro histórico é restaurado",
        "Roteiro turístico é criado"
      ]
    }
  ];

  return (
    <section className="bg-white py-8 font-body">
      <div className="container mx-auto px-4 max-w-[1250px]">
        {/* Título da Seção */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <MapPin className="w-6 h-6 text-brand" />
            <h2 className="text-2xl font-black text-neutral900 tracking-wider font-title">
              MUNICÍPIOS
            </h2>
            <MapPin className="w-6 h-6 text-brand" />
          </div>
          <div className="w-16 h-1 bg-gradient-to-r from-brand to-accent mx-auto mb-4"></div>
          <div className="w-full border-t border-gray-200"></div>
        </div>

        

        {/* Grid de Municípios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {municipios.map((municipio, index) => (
            <article 
              key={municipio.id} 
              className="group cursor-pointer bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
            >
                             {/* Cabeçalho do Município */}
               <div className="bg-gradient-to-r from-brand to-brand/80 p-4">
                 <div className="flex items-center justify-between">
                   <h3 className="text-lg font-bold text-white uppercase tracking-wide">
                     {municipio.nome}
                   </h3>
                 </div>
               </div>

              {/* Conteúdo Principal */}
              <div className="p-4">
                {/* Notícia Principal */}
                <div className="mb-4">
                  <div className="relative overflow-hidden rounded-lg mb-3">
                    <img 
                      src={municipio.noticiaPrincipal.image}
                      alt={municipio.noticiaPrincipal.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                                     <h4 className={`text-base font-bold leading-tight line-clamp-2 ${getCategoryTitleColor(municipio.categoria)}`}>
                     {municipio.noticiaPrincipal.title}
                   </h4>
                </div>

                                 {/* Notícias Secundárias */}
                 <div className="space-y-2">
                   {municipio.noticiasSecundarias.map((noticia, idx) => (
                     <div key={idx} className="flex items-start gap-2">
                       <div className="w-1.5 h-1.5 bg-brand rounded-full mt-2 flex-shrink-0"></div>
                       <p className="text-sm text-gray-700 leading-relaxed line-clamp-2 font-medium">
                         {noticia}
                       </p>
                     </div>
                   ))}
                 </div>

                {/* Botão Ver Mais */}
                <div className="mt-4 pt-3 border-t border-gray-100">
                  <button className="w-full h-10 text-center text-sm font-medium text-brand hover:text-brand/80 transition-colors bg-gray-50 hover:bg-gray-100 rounded-lg">
                    Ver todas as notícias de {municipio.nome}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MunicipiosSection; 