require('dotenv').config();
const WebSocket = require('ws');
const Server = require('socket.io');

const PORT = process.env.REACT_APP_SOCKET_PORT;

const clients = {};

function startServer() {
    const io = new Server().attach(PORT);

    io.on('connection', (socket) => {
        clients[socket.id] = {
            ws: new WebSocket(process.env.REACT_APP_MINES_APP_SOCKET_URL),
            socket,
        };
        console.log('connect', socket.id);

        clients[socket.id].socket.on('action', (action) => {
            clients[socket.id].ws.send(action);
        });

        clients[socket.id].socket.on('disconnect', () => {
            console.log('disconnect', socket.id);
            delete clients[socket.id];
        });

        clients[socket.id].ws.on('open', () => {
            console.log('OPEN')
        });

        clients[socket.id].ws.on('message', (response) => {
            const [command, data] = response.split(':');

            switch (command) {
                case 'map':
                    const map = data.split('\n').filter((i) => !!i).map((i) => i.split(''));
                    socket.emit('response', {
                        type: 'map',
                        data: map,
                    });
                    break;
                case 'new':
                case 'open':
                    clients[socket.id].ws.send('map');
                    break;
                default:
                    return;
            }

            if (response.indexOf('You lose') !== -1) {
                socket.emit('response', {
                    type: 'gameOver',
                    data: undefined,
                });
            }
        });
    });
}

startServer();