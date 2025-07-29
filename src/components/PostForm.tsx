import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { 
  Save, Eye, Send, Clock, Image, Tag, Type, MapPin,
  Star, TrendingUp, Edit3, Zap, CheckCircle, AlertCircle,
  Upload, X, Plus, Camera, Mic, Instagram, MessageSquare,
  Bell, Globe, Search, Smartphone, Monitor, FileText, Hash,
  User, ExternalLink, Maximize2, Minimize2, ArrowLeft,
  Shield, Vote, Trophy, Music, HelpCircle, RefreshCw, Sparkles
} from 'lucide-react';
import Breadcrumb from './Breadcrumb';
import RichTextEditor from './RichTextEditor';
import HatField from './HatField';
import AITagsGenerator from './AITagsGenerator';
import QuickSummary from './QuickSummary';
import EditorialAI from './EditorialAI';
import { createPost, updatePost, PostStatus, getPostById } from '../services/postsService';
import { useAuth } from '../contexts/AuthContext';
import { generateTitles, generateSubtitles, generateChapeus } from '../services/aiService';

const PostForm = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { id } = useParams();
  const [autoSaving, setAutoSaving] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [imageExpanded, setImageExpanded] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState(['editoriais']);
  const [selectedSubcategories, setSelectedSubcategories] = useState(['geral']);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [postId, setPostId] = useState<string | null>(null);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState({
    titulos: [],
    subtitulos: [],
    chapeus: []
  });
  
  const [post, setPost] = useState({
    categoria: 'geral',
    subcategoria: 'geral',
    municipio: '',
    titulo: '',
    subtitulo: '',
    autor: user?.name || '',
    fonte: '',
    chapéu: '',
    resumo: '',
    conteudo: '',
    imagemDestaque: null,
    posicao: 'geral',
    agendamento: null,
    tags: [],
    // Automações
    whatsappAuto: true,
    pushAuto: true,
    igCardAuto: false,
    audioAuto: false
  });

  // Auto-save simulation (desabilitado durante edição)
  useEffect(() => {
    // Não fazer auto-save se estivermos carregando um post existente OU editando
    if ((post.titulo || post.conteudo) && !id && !loading) {
      setAutoSaving(true);
      const timer = setTimeout(() => {
        setAutoSaving(false);
        handleSaveDraft();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [post.titulo, post.conteudo, post.subtitulo, post.resumo, id, loading]);

  // Count words
  useEffect(() => {
    const words = post.conteudo.split(' ').filter(word => word.length > 0).length;
    setWordCount(words);
  }, [post.conteudo]);



  const categoriasMaes = {
    'editoriais': {
      nome: 'Editoriais',
      icon: FileText,
      color: 'bg-blue-500',
      subcategorias: [
        { value: 'policia', label: 'Polícia' },
        { value: 'politica', label: 'Política' },
        { value: 'esporte', label: 'Esporte' },
        { value: 'entretenimento', label: 'Entretenimento' },
        { value: 'geral', label: 'Geral' }
      ]
    },
    'municipios': {
      nome: 'Municípios',
      icon: MapPin,
      color: 'bg-green-500',
      subcategorias: [
        { value: 'piripiri', label: 'Piripiri' },
        { value: 'pedro-ii', label: 'Pedro II' },
        { value: 'brasileira', label: 'Brasileira' },
        { value: 'lagoa-de-sao-francisco', label: 'Lagoa de São Francisco' },
        { value: 'piracuruca', label: 'Piracuruca' },
        { value: 'sao-jose-do-divino', label: 'São José do Divino' },
        { value: 'domingos-mourao', label: 'Domingos Mourão' },
        { value: 'capitao-de-campos', label: 'Capitão de Campos' },
        { value: 'cocal-de-telha', label: 'Cocal de Telha' },
        { value: 'milton-brandao', label: 'Milton Brandão' },
        { value: 'teresina', label: 'Teresina' },
        { value: 'boa-hora', label: 'Boa Hora' }
      ]
    },
    'especiais': {
      nome: 'Especiais',
      icon: Star,
      color: 'bg-purple-500',
      subcategorias: [
        { value: 'investigacao', label: 'Investigação' },
        { value: 'series-especiais', label: 'Séries Especiais' },
        { value: 'entrevistas', label: 'Entrevistas' },
        { value: 'grandes-reportagens', label: 'Grandes Reportagens' },
        { value: 'documentarios', label: 'Documentários' }
      ]
    }
  };

  // Load existing post for editing
  useEffect(() => {
    const loadExistingPost = async () => {
      if (id) {
        setLoading(true);
        console.log('Carregando post com ID:', id);
        try {
          const existingPost = await getPostById(id);
          console.log('Post encontrado:', existingPost);
          if (existingPost) {
          setPostId(id);
          setPost({
            categoria: existingPost.categoria,
            subcategoria: existingPost.subcategoria,
            municipio: existingPost.municipio || '',
            titulo: existingPost.title,
            subtitulo: existingPost.subtitle,
            autor: existingPost.author,
            fonte: existingPost.fonte || '',
            chapéu: existingPost.chapeu || '',
            resumo: existingPost.resumo,
            conteudo: existingPost.content,
            imagemDestaque: existingPost.imagemDestaque || null,
            posicao: existingPost.posicao || 'geral',
            agendamento: existingPost.scheduledDate || null,
            tags: existingPost.tags || [],
            whatsappAuto: true,
            pushAuto: true,
            igCardAuto: false,
            audioAuto: false
          });

          // Update selected categories and subcategories
          const parentCategory = Object.keys(categoriasMaes).find(key => 
            categoriasMaes[key].subcategorias.some(sub => sub.value === existingPost.subcategorias[0])
          );
                     if (parentCategory) {
             setSelectedCategories([parentCategory]);
             setSelectedSubcategories(existingPost.subcategorias);
           }
         }
       } catch (error) {
         console.error('Erro ao carregar post:', error);
         setError('Erro ao carregar matéria para edição');
       } finally {
         setLoading(false);
       }
     }
   };

   loadExistingPost();
 }, [id]);

  const posicoes = [
    { 
      value: 'supermanchete', 
      label: 'Super Manchete', 
      icon: Star,
      description: 'Destaque principal da página'
    },
    { 
      value: 'destaque', 
      label: 'Destaque', 
      icon: TrendingUp,
      description: 'Seção de destaques'
    },
    { 
      value: 'geral', 
      label: 'Geral', 
      icon: FileText,
      description: 'Seção de notícias gerais'
    },
    { 
      value: 'municipios', 
      label: 'Municípios', 
      icon: MapPin,
      description: 'Seção de municípios'
    }
  ];

  const autores = [
    'João Silva',
    'Maria Santos',
    'Pedro Oliveira',
    'Ana Costa',
    'Carlos Ferreira',
    'Lucia Rodrigues'
  ];

  const isFormValid = post.titulo && post.conteudo && post.chapéu && post.resumo && post.autor && selectedSubcategories.length > 0;

  const handleInputChange = (field, value) => {
    setPost(prev => ({ ...prev, [field]: value }));
  };

  const generateSlug = (titulo) => {
    return titulo
      .toLowerCase()
      .replace(/[^\w\s]/gi, '')
      .replace(/\s+/g, '-');
  };

  const addTag = (tagText) => {
    if (tagText && !post.tags.includes(tagText)) {
      setPost(prev => ({ ...prev, tags: [...prev.tags, tagText] }));
    }
  };

  const removeTag = (tagToRemove) => {
    setPost(prev => ({ ...prev, tags: prev.tags.filter(tag => tag !== tagToRemove) }));
  };

  // Salvar como rascunho
  const handleSaveDraft = async () => {
    if (!post.titulo) return;
    
    try {
      setSaving(true);
      setError(null);
      
      // Obter as categorias-mães correspondentes às subcategorias selecionadas
      const categoriasRelacionadas = [];
      selectedSubcategories.forEach(subcategoria => {
        Object.entries(categoriasMaes).forEach(([categoriaKey, categoria]) => {
          if (categoria.subcategorias.some(sc => sc.value === subcategoria) && 
              !categoriasRelacionadas.includes(categoriaKey)) {
            categoriasRelacionadas.push(categoriaKey);
          }
        });
      });
      
      const postData = {
        id: postId || undefined,
        title: post.titulo,
        subtitle: post.subtitulo,
        author: post.autor,
        content: post.conteudo,
        chapeu: post.chapéu,
        categoria: categoriasRelacionadas[0] || 'editoriais',
        subcategorias: selectedSubcategories,
        posicao: post.posicao,
        status: 'draft' as PostStatus,
        publishDate: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        imagemDestaque: post.imagemDestaque,
        tags: post.tags,
        resumo: post.resumo,
        fonte: post.fonte,
        views: 0
      };
      
      let result;
      if (postId) {
        result = await updatePost(postId, postData);
      } else {
        result = await createPost(postData);
        setPostId(result.id);
      }
      
      setSuccess('Rascunho salvo com sucesso!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error('Erro ao salvar rascunho:', err);
      setError('Erro ao salvar rascunho. Tente novamente.');
    } finally {
      setSaving(false);
    }
  };

  const handlePublish = async () => {
    if (!isFormValid) return;
    
    try {
      setSaving(true);
      setError(null);
      
      // Obter as categorias-mães correspondentes às subcategorias selecionadas
      const categoriasRelacionadas = [];
      selectedSubcategories.forEach(subcategoria => {
        Object.entries(categoriasMaes).forEach(([categoriaKey, categoria]) => {
          if (categoria.subcategorias.some(sc => sc.value === subcategoria) && 
              !categoriasRelacionadas.includes(categoriaKey)) {
            categoriasRelacionadas.push(categoriaKey);
          }
        });
      });
      
      const postData = {
        id: postId || undefined,
        title: post.titulo,
        subtitle: post.subtitulo,
        author: post.autor,
        content: post.conteudo,
        chapeu: post.chapéu,
        categoria: categoriasRelacionadas[0] || 'editoriais',
        subcategorias: selectedSubcategories,
        posicao: post.posicao,
        status: post.agendamento ? 'scheduled' as PostStatus : 'published' as PostStatus,
        publishDate: new Date().toISOString(),
        scheduledDate: post.agendamento || undefined,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        imagemDestaque: post.imagemDestaque,
        tags: post.tags,
        resumo: post.resumo,
        fonte: post.fonte,
        views: 0
      };
      
      let result;
      if (postId) {
        result = await updatePost(postId, postData);
      } else {
        result = await createPost(postData);
      }
      
      setSuccess('Matéria publicada com sucesso!');
      setTimeout(() => {
        navigate('/admin?tab=materias');
      }, 1500);
    } catch (err) {
      console.error('Erro ao publicar matéria:', err);
      setError('Erro ao publicar matéria. Tente novamente.');
    } finally {
      setSaving(false);
    }
  };

  const toggleCategory = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const toggleSubcategory = (subcategory, categoriaKey) => {
    setSelectedSubcategories(prev => {
      // Remove qualquer subcategoria da mesma categoria-mãe
      const categoria = categoriasMaes[categoriaKey];
      const subcategoriasDaCategoria = categoria.subcategorias.map(sc => sc.value);
      const outrasSubcategorias = prev.filter(sc => !subcategoriasDaCategoria.includes(sc));
      
      // Se a subcategoria já está selecionada, remove ela
      if (prev.includes(subcategory)) {
        return outrasSubcategorias;
      }
      
      // Se não está selecionada, adiciona ela (substituindo qualquer outra da mesma categoria)
      return [...outrasSubcategorias, subcategory];
    });
  };

  const clearAllSelections = () => {
    setSelectedCategories(['editoriais']);
    setSelectedSubcategories(['geral']);
  };

  // Função para gerar todas as sugestões de IA de uma vez
  const handleGenerateAllAI = async () => {
    if (!post.conteudo || post.conteudo.length < 100) {
      setError('Escreva pelo menos 100 caracteres no conteúdo para gerar sugestões de IA');
      return;
    }

    setIsGeneratingAI(true);
    setError(null);

    try {
      // Gerar todas as sugestões em paralelo
      const [titulosSuggestions, subtitulosSuggestions, chapeusSuggestions] = await Promise.all([
        generateTitles(post.conteudo, 75, post.subtitulo, post.chapéu),
        generateSubtitles(post.conteudo, post.titulo, 120, post.chapéu),
        generateChapeus(post.conteudo, 20, post.titulo, post.subtitulo)
      ]);

      setAiSuggestions({
        titulos: titulosSuggestions,
        subtitulos: subtitulosSuggestions,
        chapeus: chapeusSuggestions
      });

      setSuccess('Sugestões de IA geradas com sucesso!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error('Erro ao gerar sugestões de IA:', err);
      setError('Erro ao gerar sugestões de IA. Tente novamente.');
    } finally {
      setIsGeneratingAI(false);
    }
  };

  // Função para aplicar sugestão
  const applySuggestion = (type: string, value: string) => {
    handleInputChange(type, value);
    // Limpar sugestões após aplicar
    setTimeout(() => {
      setAiSuggestions({
        titulos: [],
        subtitulos: [],
        chapeus: []
      });
    }, 2000);
  };

  // Se estiver carregando, mostrar indicador
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 font-body flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando matéria para edição...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 font-body">
      {/* Header Simplificado */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link to="/admin" className="text-gray-600 hover:text-gray-900">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-lg font-bold text-gray-900">
                  {id ? 'Editando Matéria' : 'Nova Matéria'}
                </h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {/* Status indicators mais discretos */}
              {autoSaving && !id && (
                <span className="text-xs text-green-600 flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                  Salvando...
                </span>
              )}
              {saving && (
                <span className="text-xs text-blue-600 flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
                  Processando...
                </span>
              )}
              {success && (
                <span className="text-xs text-green-600 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  {success}
                </span>
              )}
              {error && (
                <span className="text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {error}
                </span>
              )}
              
              {/* Botão único de IA */}
              <button
                onClick={handleGenerateAllAI}
                disabled={isGeneratingAI || !post.conteudo || post.conteudo.length < 100}
                className="flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm rounded-full hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
                title="Gerar sugestões de IA para título, subtítulo e chapéu"
              >
                {isGeneratingAI ? (
                  <>
                    <RefreshCw className="w-3 h-3 animate-spin" />
                    Gerando IA...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3 h-3" />
                    IA Sugestões
                  </>
                )}
              </button>
              
              {/* Botões de ação mais limpos */}
              <button 
                onClick={handleSaveDraft}
                className="px-3 py-1.5 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded text-sm flex items-center gap-1"
              >
                <Save className="w-3 h-3" />
                Salvar
              </button>
              <button 
                onClick={handlePublish}
                disabled={!isFormValid || saving}
                className="bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white px-4 py-1.5 rounded flex items-center gap-1 font-medium text-sm transition-colors"
              >
                <Send className="w-3 h-3" />
                Publicar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Container principal com layout otimizado */}
      <div className="max-w-6xl mx-auto px-4 py-4">
         
         {/* Seção 1: Categorização (Colapsável) */}
         <div className="mb-4">
           <details className="bg-white rounded-lg shadow-sm border border-gray-200" open={!id}>
             <summary className="px-4 py-3 cursor-pointer hover:bg-gray-50 font-medium text-gray-900 flex items-center justify-between">
               <span className="flex items-center gap-2">
                 <Tag className="w-4 h-4 text-blue-500" />
                 Categorização
               </span>
               <span className="text-xs text-gray-500">
                 {selectedSubcategories.length > 0 ? `${selectedSubcategories.length} selecionada(s)` : 'Clique para configurar'}
               </span>
             </summary>
             
             <div className="px-4 pb-4 space-y-3">
               {/* Filtros de Categorias em linha */}
               <div>
                 <div className="flex flex-wrap gap-2 mb-3">
                   {Object.entries(categoriasMaes).map(([key, categoria]) => (
                     <button
                       key={key}
                       onClick={() => toggleCategory(key)}
                       className={`px-3 py-1.5 rounded-full border text-xs font-medium transition-all flex items-center gap-1.5 ${
                         selectedCategories.includes(key)
                           ? 'border-blue-500 bg-blue-50 text-blue-700'
                           : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50 bg-white text-gray-700'
                       }`}
                     >
                       <categoria.icon className="w-3 h-3" />
                       {categoria.nome}
                     </button>
                   ))}
                 </div>

                 {/* Subcategorias organizadas */}
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                   {selectedCategories.map(categoriaKey => {
                     const categoria = categoriasMaes[categoriaKey];
                     return (
                       <div key={categoriaKey} className="space-y-2">
                         <h4 className="text-sm font-medium text-gray-700 flex items-center gap-1">
                           <categoria.icon className="w-3 h-3" />
                           {categoria.nome}
                         </h4>
                         <div className="space-y-1">
                           {categoria.subcategorias.map(subcat => (
                             <button
                               key={subcat.value}
                               onClick={() => toggleSubcategory(subcat.value, categoriaKey)}
                               className={`w-full text-left px-3 py-1.5 rounded text-xs transition-all ${
                                 selectedSubcategories.includes(subcat.value)
                                   ? 'bg-green-100 text-green-800 border border-green-300'
                                   : 'bg-gray-50 hover:bg-green-50 text-gray-700 border border-transparent'
                               }`}
                             >
                               {subcat.label}
                             </button>
                           ))}
                         </div>
                       </div>
                     );
                   })}
                 </div>
               </div>
             </div>
           </details>
         </div>

         {/* Seção 2: Conteúdo Principal (Sempre visível) */}
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
           
           {/* Coluna Principal - Título, Subtítulo, Conteúdo */}
           <div className="lg:col-span-2 space-y-4">
             
             {/* Título e Subtítulo em um card */}
             <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
               <div className="space-y-4">
                 {/* Título */}
                 <div>
                   <label className="block text-sm font-medium text-gray-900 mb-2">
                     Título <span className="text-red-500">*</span>
                   </label>
                   <input
                     type="text"
                     value={post.titulo}
                     onChange={(e) => handleInputChange('titulo', e.target.value)}
                     placeholder="Digite um título chamativo e claro"
                     className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-base transition-all ${
                       post.titulo.length >= 10 && post.titulo.length <= 75
                         ? 'border-green-300 bg-green-50' 
                         : post.titulo 
                           ? 'border-red-300 bg-red-50' 
                           : 'border-gray-300'
                     }`}
                     maxLength="75"
                   />
                   <div className="flex justify-between mt-1 text-xs text-gray-500">
                     <span>r10piaui.com.br/{generateSlug(post.titulo) || 'titulo-da-materia'}</span>
                     <span className={post.titulo.length > 60 ? 'text-red-600' : ''}>
                       {post.titulo.length}/75
                     </span>
                   </div>
                   
                   {/* Sugestões de Títulos */}
                   {aiSuggestions.titulos.length > 0 && (
                     <div className="mt-2 p-2 bg-purple-50 rounded-lg border border-purple-200">
                       <div className="text-xs font-medium text-purple-800 mb-2 flex items-center gap-1">
                         <Sparkles className="w-3 h-3" />
                         Sugestões de Títulos
                       </div>
                       <div className="space-y-1">
                         {aiSuggestions.titulos.map((titulo, index) => (
                           <button
                             key={index}
                             onClick={() => applySuggestion('titulo', titulo)}
                             className="w-full text-left p-2 bg-white rounded border hover:border-purple-300 transition-colors text-sm"
                           >
                             {titulo}
                           </button>
                         ))}
                       </div>
                     </div>
                   )}
                 </div>

                 {/* Subtítulo */}
                 <div>
                   <label className="block text-sm font-medium text-gray-900 mb-2">
                     Subtítulo <span className="text-red-500">*</span>
                   </label>
                   <input
                     type="text"
                     value={post.subtitulo}
                     onChange={(e) => handleInputChange('subtitulo', e.target.value)}
                     placeholder="Digite um subtítulo para complementar o título"
                     className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-base transition-all ${
                       post.subtitulo.length >= 15 && post.subtitulo.length <= 120
                         ? 'border-green-300 bg-green-50' 
                         : post.subtitulo 
                           ? 'border-red-300 bg-red-50' 
                           : 'border-gray-300'
                     }`}
                     maxLength="120"
                   />
                   <div className="flex justify-between mt-1 text-xs text-gray-500">
                     <span>Complementa o título principal</span>
                     <span className={post.subtitulo.length > 100 ? 'text-red-600' : ''}>
                       {post.subtitulo.length}/120
                     </span>
                   </div>
                   
                   {/* Sugestões de Subtítulos */}
                   {aiSuggestions.subtitulos.length > 0 && (
                     <div className="mt-2 p-2 bg-blue-50 rounded-lg border border-blue-200">
                       <div className="text-xs font-medium text-blue-800 mb-2 flex items-center gap-1">
                         <Sparkles className="w-3 h-3" />
                         Sugestões de Subtítulos
                       </div>
                       <div className="space-y-1">
                         {aiSuggestions.subtitulos.map((subtitulo, index) => (
                           <button
                             key={index}
                             onClick={() => applySuggestion('subtitulo', subtitulo)}
                             className="w-full text-left p-2 bg-white rounded border hover:border-blue-300 transition-colors text-sm"
                           >
                             {subtitulo}
                           </button>
                         ))}
                       </div>
                     </div>
                   )}
                 </div>
               </div>
             </div>

             {/* Editor de Conteúdo */}
             <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
               <div className="flex items-center justify-between mb-3">
                 <label className="text-sm font-medium text-gray-900">
                   Conteúdo da Matéria <span className="text-red-500">*</span>
                 </label>
                 <div className="flex items-center gap-3 text-xs text-gray-500">
                   <span>{wordCount} palavras</span>
                   <span>~{Math.ceil(wordCount / 200)} min</span>
                 </div>
               </div>
               
               <RichTextEditor
                 value={post.conteudo}
                 onChange={(value) => handleInputChange('conteudo', value)}
                 placeholder="Digite o conteúdo da matéria aqui..."
               />
             </div>
           </div>

           {/* Coluna Lateral - Metadados */}
           <div className="space-y-4">
             
             {/* Chapéu, Autor, Fonte */}
             <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
               <h3 className="text-sm font-medium text-gray-900 mb-3">Informações Básicas</h3>
               <div className="space-y-3">
                 
                 {/* Chapéu */}
                 <div>
                   <label className="block text-xs font-medium text-gray-700 mb-1">
                     Chapéu <span className="text-red-500">*</span>
                   </label>
                   <HatField
                     value={post.chapéu}
                     onChange={(value) => handleInputChange('chapéu', value)}
                     isValid={post.chapéu.length >= 3 && post.chapéu.length <= 15}
                   />
                   
                   {/* Sugestões de Chapéus */}
                   {aiSuggestions.chapeus.length > 0 && (
                     <div className="mt-2 p-2 bg-green-50 rounded-lg border border-green-200">
                       <div className="text-xs font-medium text-green-800 mb-2 flex items-center gap-1">
                         <Sparkles className="w-3 h-3" />
                         Sugestões de Chapéus
                       </div>
                       <div className="flex flex-wrap gap-1">
                         {aiSuggestions.chapeus.map((chapeu, index) => (
                           <button
                             key={index}
                             onClick={() => applySuggestion('chapéu', chapeu)}
                             className="px-2 py-1 bg-white rounded border hover:border-green-300 transition-colors text-xs font-medium"
                           >
                             {chapeu}
                           </button>
                         ))}
                       </div>
                     </div>
                   )}
                 </div>

                 {/* Autor */}
                 <div>
                   <label className="block text-xs font-medium text-gray-700 mb-1">
                     Autor <span className="text-red-500">*</span>
                   </label>
                   <select 
                     value={post.autor}
                     onChange={(e) => handleInputChange('autor', e.target.value)}
                     className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-purple-500"
                   >
                     <option value={user?.name || ''}>{user?.name || 'Selecione'}</option>
                     <option value="Redação R10 Piauí">Redação R10 Piauí</option>
                   </select>
                 </div>

                 {/* Fonte */}
                 <div>
                   <label className="block text-xs font-medium text-gray-700 mb-1">Fonte</label>
                   <input
                     type="text"
                     value={post.fonte}
                     onChange={(e) => handleInputChange('fonte', e.target.value)}
                     placeholder="Ex: Agência Brasil"
                     className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-purple-500"
                   />
                 </div>

                 {/* Posição */}
                 <div>
                   <label className="block text-xs font-medium text-gray-700 mb-1">Posição na Home</label>
                   <select
                     value={post.posicao}
                     onChange={(e) => handleInputChange('posicao', e.target.value)}
                     className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-purple-500"
                   >
                     {posicoes.map(posicao => (
                       <option key={posicao.value} value={posicao.value}>
                         {posicao.label}
                       </option>
                     ))}
                   </select>
                 </div>
               </div>
             </div>

             {/* Resumo */}
             <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
               <h3 className="text-sm font-medium text-gray-900 mb-3">Resumo</h3>
               <QuickSummary
                 value={post.resumo}
                 onChange={(value) => handleInputChange('resumo', value)}
                 content={post.conteudo}
               />
             </div>

             {/* Imagem */}
             <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
               <h3 className="text-sm font-medium text-gray-900 mb-3">Imagem de Destaque</h3>
               <div 
                 className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-purple-400 transition-colors cursor-pointer bg-gray-50"
                 onClick={() => document.getElementById('image-upload')?.click()}
               >
                 {post.imagemDestaque ? (
                   <div className="relative">
                     <img 
                       src={post.imagemDestaque} 
                       alt="Preview" 
                       className="w-full h-48 object-cover rounded-lg"
                     />
                     <button
                       onClick={(e) => {
                         e.stopPropagation();
                         handleInputChange('imagemDestaque', null);
                       }}
                       className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                     >
                       <X className="w-4 h-4" />
                     </button>
                   </div>
                 ) : (
                   <>
                     <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                     <p className="text-sm text-gray-600">Clique para fazer upload</p>
                     <p className="text-xs text-gray-500">JPG, PNG, WebP - Máx. 5MB</p>
                   </>
                 )}
                 <input 
                   id="image-upload"
                   type="file" 
                   className="hidden" 
                   accept="image/*"
                   onChange={(e) => {
                     const file = e.target.files?.[0];
                     if (file) {
                       const reader = new FileReader();
                       reader.onload = (event) => {
                         handleInputChange('imagemDestaque', event.target?.result as string);
                       };
                       reader.readAsDataURL(file);
                     }
                   }}
                 />
               </div>
             </div>
           </div>
         </div>

         {/* Seção 3: Recursos Avançados (Colapsável) */}
         <div className="mb-4">
           <details className="bg-white rounded-lg shadow-sm border border-gray-200">
             <summary className="px-4 py-3 cursor-pointer hover:bg-gray-50 font-medium text-gray-900 flex items-center justify-between">
               <span className="flex items-center gap-2">
                 <Zap className="w-4 h-4 text-purple-500" />
                 Recursos Avançados
               </span>
               <span className="text-xs text-gray-500">Tags, Distribuição, Agendamento</span>
             </summary>
             
             <div className="px-4 pb-4">
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                 
                 {/* Tags */}
                 <div>
                   <h4 className="text-sm font-medium text-gray-900 mb-2">Tags com IA</h4>
                   <AITagsGenerator
                     title={post.titulo}
                     content={post.conteudo}
                     tags={post.tags}
                     onTagsChange={(tags) => handleInputChange('tags', tags)}
                   />
                 </div>

                 {/* Agendamento */}
                 <div>
                   <h4 className="text-sm font-medium text-gray-900 mb-2">Agendamento</h4>
                   <input
                     type="datetime-local"
                     value={post.agendamento || ''}
                     onChange={(e) => handleInputChange('agendamento', e.target.value)}
                     className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-purple-500"
                   />
                   {post.agendamento && (
                     <p className="mt-1 text-xs text-gray-600">
                       📅 Será publicado em: {new Date(post.agendamento).toLocaleString('pt-BR')}
                     </p>
                   )}
                 </div>
               </div>

               {/* Distribuição Automática */}
               <div className="mt-4">
                 <h4 className="text-sm font-medium text-gray-900 mb-2">Distribuição Automática</h4>
                 <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                   {[
                     { key: 'whatsappAuto', icon: MessageSquare, title: 'WhatsApp', color: 'bg-green-500' },
                     { key: 'pushAuto', icon: Bell, title: 'Push', color: 'bg-blue-500' },
                     { key: 'igCardAuto', icon: Instagram, title: 'Instagram', color: 'bg-pink-500' },
                     { key: 'audioAuto', icon: Mic, title: 'Áudio', color: 'bg-purple-500' }
                   ].map(automation => (
                     <label key={automation.key} className="flex items-center gap-2 p-2 border rounded hover:bg-gray-50 cursor-pointer">
                       <div className={`${automation.color} p-1 rounded`}>
                         <automation.icon className="w-3 h-3 text-white" />
                       </div>
                       <span className="text-sm flex-1">{automation.title}</span>
                       <input
                         type="checkbox"
                         checked={post[automation.key]}
                         onChange={(e) => handleInputChange(automation.key, e.target.checked)}
                         className="rounded"
                       />
                     </label>
                   ))}
                 </div>
               </div>
             </div>
           </details>
         </div>

         {/* Botões de ação fixos */}
         <div className="sticky bottom-0 bg-white border-t border-gray-200 p-3 -mx-4 shadow-lg">
           <div className="max-w-6xl mx-auto flex gap-2">
             <button 
               onClick={handleSaveDraft}
               className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-3 rounded font-medium transition-colors flex items-center justify-center gap-2 text-sm"
             >
               <Save className="w-4 h-4" />
               Salvar Rascunho
             </button>
             <button 
               onClick={handlePublish}
               disabled={!isFormValid || saving}
               className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white py-2 px-3 rounded font-medium transition-colors flex items-center justify-center gap-2 text-sm"
             >
               <Send className="w-4 h-4" />
               {post.agendamento ? 'Agendar' : 'Publicar'}
             </button>
           </div>
         </div>
       </div>
     </div>
   );
};

export default PostForm; 