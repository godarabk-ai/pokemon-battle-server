/**
 * Online Game Controller
 * Main facade that delegates to OnlineLobby and OnlineBattle modules
 */

const OnlineGame = {
    isOnline: false,
    isHost: false,
    myDisplayKey: 'p1',
    opponentDisplayKey: 'p2',
    myName: 'Player 1',
    opponentName: 'Player 2',
    
    init() {
        this._setupNetworkCallbacks();
    },

    _toLocalKey(serverKey) {
        if (this.isHost) {
            return serverKey;
        } else {
            return serverKey === 'p1' ? 'p2' : 'p1';
        }
    },

    _toServerKey(localKey) {
        if (this.isHost) {
            return localKey;
        } else {
            return localKey === 'p1' ? 'p2' : 'p1';
        }
    },

    _isMyTurn() {
        if (!window.GameCore) return false;
        const serverTurn = GameCore.state.turn;
        const myServerKey = this.isHost ? 'p1' : 'p2';
        return serverTurn === myServerKey;
    },

    _setupNetworkCallbacks() {
        NetworkClient.callbacks.onConnected = () => {
            if (window.OnlineLobby) OnlineLobby._showLobbyStatus('Connected to server');
        };

        NetworkClient.callbacks.onDisconnected = (reason) => {
            if (window.OnlineLobby) OnlineLobby._showLobbyStatus('Disconnected: ' + reason);
            if (this.isOnline) {
                OnlineLobby._showAlert('Connection lost!');
            }
        };

        NetworkClient.callbacks.onRoomCreated = (data) => {
            this.isHost = true;
            if (window.OnlineLobby) OnlineLobby._showWaitingScreen(data.roomCode);
        };

        NetworkClient.callbacks.onRoomJoined = (data) => {
            this.isHost = false;
            if (window.OnlineLobby) OnlineLobby._showReadyScreen(data);
        };

        NetworkClient.callbacks.onOpponentJoined = (data) => {
            if (window.OnlineLobby) {
                OnlineLobby._showReadyScreen({
                    opponentName: data.opponentName,
                    roomCode: NetworkClient.roomCode
                });
            }
        };

        NetworkClient.callbacks.onOpponentLeft = () => {
            if (window.OnlineLobby) {
                OnlineLobby._showAlert('Opponent left the room');
                OnlineLobby._showWaitingScreen(NetworkClient.roomCode);
            }
        };

        NetworkClient.callbacks.onGameStart = (data) => {
            console.log('[OnlineGame] onGameStart received:', data);
            this._startOnlineBattle(data);
        };

        NetworkClient.callbacks.onBattleReady = (data) => {
            if (window.OnlineBattle) {
                OnlineBattle._initBattleWithTeams(data.p1Team, data.p2Team, this.isHost, this.myName, this.opponentName);
                this.showRestartButton();
                this._updateOnlineControls();
            }
        };

        NetworkClient.callbacks.onOpponentAction = (data) => {
            this._handleOpponentAction(data);
        };

        NetworkClient.callbacks.onTurnUpdate = (data) => {
            if (window.GameCore) {
                const serverTurn = data.turn;
                let localTurn;
                if (this.isHost) {
                    localTurn = serverTurn;
                } else {
                    localTurn = serverTurn === 'p1' ? 'p2' : 'p1';
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
            if (window.OnlineBattle) OnlineBattle._syncHp(data);
        };

        NetworkClient.callbacks.onFaintSync = (data) => {
            if (window.OnlineBattle) OnlineBattle._syncFaint(data);
        };

        NetworkClient.callbacks.onMatchEnded = (data) => {
            if (window.OnlineBattle) OnlineBattle._showMatchResult(data, this.isHost);
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
            if (window.OnlineLobby) OnlineLobby._showAlert(message);
        };

        NetworkClient.callbacks.onChatMessage = (data) => {
            if (window.OnlineLobby) OnlineLobby._displayChatMessage(data);
        };
    },

    // --- PUBLIC METHODS ---
    async goOnline() {
        try {
            await NetworkClient.connect();
            if (window.OnlineLobby) OnlineLobby._showOnlineLobby();
        } catch (err) {
            if (window.OnlineLobby) OnlineLobby._showAlert('Failed to connect to server');
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
            if (window.OnlineLobby) OnlineLobby._showAlert('Please enter a room code');
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
        if (window.OnlineLobby) OnlineLobby._showOnlineLobby();
    },

    goOffline() {
        NetworkClient.disconnect();
        this.isOnline = false;
        if (window.OnlineLobby) OnlineLobby._showMainMenu();
    },

    // --- GAME ACTIONS ---
    sendMove(moveIndex) {
        if (!this.isOnline) return;
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
    _startOnlineBattle(data) {
        console.log('[OnlineGame] _startOnlineBattle - setting isOnline=true');
        this.isOnline = true;
        this.myPlayerKey = NetworkClient.getMyPlayerKey();

        this.myName = this.isHost ? (data?.hostName || NetworkClient.playerName || 'Player 1') : (data?.guestName || NetworkClient.playerName || 'Player 2');
        this.opponentName = this.isHost ? (data?.guestName || NetworkClient.opponentName || 'Player 2') : (data?.hostName || NetworkClient.opponentName || 'Player 1');

        if (window.OnlineLobby) OnlineLobby._applyPlayerNamesToUI(this.myName, this.opponentName);
        
        const onlineLobby = document.getElementById('online-lobby');
        if (onlineLobby) onlineLobby.classList.add('hidden');
        
        this._draftAndSendTeam();
    },

    _draftAndSendTeam() {
        if (!window.GameCore) return;
        
        const pool = GameCore.getDraftPool();
        const count = GameCore.config.teamSize;
        
        const myTeam = [];
        const picked = GameCore.sampleUniqueMons(pool, count);
        for (let i = 0; i < count; i++) {
            myTeam.push(GameCore.hydrateMon(picked[i], i));
        }
        
        NetworkClient.sendTeam(myTeam);
        
        if (window.RenderEngine) {
            RenderEngine.toggleInputBlocker(true, 'Waiting for opponent...');
        }
    },

    _updateOnlineControls() {
        if (window.OnlineBattle) {
            OnlineBattle._updateOnlineControls(this.isHost, this.myName, this.opponentName);
        }
    },

    _handleOpponentAction(data) {
        const { action, payload, playerKey } = data;
        console.log('[OnlineGame] Handling opponent action:', action, payload, 'from server key:', playerKey);
        
        const localOpponentKey = 'p2';
        
        if (window.OnlineBattle) {
            switch (action) {
                case 'move':
                    OnlineBattle._executeOpponentMove(localOpponentKey, payload.moveIndex);
                    break;
                case 'switch':
                    OnlineBattle._executeOpponentSwitch(localOpponentKey, payload.newIndex);
                    break;
                case 'evolve':
                    OnlineBattle._executeOpponentEvolve(localOpponentKey);
                    break;
                case 'skip':
                    OnlineBattle._executeOpponentSkip(localOpponentKey);
                    break;
            }
        }
        
        this._updateOnlineControls();
    },

    // --- REMATCH/RESTART ---
    requestRematchSameTeam() {
        if (!this.isOnline) return;
        NetworkClient.requestRematch('same');
        if (window.OnlineLobby) OnlineLobby._showAlert('Rematch request sent! Waiting for opponent...');
    },

    requestRematchRandomTeam() {
        if (!this.isOnline) return;
        NetworkClient.requestRematch('random');
        if (window.OnlineLobby) OnlineLobby._showAlert('Rematch request sent! New teams will be drafted.');
    },

    requestRestartMatch() {
        if (!this.isOnline) return;
        const ok = window.confirm('Request to restart the match?');
        if (ok) {
            NetworkClient.requestRestart('same');
            if (window.OnlineLobby) OnlineLobby._showAlert('Restart request sent! Waiting for opponent...');
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
    }
};

window.OnlineGame = OnlineGame;
document.addEventListener('DOMContentLoaded', () => OnlineGame.init());
