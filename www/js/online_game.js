/**
 * Online Game Controller
 * Bridges NetworkClient with GameCore for online multiplayer battles
 * 
 * KEY CONCEPT: Each player sees themselves as "Player 1" (left side)
 * and their opponent as "Player 2" (right side), regardless of host/guest status.
 * This is achieved by swapping teams when initializing the battle.
 */

const OnlineGame = {
    isOnline: false,
    isHost: false,        // True if we created the room
    myDisplayKey: 'p1',   // Always 'p1' - we always see ourselves on left
    opponentDisplayKey: 'p2', // Always 'p2' - opponent always on right
    myName: 'Player 1',
    opponentName: 'Player 2',
    
    init() {
        this._setupNetworkCallbacks();
    },

    // Convert server player key to our local display key
    _toLocalKey(serverKey) {
        // If we're host: p1 on server = p1 on display (our side)
        // If we're guest: p2 on server = p1 on display (our side)
        if (this.isHost) {
            return serverKey; // No swap needed
        } else {
            return serverKey === 'p1' ? 'p2' : 'p1'; // Swap
        }
    },

    // Convert our local display key to server key
    _toServerKey(localKey) {
        if (this.isHost) {
            return localKey;
        } else {
            return localKey === 'p1' ? 'p2' : 'p1';
        }
    },

    // Check if it's MY turn (in local perspective)
    _isMyTurn() {
        if (!window.GameCore) return false;
        const serverTurn = GameCore.state.turn;
        const myServerKey = this.isHost ? 'p1' : 'p2';
        return serverTurn === myServerKey;
    },

    _setupNetworkCallbacks() {
        NetworkClient.callbacks.onConnected = () => {
            this._showLobbyStatus('Connected to server');
        };

        NetworkClient.callbacks.onDisconnected = (reason) => {
            this._showLobbyStatus('Disconnected: ' + reason);
            if (this.isOnline) {
                this._showAlert('Connection lost!');
            }
        };

        NetworkClient.callbacks.onRoomCreated = (data) => {
            this.isHost = true;
            this._showWaitingScreen(data.roomCode);
        };

        NetworkClient.callbacks.onRoomJoined = (data) => {
            this.isHost = false;
            this._showReadyScreen(data);
        };

        NetworkClient.callbacks.onOpponentJoined = (data) => {
            this._showReadyScreen({
                opponentName: data.opponentName,
                roomCode: NetworkClient.roomCode
            });
        };

        NetworkClient.callbacks.onOpponentLeft = () => {
            this._showAlert('Opponent left the room');
            this._showWaitingScreen(NetworkClient.roomCode);
        };

        NetworkClient.callbacks.onGameStart = (data) => {
            console.log('[OnlineGame] onGameStart received:', data);
            this._startOnlineBattle(data);
        };

        NetworkClient.callbacks.onBattleReady = (data) => {
            this._initBattleWithTeams(data.p1Team, data.p2Team);
        };

        NetworkClient.callbacks.onOpponentAction = (data) => {
            this._handleOpponentAction(data);
        };

        NetworkClient.callbacks.onTurnUpdate = (data) => {
            // Server sends turn as p1/p2 (where p1=host, p2=guest)
            // Translate to local perspective where p1=me, p2=opponent
            if (window.GameCore) {
                const serverTurn = data.turn;
                // If I'm host: server p1 = local p1 (my turn)
                // If I'm guest: server p2 = local p1 (my turn)
                let localTurn;
                if (this.isHost) {
                    localTurn = serverTurn; // No translation needed
                } else {
                    localTurn = serverTurn === 'p1' ? 'p2' : 'p1'; // Swap
                }
                GameCore.state.turn = localTurn;
                GameCore.state.turnId = data.turnId;
                this._updateOnlineControls();
                
                if (window.RenderEngine) {
                    RenderEngine.updateTurnUI(localTurn);
                    RenderEngine.updateControls(
                        GameCore.state.p1.team[GameCore.state.p1.activeIdx],
                        GameCore.state.p2.team[GameCore.state.p2.activeIdx],
                        localTurn
                    );
                }
            }
        };

        NetworkClient.callbacks.onHpSync = (data) => {
            this._syncHp(data);
        };

        NetworkClient.callbacks.onFaintSync = (data) => {
            this._syncFaint(data);
        };

        NetworkClient.callbacks.onMatchEnded = (data) => {
            this._showMatchResult(data);
        };

        NetworkClient.callbacks.onRematchRequested = (data) => {
            this._showRematchPrompt(data);
        };

        NetworkClient.callbacks.onRematchAccepted = (data) => {
            this._startRematch(data);
        };

        NetworkClient.callbacks.onRematchStart = (data) => {
            this._startRematch(data);
        };

        NetworkClient.callbacks.onRestartRequested = (data) => {
            this._showRestartPrompt(data);
        };

        NetworkClient.callbacks.onRestartStart = (data) => {
            this._handleRestartStart(data);
        };

        NetworkClient.callbacks.onError = (message) => {
            this._showAlert(message);
        };

        NetworkClient.callbacks.onChatMessage = (data) => {
            this._displayChatMessage(data);
        };
    },

    // --- PUBLIC METHODS ---
    async goOnline() {
        try {
            await NetworkClient.connect();
            this._showOnlineLobby();
        } catch (err) {
            this._showAlert('Failed to connect to server');
        }
    },

    createRoom() {
        const nameInput = document.getElementById('online-player-name');
        const name = nameInput ? nameInput.value.trim() || 'Player' : 'Player';
        NetworkClient.createRoom(name);
    },

    joinRoom() {
        const codeInput = document.getElementById('room-code-input');
        const nameInput = document.getElementById('online-player-name');
        const code = codeInput ? codeInput.value.trim() : '';
        const name = nameInput ? nameInput.value.trim() || 'Player' : 'Player';
        
        if (!code) {
            this._showAlert('Please enter a room code');
            return;
        }
        
        NetworkClient.joinRoom(code, name);
    },

    setReady() {
        console.log('[OnlineGame] setReady called');
        NetworkClient.setReady();
        const readyBtn = document.getElementById('online-ready-btn');
        if (readyBtn) {
            readyBtn.disabled = true;
            readyBtn.innerText = 'WAITING...';
        }
    },

    leaveRoom() {
        NetworkClient.leaveRoom();
        this.isOnline = false;
        this._showOnlineLobby();
    },

    goOffline() {
        NetworkClient.disconnect();
        this.isOnline = false;
        this._showMainMenu();
    },

    // --- GAME ACTIONS (called by modified GameCore) ---
    sendMove(moveIndex) {
        console.log('[OnlineGame] sendMove called, isOnline:', this.isOnline);
        if (!this.isOnline) {
            console.log('[OnlineGame] sendMove SKIPPED - not online');
            return;
        }
        NetworkClient.sendAction('move', { moveIndex });
    },

    sendSwitch(newIndex) {
        if (!this.isOnline) return;
        NetworkClient.sendAction('switch', { newIndex });
    },

    sendEvolve() {
        if (!this.isOnline) return;
        NetworkClient.sendAction('evolve', {});
    },

    sendSkip() {
        if (!this.isOnline) return;
        NetworkClient.sendAction('skip', {});
    },

    // --- INTERNAL METHODS ---
    _showOnlineLobby() {
        const setupScreen = document.getElementById('setup-screen');
        const onlineLobby = document.getElementById('online-lobby');
        
        if (setupScreen) setupScreen.classList.add('hidden');
        if (onlineLobby) onlineLobby.classList.remove('hidden');
        
        // Reset lobby state
        const waitingDiv = document.getElementById('lobby-waiting');
        const readyDiv = document.getElementById('lobby-ready');
        const lobbyMain = document.getElementById('lobby-main');
        
        if (waitingDiv) waitingDiv.classList.add('hidden');
        if (readyDiv) readyDiv.classList.add('hidden');
        if (lobbyMain) lobbyMain.classList.remove('hidden');
    },

    _showMainMenu() {
        const setupScreen = document.getElementById('setup-screen');
        const onlineLobby = document.getElementById('online-lobby');
        
        if (setupScreen) setupScreen.classList.remove('hidden');
        if (onlineLobby) onlineLobby.classList.add('hidden');
    },

    _showWaitingScreen(roomCode) {
        const lobbyMain = document.getElementById('lobby-main');
        const waitingDiv = document.getElementById('lobby-waiting');
        const codeDisplay = document.getElementById('display-room-code');
        
        if (lobbyMain) lobbyMain.classList.add('hidden');
        if (waitingDiv) waitingDiv.classList.remove('hidden');
        if (codeDisplay) codeDisplay.innerText = roomCode;
    },

    _showReadyScreen(data) {
        const lobbyMain = document.getElementById('lobby-main');
        const waitingDiv = document.getElementById('lobby-waiting');
        const readyDiv = document.getElementById('lobby-ready');
        const opponentNameEl = document.getElementById('opponent-name-display');
        
        if (lobbyMain) lobbyMain.classList.add('hidden');
        if (waitingDiv) waitingDiv.classList.add('hidden');
        if (readyDiv) readyDiv.classList.remove('hidden');
        
        const oppName = data.opponentName || data.hostName || NetworkClient.opponentName;
        if (opponentNameEl) opponentNameEl.innerText = oppName;
        
        const readyBtn = document.getElementById('online-ready-btn');
        if (readyBtn) {
            readyBtn.disabled = false;
            readyBtn.innerText = 'READY!';
        }
    },

    _startOnlineBattle(data) {
        console.log('[OnlineGame] _startOnlineBattle - setting isOnline=true');
        this.isOnline = true;
        this.myPlayerKey = NetworkClient.getMyPlayerKey();

        this.myName = this.isHost ? (data?.hostName || NetworkClient.playerName || 'Player 1') : (data?.guestName || NetworkClient.playerName || 'Player 2');
        this.opponentName = this.isHost ? (data?.guestName || NetworkClient.opponentName || 'Player 2') : (data?.hostName || NetworkClient.opponentName || 'Player 1');

        this._applyPlayerNamesToUI();
        
        // Hide lobby
        const onlineLobby = document.getElementById('online-lobby');
        if (onlineLobby) onlineLobby.classList.add('hidden');
        
        // Both players draft their teams locally then send to server
        this._draftAndSendTeam();
    },

    _draftAndSendTeam() {
        // Use existing draft logic
        if (!window.GameCore) return;
        
        const pool = GameCore.getDraftPool();
        const count = GameCore.config.teamSize;
        
        // Each player drafts their own team
        const myTeam = [];
        const picked = GameCore.sampleUniqueMons(pool, count);
        for (let i = 0; i < count; i++) {
            myTeam.push(GameCore.hydrateMon(picked[i], i));
        }
        
        // Send to server
        NetworkClient.sendTeam(myTeam);
        
        // Show waiting message
        if (window.RenderEngine) {
            RenderEngine.toggleInputBlocker(true, 'Waiting for opponent...');
        }
    },

    _initBattleWithTeams(serverP1Team, serverP2Team) {
        if (!window.GameCore) return;
        
        // Show restart button in online mode
        this.showRestartButton();
        
        // KEY FIX: Swap teams for guest so each player sees themselves on left (as "p1")
        // Host: p1=my team, p2=opponent team (no swap)
        // Guest: p1=opponent team, p2=my team -> swap so p1=my team, p2=opponent
        let myTeam, opponentTeam;
        if (this.isHost) {
            myTeam = serverP1Team;
            opponentTeam = serverP2Team;
        } else {
            myTeam = serverP2Team;      // Guest's team was sent as p2
            opponentTeam = serverP1Team; // Host's team was p1
        }
        
        // Set teams - locally, p1 is always MY team, p2 is always opponent
        GameCore.state.p1.team = myTeam;
        GameCore.state.p2.team = opponentTeam;
        GameCore.state.p1.activeIdx = 0;
        GameCore.state.p2.activeIdx = 0;
        GameCore.state.p1.evolutionUsed = false;
        GameCore.state.p2.evolutionUsed = false;
        
        // Turn: server says 'p1' means host's turn
        // For display: if I'm host and it's p1's turn, it's MY turn (p1 locally)
        // If I'm guest and it's p1's turn, it's OPPONENT's turn (p2 locally)
        GameCore.state.turn = this.isHost ? 'p1' : 'p2'; // Host goes first, guest waits
        GameCore.state.turnId = 0;
        GameCore.state.isBlocked = false;
        GameCore.state.forcedSwitch = false;
        
        // Initialize rendering - now p1 is always "me" on left, p2 is opponent on right
        if (window.RenderEngine) {
            RenderEngine.initBench(myTeam, opponentTeam);
            RenderEngine.spawnPokemon('p1', myTeam[0]);
            RenderEngine.spawnPokemon('p2', opponentTeam[0]);
            RenderEngine.updateTurnUI(GameCore.state.turn);
            RenderEngine.updateControls(myTeam[0], opponentTeam[0], GameCore.state.turn);
            RenderEngine.toggleInputBlocker(false);
            RenderEngine.log(`Online Battle Started!`, 'text-yellow-400');
        }

        const gameOver = document.getElementById('game-over-overlay');
        if (gameOver) gameOver.classList.add('hidden');
        const rematchOptions = document.getElementById('rematch-options');
        if (rematchOptions) rematchOptions.classList.add('hidden');
        
        // Update control visibility - only show p1 controls (my side)
        this._updateOnlineControls();
    },

    _applyPlayerNamesToUI() {
        const p1Label = document.querySelector('.team-label.label-p1');
        if (p1Label && p1Label.childNodes && p1Label.childNodes.length > 0) {
            p1Label.childNodes[0].textContent = `${this.myName} Team `;
        }

        const p2Label = document.querySelector('.team-label.label-p2');
        if (p2Label && p2Label.childNodes && p2Label.childNodes.length > 0) {
            p2Label.childNodes[p2Label.childNodes.length - 1].textContent = `${this.opponentName} Team`;
        }

        const p1Header = document.querySelector('#p1-controls-box .action-header');
        if (p1Header) p1Header.textContent = `${this.myName} Moves`;

        const p2Header = document.querySelector('#p2-controls-box .action-header');
        if (p2Header) p2Header.textContent = `${this.opponentName} Moves`;
    },

    _updateOnlineControls() {
        // In our local view, we are ALWAYS p1 (left side)
        // So we always show p1 controls and hide p2 controls
        const p1Container = document.getElementById('p1-controls-box');
        const p2Container = document.getElementById('p2-controls-box');
        const currentTurn = GameCore.state.turn;
        
        // Hide opponent's controls completely
        if (p2Container) p2Container.style.display = 'none';
        
        // Show our controls (p1), enable only when it's our turn
        if (p1Container) {
            p1Container.style.display = 'block';
            const isMyTurn = currentTurn === 'p1'; // Locally, p1 is always us
            p1Container.style.opacity = isMyTurn ? '1' : '0.5';
            p1Container.style.pointerEvents = isMyTurn ? 'auto' : 'none';
        }
        
        // Also hide opponent's bench click handlers
        const p2Bench = document.querySelector('.p2-bench');
        if (p2Bench) {
            p2Bench.style.pointerEvents = 'none';
        }
    },

    _handleOpponentAction(data) {
        const { action, payload, playerKey } = data;
        
        console.log('[OnlineGame] Handling opponent action:', action, payload, 'from server key:', playerKey);
        
        // Opponent's actions always affect p2 in our local view (since we swapped perspective)
        // The server sends playerKey as p1 or p2, but locally opponent is always p2
        const localOpponentKey = 'p2';
        
        switch (action) {
            case 'move':
                this._executeOpponentMove(localOpponentKey, payload.moveIndex);
                break;
            case 'switch':
                this._executeOpponentSwitch(localOpponentKey, payload.newIndex);
                break;
            case 'evolve':
                this._executeOpponentEvolve(localOpponentKey);
                break;
            case 'skip':
                this._executeOpponentSkip(localOpponentKey);
                break;
        }
    },

    async _executeOpponentMove(playerKey, moveIndex) {
        if (!window.GameCore) return;
        
        // Execute the move as if it came from that player
        const attackerObj = playerKey === 'p1' ? GameCore.state.p1 : GameCore.state.p2;
        const defenderObj = playerKey === 'p1' ? GameCore.state.p2 : GameCore.state.p1;
        const defenderKey = playerKey === 'p1' ? 'p2' : 'p1';
        
        const attackerMon = attackerObj.team[attackerObj.activeIdx];
        const defenderMon = defenderObj.team[defenderObj.activeIdx];
        const move = attackerMon.moves[moveIndex];
        
        GameCore.state.isBlocked = true;
        if (window.RenderEngine) {
            RenderEngine.stopTurnTimer();
            RenderEngine.toggleInputBlocker(true, 'OPPONENT ATTACKING...');
        }
        
        try {
            if (window.GameLogic) {
                await GameLogic.executeTurn(playerKey, attackerMon, defenderMon, move);
            }
        } catch (e) {
            console.error('Opponent move execution failed:', e);
        }
        
        // Post turn check
        GameCore.postTurnCheck(playerKey, defenderMon);
        this._updateOnlineControls();
    },

    async _executeOpponentSwitch(playerKey, newIndex) {
        if (!window.GameCore) return;
        
        const playerObj = playerKey === 'p1' ? GameCore.state.p1 : GameCore.state.p2;
        const targetMon = playerObj.team[newIndex];
        
        playerObj.activeIdx = newIndex;
        
        if (window.RenderEngine) {
            RenderEngine.log(`${playerKey.toUpperCase()} switches to ${targetMon.name}!`);
            await RenderEngine.performSwitch(playerKey, targetMon);
        }
        
        // Handle turn logic
        if (GameCore.state.forcedSwitch) {
            GameCore.state.forcedSwitch = false;
            GameCore.state.turn = playerKey === 'p1' ? 'p2' : 'p1';
        } else {
            GameCore.state.turn = playerKey === 'p1' ? 'p2' : 'p1';
        }
        GameCore.state.turnId++;
        GameCore.state.isBlocked = false;
        
        if (window.RenderEngine) {
            RenderEngine.toggleInputBlocker(false);
            RenderEngine.updateTurnUI(GameCore.state.turn);
            RenderEngine.updateControls(
                GameCore.state.p1.team[GameCore.state.p1.activeIdx],
                GameCore.state.p2.team[GameCore.state.p2.activeIdx],
                GameCore.state.turn
            );
        }
        
        this._updateOnlineControls();
    },

    async _executeOpponentEvolve(playerKey) {
        if (!window.GameCore) return;
        await GameCore.evolvePokemon(playerKey);
        this._updateOnlineControls();
    },

    _executeOpponentSkip(playerKey) {
        if (!window.GameCore) return;
        
        if (window.RenderEngine) {
            RenderEngine.log(playerKey.toUpperCase() + ' skipped their turn!', 'text-gray-400');
        }
        
        GameCore.state.turn = playerKey === 'p1' ? 'p2' : 'p1';
        GameCore.state.turnId++;
        
        if (window.RenderEngine) {
            RenderEngine.updateTurnUI(GameCore.state.turn);
            RenderEngine.updateControls(
                GameCore.state.p1.team[GameCore.state.p1.activeIdx],
                GameCore.state.p2.team[GameCore.state.p2.activeIdx],
                GameCore.state.turn
            );
        }
        
        this._updateOnlineControls();
    },

    _syncHp(data) {
        if (!window.GameCore) return;
        
        const playerObj = data.playerKey === 'p1' ? GameCore.state.p1 : GameCore.state.p2;
        const mon = playerObj.team[data.monIndex];
        if (mon) {
            mon.currentHp = data.currentHp;
            mon.maxHp = data.maxHp;
            if (data.fainted) mon.fainted = true;
        }
        
        if (window.RenderEngine) {
            RenderEngine.updateUnit(data.playerKey, mon);
        }
    },

    _syncFaint(data) {
        if (!window.GameCore) return;
        
        const playerObj = data.playerKey === 'p1' ? GameCore.state.p1 : GameCore.state.p2;
        const mon = playerObj.team[data.monIndex];
        if (mon) {
            mon.fainted = true;
            mon.currentHp = 0;
        }
    },

    _showMatchResult(data) {
        // Server sends winner as p1/p2 (host/guest)
        // Translate: if I'm host and winner is p1, I win. If I'm guest and winner is p2, I win.
        const serverWinner = data.winner;
        const myServerKey = this.isHost ? 'p1' : 'p2';
        const isWinner = (serverWinner === myServerKey);
        
        if (window.RenderEngine) {
            const overlay = document.getElementById('game-over-overlay');
            const text = overlay ? overlay.querySelector('h1') : null;
            
            if (overlay) overlay.classList.remove('hidden');
            if (text) {
                text.innerText = isWinner ? 'YOU WIN!' : 'YOU LOSE!';
                text.style.color = isWinner ? '#22c55e' : '#ef4444';
            }
            
            // Show rematch options
            const rematchOptions = document.getElementById('rematch-options');
            if (rematchOptions) {
                rematchOptions.classList.remove('hidden');
                rematchOptions.style.display = 'flex';
            }
        }
    },

    requestRematchSameTeam() {
        if (!this.isOnline) return;
        NetworkClient.requestRematch('same');
        this._showAlert('Rematch request sent! Waiting for opponent...');
    },

    requestRematchRandomTeam() {
        if (!this.isOnline) return;
        NetworkClient.requestRematch('random');
        this._showAlert('Rematch request sent! New teams will be drafted.');
    },

    requestRestartMatch() {
        if (!this.isOnline) return;
        const ok = window.confirm('Request to restart the match?');
        if (ok) {
            NetworkClient.requestRestart('same');
            this._showAlert('Restart request sent! Waiting for opponent...');
        }
    },

    showRestartButton() {
        const restartBtn = document.getElementById('restart-match-btn');
        if (restartBtn && this.isOnline) {
            restartBtn.classList.remove('hidden');
        }
    },

    hideRestartButton() {
        const restartBtn = document.getElementById('restart-match-btn');
        if (restartBtn) {
            restartBtn.classList.add('hidden');
        }
    },

    _showRematchPrompt(data) {
        const fromName = data?.from || 'Opponent';
        const mode = data?.mode === 'random' ? 'random' : 'same';
        const accept = window.confirm(`${fromName} wants a rematch (${mode}). Accept?`);
        if (accept) {
            NetworkClient.acceptRematch(mode);
        }
    },

    _startRematch(data) {
        const mode = data?.mode === 'random' ? 'random' : (data?.mode === 'same' ? 'same' : null);
        if (!mode || mode === 'random') {
            this._draftAndSendTeam();
        }
    },

    _showRestartPrompt(data) {
        const fromName = data?.from || 'Opponent';
        const mode = data?.mode === 'random' ? 'random' : 'same';
        const accept = window.confirm(`${fromName} wants to restart the match (${mode}). Accept?`);
        if (accept) {
            NetworkClient.acceptRestart(mode);
        }
    },

    _handleRestartStart() {
        const gameOver = document.getElementById('game-over-overlay');
        if (gameOver) gameOver.classList.add('hidden');
        const rematchOptions = document.getElementById('rematch-options');
        if (rematchOptions) rematchOptions.classList.add('hidden');
        if (window.RenderEngine) {
            RenderEngine.toggleInputBlocker(true, 'Restarting match...');
        }
    },

    _showAlert(message) {
        // Could use a nicer modal, but alert works for now
        alert(message);
    },

    _showLobbyStatus(message) {
        const statusEl = document.getElementById('lobby-status');
        if (statusEl) statusEl.innerText = message;
    },

    _displayChatMessage(data) {
        const chatLog = document.getElementById('chat-log');
        if (!chatLog) return;
        
        const div = document.createElement('div');
        div.className = 'chat-message';
        div.innerHTML = `<strong>${data.sender}:</strong> ${data.message}`;
        chatLog.appendChild(div);
        chatLog.scrollTop = chatLog.scrollHeight;
    }
};

// Initialize when loaded
window.OnlineGame = OnlineGame;
document.addEventListener('DOMContentLoaded', () => OnlineGame.init());
