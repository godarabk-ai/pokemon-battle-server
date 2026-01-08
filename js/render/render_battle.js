/* RENDER BATTLE - Battle field sprites and animations */

const RenderBattle = {
    dangerMode: { p1: false, p2: false },

    updateField(p1Mon, p2Mon) {
        this.updateUnit('p1', p1Mon);
        this.updateUnit('p2', p2Mon);
    },

    updateUnit(playerKey, mon) {
        const nameEl = document.querySelector(`.stats-${playerKey} .mon-name`);
        const hpTextEl = document.querySelector(`.stats-${playerKey} .hp-text`);
        const typesEl = document.querySelector('.stats-' + playerKey + ' .types-row');

        if (nameEl) nameEl.innerText = mon.name;
        if (hpTextEl) hpTextEl.innerText = `${Math.ceil(mon.currentHp)} / ${mon.maxHp} HP`;

        if (typesEl) {
            typesEl.innerHTML = `
                <span class="type-badge" style="background-color: var(--hp-mid)">${mon.type1}</span>
                ${mon.type2 && mon.type2 !== mon.type1 ? `<span class="type-badge" style="background-color: var(--text-muted)">${mon.type2}</span>` : ''}
            `;
        }

        const bar = document.querySelector(`.stats-${playerKey} .hp-fill`);
        const chip = document.querySelector(`.stats-${playerKey} .hp-chip`);
        const pct = (mon.currentHp / mon.maxHp) * 100;
        if (bar) {
            bar.style.width = `${pct}%`;
            bar.style.backgroundColor = pct < 25 ? 'var(--hp-low)' : (pct < 50 ? 'var(--hp-mid)' : 'var(--hp-high)');
        }

        if (chip) {
            const prev = Number(chip.dataset.pct ?? '100');
            if (pct >= prev) {
                chip.style.transitionDelay = '0s';
                chip.style.transitionDuration = '0.2s';
                chip.style.width = `${pct}%`;
            } else {
                chip.style.transitionDelay = '0.5s';
                chip.style.transitionDuration = '0.8s';
                chip.style.width = `${pct}%`;
            }
            chip.dataset.pct = String(pct);
        }

        const img = document.getElementById(`${playerKey}-img`);
        if (img) {
            img.onerror = () => {
                if (img.dataset.fallbackTried === '1') return;
                img.dataset.fallbackTried = '1';
                img.src = 'assets/images/ditto.png';
            };

            if (img.src !== mon.img && !img.src.includes(mon.img)) {
                img.dataset.fallbackTried = '0';
                img.src = mon.img;
            }

            const height = Number(mon.height || 0);
            const weight = Number(mon.weight || 0);
            let targetPx = 0;
            if (height > 0) {
                const wBoost = weight > 0 ? Math.min(65, Math.round(Math.sqrt(weight) * 2.2)) : 0;
                targetPx = Math.round(80 + height * 16 + wBoost);
            } else {
                targetPx = Math.round(130 + (mon.hp || 0) * 2.2);
            }
            targetPx = Math.max(110, Math.min(420, targetPx));
            img.style.height = `${targetPx}px`;
        }

        const spriteBox = document.getElementById(`${playerKey}-sprite-box`);
        if (spriteBox) {
            spriteBox.classList.remove('anim-panic');
            const isKO = mon.fainted || spriteBox.classList.contains('ko-grey');
            if (!isKO && pct < 20) spriteBox.classList.add('anim-panic');
        }

        const card = document.querySelector(`.stats-${playerKey}`);
        if (card) card.style.opacity = '1';

        if (window.RenderBench) {
            RenderBench.updateBenchStatus(playerKey, mon);
        }
    },

    async spawnPokemon(playerKey, mon, isEvolution = false) {
        this.updateUnit(playerKey, mon);
        const spriteBox = document.getElementById(`${playerKey}-sprite-box`);
        if (!spriteBox) return;

        spriteBox.classList.remove('anim-faint', 'ko-flash', 'ko-grey', 'anim-charge', 'anim-windup', 'ko-dissolve');
        spriteBox.classList.remove('anim-enter-left', 'anim-enter-right', 'anim-enter-left-back', 'anim-enter-right-back', 'anim-warp');

        if (isEvolution) {
            spriteBox.classList.add('anim-warp');
        } else {
            spriteBox.classList.add(playerKey === 'p1' ? 'anim-enter-left-back' : 'anim-enter-right-back');
        }

        if (window.AudioEngine) {
            AudioEngine.playCry(mon.name, false);
        }

        return new Promise(resolve => setTimeout(() => {
            spriteBox.classList.remove('anim-enter-left', 'anim-enter-right', 'anim-enter-left-back', 'anim-enter-right-back', 'anim-warp');
            spriteBox.classList.add('anim-idle');
            resolve();
        }, isEvolution ? 1000 : 700));
    },

    async performSwitch(playerKey, newMon) {
        await this.spawnPokemon(playerKey, newMon);
    },

    async playAttackAnim(attackerKey, moveType, category, defenderKey, power, moveName) {
        category = category || 'physical';
        defenderKey = defenderKey || (attackerKey === 'p1' ? 'p2' : 'p1');
        moveName = moveName || '';

        const isP1 = attackerKey === 'p1';
        const spriteBox = document.getElementById(`${attackerKey}-sprite-box`);
        const shadowBox = spriteBox;

        if (window.RenderFX) {
            RenderFX.setActionFocus(attackerKey);
            RenderFX.triggerTypeAtmosphere(moveType);
            RenderFX.updateArenaAmbiance(moveType);
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

                if (shadowBox) shadowBox.classList.add('is-airborne');
            }

            return new Promise(resolve => setTimeout(() => {
                if (spriteBox) {
                    spriteBox.classList.remove(isP1 ? 'anim-attack-right' : 'anim-attack-left');
                    spriteBox.classList.add('anim-idle');
                }
                if (shadowBox) shadowBox.classList.remove('is-airborne');
                if (window.RenderFX) RenderFX.clearActionFocus();
                resolve();
            }, 350));
        }

        if (spriteBox) {
            spriteBox.classList.remove('anim-idle');
            spriteBox.classList.add('anim-cast');
        }
        if (window.RenderFX) {
            await RenderFX.spawnProjectile(attackerKey, defenderKey, moveType, moveName);
        }
        if (spriteBox) {
            spriteBox.classList.remove('anim-cast');
            spriteBox.classList.add('anim-idle');
        }
        if (window.RenderFX) RenderFX.clearActionFocus();
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
        if (window.AudioEngine) AudioEngine.playSFX('hit');

        if (spriteBox && window.RenderFX) {
            RenderFX.showDamagePopup(spriteBox, damage, isCrit, effectiveness);
        }

        if (spriteBox && effectiveness !== 1 && window.RenderFX) {
            RenderFX.showEffectivenessPopup(spriteBox, effectiveness);
        }

        if (window.RenderFX) {
            if (isCrit || effectiveness >= 2) {
                RenderFX.triggerCameraImpact();
                RenderFX.triggerScreenShake();
            } else {
                RenderFX.triggerCameraImpact();
            }
            RenderFX.spawnHitParticles(victimKey, moveType, isCrit || effectiveness > 1);
            RenderFX.spawnAdvancedParticles(victimKey, moveType, isCrit || effectiveness > 1, category);
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

window.RenderBattle = RenderBattle;
