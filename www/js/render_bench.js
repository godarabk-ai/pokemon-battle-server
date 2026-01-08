/* === RENDER_BENCH.JS ===
   Bench rendering and status updates
*/

const RenderBench = {
    initBench(p1Team, p2Team) {
        this.renderBenchSide('p1', p1Team);
        this.renderBenchSide('p2', p2Team);
    },

    renderBenchSide(playerKey, team) {
        const container = document.querySelector(`.${playerKey}-bench .bench-grid`);
        if(!container) return;

        container.innerHTML = '';

        team.forEach((mon, index) => {
            const slot = document.createElement('div');
            slot.className = `bench-slot ${index === 0 ? 'active-slot' : ''}`;
            slot.dataset.index = index;
            slot.onclick = () => window.GameCore.switchPokemon(playerKey, index);

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
            container.appendChild(slot);
        });
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
    }
};

window.RenderBench = RenderBench;
