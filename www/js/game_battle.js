/* === GAME_BATTLE.JS ===
   Battle actions: handleMove, postTurnCheck, switchPokemon, skipTurn
*/

const GameBattle = {
    async handleMove(state, attackerKey, moveIndex) {
        if (state.isBlocked) return false;
        if (state.turn !== attackerKey) return false;

        state.isBlocked = true;
        if (window.RenderUI) RenderUI.toggleInputBlocker(true, "ATTACKING...");

        const isP1 = attackerKey === 'p1';
        const attackerObj = isP1 ? state.p1 : state.p2;
        const defenderObj = isP1 ? state.p2 : state.p1;

        const attackerMon = attackerObj.team[attackerObj.activeIdx];
        const defenderMon = defenderObj.team[defenderObj.activeIdx];
        const move = attackerMon.moves[moveIndex];

        try {
            if (window.GameLogic) {
                await GameLogic.executeTurn(attackerKey, attackerMon, defenderMon, move);
            }
        } catch (e) {
            console.error('executeTurn failed:', e);
            state.isBlocked = false;
            if (window.RenderUI) RenderUI.toggleInputBlocker(false);
            return false;
        }

        return { attackerKey, defenderMon };
    },

    postTurnCheck(state, lastAttackerKey, defenderMon, endGameCallback) {
        const isP1 = lastAttackerKey === 'p1';
        const enemyKey = isP1 ? 'p2' : 'p1';
        const enemyTeam = isP1 ? state.p2.team : state.p1.team;

        if (defenderMon.fainted) {
            const allDead = enemyTeam.every(m => m.fainted);

            if (allDead) {
                endGameCallback(lastAttackerKey);
                return;
            }

            state.forcedSwitch = true;
            state.turn = enemyKey;
            state.isBlocked = false;

            if (window.RenderUI) {
                RenderUI.toggleInputBlocker(true, "CHOOSE NEXT POKEMON");
                RenderUI.log(`${enemyKey.toUpperCase()} must switch!`, "text-red-400");
            }
            return;
        }

        state.turn = enemyKey;
        state.isBlocked = false;
        if (window.RenderUI) {
            RenderUI.toggleInputBlocker(false);
            RenderUI.updateTurnUI(state.turn);
            RenderUI.updateControls(
                state.p1.team[state.p1.activeIdx],
                state.p2.team[state.p2.activeIdx],
                state.turn
            );
        }
    },

    async switchPokemon(state, playerKey, newIndex) {
        if (state.turn !== playerKey && !state.forcedSwitch) return false;
        if (state.forcedSwitch && state.turn !== playerKey) return false;

        const playerObj = playerKey === 'p1' ? state.p1 : state.p2;
        const targetMon = playerObj.team[newIndex];

        if (newIndex === playerObj.activeIdx) return false;
        if (targetMon.fainted) return false;

        state.isBlocked = true;

        playerObj.activeIdx = newIndex;
        if (window.RenderUI) RenderUI.log(`${playerKey.toUpperCase()} switches to ${targetMon.name}!`);

        if (window.RenderAnimations) await RenderAnimations.performSwitch(playerKey, targetMon);

        if (state.forcedSwitch) {
            state.forcedSwitch = false;
            state.turn = playerKey;
        } else {
            state.turn = playerKey === 'p1' ? 'p2' : 'p1';
        }

        state.isBlocked = false;
        if (window.RenderUI) {
            RenderUI.toggleInputBlocker(false);
            RenderUI.updateTurnUI(state.turn);
            RenderUI.updateControls(
                state.p1.team[state.p1.activeIdx],
                state.p2.team[state.p2.activeIdx],
                state.turn
            );
        }

        return true;
    },

    skipTurn(state, playerKey) {
        if (state.isBlocked) return;
        if (state.turn !== playerKey) return;
        if (state.forcedSwitch) return;

        if (window.RenderUI) RenderUI.log(`${playerKey.toUpperCase()} skipped their turn!`, 'text-gray-400');

        const nextTurn = playerKey === 'p1' ? 'p2' : 'p1';
        state.turn = nextTurn;

        if (window.RenderUI) {
            RenderUI.updateTurnUI(state.turn);
            RenderUI.updateControls(
                state.p1.team[state.p1.activeIdx],
                state.p2.team[state.p2.activeIdx],
                state.turn
            );
        }
    }
};

window.GameBattle = GameBattle;
