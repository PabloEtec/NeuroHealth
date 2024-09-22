document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o envio do formulário

    // Captura os valores dos campos
    var gmail = document.getElementById('gmail').value;
    var password = document.getElementById('password').value;
    var role = document.getElementById('role').value;

    // Simulação de autenticação (pode ser adaptado para uso real)
    if(gmail === "exemplo@gmail.com" && password === "senha123") {
        // Redireciona para diferentes páginas com base no papel do usuário
        if(role === "paciente") {
            alert("Login realizado com sucesso como Paciente!");
            // Redirecionar para a página de paciente (exemplo)
            window.location.href = "paciente.html";
        } else if(role === "acompanhante") {
            alert("Login realizado com sucesso como Acompanhante!");
            // Redirecionar para a página de acompanhante (exemplo)
            window.location.href = "acompanhante.html";
        } else if(role === "profissional") {
            alert("Login realizado com sucesso como Profissional da Saúde!");
            // Redirecionar para a página de profissional da saúde (exemplo)
            window.location.href = "profissional.html";
        }
    } else {
        alert("Gmail ou senha incorretos!");
    }
});