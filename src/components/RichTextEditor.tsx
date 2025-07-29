import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Bold, Italic, Underline, Heading3, Quote, Lightbulb, 
  List, SeparatorHorizontal, Highlighter, Sparkles, AlignJustify,
  Image, Video, X, Upload, Link, AlignLeft, AlignCenter, AlignRight,
  Undo, Redo
} from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

interface HistoryState {
  content: string;
  timestamp: number;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ 
  value, 
  onChange, 
  placeholder = "Digite o conteúdo da matéria aqui..." 
}) => {
  const [showImageModal, setShowImageModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [imageAlt, setImageAlt] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [videoTitle, setVideoTitle] = useState('');
  const [history, setHistory] = useState<HistoryState[]>([{ content: value, timestamp: Date.now() }]);
  const [historyIndex, setHistoryIndex] = useState(0);
  
  const editorRef = useRef<HTMLDivElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  // Adicionar ao histórico
  const addToHistory = useCallback((content: string) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push({ content, timestamp: Date.now() });
    
    // Manter apenas os últimos 50 estados
    if (newHistory.length > 50) {
      newHistory.shift();
    } else {
      setHistoryIndex(prev => prev + 1);
    }
    
    setHistory(newHistory);
  }, [history, historyIndex]);

  // Desfazer (Ctrl+Z)
  const undo = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      onChange(history[newIndex].content);
    }
  }, [historyIndex, history, onChange]);

  // Refazer (Ctrl+Y)
  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      onChange(history[newIndex].content);
    }
  }, [historyIndex, history, onChange]);

  // Detectar atalhos de teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'z':
            e.preventDefault();
            if (e.shiftKey) {
              redo();
            } else {
              undo();
            }
            break;
          case 'y':
            e.preventDefault();
            redo();
            break;
          case 'b':
            e.preventDefault();
            applyFormat('bold');
            break;
          case 'i':
            e.preventDefault();
            applyFormat('italic');
            break;
          case 'u':
            e.preventDefault();
            applyFormat('underline');
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo]);

  // Aplicar formatação
  const applyFormat = (format: string) => {
    if (!editorRef.current) return;
    
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    const selectedText = selection.toString();
    
    if (selectedText.length === 0 && !['separator', 'justify-left', 'justify-center', 'justify-right', 'justify-full'].includes(format)) return;

    let newContent = value;
    const start = getSelectionStart();
    const end = getSelectionEnd();

    switch (format) {
      case 'bold':
        newContent = replaceSelection(`**${selectedText}**`);
        break;
      case 'italic':
        newContent = replaceSelection(`*${selectedText}*`);
        break;
      case 'underline':
        newContent = replaceSelection(`<u>${selectedText}</u>`);
        break;
      case 'h3':
        newContent = replaceSelection(`\n### ${selectedText}\n`);
        break;
      case 'quote':
        newContent = replaceSelection(`\n> ${selectedText}\n`);
        break;
      case 'list':
        newContent = replaceSelection(`\n• ${selectedText}\n`);
        break;
      case 'highlight-simple':
        newContent = replaceSelection(`<mark class="highlight-simple">${selectedText}</mark>`);
        break;
      case 'highlight-animated':
        newContent = replaceSelection(`<mark class="highlight-animated">${selectedText}</mark>`);
        break;
      case 'info':
        newContent = replaceSelection(`\n<div class="info-box">💡 **${selectedText}**</div>\n`);
        break;
      case 'separator':
        newContent = replaceSelection(`\n<hr class="separator" />\n`);
        break;
      case 'justify-left':
        newContent = replaceSelection(`<div class="text-left">${selectedText}</div>`);
        break;
      case 'justify-center':
        newContent = replaceSelection(`<div class="text-center">${selectedText}</div>`);
        break;
      case 'justify-right':
        newContent = replaceSelection(`<div class="text-right">${selectedText}</div>`);
        break;
      case 'justify-full':
        newContent = replaceSelection(`<div class="text-justify">${selectedText}</div>`);
        break;
      default:
        return;
    }

    onChange(newContent);
    addToHistory(newContent);
    
    // Restaurar foco
    setTimeout(() => {
      if (editorRef.current) {
        editorRef.current.focus();
      }
    }, 10);
  };

  // Substituir seleção
  const replaceSelection = (replacement: string) => {
    const start = getSelectionStart();
    const end = getSelectionEnd();
    
    return value.substring(0, start) + replacement + value.substring(end);
  };

  // Obter início da seleção
  const getSelectionStart = () => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return value.length;
    
    const range = selection.getRangeAt(0);
    const preCaretRange = range.cloneRange();
    preCaretRange.selectNodeContents(editorRef.current!);
    preCaretRange.setEnd(range.startContainer, range.startOffset);
    
    return preCaretRange.toString().length;
  };

  // Obter fim da seleção
  const getSelectionEnd = () => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return value.length;
    
    const range = selection.getRangeAt(0);
    const preCaretRange = range.cloneRange();
    preCaretRange.selectNodeContents(editorRef.current!);
    preCaretRange.setEnd(range.endContainer, range.endOffset);
    
    return preCaretRange.toString().length;
  };

  // Inserir imagem
  const insertImage = () => {
    if (!imageUrl.trim()) return;
    
    const imageMarkdown = `\n<div class="image-container"><img src="${imageUrl}" alt="${imageAlt || 'Imagem'}" class="max-w-full h-auto rounded-lg border border-gray-200" /></div>\n`;
    const cursorPosition = getSelectionStart();
    const before = value.substring(0, cursorPosition);
    const after = value.substring(cursorPosition);
    
    const newContent = before + imageMarkdown + after;
    onChange(newContent);
    addToHistory(newContent);
    
    setShowImageModal(false);
    setImageUrl('');
    setImageAlt('');
  };

  // Inserir vídeo
  const insertVideo = () => {
    if (!videoUrl.trim()) return;
    
    const videoMarkdown = `\n<div class="video-container"><div class="video-title">🎥 <strong>${videoTitle || 'Vídeo'}</strong></div><div class="video-url">${videoUrl}</div></div>\n`;
    const cursorPosition = getSelectionStart();
    const before = value.substring(0, cursorPosition);
    const after = value.substring(cursorPosition);
    
    const newContent = before + videoMarkdown + after;
    onChange(newContent);
    addToHistory(newContent);
    
    setShowVideoModal(false);
    setVideoUrl('');
    setVideoTitle('');
  };

  // Upload de imagem
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setImageUrl(result);
    };
    reader.readAsDataURL(file);
  };

  // Upload de vídeo
  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setVideoUrl(result);
    };
    reader.readAsDataURL(file);
  };

  // Renderizar conteúdo formatado
  const renderFormattedContent = (content: string) => {
    let formattedContent = content
      // Aplicar formatações markdown
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/### (.*?)(?=\n|$)/g, '<h3 class="text-lg font-semibold text-gray-900 my-3">$1</h3>')
      .replace(/> (.*?)(?=\n|$)/g, '<blockquote class="border-l-4 border-blue-500 pl-4 py-2 bg-blue-50 text-blue-900 my-2">$1</blockquote>')
      .replace(/• (.*?)(?=\n|$)/g, '<li class="ml-4 my-1">$1</li>')
      .replace(/\n/g, '<br>');

    return formattedContent;
  };

  // Lidar com mudanças no editor
  const handleEditorChange = () => {
    if (!editorRef.current) return;
    
    const newContent = editorRef.current.innerText;
    onChange(newContent);
    
    // Adicionar ao histórico com debounce
    const timeoutId = setTimeout(() => {
      addToHistory(newContent);
    }, 1000);

    return () => clearTimeout(timeoutId);
  };

  return (
    <div className="space-y-3">
      {/* Toolbar */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
        <div className="flex items-center space-x-1 flex-wrap gap-2">
          <span className="text-xs font-semibold text-gray-600 mr-2">Formatação:</span>
          
          {/* Desfazer/Refazer */}
          <button
            onClick={undo}
            disabled={historyIndex <= 0}
            className="p-2 hover:bg-white rounded transition-colors border border-transparent hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Desfazer (Ctrl+Z)"
            aria-label="Desfazer (Ctrl+Z)"
          >
            <Undo className="w-4 h-4" aria-hidden="true" />
          </button>
          <button
            onClick={redo}
            disabled={historyIndex >= history.length - 1}
            className="p-2 hover:bg-white rounded transition-colors border border-transparent hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Refazer (Ctrl+Y)"
            aria-label="Refazer (Ctrl+Y)"
          >
            <Redo className="w-4 h-4" aria-hidden="true" />
          </button>
          
          <div className="w-px h-6 bg-gray-300 mx-1"></div>
          
          {/* Formatação básica */}
          <button
            onClick={() => applyFormat('bold')}
            className="p-2 hover:bg-white rounded transition-colors border border-transparent hover:border-gray-300"
            title="Negrito (Ctrl+B)"
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            onClick={() => applyFormat('italic')}
            className="p-2 hover:bg-white rounded transition-colors border border-transparent hover:border-gray-300"
            title="Itálico (Ctrl+I)"
          >
            <Italic className="w-4 h-4" />
          </button>
          <button
            onClick={() => applyFormat('underline')}
            className="p-2 hover:bg-white rounded transition-colors border border-transparent hover:border-gray-300"
            title="Sublinhado (Ctrl+U)"
          >
            <Underline className="w-4 h-4" />
          </button>
          
          <div className="w-px h-6 bg-gray-300 mx-1"></div>
          
          {/* Alinhamento */}
          <button
            onClick={() => applyFormat('justify-left')}
            className="p-2 hover:bg-white rounded transition-colors border border-transparent hover:border-gray-300"
            title="Alinhar à Esquerda"
          >
            <AlignLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => applyFormat('justify-center')}
            className="p-2 hover:bg-white rounded transition-colors border border-transparent hover:border-gray-300"
            title="Centralizar"
          >
            <AlignCenter className="w-4 h-4" />
          </button>
          <button
            onClick={() => applyFormat('justify-right')}
            className="p-2 hover:bg-white rounded transition-colors border border-transparent hover:border-gray-300"
            title="Alinhar à Direita"
          >
            <AlignRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => applyFormat('justify-full')}
            className="p-2 hover:bg-white rounded transition-colors border border-transparent hover:border-gray-300"
            title="Justificar Texto"
          >
            <AlignJustify className="w-4 h-4" />
          </button>
          
          <div className="w-px h-6 bg-gray-300 mx-1"></div>
          
          {/* Elementos estruturais */}
          <button
            onClick={() => applyFormat('h3')}
            className="p-2 hover:bg-white rounded transition-colors border border-transparent hover:border-gray-300"
            title="Subtítulo H3"
          >
            <Heading3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => applyFormat('quote')}
            className="p-2 hover:bg-white rounded transition-colors border border-transparent hover:border-gray-300"
            title="Citação"
          >
            <Quote className="w-4 h-4" />
          </button>
          <button
            onClick={() => applyFormat('list')}
            className="p-2 hover:bg-white rounded transition-colors border border-transparent hover:border-gray-300"
            title="Lista"
          >
            <List className="w-4 h-4" />
          </button>
          
          <div className="w-px h-6 bg-gray-300 mx-1"></div>
          
          {/* Destaques */}
          <button
            onClick={() => applyFormat('highlight-simple')}
            className="p-2 hover:bg-white rounded transition-colors border border-transparent hover:border-gray-300"
            title="Destaque Simples"
          >
            <Highlighter className="w-4 h-4 text-yellow-600" />
          </button>
          <button
            onClick={() => applyFormat('highlight-animated')}
            className="p-2 hover:bg-white rounded transition-colors border border-transparent hover:border-gray-300"
            title="Destaque Animado"
          >
            <Sparkles className="w-4 h-4 text-red-500" />
          </button>
          
          <div className="w-px h-6 bg-gray-300 mx-1"></div>
          
          {/* Mídia */}
          <button
            onClick={() => setShowImageModal(true)}
            className="p-2 hover:bg-white rounded transition-colors border border-transparent hover:border-gray-300"
            title="Inserir Imagem"
            aria-label="Inserir Imagem"
          >
            <Image className="w-4 h-4 text-blue-600" aria-hidden="true" />
          </button>
          <button
            onClick={() => setShowVideoModal(true)}
            className="p-2 hover:bg-white rounded transition-colors border border-transparent hover:border-gray-300"
            title="Inserir Vídeo"
            aria-label="Inserir Vídeo"
          >
            <Video className="w-4 h-4 text-purple-600" aria-hidden="true" />
          </button>
          
          <div className="w-px h-6 bg-gray-300 mx-1"></div>
          
          {/* Extras */}
          <button
            onClick={() => applyFormat('info')}
            className="p-2 hover:bg-white rounded transition-colors border border-transparent hover:border-gray-300"
            title="Caixa de Informação"
          >
            <Lightbulb className="w-4 h-4" />
          </button>
          <button
            onClick={() => applyFormat('separator')}
            className="p-2 hover:bg-white rounded transition-colors border border-transparent hover:border-gray-300"
            title="Separador"
          >
            <SeparatorHorizontal className="w-4 h-4" />
          </button>
        </div>
        
        <div className="mt-2 text-xs text-gray-500">
          💡 <strong>Dica:</strong> Selecione o texto e clique nos botões para formatar. Use Ctrl+Z para desfazer e Ctrl+Y para refazer.
        </div>
      </div>

      {/* Editor */}
      <div className="relative">
        <div
          ref={editorRef}
          contentEditable
          className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent min-h-64 resize-none outline-none bg-white prose prose-sm max-w-none"
          style={{ fontSize: '15px', lineHeight: '1.6' }}
          onInput={handleEditorChange}
          dangerouslySetInnerHTML={{ __html: renderFormattedContent(value) }}
          suppressContentEditableWarning={true}
        />
        
        {!value && (
          <div className="absolute top-4 left-4 text-gray-400 pointer-events-none text-sm">
            {placeholder}
          </div>
        )}
      </div>

      {/* Modal de Imagem */}
      {showImageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Image className="w-5 h-5 text-blue-600 mr-2" />
                Inserir Imagem
              </h3>
              <button
                onClick={() => setShowImageModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL da Imagem
                </label>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://exemplo.com/imagem.jpg"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Texto Alternativo
                </label>
                <input
                  type="text"
                  value={imageAlt}
                  onChange={(e) => setImageAlt(e.target.value)}
                  placeholder="Descrição da imagem"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="border-t pt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ou fazer upload
                </label>
                <input
                  ref={imageInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <button
                  onClick={() => imageInputRef.current?.click()}
                  className="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 transition-colors flex items-center justify-center space-x-2"
                >
                  <Upload className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">Escolher arquivo</span>
                </button>
              </div>
              
              {imageUrl && (
                <div className="border rounded-lg p-3 bg-gray-50">
                  <img src={imageUrl} alt={imageAlt} className="max-w-full h-auto rounded" />
                </div>
              )}
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowImageModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={insertImage}
                disabled={!imageUrl.trim()}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Inserir
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Vídeo */}
      {showVideoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Video className="w-5 h-5 text-purple-600 mr-2" />
                Inserir Vídeo
              </h3>
              <button
                onClick={() => setShowVideoModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL do Vídeo
                </label>
                <input
                  type="url"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="https://youtube.com/watch?v=..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Título do Vídeo
                </label>
                <input
                  type="text"
                  value={videoTitle}
                  onChange={(e) => setVideoTitle(e.target.value)}
                  placeholder="Título do vídeo"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              
              <div className="border-t pt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ou fazer upload
                </label>
                <input
                  ref={videoInputRef}
                  type="file"
                  accept="video/*"
                  onChange={handleVideoUpload}
                  className="hidden"
                />
                <button
                  onClick={() => videoInputRef.current?.click()}
                  className="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-400 transition-colors flex items-center justify-center space-x-2"
                >
                  <Upload className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">Escolher arquivo</span>
                </button>
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowVideoModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={insertVideo}
                disabled={!videoUrl.trim()}
                className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Inserir
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Estilos CSS */}
      <style jsx>{`
        .highlight-simple {
          background: linear-gradient(120deg, #fef3c7 0%, #fde68a 100%);
          padding: 2px 4px;
          border-radius: 4px;
          border: 1px solid #f59e0b;
        }
        
        .highlight-animated {
          background: linear-gradient(120deg, #fecaca 0%, #fca5a5 100%);
          padding: 2px 4px;
          border-radius: 4px;
          border: 2px solid #ef4444;
          animation: highlight-pulse 2s infinite;
        }
        
        .info-box {
          background: #dbeafe;
          border-left: 4px solid #3b82f6;
          padding: 12px;
          margin: 8px 0;
          border-radius: 4px;
          font-weight: 500;
        }
        
        .image-container {
          margin: 16px 0;
          text-align: center;
        }
        
        .video-container {
          margin: 16px 0;
          padding: 16px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
        }
        
        .video-title {
          font-weight: 600;
          margin-bottom: 8px;
          color: #1e293b;
        }
        
        .video-url {
          color: #64748b;
          font-size: 14px;
          word-break: break-all;
        }
        
        .separator {
          border: none;
          height: 2px;
          background: linear-gradient(90deg, transparent, #d1d5db, transparent);
          margin: 20px 0;
        }
        
        .text-left { text-align: left; }
        .text-center { text-align: center; }
        .text-right { text-align: right; }
        .text-justify { text-align: justify; }
        
        @keyframes highlight-pulse {
          0%, 100% { 
            opacity: 1; 
            transform: scale(1);
          }
          50% { 
            opacity: 0.8; 
            transform: scale(1.02);
          }
        }
      `}</style>
    </div>
  );
};

export default RichTextEditor; 