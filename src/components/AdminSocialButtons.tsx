import { useState } from 'react';

interface AdminSocialButtonsProps {
  post: {
    id: string;
    titulo: string;
    chapeu?: string;
    imagemPrincipal?: string;
    categoria?: string;
    subcategorias?: string[];
    dataPublicacao?: string;
  };
  compact?: boolean;
}

export default function AdminSocialButtons({ post, compact = false }: AdminSocialButtonsProps) {
  const [gen, setGen] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [loadingType, setLoadingType] = useState<'card' | 'story' | null>(null);

  async function handleGenerate(type: 'card' | 'story') {
    setLoading(true);
    setLoadingType(type);
    
    try {
      console.log(`🎨 Gerando ${type} para:`, post.titulo);
      
      // Chamar o servidor real na porta 8080
      const response = await fetch('http://localhost:8080/api/social/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: post.titulo,
          hat: post.chapeu || 'NOTÍCIA', // Usar o chapéu real, não a categoria
          imageUrl: post.imagemPrincipal || 'https://picsum.photos/1080/1350',
          categoria: post.categoria || 'geral', // Enviar categoria para definir cor da barra
          subcategoria: post.subcategorias?.[0] || post.categoria, // Enviar primeira subcategoria
          type: type // Enviar o tipo (card ou story)
        })
      });
      
      const data = await response.json();
      
      if (response.ok && data.ok) {
        setGen(data);
        console.log(`✅ ${type} gerado com sucesso!`, data);
        console.log('Preview URL:', data.preview);
      } else {
        throw new Error(data.message || `Erro ao gerar ${type}`);
      }
      
    } catch (error) {
      console.error(`❌ Erro ao gerar ${type}:`, error);
      alert(`❌ Erro ao gerar ${type}: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setLoading(false);
      setLoadingType(null);
    }
  }

  async function handlePublish(type: 'feed' | 'story') {
    if (!gen || !gen.preview) {
      alert('❌ Primeiro gere uma imagem antes de publicar!');
      return;
    }
    
    try {
      setLoading(true);
      setLoadingType(type);
      
      console.log('📱 Publicando no Instagram...');
      const result = await socialPublish(type, gen.preview, post);
      
      console.log('✅ Resultado:', result);
      alert(result.message || '✅ Publicado no Instagram com sucesso!');
      
    } catch (error) {
      console.error('❌ Erro ao publicar:', error);
      alert(`❌ Erro ao publicar: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
    } finally {
      setLoading(false);
      setLoadingType(null);
    }
  }

  // Layout compacto para tabela
  if (compact) {
    return (
      <div className="flex flex-col gap-1" data-e2e="social-admin">
        <button 
          onClick={() => handleGenerate('card')}
          disabled={loading}
          className="px-2 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 disabled:opacity-50 w-full"
          title="Gerar card para feed"
        >
          {loading && loadingType === 'card' ? '...' : 'CARD'}
        </button>

        <button 
          onClick={() => handleGenerate('story')}
          disabled={loading}
          className="px-2 py-1 bg-purple-600 text-white rounded text-xs hover:bg-purple-700 disabled:opacity-50 w-full"
          title="Gerar story"
        >
          {loading && loadingType === 'story' ? '...' : 'STORY'}
        </button>
        
        <button 
          onClick={() => handlePublish('feed')}
          disabled={!gen || loading}
          className="px-2 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700 disabled:opacity-50 w-full"
          title="Publicar no feed do Instagram"
        >
          {loading && loadingType === 'feed' ? '...' : 'PUBLICAR'}
        </button>

        {gen && gen.preview && (
          <div 
            className="w-full h-12 bg-cover bg-center border rounded cursor-pointer mt-1"
            style={{ backgroundImage: `url(${gen.preview})` }}
            onClick={() => {
              const newWindow = window.open();
              if (newWindow) {
                newWindow.document.write(`
                  <html>
                    <head><title>Imagem Gerada - ${post.titulo}</title></head>
                    <body style="margin:0; background:#000; display:flex; justify-content:center; align-items:center; min-height:100vh;">
                      <img src="${gen.preview}" style="max-width:100%; max-height:100vh;" alt="Imagem gerada"/>
                    </body>
                  </html>
                `);
              }
            }}
            title="Clique para ver em tamanho real"
          />
        )}
      </div>
    );
  }

  // Layout normal (completo)
  return (
    <div className="flex gap-2 flex-wrap items-center" data-e2e="social-admin">
      {/* Status do servidor - apenas ícone */}
      <div className="text-xs text-green-600" title="Servidor conectado">
        🟢
      </div>
      
      <button 
        onClick={() => handleGenerate('card')}
        disabled={loading}
        className="px-3 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 disabled:opacity-50"
      >
        {loading && loadingType === 'card' ? '🔄 Gerando...' : 'CARD'}
      </button>

      <button 
        onClick={() => handleGenerate('story')}
        disabled={loading}
        className="px-3 py-2 bg-purple-600 text-white rounded-md text-sm hover:bg-purple-700 disabled:opacity-50"
      >
        {loading && loadingType === 'story' ? '🔄 Gerando...' : 'STORY'}
      </button>
      
      <button 
        onClick={() => handlePublish('feed')}
        disabled={!gen || loading}
        className="px-3 py-2 bg-green-600 text-white rounded-md text-sm hover:bg-green-700 disabled:opacity-50"
      >
        {loading && loadingType === 'feed' ? '🔄 Publicando...' : 'PUBLICAR'}
      </button>

      {gen && (
        <div className="flex gap-2 items-center">
          {gen.preview ? (
            <>
              <div className="text-xs text-green-600">
                ✅ Imagem gerada!
              </div>
              <div className="relative group">
                <img 
                  src={gen.preview} 
                  alt="Preview da imagem gerada" 
                  className="w-20 h-24 object-cover border-2 border-gray-300 rounded cursor-pointer hover:border-blue-500 transition-all shadow-md"
                  title="Clique para ver em tamanho real"
                  onClick={() => {
                    const newWindow = window.open();
                    if (newWindow) {
                      newWindow.document.write(`
                        <html>
                          <head><title>Imagem Gerada - ${post.titulo}</title></head>
                          <body style="margin:0; background:#000; display:flex; justify-content:center; align-items:center; min-height:100vh;">
                            <img src="${gen.preview}" style="max-width:100%; max-height:100vh;" alt="Imagem gerada"/>
                          </body>
                        </html>
                      `);
                    }
                  }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded">
                  <span className="text-white text-xs font-semibold">Ver maior</span>
                </div>
              </div>
            </>
          ) : (
            <div className="text-xs text-yellow-600">
              ⚠️ Imagem gerada mas sem preview (verifique o console)
            </div>
          )}
        </div>
      )}
    </div>
  );
} 