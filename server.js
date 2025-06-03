const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8000; // Ou outra porta de sua preferência

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    fs.readFile(path.join(__dirname, 'index.html'), (err, data) => { // Substitua 'index.html' pelo seu arquivo HTML
      if (err) {
        res.writeHead(500);
        res.end('Erro ao ler o arquivo');
        return;
      }
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(data);
    });
  } else {
    res.writeHead(404);
    res.end('Página não encontrada');
  }
});

server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});