const http2 = require('http2');
const fs = require('fs');
const path = require('path');
const serveStatic = require('serve-static');

const PORT = process.env.PORT || 8443;

const serve = serveStatic('dist', {
  index: 'index.html',
});

/*** Vanilla Node.js Server ***/

const server = http2.createSecureServer(
  {
    allowHTTP1: true,
    key: fs.readFileSync(
      path.join(__dirname, 'config', 'localhost-privkey.pem')
    ),
    cert: fs.readFileSync(path.join(__dirname, 'config', 'localhost-cert.pem')),
  },
  (req, res) => {
    serve(req, res, () => {
      console.log('next function: File', req.headers[':path'], 'not found');
    });
  }
);

server.listen(PORT);
