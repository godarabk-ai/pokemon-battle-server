/* GAME LOGIC
   - Type Effectiveness Chart
   - Damage Calculation Formulas
   - Turn Sequence Orchestration (The "flow" of a turn)
*/

const GameLogic = {
    // --- TYPE CHART ---
    // 0.5 = Not very effective, 2.0 = Super effective, 0 = No effect
    typeChart: {
        normal:   { rock: 0.5, ghost: 0, steel: 0.5 },
        fire:     { fire: 0.5, water: 0.5, grass: 2, ice: 2, bug: 2, rock: 0.5, dragon: 0.5, steel: 2 },
        water:    { fire: 2, water: 0.5, grass: 0.5, ground: 2, rock: 2, dragon: 0.5 },
        electric: { water: 2, electric: 0.5, grass: 0.5, ground: 0, flying: 2, dragon: 0.5 },
        grass:    { fire: 0.5, water: 2, grass: 0.5, poison: 0.5, ground: 2, flying: 0.5, bug: 0.5, rock: 2, dragon: 0.5, steel: 0.5 },
        ice:      { fire: 0.5, water: 0.5, grass: 2, ice: 0.5, ground: 2, flying: 2, dragon: 2, steel: 0.5 },
        fighting: { normal: 2, ice: 2, rock: 2, dark: 2, steel: 2, poison: 0.5, flying: 0.5, psychic: 0.5, bug: 0.5, ghost: 0, fairy: 0.5 },
        poison:   { grass: 2, poison: 0.5, ground: 0.5, rock: 0.5, ghost: 0.5, steel: 0, fairy: 2 },
        ground:   { fire: 2, electric: 2, grass: 0.5, poison: 2, flying: 0, bug: 0.5, rock: 2, steel: 2 },
        flying:   { electric: 0.5, grass: 2, fighting: 2, bug: 2, rock: 0.5, steel: 0.5 },
        psychic:  { fighting: 2, poison: 2, psychic: 0.5, dark: 0, steel: 0.5 },
        bug:      { fire: 0.5, grass: 2, fighting: 0.5, poison: 0.5, flying: 0.5, psychic: 2, ghost: 0.5, dark: 2, steel: 0.5, fairy: 0.5 },
        rock:     { fire: 2, ice: 2, fighting: 0.5, ground: 0.5, flying: 2, bug: 2, steel: 0.5 },
        ghost:    { normal: 0, psychic: 2, ghost: 2, dark: 0.5 },
        dragon:   { dragon: 2, steel: 0.5, fairy: 0 },
        steel:    { fire: 0.5, water: 0.5, electric: 0.5, ice: 2, rock: 2, steel: 0.5, fairy: 2 },
        fairy:    { fire: 0.5, fighting: 2, poison: 0.5, dragon: 2, dark: 2, steel: 0.5 }
    },

    // --- MAIN TURN SEQUENCE ---
    async executeTurn(attackerKey, attacker, defender, move) {
        console.log('[executeTurn] START', attackerKey, attacker?.name, 'vs', defender?.name, 'move:', move?.name);
        
        const isP1 = attackerKey === 'p1';
        const defenderKey = isP1 ? 'p2' : 'p1';
        // Use category from move data if available, otherwise infer from type
        const category = move.category || this.getMoveCategory(move.type);

        // 1. Log Start
        RenderEngine.log(`${attacker.name} used ${move.name}!`);

        // 2. Play Attack Animation
        console.log('[executeTurn] Playing attack animation');
        await RenderEngine.playAttackAnim(attackerKey, move.type, category, defenderKey, move.power, move.name);
        console.log('[executeTurn] Attack animation done');

        // 3. Calculate Damage
        const result = this.calculateDamage(attacker, defender, move);
        console.log('[executeTurn] Damage calculated:', result);
        
        // 4. Apply Damage Data
        const curHp = Number(defender.currentHp);
        const safeCurHp = Number.isFinite(curHp) ? curHp : Number(defender.maxHp || 0);
        const dmg = Number(result.damage);
        const safeDmg = Number.isFinite(dmg) ? dmg : 0;
        const newHp = Math.max(0, safeCurHp - safeDmg);
        console.log('[executeTurn] HP update:', safeCurHp, '-', safeDmg, '=', newHp);
        defender.currentHp = newHp;

        // 5. Visual Feedback (Hit, Flash, Popup)
        await RenderEngine.playHitAnim(defenderKey, result.damage, result.isCrit, result.effectiveness, move.type, category);
        
        // 6. Update Health Bars
        RenderEngine.updateUnit(defenderKey, defender);

        // 7. Log Result
        if (result.effectiveness > 1) RenderEngine.log("It's super effective!", "text-yellow-400");
        if (result.effectiveness < 1 && result.effectiveness > 0) RenderEngine.log("It's not very effective...", "text-gray-500");
        if (result.effectiveness === 0) RenderEngine.log("It had no effect!", "text-gray-500");
        if (result.isCrit) RenderEngine.log("A critical hit!", "text-red-400 font-bold");

        // 8. Check Faint
        if (defender.currentHp <= 0) {
            defender.fainted = true;
            RenderEngine.log(`${defender.name} fainted!`, "text-red-500 font-bold");
            RenderEngine.playFaintAnim(defenderKey);
            // Wait a moment for the faint animation to register
            await new Promise(r => setTimeout(r, 1100));
        } else {
            // Short pause between turns
            await new Promise(r => setTimeout(r, 500));
        }
    },

    // --- MATH ---
    calculateDamage(attacker, defender, move) {
        // 1. Type Effectiveness
        let effectiveness = 1;
        
        // Check Move Type vs Defender Type 1
        effectiveness *= this.getTypeMod(move.type, defender.type1);
        
        // Check Move Type vs Defender Type 2 (if exists)
        if (defender.type2 && defender.type2 !== defender.type1) {
            effectiveness *= this.getTypeMod(move.type, defender.type2);
        }

        // 2. STAB (Same Type Attack Bonus)
        const stab = (move.type === attacker.type1 || move.type === attacker.type2) ? 1.5 : 1;

        // 3. Critical Hit (1 in 16 chance ~ 6.25%)
        const isCrit = Math.random() < 0.0625;
        const critMod = isCrit ? 1.5 : 1;

        // 4. Random Variance (0.85 to 1.0)
        const random = (Math.floor(Math.random() * 16) + 85) / 100;

        // 5. Base Damage Formula (Simplified Gen 1-ish)
        // Damage = ((((2 * Level / 5 + 2) * Attack * Power / Defense) / 50) + 2) * Modifier
        // We assume Level 50 for everyone to keep it balanced
        const level = 50;
        let attackStat = Number(attacker.atk);
        let defenseStat = Number(defender.def);
        const power = Number(move.power);

        if (!Number.isFinite(attackStat) || attackStat <= 0) attackStat = 1;
        if (!Number.isFinite(defenseStat) || defenseStat <= 0) defenseStat = 1;
        const safePower = Number.isFinite(power) && power > 0 ? power : 0;

        let damage = Math.floor((((2 * level / 5 + 2) * attackStat * safePower / defenseStat) / 50) + 2);

        // Apply Modifiers
        damage = Math.floor(damage * stab * effectiveness * critMod * random);

        if (!Number.isFinite(damage)) damage = 0;

        // Prevent 0 damage unless immunity
        if (damage < 1 && effectiveness > 0) damage = 1;
        if (effectiveness === 0) damage = 0;

        return {
            damage: damage,
            isCrit: isCrit,
            effectiveness: effectiveness
        };
    },

    getTypeMod(atkType, defType) {
        if (!this.typeChart[atkType]) return 1; // Unknown type
        const mod = this.typeChart[atkType][defType];
        return mod !== undefined ? mod : 1; // Default to 1 if not listed
    },

    getMoveCategory(type) {
        const physical = {
            normal: true,
            fighting: true,
            flying: true,
            poison: true,
            ground: true,
            rock: true,
            bug: true,
            ghost: true,
            steel: true
        };

        return physical[type] ? 'physical' : 'special';
    }
};

// Expose to global window
window.GameLogic = GameLogic;