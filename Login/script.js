const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
    event.preventDefault(); // Impede o envio padrão do formulário

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Aqui você implementaria a lógica de autenticação
    // Comparando os dados do usuário com um banco de dados ou API
    // Exemplo simples:
    if (username === 'admin' && password === 'password123') {
        alert('Login bem-sucedido!');
        // Redirecionar para outra página
        window.location.href = 'pagina_principal.html';
    } else {
        alert('Usuário ou senha inválidos.');
    }
});

