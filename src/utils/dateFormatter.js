/**
 * Formata a data atual no formato brasileiro
 * @returns {string} Data formatada (ex: "18 de novembro de 2024")
 */
export function formatCurrentDate() {
    const date = new Date();
    const months = [
        'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
        'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
    ];
    
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    
    return `${day} de ${month} de ${year}`;
}

/**
 * Formata a data atual no formato curto brasileiro
 * @returns {string} Data formatada (ex: "18/11/2024")
 */
export function formatCurrentDateShort() {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    
    return `${day}/${month}/${year}`;
}

