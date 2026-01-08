/* === RENDER_FX.JS ===
   Visual effects: particles, projectiles, camera effects, type atmosphere
*/

const RenderFX = {
    getBattleStage() {
        return document.querySelector('.battle-stage');
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
        overlay.style.backgroundColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.20)`;

        overlay.classList.add(cls);
        setTimeout(() => {
            overlay.classList.remove(cls);
            overlay.style.backgroundColor = '';
        }, 650);
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

    updateArenaAmbiance(moveType) {
        const stage = this.getBattleStage();
        if (!stage) return;
        stage.className = stage.className.replace(/ambiance-\w+/g, '').trim();
        if (moveType) {
            stage.classList.add(`ambiance-${moveType}`);
            setTimeout(() => stage.classList.remove(`ambiance-${moveType}`), 1500);
        }
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

    spawnAdvancedParticles(victimKey, moveType, strong, category) {
        const victimBox = document.getElementById(`${victimKey}-sprite-box`);
        if (!victimBox) return;

        const rect = victimBox.getBoundingClientRect();
        const cx = rect.left + rect.width * 0.5;
        const cy = rect.top + rect.height * 0.45;

        const t = String(moveType || 'normal').toLowerCase();
        const count = strong ? 14 : 8;

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

    async spawnProjectile(attackerKey, defenderKey, moveType, moveName) {
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
        
        const randomX = (Math.random() * 40) - 20;
        div.style.transform = `translateX(${randomX}px)`;
        
        targetEl.parentElement.appendChild(div);
        setTimeout(() => div.remove(), 900);
    },

    showEffectivenessPopup(targetEl, effectiveness) {
        const div = document.createElement('div');
        let text = '';
        let cls = 'effect-popup ';
        
        if (effectiveness >= 2) {
            text = 'Super Effective!';
            cls += 'eff-good';
        } else if (effectiveness > 1) {
            text = 'Effective!';
            cls += 'eff-good';
        } else if (effectiveness < 1 && effectiveness > 0) {
            text = 'Not very effective...';
            cls += 'eff-bad';
        } else if (effectiveness === 0) {
            text = 'No effect!';
            cls += 'eff-zero';
        }
        
        if (!text) return;
        
        div.innerText = text;
        div.className = cls;
        targetEl.parentElement.appendChild(div);
        setTimeout(() => div.remove(), 900);
    }
};

window.RenderFX = RenderFX;
