const express = require('express');
const cors = require('cors');
const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Servir arquivos estáticos do frontend buildado
app.use(express.static(path.join(__dirname, 'dist')));

// Servir arquivos públicos (templates, etc)
app.use('/templates', express.static(path.join(__dirname, 'public/templates')));

// Função para gerar o card usando Sharp (copiada do simple-server.cjs)
async function generateCardWithSharp({ title, hat, imageUrl, categoria, type = 'card', subcategoria }) {
  try {
    console.log(`🎨 Gerando ${type} com Sharp...`);
    
    // Definir cores por editoria
    const editorialColors = {
      'policia': '#E53935',
      'política': '#7A1F2B',
      'politica': '#7A1F2B', // sem acento
      'esporte': '#16A34A',
      'entretenimento': '#EA580C',
      'geral': '#424242',
      'default': '#E53935' // vermelho padrão
    };
    
    // Obter cor da barra baseada na categoria OU subcategoria
    const barColor = editorialColors[categoria?.toLowerCase()] || 
                    editorialColors[subcategoria?.toLowerCase()] || 
                    editorialColors['default'];
    
    // Definir dimensões baseadas no tipo
    const dimensions = type === 'story' ? { width: 1080, height: 1920 } : { width: 1080, height: 1350 };
    
    // 1. Baixar a imagem de fundo
    const imageResponse = await fetch(imageUrl || `https://picsum.photos/${dimensions.width}/${dimensions.height}`);
    const imageBuffer = Buffer.from(await imageResponse.arrayBuffer());
    
    // 2. Redimensionar imagem para as dimensões corretas
    const resizedImage = await sharp(imageBuffer)
      .resize(dimensions.width, dimensions.height, { fit: 'cover' })
      .toBuffer();
    
    // 3. Ler o template overlay correto
    const overlayFile = type === 'story' ? 'overlaystory.png' : 'overlay.png';
    const overlayPath = path.join(__dirname, 'public/templates/r10', overlayFile);
    const overlayBuffer = await fs.readFile(overlayPath);
    
    // 4. Criar SVG com o texto (título e chapéu)
    // Função simples para destacar palavras importantes
    const findKeywords = (text) => {
      const words = text.split(' ');
      const stopWords = ['de', 'da', 'do', 'em', 'na', 'no', 'com', 'para', 'por', 'a', 'o', 'e', 'que', 'um', 'uma'];
      
      // Encontrar palavras importantes consecutivas
      let bestStart = -1;
      let bestLength = 0;
      
      for (let i = 0; i < words.length; i++) {
        if (!stopWords.includes(words[i].toLowerCase()) && words[i].length > 3) {
          let length = 1;
          // Verificar próximas palavras
          while (i + length < words.length && 
                 !stopWords.includes(words[i + length].toLowerCase()) && 
                 words[i + length].length > 3 && 
                 length < 3) {
            length++;
          }
          if (length > bestLength) {
            bestStart = i;
            bestLength = length;
          }
        }
      }
      
      // Se não encontrou, destacar as primeiras 2 palavras importantes
      if (bestStart === -1) {
        for (let i = 0; i < words.length && bestLength < 2; i++) {
          if (!stopWords.includes(words[i].toLowerCase()) && words[i].length > 3) {
            if (bestStart === -1) bestStart = i;
            bestLength++;
          }
        }
      }
      
      return { boldStart: bestStart, boldLength: bestLength };
    };
    
    // Adaptar título longo se necessário
    let adaptedTitle = title;
    
    // Se o título for muito longo, tentar simplificar
    if (title.length > 78) {
      // Primeiro, tentar remover palavras menos importantes
      const wordsToRemove = ['de', 'da', 'do', 'em', 'na', 'no', 'com', 'para', 'por', 'a', 'o', 'e'];
      let words = title.split(' ');
      
      // Remover algumas preposições mantendo a primeira e última palavra
      words = words.filter((word, index) => {
        if (index === 0 || index === words.length - 1) return true;
        return !wordsToRemove.includes(word.toLowerCase());
      });
      
      adaptedTitle = words.join(' ');
      
      // Se ainda for muito longo, usar versão mais curta
      if (adaptedTitle.length > 78) {
        // Pegar primeiras 75 caracteres e cortar na última palavra completa
        adaptedTitle = title.substring(0, 75);
        const lastSpace = adaptedTitle.lastIndexOf(' ');
        if (lastSpace > 50) {
          adaptedTitle = adaptedTitle.substring(0, lastSpace);
        }
      }
    }
    
    const titleWords = adaptedTitle.split(' ');
    const { boldStart, boldLength } = findKeywords(adaptedTitle);
    
    // Criar linhas com quebra inteligente de palavras
    const lines = [];
    let currentLine = [];
    let currentLength = 0;
    const maxCharsPerLine = 24; // Reduzido para garantir que caiba
    
    for (let i = 0; i < titleWords.length; i++) {
      const word = titleWords[i];
      const wordLength = word.length;
      
      // Se adicionar esta palavra ultrapassar o limite E já tiver palavras na linha
      // Considerar o espaço entre palavras no cálculo
      const spaceLength = currentLine.length > 0 ? 1 : 0;
      if (currentLength + spaceLength + wordLength > maxCharsPerLine && currentLine.length > 0) {
        lines.push(currentLine);
        currentLine = [];
        currentLength = 0;
      }
      
      currentLine.push({
        text: word,
        isBold: i >= boldStart && i < boldStart + boldLength
      });
      currentLength += wordLength + (currentLine.length > 1 ? 1 : 0); // Adicionar 1 para o espaço
    }
    
    if (currentLine.length > 0) {
      lines.push(currentLine);
    }
    
    // Limitar a 3 linhas
    if (lines.length > 3) {
      lines.length = 3;
      // Não adicionar "..." - conforme solicitado pelo usuário
    }
    
    // Calcular dimensões da barra baseado no texto do chapéu
    const hatTextWidth = hat ? hat.length * 20 : 0; // Aumentado para 20px por caractere (fonte 33)
    const barWidth = Math.min(hatTextWidth + 60, 500); // Padding de 30px de cada lado, máximo 500px
    const barHeight = 44;
    const barX = 64;
    const barY = type === 'story' ? 950 : 878; // Subindo mais para story
    
    // Ajustar posição do título para story
    const titleStartY = type === 'story' ? 1090 : 1020; // Subindo mais para não cobrir "Leia mais"
    
    const textSvg = `
      <svg width="${dimensions.width}" height="${dimensions.height}" xmlns="http://www.w3.org/2000/svg">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;800&amp;display=swap');
        </style>
        
        ${hat ? `
          <!-- Chapéu com barra colorida por editoria -->
          <rect x="${barX}" y="${barY}" width="${barWidth}" height="${barHeight}" fill="${barColor}" rx="8"/>
          <text x="${barX + 30}" y="${barY + 29}" fill="white" font-family="Poppins, Arial" font-size="33" font-weight="600">${hat.toUpperCase()}</text>
        ` : ''}
        
        <!-- Título com múltiplas linhas -->
        ${lines.map((line, lineIndex) => {
          const y = titleStartY + (lineIndex * 85);
          
          // Construir o texto da linha com espaços corretos
          const lineText = line.map((word, index) => {
            const weight = word.isBold ? '800' : '400';
            // Adicionar espaço entre palavras
            const spacing = index > 0 ? ' ' : '';
            return `${spacing}<tspan font-weight="${weight}">${word.text}</tspan>`;
          }).join('');
          
          return `<text x="64" y="${y}" fill="white" font-family="Poppins, Arial" font-size="76">${lineText}</text>`;
        }).join('')}
      </svg>
    `;
    
    // 5. Compor as camadas: imagem -> overlay -> texto
    const finalImage = await sharp(resizedImage)
      .composite([
        {
          input: overlayBuffer,
          top: 0,
          left: 0
        },
        {
          input: Buffer.from(textSvg),
          top: 0,
          left: 0
        }
      ])
      .png()
      .toBuffer();
    
    return finalImage;
    
  } catch (error) {
    console.error(`❌ Erro ao gerar ${type}:`, error);
    throw error;
  }
}

// API de geração de imagem
app.post('/api/social/generate', async (req, res) => {
  console.log('📨 Recebido pedido para gerar card:', req.body);
  
  try {
    const { title, hat, imageUrl, categoria, type = 'card', subcategoria } = req.body;
    
    // Gerar o card ou story
    const imageBuffer = await generateCardWithSharp({
      title,
      hat,
      imageUrl,
      categoria: subcategoria || categoria, // Preferir subcategoria se disponível
      type
    });
    
    // Converter para base64
    const base64 = `data:image/png;base64,${imageBuffer.toString('base64')}`;
    
    const response = {
      ok: true,
      preview: base64,
      message: `✅ ${type === 'story' ? 'Story' : 'Card'} gerado com sucesso!`,
      feedUrl: type === 'card' ? base64 : null,
      storyUrl: type === 'story' ? base64 : null
    };
    
    console.log(`✅ ${type === 'story' ? 'Story' : 'Card'} PNG gerado com sucesso!`);
    res.json(response);
    
  } catch (error) {
    console.error('❌ Erro:', error);
    res.status(500).json({
      ok: false,
      error: error.message || 'Erro ao gerar imagem'
    });
  }
});

// API de publicação no Instagram
app.post('/api/social/instagram/publish', async (req, res) => {
  try {
    const { imageData, caption, type = 'feed' } = req.body;
    
    console.log('📱 Iniciando publicação no Instagram...');
    
    // Verificar credenciais
    const IG_BUSINESS_ID = process.env.IG_BUSINESS_ID || process.env.IG_USER_ID;
    const IG_ACCESS_TOKEN = process.env.IG_ACCESS_TOKEN;
    
    if (!IG_BUSINESS_ID || !IG_ACCESS_TOKEN) {
      console.error('❌ Credenciais do Instagram não configuradas');
      return res.status(400).json({
        ok: false,
        error: 'Credenciais do Instagram não configuradas. Verifique o arquivo .env'
      });
    }
    
    // Simular publicação por enquanto
    console.log('✅ Simulando publicação no Instagram...');
    console.log('Business ID:', IG_BUSINESS_ID);
    console.log('Caption:', caption);
    console.log('Type:', type);
    
    res.json({
      ok: true,
      message: '✅ Publicação no Instagram realizada com sucesso! (simulação)',
      postId: 'simulated_' + Date.now(),
      type: type
    });
    
  } catch (error) {
    console.error('❌ Erro ao publicar no Instagram:', error);
    res.status(500).json({
      ok: false,
      error: error.message || 'Erro ao publicar no Instagram'
    });
  }
});

// Catch-all - servir o index.html para rotas do React
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`🌐 URL: ${process.env.RAILWAY_URL || `http://localhost:${PORT}`}`);
  console.log(`📐 Usando Sharp para composição`);
  console.log(`🖼️ Template: public/templates/r10/overlay.png`);
  console.log(`✅ Imagem por baixo, overlay no meio, texto por cima`);
});