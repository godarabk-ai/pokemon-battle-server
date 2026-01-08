/* CORE DRAFTING - Team drafting and Pokemon data */

const CoreDrafting = {
    sanitizeSpriteName(name) {
        return String(name)
            .toLowerCase()
            .replace(/['.]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim();
    },

    getDraftPool() {
        if (typeof POKEMON_DB === 'undefined' || !Array.isArray(POKEMON_DB)) return [];
        const config = window.CoreState ? CoreState.config : { pokedexMin: 1, pokedexMax: 151 };
        const minId = Number(config.pokedexMin || 1);
        const maxId = Number(config.pokedexMax || 151);
        return POKEMON_DB.filter(m => {
            const id = Number(m.id || 0);
            return id >= minId && id <= maxId;
        });
    },

    sampleUniqueMons(pool, count) {
        const copy = pool.slice();
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

    getTeamPower(team) {
        return (team || []).reduce((sum, m) => sum + (m.hp || 0) + (m.atk || 0) + (m.def || 0), 0);
    },

    draftBalancedTeams(count, pool) {
        pool = pool || this.getDraftPool();
        let best = null;

        // Helper: check if a Pokemon can evolve (has valid evolution within range)
        const canEvolve = (mon) => {
            const evoNum = mon.evolution1Num;
            return evoNum && evoNum <= 251 && pool.some(p => p.id === evoNum);
        };

        // Separate pool into evolvable and non-evolvable
        const evolvable = pool.filter(canEvolve);

        // Minimum evolvable Pokemon per team (at least 2, but cap at team size)
        const minEvolvable = Math.min(2, count);

        for (let attempt = 0; attempt < 220; attempt++) {
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
            team.push(this.hydrateMon(rand, i));
        }
        return team;
    }
};

window.CoreDrafting = CoreDrafting;
