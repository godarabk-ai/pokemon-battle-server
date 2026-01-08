/* === GAME_DRAFTING.JS ===
   Team drafting and Pokemon hydration logic
*/

const GameDrafting = {
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

            const spriteKey = this.sanitizeSpriteName(mon.name);
            mon.img = `assets/images/${spriteKey}.png`;

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

    getDraftPool(pokedexMin, pokedexMax) {
        if (typeof POKEMON_DB === 'undefined' || !Array.isArray(POKEMON_DB)) return [];
        const minId = Number(pokedexMin || 1);
        const maxId = Number(pokedexMax || 151);
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

    draftBalancedTeams(count, pokedexMin, pokedexMax) {
        const pool = this.getDraftPool(pokedexMin, pokedexMax);
        let best = null;

        for (let attempt = 0; attempt < 220; attempt++) {
            const picked = this.sampleUniqueMons(pool, count * 2);
            const p1Raw = picked.slice(0, count);
            const p2Raw = picked.slice(count, count * 2);
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
    }
};

window.GameDrafting = GameDrafting;
