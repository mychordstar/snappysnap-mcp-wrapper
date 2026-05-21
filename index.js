#!/usr/bin/env node
const { spawn } = require('child_process');

const server = spawn('C:\\Program Files\\SnappySnap\\SnappyMCPServer.exe', ['--stdio'], {
  stdio: ['pipe', 'pipe', 'pipe']
});

process.stdin.pipe(server.stdin);
server.stdout.pipe(process.stdout);
server.stderr.pipe(process.stderr);

server.on('error', (err) => {
  console.error('Server error:', err);
  process.exit(1);
});