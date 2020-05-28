const http = require('http');
const app = require('./app');

const port = process.env.PORT || 3000;
const host = process.env.HOST || '0.0.0.0';

const server = http.createServer(app);

server.listen(port, host, () => {
    console.log('El servidor está funcionando');
});