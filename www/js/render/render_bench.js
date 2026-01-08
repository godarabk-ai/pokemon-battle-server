/* RENDER BENCH - Bench rendering and status updates */

const RenderBench = {
    lastActiveIdx: { p1: 0, p2: 0 },

    initBench(p1Team, p2Team) {
        this.renderBenchSide('p1', p1Team);
        const isOnline = window.OnlineGame && window.OnlineGame.isOnline;
        this.renderBenchSide('p2', p2Team, isOnline);

        if (window.GameCore && window.GameCore.state) {
            this.lastActiveIdx.p1 = window.GameCore.state.p1?.activeIdx ?? 0;
            this.lastActiveIdx.p2 = window.GameCore.state.p2?.activeIdx ?? 0;
        }
    },

    renderBenchSide(playerKey, team, hideDetails = false) {
        const container = document.querySelector(`.${playerKey}-bench .bench-grid`);
        if (!container) return;

        container.innerHTML = '';

        const activeIdx = (window.GameCore && window.GameCore.state && window.GameCore.state[playerKey])
            ? (window.GameCore.state[playerKey].activeIdx ?? 0)
            : 0;
        
        const evolutionUsed = (window.GameCore && window.GameCore.state && window.GameCore.state[playerKey])
            ? (window.GameCore.state[playerKey].evolutionUsed ?? false)
            : false;

        team.forEach((mon, index) => {
            const slot = document.createElement('div');
            slot.className = `bench-slot ${index === activeIdx ? 'active-slot' : ''}`;
            slot.dataset.index = index;
            slot.onclick = () => window.GameCore.switchPokemon(playerKey, index);

            const isOpponentHidden = hideDetails && playerKey === 'p2';
            const shouldReveal = isOpponentHidden && index === activeIdx;

            if (isOpponentHidden && !shouldReveal) {
                const isFainted = mon.currentHp <= 0;
                slot.innerHTML = `
                    <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.5); border-radius: 0.5rem;">
                        <div style="font-size: 2rem; color: ${isFainted ? '#ef4444' : '#9ca3af'};">●</div>
                    </div>
                `;
            } else {
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
                
                // Add evolvable indicator if Pokemon can evolve and evolution not used
                if (!evolutionUsed && !mon.fainted && mon.evolution1Num && mon.evolution1Num <= 251) {
                    slot.classList.add('can-evolve');
                }
            }

            container.appendChild(slot);
        });
    },

    updateBenchStatus(playerKey, activeMon) {
        if (window.OnlineGame && window.OnlineGame.isOnline && playerKey === 'p2') {
            const nextActive = window.GameCore?.state?.p2?.activeIdx ?? 0;
            if (nextActive !== this.lastActiveIdx.p2) {
                this.lastActiveIdx.p2 = nextActive;
                this.renderBenchSide('p2', window.GameCore.state.p2.team, true);
            }
        }

        const slots = document.querySelectorAll(`.${playerKey}-bench .bench-slot`);
        slots.forEach((slot, idx) => {
            if (!window.GameCore || !window.GameCore.state || !window.GameCore.state[playerKey]) return;

            if (window.GameCore.state[playerKey].activeIdx === idx) {
                slot.classList.add('active-slot');
            } else {
                slot.classList.remove('active-slot');
            }

            if (idx === window.GameCore.state[playerKey].activeIdx) {
                const fill = slot.querySelector('.hp-mini-fill');
                const pct = (activeMon.currentHp / activeMon.maxHp) * 100;
                if (fill) {
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
