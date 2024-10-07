const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 8080 });

server.on('connection', (socket) => {
    console.log('Novo cliente conectado');

    socket.on('message', (message) => {
        // Repassa a mensagem para todos os outros clientes conectados
        server.clients.forEach(client => {
            if (client !== socket && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    socket.on('close', () => {
        console.log('Conexão encerrada');
    });
});

console.log('Servidor WebSocket rodando na porta 8080');
