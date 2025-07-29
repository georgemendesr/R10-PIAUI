// Tipos e interfaces para matérias
export interface Post {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  content: string;
  chapeu: string;
  categoria: string;
  subcategorias: string[];
  posicao: string;
  status: PostStatus;
  publishDate: string;
  scheduledDate?: string;
  createdAt: string;
  updatedAt: string;
  imagemDestaque?: string;
  tags: string[];
  resumo: string;
  fonte?: string;
  views: number;
}

export type PostStatus = 'draft' | 'published' | 'scheduled' | 'processing';

export interface PostFilter {
  categoria?: string;
  subcategoria?: string;
  status?: PostStatus;
  author?: string;
  searchTerm?: string;
}

// Chave para armazenamento no localStorage
const POSTS_STORAGE_KEY = 'r10_posts';

// Funções auxiliares para localStorage
const loadPostsFromStorage = (): Post[] => {
  const storedPosts = localStorage.getItem(POSTS_STORAGE_KEY);
  return storedPosts ? JSON.parse(storedPosts) : [];
};

const savePostsToStorage = (posts: Post[]): void => {
  localStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(posts));
};

// Gerar ID único
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

// CRUD de Matérias
export const getPosts = async (filters?: PostFilter): Promise<Post[]> => {
  let posts = loadPostsFromStorage();
  
  // Aplicar filtros se existirem
  if (filters) {
    if (filters.categoria) {
      posts = posts.filter(post => post.categoria === filters.categoria);
    }
    
    if (filters.subcategoria) {
      posts = posts.filter(post => post.subcategorias.includes(filters.subcategoria));
    }
    
    if (filters.status) {
      posts = posts.filter(post => post.status === filters.status);
    }
    
    if (filters.author) {
      posts = posts.filter(post => post.author === filters.author);
    }
    
    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      posts = posts.filter(post => 
        post.title.toLowerCase().includes(term) || 
        post.subtitle.toLowerCase().includes(term) || 
        post.content.toLowerCase().includes(term) ||
        post.tags.some(tag => tag.toLowerCase().includes(term))
      );
    }
  }
  
  // Simular chamada assíncrona
  return new Promise(resolve => {
    setTimeout(() => resolve(posts), 300);
  });
};

export const getPostById = async (id: string): Promise<Post | null> => {
  const posts = loadPostsFromStorage();
  const post = posts.find(post => post.id === id);
  
  // Simular chamada assíncrona
  return new Promise(resolve => {
    setTimeout(() => resolve(post || null), 300);
  });
};

export const createPost = async (postData: Omit<Post, 'id' | 'createdAt' | 'updatedAt' | 'views'>): Promise<Post> => {
  const posts = loadPostsFromStorage();
  
  const newPost: Post = {
    ...postData,
    id: generateId(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    views: 0
  };
  
  posts.push(newPost);
  savePostsToStorage(posts);
  
  // Simular chamada assíncrona
  return new Promise(resolve => {
    setTimeout(() => resolve(newPost), 300);
  });
};

export const updatePost = async (id: string, postData: Partial<Post>): Promise<Post | null> => {
  const posts = loadPostsFromStorage();
  const postIndex = posts.findIndex(post => post.id === id);
  
  if (postIndex === -1) {
    return Promise.resolve(null);
  }
  
  const updatedPost: Post = {
    ...posts[postIndex],
    ...postData,
    updatedAt: new Date().toISOString()
  };
  
  posts[postIndex] = updatedPost;
  savePostsToStorage(posts);
  
  // Simular chamada assíncrona
  return new Promise(resolve => {
    setTimeout(() => resolve(updatedPost), 300);
  });
};

export const deletePost = async (id: string): Promise<boolean> => {
  const posts = loadPostsFromStorage();
  const filteredPosts = posts.filter(post => post.id !== id);
  
  if (filteredPosts.length === posts.length) {
    return Promise.resolve(false);
  }
  
  savePostsToStorage(filteredPosts);
  
  // Simular chamada assíncrona
  return new Promise(resolve => {
    setTimeout(() => resolve(true), 300);
  });
};

// Funções adicionais específicas
export const publishPost = async (id: string): Promise<Post | null> => {
  return updatePost(id, { 
    status: 'published', 
    publishDate: new Date().toISOString() 
  });
};

export const schedulePost = async (id: string, scheduledDate: string): Promise<Post | null> => {
  return updatePost(id, { 
    status: 'scheduled', 
    scheduledDate 
  });
};

// Adicionar dados iniciais para teste (remover em produção)
export const initializeTestData = () => {
  // Verificar se já existem posts
  const existingPosts = loadPostsFromStorage();
  if (existingPosts.length > 0) return;

  const testPosts: Post[] = [
    {
      id: "1",
      title: "Nova Política de Transporte Público em Teresina Promete Revolucionar Mobilidade Urbana",
      subtitle: "Sistema integrado de ônibus e metrô será implementado em 2024 com investimento de R$ 500 milhões",
      author: "Redação R10 Piauí",
      content: "A Prefeitura de Teresina anunciou hoje uma nova política de transporte público que promete revolucionar a mobilidade urbana da capital piauiense. O projeto, que será implementado em 2024, representa um investimento de R$ 500 milhões e deve beneficiar mais de 800 mil usuários diários.",
      chapeu: "EXCLUSIVO",
      categoria: "editoriais",
      subcategorias: ["politica"],
      posicao: "supermanchete",
      status: "published",
      publishDate: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      imagemDestaque: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=600&fit=crop&crop=center",
      tags: ["transporte público", "Teresina", "mobilidade urbana", "investimento", "prefeitura"],
      resumo: "Sistema integrado de ônibus e metrô será implementado em 2024 com investimento de R$ 500 milhões",
      views: 2543
    },
    {
      id: "2",
      title: "Festival de Pedro II bate recorde de visitantes",
      subtitle: "Evento cultural atrai mais de 50 mil pessoas em três dias",
      author: "Maria Santos",
      content: "O Festival de Inverno de Pedro II bateu recorde de público neste ano, com mais de 50 mil pessoas presentes nos três dias de evento. A programação incluiu shows, exposições e oficinas culturais.",
      chapeu: "CULTURA",
      categoria: "municipios",
      subcategorias: ["pedro-ii"],
      posicao: "destaque",
      status: "scheduled",
      publishDate: "",
      scheduledDate: new Date(Date.now() + 86400000).toISOString(), // Amanhã
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tags: ["festival", "Pedro II", "cultura", "turismo"],
      resumo: "Evento cultural atrai mais de 50 mil pessoas em três dias de programação diversificada",
      views: 0
    },
    {
      id: "3",
      title: "Entrevista exclusiva com prefeito de Piripiri",
      subtitle: "Gestor fala sobre projetos para 2024 e desafios da administração",
      author: "Carlos Oliveira",
      content: "Em entrevista exclusiva ao R10 Piauí, o prefeito de Piripiri falou sobre os projetos previstos para 2024 e os desafios enfrentados pela administração municipal.",
      chapeu: "ENTREVISTA",
      categoria: "municipios",
      subcategorias: ["piripiri"],
      posicao: "geral",
      status: "published",
      publishDate: new Date(Date.now() - 86400000).toISOString(), // Ontem
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      updatedAt: new Date(Date.now() - 86400000).toISOString(),
      tags: ["entrevista", "Piripiri", "gestão municipal", "prefeitura"],
      resumo: "Prefeito discute projetos futuros e desafios atuais em entrevista exclusiva",
      views: 1897
    }
  ];
  
  savePostsToStorage(testPosts);
}; 