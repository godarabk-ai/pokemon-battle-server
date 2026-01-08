/* === RENDER_ANIMATIONS.JS ===
   Sprite animations: spawn, attack, hit, faint
*/

const RenderAnimations = {
    async spawnPokemon(playerKey, mon) {
        if (window.RenderBattlefield) window.RenderBattlefield.updateUnit(playerKey, mon);
        const spriteBox = document.getElementById(`${playerKey}-sprite-box`);
        if (!spriteBox) return;
        
        spriteBox.classList.remove('anim-faint', 'ko-flash', 'ko-grey', 'anim-charge', 'anim-windup', 'ko-dissolve');
        spriteBox.classList.remove('anim-enter-left', 'anim-enter-right', 'anim-enter-left-back', 'anim-enter-right-back');
        spriteBox.classList.add(playerKey === 'p1' ? 'anim-enter-left-back' : 'anim-enter-right-back');
        
        if(window.AudioEngine) {
            AudioEngine.playCry(mon.name, false);
        }

        return new Promise(resolve => setTimeout(() => {
            spriteBox.classList.remove('anim-enter-left', 'anim-enter-right', 'anim-enter-left-back', 'anim-enter-right-back');
            spriteBox.classList.add('anim-idle');
            resolve();
        }, 700));
    },

    async performSwitch(playerKey, newMon) {
        await this.spawnPokemon(playerKey, newMon);
    },

    async playAttackAnim(attackerKey, moveType, category, defenderKey, power, moveName) {
        category = category || 'physical';
        defenderKey = defenderKey || (attackerKey === 'p1' ? 'p2' : 'p1');

        const isP1 = attackerKey === 'p1';
        const spriteBox = document.getElementById(`${attackerKey}-sprite-box`);

        if (window.RenderFX) {
            window.RenderFX.setActionFocus(attackerKey);
            window.RenderFX.triggerTypeAtmosphere(moveType);
            window.RenderFX.updateArenaAmbiance(moveType);
        }

        if (window.AudioEngine) {
            await AudioEngine.playAttackSound(moveName, (chargeDuration) => {
                if (spriteBox) {
                    spriteBox.classList.add('anim-charge');
                    setTimeout(() => spriteBox.classList.remove('anim-charge'), chargeDuration);
                }
            });
        }

        if (category === 'physical') {
            if (spriteBox) {
                spriteBox.classList.remove('anim-idle');
                spriteBox.classList.add('anim-windup');
                await new Promise(r => setTimeout(r, 120));
                
                spriteBox.classList.remove('anim-windup');
                spriteBox.classList.add(isP1 ? 'anim-attack-right' : 'anim-attack-left');
                spriteBox.classList.add('is-airborne');
            }

            return new Promise(resolve => setTimeout(() => {
                if (spriteBox) {
                    spriteBox.classList.remove(isP1 ? 'anim-attack-right' : 'anim-attack-left');
                    spriteBox.classList.remove('is-airborne');
                    spriteBox.classList.add('anim-idle');
                }
                if (window.RenderFX) window.RenderFX.clearActionFocus();
                resolve();
            }, 350));
        }

        // Special attack: projectile
        if (spriteBox) {
            spriteBox.classList.remove('anim-idle');
            spriteBox.classList.add('anim-cast');
        }
        if (window.RenderFX) await window.RenderFX.spawnProjectile(attackerKey, defenderKey, moveType, moveName);
        if (spriteBox) {
            spriteBox.classList.remove('anim-cast');
            spriteBox.classList.add('anim-idle');
        }
        if (window.RenderFX) window.RenderFX.clearActionFocus();
    },

    async playHitAnim(victimKey, damage, isCrit, effectiveness, moveType, category) {
        moveType = moveType || 'normal';
        effectiveness = typeof effectiveness === 'number' ? effectiveness : (effectiveness ? 2 : 1);
        category = category || 'physical';
        
        const spriteBox = document.getElementById(`${victimKey}-sprite-box`);
        const isP1Victim = victimKey === 'p1';
        
        const hitClass = (damage <= 10 && !isCrit && effectiveness <= 1) ? 'anim-hit-weak' : (isCrit ? 'anim-hit-heavy' : (effectiveness > 1 ? 'anim-hit-super' : 'anim-hit'));
        const dirClass = isP1Victim ? 'hit-from-right' : 'hit-from-left';
        
        if (spriteBox) {
            spriteBox.classList.add(hitClass, dirClass, 'impact-flash');
        }
        if(window.AudioEngine) AudioEngine.playSFX('hit');

        if (spriteBox && window.RenderFX) {
            window.RenderFX.showDamagePopup(spriteBox, damage, isCrit, effectiveness);
            if (effectiveness !== 1) {
                window.RenderFX.showEffectivenessPopup(spriteBox, effectiveness);
            }
        }

        if (window.RenderFX) {
            if (isCrit || effectiveness >= 2) {
                window.RenderFX.triggerCameraImpact();
                window.RenderFX.triggerScreenShake();
            } else {
                window.RenderFX.triggerCameraImpact();
            }
            window.RenderFX.spawnHitParticles(victimKey, moveType, isCrit || effectiveness > 1);
            window.RenderFX.spawnAdvancedParticles(victimKey, moveType, isCrit || effectiveness > 1, category);
        }

        setTimeout(() => {
            if (spriteBox) spriteBox.classList.remove('impact-flash', hitClass, dirClass, 'anim-hit', 'anim-hit-weak', 'anim-hit-heavy', 'anim-hit-super', 'hit-from-left', 'hit-from-right');
        }, 500);
        
        return new Promise(resolve => setTimeout(resolve, 500));
    },

    playFaintAnim(victimKey, isLastKO = false) {
        const spriteBox = document.getElementById(`${victimKey}-sprite-box`);
        if (!spriteBox) return;
        
        let monName = '';
        if (window.GameCore && window.GameCore.state) {
            const playerObj = window.GameCore.state[victimKey];
            if (playerObj && playerObj.team && playerObj.team[playerObj.activeIdx]) {
                monName = playerObj.team[playerObj.activeIdx].name;
            }
        }
        
        spriteBox.classList.remove('anim-panic', 'anim-idle', 'anim-hit', 'anim-hit-weak', 'anim-cast', 'anim-attack-right', 'anim-attack-left', 'anim-enter-left', 'anim-enter-right', 'anim-enter-left-back', 'anim-enter-right-back', 'ko-grey', 'anim-charge', 'anim-windup');
        
        if (isLastKO) {
            spriteBox.classList.add('slow-motion');
            document.body.classList.add('slow-motion-global');
            setTimeout(() => document.body.classList.remove('slow-motion-global'), 500);
        }
        
        spriteBox.classList.add('ko-flash');
        
        if (window.AudioEngine && monName) {
            AudioEngine.playCry(monName, true);
        }
        
        setTimeout(() => {
            spriteBox.classList.remove('ko-flash', 'slow-motion');
            spriteBox.classList.add('ko-grey');
        }, 700);
    }
};

window.RenderAnimations = RenderAnimations;
