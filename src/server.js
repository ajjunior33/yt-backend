const http = require('http');
const app = require('./app/app');


const server = http.createServer(app);

server.listen(3333, () => {
  console.log("Server is running in port 3333");
});