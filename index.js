/**
 * Pokemon Battle Online - Multiplayer Server
 * Handles room creation, matchmaking, and real-time game synchronization
 */

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// ============== GAME STATE ==============
const rooms = new Map();        // roomCode -> RoomState
const playerRooms = new Map();  // odId -> roomCode

// Room structure
function createRoom(hostSocketId, hostName) {
    const code = generateRoomCode();
    return {
        code,
        hostId: hostSocketId,
        guestId: null,
        hostName: hostName || 'Player 1',
        guestName: null,
        state: 'waiting', // waiting, drafting, battle, finished
        gameState: null,
        hostReady: false,
        guestReady: false,
        createdAt: Date.now()
    };
}

function generateRoomCode() {
    // Simple 3-digit numeric code (100-999)
    let code = String(Math.floor(100 + Math.random() * 900));
    // Ensure uniqueness
    if (rooms.has(code)) return generateRoomCode();
    return code;
}

// ============== SOCKET HANDLERS ==============
io.on('connection', (socket) => {
    console.log(`[CONNECT] ${socket.id}`);

    // --- CREATE ROOM ---
    socket.on('create-room', (data) => {
        const { playerName } = data || {};
        
        // Leave any existing room
        leaveCurrentRoom(socket);
        
        const room = createRoom(socket.id, playerName);
        rooms.set(room.code, room);
        playerRooms.set(socket.id, room.code);
        
        socket.join(room.code);
        
        console.log(`[ROOM CREATED] ${room.code} by ${socket.id}`);
        
        socket.emit('room-created', {
            roomCode: room.code,
            isHost: true,
            playerName: room.hostName
        });
    });

    // --- JOIN ROOM ---
    socket.on('join-room', (data) => {
        const { roomCode, playerName } = data || {};
        const code = (roomCode || '').toUpperCase().trim();
        
        const room = rooms.get(code);
        
        if (!room) {
            socket.emit('join-error', { message: 'Room not found. Check the code and try again.' });
            return;
        }
        
        if (room.guestId) {
            socket.emit('join-error', { message: 'Room is full.' });
            return;
        }
        
        if (room.hostId === socket.id) {
            socket.emit('join-error', { message: 'You are already the host of this room.' });
            return;
        }
        
        // Leave any existing room
        leaveCurrentRoom(socket);
        
        // Join the room
        room.guestId = socket.id;
        room.guestName = playerName || 'Player 2';
        room.state = 'ready';
        playerRooms.set(socket.id, code);
        
        socket.join(code);
        
        console.log(`[ROOM JOINED] ${code} by ${socket.id}`);
        
        // Notify joiner
        socket.emit('room-joined', {
            roomCode: code,
            isHost: false,
            hostName: room.hostName,
            playerName: room.guestName
        });
        
        // Notify host that someone joined
        io.to(room.hostId).emit('opponent-joined', {
            opponentName: room.guestName
        });
    });

    // --- PLAYER READY ---
    socket.on('player-ready', () => {
        const roomCode = playerRooms.get(socket.id);
        const room = rooms.get(roomCode);
        if (!room) return;
        
        if (socket.id === room.hostId) {
            room.hostReady = true;
        } else if (socket.id === room.guestId) {
            room.guestReady = true;
        }
        
        // Notify both players of ready state
        io.to(roomCode).emit('ready-state', {
            hostReady: room.hostReady,
            guestReady: room.guestReady
        });
        
        // Both ready? Start game!
        if (room.hostReady && room.guestReady) {
            room.state = 'battle';
            io.to(roomCode).emit('game-start', {
                hostName: room.hostName,
                guestName: room.guestName
            });
        }
    });

    // --- TEAM DRAFT COMPLETE (send team to server) ---
    socket.on('team-drafted', (data) => {
        const roomCode = playerRooms.get(socket.id);
        const room = rooms.get(roomCode);
        if (!room) return;
        
        const isHost = socket.id === room.hostId;
        
        if (!room.gameState) {
            room.gameState = { p1Team: null, p2Team: null, turn: 'p1', turnId: 0 };
        }
        
        if (isHost) {
            room.gameState.p1Team = data.team;
        } else {
            room.gameState.p2Team = data.team;
        }
        
        // Both teams ready?
        if (room.gameState.p1Team && room.gameState.p2Team) {
            io.to(roomCode).emit('battle-ready', {
                p1Team: room.gameState.p1Team,
                p2Team: room.gameState.p2Team
            });
        }
    });

    // --- GAME ACTION (move, switch, evolve) ---
    socket.on('game-action', (data) => {
        const roomCode = playerRooms.get(socket.id);
        const room = rooms.get(roomCode);
        if (!room || room.state !== 'battle') return;
        
        const isHost = socket.id === room.hostId;
        const playerKey = isHost ? 'p1' : 'p2';
        
        // Verify it's this player's turn
        if (room.gameState.turn !== playerKey) {
            socket.emit('action-rejected', { reason: 'Not your turn' });
            return;
        }
        
        console.log(`[ACTION] ${playerKey} in ${roomCode}:`, data.type);
        
        // Broadcast action to opponent
        const opponentId = isHost ? room.guestId : room.hostId;
        io.to(opponentId).emit('opponent-action', {
            action: data.type,
            payload: data.payload,
            playerKey
        });
        
        // Update turn
        room.gameState.turn = isHost ? 'p2' : 'p1';
        room.gameState.turnId++;
    });

    // --- GAME STATE SYNC (for reconnection or verification) ---
    socket.on('sync-state', (data) => {
        const roomCode = playerRooms.get(socket.id);
        const room = rooms.get(roomCode);
        if (!room) return;
        
        const isHost = socket.id === room.hostId;
        
        // Host is source of truth for game state
        if (isHost && data.gameState) {
            room.gameState = { ...room.gameState, ...data.gameState };
        }
        
        // Broadcast to opponent
        const opponentId = isHost ? room.guestId : room.hostId;
        if (opponentId) {
            io.to(opponentId).emit('state-sync', data.gameState);
        }
    });

    // --- TURN CHANGE NOTIFICATION ---
    socket.on('turn-changed', (data) => {
        const roomCode = playerRooms.get(socket.id);
        const room = rooms.get(roomCode);
        if (!room) return;
        
        room.gameState.turn = data.turn;
        room.gameState.turnId = data.turnId;
        
        // Broadcast to room
        io.to(roomCode).emit('turn-update', {
            turn: data.turn,
            turnId: data.turnId
        });
    });

    // --- HP UPDATE ---
    socket.on('hp-update', (data) => {
        const roomCode = playerRooms.get(socket.id);
        if (!roomCode) return;
        
        // Broadcast to opponent
        socket.to(roomCode).emit('hp-sync', data);
    });

    // --- POKEMON FAINTED ---
    socket.on('pokemon-fainted', (data) => {
        const roomCode = playerRooms.get(socket.id);
        if (!roomCode) return;
        
        socket.to(roomCode).emit('faint-sync', data);
    });

    // --- GAME OVER ---
    socket.on('game-over', (data) => {
        const roomCode = playerRooms.get(socket.id);
        const room = rooms.get(roomCode);
        if (!room) return;
        
        room.state = 'finished';
        io.to(roomCode).emit('match-ended', {
            winner: data.winner,
            winnerName: data.winner === 'p1' ? room.hostName : room.guestName
        });
    });

    // --- REMATCH REQUEST ---
    socket.on('request-rematch', () => {
        const roomCode = playerRooms.get(socket.id);
        const room = rooms.get(roomCode);
        if (!room) return;
        
        const isHost = socket.id === room.hostId;
        const opponentId = isHost ? room.guestId : room.hostId;
        
        if (opponentId) {
            io.to(opponentId).emit('rematch-requested', {
                from: isHost ? room.hostName : room.guestName
            });
        }
    });

    // --- ACCEPT REMATCH ---
    socket.on('accept-rematch', () => {
        const roomCode = playerRooms.get(socket.id);
        const room = rooms.get(roomCode);
        if (!room) return;
        
        // Reset room state
        room.state = 'ready';
        room.hostReady = false;
        room.guestReady = false;
        room.gameState = null;
        
        io.to(roomCode).emit('rematch-accepted');
    });

    // --- LEAVE ROOM ---
    socket.on('leave-room', () => {
        leaveCurrentRoom(socket);
    });

    // --- DISCONNECT ---
    socket.on('disconnect', () => {
        console.log(`[DISCONNECT] ${socket.id}`);
        leaveCurrentRoom(socket);
    });

    // --- CHAT MESSAGE ---
    socket.on('chat-message', (data) => {
        const roomCode = playerRooms.get(socket.id);
        if (!roomCode) return;
        
        const room = rooms.get(roomCode);
        const isHost = socket.id === room.hostId;
        const senderName = isHost ? room.hostName : room.guestName;
        
        io.to(roomCode).emit('chat-message', {
            sender: senderName,
            message: data.message,
            timestamp: Date.now()
        });
    });
});

function leaveCurrentRoom(socket) {
    const roomCode = playerRooms.get(socket.id);
    if (!roomCode) return;
    
    const room = rooms.get(roomCode);
    if (!room) {
        playerRooms.delete(socket.id);
        return;
    }
    
    socket.leave(roomCode);
    playerRooms.delete(socket.id);
    
    if (room.hostId === socket.id) {
        // Host left - notify guest and close room
        if (room.guestId) {
            io.to(room.guestId).emit('host-left');
            playerRooms.delete(room.guestId);
        }
        rooms.delete(roomCode);
        console.log(`[ROOM CLOSED] ${roomCode} - host left`);
    } else if (room.guestId === socket.id) {
        // Guest left - notify host
        room.guestId = null;
        room.guestName = null;
        room.guestReady = false;
        room.state = 'waiting';
        io.to(room.hostId).emit('opponent-left');
        console.log(`[GUEST LEFT] ${roomCode}`);
    }
}

// ============== REST ENDPOINTS ==============
app.get('/health', (req, res) => {
    res.json({ status: 'ok', rooms: rooms.size });
});

app.get('/room/:code', (req, res) => {
    const room = rooms.get(req.params.code.toUpperCase());
    if (!room) {
        return res.status(404).json({ error: 'Room not found' });
    }
    res.json({
        code: room.code,
        state: room.state,
        hasHost: !!room.hostId,
        hasGuest: !!room.guestId
    });
});

// ============== START SERVER ==============
const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
    console.log(`🎮 Pokemon Battle Server running on port ${PORT}`);
    console.log(`   Local: http://localhost:${PORT}`);
});

// Cleanup stale rooms every 5 minutes
setInterval(() => {
    const now = Date.now();
    const staleThreshold = 30 * 60 * 1000; // 30 minutes
    
    for (const [code, room] of rooms) {
        if (now - room.createdAt > staleThreshold && room.state === 'waiting') {
            if (room.hostId) {
                io.to(room.hostId).emit('room-expired');
                playerRooms.delete(room.hostId);
            }
            rooms.delete(code);
            console.log(`[CLEANUP] Stale room ${code} removed`);
        }
    }
}, 5 * 60 * 1000);
