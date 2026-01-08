/* GAME CORE
   - Manages global state (Turn, Team Size, Active Pokemon)
   - Handles the "Start Game" flow
   - Bridges the gap between UI clicks and Game Logic
*/

const GameCore = {

    // --- STATE ---
    config: {
        teamSize: 3, // Default
        maxTeamSize: 6,
        pokedexMin: 1,
        pokedexMax: 151
    },
    state: {
        p1: { team: [], activeIdx: 0, evolutionUsed: false },
        p2: { team: [], activeIdx: 0, evolutionUsed: false },
        turn: 'p1',       // 'p1' or 'p2'
        turnId: 0,        // increments on every committed turn change (prevents timer/click races)
        isBlocked: false, // Prevents clicking during animations
        forcedSwitch: false // True when a pokemon faints
    },

    // --- INITIALIZATION ---
    init() {
        console.log("Core Initialized");
        this.updateTeamSizeDisplay();

        // Initialize Pokédex slider range based on DB (if present)
        if (typeof POKEMON_DB !== 'undefined' && Array.isArray(POKEMON_DB) && POKEMON_DB.length > 0) {
            const maxId = Math.max(...POKEMON_DB.map(m => Number(m.id || 0)));
            this.config.pokedexMin = 1;
            this.config.pokedexMax = maxId;

            const minEl = document.getElementById('pokedex-min');
            const maxEl = document.getElementById('pokedex-max');
            if (minEl && maxEl) {
                minEl.min = '1';
                minEl.max = String(maxId);
                minEl.value = '1';

                maxEl.min = '1';
                maxEl.max = String(maxId);
                maxEl.value = String(maxId);
            }

            this.updatePokedexRangeDisplay();
        }
    },

    adjustTeamSize(n) {
        this.config.teamSize += n;
        if (this.config.teamSize < 1) this.config.teamSize = 1;
        if (this.config.teamSize > this.config.maxTeamSize) this.config.teamSize = this.config.maxTeamSize;
        this.updateTeamSizeDisplay();
    },

    updateTeamSizeDisplay() {
        const display = document.getElementById('team-size-display');
        if(display) display.innerText = this.config.teamSize;
    },

    // --- START BATTLE ---
    async startGame() {
        try {
            // 1. Audio Setup (User interaction required first)
            if (window.AudioEngine) {
                AudioEngine.init();
                AudioEngine.playBGM();
            }

            // Cinematic Transition UI
            const cine = document.getElementById('cinematic-overlay');
            const cineFill = document.getElementById('cinematic-progress-fill');
            const cineStatus = document.getElementById('cinematic-status');
            if (cine) {
                cine.classList.remove('hidden', 'cine-open');
                cine.classList.add('cine-close');
            }

            // 2. Draft Teams
            const pool = this.getDraftPool();
            if (pool.length < this.config.teamSize * 2) {
                alert('Not enough unique Pokémon in the selected Pokédex range for both teams. Increase range or reduce team size.');
                return;
            }

            const drafted = this.draftBalancedTeams(this.config.teamSize, pool);
            this.state.p1.team = drafted.p1;
            this.state.p2.team = drafted.p2;

            // Static Team Power UI
            const p1Pow = this.getTeamPower(this.state.p1.team);
            const p2Pow = this.getTeamPower(this.state.p2.team);
            const p1El = document.getElementById('p1-team-power');
            const p2El = document.getElementById('p2-team-power');
            if (p1El) p1El.innerText = `Power: ${p1Pow}`;
            if (p2El) p2El.innerText = `Power: ${p2Pow}`;

            // Reset State
            this.state.p1.activeIdx = 0;
            this.state.p2.activeIdx = 0;
            this.state.p1.evolutionUsed = false;
            this.state.p2.evolutionUsed = false;
            this.state.turn = 'p1';
            this.state.turnId = 0;
            this.state.isBlocked = false;
            this.state.forcedSwitch = false;

            // 3. UI Transition
            document.getElementById('setup-screen').classList.add('hidden');
            document.getElementById('game-over-overlay').classList.add('hidden');

            // Chunky progress bar (step-like)
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

            // Open shutters
            if (cine) {
                cine.classList.remove('cine-close');
                cine.classList.add('cine-open');
            }

            // 4. Initial Render
            if (window.RenderEngine) {
                RenderEngine.initBench(this.state.p1.team, this.state.p2.team);

                // Spawn Animations
                await RenderEngine.spawnPokemon('p1', this.state.p1.team[0]);
                await RenderEngine.spawnPokemon('p2', this.state.p2.team[0]);

                RenderEngine.updateTurnUI(this.state.turn);
                RenderEngine.updateControls(
                    this.state.p1.team[this.state.p1.activeIdx],
                    this.state.p2.team[this.state.p2.activeIdx],
                    this.state.turn
                );

                RenderEngine.log("Battle Started!", "text-yellow-400");
            }

            // Hide cinematic overlay after reveal
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

    // --- DATA HELPER ---
    sanitizeSpriteName(name) {
        return String(name)
            .toLowerCase()
            .replace(/['.]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim();
    },

    draftTeam(count) {
        if (typeof POKEMON_DB === 'undefined' || POKEMON_DB.length === 0) {
            alert("Database Error: pokemon_db.js not loaded!");
            return [];
        }

        let team = [];
        for (let i = 0; i < count; i++) {
            const usedIds = new Set(team.map(m => m.id));
            let rand = null;
            for (let t = 0; t < 30; t++) {
                const candidate = POKEMON_DB[Math.floor(Math.random() * POKEMON_DB.length)];
                if (!usedIds.has(candidate.id)) {
                    rand = candidate;
                    break;
                }
            }
            if (!rand) rand = POKEMON_DB[Math.floor(Math.random() * POKEMON_DB.length)];
            let mon = JSON.parse(JSON.stringify(rand));

            // --- CRITICAL LINE: This generates the image path from the name ---
            const spriteKey = this.sanitizeSpriteName(mon.name);
            mon.img = `assets/images/${spriteKey}.png`;
            // -----------------------------------------------------------------

            mon.maxHp = mon.hp * 3;
            mon.currentHp = mon.maxHp;
            mon.fainted = false;
            mon.uuid = `mon_${Date.now()}_${i}`;

            team.push(mon);
        }
        return team;
    },

    getTeamPower(team) {
        return (team || []).reduce((sum, m) => sum + (m.hp || 0) + (m.atk || 0) + (m.def || 0), 0);
    },

    getDraftPool() {
        if (typeof POKEMON_DB === 'undefined' || !Array.isArray(POKEMON_DB)) return [];
        const minId = Number(this.config.pokedexMin || 1);
        const maxId = Number(this.config.pokedexMax || 151);
        return POKEMON_DB.filter(m => {
            const id = Number(m.id || 0);
            return id >= minId && id <= maxId;
        });
    },

    sampleUniqueMons(pool, count) {
        const copy = pool.slice();
        // Fisher-Yates shuffle
        for (let i = copy.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const tmp = copy[i];
            copy[i] = copy[j];
            copy[j] = tmp;
        }
        return copy.slice(0, count);
    },

    hydrateMon(rand, idx) {
        let mon = JSON.parse(JSON.stringify(rand));

        const spriteKey = this.sanitizeSpriteName(mon.name);
        mon.img = `assets/images/${spriteKey}.png`;

        mon.maxHp = mon.hp * 3;
        mon.currentHp = mon.maxHp;

        mon.fainted = false;
        mon.uuid = `mon_${Date.now()}_${idx}`;
        return mon;
    },

    draftBalancedTeams(count) {
        const pool = arguments[1] || this.getDraftPool();
        let best = null;

        // Helper: check if a Pokemon can evolve (has valid evolution within range)
        const canEvolve = (mon) => {
            const evoNum = mon.evolution1Num;
            return evoNum && evoNum <= 251 && pool.some(p => p.id === evoNum);
        };

        // Separate pool into evolvable and non-evolvable
        const evolvable = pool.filter(canEvolve);
        const nonEvolvable = pool.filter(m => !canEvolve(m));

        // Minimum evolvable Pokemon per team (at least 2, but cap at team size)
        const minEvolvable = Math.min(2, count);

        for (let attempt = 0; attempt < 220; attempt++) {
            // Ensure at least minEvolvable evolvable Pokemon per team
            let p1Raw = [];
            let p2Raw = [];

            if (evolvable.length >= minEvolvable * 2) {
                // Pick evolvable Pokemon for both teams first
                const shuffledEvo = this.sampleUniqueMons(evolvable, minEvolvable * 2);
                const p1Evo = shuffledEvo.slice(0, minEvolvable);
                const p2Evo = shuffledEvo.slice(minEvolvable, minEvolvable * 2);

                // Remaining slots from combined pool (excluding already picked)
                const usedIds = new Set(shuffledEvo.map(m => m.id));
                const remaining = pool.filter(m => !usedIds.has(m.id));
                const remainingNeeded = (count - minEvolvable) * 2;
                const shuffledRemaining = this.sampleUniqueMons(remaining, remainingNeeded);

                p1Raw = [...p1Evo, ...shuffledRemaining.slice(0, count - minEvolvable)];
                p2Raw = [...p2Evo, ...shuffledRemaining.slice(count - minEvolvable, remainingNeeded)];
            } else {
                // Not enough evolvable Pokemon, fall back to standard drafting
                const picked = this.sampleUniqueMons(pool, count * 2);
                p1Raw = picked.slice(0, count);
                p2Raw = picked.slice(count, count * 2);
            }

            const p1 = p1Raw.map((m, i) => this.hydrateMon(m, i));
            const p2 = p2Raw.map((m, i) => this.hydrateMon(m, i + count));

            const p1Pow = this.getTeamPower(p1);
            const p2Pow = this.getTeamPower(p2);
            const denom = Math.max(1, Math.max(p1Pow, p2Pow));
            const diff = Math.abs(p1Pow - p2Pow) / denom;

            if (!best || diff < best.diff) {
                best = { p1, p2, diff };
            }

            if (diff <= 0.10) {
                return { p1, p2 };
            }
        }

        if (best) return { p1: best.p1, p2: best.p2 };

        const picked = this.sampleUniqueMons(pool, count * 2);
        const p1 = picked.slice(0, count).map((m, i) => this.hydrateMon(m, i));
        const p2 = picked.slice(count, count * 2).map((m, i) => this.hydrateMon(m, i + count));
        return { p1, p2 };
    },

    setPokedexMin(v) {
        const val = Math.max(1, Number(v || 1));
        this.config.pokedexMin = val;
        if (this.config.pokedexMin > this.config.pokedexMax) this.config.pokedexMax = this.config.pokedexMin;
        this.syncPokedexInputs();
        this.updatePokedexRangeDisplay();
    },

    setPokedexMax(v) {
        const val = Math.max(1, Number(v || 1));
        this.config.pokedexMax = val;
        if (this.config.pokedexMax < this.config.pokedexMin) this.config.pokedexMin = this.config.pokedexMax;
        this.syncPokedexInputs();
        this.updatePokedexRangeDisplay();
    },

    syncPokedexInputs() {
        const minEl = document.getElementById('pokedex-min');
        const maxEl = document.getElementById('pokedex-max');
        if (minEl) minEl.value = String(this.config.pokedexMin);
        if (maxEl) maxEl.value = String(this.config.pokedexMax);
    },

    updatePokedexRangeDisplay() {
        const minD = document.getElementById('pokedex-min-display');
        const maxD = document.getElementById('pokedex-max-display');
        if (minD) minD.innerText = String(this.config.pokedexMin);
        if (maxD) maxD.innerText = String(this.config.pokedexMax);
    },

    // --- BATTLE ACTIONS ---
    // Called by UI buttons in game_render.js
    async handleMove(attackerKey, moveIndex) {
        console.log('[handleMove] called:', attackerKey, moveIndex, 'turn:', this.state.turn, 'blocked:', this.state.isBlocked);
        
        if (this.state.isBlocked) {
            console.log('[handleMove] blocked, returning');
            return;
        }
        if (this.state.turn !== attackerKey) {
            console.log('[handleMove] not your turn, returning');
            return;
        }

        // Race-safety: capture the current turn id.
        const myTurnId = this.state.turnId;

        // Lock Input
        this.state.isBlocked = true;
        // Stop timer immediately so it can't expire mid-attack
        if (window.RenderEngine) RenderEngine.stopTurnTimer();

        // If the timer expired between the initial checks and locking input, abort.
        if (this.state.turn !== attackerKey || this.state.turnId !== myTurnId) {
            console.log('[handleMove] turn changed during lock, aborting');
            this.state.isBlocked = false;
            if (window.RenderEngine) RenderEngine.toggleInputBlocker(false);
            return;
        }
        if (window.RenderEngine) RenderEngine.toggleInputBlocker(true, "ATTACKING...");
        
        // ONLINE MODE: Send action to server (optimistic - execute locally immediately)
        if (window.OnlineGame && OnlineGame.isOnline) {
            OnlineGame.sendMove(moveIndex);
        }

        // 1. Resolve Entities
        const isP1 = attackerKey === 'p1';
        const attackerObj = isP1 ? this.state.p1 : this.state.p2;
        const defenderObj = isP1 ? this.state.p2 : this.state.p1;

        const attackerMon = attackerObj.team[attackerObj.activeIdx];
        const defenderMon = defenderObj.team[defenderObj.activeIdx];
        const move = attackerMon.moves ? attackerMon.moves[moveIndex] : null;

        // Guard: if move is invalid, skip turn but still change turn
        if (!move || !move.name) {
            console.error('[handleMove] Invalid move at index', moveIndex, 'moves:', attackerMon.moves);
            RenderEngine.log(`${attackerMon.name} has no valid move!`, 'text-red-400');
            // Still change turn even if move is invalid
            this.state.turn = isP1 ? 'p2' : 'p1';
            this.state.turnId++;
            this.state.isBlocked = false;
            if (window.RenderEngine) {
                RenderEngine.toggleInputBlocker(false);
                RenderEngine.updateTurnUI(this.state.turn);
                RenderEngine.updateControls(
                    this.state.p1.team[this.state.p1.activeIdx],
                    this.state.p2.team[this.state.p2.activeIdx],
                    this.state.turn
                );
            }
            return;
        }

        console.log('[handleMove] executing turn with move:', move.name);

        // 2. Hand off to Logic Engine
        try {
            if (window.GameLogic) {
                await GameLogic.executeTurn(attackerKey, attackerMon, defenderMon, move);
            }
            console.log('[handleMove] executeTurn completed successfully');
        } catch (e) {
            console.error('[handleMove] executeTurn failed:', e);
            // Even on error, unblock and change turn to prevent stuck state
            this.state.turn = isP1 ? 'p2' : 'p1';
            this.state.turnId++;
            this.state.isBlocked = false;
            if (window.RenderEngine) {
                RenderEngine.toggleInputBlocker(false);
                RenderEngine.updateTurnUI(this.state.turn);
                RenderEngine.updateControls(
                    this.state.p1.team[this.state.p1.activeIdx],
                    this.state.p2.team[this.state.p2.activeIdx],
                    this.state.turn
                );
            }
            return;
        }

        // 3. Check Win/Loss/Switch AFTER animation completes
        console.log('[handleMove] calling postTurnCheck');
        this.postTurnCheck(attackerKey, defenderMon);
    },

    postTurnCheck(lastAttackerKey, defenderMon) {
        console.log('[postTurnCheck] called, lastAttacker:', lastAttackerKey, 'defenderFainted:', defenderMon?.fainted);
        
        const isP1 = lastAttackerKey === 'p1';
        const enemyKey = isP1 ? 'p2' : 'p1';
        const enemyTeam = isP1 ? this.state.p2.team : this.state.p1.team;

        // A. Did opponent faint?
        if (defenderMon && defenderMon.fainted) {
            // Check Win Condition
            const allDead = enemyTeam.every(m => m.fainted);

            if (allDead) {
                console.log('[postTurnCheck] all dead, ending game');
                this.endGame(lastAttackerKey); // Attacker Wins
                return;
            }

            // Force Switch
            console.log('[postTurnCheck] forcing switch for', enemyKey);
            this.state.forcedSwitch = true;
            this.state.turn = enemyKey; // Pass turn to loser to switch
            this.state.turnId++;
            this.state.isBlocked = false; // Unblock so they can click bench

            // Special UI State
            RenderEngine.toggleInputBlocker(true, "CHOOSE NEXT POKEMON");
            if (window.OnlineGame && OnlineGame.isOnline) {
                const nm = enemyKey === 'p1' ? (OnlineGame.myName || 'Player 1') : (OnlineGame.opponentName || 'Player 2');
                RenderEngine.log(`${nm} must switch!`, "text-red-400");
            } else {
                RenderEngine.log(`${enemyKey.toUpperCase()} must switch!`, "text-red-400");
            }

            return;
        }

        // B. Standard Turn Swap
        console.log('[postTurnCheck] standard turn swap to', enemyKey);
        this.state.turn = enemyKey;
        this.state.turnId++;
        this.state.isBlocked = false;
        RenderEngine.toggleInputBlocker(false);
        RenderEngine.updateTurnUI(this.state.turn);
        RenderEngine.updateControls(
            this.state.p1.team[this.state.p1.activeIdx],
            this.state.p2.team[this.state.p2.activeIdx],
            this.state.turn
        );
    },

    // --- SWITCHING ---
    async switchPokemon(playerKey, newIndex) {
        // Validation
        if (this.state.turn !== playerKey && !this.state.forcedSwitch) return; // Not your turn
        if (this.state.forcedSwitch && this.state.turn !== playerKey) return; // Wrong player switching

        const playerObj = playerKey === 'p1' ? this.state.p1 : this.state.p2;
        const targetMon = playerObj.team[newIndex];
        // Can't switch to current or fainted
        if (newIndex === playerObj.activeIdx) return;
        if (targetMon.fainted) return;

        // EXECUTE SWITCH
        this.state.isBlocked = true;

        // ONLINE MODE: Send action to server
        if (window.OnlineGame && OnlineGame.isOnline) {
            OnlineGame.sendSwitch(newIndex);
        }

        // 1. Update State
        playerObj.activeIdx = newIndex;
        if (window.OnlineGame && OnlineGame.isOnline) {
            const nm = playerKey === 'p1' ? (OnlineGame.myName || 'Player 1') : (OnlineGame.opponentName || 'Player 2');
            RenderEngine.log(`${nm} switches to ${targetMon.name}!`);
        } else {
            RenderEngine.log(`${playerKey.toUpperCase()} switches to ${targetMon.name}!`);
        }

        // 2. Render Swap
        await RenderEngine.performSwitch(playerKey, targetMon);

        // 3. Handle Turn Logic
        if (this.state.forcedSwitch) {
            // If this was a forced switch (after death), game resumes normal flow
            this.state.forcedSwitch = false;
            // Forced switch consumes the switcher's turn; give turn back to opponent
            this.state.turn = playerKey === 'p1' ? 'p2' : 'p1';
        } else {
            // Standard tactical switch consumes turn
            this.state.turn = playerKey === 'p1' ? 'p2' : 'p1';
        }

        this.state.turnId++;

        this.state.isBlocked = false;
        RenderEngine.toggleInputBlocker(false);
        RenderEngine.updateTurnUI(this.state.turn);
        RenderEngine.updateControls(
            this.state.p1.team[this.state.p1.activeIdx],
            this.state.p2.team[this.state.p2.activeIdx],
            this.state.turn
        );
    },

    endGame(winnerKey) {
        this.state.isBlocked = true;
        RenderEngine.showGameOver(winnerKey);
        if (window.AudioEngine) AudioEngine.playSFX('win');
        if (window.RenderEngine) RenderEngine.stopTurnTimer();
    },

    // Skip turn when timer expires
    skipTurn(playerKey) {
        console.log('[skipTurn] called for', playerKey, 'current turn:', this.state.turn, 'blocked:', this.state.isBlocked);
        
        if (this.state.isBlocked) return;
        if (this.state.turn !== playerKey) return;
        if (this.state.forcedSwitch) return;

        if (window.OnlineGame && OnlineGame.isOnline) {
            const nm = playerKey === 'p1' ? (OnlineGame.myName || 'Player 1') : (OnlineGame.opponentName || 'Player 2');
            RenderEngine.log(nm + ' skipped their turn!', 'text-gray-400');
        } else {
            RenderEngine.log(playerKey.toUpperCase() + ' skipped their turn!', 'text-gray-400');
        }

        const nextTurn = playerKey === 'p1' ? 'p2' : 'p1';
        this.state.turn = nextTurn;
        this.state.turnId++;

        RenderEngine.updateTurnUI(this.state.turn);
        RenderEngine.updateControls(
            this.state.p1.team[this.state.p1.activeIdx],
            this.state.p2.team[this.state.p2.activeIdx],
            this.state.turn
        );
    },

    // --- EVOLUTION FEATURE ---
    // Each player can use evolution once per battle
    async evolvePokemon(playerKey) {
        if (this.state.isBlocked) return;
        if (this.state.turn !== playerKey) {
            RenderEngine.log("Not your turn!", "text-red-400");
            return;
        }
        if (this.state.forcedSwitch) {
            RenderEngine.log("Must switch Pokemon first!", "text-red-400");
            return;
        }

        const playerObj = playerKey === 'p1' ? this.state.p1 : this.state.p2;
        
        // Check if evolution already used
        if (playerObj.evolutionUsed) {
            RenderEngine.log("Evolution already used this battle!", "text-red-400");
            return;
        }

        const activeMon = playerObj.team[playerObj.activeIdx];
        if (!activeMon || activeMon.fainted) {
            RenderEngine.log("Cannot evolve fainted Pokemon!", "text-red-400");
            return;
        }

        // Find evolution in DB
        const evoNum = activeMon.evolution1Num;
        if (!evoNum || evoNum > 251) {
            RenderEngine.log(`${activeMon.name} cannot evolve!`, "text-yellow-400");
            return;
        }

        // Find evolved form in database
        const evolvedData = POKEMON_DB.find(p => p.id === evoNum);
        if (!evolvedData) {
            RenderEngine.log(`Evolution data not found!`, "text-red-400");
            return;
        }

        // Block input during evolution
        this.state.isBlocked = true;
        RenderEngine.toggleInputBlocker(true, "EVOLVING...");
        RenderEngine.log(`${activeMon.name} is evolving!`, "text-yellow-400 font-bold");

        // ONLINE MODE: Send action to server
        if (window.OnlineGame && OnlineGame.isOnline) {
            OnlineGame.sendEvolve();
        }

        // Play evolution animation (3 phases: vibrate → glow yellow → warp)
        const spriteBox = document.getElementById(`${playerKey}-sprite-box`);
        const img = document.getElementById(`${playerKey}-img`);
        
        if (spriteBox) {
            // Phase 1: Vibrate (0.8s)
            spriteBox.classList.remove('anim-idle');
            spriteBox.classList.add('anim-evolve-vibrate');
            await new Promise(r => setTimeout(r, 800));
            
            // Phase 2: Glow Yellow (0.8s)
            spriteBox.classList.remove('anim-evolve-vibrate');
            spriteBox.classList.add('anim-evolve-glow');
            await new Promise(r => setTimeout(r, 800));
            
            // Update sprite to evolved form during the glow
            const spriteKey = this.sanitizeSpriteName(evolvedData.name);
            if (img) {
                img.dataset.fallbackTried = '0';
                img.src = `assets/images/${spriteKey}.png`;
            }
            
            // Phase 3: Warp into new form (1s)
            spriteBox.classList.remove('anim-evolve-glow');
            spriteBox.classList.add('anim-evolve-warp');
            await new Promise(r => setTimeout(r, 1000));
            
            // Clean up animation classes
            spriteBox.classList.remove('anim-evolve-warp');
        }

        // Calculate HP percentage to preserve
        //const hpPercent = activeMon.currentHp / activeMon.maxHp;

        // Update Pokemon data
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

        // Update sprite
        const spriteKey = this.sanitizeSpriteName(activeMon.name);
        activeMon.img = `assets/images/${spriteKey}.png`;

        // Evolution restores full HP
        activeMon.maxHp = activeMon.hp * 3;
        activeMon.currentHp = activeMon.maxHp;

        // Mark evolution as used
        playerObj.evolutionUsed = true;

        // Update UI
        if (spriteBox) {
            spriteBox.classList.remove('anim-warp');
        }
        
        await RenderEngine.spawnPokemon(playerKey, activeMon, true);
        RenderEngine.initBench(this.state.p1.team, this.state.p2.team);
        RenderEngine.updateControls(
            this.state.p1.team[this.state.p1.activeIdx],
            this.state.p2.team[this.state.p2.activeIdx],
            this.state.turn
        );

        // Update evolution button state
        this.updateEvolutionButtons();

        RenderEngine.log(`${oldName} evolved into ${activeMon.name}!`, "text-green-400 font-bold");

        // Unblock
        this.state.isBlocked = false;
        RenderEngine.toggleInputBlocker(false);
    },

    updateEvolutionButtons() {
        const p1Btn = document.getElementById('p1-evolve-btn');
        const p2Btn = document.getElementById('p2-evolve-btn');
        
        if (p1Btn) {
            if (this.state.p1.evolutionUsed) {
                p1Btn.disabled = true;
                p1Btn.classList.add('btn-disabled');
            }
        }
        if (p2Btn) {
            if (this.state.p2.evolutionUsed) {
                p2Btn.disabled = true;
                p2Btn.classList.add('btn-disabled');
            }
        }
    },

    canEvolve(playerKey) {
        const playerObj = playerKey === 'p1' ? this.state.p1 : this.state.p2;
        if (playerObj.evolutionUsed) return false;
        const activeMon = playerObj.team[playerObj.activeIdx];
        if (!activeMon || activeMon.fainted) return false;
        const evoNum = activeMon.evolution1Num;
        return evoNum && evoNum <= 251;
    }
};

// Auto-run init when loaded
window.onload = () => GameCore.init();

// Global exposure for other scripts (RenderEngine uses window.GameCore)
window.GameCore = GameCore;

// Global exposure for HTML buttons
window.adjustTeamSize = (n) => {
    console.log('adjustTeamSize clicked:', n);
    return GameCore.adjustTeamSize(n);
};
window.startGame = () => {
    console.log('startGame clicked');
    return GameCore.startGame();
};
window.setPokedexMin = (v) => {
    return GameCore.setPokedexMin(v);
};
window.setPokedexMax = (v) => {
    return GameCore.setPokedexMax(v);
};
window.evolvePokemon = (playerKey) => {
    return GameCore.evolvePokemon(playerKey);
};