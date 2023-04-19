const net = require('net');
const { promptsEnum } =require('./manual-content/prompts');
const PORT = 3000;

const server = net.createServer();

server.listen(PORT, () => {
  console.log(`Server is Listening on ${PORT}`);
});

let id = 0;
const nextId = () => {
  return id ++;
}

const listofSockets = [];

const handleUserResponse = (data, socket) => {
  const sanatizedData = data.trim();
  switch(sanatizedData){
    case 'y':
      return socket.write(`${promptsEnum.welcome}\n proceeed? enter/run`);
    case 'enter':
      return socket.write(`${promptsEnum.firstRoom}`)  
    default:
      return socket.write(`FINE! Ill build my own snowman`);
  }

}


server.on('connection', (socket) => {
  socket.id = nextId();
  listofSockets.push(socket);
  console.log('a user has connected', socket.id);

  socket.setEncoding('utf-8');
  socket.write(`You have connected to server on port: ${PORT}\n`);
  socket.write('Do you want to go on an adventure? y/n');

  socket.on('data', (data) => {
    console.log(`Player says: ${data}`)
    handleUserResponse(data, socket);
  });
})