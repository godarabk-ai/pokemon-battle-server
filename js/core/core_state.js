/* CORE STATE - State management, config, and initialization */

const CoreState = {
    config: {
        teamSize: 3,
        maxTeamSize: 6,
        pokedexMin: 1,
        pokedexMax: 151
    },
    state: {
        p1: { team: [], activeIdx: 0, evolutionUsed: false },
        p2: { team: [], activeIdx: 0, evolutionUsed: false },
        turn: 'p1',
        turnId: 0,
        isBlocked: false,
        forcedSwitch: false
    },

    init() {
        console.log("Core Initialized");
        this.updateTeamSizeDisplay();

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
        if (display) display.innerText = this.config.teamSize;
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

    resetState() {
        this.state.p1.activeIdx = 0;
        this.state.p2.activeIdx = 0;
        this.state.p1.evolutionUsed = false;
        this.state.p2.evolutionUsed = false;
        this.state.turn = 'p1';
        this.state.turnId = 0;
        this.state.isBlocked = false;
        this.state.forcedSwitch = false;
    }
};

window.CoreState = CoreState;
