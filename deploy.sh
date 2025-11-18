#!/bin/bash
# Script de deploy para GitHub Pages

echo "🚀 Iniciando deploy..."

# Verifica se há mudanças não commitadas
if [ -n "$(git status --porcelain)" ]; then
    echo "⚠️  Há mudanças não commitadas. Fazendo commit..."
    git add .
    git commit -m "chore: Update before deploy"
fi

# Faz push para GitHub
echo "📤 Fazendo push para GitHub..."
git push origin main

if [ $? -eq 0 ]; then
    echo "✅ Push realizado com sucesso!"
    
    # Faz build e deploy
    echo "🔨 Fazendo build..."
    npm run build
    
    if [ $? -eq 0 ]; then
        echo "🚀 Fazendo deploy para GitHub Pages..."
        npm run deploy
        echo "✅ Deploy concluído!"
        echo "🌐 Site disponível em: https://hericmr.github.io/cameras"
    else
        echo "❌ Erro no build"
        exit 1
    fi
else
    echo "❌ Erro no push. Verifique suas credenciais Git."
    exit 1
fi
