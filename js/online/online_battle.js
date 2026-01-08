/**
 * Online Battle - Handles battle actions and opponent handling
 */

const OnlineBattle = {
    async _executeOpponentMove(playerKey, moveIndex) {
        if (!window.GameCore) return;
        
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
        
        GameCore.postTurnCheck(playerKey, defenderMon);
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
    },

    async _executeOpponentEvolve(playerKey) {
        if (!window.GameCore) return;
        await GameCore.evolvePokemon(playerKey);
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

    _updateOnlineControls(isHost, myName, opponentName) {
        const p1Container = document.getElementById('p1-controls-box');
        const p2Container = document.getElementById('p2-controls-box');
        const currentTurn = GameCore.state.turn;
        
        if (p2Container) p2Container.style.display = 'none';
        
        if (p1Container) {
            p1Container.style.display = 'block';
            const isMyTurn = currentTurn === 'p1';
            p1Container.style.opacity = isMyTurn ? '1' : '0.5';
            p1Container.style.pointerEvents = isMyTurn ? 'auto' : 'none';
        }
        
        const p2Bench = document.querySelector('.p2-bench');
        if (p2Bench) {
            p2Bench.style.pointerEvents = 'none';
        }
    },

    _initBattleWithTeams(serverP1Team, serverP2Team, isHost, myName, opponentName) {
        if (!window.GameCore) return;
        
        let myTeam, opponentTeam;
        if (isHost) {
            myTeam = serverP1Team;
            opponentTeam = serverP2Team;
        } else {
            myTeam = serverP2Team;
            opponentTeam = serverP1Team;
        }
        
        GameCore.state.p1.team = myTeam;
        GameCore.state.p2.team = opponentTeam;
        GameCore.state.p1.activeIdx = 0;
        GameCore.state.p2.activeIdx = 0;
        GameCore.state.p1.evolutionUsed = false;
        GameCore.state.p2.evolutionUsed = false;
        GameCore.state.turn = isHost ? 'p1' : 'p2';
        GameCore.state.turnId = 0;
        GameCore.state.isBlocked = false;
        GameCore.state.forcedSwitch = false;
        
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
    },

    _showMatchResult(data, isHost) {
        const serverWinner = data.winner;
        const myServerKey = isHost ? 'p1' : 'p2';
        const isWinner = (serverWinner === myServerKey);
        
        if (window.RenderEngine) {
            const overlay = document.getElementById('game-over-overlay');
            const text = overlay ? overlay.querySelector('h1') : null;
            
            if (overlay) overlay.classList.remove('hidden');
            if (text) {
                text.innerText = isWinner ? 'YOU WIN!' : 'YOU LOSE!';
                text.style.color = isWinner ? '#22c55e' : '#ef4444';
            }
            
            const rematchOptions = document.getElementById('rematch-options');
            if (rematchOptions) {
                rematchOptions.classList.remove('hidden');
                rematchOptions.style.display = 'flex';
            }
        }
    }
};

window.OnlineBattle = OnlineBattle;
