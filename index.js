#!/usr/bin/env node
const { spawn } = require('child_process');

// Path to your SnappySnap Server
const exePath = "C:\\Program Files\\SnappySnap\\SnappyMCPServer.exe";

console.error("SnappySnap Wrapper: Starting...");

try {
    const server = spawn(exePath, ['--stdio'], {
        stdio: ['pipe', 'pipe', 'pipe'],
        cwd: "C:\\Program Files\\SnappySnap" // Set working directory
    });

    // Handle spawn errors (e.g. Permission Denied)
    server.on('error', (err) => {
        console.error("SnappySnap Wrapper Error (Permissions?):", err.message);
        process.exit(1);
    });

    // Handle server exit
    server.on('exit', (code) => {
        if (code !== 0) {
            console.error(`SnappySnap Wrapper: Server exited with code ${code}`);
        }
        process.exit(code || 1);
    });

    // Connect streams
    process.stdin.pipe(server.stdin);
    server.stdout.pipe(process.stdout);
    server.stderr.pipe(process.stderr);
    
    console.error("SnappySnap Wrapper: Connected.");

} catch (err) {
    console.error("SnappySnap Wrapper: Fatal Error:", err);
    process.exit(1);
}
