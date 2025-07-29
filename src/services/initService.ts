// Importar funções de inicialização de outros serviços
import { initializeTestData as initializePosts } from './postsService';
import { initializeTestData as initializeMedia } from './mediaService';
import { initializeTestData as initializeAuth } from './authService';
import { initializeSettings } from './settingsService';

// Função para inicializar todos os serviços
export const initializeServices = () => {
  console.log('Inicializando serviços...');
  
  // Inicializar configurações
  initializeSettings();
  
  // Inicializar dados de teste
  initializePosts();
  initializeMedia();
  initializeAuth();
  
  console.log('Serviços inicializados com sucesso!');
}; 