/* CORE EVOLUTION - Evolution feature */

const CoreEvolution = {
    async evolvePokemon(playerKey) {
        const state = window.CoreState ? CoreState.state : null;
        if (!state) return;

        if (state.isBlocked) return;
        if (state.turn !== playerKey) {
            if (window.RenderEngine) RenderEngine.log("Not your turn!", "text-red-400");
            return;
        }
        if (state.forcedSwitch) {
            if (window.RenderEngine) RenderEngine.log("Must switch Pokemon first!", "text-red-400");
            return;
        }

        const playerObj = playerKey === 'p1' ? state.p1 : state.p2;

        if (playerObj.evolutionUsed) {
            if (window.RenderEngine) RenderEngine.log("Evolution already used this battle!", "text-red-400");
            return;
        }

        const activeMon = playerObj.team[playerObj.activeIdx];
        if (!activeMon || activeMon.fainted) {
            if (window.RenderEngine) RenderEngine.log("Cannot evolve fainted Pokemon!", "text-red-400");
            return;
        }

        const evoNum = activeMon.evolution1Num;
        if (!evoNum || evoNum > 251) {
            if (window.RenderEngine) RenderEngine.log(`${activeMon.name} cannot evolve!`, "text-yellow-400");
            return;
        }

        const evolvedData = POKEMON_DB.find(p => p.id === evoNum);
        if (!evolvedData) {
            if (window.RenderEngine) RenderEngine.log(`Evolution data not found!`, "text-red-400");
            return;
        }

        state.isBlocked = true;
        if (window.RenderEngine) {
            RenderEngine.toggleInputBlocker(true, "EVOLVING...");
            RenderEngine.log(`${activeMon.name} is evolving!`, "text-yellow-400 font-bold");
        }

        if (window.OnlineGame && OnlineGame.isOnline) {
            OnlineGame.sendEvolve();
        }

        const spriteBox = document.getElementById(`${playerKey}-sprite-box`);
        const pokemonImg = document.getElementById(`${playerKey}-img`);
        
        // Phase 1: Vibrate (0.8s)
        if (spriteBox) {
            spriteBox.classList.remove('anim-idle');
            spriteBox.classList.add('anim-evolve-vibrate');
        }
        await new Promise(r => setTimeout(r, 800));
        
        // Phase 2: Yellow Glow (0.8s)
        if (spriteBox) {
            spriteBox.classList.remove('anim-evolve-vibrate');
        }
        if (pokemonImg) {
            pokemonImg.classList.add('anim-evolve-glow');
        }
        await new Promise(r => setTimeout(r, 800));

        const oldName = activeMon.name;
        activeMon.id = evolvedData.id;
        activeMon.name = evolvedData.name;
        activeMon.type1 = evolvedData.type1;
        activeMon.type2 = evolvedData.type2;
        activeMon.hp = evolvedData.hp;
        activeMon.atk = evolvedData.atk;
        activeMon.def = evolvedData.def;
        activeMon.spAtk = evolvedData.spAtk;
        activeMon.spDef = evolvedData.spDef;
        activeMon.speed = evolvedData.speed;
        activeMon.height = evolvedData.height;
        activeMon.weight = evolvedData.weight;
        activeMon.moves = JSON.parse(JSON.stringify(evolvedData.moves));
        activeMon.evolution1Name = evolvedData.evolution1Name;
        activeMon.evolution1Num = evolvedData.evolution1Num;
        activeMon.evolutionStage = evolvedData.evolutionStage;

        const spriteKey = window.CoreDrafting ? CoreDrafting.sanitizeSpriteName(activeMon.name) : activeMon.name.toLowerCase();
        activeMon.img = `assets/images/${spriteKey}.png`;

        activeMon.maxHp = activeMon.hp * 3;
        activeMon.currentHp = activeMon.maxHp;

        playerObj.evolutionUsed = true;

        // Phase 3: Warp transform handled by spawnPokemon
        if (pokemonImg) {
            pokemonImg.classList.remove('anim-evolve-glow');
        }
        if (spriteBox) {
            spriteBox.classList.add('anim-evolve-warp');
        }

        if (window.RenderEngine) {
            await RenderEngine.spawnPokemon(playerKey, activeMon, true);
            RenderEngine.initBench(state.p1.team, state.p2.team);
            RenderEngine.updateControls(
                state.p1.team[state.p1.activeIdx],
                state.p2.team[state.p2.activeIdx],
                state.turn
            );
        }

        this.updateEvolutionButtons();

        if (window.RenderEngine) RenderEngine.log(`${oldName} evolved into ${activeMon.name}!`, "text-green-400 font-bold");

        state.isBlocked = false;
        if (window.RenderEngine) RenderEngine.toggleInputBlocker(false);
    },

    updateEvolutionButtons() {
        const state = window.CoreState ? CoreState.state : null;
        if (!state) return;

        const p1Btn = document.getElementById('p1-evolve-btn');
        const p2Btn = document.getElementById('p2-evolve-btn');

        if (p1Btn) {
            if (state.p1.evolutionUsed) {
                p1Btn.disabled = true;
                p1Btn.classList.add('btn-disabled');
            }
        }
        if (p2Btn) {
            if (state.p2.evolutionUsed) {
                p2Btn.disabled = true;
                p2Btn.classList.add('btn-disabled');
            }
        }
    },

    canEvolve(playerKey) {
        const state = window.CoreState ? CoreState.state : null;
        if (!state) return false;

        const playerObj = playerKey === 'p1' ? state.p1 : state.p2;
        if (playerObj.evolutionUsed) return false;
        const activeMon = playerObj.team[playerObj.activeIdx];
        if (!activeMon || activeMon.fainted) return false;
        const evoNum = activeMon.evolution1Num;
        return evoNum && evoNum <= 251;
    }
};

window.CoreEvolution = CoreEvolution;
