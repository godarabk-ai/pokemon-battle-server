/**
 * Network Client - Handles Socket.io connection and multiplayer communication
 */

const NetworkClient = {
    socket: null,
    isConnected: false,
    isHost: false,
    roomCode: null,
    playerName: 'Player',
    opponentName: 'Opponent',
    serverUrl: 'https://pokemon-battle-server.onrender.com', // Change this to your server URL in production
    
    // Callbacks for UI updates
    callbacks: {
        onConnected: null,
        onDisconnected: null,
        onRoomCreated: null,
        onRoomJoined: null,
        onOpponentJoined: null,
        onOpponentLeft: null,
        onGameStart: null,
        onBattleReady: null,
        onOpponentAction: null,
        onTurnUpdate: null,
        onHpSync: null,
        onFaintSync: null,
        onMatchEnded: null,
        onRematchRequested: null,
        onRematchAccepted: null,
        onRematchStart: null,
        onRestartRequested: null,
        onRestartStart: null,
        onError: null,
        onChatMessage: null
    },

    init(serverUrl) {
        if (serverUrl) this.serverUrl = serverUrl;
        
        // Load Socket.io client dynamically if not present
        if (typeof io === 'undefined') {
            console.error('[Network] Socket.io client not loaded!');
            return false;
        }
        
        return true;
    },

    // Check if server is reachable (ping)
    async checkServerStatus() {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000);
            
            const response = await fetch(this.serverUrl + '/health', {
                method: 'GET',
                signal: controller.signal
            });
            
            clearTimeout(timeoutId);
            return response.ok;
        } catch (err) {
            console.log('[Network] Server ping failed:', err.message);
            return false;
        }
    },

    connect() {
        return new Promise((resolve, reject) => {
            if (this.socket && this.isConnected) {
                resolve();
                return;
            }

            console.log('[Network] Connecting to', this.serverUrl);
            
            this.socket = io(this.serverUrl, {
                transports: ['websocket', 'polling'],
                timeout: 10000,
                reconnection: true,
                reconnectionAttempts: 5,
                reconnectionDelay: 1000
            });

            this.socket.on('connect', () => {
                console.log('[Network] Connected:', this.socket.id);
                this.isConnected = true;
                if (this.callbacks.onConnected) this.callbacks.onConnected();
                resolve();
            });

            this.socket.on('connect_error', (err) => {
                console.error('[Network] Connection error:', err.message);
                this.isConnected = false;
                if (this.callbacks.onError) this.callbacks.onError('Connection failed: ' + err.message);
                reject(err);
            });

            this.socket.on('disconnect', (reason) => {
                console.log('[Network] Disconnected:', reason);
                this.isConnected = false;
                if (this.callbacks.onDisconnected) this.callbacks.onDisconnected(reason);
            });

            this._setupEventListeners();
        });
    },

    _setupEventListeners() {
        // Room events
        this.socket.on('room-created', (data) => {
            console.log('[Network] Room created:', data.roomCode);
            this.roomCode = data.roomCode;
            this.isHost = true;
            this.playerName = data.playerName;
            if (this.callbacks.onRoomCreated) this.callbacks.onRoomCreated(data);
        });

        this.socket.on('room-joined', (data) => {
            console.log('[Network] Joined room:', data.roomCode);
            this.roomCode = data.roomCode;
            this.isHost = false;
            this.playerName = data.playerName;
            this.opponentName = data.hostName;
            if (this.callbacks.onRoomJoined) this.callbacks.onRoomJoined(data);
        });

        this.socket.on('join-error', (data) => {
            console.error('[Network] Join error:', data.message);
            if (this.callbacks.onError) this.callbacks.onError(data.message);
        });

        this.socket.on('opponent-joined', (data) => {
            console.log('[Network] Opponent joined:', data.opponentName);
            this.opponentName = data.opponentName;
            if (this.callbacks.onOpponentJoined) this.callbacks.onOpponentJoined(data);
        });

        this.socket.on('opponent-left', () => {
            console.log('[Network] Opponent left');
            this.opponentName = null;
            if (this.callbacks.onOpponentLeft) this.callbacks.onOpponentLeft();
        });

        this.socket.on('host-left', () => {
            console.log('[Network] Host left - room closed');
            this.roomCode = null;
            if (this.callbacks.onError) this.callbacks.onError('Host left the room');
            if (this.callbacks.onDisconnected) this.callbacks.onDisconnected('host-left');
        });

        // Ready state
        this.socket.on('ready-state', (data) => {
            console.log('[Network] Ready state:', data);
        });

        // Game events
        this.socket.on('game-start', (data) => {
            console.log('[Network] Game starting!');
            if (this.callbacks.onGameStart) this.callbacks.onGameStart(data);
        });

        this.socket.on('battle-ready', (data) => {
            console.log('[Network] Battle ready - teams received');
            if (this.callbacks.onBattleReady) this.callbacks.onBattleReady(data);
        });

        this.socket.on('opponent-action', (data) => {
            console.log('[Network] Opponent action:', data.action);
            if (this.callbacks.onOpponentAction) this.callbacks.onOpponentAction(data);
        });

        this.socket.on('action-rejected', (data) => {
            const reason = data?.reason || 'Action rejected';
            console.warn('[Network] Action rejected:', reason);
            if (this.callbacks.onError) this.callbacks.onError(reason);
        });

        this.socket.on('turn-update', (data) => {
            console.log('[Network] Turn update:', data.turn);
            if (this.callbacks.onTurnUpdate) this.callbacks.onTurnUpdate(data);
        });

        this.socket.on('hp-sync', (data) => {
            if (this.callbacks.onHpSync) this.callbacks.onHpSync(data);
        });

        this.socket.on('faint-sync', (data) => {
            if (this.callbacks.onFaintSync) this.callbacks.onFaintSync(data);
        });

        this.socket.on('match-ended', (data) => {
            console.log('[Network] Match ended - winner:', data.winnerName);
            if (this.callbacks.onMatchEnded) this.callbacks.onMatchEnded(data);
        });

        this.socket.on('rematch-requested', (data) => {
            console.log('[Network] Rematch requested by:', data.from);
            if (this.callbacks.onRematchRequested) this.callbacks.onRematchRequested(data);
        });

        this.socket.on('rematch-accepted', (data) => {
            console.log('[Network] Rematch accepted!');
            if (this.callbacks.onRematchAccepted) this.callbacks.onRematchAccepted(data);
        });

        this.socket.on('rematch-start', (data) => {
            console.log('[Network] Rematch start:', data);
            if (this.callbacks.onRematchStart) this.callbacks.onRematchStart(data);
        });

        this.socket.on('restart-requested', (data) => {
            console.log('[Network] Restart requested by:', data.from);
            if (this.callbacks.onRestartRequested) this.callbacks.onRestartRequested(data);
        });

        this.socket.on('restart-start', (data) => {
            console.log('[Network] Restart start:', data);
            if (this.callbacks.onRestartStart) this.callbacks.onRestartStart(data);
        });

        this.socket.on('room-expired', () => {
            console.log('[Network] Room expired');
            this.roomCode = null;
            if (this.callbacks.onError) this.callbacks.onError('Room expired due to inactivity');
        });

        this.socket.on('chat-message', (data) => {
            if (this.callbacks.onChatMessage) this.callbacks.onChatMessage(data);
        });

        this.socket.on('state-sync', (data) => {
            console.log('[Network] State sync received');
            // Handle state synchronization for reconnection
        });
    },

    // --- ACTIONS ---
    createRoom(playerName) {
        if (!this.socket) return;
        this.playerName = playerName || 'Player 1';
        this.socket.emit('create-room', { playerName: this.playerName });
    },

    joinRoom(roomCode, playerName) {
        if (!this.socket) return;
        this.playerName = playerName || 'Player 2';
        this.socket.emit('join-room', { roomCode, playerName: this.playerName });
    },

    setReady() {
        if (!this.socket) return;
        console.log('[Network] Emitting player-ready');
        this.socket.emit('player-ready');
    },

    sendTeam(team) {
        if (!this.socket) return;
        this.socket.emit('team-drafted', { team });
    },

    sendAction(type, payload) {
        if (!this.socket) return;
        console.log('[Network] Sending action:', type, payload);
        this.socket.emit('game-action', { type, payload });
    },

    sendTurnChange(turn, turnId) {
        if (!this.socket) return;
        this.socket.emit('turn-changed', { turn, turnId });
    },

    sendHpUpdate(playerKey, monIndex, currentHp, maxHp, fainted) {
        if (!this.socket) return;
        this.socket.emit('hp-update', { playerKey, monIndex, currentHp, maxHp, fainted });
    },

    sendFaint(playerKey, monIndex) {
        if (!this.socket) return;
        this.socket.emit('pokemon-fainted', { playerKey, monIndex });
    },

    sendGameOver(winner) {
        if (!this.socket) return;
        this.socket.emit('game-over', { winner });
    },

    requestRematch(mode) {
        if (!this.socket) return;
        if (mode) {
            this.socket.emit('request-rematch', { mode });
        } else {
            this.socket.emit('request-rematch');
        }
    },

    acceptRematch(mode) {
        if (!this.socket) return;
        if (mode) {
            this.socket.emit('accept-rematch', { mode });
        } else {
            this.socket.emit('accept-rematch');
        }
    },

    requestRestart(mode) {
        if (!this.socket) return;
        if (mode) {
            this.socket.emit('restart-request', { mode });
        } else {
            this.socket.emit('restart-request');
        }
    },

    acceptRestart(mode) {
        if (!this.socket) return;
        if (mode) {
            this.socket.emit('restart-accept', { mode });
        } else {
            this.socket.emit('restart-accept');
        }
    },

    sendChat(message) {
        if (!this.socket) return;
        this.socket.emit('chat-message', { message });
    },

    leaveRoom() {
        if (!this.socket) return;
        this.socket.emit('leave-room');
        this.roomCode = null;
        this.isHost = false;
    },

    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
        }
        this.isConnected = false;
        this.roomCode = null;
        this.isHost = false;
    },

    // Get player key based on host status
    getMyPlayerKey() {
        return this.isHost ? 'p1' : 'p2';
    },

    getOpponentPlayerKey() {
        return this.isHost ? 'p2' : 'p1';
    }
};

// Expose globally
window.NetworkClient = NetworkClient;
