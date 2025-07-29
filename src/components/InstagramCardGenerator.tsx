import React, { useState } from 'react';
import { Camera, Instagram, Eye } from 'lucide-react';

const InstagramCardGenerator = () => {
  const [title, setTitle] = useState("");
  const [hat, setHat] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);

  async function generatePreview() {
    if (!title.trim()) {
      alert('Por favor, digite um título');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/api/social/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          title, 
          hat: hat || 'NOTÍCIA', 
          imageUrl: imageUrl || 'https://picsum.photos/1080/1350'
        })
      });
      
      const result = await response.json();
      
      if (result.ok) {
        setPreview(result.preview);
        if (!caption) {
          setCaption(`${title.slice(0, 100)}\n\nConfira mais em R10piaui.com\n\n#R10Piauí #Notícias #Piauí`);
        }
      } else {
        alert("Erro ao gerar preview: " + JSON.stringify(result.error));
      }
    } catch (error) {
      alert("Erro: " + error);
    } finally {
      setLoading(false);
    }
  }

  async function publishToInstagram() {
    if (!preview) {
      alert('Gere um preview primeiro');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/api/social/instagram/publish-new', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          title, 
          hat: hat || 'NOTÍCIA', 
          imageUrl: imageUrl || 'https://picsum.photos/1080/1350',
          caption 
        })
      });
      
      const result = await response.json();
      
      if (result.ok) {
        alert("✅ Publicado no Instagram com sucesso!");
        // Limpar formulário
        setTitle("");
        setHat("");
        setImageUrl("");
        setPreview(null);
        setCaption("");
      } else {
        alert("❌ Falha na publicação: " + JSON.stringify(result.error || result));
      }
    } catch (error) {
      alert("❌ Erro: " + error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
          <Instagram className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Gerador de Cards Instagram</h2>
          <p className="text-gray-600 text-sm">Crie e publique cards automaticamente</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Formulário */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Chapéu
            </label>
            <input 
              value={hat} 
              onChange={e => setHat(e.target.value)} 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" 
              placeholder="Ex.: POLÍCIA" 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Título *
            </label>
            <textarea 
              value={title} 
              onChange={e => setTitle(e.target.value)} 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" 
              rows={3} 
              placeholder="Digite o título da notícia"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              URL da Imagem
            </label>
            <input 
              value={imageUrl} 
              onChange={e => setImageUrl(e.target.value)} 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" 
              placeholder="https://exemplo.com/imagem.jpg" 
            />
          </div>

          <div className="flex gap-3">
            <button 
              onClick={generatePreview} 
              disabled={loading || !title.trim()}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
              ) : (
                <Eye className="w-4 h-4" />
              )}
              {loading ? "Gerando..." : "Gerar Preview"}
            </button>
            
            <button 
              onClick={publishToInstagram} 
              disabled={loading || !preview}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
              ) : (
                <Instagram className="w-4 h-4" />
              )}
              {loading ? "Publicando..." : "Publicar"}
            </button>
          </div>
        </div>

        {/* Preview */}
        <div className="space-y-4">
          {preview ? (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Preview do Card</h3>
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <img 
                  src={preview} 
                  alt="Preview do card" 
                  className="w-64 mx-auto rounded-lg shadow-lg" 
                />
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Legenda
                </label>
                <textarea 
                  value={caption} 
                  onChange={e => setCaption(e.target.value)} 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" 
                  rows={3} 
                />
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Preencha o título e clique em "Gerar Preview" para ver o card</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InstagramCardGenerator; 