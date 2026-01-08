/* GAME RENDER
   - Manipulates the DOM (HTML) based on Game State
   - Handles Animations (Sprites, Health Bars, Popups)
   - Updates Text (Logs, Turn Indicators)
*/

const RenderEngine = {
    // Track danger mode per player
    dangerMode: { p1: false, p2: false },

    turnTimer: {
        id: null,
        durationMs: 30000,
        startTs: 0,
        turn: null,
        turnId: 0
    },


    // --- INITIAL SETUP ---
    initBench(p1Team, p2Team) {
        this.renderBenchSide('p1', p1Team);
        // In online mode, hide opponent details (show only count)
        const isOnline = window.OnlineGame && window.OnlineGame.isOnline;
        this.renderBenchSide('p2', p2Team, isOnline);
    },

    renderBenchSide(playerKey, team, hideDetails = false) {
        const container = document.querySelector(`.${playerKey}-bench .bench-grid`);
        if(!container) return;

        container.innerHTML = ''; // Clear existing

        team.forEach((mon, index) => {
            const slot = document.createElement('div');
            slot.className = `bench-slot ${index === 0 ? 'active-slot' : ''}`;
            slot.dataset.index = index;
            slot.onclick = () => window.GameCore.switchPokemon(playerKey, index);

            if (hideDetails && playerKey === 'p2') {
                // Online mode: show only silhouette/count for opponent
                const isFainted = mon.currentHp <= 0;
                slot.innerHTML = `
                    <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.5); border-radius: 0.5rem;">
                        <div style="font-size: 2rem; color: ${isFainted ? '#ef4444' : '#9ca3af'};">●</div>
                    </div>
                `;
            } else {
                // Normal mode: show full details
                const hpPct = (mon.currentHp / mon.maxHp) * 100;
                const colorClass = hpPct < 20 ? '#ef4444' : (hpPct < 50 ? '#eab308' : '#22c55e');

                slot.innerHTML = `
                    <img src="${mon.img}" alt="${mon.name}">
                    <div class="hp-mini-bar">
                        <div class="hp-mini-fill" style="width: ${hpPct}%; background-color: ${colorClass}"></div>
                    </div>
                `;

                const img = slot.querySelector('img');
                if (img) {
                    img.onerror = () => {
                        if (img.dataset.fallbackTried === '1') return;
                        img.dataset.fallbackTried = '1';
                        img.src = 'assets/images/ditto.png';
                    };
                }
            }
            container.appendChild(slot);
        });
    },

    // --- MAIN BATTLEFIELD UPDATES ---
    updateField(p1Mon, p2Mon) {
        this.updateUnit('p1', p1Mon);
        this.updateUnit('p2', p2Mon);
    },

    updateUnit(playerKey, mon) {

        // Text Info
        const nameEl = document.querySelector(`.stats-${playerKey} .mon-name`);
        const hpTextEl = document.querySelector(`.stats-${playerKey} .hp-text`);
        const typesEl = document.querySelector('.stats-' + playerKey + ' .types-row');
        
        if(nameEl) nameEl.innerText = mon.name;
        if(hpTextEl) hpTextEl.innerText = `${Math.ceil(mon.currentHp)} / ${mon.maxHp} HP`;
        
        // Types
        if(typesEl) {
            typesEl.innerHTML = `
                <span class="type-badge" style="background-color: var(--hp-mid)">${mon.type1}</span>
                ${mon.type2 && mon.type2 !== mon.type1 ? `<span class="type-badge" style="background-color: var(--text-muted)">${mon.type2}</span>` : ''}
            `;
        }

        // HP Bar
        const bar = document.querySelector(`.stats-${playerKey} .hp-fill`);
        const chip = document.querySelector(`.stats-${playerKey} .hp-chip`);
        const pct = (mon.currentHp / mon.maxHp) * 100;
        if(bar) {
            bar.style.width = `${pct}%`;
            // Color Logic
            bar.style.backgroundColor = pct < 25 ? 'var(--hp-low)' : (pct < 50 ? 'var(--hp-mid)' : 'var(--hp-high)');
        }

        if (chip) {
            const prev = Number(chip.dataset.pct ?? '100');
            // If healing/increase, snap chip immediately. If damage/decrease, lag behind.
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

        // Sprite
        const img = document.getElementById(`${playerKey}-img`);
        if (img) {

            img.onerror = () => {
                if (img.dataset.fallbackTried === '1') return;
                img.dataset.fallbackTried = '1';
                img.src = 'assets/images/ditto.png';
            };

            if(img.src !== mon.img && !img.src.includes(mon.img)) {
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

        // Idle/Panic state
        const spriteBox = document.getElementById(`${playerKey}-sprite-box`);
        if (spriteBox) {
            spriteBox.classList.remove('anim-panic');
            // Don't panic/vibrate if fainted / KO grey
            const isKO = mon.fainted || spriteBox.classList.contains('ko-grey');
            if (!isKO && pct < 20) spriteBox.classList.add('anim-panic');
        }

        // Stats Card Fade In
        const card = document.querySelector(`.stats-${playerKey}`);
        if(card) card.style.opacity = '1';

        // Update Bench Status (Mini bars)
        this.updateBenchStatus(playerKey, mon);
    },

    updateBenchStatus(playerKey, activeMon) {
        const slots = document.querySelectorAll(`.${playerKey}-bench .bench-slot`);
        slots.forEach((slot, idx) => {
            if (!window.GameCore || !window.GameCore.state || !window.GameCore.state[playerKey]) return;

            if(window.GameCore.state[playerKey].activeIdx === idx) {
                slot.classList.add('active-slot');
            } else {
                slot.classList.remove('active-slot');
            }

            if(idx === window.GameCore.state[playerKey].activeIdx) {
                const fill = slot.querySelector('.hp-mini-fill');
                const pct = (activeMon.currentHp / activeMon.maxHp) * 100;
                if(fill) {
                    fill.style.width = `${pct}%`;
                    fill.style.backgroundColor = pct < 20 ? '#ef4444' : (pct < 50 ? '#eab308' : '#22c55e');
                }
            }

            const team = window.GameCore.state[playerKey].team;
            if (team && team[idx] && team[idx].fainted) {
                slot.classList.add('bench-dead');
            }
        });
    },

    // --- FX HELPERS ---
    getBattleStage() {
        return document.querySelector('.battle-stage');
    },

    setTurnWaitOverlays(turn) {
        const p1Wait = document.getElementById('p1-wait-overlay');
        const p2Wait = document.getElementById('p2-wait-overlay');
        if (p1Wait) p1Wait.classList.toggle('hidden', turn === 'p1');
        if (p2Wait) p2Wait.classList.toggle('hidden', turn === 'p2');
    },

    startTurnTimer(turn) {
        const fill = document.getElementById('turn-timer-fill');
        if (!fill) return;

        this.stopTurnTimer();
        this.turnTimer.turn = turn;
        this.turnTimer.startTs = Date.now();
        this.turnTimer.turnId = window.GameCore?.state?.turnId ?? 0;
        fill.style.width = '100%';

        this.turnTimer.id = setInterval(() => {
            const elapsed = Date.now() - this.turnTimer.startTs;
            const pct = Math.max(0, 1 - elapsed / this.turnTimer.durationMs);
            fill.style.width = `${Math.round(pct * 100)}%`;
            if (pct <= 0) {
                this.stopTurnTimer();
                // Auto-skip turn when timer expires
                if (
                    window.GameCore &&
                    window.GameCore.state.turn === turn &&
                    window.GameCore.state.turnId === this.turnTimer.turnId &&
                    !window.GameCore.state.isBlocked &&
                    !window.GameCore.state.forcedSwitch
                ) {
                    this.log(`${turn.toUpperCase()} ran out of time!`, 'text-red-400');
                    window.GameCore.skipTurn(turn);
                }
            }
        }, 120);
    },

    stopTurnTimer() {
        if (this.turnTimer.id) {
            clearInterval(this.turnTimer.id);
            this.turnTimer.id = null;
        }
    },

    updateArenaEnvironment(p1Mon, p2Mon) {
        const stage = this.getBattleStage();
        if (!stage) return;

        stage.classList.remove('rain-on');
        stage.className = stage.className.replace(/\bfloor-\w+\b/g, '').trim();

        const types = [p1Mon?.type1, p1Mon?.type2, p2Mon?.type1, p2Mon?.type2]
            .map(t => String(t || '').toLowerCase())
            .filter(Boolean);

        const floorPriority = ['fire','water','electric','grass','ice','poison'];
        const picked = floorPriority.find(t => types.includes(t)) || (types[0] || 'normal');
        stage.classList.add(`floor-${picked}`);

        if (types.includes('water')) {
            stage.classList.add('rain-on');
        }
    },

    setActionFocus(attackerKey) {
        const stage = this.getBattleStage();
        if (!stage) return;
        stage.classList.remove('focus-p1', 'focus-p2');
        stage.classList.add(attackerKey === 'p1' ? 'focus-p1' : 'focus-p2');
    },

    clearActionFocus() {
        const stage = this.getBattleStage();
        if (!stage) return;
        stage.classList.remove('focus-p1', 'focus-p2');
    },

    triggerTypeAtmosphere(moveType) {
        const overlay = document.querySelector('.stage-overlay');
        if (!overlay) return;
        const cls = `fx-${moveType}`;

        overlay.classList.remove(
            'fx-water','fx-grass','fx-fire','fx-electric','fx-ice','fx-poison','fx-psychic','fx-ghost','fx-rock','fx-ground','fx-fairy','fx-steel','fx-dragon','fx-dark','fx-bug','fx-flying','fx-normal','fx-fighting'
        );
        const rgb = this.getTypeRGB(moveType);
        const alpha = 0.20;
        overlay.style.backgroundColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;

        overlay.classList.add(cls);
        // Auto remove after animation
        setTimeout(() => {
            overlay.classList.remove(cls);
            overlay.style.backgroundColor = '';
        }, 650);
    },

    getTypeRGB(type) {
        const t = String(type || '').toLowerCase();
        const map = {
            water: { r: 59, g: 130, b: 246 },
            grass: { r: 34, g: 197, b: 94 },
            fire: { r: 239, g: 68, b: 68 },
            electric: { r: 250, g: 204, b: 21 },
            ice: { r: 125, g: 211, b: 252 },
            poison: { r: 168, g: 85, b: 247 },
            psychic: { r: 244, g: 114, b: 182 },
            normal: { r: 229, g: 231, b: 235 },
            ground: { r: 180, g: 83, b: 9 },
            rock: { r: 161, g: 98, b: 7 },
            fighting: { r: 220, g: 38, b: 38 },
            flying: { r: 96, g: 165, b: 250 },
            bug: { r: 132, g: 204, b: 22 },
            ghost: { r: 139, g: 92, b: 246 },
            steel: { r: 148, g: 163, b: 184 },
            dragon: { r: 99, g: 102, b: 241 },
            dark: { r: 55, g: 65, b: 81 },
            fairy: { r: 244, g: 114, b: 182 }
        };
        return map[t] || { r: 156, g: 163, b: 175 };
    },

    getTypeColor(type) {
        const rgb = this.getTypeRGB(type);
        const toHex = (n) => n.toString(16).padStart(2, '0');
        return `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`;
    },

    triggerCameraImpact() {
        const stage = this.getBattleStage();
        if (!stage) return;
        stage.classList.add('camera-zoom');
        setTimeout(() => stage.classList.remove('camera-zoom'), 160);
    },

    triggerScreenShake() {
        const stage = this.getBattleStage();
        if (!stage) return;
        stage.classList.add('screen-shake');
        setTimeout(() => stage.classList.remove('screen-shake'), 240);
    },

    spawnHitParticles(victimKey, moveType, isCrit) {
        const victimBox = document.getElementById(`${victimKey}-sprite-box`);
        if (!victimBox) return;
        const rect = victimBox.getBoundingClientRect();
        const cx = rect.left + rect.width * 0.5;
        const cy = rect.top + rect.height * 0.4;

        const count = isCrit ? 18 : 12;
        for (let i = 0; i < count; i++) {
            const p = document.createElement('div');
            p.className = `hit-particle p-${moveType}`;
            p.style.left = `${cx}px`;
            p.style.top = `${cy}px`;
            const ang = Math.random() * Math.PI * 2;
            const dist = 20 + Math.random() * 40;
            p.style.setProperty('--dx', `${Math.cos(ang) * dist}px`);
            p.style.setProperty('--dy', `${Math.sin(ang) * dist}px`);
            document.body.appendChild(p);
            setTimeout(() => p.remove(), 520);
        }
    },

    async spawnProjectile(attackerKey, defenderKey, moveType) {
        const moveName = String(arguments[3] || '');
        const atkBox = document.getElementById(`${attackerKey}-sprite-box`);
        const defBox = document.getElementById(`${defenderKey}-sprite-box`);
        if (!atkBox || !defBox) return;

        const a = atkBox.getBoundingClientRect();
        const d = defBox.getBoundingClientRect();

        const startX = a.left + a.width * 0.7;
        const startY = a.top + a.height * 0.35;
        const endX = d.left + d.width * 0.3;
        const endY = d.top + d.height * 0.4;

        const proj = document.createElement('div');
        proj.className = `projectile proj-${moveType}`;
        proj.style.left = `${startX}px`;
        proj.style.top = `${startY}px`;
        const icon = this.getMoveIconDataUri(moveType, moveName);
        if (icon) {
            proj.style.backgroundImage = `url("${icon}")`;
            proj.style.backgroundSize = 'contain';
            proj.style.backgroundRepeat = 'no-repeat';
            proj.style.backgroundPosition = 'center';
            proj.style.backgroundColor = 'transparent';
            proj.style.boxShadow = 'none';
            proj.style.width = '26px';
            proj.style.height = '26px';
        }
        document.body.appendChild(proj);

        // Force layout then animate
        proj.getBoundingClientRect();
        proj.style.transform = `translate(${endX - startX}px, ${endY - startY}px)`;

        await new Promise(r => setTimeout(r, 520));
        proj.remove();
    },

    getMoveIconDataUri(moveType, moveName) {
        const t = String(moveType || '').toLowerCase();
        const n = String(moveName || '').toLowerCase();

        const svg = (body) => `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`<?xml version="1.0" encoding="UTF-8"?><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">${body}</svg>`)} `;

        if (n.includes('bubble')) {
            return svg(`<circle cx="22" cy="28" r="10" fill="rgba(59,130,246,0.65)" stroke="rgba(255,255,255,0.85)" stroke-width="3"/><circle cx="44" cy="22" r="8" fill="rgba(59,130,246,0.45)" stroke="rgba(255,255,255,0.75)" stroke-width="3"/><circle cx="38" cy="44" r="6" fill="rgba(59,130,246,0.35)" stroke="rgba(255,255,255,0.65)" stroke-width="3"/>`);
        }
        if (n.includes('razor leaf') || n.includes('leaf') || t === 'grass') {
            return svg(`<path d="M10 38c12-24 34-28 44-20-6 18-18 34-40 38-4-6-6-12-4-18z" fill="rgba(34,197,94,0.9)"/><path d="M18 48c10-10 20-18 32-26" stroke="rgba(255,255,255,0.8)" stroke-width="3" fill="none" stroke-linecap="round"/>`);
        }
        if (t === 'fire' || n.includes('ember') || n.includes('flame') || n.includes('fire')) {
            return svg(`<path d="M34 6c2 10-6 12-4 20 2 8 12 8 12 18 0 10-8 18-18 18S6 54 6 44c0-16 16-18 14-34 8 6 10 10 14-4z" fill="rgba(239,68,68,0.95)"/><path d="M24 30c2 6-4 8-2 14 2 6 10 6 10 12" stroke="rgba(255,255,255,0.75)" stroke-width="3" fill="none" stroke-linecap="round"/>`);
        }
        if (t === 'electric' || n.includes('thunder') || n.includes('shock')) {
            return svg(`<path d="M30 4 8 36h18l-6 24 36-42H36l8-14z" fill="rgba(250,204,21,0.95)" stroke="rgba(0,0,0,0.25)" stroke-width="2"/>`);
        }
        if (t === 'water') {
            return svg(`<path d="M32 6c10 14 18 22 18 34 0 10-8 18-18 18S14 50 14 40c0-12 8-20 18-34z" fill="rgba(59,130,246,0.9)"/><path d="M22 40c6 4 14 4 20 0" stroke="rgba(255,255,255,0.75)" stroke-width="3" fill="none" stroke-linecap="round"/>`);
        }
        return '';
    },

    // --- ANIMATIONS ---
    async spawnPokemon(playerKey, mon, isEvolution = false) {
        this.updateUnit(playerKey, mon);
        const spriteBox = document.getElementById(`${playerKey}-sprite-box`);
        if (!spriteBox) return;
        
        // Reset styles
        spriteBox.classList.remove('anim-faint', 'ko-flash', 'ko-grey', 'anim-charge', 'anim-windup', 'ko-dissolve');
        spriteBox.classList.remove('anim-enter-left', 'anim-enter-right', 'anim-enter-left-back', 'anim-enter-right-back', 'anim-warp');
        
        if (isEvolution) {
            // Evolution: warp effect (scale + opacity pulse)
            spriteBox.classList.add('anim-warp');
        } else {
            // Normal spawn: swing in from side
            spriteBox.classList.add(playerKey === 'p1' ? 'anim-enter-left-back' : 'anim-enter-right-back');
        }
        
        // Play Pokemon cry on spawn
        if(window.AudioEngine) {
            AudioEngine.playCry(mon.name, false);
        }

        return new Promise(resolve => setTimeout(() => {
            spriteBox.classList.remove('anim-enter-left', 'anim-enter-right', 'anim-enter-left-back', 'anim-enter-right-back', 'anim-warp');
            spriteBox.classList.add('anim-idle');
            resolve();
        }, isEvolution ? 1000 : 700));
    },

    async performSwitch(playerKey, newMon) {
        // 1. Recall Animation (Optional: just fade out or simple hide)
        // For now, we just swap the data and run the spawn anim
        await this.spawnPokemon(playerKey, newMon);
    },

    // 3-Step Attack: Wind-up -> Lunge -> Impact
    async playAttackAnim(attackerKey, moveType) {
        const category = arguments[2] || 'physical';
        const defenderKey = arguments[3] || (attackerKey === 'p1' ? 'p2' : 'p1');
        const power = Number(arguments[4] || 0);
        const moveName = String(arguments[5] || '');

        const isP1 = attackerKey === 'p1';
        const spriteBox = document.getElementById(`${attackerKey}-sprite-box`);
        const shadowBox = spriteBox;

        this.setActionFocus(attackerKey);
        this.triggerTypeAtmosphere(moveType);
        this.updateArenaAmbiance(moveType);

        // Play attack sound with charge callback
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
                // Phase A: Wind-up
                spriteBox.classList.remove('anim-idle');
                spriteBox.classList.add('anim-windup');
                await new Promise(r => setTimeout(r, 120));
                
                // Phase B: Lunge
                spriteBox.classList.remove('anim-windup');
                spriteBox.classList.add(isP1 ? 'anim-attack-right' : 'anim-attack-left');

                // Airborne shadow shrink
                if (shadowBox) shadowBox.classList.add('is-airborne');
            }

            return new Promise(resolve => setTimeout(() => {
                if (spriteBox) {
                    spriteBox.classList.remove(isP1 ? 'anim-attack-right' : 'anim-attack-left');
                    spriteBox.classList.add('anim-idle');
                }
                if (shadowBox) shadowBox.classList.remove('is-airborne');
                this.clearActionFocus();
                resolve();
            }, 350));
        }

        // Special attack: projectile
        if (spriteBox) {
            spriteBox.classList.remove('anim-idle');
            spriteBox.classList.add('anim-cast');
        }
        await this.spawnProjectile(attackerKey, defenderKey, moveType, moveName);
        if (spriteBox) {
            spriteBox.classList.remove('anim-cast');
            spriteBox.classList.add('anim-idle');
        }
        this.clearActionFocus();
    },

    updateArenaAmbiance(moveType) {
        const stage = this.getBattleStage();
        if (!stage) return;
        stage.className = stage.className.replace(/ambiance-\w+/g, '').trim();
        if (moveType) {
            stage.classList.add(`ambiance-${moveType}`);
            setTimeout(() => stage.classList.remove(`ambiance-${moveType}`), 1500);
        }
    },

    async playHitAnim(victimKey, damage, isCrit, isSuperEffective) {
        const moveType = arguments[4] || 'normal';
        const effRaw = arguments[3];
        const effectiveness = typeof effRaw === 'number' ? effRaw : (effRaw ? 2 : 1);
        const spriteBox = document.getElementById(`${victimKey}-sprite-box`);
        const isP1Victim = victimKey === 'p1';
        const category = String(arguments[5] || 'physical');
        
        // Directional damage - jolt away from attacker
        const hitClass = (damage <= 10 && !isCrit && effectiveness <= 1) ? 'anim-hit-weak' : (isCrit ? 'anim-hit-heavy' : (effectiveness > 1 ? 'anim-hit-super' : 'anim-hit'));
        const dirClass = isP1Victim ? 'hit-from-right' : 'hit-from-left';
        
        if (spriteBox) {
            spriteBox.classList.add(hitClass, dirClass, 'impact-flash');
        }
        if(window.AudioEngine) AudioEngine.playSFX('hit');

        // Damage popup with effectiveness styling
        if (spriteBox) this.showDamagePopup(spriteBox, damage, isCrit, effectiveness);

        if (spriteBox && effectiveness !== 1) {
            this.showEffectivenessPopup(spriteBox, effectiveness);
        }

        // Impact effects based on severity
        if (isCrit || effectiveness >= 2) {
            this.triggerCameraImpact();
            this.triggerScreenShake();
        } else {
            this.triggerCameraImpact();
        }
        this.spawnHitParticles(victimKey, moveType, isCrit || effectiveness > 1);
        this.spawnAdvancedParticles(victimKey, moveType, isCrit || effectiveness > 1, category);

        setTimeout(() => {
            if (spriteBox) spriteBox.classList.remove('impact-flash', hitClass, dirClass, 'anim-hit', 'anim-hit-weak', 'anim-hit-heavy', 'anim-hit-super', 'hit-from-left', 'hit-from-right');
        }, 500);
        
        return new Promise(resolve => setTimeout(resolve, 500));
    },

    playFaintAnim(victimKey, isLastKO = false) {
        const spriteBox = document.getElementById(`${victimKey}-sprite-box`);
        if (!spriteBox) return;
        
        // Get Pokemon name for cry
        let monName = '';
        if (window.GameCore && window.GameCore.state) {
            const playerObj = window.GameCore.state[victimKey];
            if (playerObj && playerObj.team && playerObj.team[playerObj.activeIdx]) {
                monName = playerObj.team[playerObj.activeIdx].name;
            }
        }
        
        // IMPORTANT: Stop any low-HP panic/vibrate immediately on KO
        spriteBox.classList.remove('anim-panic', 'anim-idle', 'anim-hit', 'anim-hit-weak', 'anim-cast', 'anim-attack-right', 'anim-attack-left', 'anim-enter-left', 'anim-enter-right', 'anim-enter-left-back', 'anim-enter-right-back', 'ko-grey', 'anim-charge', 'anim-windup');
        
        // Slow motion for final KO
        if (isLastKO) {
            spriteBox.classList.add('slow-motion');
            document.body.classList.add('slow-motion-global');
            setTimeout(() => document.body.classList.remove('slow-motion-global'), 500);
        }
        
        spriteBox.classList.add('ko-flash');
        
        // Play faint cry (slowed down)
        if (window.AudioEngine && monName) {
            AudioEngine.playCry(monName, true);
        }
        
        setTimeout(() => {
            spriteBox.classList.remove('ko-flash', 'slow-motion');
            spriteBox.classList.add('ko-grey');
        }, 700);
    },

    spawnAdvancedParticles(victimKey, moveType, strong, category) {
        const victimBox = document.getElementById(`${victimKey}-sprite-box`);
        if (!victimBox) return;

        const rect = victimBox.getBoundingClientRect();
        const cx = rect.left + rect.width * 0.5;
        const cy = rect.top + rect.height * 0.45;

        const t = String(moveType || 'normal').toLowerCase();
        const count = strong ? 14 : 8;

        // Electric: jagged line flashes
        if (t === 'electric') {
            for (let i = 0; i < count; i++) {
                const p = document.createElement('div');
                p.className = 'hit-particle p-electric';
                p.style.width = '3px';
                p.style.height = `${10 + Math.random() * 18}px`;
                p.style.borderRadius = '2px';
                p.style.left = `${cx + (Math.random() * 80 - 40)}px`;
                p.style.top = `${cy + (Math.random() * 40 - 20)}px`;
                p.style.transform = `rotate(${Math.random() * 180}deg)`;
                document.body.appendChild(p);
                setTimeout(() => p.remove(), 240);
            }
            return;
        }

        // Fire: float up
        if (t === 'fire') {
            for (let i = 0; i < count; i++) {
                const p = document.createElement('div');
                p.className = 'hit-particle p-fire';
                p.style.left = `${cx + (Math.random() * 70 - 35)}px`;
                p.style.top = `${cy + (Math.random() * 20 - 10)}px`;
                p.style.setProperty('--dx', `${(Math.random() * 30 - 15)}px`);
                p.style.setProperty('--dy', `${(-30 - Math.random() * 50)}px`);
                document.body.appendChild(p);
                setTimeout(() => p.remove(), 520);
            }
            return;
        }

        // Water: droplets down
        if (t === 'water') {
            for (let i = 0; i < count; i++) {
                const p = document.createElement('div');
                p.className = 'hit-particle p-water';
                p.style.left = `${cx + (Math.random() * 70 - 35)}px`;
                p.style.top = `${cy + (Math.random() * 20 - 10)}px`;
                p.style.setProperty('--dx', `${(Math.random() * 30 - 15)}px`);
                p.style.setProperty('--dy', `${(20 + Math.random() * 60)}px`);
                document.body.appendChild(p);
                setTimeout(() => p.remove(), 520);
            }
        }
    },

    showDamagePopup(targetEl, amount, isCrit, effectiveness = 1) {
        const div = document.createElement('div');
        let extraClass = '';
        let icon = '';
        
        if (isCrit) {
            icon = '🎯 ';
            extraClass = 'crit-text';
        } else if (effectiveness >= 2) {
            icon = '💥 ';
            extraClass = 'super-effective-text';
        } else if (effectiveness > 1) {
            extraClass = 'effective-text';
        } else if (effectiveness < 1 && effectiveness > 0) {
            extraClass = 'not-effective-text';
        }
        
        div.innerHTML = `${icon}<span>${amount}</span>`;
        div.className = `dmg-popup ${extraClass}`;
        
        // Random slight offset for visual variety
        const randomX = (Math.random() * 40) - 20;
        div.style.transform = `translateX(${randomX}px)`;
        
        targetEl.parentElement.appendChild(div);
        setTimeout(() => div.remove(), 900);
    },

    // --- CONTROLS & UI ---
    updateControls(p1Mon, p2Mon, turn) {

        const p1Panel = document.getElementById('p1-actions');
        const p2Panel = document.getElementById('p2-actions');

        // Helper to generate buttons
        const self = this;
        const createButtons = (mon, playerKey) => {
            if(mon.fainted) return `<div class="text-center text-red-500 font-bold p-2">FAINTED</div>`;
            
            // Guard against missing moves
            if (!mon.moves || !Array.isArray(mon.moves) || mon.moves.length === 0) {
                return `<div class="text-center text-yellow-500 font-bold p-2">NO MOVES</div>`;
            }
            
            return mon.moves.map((m, i) => `
                <button class="move-btn" style="--move-color:${self.getTypeColor(m.type)};--move-bg:rgba(${self.getTypeRGB(m.type).r},${self.getTypeRGB(m.type).g},${self.getTypeRGB(m.type).b},0.16);--move-bg-hover:rgba(${self.getTypeRGB(m.type).r},${self.getTypeRGB(m.type).g},${self.getTypeRGB(m.type).b},0.26)" onclick="window.GameCore.handleMove('${playerKey}', ${i})">
                    <span class="move-name">${m.name}</span>
                    <span class="type-badge" style="background-color: ${self.getTypeColor(m.type)}">${m.type}</span>
                </button>
            `).join('');
        };

        if(p1Panel) p1Panel.innerHTML = createButtons(p1Mon, 'p1');
        if(p2Panel) p2Panel.innerHTML = createButtons(p2Mon, 'p2');

        this.setTurnWaitOverlays(turn);
        this.updateArenaEnvironment(p1Mon, p2Mon);

        // Opacity / Disable logic based on turn
        const p1Container = document.getElementById('p1-controls-box');
        const p2Container = document.getElementById('p2-controls-box');
        
        if(p1Container && p2Container) {
            if(turn === 'p1') {
                p1Container.style.opacity = '1';
                p1Container.style.pointerEvents = 'auto';
                p2Container.style.opacity = '0.5';
                p2Container.style.pointerEvents = 'none';
            } else {
                p1Container.style.opacity = '0.5';
                p1Container.style.pointerEvents = 'none';
                p2Container.style.opacity = '1';
                p2Container.style.pointerEvents = 'auto';
            }
        }

        // Update evolve button states
        this.updateEvolveButtonState('p1', p1Mon);
        this.updateEvolveButtonState('p2', p2Mon);
    },

    updateTurnUI(turn) {
        const badge = document.getElementById('turn-badge');
        if(badge) {
            badge.innerText = turn === 'p1' ? "PLAYER 1 TURN" : "PLAYER 2 TURN";
            badge.style.backgroundColor = turn === 'p1' ? 'var(--accent-p1)' : 'var(--accent-p2)';
        }

        this.setTurnWaitOverlays(turn);
        this.startTurnTimer(turn);
    },

    toggleInputBlocker(show, text="WAITING...") {
        const blocker = document.getElementById('input-blocker');
        if(!blocker) return;
        const txt = blocker.querySelector('.wait-text');
        
        if(show) {
            blocker.classList.remove('hidden');
            if(txt) txt.innerText = text;
        } else {
            blocker.classList.add('hidden');
        }
    },

    log(msg, colorClass="text-gray-300") {

        const logBox = document.getElementById('battle-log');
        if(!logBox) return;
        
        const div = document.createElement('div');
        div.className = `log-entry ${colorClass}`;
        div.innerText = `> ${msg}`;
        logBox.prepend(div);
    },

    showGameOver(winnerKey) {

        const overlay = document.getElementById('game-over-overlay');
        const text = overlay.querySelector('h1');
        
        overlay.classList.remove('hidden');
        text.innerText = winnerKey === 'p1' ? "PLAYER 1 WINS!" : "PLAYER 2 WINS!";
        text.style.color = winnerKey === 'p1' ? 'var(--accent-p1)' : 'var(--accent-p2)';
    },

    updateEvolveButtonState(playerKey, mon) {
        const btn = document.getElementById(`${playerKey}-evolve-btn`);
        if (!btn) return;

        // Check if evolution is available
        let canEvolve = false;
        if (window.GameCore && window.GameCore.state) {
            const playerObj = window.GameCore.state[playerKey];
            // Not used yet, mon not fainted, has valid evolution
            if (!playerObj.evolutionUsed && mon && !mon.fainted) {
                const evoNum = mon.evolution1Num;
                canEvolve = evoNum && evoNum <= 251;
            }
        }

        if (canEvolve) {
            btn.disabled = false;
            btn.classList.remove('btn-disabled');
            btn.style.opacity = '1';
            btn.style.pointerEvents = 'auto';
        } else {
            btn.disabled = true;
            btn.classList.add('btn-disabled');
            btn.style.opacity = '0.4';
            btn.style.pointerEvents = 'none';
        }
    },

    showEffectivenessPopup(targetEl, effectiveness) {
        const div = document.createElement('div');
        div.className = 'effectiveness-popup';
        
        if (effectiveness >= 2) {
            div.innerText = 'SUPER EFFECTIVE!';
            div.style.color = '#facc15';
        } else if (effectiveness > 1) {
            div.innerText = 'Effective!';
            div.style.color = '#a3e635';
        } else if (effectiveness < 1 && effectiveness > 0) {
            div.innerText = 'Not very effective...';
            div.style.color = '#9ca3af';
        } else if (effectiveness === 0) {
            div.innerText = 'No effect!';
            div.style.color = '#6b7280';
        }
        
        targetEl.parentElement.appendChild(div);
        setTimeout(() => div.remove(), 1200);
    }
};

// Expose to global window
window.RenderEngine = RenderEngine;