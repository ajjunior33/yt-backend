const http = require('http');
const app = require('./app/app');


const server = http.createServer(app);
const port = process.env.PORT || 3333;
server.listen(port, () => {
  console.log("Server is running in port 3333");
});