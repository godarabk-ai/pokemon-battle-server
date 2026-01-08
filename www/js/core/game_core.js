/* GAME CORE - Facade that delegates to split core modules */

const GameCore = {
    // Delegate to CoreState
    get config() { return window.CoreState ? CoreState.config : {}; },
    get state() { return window.CoreState ? CoreState.state : {}; },

    init() {
        if (window.CoreState) CoreState.init();
    },
    adjustTeamSize(n) {
        if (window.CoreState) CoreState.adjustTeamSize(n);
    },
    updateTeamSizeDisplay() {
        if (window.CoreState) CoreState.updateTeamSizeDisplay();
    },
    setPokedexMin(v) {
        if (window.CoreState) CoreState.setPokedexMin(v);
    },
    setPokedexMax(v) {
        if (window.CoreState) CoreState.setPokedexMax(v);
    },

    // Delegate to CoreDrafting
    sanitizeSpriteName(name) {
        return window.CoreDrafting ? CoreDrafting.sanitizeSpriteName(name) : name;
    },
    getDraftPool() {
        return window.CoreDrafting ? CoreDrafting.getDraftPool() : [];
    },
    draftBalancedTeams(count, pool) {
        return window.CoreDrafting ? CoreDrafting.draftBalancedTeams(count, pool) : { p1: [], p2: [] };
    },
    draftTeam(count) {
        return window.CoreDrafting ? CoreDrafting.draftTeam(count) : [];
    },
    getTeamPower(team) {
        return window.CoreDrafting ? CoreDrafting.getTeamPower(team) : 0;
    },

    // Delegate to CoreBattle
    async startGame() {
        if (window.CoreBattle) return CoreBattle.startGame();
    },
    async handleMove(attackerKey, moveIndex) {
        if (window.CoreBattle) return CoreBattle.handleMove(attackerKey, moveIndex);
    },
    postTurnCheck(lastAttackerKey, defenderMon) {
        if (window.CoreBattle) CoreBattle.postTurnCheck(lastAttackerKey, defenderMon);
    },
    async switchPokemon(playerKey, newIndex) {
        if (window.CoreBattle) return CoreBattle.switchPokemon(playerKey, newIndex);
    },
    endGame(winnerKey) {
        if (window.CoreBattle) CoreBattle.endGame(winnerKey);
    },
    skipTurn(playerKey) {
        if (window.CoreBattle) CoreBattle.skipTurn(playerKey);
    },

    // Delegate to CoreEvolution
    async evolvePokemon(playerKey) {
        if (window.CoreEvolution) return CoreEvolution.evolvePokemon(playerKey);
    },
    updateEvolutionButtons() {
        if (window.CoreEvolution) CoreEvolution.updateEvolutionButtons();
    },
    canEvolve(playerKey) {
        return window.CoreEvolution ? CoreEvolution.canEvolve(playerKey) : false;
    }
};

// Auto-run init when loaded
window.onload = () => GameCore.init();

// Global exposure
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
