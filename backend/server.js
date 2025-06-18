const WebSocket = require('ws');
const readline = require('readline');
const PORT = 8080;

const server = new WebSocket.Server({ port: PORT });
console.log(`✅ WebSocket сервер запущен на ws://localhost:${PORT}`);

// Создаем интерфейс для чтения ввода из консоли
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

server.on('connection', (socket) => {
    console.log('🔗 Клиент подключился');

    // Функция для отправки сообщений из консоли
    const askForMessage = () => {
        rl.question('Введите сообщение для отправки (или "exit" для выхода): ', (message) => {
            if (message.toLowerCase() === 'exit') {
                rl.close();
                process.exit(0);
            }

            // Отправляем сообщение всем подключенным клиентам
            server.clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify({
                        type: 'server',
                        message: message,
                        timestamp: Date.now()
                    }));
                }
            });

            askForMessage(); // Рекурсивно запрашиваем новое сообщение
        });
    };

    askForMessage();

    socket.on('message', (data) => {
        console.log('📩 Сообщение от клиента:', data.toString());
    });

    socket.on('close', () => {
        console.log('❌ Клиент отключился');
    });
});

// Обработка завершения работы
rl.on('close', () => {
    console.log('\n🛑 Остановка сервера...');
    server.clients.forEach(client => client.close());
    server.close();
    process.exit(0);
});