/**
 * Online Lobby - Handles lobby UI and room management
 */

const OnlineLobby = {
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

    _showLobbyStatus(message) {
        const statusEl = document.getElementById('lobby-status');
        if (statusEl) statusEl.innerText = message;
    },

    _showAlert(message) {
        alert(message);
    },

    _applyPlayerNamesToUI(myName, opponentName) {
        const p1Label = document.querySelector('.team-label.label-p1');
        if (p1Label && p1Label.childNodes && p1Label.childNodes.length > 0) {
            p1Label.childNodes[0].textContent = `${myName} Team `;
        }

        const p2Label = document.querySelector('.team-label.label-p2');
        if (p2Label && p2Label.childNodes && p2Label.childNodes.length > 0) {
            p2Label.childNodes[p2Label.childNodes.length - 1].textContent = `${opponentName} Team`;
        }

        const p1Header = document.querySelector('#p1-controls-box .action-header');
        if (p1Header) p1Header.textContent = `${myName} Moves`;

        const p2Header = document.querySelector('#p2-controls-box .action-header');
        if (p2Header) p2Header.textContent = `${opponentName} Moves`;
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

window.OnlineLobby = OnlineLobby;
