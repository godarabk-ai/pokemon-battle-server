/* === RENDER_BATTLEFIELD.JS ===
   Main battlefield updates: sprites, stats cards, HP bars
*/

const RenderBattlefield = {
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
            const isKO = mon.fainted || spriteBox.classList.contains('ko-grey');
            if (!isKO && pct < 20) spriteBox.classList.add('anim-panic');
        }

        // Stats Card Fade In
        const card = document.querySelector(`.stats-${playerKey}`);
        if(card) card.style.opacity = '1';

        // Update Bench Status
        if (window.RenderBench) window.RenderBench.updateBenchStatus(playerKey, mon);
    }
};

window.RenderBattlefield = RenderBattlefield;
