const roleta = document.getElementById('roleta');
const girarBtn = document.getElementById('girar-btn');
const palavraSorteada = document.getElementById('palavra-sorteada');

let anguloAtual = 0;

girarBtn.addEventListener('click', () => {
    // Gira a roleta aleatoriamente entre 2 e 5 voltas completas
    const voltas = Math.floor(Math.random() * 4) + 2;
    const novoAngulo = 360 * voltas + Math.floor(Math.random() * 360);

    anguloAtual += novoAngulo;
    roleta.style.transform = `rotate(${anguloAtual}deg)`;

    // Calcula o índice da palavra sorteada
    const setor = Math.floor((anguloAtual % 360) / 45);
    const palavras = ['Palavra 1', 'Palavra 2', 'Palavra 3', 'Palavra 4', 
                      'Palavra 5', 'Palavra 6', 'Palavra 7', 'Palavra 8'];

    // Exibe a palavra sorteada
    palavraSorteada.textContent = `Palavra sorteada: ${palavras[(8 - setor) % 8]}`;
});
