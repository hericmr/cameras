import re

# Caminho do arquivo com seu código JavaScript
file_path = "src/CameraGrid.js"

# Função para identificar e remover URLs com números finais repetidos
def remove_duplicate_urls(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        code = file.read()

    # Expressão regular para capturar as URLs e a parte final (números após '?')
    pattern = re.compile(r'url:\s*(["`])([^"`,]+?\?(\d+))\1')
    matches = pattern.findall(code)

    # Dicionário para armazenar URLs únicas com base nos números finais
    unique_urls = {}
    for full_url, url_part, number in matches:
        # Verificar se o número final já foi adicionado
        if number not in unique_urls:
            unique_urls[number] = full_url

    # Substituir URLs duplicadas no código
    for full_url, url_part, number in matches:
        if full_url != unique_urls[number]:
            code = code.replace(full_url, unique_urls[number])

    # Salvar o código atualizado em um novo arquivo
    with open("CameraGrid_updated.js", 'w', encoding='utf-8') as file:
        file.write(code)
    print("Arquivo atualizado salvo como 'CameraGrid_updated.js'.")

remove_duplicate_urls(file_path)
