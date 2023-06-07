const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  if (req.url === "/salvar" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
//By Israel Duarte
    req.on("end", () => {
      const { data } = JSON.parse(body);
      const now = new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });
      const dataWithTimestamp = `${data} - ${now}\n`;
      
      fs.appendFile('engrenagem.txt', dataWithTimestamp, (err) => {
        if (err) {
          console.error(err);
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Erro interno do servidor');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          res.end('Texto salvo com sucesso');
        }
      });
    });
  } else {
    fs.readFile('criptografia.html', (err, content) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Erro interno do servidor');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content);
      }
    });
  }
});

server.listen(3000, 'localhost', () => {
  console.log('Servidor em execução em http://localhost:3000');
});
