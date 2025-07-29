import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Eye, Clock, CheckCircle, Edit3, FileText, Search,
  ChevronLeft, ChevronRight, Filter, Edit, Trash2, Share2, 
  Image as ImageIcon, PlayCircle, CheckSquare
} from 'lucide-react';
import { getPosts, PostFilter, Post, PostStatus, deletePost } from '../services/postsService';
import AdminSocialButtons from './AdminSocialButtons';

interface PostsListProps {
  initialFilter?: PostFilter;
}

const PostsList: React.FC<PostsListProps> = ({ initialFilter }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<PostFilter>(initialFilter || {});
  const [selectedPosts, setSelectedPosts] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const postsPerPage = 10;

  // Carregar posts
  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      try {
        const allPosts = await getPosts(filters);
        
        // Ordenar por data mais recente primeiro
        const sortedPosts = allPosts.sort((a, b) => {
          const dateA = new Date(a.publishDate || a.createdAt || 0);
          const dateB = new Date(b.publishDate || b.createdAt || 0);
          return dateB.getTime() - dateA.getTime(); // Mais recente primeiro
        });
        
        // Aplicar paginação
        const startIndex = (currentPage - 1) * postsPerPage;
        const paginatedPosts = sortedPosts.slice(startIndex, startIndex + postsPerPage);
        
        setPosts(paginatedPosts);
        setTotalPages(Math.ceil(sortedPosts.length / postsPerPage));
      } catch (err) {
        setError('Erro ao carregar matérias');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [filters, currentPage]);

  // Aplicar filtro de busca
  const handleSearch = () => {
    setFilters(prev => ({ ...prev, searchTerm }));
    setCurrentPage(1);
  };

  // Filtrar por status
  const filterByStatus = (status: PostStatus | undefined) => {
    setFilters(prev => ({ ...prev, status }));
    setCurrentPage(1);
  };

  // Selecionar/deselecionar post
  const togglePostSelection = (postId: string) => {
    setSelectedPosts(prev => 
      prev.includes(postId)
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  // Selecionar/deselecionar todos
  const toggleSelectAll = () => {
    if (selectedPosts.length === posts.length) {
      setSelectedPosts([]);
    } else {
      setSelectedPosts(posts.map(post => post.id));
    }
  };

  // Excluir post
  const handleDelete = async (postId: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta matéria?')) {
      try {
        await deletePost(postId);
        setPosts(prev => prev.filter(post => post.id !== postId));
        setSelectedPosts(prev => prev.filter(id => id !== postId));
      } catch (err) {
        setError('Erro ao excluir matéria');
        console.error(err);
      }
    }
  };

  // Excluir selecionados
  const handleDeleteSelected = async () => {
    if (selectedPosts.length === 0) return;
    
    if (window.confirm(`Tem certeza que deseja excluir ${selectedPosts.length} matérias?`)) {
      try {
        // Excluir posts em sequência
        for (const postId of selectedPosts) {
          await deletePost(postId);
        }
        
        // Atualizar lista
        setPosts(prev => prev.filter(post => !selectedPosts.includes(post.id)));
        setSelectedPosts([]);
      } catch (err) {
        setError('Erro ao excluir matérias');
        console.error(err);
      }
    }
  };

  // Formatar data
  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  // Status label
  const getStatusLabel = (status: PostStatus) => {
    switch (status) {
      case 'published': return 'Publicado';
      case 'draft': return 'Rascunho';
      case 'scheduled': return 'Agendado';
      case 'processing': return 'Processando';
      default: return status;
    }
  };

  // Status color
  const getStatusColor = (status: PostStatus) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-orange-100 text-orange-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Status icon
  const getStatusIcon = (status: PostStatus) => {
    switch (status) {
      case 'published': return <CheckCircle className="w-4 h-4" />;
      case 'draft': return <Edit3 className="w-4 h-4" />;
      case 'scheduled': return <Clock className="w-4 h-4" />;
      case 'processing': return <FileText className="w-4 h-4" />;
      default: return null;
    }
  };

  if (loading && posts.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (error && posts.length === 0) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
        <p>{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gerenciar Matérias</h1>
          <p className="text-gray-600 mt-1">Gerencie todas as matérias do portal</p>
        </div>
        <Link 
          to="/admin/nova-materia"
          className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2"
        >
          <Edit3 className="w-5 h-5" />
          Nova Matéria
        </Link>
      </div>

      {/* Filtros e Busca */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white rounded-2xl shadow-lg border border-gray-100 p-4">
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={() => filterByStatus(undefined)} 
            className={`px-4 py-2 rounded-lg transition-colors ${!filters.status ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            Todas
          </button>
          <button 
            onClick={() => filterByStatus('published')} 
            className={`px-4 py-2 rounded-lg transition-colors ${filters.status === 'published' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            Publicadas
          </button>
          <button 
            onClick={() => filterByStatus('draft')} 
            className={`px-4 py-2 rounded-lg transition-colors ${filters.status === 'draft' ? 'bg-orange-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            Rascunhos
          </button>
          <button 
            onClick={() => filterByStatus('scheduled')} 
            className={`px-4 py-2 rounded-lg transition-colors ${filters.status === 'scheduled' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            Agendadas
          </button>
        </div>
        
        <div className="flex w-full md:w-auto">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Buscar matérias..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button
              onClick={handleSearch}
              className="absolute inset-y-0 right-0 px-3 flex items-center bg-gray-100 rounded-r-lg border-l border-gray-300"
            >
              <Search className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          <button className="ml-2 p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
            <Filter className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total de Matérias</p>
              <p className="text-2xl font-bold text-gray-900">{posts.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Publicadas</p>
              <p className="text-2xl font-bold text-green-600">{posts.filter(p => p.status === 'published').length}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Rascunhos</p>
              <p className="text-2xl font-bold text-orange-600">{posts.filter(p => p.status === 'draft').length}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <Edit3 className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Agendadas</p>
              <p className="text-2xl font-bold text-purple-600">{posts.filter(p => p.status === 'scheduled').length}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Ações em lote */}
      {selectedPosts.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-center justify-between">
          <p className="text-blue-700">
            <span className="font-bold">{selectedPosts.length}</span> matérias selecionadas
          </p>
          <div className="flex space-x-2">
            <button 
              onClick={handleDeleteSelected}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Excluir selecionadas
            </button>
            <button 
              onClick={() => setSelectedPosts([])}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Matérias Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Todas as Matérias</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-4">
                  <input 
                    type="checkbox" 
                    className="rounded border-gray-300 text-red-600 focus:ring-red-500" 
                    checked={selectedPosts.length === posts.length && posts.length > 0}
                    onChange={toggleSelectAll}
                  />
                </th>
                <th className="px-4 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Título</th>
                <th className="px-4 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoria</th>
                <th className="px-4 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Autor</th>
                <th className="px-4 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                <th className="px-2 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-20">Status</th>
                <th className="px-4 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Instagram</th>
                <th className="px-4 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {posts.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-gray-500">
                    Nenhuma matéria encontrada
                  </td>
                </tr>
              ) : (
                posts.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-3 text-center">
                      <input 
                        type="checkbox" 
                        className="rounded border-gray-300 text-red-600 focus:ring-red-500" 
                        checked={selectedPosts.includes(post.id)}
                        onChange={() => togglePostSelection(post.id)}
                      />
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-900 max-w-xs truncate">
                      <div className="flex items-center">
                        {post.imagemDestaque && (
                          <div className="w-10 h-10 mr-3 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                            <img 
                              src={post.imagemDestaque} 
                              alt={post.title} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div>
                          <Link 
                            to={`/admin/editar-materia/${post.id}`}
                            className="font-medium text-gray-900 hover:text-blue-600 truncate max-w-xs block transition-colors"
                          >
                            {post.title}
                          </Link>
                          <p className="text-xs text-gray-500 truncate max-w-xs">{post.subtitle}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-700">{post.categoria}</td>
                    <td className="px-4 py-3 text-gray-700">{post.author}</td>
                    <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                      {post.status === 'scheduled' 
                        ? formatDate(post.scheduledDate || '') 
                        : formatDate(post.publishDate)}
                    </td>
                    <td className="px-2 py-3 text-center">
                      <span className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(post.status)}`}>
                        <span className="mr-1">{getStatusIcon(post.status)}</span>
                        {getStatusLabel(post.status)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {/* Botões do Instagram */}
                      <AdminSocialButtons 
                        post={{
                          id: post.id,
                          titulo: post.title,
                          chapeu: post.chapeu, // Usar o chapéu real, não o subtitle
                          imagemPrincipal: post.imagemDestaque,
                          categoria: post.categoria,
                          subcategorias: post.subcategorias,
                          dataPublicacao: post.publishDate
                        }}
                        compact={true}
                      />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button 
                          title="Excluir" 
                          className="text-red-500 hover:text-red-700 p-1"
                          onClick={() => handleDelete(post.id)}
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Paginação */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 rounded-lg ${
                  currentPage === page
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {page}
              </button>
            ))}
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostsList; 