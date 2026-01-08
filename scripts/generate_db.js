const fs = require('fs');
const path = require('path');

const csvPath = path.join(__dirname, '..', 'assets', 'pokedex.csv');
const outputPath = path.join(__dirname, '..', 'assets', 'pokemon_db.js');

const csvContent = fs.readFileSync(csvPath, 'utf-8');
const lines = csvContent.trim().split('\n');

const pokemon = [];

for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;
    
    // Parse CSV properly handling commas
    const cols = line.split(',');
    
    const id = parseInt(cols[0]) || 0;
    if (id === 0) continue;
    
    const name = cols[1] || '';
    const type1 = (cols[2] || '').toLowerCase();
    const type2 = (cols[3] || '').toLowerCase();
    const hp = parseInt(cols[5]) || 0;
    const atk = parseInt(cols[6]) || 0;
    const def = parseInt(cols[7]) || 0;
    const spAtk = parseInt(cols[8]) || 0;
    const spDef = parseInt(cols[9]) || 0;
    const speed = parseInt(cols[10]) || 0;
    const height = parseFloat(cols[11]) || 0;
    const weight = parseFloat(cols[12]) || 0;
    
    // Moves
    const move1Name = cols[13] || 'Tackle';
    const move1Acc = parseInt(cols[14]) || 100;
    const move1Pow = parseInt(cols[15]) || 40;
    const move1Type = (cols[16] || 'normal').toLowerCase();
    const move1Cat = (cols[17] || 'physical').toLowerCase();
    
    const move2Name = cols[18] || 'Tackle';
    const move2Acc = parseInt(cols[19]) || 100;
    const move2Pow = parseInt(cols[20]) || 40;
    const move2Type = (cols[21] || 'normal').toLowerCase();
    const move2Cat = (cols[22] || 'physical').toLowerCase();
    
    const move3Name = cols[23] || 'Tackle';
    const move3Acc = parseInt(cols[24]) || 100;
    const move3Pow = parseInt(cols[25]) || 40;
    const move3Type = (cols[26] || 'normal').toLowerCase();
    const move3Cat = (cols[27] || 'physical').toLowerCase();
    
    // Evolution
    const evoStage = parseInt(cols[28]) || 1;
    const evo1Name = cols[29] || '';
    const evo1Num = cols[30] ? parseInt(cols[30]) : null;
    const evo2Name = cols[31] || '';
    const evo2Num = cols[32] ? parseInt(cols[32]) : null;
    
    pokemon.push({
        id,
        name,
        type1,
        type2,
        hp,
        atk,
        def,
        spAtk,
        spDef,
        speed,
        height,
        weight,
        evolutionStage: evoStage,
        evolution1Name: evo1Name,
        evolution1Num: evo1Num,
        evolution2Name: evo2Name,
        evolution2Num: evo2Num,
        moves: [
            { name: move1Name, accuracy: move1Acc, power: move1Pow, type: move1Type, category: move1Cat },
            { name: move2Name, accuracy: move2Acc, power: move2Pow, type: move2Type, category: move2Cat },
            { name: move3Name, accuracy: move3Acc, power: move3Pow, type: move3Type, category: move3Cat }
        ]
    });
}

const output = `const POKEMON_DB = ${JSON.stringify(pokemon, null, 2)};`;
fs.writeFileSync(outputPath, output, 'utf-8');
console.log(`Generated ${pokemon.length} Pokemon entries to ${outputPath}`);
