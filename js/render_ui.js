/* === RENDER_UI.JS ===
   Controls, logs, turn indicators, overlays
*/

const RenderUI = {
    turnTimer: {
        id: null,
        durationMs: 10000,
        startTs: 0,
        turn: null
    },

    setTurnWaitOverlays(turn) {
        const p1Wait = document.getElementById('p1-wait-overlay');
        const p2Wait = document.getElementById('p2-wait-overlay');
        if (p1Wait) p1Wait.classList.toggle('hidden', turn === 'p1');
        if (p2Wait) p2Wait.classList.toggle('hidden', turn === 'p2');
    },

    startTurnTimer(turn) {
        const fill = document.getElementById('turn-timer-fill');
        if (!fill) return;

        this.stopTurnTimer();
        this.turnTimer.turn = turn;
        this.turnTimer.startTs = Date.now();
        fill.style.width = '100%';

        this.turnTimer.id = setInterval(() => {
            const elapsed = Date.now() - this.turnTimer.startTs;
            const pct = Math.max(0, 1 - elapsed / this.turnTimer.durationMs);
            fill.style.width = `${Math.round(pct * 100)}%`;
            if (pct <= 0) {
                this.stopTurnTimer();
                if (window.GameCore && !window.GameCore.state.isBlocked && !window.GameCore.state.forcedSwitch) {
                    this.log(`${turn.toUpperCase()} ran out of time!`, 'text-red-400');
                    window.GameCore.skipTurn(turn);
                }
            }
        }, 120);
    },

    stopTurnTimer() {
        if (this.turnTimer.id) {
            clearInterval(this.turnTimer.id);
            this.turnTimer.id = null;
        }
    },

    updateControls(p1Mon, p2Mon, turn) {
        const p1Panel = document.getElementById('p1-actions');
        const p2Panel = document.getElementById('p2-actions');

        const createButtons = (mon, playerKey) => {
            if(mon.fainted) return `<div class="text-center text-red-500 font-bold p-2">FAINTED</div>`;
            
            return mon.moves.map((m, i) => `
                <button class="move-btn" style="--move-color:${window.RenderFX.getTypeColor(m.type)};--move-bg:rgba(${window.RenderFX.getTypeRGB(m.type).r},${window.RenderFX.getTypeRGB(m.type).g},${window.RenderFX.getTypeRGB(m.type).b},0.16);--move-bg-hover:rgba(${window.RenderFX.getTypeRGB(m.type).r},${window.RenderFX.getTypeRGB(m.type).g},${window.RenderFX.getTypeRGB(m.type).b},0.26)" onclick="window.GameCore.handleMove('${playerKey}', ${i})">
                    <span class="move-name">${m.name}</span>
                    <span class="type-badge" style="background-color: ${window.RenderFX.getTypeColor(m.type)}">${m.type}</span>
                </button>
            `).join('');
        };

        if(p1Panel) p1Panel.innerHTML = createButtons(p1Mon, 'p1');
        if(p2Panel) p2Panel.innerHTML = createButtons(p2Mon, 'p2');

        this.setTurnWaitOverlays(turn);
        if (window.RenderFX) window.RenderFX.updateArenaEnvironment(p1Mon, p2Mon);

        const p1Container = document.getElementById('p1-controls-box');
        const p2Container = document.getElementById('p2-controls-box');
        
        if(p1Container && p2Container) {
            if(turn === 'p1') {
                p1Container.style.opacity = '1';
                p1Container.style.pointerEvents = 'auto';
                p2Container.style.opacity = '0.5';
                p2Container.style.pointerEvents = 'none';
            } else {
                p1Container.style.opacity = '0.5';
                p1Container.style.pointerEvents = 'none';
                p2Container.style.opacity = '1';
                p2Container.style.pointerEvents = 'auto';
            }
        }
    },

    updateTurnUI(turn) {
        const badge = document.getElementById('turn-badge');
        if(badge) {
            badge.innerText = turn === 'p1' ? "PLAYER 1 TURN" : "PLAYER 2 TURN";
            badge.style.backgroundColor = turn === 'p1' ? 'var(--accent-p1)' : 'var(--accent-p2)';
        }

        // Update turn indicator text
        const indicatorText = document.getElementById('turn-indicator-text');
        if (indicatorText) {
            const isOnline = window.OnlineGame && window.OnlineGame.isOnline;
            const isMyTurn = isOnline ? (turn === 'p1') : true; // In online, p1 is always "me"
            const isForcedSwitch = window.GameCore && window.GameCore.state.forcedSwitch;
            
            if (isOnline) {
                if (isForcedSwitch && isMyTurn) {
                    indicatorText.innerText = 'Choose New Pokémon';
                    indicatorText.style.color = '#ef4444';
                } else if (isMyTurn) {
                    indicatorText.innerText = 'Your Turn';
                    indicatorText.style.color = '#22c55e';
                } else {
                    indicatorText.innerText = 'Opponent\'s Turn';
                    indicatorText.style.color = '#9ca3af';
                }
            } else {
                indicatorText.innerText = '';
            }
        }

        this.setTurnWaitOverlays(turn);
        this.startTurnTimer(turn);
    },

    toggleInputBlocker(show, text="WAITING...") {
        const blocker = document.getElementById('input-blocker');
        if(!blocker) return;
        const txt = blocker.querySelector('.wait-text');
        
        if(show) {
            blocker.classList.remove('hidden');
            if(txt) txt.innerText = text;
        } else {
            blocker.classList.add('hidden');
        }
    },

    log(msg, colorClass="text-gray-300") {
        const logBox = document.getElementById('battle-log');
        if(!logBox) return;
        
        const div = document.createElement('div');
        div.className = `log-entry ${colorClass}`;
        div.innerText = `> ${msg}`;
        logBox.prepend(div);
    },

    showGameOver(winnerKey) {
        const overlay = document.getElementById('game-over-overlay');
        const text = overlay.querySelector('h1');
        
        overlay.classList.remove('hidden');
        text.innerText = winnerKey === 'p1' ? "PLAYER 1 WINS!" : "PLAYER 2 WINS!";
        text.style.color = winnerKey === 'p1' ? 'var(--accent-p1)' : 'var(--accent-p2)';
        
        // Show rematch options in online mode
        const isOnline = window.OnlineGame && window.OnlineGame.isOnline;
        const rematchOptions = document.getElementById('rematch-options');
        if (rematchOptions) {
            if (isOnline) {
                rematchOptions.classList.remove('hidden');
                rematchOptions.style.display = 'flex';
            } else {
                rematchOptions.classList.add('hidden');
                rematchOptions.style.display = 'none';
            }
        }
    }
};

window.RenderUI = RenderUI;
