/* RENDER UI - UI updates, controls, turn indicator, game over */

const RenderUI = {
    turnTimer: {
        id: null,
        durationMs: 30000,
        startTs: 0,
        turn: null,
        turnId: 0
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
        this.turnTimer.turnId = window.GameCore?.state?.turnId ?? 0;
        fill.style.width = '100%';

        const self = this;
        this.turnTimer.id = setInterval(() => {
            const elapsed = Date.now() - self.turnTimer.startTs;
            const pct = Math.max(0, 1 - elapsed / self.turnTimer.durationMs);
            fill.style.width = `${Math.round(pct * 100)}%`;
            if (pct <= 0) {
                self.stopTurnTimer();
                if (
                    window.GameCore &&
                    window.GameCore.state.turn === turn &&
                    window.GameCore.state.turnId === self.turnTimer.turnId &&
                    !window.GameCore.state.isBlocked &&
                    !window.GameCore.state.forcedSwitch
                ) {
                    const isOnline = window.OnlineGame && window.OnlineGame.isOnline;
                    if (isOnline && window.OnlineGame) {
                        const n = turn === 'p1' ? (window.OnlineGame.myName || 'Player 1') : (window.OnlineGame.opponentName || 'Player 2');
                        self.log(`${n} ran out of time!`, 'text-red-400');
                    } else {
                        self.log(`${turn.toUpperCase()} ran out of time!`, 'text-red-400');
                    }
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
            if (mon.fainted) return `<div class="text-center text-red-500 font-bold p-2">FAINTED</div>`;

            if (!mon.moves || !Array.isArray(mon.moves) || mon.moves.length === 0) {
                return `<div class="text-center text-yellow-500 font-bold p-2">NO MOVES</div>`;
            }

            return mon.moves.map((m, i) => {
                const rgb = window.RenderFX ? RenderFX.getTypeRGB(m.type) : { r: 107, g: 114, b: 128 };
                const color = window.RenderFX ? RenderFX.getTypeColor(m.type) : '#6b7280';
                return `
                <button class="move-btn" style="--move-color:${color};--move-bg:rgba(${rgb.r},${rgb.g},${rgb.b},0.16);--move-bg-hover:rgba(${rgb.r},${rgb.g},${rgb.b},0.26)" onclick="window.GameCore.handleMove('${playerKey}', ${i})">
                    <span class="move-name">${m.name}</span>
                    <span class="type-badge" style="background-color: ${color}">${m.type}</span>
                </button>
            `;
            }).join('');
        };

        if (p1Panel) p1Panel.innerHTML = createButtons(p1Mon, 'p1');
        if (p2Panel) p2Panel.innerHTML = createButtons(p2Mon, 'p2');

        this.setTurnWaitOverlays(turn);
        if (window.RenderFX) RenderFX.updateArenaEnvironment(p1Mon, p2Mon);

        const p1Container = document.getElementById('p1-controls-box');
        const p2Container = document.getElementById('p2-controls-box');

        if (p1Container && p2Container) {
            if (turn === 'p1') {
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

        this.updateEvolveButtonState('p1', p1Mon);
        this.updateEvolveButtonState('p2', p2Mon);
    },

    updateTurnUI(turn) {
        const badge = document.getElementById('turn-badge');
        if (badge) {
            const isOnline = window.OnlineGame && window.OnlineGame.isOnline;
            if (isOnline && window.OnlineGame) {
                const name = turn === 'p1' ? (window.OnlineGame.myName || 'Player 1') : (window.OnlineGame.opponentName || 'Player 2');
                badge.innerText = `${name.toUpperCase()} TURN`;
            } else {
                badge.innerText = turn === 'p1' ? "PLAYER 1 TURN" : "PLAYER 2 TURN";
            }
            badge.style.backgroundColor = turn === 'p1' ? 'var(--accent-p1)' : 'var(--accent-p2)';
        }

        const indicatorText = document.getElementById('turn-indicator-text');
        if (indicatorText) {
            const isOnline = window.OnlineGame && window.OnlineGame.isOnline;
            const isMyTurn = isOnline ? (turn === 'p1') : true;
            const isForcedSwitch = window.GameCore && window.GameCore.state && window.GameCore.state.forcedSwitch;

            if (isOnline) {
                if (isForcedSwitch && isMyTurn) {
                    indicatorText.innerText = 'Choose new Pokemon';
                    indicatorText.style.color = '#ef4444';
                } else if (isMyTurn) {
                    indicatorText.innerText = 'Your turn';
                    indicatorText.style.color = '#22c55e';
                } else {
                    indicatorText.innerText = 'Opponent turn';
                    indicatorText.style.color = '#9ca3af';
                }
            } else {
                indicatorText.innerText = '';
            }
        }

        this.setTurnWaitOverlays(turn);
        this.startTurnTimer(turn);
    },

    toggleInputBlocker(show, text = "WAITING...") {
        const blocker = document.getElementById('input-blocker');
        if (!blocker) return;
        const txt = blocker.querySelector('.wait-text');

        if (show) {
            blocker.classList.remove('hidden');
            if (txt) txt.innerText = text;
        } else {
            blocker.classList.add('hidden');
        }
    },

    log(msg, colorClass = "text-gray-300") {
        const logBox = document.getElementById('battle-log');
        if (!logBox) return;

        const div = document.createElement('div');
        div.className = `log-entry ${colorClass}`;
        div.innerText = `> ${msg}`;
        logBox.prepend(div);
    },

    showGameOver(winnerKey) {
        const overlay = document.getElementById('game-over-overlay');
        const text = overlay ? overlay.querySelector('h1') : null;

        if (overlay) overlay.classList.remove('hidden');
        const isOnline = window.OnlineGame && window.OnlineGame.isOnline;
        if (isOnline && window.OnlineGame) {
            const name = winnerKey === 'p1' ? (window.OnlineGame.myName || 'Player 1') : (window.OnlineGame.opponentName || 'Player 2');
            if (text) text.innerText = `${name.toUpperCase()} WINS!`;
        } else {
            if (text) text.innerText = winnerKey === 'p1' ? "PLAYER 1 WINS!" : "PLAYER 2 WINS!";
        }
        if (text) text.style.color = winnerKey === 'p1' ? 'var(--accent-p1)' : 'var(--accent-p2)';
    },

    updateEvolveButtonState(playerKey, mon) {
        const btn = document.getElementById(`${playerKey}-evolve-btn`);
        if (!btn) return;

        let canEvolve = false;
        if (window.GameCore && window.GameCore.state) {
            const playerObj = window.GameCore.state[playerKey];
            if (!playerObj.evolutionUsed && mon && !mon.fainted) {
                const evoNum = mon.evolution1Num;
                canEvolve = evoNum && evoNum <= 251;
            }
        }

        if (canEvolve) {
            btn.disabled = false;
            btn.classList.remove('btn-disabled');
            btn.style.opacity = '1';
            btn.style.pointerEvents = 'auto';
        } else {
            btn.disabled = true;
            btn.classList.add('btn-disabled');
            btn.style.opacity = '0.4';
            btn.style.pointerEvents = 'none';
        }
    }
};

window.RenderUI = RenderUI;
