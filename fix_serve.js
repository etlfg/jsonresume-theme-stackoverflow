const http = require('http');
const fs = require('fs');
const path = require('path');
const theme = require('./dist/index.js');
const resume = require('@jsonresume/schema/sample.resume.json');

const server = http.createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost');
  const lang = url.searchParams.get('lang') || 'en';
  
  try {
    const html = theme.render(resume, { language: lang });
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(html);
  } catch (e) {
    console.error(e);
    res.writeHead(500);
    res.end('Internal Server Error');
  }
});

server.listen(3456, '0.0.0.0', () => {
  console.log('Resume preview at http://localhost:3456');
});
