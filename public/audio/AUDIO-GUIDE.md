# 🎙️ Guia para Áudios Pré-gravados

## 📁 **ARQUIVOS NECESSÁRIOS:**

Você precisa criar 2 áudios curtos e colocá-los nesta pasta:

### **1. `intro-r10.mp3`**
**Texto sugerido:** *"Você está ouvindo o R10 Piauí"*
- **Duração**: 2-3 segundos
- **Formato**: MP3
- **Qualidade**: 44.1kHz, 128kbps

### **2. `outro-r10.mp3`**
**Texto sugerido:** *"Obrigado por ouvir o R10 Piauí. Acesse r10piaui.com.br"*
- **Duração**: 3-4 segundos  
- **Formato**: MP3
- **Qualidade**: 44.1kHz, 128kbps

---

## 🎯 **COMO CRIAR OS ÁUDIOS:**

### **Opção 1: ElevenLabs (RECOMENDADO)**
1. Acesse: https://elevenlabs.io/
2. Vá em "Speech Synthesis"
3. Cole o texto da intro/outro
4. Escolha voz "Rachel" ou "Adam"
5. Gere e baixe como MP3
6. Renomeie para `intro-r10.mp3` e `outro-r10.mp3`

### **Opção 2: Gravação Própria**
1. Use microfone de qualidade
2. Grave em ambiente silencioso
3. Exporte como MP3 (44.1kHz, 128kbps)
4. Edite para remover ruídos

### **Opção 3: Ferramentas Online**
- **TTSMaker**: https://ttsmaker.com/
- **Murf AI**: https://murf.ai/
- **Speechify**: https://speechify.com/

---

## 💰 **ECONOMIA GERADA:**

### **SEM áudios pré-gravados:**
- Intro: ~30 caracteres por matéria
- Outro: ~60 caracteres por matéria
- **Total**: 90 caracteres extras por matéria
- **Custo mensal** (1000 matérias): ~$27 USD extras

### **COM áudios pré-gravados:**
- Intro/outro: **R$ 0,00** (pré-gravado)
- Só paga o conteúdo principal
- **Economia**: ~90% dos caracteres

---

## 🔧 **IMPLEMENTAÇÃO:**

Após criar os áudios:

1. **Coloque os arquivos** nesta pasta (`public/audio/`)
2. **Nomes exatos**:
   - `intro-r10.mp3`
   - `outro-r10.mp3`
3. **Reinicie o servidor**: `npm run dev`
4. **Teste**: Marque a opção "Usar intro/outro pré-gravados"

---

## 🎧 **RESULTADO FINAL:**

**Sequência de reprodução:**
1. 🎙️ **Intro pré-gravado** (2-3s)
2. 🤖 **Conteúdo gerado** (ElevenLabs)
3. 🎙️ **Outro pré-gravado** (3-4s)

**Total**: Áudio profissional com máxima economia!

---

## ⚠️ **IMPORTANTE:**

- **Qualidade consistente**: Use a mesma voz/configuração
- **Volume equilibrado**: Intro/outro com mesmo volume do conteúdo
- **Sem pausas longas**: Transição suave entre áudios
- **Backup**: Mantenha cópias dos arquivos originais 