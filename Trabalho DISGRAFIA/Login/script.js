const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
    event.preventDefault(); 

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    
    if (username === 'admin' && password === 'password123') {
        alert('Login bem-sucedido!');
        
        window.location.href = 'pagina_principal.html';
    } else {
        alert('Usuário ou senha inválidos.');
    }
});

