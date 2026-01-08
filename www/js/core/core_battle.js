/* CORE BATTLE - Battle actions, moves, switching */

const CoreBattle = {
    async startGame() {
        const state = window.CoreState ? CoreState.state : null;
        const config = window.CoreState ? CoreState.config : null;
        if (!state || !config) return;

        try {
            if (window.AudioEngine) {
                AudioEngine.init();
                AudioEngine.playBGM();
            }

            const cine = document.getElementById('cinematic-overlay');
            const cineFill = document.getElementById('cinematic-progress-fill');
            const cineStatus = document.getElementById('cinematic-status');
            if (cine) {
                cine.classList.remove('hidden', 'cine-open');
                cine.classList.add('cine-close');
            }

            const pool = window.CoreDrafting ? CoreDrafting.getDraftPool() : [];
            if (pool.length < config.teamSize * 2) {
                alert('Not enough unique Pokémon in the selected Pokédex range for both teams. Increase range or reduce team size.');
                return;
            }

            const drafted = window.CoreDrafting ? CoreDrafting.draftBalancedTeams(config.teamSize, pool) : { p1: [], p2: [] };
            state.p1.team = drafted.p1;
            state.p2.team = drafted.p2;

            const p1Pow = window.CoreDrafting ? CoreDrafting.getTeamPower(state.p1.team) : 0;
            const p2Pow = window.CoreDrafting ? CoreDrafting.getTeamPower(state.p2.team) : 0;
            const p1El = document.getElementById('p1-team-power');
            const p2El = document.getElementById('p2-team-power');
            if (p1El) p1El.innerText = `Power: ${p1Pow}`;
            if (p2El) p2El.innerText = `Power: ${p2Pow}`;

            if (window.CoreState) CoreState.resetState();

            document.getElementById('setup-screen').classList.add('hidden');
            document.getElementById('game-over-overlay').classList.add('hidden');

            if (cineFill) cineFill.style.width = '0%';
            const steps = [
                { pct: 18, msg: 'Initializing arena' },
                { pct: 36, msg: 'Loading sprites' },
                { pct: 54, msg: 'Syncing teams' },
                { pct: 72, msg: 'Warming up audio' },
                { pct: 90, msg: 'Preparing battle...' },
                { pct: 100, msg: 'READY' }
            ];
            for (const s of steps) {
                if (cineStatus) cineStatus.innerText = s.msg;
                if (cineFill) cineFill.style.width = `${s.pct}%`;
                await new Promise(r => setTimeout(r, 160));
            }

            if (cine) {
                cine.classList.remove('cine-close');
                cine.classList.add('cine-open');
            }

            if (window.RenderEngine) {
                RenderEngine.initBench(state.p1.team, state.p2.team);
                await RenderEngine.spawnPokemon('p1', state.p1.team[0]);
                await RenderEngine.spawnPokemon('p2', state.p2.team[0]);
                RenderEngine.updateTurnUI(state.turn);
                RenderEngine.updateControls(
                    state.p1.team[state.p1.activeIdx],
                    state.p2.team[state.p2.activeIdx],
                    state.turn
                );
                RenderEngine.log("Battle Started!", "text-yellow-400");
            }

            if (cine) {
                await new Promise(r => setTimeout(r, 650));
                cine.classList.add('hidden');
                cine.classList.remove('cine-open');
            }
        } catch (e) {
            console.error('startGame failed:', e);
            alert('Start failed. Open DevTools Console for details.');
        }
    },

    async handleMove(attackerKey, moveIndex) {
        const state = window.CoreState ? CoreState.state : null;
        if (!state) return;

        console.log('[handleMove] called:', attackerKey, moveIndex, 'turn:', state.turn, 'blocked:', state.isBlocked);

        if (state.isBlocked) {
            console.log('[handleMove] blocked, returning');
            return;
        }
        if (state.turn !== attackerKey) {
            console.log('[handleMove] not your turn, returning');
            return;
        }

        const myTurnId = state.turnId;
        state.isBlocked = true;
        if (window.RenderEngine) RenderEngine.stopTurnTimer();

        if (state.turn !== attackerKey || state.turnId !== myTurnId) {
            console.log('[handleMove] turn changed during lock, aborting');
            state.isBlocked = false;
            if (window.RenderEngine) RenderEngine.toggleInputBlocker(false);
            return;
        }
        if (window.RenderEngine) RenderEngine.toggleInputBlocker(true, "ATTACKING...");

        if (window.OnlineGame && OnlineGame.isOnline) {
            OnlineGame.sendMove(moveIndex);
        }

        const isP1 = attackerKey === 'p1';
        const attackerObj = isP1 ? state.p1 : state.p2;
        const defenderObj = isP1 ? state.p2 : state.p1;

        const attackerMon = attackerObj.team[attackerObj.activeIdx];
        const defenderMon = defenderObj.team[defenderObj.activeIdx];
        const move = attackerMon.moves ? attackerMon.moves[moveIndex] : null;

        if (!move || !move.name) {
            console.error('[handleMove] Invalid move at index', moveIndex, 'moves:', attackerMon.moves);
            if (window.RenderEngine) RenderEngine.log(`${attackerMon.name} has no valid move!`, 'text-red-400');
            state.turn = isP1 ? 'p2' : 'p1';
            state.turnId++;
            state.isBlocked = false;
            if (window.RenderEngine) {
                RenderEngine.toggleInputBlocker(false);
                RenderEngine.updateTurnUI(state.turn);
                RenderEngine.updateControls(
                    state.p1.team[state.p1.activeIdx],
                    state.p2.team[state.p2.activeIdx],
                    state.turn
                );
            }
            return;
        }

        console.log('[handleMove] executing turn with move:', move.name);

        try {
            if (window.GameLogic) {
                await GameLogic.executeTurn(attackerKey, attackerMon, defenderMon, move);
            }
            console.log('[handleMove] executeTurn completed successfully');
        } catch (e) {
            console.error('[handleMove] executeTurn failed:', e);
            state.turn = isP1 ? 'p2' : 'p1';
            state.turnId++;
            state.isBlocked = false;
            if (window.RenderEngine) {
                RenderEngine.toggleInputBlocker(false);
                RenderEngine.updateTurnUI(state.turn);
                RenderEngine.updateControls(
                    state.p1.team[state.p1.activeIdx],
                    state.p2.team[state.p2.activeIdx],
                    state.turn
                );
            }
            return;
        }

        console.log('[handleMove] calling postTurnCheck');
        this.postTurnCheck(attackerKey, defenderMon);
    },

    postTurnCheck(lastAttackerKey, defenderMon) {
        const state = window.CoreState ? CoreState.state : null;
        if (!state) return;

        console.log('[postTurnCheck] called, lastAttacker:', lastAttackerKey, 'defenderFainted:', defenderMon?.fainted);

        const isP1 = lastAttackerKey === 'p1';
        const enemyKey = isP1 ? 'p2' : 'p1';
        const enemyTeam = isP1 ? state.p2.team : state.p1.team;

        if (defenderMon && defenderMon.fainted) {
            const allDead = enemyTeam.every(m => m.fainted);

            if (allDead) {
                console.log('[postTurnCheck] all dead, ending game');
                this.endGame(lastAttackerKey);
                return;
            }

            console.log('[postTurnCheck] forcing switch for', enemyKey);
            state.forcedSwitch = true;
            state.turn = enemyKey;
            state.turnId++;
            state.isBlocked = false;

            if (window.RenderEngine) {
                RenderEngine.toggleInputBlocker(true, "CHOOSE NEXT POKEMON");
                if (window.OnlineGame && OnlineGame.isOnline) {
                    const nm = enemyKey === 'p1' ? (OnlineGame.myName || 'Player 1') : (OnlineGame.opponentName || 'Player 2');
                    RenderEngine.log(`${nm} must switch!`, "text-red-400");
                } else {
                    RenderEngine.log(`${enemyKey.toUpperCase()} must switch!`, "text-red-400");
                }
            }

            return;
        }

        console.log('[postTurnCheck] standard turn swap to', enemyKey);
        state.turn = enemyKey;
        state.turnId++;
        state.isBlocked = false;
        if (window.RenderEngine) {
            RenderEngine.toggleInputBlocker(false);
            RenderEngine.updateTurnUI(state.turn);
            RenderEngine.updateControls(
                state.p1.team[state.p1.activeIdx],
                state.p2.team[state.p2.activeIdx],
                state.turn
            );
        }
    },

    async switchPokemon(playerKey, newIndex) {
        const state = window.CoreState ? CoreState.state : null;
        if (!state) return;

        if (state.turn !== playerKey && !state.forcedSwitch) return;
        if (state.forcedSwitch && state.turn !== playerKey) return;

        const playerObj = playerKey === 'p1' ? state.p1 : state.p2;
        const targetMon = playerObj.team[newIndex];
        if (newIndex === playerObj.activeIdx) return;
        if (targetMon.fainted) return;

        state.isBlocked = true;

        if (window.OnlineGame && OnlineGame.isOnline) {
            OnlineGame.sendSwitch(newIndex);
        }

        playerObj.activeIdx = newIndex;
        if (window.RenderEngine) {
            if (window.OnlineGame && OnlineGame.isOnline) {
                const nm = playerKey === 'p1' ? (OnlineGame.myName || 'Player 1') : (OnlineGame.opponentName || 'Player 2');
                RenderEngine.log(`${nm} switches to ${targetMon.name}!`);
            } else {
                RenderEngine.log(`${playerKey.toUpperCase()} switches to ${targetMon.name}!`);
            }
        }

        if (window.RenderEngine) await RenderEngine.performSwitch(playerKey, targetMon);

        if (state.forcedSwitch) {
            state.forcedSwitch = false;
            state.turn = playerKey === 'p1' ? 'p2' : 'p1';
        } else {
            state.turn = playerKey === 'p1' ? 'p2' : 'p1';
        }

        state.turnId++;
        state.isBlocked = false;
        if (window.RenderEngine) {
            RenderEngine.toggleInputBlocker(false);
            RenderEngine.updateTurnUI(state.turn);
            RenderEngine.updateControls(
                state.p1.team[state.p1.activeIdx],
                state.p2.team[state.p2.activeIdx],
                state.turn
            );
        }
    },

    endGame(winnerKey) {
        const state = window.CoreState ? CoreState.state : null;
        if (state) state.isBlocked = true;
        if (window.RenderEngine) RenderEngine.showGameOver(winnerKey);
        if (window.AudioEngine) AudioEngine.playSFX('win');
        if (window.RenderEngine) RenderEngine.stopTurnTimer();
    },

    skipTurn(playerKey) {
        const state = window.CoreState ? CoreState.state : null;
        if (!state) return;

        console.log('[skipTurn] called for', playerKey, 'current turn:', state.turn, 'blocked:', state.isBlocked);

        if (state.isBlocked) return;
        if (state.turn !== playerKey) return;
        if (state.forcedSwitch) return;

        if (window.RenderEngine) {
            if (window.OnlineGame && OnlineGame.isOnline) {
                const nm = playerKey === 'p1' ? (OnlineGame.myName || 'Player 1') : (OnlineGame.opponentName || 'Player 2');
                RenderEngine.log(nm + ' skipped their turn!', 'text-gray-400');
            } else {
                RenderEngine.log(playerKey.toUpperCase() + ' skipped their turn!', 'text-gray-400');
            }
        }

        const nextTurn = playerKey === 'p1' ? 'p2' : 'p1';
        state.turn = nextTurn;
        state.turnId++;

        if (window.RenderEngine) {
            RenderEngine.updateTurnUI(state.turn);
            RenderEngine.updateControls(
                state.p1.team[state.p1.activeIdx],
                state.p2.team[state.p2.activeIdx],
                state.turn
            );
        }
    }
};

window.CoreBattle = CoreBattle;
