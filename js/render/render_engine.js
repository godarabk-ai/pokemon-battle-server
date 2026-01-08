/* RENDER ENGINE - Facade that delegates to split render modules */

const RenderEngine = {
    // Delegate to RenderBench
    initBench(p1Team, p2Team) {
        if (window.RenderBench) RenderBench.initBench(p1Team, p2Team);
    },
    renderBenchSide(playerKey, team, hideDetails) {
        if (window.RenderBench) RenderBench.renderBenchSide(playerKey, team, hideDetails);
    },
    updateBenchStatus(playerKey, activeMon) {
        if (window.RenderBench) RenderBench.updateBenchStatus(playerKey, activeMon);
    },

    // Delegate to RenderBattle
    updateField(p1Mon, p2Mon) {
        if (window.RenderBattle) RenderBattle.updateField(p1Mon, p2Mon);
    },
    updateUnit(playerKey, mon) {
        if (window.RenderBattle) RenderBattle.updateUnit(playerKey, mon);
    },
    async spawnPokemon(playerKey, mon, isEvolution) {
        if (window.RenderBattle) return RenderBattle.spawnPokemon(playerKey, mon, isEvolution);
    },
    async performSwitch(playerKey, newMon) {
        if (window.RenderBattle) return RenderBattle.performSwitch(playerKey, newMon);
    },
    async playAttackAnim(attackerKey, moveType, category, defenderKey, power, moveName) {
        if (window.RenderBattle) return RenderBattle.playAttackAnim(attackerKey, moveType, category, defenderKey, power, moveName);
    },
    async playHitAnim(victimKey, damage, isCrit, effectiveness, moveType, category) {
        if (window.RenderBattle) return RenderBattle.playHitAnim(victimKey, damage, isCrit, effectiveness, moveType, category);
    },
    playFaintAnim(victimKey, isLastKO) {
        if (window.RenderBattle) RenderBattle.playFaintAnim(victimKey, isLastKO);
    },

    // Delegate to RenderFX
    getBattleStage() {
        return window.RenderFX ? RenderFX.getBattleStage() : null;
    },
    setActionFocus(attackerKey) {
        if (window.RenderFX) RenderFX.setActionFocus(attackerKey);
    },
    clearActionFocus() {
        if (window.RenderFX) RenderFX.clearActionFocus();
    },
    triggerTypeAtmosphere(moveType) {
        if (window.RenderFX) RenderFX.triggerTypeAtmosphere(moveType);
    },
    getTypeRGB(type) {
        return window.RenderFX ? RenderFX.getTypeRGB(type) : { r: 156, g: 163, b: 175 };
    },
    getTypeColor(type) {
        return window.RenderFX ? RenderFX.getTypeColor(type) : '#9ca3af';
    },
    triggerCameraImpact() {
        if (window.RenderFX) RenderFX.triggerCameraImpact();
    },
    triggerScreenShake() {
        if (window.RenderFX) RenderFX.triggerScreenShake();
    },
    spawnHitParticles(victimKey, moveType, isCrit) {
        if (window.RenderFX) RenderFX.spawnHitParticles(victimKey, moveType, isCrit);
    },
    async spawnProjectile(attackerKey, defenderKey, moveType, moveName) {
        if (window.RenderFX) return RenderFX.spawnProjectile(attackerKey, defenderKey, moveType, moveName);
    },
    spawnAdvancedParticles(victimKey, moveType, strong, category) {
        if (window.RenderFX) RenderFX.spawnAdvancedParticles(victimKey, moveType, strong, category);
    },
    showDamagePopup(targetEl, amount, isCrit, effectiveness) {
        if (window.RenderFX) RenderFX.showDamagePopup(targetEl, amount, isCrit, effectiveness);
    },
    showEffectivenessPopup(targetEl, effectiveness) {
        if (window.RenderFX) RenderFX.showEffectivenessPopup(targetEl, effectiveness);
    },
    updateArenaEnvironment(p1Mon, p2Mon) {
        if (window.RenderFX) RenderFX.updateArenaEnvironment(p1Mon, p2Mon);
    },
    updateArenaAmbiance(moveType) {
        if (window.RenderFX) RenderFX.updateArenaAmbiance(moveType);
    },

    // Delegate to RenderUI
    setTurnWaitOverlays(turn) {
        if (window.RenderUI) RenderUI.setTurnWaitOverlays(turn);
    },
    startTurnTimer(turn) {
        if (window.RenderUI) RenderUI.startTurnTimer(turn);
    },
    stopTurnTimer() {
        if (window.RenderUI) RenderUI.stopTurnTimer();
    },
    updateControls(p1Mon, p2Mon, turn) {
        if (window.RenderUI) RenderUI.updateControls(p1Mon, p2Mon, turn);
    },
    updateTurnUI(turn) {
        if (window.RenderUI) RenderUI.updateTurnUI(turn);
    },
    toggleInputBlocker(show, text) {
        if (window.RenderUI) RenderUI.toggleInputBlocker(show, text);
    },
    log(msg, colorClass) {
        if (window.RenderUI) RenderUI.log(msg, colorClass);
    },
    showGameOver(winnerKey) {
        if (window.RenderUI) RenderUI.showGameOver(winnerKey);
    },
    updateEvolveButtonState(playerKey, mon) {
        if (window.RenderUI) RenderUI.updateEvolveButtonState(playerKey, mon);
    }
};

window.RenderEngine = RenderEngine;
