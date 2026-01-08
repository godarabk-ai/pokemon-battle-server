const POKEMON_DB = [
  {
    "id": 1,
    "name": "Bulbasaur",
    "type1": "grass",
    "type2": "poison",
    "hp": 45,
    "atk": 49,
    "def": 49,
    "spAtk": 65,
    "spDef": 65,
    "speed": 45,
    "height": 7,
    "weight": 69,
    "evolutionStage": 1,
    "evolution1Name": "Ivysaur",
    "evolution1Num": 2,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Bullet Seed",
        "accuracy": 100,
        "power": 25,
        "type": "grass",
        "category": "physical"
      },
      {
        "name": "Mega Drain",
        "accuracy": 100,
        "power": 40,
        "type": "grass",
        "category": "special"
      },
      {
        "name": "Acid Spray",
        "accuracy": 100,
        "power": 40,
        "type": "poison",
        "category": "special"
      }
    ]
  },
  {
    "id": 2,
    "name": "Ivysaur",
    "type1": "grass",
    "type2": "poison",
    "hp": 60,
    "atk": 62,
    "def": 63,
    "spAtk": 80,
    "spDef": 80,
    "speed": 60,
    "height": 10,
    "weight": 130,
    "evolutionStage": 2,
    "evolution1Name": "Venusaur",
    "evolution1Num": 3,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Razor Leaf",
        "accuracy": 95,
        "power": 55,
        "type": "grass",
        "category": "physical"
      },
      {
        "name": "Magical Leaf",
        "accuracy": 100,
        "power": 60,
        "type": "grass",
        "category": "special"
      },
      {
        "name": "Venoshock",
        "accuracy": 100,
        "power": 65,
        "type": "poison",
        "category": "special"
      }
    ]
  },
  {
    "id": 3,
    "name": "Venusaur",
    "type1": "grass",
    "type2": "poison",
    "hp": 80,
    "atk": 82,
    "def": 83,
    "spAtk": 100,
    "spDef": 100,
    "speed": 80,
    "height": 20,
    "weight": 1000,
    "evolutionStage": 3,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Energy Ball",
        "accuracy": 100,
        "power": 90,
        "type": "grass",
        "category": "special"
      },
      {
        "name": "Petal Blizzard",
        "accuracy": 100,
        "power": 90,
        "type": "grass",
        "category": "physical"
      },
      {
        "name": "Sludge Bomb",
        "accuracy": 100,
        "power": 90,
        "type": "poison",
        "category": "special"
      }
    ]
  },
  {
    "id": 4,
    "name": "Charmander",
    "type1": "fire",
    "type2": "",
    "hp": 39,
    "atk": 52,
    "def": 43,
    "spAtk": 60,
    "spDef": 50,
    "speed": 65,
    "height": 6,
    "weight": 85,
    "evolutionStage": 1,
    "evolution1Name": "Charmeleon",
    "evolution1Num": 5,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Fire Spin",
        "accuracy": 85,
        "power": 35,
        "type": "fire",
        "category": "special"
      },
      {
        "name": "Ember",
        "accuracy": 100,
        "power": 40,
        "type": "fire",
        "category": "special"
      },
      {
        "name": "Flame Charge",
        "accuracy": 100,
        "power": 50,
        "type": "fire",
        "category": "physical"
      }
    ]
  },
  {
    "id": 5,
    "name": "Charmeleon",
    "type1": "fire",
    "type2": "",
    "hp": 58,
    "atk": 64,
    "def": 58,
    "spAtk": 80,
    "spDef": 65,
    "speed": 80,
    "height": 11,
    "weight": 190,
    "evolutionStage": 2,
    "evolution1Name": "Charizard",
    "evolution1Num": 6,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Incinerate",
        "accuracy": 100,
        "power": 60,
        "type": "fire",
        "category": "special"
      },
      {
        "name": "Fire Fang",
        "accuracy": 95,
        "power": 65,
        "type": "fire",
        "category": "physical"
      },
      {
        "name": "Flame Burst",
        "accuracy": 100,
        "power": 70,
        "type": "fire",
        "category": "special"
      }
    ]
  },
  {
    "id": 6,
    "name": "Charizard",
    "type1": "fire",
    "type2": "flying",
    "hp": 78,
    "atk": 84,
    "def": 78,
    "spAtk": 109,
    "spDef": 85,
    "speed": 100,
    "height": 17,
    "weight": 905,
    "evolutionStage": 3,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Flamethrower",
        "accuracy": 100,
        "power": 90,
        "type": "fire",
        "category": "special"
      },
      {
        "name": "Heat Wave",
        "accuracy": 90,
        "power": 95,
        "type": "fire",
        "category": "special"
      },
      {
        "name": "Fly",
        "accuracy": 95,
        "power": 90,
        "type": "flying",
        "category": "physical"
      }
    ]
  },
  {
    "id": 7,
    "name": "Squirtle",
    "type1": "water",
    "type2": "",
    "hp": 44,
    "atk": 48,
    "def": 65,
    "spAtk": 50,
    "spDef": 64,
    "speed": 43,
    "height": 5,
    "weight": 90,
    "evolutionStage": 1,
    "evolution1Name": "Wartortle",
    "evolution1Num": 8,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Whirlpool",
        "accuracy": 85,
        "power": 35,
        "type": "water",
        "category": "special"
      },
      {
        "name": "Bubble",
        "accuracy": 100,
        "power": 40,
        "type": "water",
        "category": "special"
      },
      {
        "name": "Water Gun",
        "accuracy": 100,
        "power": 40,
        "type": "water",
        "category": "special"
      }
    ]
  },
  {
    "id": 8,
    "name": "Wartortle",
    "type1": "water",
    "type2": "",
    "hp": 59,
    "atk": 63,
    "def": 80,
    "spAtk": 65,
    "spDef": 80,
    "speed": 58,
    "height": 10,
    "weight": 225,
    "evolutionStage": 2,
    "evolution1Name": "Blastoise",
    "evolution1Num": 9,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Water Pulse",
        "accuracy": 100,
        "power": 60,
        "type": "water",
        "category": "special"
      },
      {
        "name": "Flip Turn",
        "accuracy": 100,
        "power": 60,
        "type": "water",
        "category": "physical"
      },
      {
        "name": "Bubble Beam",
        "accuracy": 100,
        "power": 65,
        "type": "water",
        "category": "special"
      }
    ]
  },
  {
    "id": 9,
    "name": "Blastoise",
    "type1": "water",
    "type2": "",
    "hp": 79,
    "atk": 83,
    "def": 100,
    "spAtk": 85,
    "spDef": 105,
    "speed": 78,
    "height": 16,
    "weight": 855,
    "evolutionStage": 3,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Surf",
        "accuracy": 100,
        "power": 90,
        "type": "water",
        "category": "special"
      },
      {
        "name": "Aqua Tail",
        "accuracy": 90,
        "power": 90,
        "type": "water",
        "category": "physical"
      },
      {
        "name": "Muddy Water",
        "accuracy": 85,
        "power": 90,
        "type": "water",
        "category": "special"
      }
    ]
  },
  {
    "id": 10,
    "name": "Caterpie",
    "type1": "bug",
    "type2": "",
    "hp": 45,
    "atk": 30,
    "def": 35,
    "spAtk": 20,
    "spDef": 20,
    "speed": 45,
    "height": 3,
    "weight": 29,
    "evolutionStage": 1,
    "evolution1Name": "Metapod",
    "evolution1Num": 11,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Bug Buzz",
        "accuracy": 100,
        "power": 90,
        "type": "bug",
        "category": "special"
      },
      {
        "name": "Attack Order",
        "accuracy": 100,
        "power": 90,
        "type": "bug",
        "category": "physical"
      },
      {
        "name": "First Impression",
        "accuracy": 100,
        "power": 90,
        "type": "bug",
        "category": "physical"
      }
    ]
  },
  {
    "id": 11,
    "name": "Metapod",
    "type1": "bug",
    "type2": "",
    "hp": 50,
    "atk": 20,
    "def": 55,
    "spAtk": 25,
    "spDef": 25,
    "speed": 30,
    "height": 7,
    "weight": 99,
    "evolutionStage": 2,
    "evolution1Name": "Butterfree",
    "evolution1Num": 12,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Bug Bite",
        "accuracy": 100,
        "power": 60,
        "type": "bug",
        "category": "physical"
      },
      {
        "name": "Pollen Puff",
        "accuracy": 100,
        "power": 90,
        "type": "bug",
        "category": "special"
      },
      {
        "name": "Leech Life",
        "accuracy": 100,
        "power": 80,
        "type": "bug",
        "category": "physical"
      }
    ]
  },
  {
    "id": 12,
    "name": "Butterfree",
    "type1": "bug",
    "type2": "flying",
    "hp": 60,
    "atk": 45,
    "def": 50,
    "spAtk": 90,
    "spDef": 80,
    "speed": 70,
    "height": 11,
    "weight": 320,
    "evolutionStage": 3,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Hurricane",
        "accuracy": 70,
        "power": 110,
        "type": "flying",
        "category": "special"
      },
      {
        "name": "Megahorn",
        "accuracy": 85,
        "power": 120,
        "type": "bug",
        "category": "physical"
      },
      {
        "name": "X Scissor",
        "accuracy": 100,
        "power": 80,
        "type": "bug",
        "category": "physical"
      }
    ]
  },
  {
    "id": 13,
    "name": "Weedle",
    "type1": "bug",
    "type2": "poison",
    "hp": 40,
    "atk": 35,
    "def": 30,
    "spAtk": 20,
    "spDef": 20,
    "speed": 50,
    "height": 3,
    "weight": 32,
    "evolutionStage": 1,
    "evolution1Name": "Kakuna",
    "evolution1Num": 14,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Poison Sting",
        "accuracy": 100,
        "power": 15,
        "type": "poison",
        "category": "physical"
      },
      {
        "name": "Leech Life",
        "accuracy": 100,
        "power": 80,
        "type": "bug",
        "category": "physical"
      },
      {
        "name": "X Scissor",
        "accuracy": 100,
        "power": 80,
        "type": "bug",
        "category": "physical"
      }
    ]
  },
  {
    "id": 14,
    "name": "Kakuna",
    "type1": "bug",
    "type2": "poison",
    "hp": 45,
    "atk": 25,
    "def": 50,
    "spAtk": 25,
    "spDef": 25,
    "speed": 35,
    "height": 6,
    "weight": 100,
    "evolutionStage": 2,
    "evolution1Name": "Beedrill",
    "evolution1Num": 15,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Bug Bite",
        "accuracy": 100,
        "power": 60,
        "type": "bug",
        "category": "physical"
      },
      {
        "name": "Bug Buzz",
        "accuracy": 100,
        "power": 90,
        "type": "bug",
        "category": "special"
      },
      {
        "name": "Attack Order",
        "accuracy": 100,
        "power": 90,
        "type": "bug",
        "category": "physical"
      }
    ]
  },
  {
    "id": 15,
    "name": "Beedrill",
    "type1": "bug",
    "type2": "poison",
    "hp": 65,
    "atk": 90,
    "def": 40,
    "spAtk": 45,
    "spDef": 80,
    "speed": 75,
    "height": 10,
    "weight": 295,
    "evolutionStage": 3,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "U Turn",
        "accuracy": 100,
        "power": 70,
        "type": "bug",
        "category": "physical"
      },
      {
        "name": "Poison Jab",
        "accuracy": 100,
        "power": 80,
        "type": "poison",
        "category": "physical"
      },
      {
        "name": "Megahorn",
        "accuracy": 85,
        "power": 120,
        "type": "bug",
        "category": "physical"
      }
    ]
  },
  {
    "id": 16,
    "name": "Pidgey",
    "type1": "normal",
    "type2": "flying",
    "hp": 40,
    "atk": 45,
    "def": 40,
    "spAtk": 35,
    "spDef": 35,
    "speed": 56,
    "height": 3,
    "weight": 18,
    "evolutionStage": 1,
    "evolution1Name": "Pidgeotto",
    "evolution1Num": 17,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Rage",
        "accuracy": 100,
        "power": 20,
        "type": "normal",
        "category": "physical"
      },
      {
        "name": "Quick Attack",
        "accuracy": 100,
        "power": 40,
        "type": "normal",
        "category": "physical"
      },
      {
        "name": "Gust",
        "accuracy": 100,
        "power": 40,
        "type": "flying",
        "category": "special"
      }
    ]
  },
  {
    "id": 17,
    "name": "Pidgeotto",
    "type1": "normal",
    "type2": "flying",
    "hp": 63,
    "atk": 60,
    "def": 55,
    "spAtk": 50,
    "spDef": 50,
    "speed": 71,
    "height": 11,
    "weight": 300,
    "evolutionStage": 2,
    "evolution1Name": "Pidgeot",
    "evolution1Num": 18,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Swift",
        "accuracy": 100,
        "power": 60,
        "type": "normal",
        "category": "special"
      },
      {
        "name": "Hidden Power",
        "accuracy": 100,
        "power": 60,
        "type": "normal",
        "category": "special"
      },
      {
        "name": "Wing Attack",
        "accuracy": 100,
        "power": 60,
        "type": "flying",
        "category": "physical"
      }
    ]
  },
  {
    "id": 18,
    "name": "Pidgeot",
    "type1": "normal",
    "type2": "flying",
    "hp": 83,
    "atk": 80,
    "def": 75,
    "spAtk": 70,
    "spDef": 70,
    "speed": 101,
    "height": 15,
    "weight": 395,
    "evolutionStage": 3,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Facade",
        "accuracy": 100,
        "power": 70,
        "type": "normal",
        "category": "physical"
      },
      {
        "name": "Secret Power",
        "accuracy": 100,
        "power": 70,
        "type": "normal",
        "category": "physical"
      },
      {
        "name": "Air Slash",
        "accuracy": 95,
        "power": 75,
        "type": "flying",
        "category": "special"
      }
    ]
  },
  {
    "id": 19,
    "name": "Rattata",
    "type1": "normal",
    "type2": "",
    "hp": 30,
    "atk": 56,
    "def": 35,
    "spAtk": 25,
    "spDef": 35,
    "speed": 72,
    "height": 3,
    "weight": 35,
    "evolutionStage": 1,
    "evolution1Name": "Raticate",
    "evolution1Num": 20,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Fury Swipes",
        "accuracy": 80,
        "power": 18,
        "type": "normal",
        "category": "physical"
      },
      {
        "name": "Rage",
        "accuracy": 100,
        "power": 20,
        "type": "normal",
        "category": "physical"
      },
      {
        "name": "Tackle",
        "accuracy": 100,
        "power": 40,
        "type": "normal",
        "category": "physical"
      }
    ]
  },
  {
    "id": 20,
    "name": "Raticate",
    "type1": "normal",
    "type2": "",
    "hp": 55,
    "atk": 81,
    "def": 60,
    "spAtk": 50,
    "spDef": 70,
    "speed": 97,
    "height": 7,
    "weight": 185,
    "evolutionStage": 3,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Hyper Fang",
        "accuracy": 90,
        "power": 80,
        "type": "normal",
        "category": "physical"
      },
      {
        "name": "Strength",
        "accuracy": 100,
        "power": 80,
        "type": "normal",
        "category": "physical"
      },
      {
        "name": "Body Slam",
        "accuracy": 100,
        "power": 85,
        "type": "normal",
        "category": "physical"
      }
    ]
  },
  {
    "id": 21,
    "name": "Spearow",
    "type1": "normal",
    "type2": "flying",
    "hp": 40,
    "atk": 60,
    "def": 30,
    "spAtk": 31,
    "spDef": 31,
    "speed": 70,
    "height": 3,
    "weight": 20,
    "evolutionStage": 1,
    "evolution1Name": "Fearow",
    "evolution1Num": 22,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Fury Attack",
        "accuracy": 85,
        "power": 15,
        "type": "normal",
        "category": "physical"
      },
      {
        "name": "Rage",
        "accuracy": 100,
        "power": 20,
        "type": "normal",
        "category": "physical"
      },
      {
        "name": "Peck",
        "accuracy": 100,
        "power": 35,
        "type": "flying",
        "category": "physical"
      }
    ]
  },
  {
    "id": 22,
    "name": "Fearow",
    "type1": "normal",
    "type2": "flying",
    "hp": 65,
    "atk": 90,
    "def": 65,
    "spAtk": 61,
    "spDef": 61,
    "speed": 100,
    "height": 12,
    "weight": 380,
    "evolutionStage": 2,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Hidden Power",
        "accuracy": 100,
        "power": 60,
        "type": "normal",
        "category": "special"
      },
      {
        "name": "Swift",
        "accuracy": 100,
        "power": 60,
        "type": "normal",
        "category": "special"
      },
      {
        "name": "Aerial Ace",
        "accuracy": 100,
        "power": 60,
        "type": "flying",
        "category": "physical"
      }
    ]
  },
  {
    "id": 23,
    "name": "Ekans",
    "type1": "poison",
    "type2": "",
    "hp": 35,
    "atk": 60,
    "def": 44,
    "spAtk": 40,
    "spDef": 54,
    "speed": 55,
    "height": 20,
    "weight": 69,
    "evolutionStage": 1,
    "evolution1Name": "Arbok",
    "evolution1Num": 24,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Poison Sting",
        "accuracy": 100,
        "power": 15,
        "type": "poison",
        "category": "physical"
      },
      {
        "name": "Acid",
        "accuracy": 100,
        "power": 40,
        "type": "poison",
        "category": "special"
      },
      {
        "name": "Acid Spray",
        "accuracy": 100,
        "power": 40,
        "type": "poison",
        "category": "special"
      }
    ]
  },
  {
    "id": 24,
    "name": "Arbok",
    "type1": "poison",
    "type2": "",
    "hp": 60,
    "atk": 95,
    "def": 69,
    "spAtk": 65,
    "spDef": 79,
    "speed": 80,
    "height": 35,
    "weight": 650,
    "evolutionStage": 2,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Venoshock",
        "accuracy": 100,
        "power": 65,
        "type": "poison",
        "category": "special"
      },
      {
        "name": "Poison Jab",
        "accuracy": 100,
        "power": 80,
        "type": "poison",
        "category": "physical"
      },
      {
        "name": "Gunk Shot",
        "accuracy": 80,
        "power": 120,
        "type": "poison",
        "category": "physical"
      }
    ]
  },
  {
    "id": 25,
    "name": "Pikachu",
    "type1": "electric",
    "type2": "",
    "hp": 35,
    "atk": 55,
    "def": 40,
    "spAtk": 50,
    "spDef": 50,
    "speed": 90,
    "height": 4,
    "weight": 60,
    "evolutionStage": 2,
    "evolution1Name": "Raichu",
    "evolution1Num": 26,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Shock Wave",
        "accuracy": 100,
        "power": 60,
        "type": "electric",
        "category": "special"
      },
      {
        "name": "Spark",
        "accuracy": 100,
        "power": 65,
        "type": "electric",
        "category": "physical"
      },
      {
        "name": "Volt Switch",
        "accuracy": 100,
        "power": 70,
        "type": "electric",
        "category": "special"
      }
    ]
  },
  {
    "id": 26,
    "name": "Raichu",
    "type1": "electric",
    "type2": "",
    "hp": 60,
    "atk": 90,
    "def": 55,
    "spAtk": 90,
    "spDef": 80,
    "speed": 110,
    "height": 8,
    "weight": 300,
    "evolutionStage": 3,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Thunderbolt",
        "accuracy": 100,
        "power": 90,
        "type": "electric",
        "category": "special"
      },
      {
        "name": "Wild Charge",
        "accuracy": 100,
        "power": 90,
        "type": "electric",
        "category": "physical"
      },
      {
        "name": "Thunder",
        "accuracy": 70,
        "power": 110,
        "type": "electric",
        "category": "special"
      }
    ]
  },
  {
    "id": 27,
    "name": "Sandshrew",
    "type1": "ground",
    "type2": "",
    "hp": 50,
    "atk": 75,
    "def": 85,
    "spAtk": 20,
    "spDef": 30,
    "speed": 40,
    "height": 6,
    "weight": 120,
    "evolutionStage": 1,
    "evolution1Name": "Sandslash",
    "evolution1Num": 28,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Mud Slap",
        "accuracy": 100,
        "power": 20,
        "type": "ground",
        "category": "special"
      },
      {
        "name": "Sand Tomb",
        "accuracy": 85,
        "power": 35,
        "type": "ground",
        "category": "physical"
      },
      {
        "name": "Mud Shot",
        "accuracy": 95,
        "power": 55,
        "type": "ground",
        "category": "special"
      }
    ]
  },
  {
    "id": 28,
    "name": "Sandslash",
    "type1": "ground",
    "type2": "",
    "hp": 75,
    "atk": 100,
    "def": 110,
    "spAtk": 45,
    "spDef": 55,
    "speed": 65,
    "height": 10,
    "weight": 295,
    "evolutionStage": 2,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Bulldoze",
        "accuracy": 100,
        "power": 60,
        "type": "ground",
        "category": "physical"
      },
      {
        "name": "Scorching Sands",
        "accuracy": 100,
        "power": 70,
        "type": "ground",
        "category": "special"
      },
      {
        "name": "Stomping Tantrum",
        "accuracy": 100,
        "power": 75,
        "type": "ground",
        "category": "physical"
      }
    ]
  },
  {
    "id": 29,
    "name": "Nidoran♀",
    "type1": "poison",
    "type2": "",
    "hp": 55,
    "atk": 47,
    "def": 52,
    "spAtk": 40,
    "spDef": 40,
    "speed": 41,
    "height": 0,
    "weight": 0,
    "evolutionStage": 1,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Poison Sting",
        "accuracy": 100,
        "power": 15,
        "type": "poison",
        "category": "physical"
      },
      {
        "name": "Poison Fang",
        "accuracy": 100,
        "power": 50,
        "type": "poison",
        "category": "physical"
      },
      {
        "name": "Poison Tail",
        "accuracy": 100,
        "power": 50,
        "type": "poison",
        "category": "physical"
      }
    ]
  },
  {
    "id": 30,
    "name": "Nidorina",
    "type1": "poison",
    "type2": "",
    "hp": 70,
    "atk": 62,
    "def": 67,
    "spAtk": 55,
    "spDef": 55,
    "speed": 56,
    "height": 8,
    "weight": 200,
    "evolutionStage": 1,
    "evolution1Name": "Nidoqueen",
    "evolution1Num": 31,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Poison Sting",
        "accuracy": 100,
        "power": 15,
        "type": "poison",
        "category": "physical"
      },
      {
        "name": "Poison Fang",
        "accuracy": 100,
        "power": 50,
        "type": "poison",
        "category": "physical"
      },
      {
        "name": "Gunk Shot",
        "accuracy": 80,
        "power": 120,
        "type": "poison",
        "category": "physical"
      }
    ]
  },
  {
    "id": 31,
    "name": "Nidoqueen",
    "type1": "poison",
    "type2": "ground",
    "hp": 90,
    "atk": 92,
    "def": 87,
    "spAtk": 75,
    "spDef": 85,
    "speed": 76,
    "height": 13,
    "weight": 600,
    "evolutionStage": 2,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Poison Jab",
        "accuracy": 100,
        "power": 80,
        "type": "poison",
        "category": "physical"
      },
      {
        "name": "Sludge Bomb",
        "accuracy": 100,
        "power": 90,
        "type": "poison",
        "category": "special"
      },
      {
        "name": "Scorching Sands",
        "accuracy": 100,
        "power": 70,
        "type": "ground",
        "category": "special"
      }
    ]
  },
  {
    "id": 32,
    "name": "Nidoran♂",
    "type1": "poison",
    "type2": "",
    "hp": 46,
    "atk": 57,
    "def": 40,
    "spAtk": 40,
    "spDef": 40,
    "speed": 50,
    "height": 0,
    "weight": 0,
    "evolutionStage": 1,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Poison Sting",
        "accuracy": 100,
        "power": 15,
        "type": "poison",
        "category": "physical"
      },
      {
        "name": "Poison Tail",
        "accuracy": 100,
        "power": 50,
        "type": "poison",
        "category": "physical"
      },
      {
        "name": "Sludge Bomb",
        "accuracy": 100,
        "power": 90,
        "type": "poison",
        "category": "special"
      }
    ]
  },
  {
    "id": 33,
    "name": "Nidorino",
    "type1": "poison",
    "type2": "",
    "hp": 61,
    "atk": 72,
    "def": 57,
    "spAtk": 55,
    "spDef": 55,
    "speed": 65,
    "height": 9,
    "weight": 195,
    "evolutionStage": 1,
    "evolution1Name": "Nidoking",
    "evolution1Num": 34,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Poison Sting",
        "accuracy": 100,
        "power": 15,
        "type": "poison",
        "category": "physical"
      },
      {
        "name": "Gunk Shot",
        "accuracy": 80,
        "power": 120,
        "type": "poison",
        "category": "physical"
      },
      {
        "name": "Belch",
        "accuracy": 90,
        "power": 120,
        "type": "poison",
        "category": "special"
      }
    ]
  },
  {
    "id": 34,
    "name": "Nidoking",
    "type1": "poison",
    "type2": "ground",
    "hp": 81,
    "atk": 102,
    "def": 77,
    "spAtk": 85,
    "spDef": 75,
    "speed": 85,
    "height": 14,
    "weight": 620,
    "evolutionStage": 2,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Poison Jab",
        "accuracy": 100,
        "power": 80,
        "type": "poison",
        "category": "physical"
      },
      {
        "name": "Sludge Bomb",
        "accuracy": 100,
        "power": 90,
        "type": "poison",
        "category": "special"
      },
      {
        "name": "Scorching Sands",
        "accuracy": 100,
        "power": 70,
        "type": "ground",
        "category": "special"
      }
    ]
  },
  {
    "id": 35,
    "name": "Clefairy",
    "type1": "fairy",
    "type2": "",
    "hp": 70,
    "atk": 45,
    "def": 48,
    "spAtk": 60,
    "spDef": 65,
    "speed": 35,
    "height": 6,
    "weight": 75,
    "evolutionStage": 2,
    "evolution1Name": "Clefable",
    "evolution1Num": 36,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Dazzling Gleam",
        "accuracy": 100,
        "power": 80,
        "type": "fairy",
        "category": "special"
      },
      {
        "name": "Light Of Ruin",
        "accuracy": 90,
        "power": 140,
        "type": "fairy",
        "category": "special"
      },
      {
        "name": "Fleur Cannon",
        "accuracy": 90,
        "power": 130,
        "type": "fairy",
        "category": "special"
      }
    ]
  },
  {
    "id": 36,
    "name": "Clefable",
    "type1": "fairy",
    "type2": "",
    "hp": 95,
    "atk": 70,
    "def": 73,
    "spAtk": 95,
    "spDef": 90,
    "speed": 60,
    "height": 13,
    "weight": 400,
    "evolutionStage": 3,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Play Rough",
        "accuracy": 90,
        "power": 90,
        "type": "fairy",
        "category": "physical"
      },
      {
        "name": "Moonblast",
        "accuracy": 100,
        "power": 95,
        "type": "fairy",
        "category": "special"
      },
      {
        "name": "Misty Explosion",
        "accuracy": 100,
        "power": 100,
        "type": "fairy",
        "category": "special"
      }
    ]
  },
  {
    "id": 37,
    "name": "Vulpix",
    "type1": "fire",
    "type2": "",
    "hp": 38,
    "atk": 41,
    "def": 40,
    "spAtk": 50,
    "spDef": 65,
    "speed": 65,
    "height": 6,
    "weight": 99,
    "evolutionStage": 1,
    "evolution1Name": "Ninetales",
    "evolution1Num": 38,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Fire Spin",
        "accuracy": 85,
        "power": 35,
        "type": "fire",
        "category": "special"
      },
      {
        "name": "Ember",
        "accuracy": 100,
        "power": 40,
        "type": "fire",
        "category": "special"
      },
      {
        "name": "Flame Charge",
        "accuracy": 100,
        "power": 50,
        "type": "fire",
        "category": "physical"
      }
    ]
  },
  {
    "id": 38,
    "name": "Ninetales",
    "type1": "fire",
    "type2": "",
    "hp": 73,
    "atk": 76,
    "def": 75,
    "spAtk": 81,
    "spDef": 100,
    "speed": 100,
    "height": 11,
    "weight": 199,
    "evolutionStage": 2,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Burning Jealousy",
        "accuracy": 100,
        "power": 70,
        "type": "fire",
        "category": "special"
      },
      {
        "name": "Mystical Fire",
        "accuracy": 100,
        "power": 75,
        "type": "fire",
        "category": "special"
      },
      {
        "name": "Flamethrower",
        "accuracy": 100,
        "power": 90,
        "type": "fire",
        "category": "special"
      }
    ]
  },
  {
    "id": 39,
    "name": "Jigglypuff",
    "type1": "normal",
    "type2": "fairy",
    "hp": 115,
    "atk": 45,
    "def": 20,
    "spAtk": 45,
    "spDef": 25,
    "speed": 20,
    "height": 5,
    "weight": 55,
    "evolutionStage": 2,
    "evolution1Name": "Wigglytuff",
    "evolution1Num": 40,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Facade",
        "accuracy": 100,
        "power": 70,
        "type": "normal",
        "category": "physical"
      },
      {
        "name": "Headbutt",
        "accuracy": 100,
        "power": 70,
        "type": "normal",
        "category": "physical"
      },
      {
        "name": "Dazzling Gleam",
        "accuracy": 100,
        "power": 80,
        "type": "fairy",
        "category": "special"
      }
    ]
  },
  {
    "id": 40,
    "name": "Wigglytuff",
    "type1": "normal",
    "type2": "fairy",
    "hp": 140,
    "atk": 70,
    "def": 45,
    "spAtk": 85,
    "spDef": 50,
    "speed": 45,
    "height": 10,
    "weight": 120,
    "evolutionStage": 3,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Hyper Voice",
        "accuracy": 100,
        "power": 90,
        "type": "normal",
        "category": "special"
      },
      {
        "name": "Take Down",
        "accuracy": 85,
        "power": 90,
        "type": "normal",
        "category": "physical"
      },
      {
        "name": "Play Rough",
        "accuracy": 90,
        "power": 90,
        "type": "fairy",
        "category": "physical"
      }
    ]
  },
  {
    "id": 41,
    "name": "Zubat",
    "type1": "poison",
    "type2": "flying",
    "hp": 40,
    "atk": 45,
    "def": 35,
    "spAtk": 30,
    "spDef": 40,
    "speed": 55,
    "height": 8,
    "weight": 75,
    "evolutionStage": 1,
    "evolution1Name": "Golbat",
    "evolution1Num": 42,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Poison Fang",
        "accuracy": 100,
        "power": 50,
        "type": "poison",
        "category": "physical"
      },
      {
        "name": "Gust",
        "accuracy": 100,
        "power": 40,
        "type": "flying",
        "category": "special"
      },
      {
        "name": "Poison Jab",
        "accuracy": 100,
        "power": 80,
        "type": "poison",
        "category": "physical"
      }
    ]
  },
  {
    "id": 42,
    "name": "Golbat",
    "type1": "poison",
    "type2": "flying",
    "hp": 75,
    "atk": 80,
    "def": 70,
    "spAtk": 65,
    "spDef": 75,
    "speed": 90,
    "height": 16,
    "weight": 550,
    "evolutionStage": 2,
    "evolution1Name": "Crobat",
    "evolution1Num": 169,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Venoshock",
        "accuracy": 100,
        "power": 65,
        "type": "poison",
        "category": "special"
      },
      {
        "name": "Cross Poison",
        "accuracy": 100,
        "power": 70,
        "type": "poison",
        "category": "physical"
      },
      {
        "name": "Wing Attack",
        "accuracy": 100,
        "power": 60,
        "type": "flying",
        "category": "physical"
      }
    ]
  },
  {
    "id": 43,
    "name": "Oddish",
    "type1": "grass",
    "type2": "poison",
    "hp": 45,
    "atk": 50,
    "def": 55,
    "spAtk": 75,
    "spDef": 65,
    "speed": 30,
    "height": 5,
    "weight": 54,
    "evolutionStage": 1,
    "evolution1Name": "Gloom",
    "evolution1Num": 44,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Absorb",
        "accuracy": 100,
        "power": 20,
        "type": "grass",
        "category": "special"
      },
      {
        "name": "Bullet Seed",
        "accuracy": 100,
        "power": 25,
        "type": "grass",
        "category": "physical"
      },
      {
        "name": "Acid",
        "accuracy": 100,
        "power": 40,
        "type": "poison",
        "category": "special"
      }
    ]
  },
  {
    "id": 44,
    "name": "Gloom",
    "type1": "grass",
    "type2": "poison",
    "hp": 60,
    "atk": 65,
    "def": 70,
    "spAtk": 85,
    "spDef": 75,
    "speed": 40,
    "height": 8,
    "weight": 86,
    "evolutionStage": 2,
    "evolution1Name": "Vileplume",
    "evolution1Num": 45,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Razor Leaf",
        "accuracy": 95,
        "power": 55,
        "type": "grass",
        "category": "physical"
      },
      {
        "name": "Magical Leaf",
        "accuracy": 100,
        "power": 60,
        "type": "grass",
        "category": "special"
      },
      {
        "name": "Venoshock",
        "accuracy": 100,
        "power": 65,
        "type": "poison",
        "category": "special"
      }
    ]
  },
  {
    "id": 45,
    "name": "Vileplume",
    "type1": "grass",
    "type2": "poison",
    "hp": 75,
    "atk": 80,
    "def": 85,
    "spAtk": 110,
    "spDef": 90,
    "speed": 50,
    "height": 12,
    "weight": 186,
    "evolutionStage": 3,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Energy Ball",
        "accuracy": 100,
        "power": 90,
        "type": "grass",
        "category": "special"
      },
      {
        "name": "Petal Blizzard",
        "accuracy": 100,
        "power": 90,
        "type": "grass",
        "category": "physical"
      },
      {
        "name": "Sludge Bomb",
        "accuracy": 100,
        "power": 90,
        "type": "poison",
        "category": "special"
      }
    ]
  },
  {
    "id": 46,
    "name": "Paras",
    "type1": "bug",
    "type2": "grass",
    "hp": 35,
    "atk": 70,
    "def": 55,
    "spAtk": 45,
    "spDef": 55,
    "speed": 25,
    "height": 3,
    "weight": 54,
    "evolutionStage": 1,
    "evolution1Name": "Parasect",
    "evolution1Num": 47,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Fury Cutter",
        "accuracy": 95,
        "power": 40,
        "type": "bug",
        "category": "physical"
      },
      {
        "name": "Struggle Bug",
        "accuracy": 100,
        "power": 50,
        "type": "bug",
        "category": "special"
      },
      {
        "name": "Absorb",
        "accuracy": 100,
        "power": 20,
        "type": "grass",
        "category": "special"
      }
    ]
  },
  {
    "id": 47,
    "name": "Parasect",
    "type1": "bug",
    "type2": "grass",
    "hp": 60,
    "atk": 95,
    "def": 80,
    "spAtk": 60,
    "spDef": 80,
    "speed": 30,
    "height": 10,
    "weight": 295,
    "evolutionStage": 2,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Bug Bite",
        "accuracy": 100,
        "power": 60,
        "type": "bug",
        "category": "physical"
      },
      {
        "name": "Leech Life",
        "accuracy": 100,
        "power": 80,
        "type": "bug",
        "category": "physical"
      },
      {
        "name": "Giga Drain",
        "accuracy": 100,
        "power": 75,
        "type": "grass",
        "category": "special"
      }
    ]
  },
  {
    "id": 48,
    "name": "Venonat",
    "type1": "bug",
    "type2": "poison",
    "hp": 60,
    "atk": 55,
    "def": 50,
    "spAtk": 40,
    "spDef": 55,
    "speed": 45,
    "height": 10,
    "weight": 300,
    "evolutionStage": 1,
    "evolution1Name": "Venomoth",
    "evolution1Num": 49,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Infestation",
        "accuracy": 100,
        "power": 20,
        "type": "bug",
        "category": "special"
      },
      {
        "name": "Struggle Bug",
        "accuracy": 100,
        "power": 50,
        "type": "bug",
        "category": "special"
      },
      {
        "name": "Acid Spray",
        "accuracy": 100,
        "power": 40,
        "type": "poison",
        "category": "special"
      }
    ]
  },
  {
    "id": 49,
    "name": "Venomoth",
    "type1": "bug",
    "type2": "poison",
    "hp": 70,
    "atk": 65,
    "def": 60,
    "spAtk": 90,
    "spDef": 75,
    "speed": 90,
    "height": 15,
    "weight": 125,
    "evolutionStage": 2,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Silver Wind",
        "accuracy": 100,
        "power": 60,
        "type": "bug",
        "category": "special"
      },
      {
        "name": "Bug Bite",
        "accuracy": 100,
        "power": 60,
        "type": "bug",
        "category": "physical"
      },
      {
        "name": "Venoshock",
        "accuracy": 100,
        "power": 65,
        "type": "poison",
        "category": "special"
      }
    ]
  },
  {
    "id": 50,
    "name": "Diglett",
    "type1": "ground",
    "type2": "",
    "hp": 10,
    "atk": 55,
    "def": 25,
    "spAtk": 35,
    "spDef": 45,
    "speed": 95,
    "height": 2,
    "weight": 8,
    "evolutionStage": 1,
    "evolution1Name": "Dugtrio",
    "evolution1Num": 51,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Mud Slap",
        "accuracy": 100,
        "power": 20,
        "type": "ground",
        "category": "special"
      },
      {
        "name": "Sand Tomb",
        "accuracy": 85,
        "power": 35,
        "type": "ground",
        "category": "physical"
      },
      {
        "name": "Mud Shot",
        "accuracy": 95,
        "power": 55,
        "type": "ground",
        "category": "special"
      }
    ]
  },
  {
    "id": 51,
    "name": "Dugtrio",
    "type1": "ground",
    "type2": "",
    "hp": 35,
    "atk": 100,
    "def": 50,
    "spAtk": 50,
    "spDef": 70,
    "speed": 120,
    "height": 7,
    "weight": 333,
    "evolutionStage": 2,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Bulldoze",
        "accuracy": 100,
        "power": 60,
        "type": "ground",
        "category": "physical"
      },
      {
        "name": "Mud Bomb",
        "accuracy": 85,
        "power": 65,
        "type": "ground",
        "category": "special"
      },
      {
        "name": "Scorching Sands",
        "accuracy": 100,
        "power": 70,
        "type": "ground",
        "category": "special"
      }
    ]
  },
  {
    "id": 52,
    "name": "Meowth",
    "type1": "normal",
    "type2": "",
    "hp": 40,
    "atk": 45,
    "def": 35,
    "spAtk": 40,
    "spDef": 40,
    "speed": 90,
    "height": 4,
    "weight": 42,
    "evolutionStage": 1,
    "evolution1Name": "Persian",
    "evolution1Num": 53,
    "evolution2Name": "Perrserker",
    "evolution2Num": 863,
    "moves": [
      {
        "name": "Fury Swipes",
        "accuracy": 80,
        "power": 18,
        "type": "normal",
        "category": "physical"
      },
      {
        "name": "Rage",
        "accuracy": 100,
        "power": 20,
        "type": "normal",
        "category": "physical"
      },
      {
        "name": "Feint",
        "accuracy": 100,
        "power": 30,
        "type": "normal",
        "category": "physical"
      }
    ]
  },
  {
    "id": 53,
    "name": "Persian",
    "type1": "normal",
    "type2": "",
    "hp": 65,
    "atk": 70,
    "def": 60,
    "spAtk": 65,
    "spDef": 65,
    "speed": 115,
    "height": 10,
    "weight": 320,
    "evolutionStage": 3,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Body Slam",
        "accuracy": 100,
        "power": 85,
        "type": "normal",
        "category": "physical"
      },
      {
        "name": "Take Down",
        "accuracy": 85,
        "power": 90,
        "type": "normal",
        "category": "physical"
      },
      {
        "name": "Uproar",
        "accuracy": 100,
        "power": 90,
        "type": "normal",
        "category": "special"
      }
    ]
  },
  {
    "id": 54,
    "name": "Psyduck",
    "type1": "water",
    "type2": "",
    "hp": 50,
    "atk": 52,
    "def": 48,
    "spAtk": 65,
    "spDef": 50,
    "speed": 55,
    "height": 8,
    "weight": 196,
    "evolutionStage": 1,
    "evolution1Name": "Golduck",
    "evolution1Num": 55,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Whirlpool",
        "accuracy": 85,
        "power": 35,
        "type": "water",
        "category": "special"
      },
      {
        "name": "Water Gun",
        "accuracy": 100,
        "power": 40,
        "type": "water",
        "category": "special"
      },
      {
        "name": "Bubble",
        "accuracy": 100,
        "power": 40,
        "type": "water",
        "category": "special"
      }
    ]
  },
  {
    "id": 55,
    "name": "Golduck",
    "type1": "water",
    "type2": "",
    "hp": 80,
    "atk": 82,
    "def": 78,
    "spAtk": 95,
    "spDef": 80,
    "speed": 85,
    "height": 17,
    "weight": 766,
    "evolutionStage": 2,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Water Pulse",
        "accuracy": 100,
        "power": 60,
        "type": "water",
        "category": "special"
      },
      {
        "name": "Flip Turn",
        "accuracy": 100,
        "power": 60,
        "type": "water",
        "category": "physical"
      },
      {
        "name": "Bubble Beam",
        "accuracy": 100,
        "power": 65,
        "type": "water",
        "category": "special"
      }
    ]
  },
  {
    "id": 56,
    "name": "Mankey",
    "type1": "fighting",
    "type2": "",
    "hp": 40,
    "atk": 80,
    "def": 35,
    "spAtk": 35,
    "spDef": 45,
    "speed": 70,
    "height": 5,
    "weight": 280,
    "evolutionStage": 1,
    "evolution1Name": "Primeape",
    "evolution1Num": 57,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Rock Smash",
        "accuracy": 100,
        "power": 40,
        "type": "fighting",
        "category": "physical"
      },
      {
        "name": "Vacuum Wave",
        "accuracy": 100,
        "power": 40,
        "type": "fighting",
        "category": "special"
      },
      {
        "name": "Power Up Punch",
        "accuracy": 100,
        "power": 40,
        "type": "fighting",
        "category": "physical"
      }
    ]
  },
  {
    "id": 57,
    "name": "Primeape",
    "type1": "fighting",
    "type2": "",
    "hp": 65,
    "atk": 105,
    "def": 60,
    "spAtk": 60,
    "spDef": 70,
    "speed": 95,
    "height": 10,
    "weight": 320,
    "evolutionStage": 2,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Low Sweep",
        "accuracy": 100,
        "power": 65,
        "type": "fighting",
        "category": "physical"
      },
      {
        "name": "Brick Break",
        "accuracy": 100,
        "power": 75,
        "type": "fighting",
        "category": "physical"
      },
      {
        "name": "Drain Punch",
        "accuracy": 100,
        "power": 75,
        "type": "fighting",
        "category": "physical"
      }
    ]
  },
  {
    "id": 58,
    "name": "Growlithe",
    "type1": "fire",
    "type2": "",
    "hp": 55,
    "atk": 70,
    "def": 45,
    "spAtk": 70,
    "spDef": 50,
    "speed": 60,
    "height": 7,
    "weight": 190,
    "evolutionStage": 1,
    "evolution1Name": "Arcanine",
    "evolution1Num": 59,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Fire Spin",
        "accuracy": 85,
        "power": 35,
        "type": "fire",
        "category": "special"
      },
      {
        "name": "Ember",
        "accuracy": 100,
        "power": 40,
        "type": "fire",
        "category": "special"
      },
      {
        "name": "Flame Charge",
        "accuracy": 100,
        "power": 50,
        "type": "fire",
        "category": "physical"
      }
    ]
  },
  {
    "id": 59,
    "name": "Arcanine",
    "type1": "fire",
    "type2": "",
    "hp": 90,
    "atk": 110,
    "def": 80,
    "spAtk": 100,
    "spDef": 80,
    "speed": 95,
    "height": 19,
    "weight": 1550,
    "evolutionStage": 2,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Fire Fang",
        "accuracy": 95,
        "power": 65,
        "type": "fire",
        "category": "physical"
      },
      {
        "name": "Flamethrower",
        "accuracy": 100,
        "power": 90,
        "type": "fire",
        "category": "special"
      },
      {
        "name": "V Create",
        "accuracy": 95,
        "power": 180,
        "type": "fire",
        "category": "physical"
      }
    ]
  },
  {
    "id": 60,
    "name": "Poliwag",
    "type1": "water",
    "type2": "",
    "hp": 40,
    "atk": 50,
    "def": 40,
    "spAtk": 40,
    "spDef": 40,
    "speed": 90,
    "height": 6,
    "weight": 124,
    "evolutionStage": 1,
    "evolution1Name": "Poliwhirl",
    "evolution1Num": 61,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Whirlpool",
        "accuracy": 85,
        "power": 35,
        "type": "water",
        "category": "special"
      },
      {
        "name": "Bubble",
        "accuracy": 100,
        "power": 40,
        "type": "water",
        "category": "special"
      },
      {
        "name": "Water Gun",
        "accuracy": 100,
        "power": 40,
        "type": "water",
        "category": "special"
      }
    ]
  },
  {
    "id": 61,
    "name": "Poliwhirl",
    "type1": "water",
    "type2": "",
    "hp": 65,
    "atk": 65,
    "def": 65,
    "spAtk": 50,
    "spDef": 50,
    "speed": 90,
    "height": 10,
    "weight": 200,
    "evolutionStage": 2,
    "evolution1Name": "Poliwrath",
    "evolution1Num": 62,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Water Pulse",
        "accuracy": 100,
        "power": 60,
        "type": "water",
        "category": "special"
      },
      {
        "name": "Bubble Beam",
        "accuracy": 100,
        "power": 65,
        "type": "water",
        "category": "special"
      },
      {
        "name": "Waterfall",
        "accuracy": 100,
        "power": 80,
        "type": "water",
        "category": "physical"
      }
    ]
  },
  {
    "id": 62,
    "name": "Poliwrath",
    "type1": "water",
    "type2": "fighting",
    "hp": 90,
    "atk": 95,
    "def": 95,
    "spAtk": 70,
    "spDef": 90,
    "speed": 70,
    "height": 13,
    "weight": 540,
    "evolutionStage": 3,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Surf",
        "accuracy": 100,
        "power": 90,
        "type": "water",
        "category": "special"
      },
      {
        "name": "Muddy Water",
        "accuracy": 85,
        "power": 90,
        "type": "water",
        "category": "special"
      },
      {
        "name": "Dynamic Punch",
        "accuracy": 50,
        "power": 100,
        "type": "fighting",
        "category": "physical"
      }
    ]
  },
  {
    "id": 63,
    "name": "Abra",
    "type1": "psychic",
    "type2": "",
    "hp": 25,
    "atk": 20,
    "def": 15,
    "spAtk": 105,
    "spDef": 55,
    "speed": 90,
    "height": 9,
    "weight": 195,
    "evolutionStage": 1,
    "evolution1Name": "Kadabra",
    "evolution1Num": 64,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Confusion",
        "accuracy": 100,
        "power": 50,
        "type": "psychic",
        "category": "special"
      },
      {
        "name": "Heart Stamp",
        "accuracy": 100,
        "power": 60,
        "type": "psychic",
        "category": "physical"
      },
      {
        "name": "Psybeam",
        "accuracy": 100,
        "power": 65,
        "type": "psychic",
        "category": "special"
      }
    ]
  },
  {
    "id": 64,
    "name": "Kadabra",
    "type1": "psychic",
    "type2": "",
    "hp": 40,
    "atk": 35,
    "def": 30,
    "spAtk": 120,
    "spDef": 70,
    "speed": 105,
    "height": 13,
    "weight": 565,
    "evolutionStage": 2,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Psycho Cut",
        "accuracy": 100,
        "power": 70,
        "type": "psychic",
        "category": "physical"
      },
      {
        "name": "Zen Headbutt",
        "accuracy": 90,
        "power": 80,
        "type": "psychic",
        "category": "physical"
      },
      {
        "name": "Psyshock",
        "accuracy": 100,
        "power": 80,
        "type": "psychic",
        "category": "special"
      }
    ]
  },
  {
    "id": 65,
    "name": "Alakazam",
    "type1": "psychic",
    "type2": "",
    "hp": 55,
    "atk": 50,
    "def": 45,
    "spAtk": 135,
    "spDef": 95,
    "speed": 120,
    "height": 15,
    "weight": 480,
    "evolutionStage": 4,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Psychic",
        "accuracy": 100,
        "power": 90,
        "type": "psychic",
        "category": "special"
      },
      {
        "name": "Dream Eater",
        "accuracy": 100,
        "power": 100,
        "type": "psychic",
        "category": "special"
      },
      {
        "name": "Future Sight",
        "accuracy": 100,
        "power": 120,
        "type": "psychic",
        "category": "special"
      }
    ]
  },
  {
    "id": 66,
    "name": "Machop",
    "type1": "fighting",
    "type2": "",
    "hp": 70,
    "atk": 80,
    "def": 50,
    "spAtk": 35,
    "spDef": 35,
    "speed": 35,
    "height": 8,
    "weight": 195,
    "evolutionStage": 1,
    "evolution1Name": "Machoke",
    "evolution1Num": 67,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Rock Smash",
        "accuracy": 100,
        "power": 40,
        "type": "fighting",
        "category": "physical"
      },
      {
        "name": "Vacuum Wave",
        "accuracy": 100,
        "power": 40,
        "type": "fighting",
        "category": "special"
      },
      {
        "name": "Power Up Punch",
        "accuracy": 100,
        "power": 40,
        "type": "fighting",
        "category": "physical"
      }
    ]
  },
  {
    "id": 67,
    "name": "Machoke",
    "type1": "fighting",
    "type2": "",
    "hp": 80,
    "atk": 100,
    "def": 70,
    "spAtk": 50,
    "spDef": 60,
    "speed": 45,
    "height": 15,
    "weight": 705,
    "evolutionStage": 2,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Low Sweep",
        "accuracy": 100,
        "power": 65,
        "type": "fighting",
        "category": "physical"
      },
      {
        "name": "Vital Throw",
        "accuracy": 100,
        "power": 70,
        "type": "fighting",
        "category": "physical"
      },
      {
        "name": "Wake Up Slap",
        "accuracy": 100,
        "power": 70,
        "type": "fighting",
        "category": "physical"
      }
    ]
  },
  {
    "id": 68,
    "name": "Machamp",
    "type1": "fighting",
    "type2": "",
    "hp": 90,
    "atk": 130,
    "def": 80,
    "spAtk": 65,
    "spDef": 85,
    "speed": 55,
    "height": 16,
    "weight": 1300,
    "evolutionStage": 4,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Cross Chop",
        "accuracy": 80,
        "power": 100,
        "type": "fighting",
        "category": "physical"
      },
      {
        "name": "Dynamic Punch",
        "accuracy": 50,
        "power": 100,
        "type": "fighting",
        "category": "physical"
      },
      {
        "name": "Focus Blast",
        "accuracy": 70,
        "power": 120,
        "type": "fighting",
        "category": "special"
      }
    ]
  },
  {
    "id": 69,
    "name": "Bellsprout",
    "type1": "grass",
    "type2": "poison",
    "hp": 50,
    "atk": 75,
    "def": 35,
    "spAtk": 70,
    "spDef": 30,
    "speed": 40,
    "height": 7,
    "weight": 40,
    "evolutionStage": 1,
    "evolution1Name": "Weepinbell",
    "evolution1Num": 70,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Bullet Seed",
        "accuracy": 100,
        "power": 25,
        "type": "grass",
        "category": "physical"
      },
      {
        "name": "Mega Drain",
        "accuracy": 100,
        "power": 40,
        "type": "grass",
        "category": "special"
      },
      {
        "name": "Acid",
        "accuracy": 100,
        "power": 40,
        "type": "poison",
        "category": "special"
      }
    ]
  },
  {
    "id": 70,
    "name": "Weepinbell",
    "type1": "grass",
    "type2": "poison",
    "hp": 65,
    "atk": 90,
    "def": 50,
    "spAtk": 85,
    "spDef": 45,
    "speed": 55,
    "height": 10,
    "weight": 64,
    "evolutionStage": 2,
    "evolution1Name": "Victreebel",
    "evolution1Num": 71,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Razor Leaf",
        "accuracy": 95,
        "power": 55,
        "type": "grass",
        "category": "physical"
      },
      {
        "name": "Magical Leaf",
        "accuracy": 100,
        "power": 60,
        "type": "grass",
        "category": "special"
      },
      {
        "name": "Clear Smog",
        "accuracy": 100,
        "power": 50,
        "type": "poison",
        "category": "special"
      }
    ]
  },
  {
    "id": 71,
    "name": "Victreebel",
    "type1": "grass",
    "type2": "poison",
    "hp": 80,
    "atk": 105,
    "def": 65,
    "spAtk": 100,
    "spDef": 70,
    "speed": 70,
    "height": 17,
    "weight": 155,
    "evolutionStage": 3,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Energy Ball",
        "accuracy": 100,
        "power": 90,
        "type": "grass",
        "category": "special"
      },
      {
        "name": "Leaf Blade",
        "accuracy": 100,
        "power": 90,
        "type": "grass",
        "category": "physical"
      },
      {
        "name": "Sludge Bomb",
        "accuracy": 100,
        "power": 90,
        "type": "poison",
        "category": "special"
      }
    ]
  },
  {
    "id": 72,
    "name": "Tentacool",
    "type1": "water",
    "type2": "poison",
    "hp": 40,
    "atk": 40,
    "def": 35,
    "spAtk": 50,
    "spDef": 100,
    "speed": 70,
    "height": 9,
    "weight": 455,
    "evolutionStage": 1,
    "evolution1Name": "Tentacruel",
    "evolution1Num": 73,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Whirlpool",
        "accuracy": 85,
        "power": 35,
        "type": "water",
        "category": "special"
      },
      {
        "name": "Water Gun",
        "accuracy": 100,
        "power": 40,
        "type": "water",
        "category": "special"
      },
      {
        "name": "Poison Sting",
        "accuracy": 100,
        "power": 15,
        "type": "poison",
        "category": "physical"
      }
    ]
  },
  {
    "id": 73,
    "name": "Tentacruel",
    "type1": "water",
    "type2": "poison",
    "hp": 80,
    "atk": 70,
    "def": 65,
    "spAtk": 80,
    "spDef": 120,
    "speed": 100,
    "height": 16,
    "weight": 550,
    "evolutionStage": 2,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Water Pulse",
        "accuracy": 100,
        "power": 60,
        "type": "water",
        "category": "special"
      },
      {
        "name": "Flip Turn",
        "accuracy": 100,
        "power": 60,
        "type": "water",
        "category": "physical"
      },
      {
        "name": "Venoshock",
        "accuracy": 100,
        "power": 65,
        "type": "poison",
        "category": "special"
      }
    ]
  },
  {
    "id": 74,
    "name": "Geodude",
    "type1": "rock",
    "type2": "ground",
    "hp": 40,
    "atk": 80,
    "def": 100,
    "spAtk": 30,
    "spDef": 30,
    "speed": 20,
    "height": 4,
    "weight": 200,
    "evolutionStage": 1,
    "evolution1Name": "Graveler",
    "evolution1Num": 75,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Rock Blast",
        "accuracy": 90,
        "power": 25,
        "type": "rock",
        "category": "physical"
      },
      {
        "name": "Rollout",
        "accuracy": 90,
        "power": 30,
        "type": "rock",
        "category": "physical"
      },
      {
        "name": "Mud Slap",
        "accuracy": 100,
        "power": 20,
        "type": "ground",
        "category": "special"
      }
    ]
  },
  {
    "id": 75,
    "name": "Graveler",
    "type1": "rock",
    "type2": "ground",
    "hp": 55,
    "atk": 95,
    "def": 115,
    "spAtk": 45,
    "spDef": 45,
    "speed": 35,
    "height": 10,
    "weight": 1050,
    "evolutionStage": 2,
    "evolution1Name": "Golem",
    "evolution1Num": 76,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Rock Tomb",
        "accuracy": 95,
        "power": 60,
        "type": "rock",
        "category": "physical"
      },
      {
        "name": "Rock Slide",
        "accuracy": 90,
        "power": 75,
        "type": "rock",
        "category": "physical"
      },
      {
        "name": "Bulldoze",
        "accuracy": 100,
        "power": 60,
        "type": "ground",
        "category": "physical"
      }
    ]
  },
  {
    "id": 76,
    "name": "Golem",
    "type1": "rock",
    "type2": "ground",
    "hp": 80,
    "atk": 120,
    "def": 130,
    "spAtk": 55,
    "spDef": 65,
    "speed": 45,
    "height": 14,
    "weight": 3000,
    "evolutionStage": 3,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Stone Edge",
        "accuracy": 80,
        "power": 100,
        "type": "rock",
        "category": "physical"
      },
      {
        "name": "Earthquake",
        "accuracy": 100,
        "power": 100,
        "type": "ground",
        "category": "physical"
      },
      {
        "name": "Rock Wrecker",
        "accuracy": 90,
        "power": 150,
        "type": "rock",
        "category": "physical"
      }
    ]
  },
  {
    "id": 77,
    "name": "Ponyta",
    "type1": "fire",
    "type2": "",
    "hp": 50,
    "atk": 85,
    "def": 55,
    "spAtk": 65,
    "spDef": 65,
    "speed": 90,
    "height": 10,
    "weight": 300,
    "evolutionStage": 1,
    "evolution1Name": "Rapidash",
    "evolution1Num": 78,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Fire Spin",
        "accuracy": 85,
        "power": 35,
        "type": "fire",
        "category": "special"
      },
      {
        "name": "Ember",
        "accuracy": 100,
        "power": 40,
        "type": "fire",
        "category": "special"
      },
      {
        "name": "Flame Charge",
        "accuracy": 100,
        "power": 50,
        "type": "fire",
        "category": "physical"
      }
    ]
  },
  {
    "id": 78,
    "name": "Rapidash",
    "type1": "fire",
    "type2": "",
    "hp": 65,
    "atk": 100,
    "def": 70,
    "spAtk": 80,
    "spDef": 80,
    "speed": 105,
    "height": 17,
    "weight": 950,
    "evolutionStage": 2,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Flame Wheel",
        "accuracy": 100,
        "power": 60,
        "type": "fire",
        "category": "physical"
      },
      {
        "name": "Mystical Fire",
        "accuracy": 100,
        "power": 75,
        "type": "fire",
        "category": "special"
      },
      {
        "name": "Flamethrower",
        "accuracy": 100,
        "power": 90,
        "type": "fire",
        "category": "special"
      }
    ]
  },
  {
    "id": 79,
    "name": "Slowpoke",
    "type1": "water",
    "type2": "psychic",
    "hp": 90,
    "atk": 65,
    "def": 65,
    "spAtk": 40,
    "spDef": 40,
    "speed": 15,
    "height": 12,
    "weight": 360,
    "evolutionStage": 1,
    "evolution1Name": "Slowbro",
    "evolution1Num": 80,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Whirlpool",
        "accuracy": 85,
        "power": 35,
        "type": "water",
        "category": "special"
      },
      {
        "name": "Water Gun",
        "accuracy": 100,
        "power": 40,
        "type": "water",
        "category": "special"
      },
      {
        "name": "Stored Power",
        "accuracy": 100,
        "power": 20,
        "type": "psychic",
        "category": "special"
      }
    ]
  },
  {
    "id": 80,
    "name": "Slowbro",
    "type1": "water",
    "type2": "psychic",
    "hp": 95,
    "atk": 75,
    "def": 110,
    "spAtk": 100,
    "spDef": 80,
    "speed": 30,
    "height": 16,
    "weight": 785,
    "evolutionStage": 2,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Razor Shell",
        "accuracy": 95,
        "power": 75,
        "type": "water",
        "category": "physical"
      },
      {
        "name": "Dive",
        "accuracy": 100,
        "power": 80,
        "type": "water",
        "category": "physical"
      },
      {
        "name": "Zen Headbutt",
        "accuracy": 90,
        "power": 80,
        "type": "psychic",
        "category": "physical"
      }
    ]
  },
  {
    "id": 81,
    "name": "Magnemite",
    "type1": "electric",
    "type2": "steel",
    "hp": 25,
    "atk": 35,
    "def": 70,
    "spAtk": 95,
    "spDef": 55,
    "speed": 45,
    "height": 3,
    "weight": 60,
    "evolutionStage": 1,
    "evolution1Name": "Magneton",
    "evolution1Num": 82,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Thunder Shock",
        "accuracy": 100,
        "power": 40,
        "type": "electric",
        "category": "special"
      },
      {
        "name": "Charge Beam",
        "accuracy": 90,
        "power": 50,
        "type": "electric",
        "category": "special"
      },
      {
        "name": "Magnet Bomb",
        "accuracy": 100,
        "power": 60,
        "type": "steel",
        "category": "physical"
      }
    ]
  },
  {
    "id": 82,
    "name": "Magneton",
    "type1": "electric",
    "type2": "steel",
    "hp": 50,
    "atk": 60,
    "def": 95,
    "spAtk": 120,
    "spDef": 70,
    "speed": 70,
    "height": 10,
    "weight": 600,
    "evolutionStage": 2,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Shock Wave",
        "accuracy": 100,
        "power": 60,
        "type": "electric",
        "category": "special"
      },
      {
        "name": "Spark",
        "accuracy": 100,
        "power": 65,
        "type": "electric",
        "category": "physical"
      },
      {
        "name": "Mirror Shot",
        "accuracy": 85,
        "power": 65,
        "type": "steel",
        "category": "special"
      }
    ]
  },
  {
    "id": 83,
    "name": "Farfetch'd",
    "type1": "normal",
    "type2": "flying",
    "hp": 52,
    "atk": 90,
    "def": 55,
    "spAtk": 58,
    "spDef": 62,
    "speed": 60,
    "height": 0,
    "weight": 0,
    "evolutionStage": 1,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Fury Attack",
        "accuracy": 85,
        "power": 15,
        "type": "normal",
        "category": "physical"
      },
      {
        "name": "Rage",
        "accuracy": 100,
        "power": 20,
        "type": "normal",
        "category": "physical"
      },
      {
        "name": "Peck",
        "accuracy": 100,
        "power": 35,
        "type": "flying",
        "category": "physical"
      }
    ]
  },
  {
    "id": 84,
    "name": "Doduo",
    "type1": "normal",
    "type2": "flying",
    "hp": 35,
    "atk": 85,
    "def": 45,
    "spAtk": 35,
    "spDef": 35,
    "speed": 75,
    "height": 14,
    "weight": 392,
    "evolutionStage": 1,
    "evolution1Name": "Dodrio",
    "evolution1Num": 85,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Fury Attack",
        "accuracy": 85,
        "power": 15,
        "type": "normal",
        "category": "physical"
      },
      {
        "name": "Rage",
        "accuracy": 100,
        "power": 20,
        "type": "normal",
        "category": "physical"
      },
      {
        "name": "Peck",
        "accuracy": 100,
        "power": 35,
        "type": "flying",
        "category": "physical"
      }
    ]
  },
  {
    "id": 85,
    "name": "Dodrio",
    "type1": "normal",
    "type2": "flying",
    "hp": 60,
    "atk": 110,
    "def": 70,
    "spAtk": 60,
    "spDef": 60,
    "speed": 110,
    "height": 18,
    "weight": 852,
    "evolutionStage": 2,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Snore",
        "accuracy": 100,
        "power": 50,
        "type": "normal",
        "category": "special"
      },
      {
        "name": "Swift",
        "accuracy": 100,
        "power": 60,
        "type": "normal",
        "category": "special"
      },
      {
        "name": "Acrobatics",
        "accuracy": 100,
        "power": 55,
        "type": "flying",
        "category": "physical"
      }
    ]
  },
  {
    "id": 86,
    "name": "Seel",
    "type1": "water",
    "type2": "",
    "hp": 65,
    "atk": 45,
    "def": 55,
    "spAtk": 45,
    "spDef": 70,
    "speed": 45,
    "height": 11,
    "weight": 900,
    "evolutionStage": 1,
    "evolution1Name": "Dewgong",
    "evolution1Num": 87,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Whirlpool",
        "accuracy": 85,
        "power": 35,
        "type": "water",
        "category": "special"
      },
      {
        "name": "Water Gun",
        "accuracy": 100,
        "power": 40,
        "type": "water",
        "category": "special"
      },
      {
        "name": "Aqua Jet",
        "accuracy": 100,
        "power": 40,
        "type": "water",
        "category": "physical"
      }
    ]
  },
  {
    "id": 87,
    "name": "Dewgong",
    "type1": "water",
    "type2": "ice",
    "hp": 90,
    "atk": 70,
    "def": 80,
    "spAtk": 70,
    "spDef": 95,
    "speed": 70,
    "height": 17,
    "weight": 1200,
    "evolutionStage": 2,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Brine",
        "accuracy": 100,
        "power": 65,
        "type": "water",
        "category": "special"
      },
      {
        "name": "Bubble Beam",
        "accuracy": 100,
        "power": 65,
        "type": "water",
        "category": "special"
      },
      {
        "name": "Aurora Beam",
        "accuracy": 100,
        "power": 65,
        "type": "ice",
        "category": "special"
      }
    ]
  },
  {
    "id": 88,
    "name": "Grimer",
    "type1": "poison",
    "type2": "",
    "hp": 80,
    "atk": 80,
    "def": 50,
    "spAtk": 40,
    "spDef": 50,
    "speed": 25,
    "height": 9,
    "weight": 300,
    "evolutionStage": 1,
    "evolution1Name": "Muk",
    "evolution1Num": 89,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Smog",
        "accuracy": 70,
        "power": 30,
        "type": "poison",
        "category": "special"
      },
      {
        "name": "Acid Spray",
        "accuracy": 100,
        "power": 40,
        "type": "poison",
        "category": "special"
      },
      {
        "name": "Gunk Shot",
        "accuracy": 80,
        "power": 120,
        "type": "poison",
        "category": "physical"
      }
    ]
  },
  {
    "id": 89,
    "name": "Muk",
    "type1": "poison",
    "type2": "",
    "hp": 105,
    "atk": 105,
    "def": 75,
    "spAtk": 65,
    "spDef": 100,
    "speed": 50,
    "height": 12,
    "weight": 300,
    "evolutionStage": 2,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Poison Jab",
        "accuracy": 100,
        "power": 80,
        "type": "poison",
        "category": "physical"
      },
      {
        "name": "Sludge Bomb",
        "accuracy": 100,
        "power": 90,
        "type": "poison",
        "category": "special"
      },
      {
        "name": "Belch",
        "accuracy": 90,
        "power": 120,
        "type": "poison",
        "category": "special"
      }
    ]
  },
  {
    "id": 90,
    "name": "Shellder",
    "type1": "water",
    "type2": "",
    "hp": 30,
    "atk": 65,
    "def": 100,
    "spAtk": 45,
    "spDef": 25,
    "speed": 40,
    "height": 3,
    "weight": 40,
    "evolutionStage": 1,
    "evolution1Name": "Cloyster",
    "evolution1Num": 91,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Clamp",
        "accuracy": 85,
        "power": 35,
        "type": "water",
        "category": "physical"
      },
      {
        "name": "Whirlpool",
        "accuracy": 85,
        "power": 35,
        "type": "water",
        "category": "special"
      },
      {
        "name": "Water Gun",
        "accuracy": 100,
        "power": 40,
        "type": "water",
        "category": "special"
      }
    ]
  },
  {
    "id": 91,
    "name": "Cloyster",
    "type1": "water",
    "type2": "ice",
    "hp": 50,
    "atk": 95,
    "def": 180,
    "spAtk": 85,
    "spDef": 45,
    "speed": 70,
    "height": 15,
    "weight": 1325,
    "evolutionStage": 2,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Water Pulse",
        "accuracy": 100,
        "power": 60,
        "type": "water",
        "category": "special"
      },
      {
        "name": "Bubble Beam",
        "accuracy": 100,
        "power": 65,
        "type": "water",
        "category": "special"
      },
      {
        "name": "Frost Breath",
        "accuracy": 90,
        "power": 60,
        "type": "ice",
        "category": "special"
      }
    ]
  },
  {
    "id": 92,
    "name": "Gastly",
    "type1": "ghost",
    "type2": "poison",
    "hp": 30,
    "atk": 35,
    "def": 30,
    "spAtk": 100,
    "spDef": 35,
    "speed": 80,
    "height": 13,
    "weight": 1,
    "evolutionStage": 1,
    "evolution1Name": "Haunter",
    "evolution1Num": 93,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Lick",
        "accuracy": 100,
        "power": 30,
        "type": "ghost",
        "category": "physical"
      },
      {
        "name": "Astonish",
        "accuracy": 100,
        "power": 30,
        "type": "ghost",
        "category": "physical"
      },
      {
        "name": "Smog",
        "accuracy": 70,
        "power": 30,
        "type": "poison",
        "category": "special"
      }
    ]
  },
  {
    "id": 93,
    "name": "Haunter",
    "type1": "ghost",
    "type2": "poison",
    "hp": 45,
    "atk": 50,
    "def": 45,
    "spAtk": 115,
    "spDef": 55,
    "speed": 95,
    "height": 16,
    "weight": 1,
    "evolutionStage": 2,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Shadow Claw",
        "accuracy": 100,
        "power": 70,
        "type": "ghost",
        "category": "physical"
      },
      {
        "name": "Shadow Ball",
        "accuracy": 100,
        "power": 80,
        "type": "ghost",
        "category": "special"
      },
      {
        "name": "Poison Jab",
        "accuracy": 100,
        "power": 80,
        "type": "poison",
        "category": "physical"
      }
    ]
  },
  {
    "id": 94,
    "name": "Gengar",
    "type1": "ghost",
    "type2": "poison",
    "hp": 60,
    "atk": 65,
    "def": 60,
    "spAtk": 130,
    "spDef": 75,
    "speed": 110,
    "height": 15,
    "weight": 405,
    "evolutionStage": 4,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Phantom Force",
        "accuracy": 100,
        "power": 90,
        "type": "ghost",
        "category": "physical"
      },
      {
        "name": "Poltergeist",
        "accuracy": 90,
        "power": 110,
        "type": "ghost",
        "category": "physical"
      },
      {
        "name": "Sludge Bomb",
        "accuracy": 100,
        "power": 90,
        "type": "poison",
        "category": "special"
      }
    ]
  },
  {
    "id": 95,
    "name": "Onix",
    "type1": "rock",
    "type2": "ground",
    "hp": 35,
    "atk": 45,
    "def": 160,
    "spAtk": 30,
    "spDef": 45,
    "speed": 70,
    "height": 88,
    "weight": 2100,
    "evolutionStage": 1,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Rock Blast",
        "accuracy": 90,
        "power": 25,
        "type": "rock",
        "category": "physical"
      },
      {
        "name": "Rollout",
        "accuracy": 90,
        "power": 30,
        "type": "rock",
        "category": "physical"
      },
      {
        "name": "Mud Slap",
        "accuracy": 100,
        "power": 20,
        "type": "ground",
        "category": "special"
      }
    ]
  },
  {
    "id": 96,
    "name": "Drowzee",
    "type1": "psychic",
    "type2": "",
    "hp": 60,
    "atk": 48,
    "def": 45,
    "spAtk": 43,
    "spDef": 90,
    "speed": 42,
    "height": 10,
    "weight": 324,
    "evolutionStage": 1,
    "evolution1Name": "Hypno",
    "evolution1Num": 97,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Stored Power",
        "accuracy": 100,
        "power": 20,
        "type": "psychic",
        "category": "special"
      },
      {
        "name": "Confusion",
        "accuracy": 100,
        "power": 50,
        "type": "psychic",
        "category": "special"
      },
      {
        "name": "Psybeam",
        "accuracy": 100,
        "power": 65,
        "type": "psychic",
        "category": "special"
      }
    ]
  },
  {
    "id": 97,
    "name": "Hypno",
    "type1": "psychic",
    "type2": "",
    "hp": 85,
    "atk": 73,
    "def": 70,
    "spAtk": 73,
    "spDef": 115,
    "speed": 67,
    "height": 16,
    "weight": 756,
    "evolutionStage": 2,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Zen Headbutt",
        "accuracy": 90,
        "power": 80,
        "type": "psychic",
        "category": "physical"
      },
      {
        "name": "Psyshock",
        "accuracy": 100,
        "power": 80,
        "type": "psychic",
        "category": "special"
      },
      {
        "name": "Expanding Force",
        "accuracy": 100,
        "power": 80,
        "type": "psychic",
        "category": "special"
      }
    ]
  },
  {
    "id": 98,
    "name": "Krabby",
    "type1": "water",
    "type2": "",
    "hp": 30,
    "atk": 105,
    "def": 90,
    "spAtk": 25,
    "spDef": 25,
    "speed": 50,
    "height": 4,
    "weight": 65,
    "evolutionStage": 1,
    "evolution1Name": "Kingler",
    "evolution1Num": 99,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Whirlpool",
        "accuracy": 85,
        "power": 35,
        "type": "water",
        "category": "special"
      },
      {
        "name": "Bubble",
        "accuracy": 100,
        "power": 40,
        "type": "water",
        "category": "special"
      },
      {
        "name": "Water Gun",
        "accuracy": 100,
        "power": 40,
        "type": "water",
        "category": "special"
      }
    ]
  },
  {
    "id": 99,
    "name": "Kingler",
    "type1": "water",
    "type2": "",
    "hp": 55,
    "atk": 130,
    "def": 115,
    "spAtk": 50,
    "spDef": 50,
    "speed": 75,
    "height": 13,
    "weight": 600,
    "evolutionStage": 2,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Water Pulse",
        "accuracy": 100,
        "power": 60,
        "type": "water",
        "category": "special"
      },
      {
        "name": "Bubble Beam",
        "accuracy": 100,
        "power": 65,
        "type": "water",
        "category": "special"
      },
      {
        "name": "Brine",
        "accuracy": 100,
        "power": 65,
        "type": "water",
        "category": "special"
      }
    ]
  },
  {
    "id": 100,
    "name": "Voltorb",
    "type1": "electric",
    "type2": "",
    "hp": 40,
    "atk": 30,
    "def": 50,
    "spAtk": 55,
    "spDef": 55,
    "speed": 100,
    "height": 5,
    "weight": 104,
    "evolutionStage": 1,
    "evolution1Name": "Electrode",
    "evolution1Num": 101,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Thunder Shock",
        "accuracy": 100,
        "power": 40,
        "type": "electric",
        "category": "special"
      },
      {
        "name": "Charge Beam",
        "accuracy": 90,
        "power": 50,
        "type": "electric",
        "category": "special"
      },
      {
        "name": "Electroweb",
        "accuracy": 95,
        "power": 55,
        "type": "electric",
        "category": "special"
      }
    ]
  },
  {
    "id": 101,
    "name": "Electrode",
    "type1": "electric",
    "type2": "",
    "hp": 60,
    "atk": 50,
    "def": 70,
    "spAtk": 80,
    "spDef": 80,
    "speed": 150,
    "height": 12,
    "weight": 666,
    "evolutionStage": 2,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Shock Wave",
        "accuracy": 100,
        "power": 60,
        "type": "electric",
        "category": "special"
      },
      {
        "name": "Spark",
        "accuracy": 100,
        "power": 65,
        "type": "electric",
        "category": "physical"
      },
      {
        "name": "Volt Switch",
        "accuracy": 100,
        "power": 70,
        "type": "electric",
        "category": "special"
      }
    ]
  },
  {
    "id": 102,
    "name": "Exeggcute",
    "type1": "grass",
    "type2": "psychic",
    "hp": 60,
    "atk": 40,
    "def": 80,
    "spAtk": 60,
    "spDef": 45,
    "speed": 40,
    "height": 4,
    "weight": 25,
    "evolutionStage": 1,
    "evolution1Name": "Exeggutor",
    "evolution1Num": 103,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Absorb",
        "accuracy": 100,
        "power": 20,
        "type": "grass",
        "category": "special"
      },
      {
        "name": "Bullet Seed",
        "accuracy": 100,
        "power": 25,
        "type": "grass",
        "category": "physical"
      },
      {
        "name": "Stored Power",
        "accuracy": 100,
        "power": 20,
        "type": "psychic",
        "category": "special"
      }
    ]
  },
  {
    "id": 103,
    "name": "Exeggutor",
    "type1": "grass",
    "type2": "psychic",
    "hp": 95,
    "atk": 95,
    "def": 85,
    "spAtk": 125,
    "spDef": 75,
    "speed": 55,
    "height": 20,
    "weight": 1200,
    "evolutionStage": 2,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Grassy Glide",
        "accuracy": 100,
        "power": 70,
        "type": "grass",
        "category": "physical"
      },
      {
        "name": "Giga Drain",
        "accuracy": 100,
        "power": 75,
        "type": "grass",
        "category": "special"
      },
      {
        "name": "Psycho Cut",
        "accuracy": 100,
        "power": 70,
        "type": "psychic",
        "category": "physical"
      }
    ]
  },
  {
    "id": 104,
    "name": "Cubone",
    "type1": "ground",
    "type2": "",
    "hp": 50,
    "atk": 50,
    "def": 95,
    "spAtk": 40,
    "spDef": 50,
    "speed": 35,
    "height": 4,
    "weight": 65,
    "evolutionStage": 1,
    "evolution1Name": "Marowak",
    "evolution1Num": 105,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Mud Slap",
        "accuracy": 100,
        "power": 20,
        "type": "ground",
        "category": "special"
      },
      {
        "name": "Bone Rush",
        "accuracy": 90,
        "power": 25,
        "type": "ground",
        "category": "physical"
      },
      {
        "name": "Bonemerang",
        "accuracy": 90,
        "power": 50,
        "type": "ground",
        "category": "physical"
      }
    ]
  },
  {
    "id": 105,
    "name": "Marowak",
    "type1": "ground",
    "type2": "",
    "hp": 60,
    "atk": 80,
    "def": 110,
    "spAtk": 50,
    "spDef": 80,
    "speed": 45,
    "height": 10,
    "weight": 450,
    "evolutionStage": 2,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Bone Club",
        "accuracy": 85,
        "power": 65,
        "type": "ground",
        "category": "physical"
      },
      {
        "name": "Scorching Sands",
        "accuracy": 100,
        "power": 70,
        "type": "ground",
        "category": "special"
      },
      {
        "name": "Stomping Tantrum",
        "accuracy": 100,
        "power": 75,
        "type": "ground",
        "category": "physical"
      }
    ]
  },
  {
    "id": 106,
    "name": "Hitmonlee",
    "type1": "fighting",
    "type2": "",
    "hp": 50,
    "atk": 120,
    "def": 53,
    "spAtk": 35,
    "spDef": 110,
    "speed": 87,
    "height": 15,
    "weight": 498,
    "evolutionStage": 2,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Rolling Kick",
        "accuracy": 85,
        "power": 60,
        "type": "fighting",
        "category": "physical"
      },
      {
        "name": "Revenge",
        "accuracy": 100,
        "power": 60,
        "type": "fighting",
        "category": "physical"
      },
      {
        "name": "Low Sweep",
        "accuracy": 100,
        "power": 65,
        "type": "fighting",
        "category": "physical"
      }
    ]
  },
  {
    "id": 107,
    "name": "Hitmonchan",
    "type1": "fighting",
    "type2": "",
    "hp": 50,
    "atk": 105,
    "def": 79,
    "spAtk": 35,
    "spDef": 110,
    "speed": 76,
    "height": 14,
    "weight": 502,
    "evolutionStage": 1,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Mach Punch",
        "accuracy": 100,
        "power": 40,
        "type": "fighting",
        "category": "physical"
      },
      {
        "name": "Rock Smash",
        "accuracy": 100,
        "power": 40,
        "type": "fighting",
        "category": "physical"
      },
      {
        "name": "Vacuum Wave",
        "accuracy": 100,
        "power": 40,
        "type": "fighting",
        "category": "special"
      }
    ]
  },
  {
    "id": 108,
    "name": "Lickitung",
    "type1": "normal",
    "type2": "",
    "hp": 90,
    "atk": 55,
    "def": 75,
    "spAtk": 60,
    "spDef": 75,
    "speed": 30,
    "height": 12,
    "weight": 655,
    "evolutionStage": 1,
    "evolution1Name": "Lickilicky",
    "evolution1Num": 463,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Wrap",
        "accuracy": 90,
        "power": 15,
        "type": "normal",
        "category": "physical"
      },
      {
        "name": "Bind",
        "accuracy": 85,
        "power": 15,
        "type": "normal",
        "category": "physical"
      },
      {
        "name": "Rage",
        "accuracy": 100,
        "power": 20,
        "type": "normal",
        "category": "physical"
      }
    ]
  },
  {
    "id": 109,
    "name": "Koffing",
    "type1": "poison",
    "type2": "",
    "hp": 40,
    "atk": 65,
    "def": 95,
    "spAtk": 60,
    "spDef": 45,
    "speed": 35,
    "height": 6,
    "weight": 10,
    "evolutionStage": 1,
    "evolution1Name": "Weezing",
    "evolution1Num": 110,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Smog",
        "accuracy": 70,
        "power": 30,
        "type": "poison",
        "category": "special"
      },
      {
        "name": "Acid Spray",
        "accuracy": 100,
        "power": 40,
        "type": "poison",
        "category": "special"
      },
      {
        "name": "Clear Smog",
        "accuracy": 100,
        "power": 50,
        "type": "poison",
        "category": "special"
      }
    ]
  },
  {
    "id": 110,
    "name": "Weezing",
    "type1": "poison",
    "type2": "",
    "hp": 65,
    "atk": 90,
    "def": 120,
    "spAtk": 85,
    "spDef": 70,
    "speed": 60,
    "height": 12,
    "weight": 95,
    "evolutionStage": 2,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Sludge",
        "accuracy": 100,
        "power": 65,
        "type": "poison",
        "category": "special"
      },
      {
        "name": "Venoshock",
        "accuracy": 100,
        "power": 65,
        "type": "poison",
        "category": "special"
      },
      {
        "name": "Sludge Bomb",
        "accuracy": 100,
        "power": 90,
        "type": "poison",
        "category": "special"
      }
    ]
  },
  {
    "id": 111,
    "name": "Rhyhorn",
    "type1": "ground",
    "type2": "rock",
    "hp": 80,
    "atk": 85,
    "def": 95,
    "spAtk": 30,
    "spDef": 30,
    "speed": 25,
    "height": 10,
    "weight": 1150,
    "evolutionStage": 1,
    "evolution1Name": "Rhydon",
    "evolution1Num": 112,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Mud Slap",
        "accuracy": 100,
        "power": 20,
        "type": "ground",
        "category": "special"
      },
      {
        "name": "Mud Shot",
        "accuracy": 95,
        "power": 55,
        "type": "ground",
        "category": "special"
      },
      {
        "name": "Rock Blast",
        "accuracy": 90,
        "power": 25,
        "type": "rock",
        "category": "physical"
      }
    ]
  },
  {
    "id": 112,
    "name": "Rhydon",
    "type1": "ground",
    "type2": "rock",
    "hp": 105,
    "atk": 130,
    "def": 120,
    "spAtk": 45,
    "spDef": 45,
    "speed": 40,
    "height": 19,
    "weight": 1200,
    "evolutionStage": 2,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Scorching Sands",
        "accuracy": 100,
        "power": 70,
        "type": "ground",
        "category": "special"
      },
      {
        "name": "Stomping Tantrum",
        "accuracy": 100,
        "power": 75,
        "type": "ground",
        "category": "physical"
      },
      {
        "name": "Rock Slide",
        "accuracy": 90,
        "power": 75,
        "type": "rock",
        "category": "physical"
      }
    ]
  },
  {
    "id": 113,
    "name": "Chansey",
    "type1": "normal",
    "type2": "",
    "hp": 250,
    "atk": 5,
    "def": 5,
    "spAtk": 35,
    "spDef": 105,
    "speed": 50,
    "height": 11,
    "weight": 346,
    "evolutionStage": 3,
    "evolution1Name": "Blissey",
    "evolution1Num": 242,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Egg Bomb",
        "accuracy": 75,
        "power": 100,
        "type": "normal",
        "category": "physical"
      },
      {
        "name": "Double Edge",
        "accuracy": 100,
        "power": 120,
        "type": "normal",
        "category": "physical"
      },
      {
        "name": "Mega Kick",
        "accuracy": 75,
        "power": 120,
        "type": "normal",
        "category": "physical"
      }
    ]
  },
  {
    "id": 114,
    "name": "Tangela",
    "type1": "grass",
    "type2": "",
    "hp": 65,
    "atk": 55,
    "def": 115,
    "spAtk": 100,
    "spDef": 40,
    "speed": 60,
    "height": 10,
    "weight": 350,
    "evolutionStage": 1,
    "evolution1Name": "Tangrowth",
    "evolution1Num": 465,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Absorb",
        "accuracy": 100,
        "power": 20,
        "type": "grass",
        "category": "special"
      },
      {
        "name": "Bullet Seed",
        "accuracy": 100,
        "power": 25,
        "type": "grass",
        "category": "physical"
      },
      {
        "name": "Mega Drain",
        "accuracy": 100,
        "power": 40,
        "type": "grass",
        "category": "special"
      }
    ]
  },
  {
    "id": 115,
    "name": "Kangaskhan",
    "type1": "normal",
    "type2": "",
    "hp": 105,
    "atk": 95,
    "def": 80,
    "spAtk": 40,
    "spDef": 80,
    "speed": 90,
    "height": 22,
    "weight": 800,
    "evolutionStage": 1,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Comet Punch",
        "accuracy": 85,
        "power": 18,
        "type": "normal",
        "category": "physical"
      },
      {
        "name": "Rage",
        "accuracy": 100,
        "power": 20,
        "type": "normal",
        "category": "physical"
      },
      {
        "name": "Double Hit",
        "accuracy": 90,
        "power": 35,
        "type": "normal",
        "category": "physical"
      }
    ]
  },
  {
    "id": 116,
    "name": "Horsea",
    "type1": "water",
    "type2": "",
    "hp": 30,
    "atk": 40,
    "def": 70,
    "spAtk": 70,
    "spDef": 25,
    "speed": 60,
    "height": 4,
    "weight": 80,
    "evolutionStage": 1,
    "evolution1Name": "Seadra",
    "evolution1Num": 117,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Whirlpool",
        "accuracy": 85,
        "power": 35,
        "type": "water",
        "category": "special"
      },
      {
        "name": "Bubble",
        "accuracy": 100,
        "power": 40,
        "type": "water",
        "category": "special"
      },
      {
        "name": "Water Gun",
        "accuracy": 100,
        "power": 40,
        "type": "water",
        "category": "special"
      }
    ]
  },
  {
    "id": 117,
    "name": "Seadra",
    "type1": "water",
    "type2": "",
    "hp": 55,
    "atk": 65,
    "def": 95,
    "spAtk": 95,
    "spDef": 45,
    "speed": 85,
    "height": 12,
    "weight": 250,
    "evolutionStage": 2,
    "evolution1Name": "Kingdra",
    "evolution1Num": 230,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Flip Turn",
        "accuracy": 100,
        "power": 60,
        "type": "water",
        "category": "physical"
      },
      {
        "name": "Water Pulse",
        "accuracy": 100,
        "power": 60,
        "type": "water",
        "category": "special"
      },
      {
        "name": "Bubble Beam",
        "accuracy": 100,
        "power": 65,
        "type": "water",
        "category": "special"
      }
    ]
  },
  {
    "id": 118,
    "name": "Goldeen",
    "type1": "water",
    "type2": "",
    "hp": 45,
    "atk": 67,
    "def": 60,
    "spAtk": 35,
    "spDef": 50,
    "speed": 63,
    "height": 6,
    "weight": 150,
    "evolutionStage": 1,
    "evolution1Name": "Seaking",
    "evolution1Num": 119,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Whirlpool",
        "accuracy": 85,
        "power": 35,
        "type": "water",
        "category": "special"
      },
      {
        "name": "Water Gun",
        "accuracy": 100,
        "power": 40,
        "type": "water",
        "category": "special"
      },
      {
        "name": "Water Pulse",
        "accuracy": 100,
        "power": 60,
        "type": "water",
        "category": "special"
      }
    ]
  },
  {
    "id": 119,
    "name": "Seaking",
    "type1": "water",
    "type2": "",
    "hp": 80,
    "atk": 92,
    "def": 65,
    "spAtk": 65,
    "spDef": 80,
    "speed": 68,
    "height": 13,
    "weight": 390,
    "evolutionStage": 2,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Waterfall",
        "accuracy": 100,
        "power": 80,
        "type": "water",
        "category": "physical"
      },
      {
        "name": "Dive",
        "accuracy": 100,
        "power": 80,
        "type": "water",
        "category": "physical"
      },
      {
        "name": "Scald",
        "accuracy": 100,
        "power": 80,
        "type": "water",
        "category": "special"
      }
    ]
  },
  {
    "id": 120,
    "name": "Staryu",
    "type1": "water",
    "type2": "",
    "hp": 30,
    "atk": 45,
    "def": 55,
    "spAtk": 70,
    "spDef": 55,
    "speed": 85,
    "height": 8,
    "weight": 345,
    "evolutionStage": 1,
    "evolution1Name": "Starmie",
    "evolution1Num": 121,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Whirlpool",
        "accuracy": 85,
        "power": 35,
        "type": "water",
        "category": "special"
      },
      {
        "name": "Water Gun",
        "accuracy": 100,
        "power": 40,
        "type": "water",
        "category": "special"
      },
      {
        "name": "Water Pulse",
        "accuracy": 100,
        "power": 60,
        "type": "water",
        "category": "special"
      }
    ]
  },
  {
    "id": 121,
    "name": "Starmie",
    "type1": "water",
    "type2": "psychic",
    "hp": 60,
    "atk": 75,
    "def": 85,
    "spAtk": 100,
    "spDef": 85,
    "speed": 115,
    "height": 11,
    "weight": 800,
    "evolutionStage": 2,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Brine",
        "accuracy": 100,
        "power": 65,
        "type": "water",
        "category": "special"
      },
      {
        "name": "Waterfall",
        "accuracy": 100,
        "power": 80,
        "type": "water",
        "category": "physical"
      },
      {
        "name": "Psycho Cut",
        "accuracy": 100,
        "power": 70,
        "type": "psychic",
        "category": "physical"
      }
    ]
  },
  {
    "id": 123,
    "name": "Scyther",
    "type1": "bug",
    "type2": "flying",
    "hp": 70,
    "atk": 110,
    "def": 80,
    "spAtk": 55,
    "spDef": 80,
    "speed": 105,
    "height": 15,
    "weight": 560,
    "evolutionStage": 1,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Fury Cutter",
        "accuracy": 95,
        "power": 40,
        "type": "bug",
        "category": "physical"
      },
      {
        "name": "Struggle Bug",
        "accuracy": 100,
        "power": 50,
        "type": "bug",
        "category": "special"
      },
      {
        "name": "Dual Wingbeat",
        "accuracy": 90,
        "power": 40,
        "type": "flying",
        "category": "physical"
      }
    ]
  },
  {
    "id": 124,
    "name": "Jynx",
    "type1": "ice",
    "type2": "psychic",
    "hp": 65,
    "atk": 50,
    "def": 35,
    "spAtk": 115,
    "spDef": 95,
    "speed": 95,
    "height": 14,
    "weight": 406,
    "evolutionStage": 2,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Avalanche",
        "accuracy": 100,
        "power": 60,
        "type": "ice",
        "category": "physical"
      },
      {
        "name": "Frost Breath",
        "accuracy": 90,
        "power": 60,
        "type": "ice",
        "category": "special"
      },
      {
        "name": "Heart Stamp",
        "accuracy": 100,
        "power": 60,
        "type": "psychic",
        "category": "physical"
      }
    ]
  },
  {
    "id": 125,
    "name": "Electabuzz",
    "type1": "electric",
    "type2": "",
    "hp": 65,
    "atk": 83,
    "def": 57,
    "spAtk": 95,
    "spDef": 85,
    "speed": 105,
    "height": 11,
    "weight": 300,
    "evolutionStage": 2,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Spark",
        "accuracy": 100,
        "power": 65,
        "type": "electric",
        "category": "physical"
      },
      {
        "name": "Volt Switch",
        "accuracy": 100,
        "power": 70,
        "type": "electric",
        "category": "special"
      },
      {
        "name": "Rising Voltage",
        "accuracy": 100,
        "power": 70,
        "type": "electric",
        "category": "special"
      }
    ]
  },
  {
    "id": 126,
    "name": "Magmar",
    "type1": "fire",
    "type2": "",
    "hp": 65,
    "atk": 95,
    "def": 57,
    "spAtk": 100,
    "spDef": 85,
    "speed": 93,
    "height": 13,
    "weight": 445,
    "evolutionStage": 2,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Flame Burst",
        "accuracy": 100,
        "power": 70,
        "type": "fire",
        "category": "special"
      },
      {
        "name": "Burning Jealousy",
        "accuracy": 100,
        "power": 70,
        "type": "fire",
        "category": "special"
      },
      {
        "name": "Fire Punch",
        "accuracy": 100,
        "power": 75,
        "type": "fire",
        "category": "physical"
      }
    ]
  },
  {
    "id": 127,
    "name": "Pinsir",
    "type1": "bug",
    "type2": "",
    "hp": 65,
    "atk": 125,
    "def": 100,
    "spAtk": 55,
    "spDef": 70,
    "speed": 85,
    "height": 15,
    "weight": 550,
    "evolutionStage": 1,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Fury Cutter",
        "accuracy": 95,
        "power": 40,
        "type": "bug",
        "category": "physical"
      },
      {
        "name": "Struggle Bug",
        "accuracy": 100,
        "power": 50,
        "type": "bug",
        "category": "special"
      },
      {
        "name": "Bug Bite",
        "accuracy": 100,
        "power": 60,
        "type": "bug",
        "category": "physical"
      }
    ]
  },
  {
    "id": 128,
    "name": "Tauros",
    "type1": "normal",
    "type2": "",
    "hp": 75,
    "atk": 100,
    "def": 95,
    "spAtk": 40,
    "spDef": 70,
    "speed": 110,
    "height": 14,
    "weight": 884,
    "evolutionStage": 1,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Rage",
        "accuracy": 100,
        "power": 20,
        "type": "normal",
        "category": "physical"
      },
      {
        "name": "Tackle",
        "accuracy": 100,
        "power": 40,
        "type": "normal",
        "category": "physical"
      },
      {
        "name": "Snore",
        "accuracy": 100,
        "power": 50,
        "type": "normal",
        "category": "special"
      }
    ]
  },
  {
    "id": 129,
    "name": "Magikarp",
    "type1": "water",
    "type2": "",
    "hp": 20,
    "atk": 10,
    "def": 55,
    "spAtk": 15,
    "spDef": 20,
    "speed": 80,
    "height": 9,
    "weight": 100,
    "evolutionStage": 1,
    "evolution1Name": "Gyarados",
    "evolution1Num": 130,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Water Gun",
        "accuracy": 100,
        "power": 40,
        "type": "water",
        "category": "special"
      },
      {
        "name": "Bubble",
        "accuracy": 100,
        "power": 40,
        "type": "water",
        "category": "special"
      },
      {
        "name": "Aqua Jet",
        "accuracy": 100,
        "power": 40,
        "type": "water",
        "category": "physical"
      }
    ]
  },
  {
    "id": 130,
    "name": "Gyarados",
    "type1": "water",
    "type2": "flying",
    "hp": 95,
    "atk": 125,
    "def": 79,
    "spAtk": 60,
    "spDef": 100,
    "speed": 81,
    "height": 65,
    "weight": 2350,
    "evolutionStage": 2,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Waterfall",
        "accuracy": 100,
        "power": 80,
        "type": "water",
        "category": "physical"
      },
      {
        "name": "Dive",
        "accuracy": 100,
        "power": 80,
        "type": "water",
        "category": "physical"
      },
      {
        "name": "Bounce",
        "accuracy": 85,
        "power": 85,
        "type": "flying",
        "category": "physical"
      }
    ]
  },
  {
    "id": 131,
    "name": "Lapras",
    "type1": "water",
    "type2": "ice",
    "hp": 130,
    "atk": 85,
    "def": 80,
    "spAtk": 85,
    "spDef": 95,
    "speed": 60,
    "height": 25,
    "weight": 2200,
    "evolutionStage": 1,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Whirlpool",
        "accuracy": 85,
        "power": 35,
        "type": "water",
        "category": "special"
      },
      {
        "name": "Water Gun",
        "accuracy": 100,
        "power": 40,
        "type": "water",
        "category": "special"
      },
      {
        "name": "Icicle Spear",
        "accuracy": 100,
        "power": 25,
        "type": "ice",
        "category": "physical"
      }
    ]
  },
  {
    "id": 132,
    "name": "Ditto",
    "type1": "normal",
    "type2": "",
    "hp": 48,
    "atk": 48,
    "def": 48,
    "spAtk": 48,
    "spDef": 48,
    "speed": 48,
    "height": 3,
    "weight": 40,
    "evolutionStage": 1,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Egg Bomb",
        "accuracy": 75,
        "power": 100,
        "type": "normal",
        "category": "physical"
      },
      {
        "name": "Judgment",
        "accuracy": 100,
        "power": 100,
        "type": "normal",
        "category": "special"
      },
      {
        "name": "Take Down",
        "accuracy": 85,
        "power": 90,
        "type": "normal",
        "category": "physical"
      }
    ]
  },
  {
    "id": 133,
    "name": "Eevee",
    "type1": "normal",
    "type2": "",
    "hp": 55,
    "atk": 55,
    "def": 50,
    "spAtk": 45,
    "spDef": 65,
    "speed": 55,
    "height": 3,
    "weight": 65,
    "evolutionStage": 1,
    "evolution1Name": "Vaporeon",
    "evolution1Num": 134,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Rage",
        "accuracy": 100,
        "power": 20,
        "type": "normal",
        "category": "physical"
      },
      {
        "name": "Tackle",
        "accuracy": 100,
        "power": 40,
        "type": "normal",
        "category": "physical"
      },
      {
        "name": "Quick Attack",
        "accuracy": 100,
        "power": 40,
        "type": "normal",
        "category": "physical"
      }
    ]
  },
  {
    "id": 134,
    "name": "Vaporeon",
    "type1": "water",
    "type2": "",
    "hp": 130,
    "atk": 65,
    "def": 60,
    "spAtk": 110,
    "spDef": 95,
    "speed": 65,
    "height": 10,
    "weight": 290,
    "evolutionStage": 2,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Water Pulse",
        "accuracy": 100,
        "power": 60,
        "type": "water",
        "category": "special"
      },
      {
        "name": "Flip Turn",
        "accuracy": 100,
        "power": 60,
        "type": "water",
        "category": "physical"
      },
      {
        "name": "Bubble Beam",
        "accuracy": 100,
        "power": 65,
        "type": "water",
        "category": "special"
      }
    ]
  },
  {
    "id": 135,
    "name": "Jolteon",
    "type1": "electric",
    "type2": "",
    "hp": 65,
    "atk": 65,
    "def": 60,
    "spAtk": 110,
    "spDef": 95,
    "speed": 130,
    "height": 8,
    "weight": 245,
    "evolutionStage": 1,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Thunder Shock",
        "accuracy": 100,
        "power": 40,
        "type": "electric",
        "category": "special"
      },
      {
        "name": "Charge Beam",
        "accuracy": 90,
        "power": 50,
        "type": "electric",
        "category": "special"
      },
      {
        "name": "Electroweb",
        "accuracy": 95,
        "power": 55,
        "type": "electric",
        "category": "special"
      }
    ]
  },
  {
    "id": 136,
    "name": "Flareon",
    "type1": "fire",
    "type2": "",
    "hp": 65,
    "atk": 130,
    "def": 60,
    "spAtk": 95,
    "spDef": 110,
    "speed": 65,
    "height": 9,
    "weight": 250,
    "evolutionStage": 1,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Fire Spin",
        "accuracy": 85,
        "power": 35,
        "type": "fire",
        "category": "special"
      },
      {
        "name": "Ember",
        "accuracy": 100,
        "power": 40,
        "type": "fire",
        "category": "special"
      },
      {
        "name": "Flame Charge",
        "accuracy": 100,
        "power": 50,
        "type": "fire",
        "category": "physical"
      }
    ]
  },
  {
    "id": 137,
    "name": "Porygon",
    "type1": "normal",
    "type2": "",
    "hp": 65,
    "atk": 60,
    "def": 70,
    "spAtk": 85,
    "spDef": 75,
    "speed": 40,
    "height": 8,
    "weight": 365,
    "evolutionStage": 1,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Rage",
        "accuracy": 100,
        "power": 20,
        "type": "normal",
        "category": "physical"
      },
      {
        "name": "Tackle",
        "accuracy": 100,
        "power": 40,
        "type": "normal",
        "category": "physical"
      },
      {
        "name": "Snore",
        "accuracy": 100,
        "power": 50,
        "type": "normal",
        "category": "special"
      }
    ]
  },
  {
    "id": 138,
    "name": "Omanyte",
    "type1": "rock",
    "type2": "water",
    "hp": 35,
    "atk": 40,
    "def": 100,
    "spAtk": 90,
    "spDef": 55,
    "speed": 35,
    "height": 4,
    "weight": 75,
    "evolutionStage": 1,
    "evolution1Name": "Omastar",
    "evolution1Num": 139,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Rock Blast",
        "accuracy": 90,
        "power": 25,
        "type": "rock",
        "category": "physical"
      },
      {
        "name": "Rollout",
        "accuracy": 90,
        "power": 30,
        "type": "rock",
        "category": "physical"
      },
      {
        "name": "Whirlpool",
        "accuracy": 85,
        "power": 35,
        "type": "water",
        "category": "special"
      }
    ]
  },
  {
    "id": 139,
    "name": "Omastar",
    "type1": "rock",
    "type2": "water",
    "hp": 70,
    "atk": 60,
    "def": 125,
    "spAtk": 115,
    "spDef": 70,
    "speed": 55,
    "height": 10,
    "weight": 350,
    "evolutionStage": 2,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Ancient Power",
        "accuracy": 100,
        "power": 60,
        "type": "rock",
        "category": "special"
      },
      {
        "name": "Rock Tomb",
        "accuracy": 95,
        "power": 60,
        "type": "rock",
        "category": "physical"
      },
      {
        "name": "Water Pulse",
        "accuracy": 100,
        "power": 60,
        "type": "water",
        "category": "special"
      }
    ]
  },
  {
    "id": 140,
    "name": "Kabuto",
    "type1": "rock",
    "type2": "water",
    "hp": 30,
    "atk": 80,
    "def": 90,
    "spAtk": 55,
    "spDef": 45,
    "speed": 55,
    "height": 5,
    "weight": 115,
    "evolutionStage": 1,
    "evolution1Name": "Kabutops",
    "evolution1Num": 141,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Rock Blast",
        "accuracy": 90,
        "power": 25,
        "type": "rock",
        "category": "physical"
      },
      {
        "name": "Rollout",
        "accuracy": 90,
        "power": 30,
        "type": "rock",
        "category": "physical"
      },
      {
        "name": "Whirlpool",
        "accuracy": 85,
        "power": 35,
        "type": "water",
        "category": "special"
      }
    ]
  },
  {
    "id": 141,
    "name": "Kabutops",
    "type1": "rock",
    "type2": "water",
    "hp": 60,
    "atk": 115,
    "def": 105,
    "spAtk": 65,
    "spDef": 70,
    "speed": 80,
    "height": 13,
    "weight": 405,
    "evolutionStage": 2,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Rock Tomb",
        "accuracy": 95,
        "power": 60,
        "type": "rock",
        "category": "physical"
      },
      {
        "name": "Ancient Power",
        "accuracy": 100,
        "power": 60,
        "type": "rock",
        "category": "special"
      },
      {
        "name": "Water Pulse",
        "accuracy": 100,
        "power": 60,
        "type": "water",
        "category": "special"
      }
    ]
  },
  {
    "id": 142,
    "name": "Aerodactyl",
    "type1": "rock",
    "type2": "flying",
    "hp": 80,
    "atk": 105,
    "def": 65,
    "spAtk": 60,
    "spDef": 75,
    "speed": 130,
    "height": 18,
    "weight": 590,
    "evolutionStage": 1,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Rock Blast",
        "accuracy": 90,
        "power": 25,
        "type": "rock",
        "category": "physical"
      },
      {
        "name": "Smack Down",
        "accuracy": 100,
        "power": 50,
        "type": "rock",
        "category": "physical"
      },
      {
        "name": "Dual Wingbeat",
        "accuracy": 90,
        "power": 40,
        "type": "flying",
        "category": "physical"
      }
    ]
  },
  {
    "id": 143,
    "name": "Snorlax",
    "type1": "normal",
    "type2": "",
    "hp": 160,
    "atk": 110,
    "def": 65,
    "spAtk": 65,
    "spDef": 110,
    "speed": 30,
    "height": 21,
    "weight": 4600,
    "evolutionStage": 2,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Retaliate",
        "accuracy": 100,
        "power": 70,
        "type": "normal",
        "category": "physical"
      },
      {
        "name": "Facade",
        "accuracy": 100,
        "power": 70,
        "type": "normal",
        "category": "physical"
      },
      {
        "name": "Mega Punch",
        "accuracy": 85,
        "power": 80,
        "type": "normal",
        "category": "physical"
      }
    ]
  },
  {
    "id": 144,
    "name": "Articuno",
    "type1": "ice",
    "type2": "flying",
    "hp": 90,
    "atk": 85,
    "def": 100,
    "spAtk": 95,
    "spDef": 125,
    "speed": 85,
    "height": 17,
    "weight": 554,
    "evolutionStage": 1,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Triple Axel",
        "accuracy": 90,
        "power": 20,
        "type": "ice",
        "category": "physical"
      },
      {
        "name": "Icicle Spear",
        "accuracy": 100,
        "power": 25,
        "type": "ice",
        "category": "physical"
      },
      {
        "name": "Peck",
        "accuracy": 100,
        "power": 35,
        "type": "flying",
        "category": "physical"
      }
    ]
  },
  {
    "id": 145,
    "name": "Zapdos",
    "type1": "electric",
    "type2": "flying",
    "hp": 90,
    "atk": 90,
    "def": 85,
    "spAtk": 125,
    "spDef": 90,
    "speed": 100,
    "height": 16,
    "weight": 526,
    "evolutionStage": 1,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Thunder Shock",
        "accuracy": 100,
        "power": 40,
        "type": "electric",
        "category": "special"
      },
      {
        "name": "Charge Beam",
        "accuracy": 90,
        "power": 50,
        "type": "electric",
        "category": "special"
      },
      {
        "name": "Peck",
        "accuracy": 100,
        "power": 35,
        "type": "flying",
        "category": "physical"
      }
    ]
  },
  {
    "id": 146,
    "name": "Moltres",
    "type1": "fire",
    "type2": "flying",
    "hp": 90,
    "atk": 100,
    "def": 90,
    "spAtk": 125,
    "spDef": 85,
    "speed": 90,
    "height": 20,
    "weight": 600,
    "evolutionStage": 1,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Fire Spin",
        "accuracy": 85,
        "power": 35,
        "type": "fire",
        "category": "special"
      },
      {
        "name": "Ember",
        "accuracy": 100,
        "power": 40,
        "type": "fire",
        "category": "special"
      },
      {
        "name": "Peck",
        "accuracy": 100,
        "power": 35,
        "type": "flying",
        "category": "physical"
      }
    ]
  },
  {
    "id": 147,
    "name": "Dratini",
    "type1": "dragon",
    "type2": "",
    "hp": 41,
    "atk": 64,
    "def": 45,
    "spAtk": 50,
    "spDef": 50,
    "speed": 50,
    "height": 18,
    "weight": 33,
    "evolutionStage": 1,
    "evolution1Name": "Dragonair",
    "evolution1Num": 148,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Scale Shot",
        "accuracy": 90,
        "power": 25,
        "type": "dragon",
        "category": "physical"
      },
      {
        "name": "Twister",
        "accuracy": 100,
        "power": 40,
        "type": "dragon",
        "category": "special"
      },
      {
        "name": "Dragon Breath",
        "accuracy": 100,
        "power": 60,
        "type": "dragon",
        "category": "special"
      }
    ]
  },
  {
    "id": 148,
    "name": "Dragonair",
    "type1": "dragon",
    "type2": "",
    "hp": 61,
    "atk": 84,
    "def": 65,
    "spAtk": 70,
    "spDef": 70,
    "speed": 70,
    "height": 40,
    "weight": 165,
    "evolutionStage": 2,
    "evolution1Name": "Dragonite",
    "evolution1Num": 149,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Dragon Pulse",
        "accuracy": 100,
        "power": 85,
        "type": "dragon",
        "category": "special"
      },
      {
        "name": "Outrage",
        "accuracy": 100,
        "power": 120,
        "type": "dragon",
        "category": "physical"
      },
      {
        "name": "Draco Meteor",
        "accuracy": 90,
        "power": 130,
        "type": "dragon",
        "category": "special"
      }
    ]
  },
  {
    "id": 149,
    "name": "Dragonite",
    "type1": "dragon",
    "type2": "flying",
    "hp": 91,
    "atk": 134,
    "def": 95,
    "spAtk": 100,
    "spDef": 100,
    "speed": 80,
    "height": 22,
    "weight": 2100,
    "evolutionStage": 3,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Dragon Rush",
        "accuracy": 75,
        "power": 100,
        "type": "dragon",
        "category": "physical"
      },
      {
        "name": "Fly",
        "accuracy": 95,
        "power": 90,
        "type": "flying",
        "category": "physical"
      },
      {
        "name": "Clangorous Soulblaze",
        "accuracy": 100,
        "power": 185,
        "type": "dragon",
        "category": "special"
      }
    ]
  },
  {
    "id": 150,
    "name": "Mewtwo",
    "type1": "psychic",
    "type2": "",
    "hp": 106,
    "atk": 110,
    "def": 90,
    "spAtk": 154,
    "spDef": 90,
    "speed": 130,
    "height": 20,
    "weight": 1220,
    "evolutionStage": 1,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Stored Power",
        "accuracy": 100,
        "power": 20,
        "type": "psychic",
        "category": "special"
      },
      {
        "name": "Confusion",
        "accuracy": 100,
        "power": 50,
        "type": "psychic",
        "category": "special"
      },
      {
        "name": "Psybeam",
        "accuracy": 100,
        "power": 65,
        "type": "psychic",
        "category": "special"
      }
    ]
  },
  {
    "id": 151,
    "name": "Mew",
    "type1": "psychic",
    "type2": "",
    "hp": 100,
    "atk": 100,
    "def": 100,
    "spAtk": 100,
    "spDef": 100,
    "speed": 100,
    "height": 4,
    "weight": 40,
    "evolutionStage": 1,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Stored Power",
        "accuracy": 100,
        "power": 20,
        "type": "psychic",
        "category": "special"
      },
      {
        "name": "Confusion",
        "accuracy": 100,
        "power": 50,
        "type": "psychic",
        "category": "special"
      },
      {
        "name": "Psybeam",
        "accuracy": 100,
        "power": 65,
        "type": "psychic",
        "category": "special"
      }
    ]
  },
  {
    "id": 152,
    "name": "Chikorita",
    "type1": "grass",
    "type2": "",
    "hp": 45,
    "atk": 49,
    "def": 65,
    "spAtk": 49,
    "spDef": 65,
    "speed": 45,
    "height": 9,
    "weight": 64,
    "evolutionStage": 1,
    "evolution1Name": "Bayleef",
    "evolution1Num": 153,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Bullet Seed",
        "accuracy": 100,
        "power": 25,
        "type": "grass",
        "category": "physical"
      },
      {
        "name": "Vine Whip",
        "accuracy": 100,
        "power": 45,
        "type": "grass",
        "category": "physical"
      },
      {
        "name": "Razor Leaf",
        "accuracy": 95,
        "power": 55,
        "type": "grass",
        "category": "physical"
      }
    ]
  },
  {
    "id": 153,
    "name": "Bayleef",
    "type1": "grass",
    "type2": "",
    "hp": 60,
    "atk": 62,
    "def": 80,
    "spAtk": 63,
    "spDef": 80,
    "speed": 60,
    "height": 12,
    "weight": 158,
    "evolutionStage": 2,
    "evolution1Name": "Meganium",
    "evolution1Num": 154,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Magical Leaf",
        "accuracy": 100,
        "power": 60,
        "type": "grass",
        "category": "special"
      },
      {
        "name": "Grassy Glide",
        "accuracy": 100,
        "power": 70,
        "type": "grass",
        "category": "physical"
      },
      {
        "name": "Giga Drain",
        "accuracy": 100,
        "power": 75,
        "type": "grass",
        "category": "special"
      }
    ]
  },
  {
    "id": 154,
    "name": "Meganium",
    "type1": "grass",
    "type2": "",
    "hp": 80,
    "atk": 82,
    "def": 100,
    "spAtk": 83,
    "spDef": 100,
    "speed": 80,
    "height": 18,
    "weight": 1005,
    "evolutionStage": 3,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Energy Ball",
        "accuracy": 100,
        "power": 90,
        "type": "grass",
        "category": "special"
      },
      {
        "name": "Petal Blizzard",
        "accuracy": 100,
        "power": 90,
        "type": "grass",
        "category": "physical"
      },
      {
        "name": "Solar Beam",
        "accuracy": 100,
        "power": 120,
        "type": "grass",
        "category": "special"
      }
    ]
  },
  {
    "id": 155,
    "name": "Cyndaquil",
    "type1": "fire",
    "type2": "",
    "hp": 39,
    "atk": 52,
    "def": 43,
    "spAtk": 60,
    "spDef": 50,
    "speed": 65,
    "height": 5,
    "weight": 79,
    "evolutionStage": 1,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Fire Spin",
        "accuracy": 85,
        "power": 35,
        "type": "fire",
        "category": "special"
      },
      {
        "name": "Ember",
        "accuracy": 100,
        "power": 40,
        "type": "fire",
        "category": "special"
      },
      {
        "name": "Flame Charge",
        "accuracy": 100,
        "power": 50,
        "type": "fire",
        "category": "physical"
      }
    ]
  },
  {
    "id": 156,
    "name": "Quilava",
    "type1": "fire",
    "type2": "",
    "hp": 58,
    "atk": 64,
    "def": 58,
    "spAtk": 80,
    "spDef": 65,
    "speed": 80,
    "height": 9,
    "weight": 190,
    "evolutionStage": 3,
    "evolution1Name": "Typhlosion",
    "evolution1Num": 157,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Lava Plume",
        "accuracy": 100,
        "power": 80,
        "type": "fire",
        "category": "special"
      },
      {
        "name": "Fire Pledge",
        "accuracy": 100,
        "power": 80,
        "type": "fire",
        "category": "special"
      },
      {
        "name": "Flamethrower",
        "accuracy": 100,
        "power": 90,
        "type": "fire",
        "category": "special"
      }
    ]
  },
  {
    "id": 157,
    "name": "Typhlosion",
    "type1": "fire",
    "type2": "",
    "hp": 78,
    "atk": 84,
    "def": 78,
    "spAtk": 109,
    "spDef": 85,
    "speed": 100,
    "height": 17,
    "weight": 795,
    "evolutionStage": 4,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Heat Wave",
        "accuracy": 90,
        "power": 95,
        "type": "fire",
        "category": "special"
      },
      {
        "name": "Inferno",
        "accuracy": 50,
        "power": 100,
        "type": "fire",
        "category": "special"
      },
      {
        "name": "Fire Blast",
        "accuracy": 85,
        "power": 110,
        "type": "fire",
        "category": "special"
      }
    ]
  },
  {
    "id": 158,
    "name": "Totodile",
    "type1": "water",
    "type2": "",
    "hp": 50,
    "atk": 65,
    "def": 64,
    "spAtk": 44,
    "spDef": 48,
    "speed": 43,
    "height": 6,
    "weight": 95,
    "evolutionStage": 1,
    "evolution1Name": "Croconaw",
    "evolution1Num": 159,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Whirlpool",
        "accuracy": 85,
        "power": 35,
        "type": "water",
        "category": "special"
      },
      {
        "name": "Water Gun",
        "accuracy": 100,
        "power": 40,
        "type": "water",
        "category": "special"
      },
      {
        "name": "Aqua Jet",
        "accuracy": 100,
        "power": 40,
        "type": "water",
        "category": "physical"
      }
    ]
  },
  {
    "id": 159,
    "name": "Croconaw",
    "type1": "water",
    "type2": "",
    "hp": 65,
    "atk": 80,
    "def": 80,
    "spAtk": 59,
    "spDef": 63,
    "speed": 58,
    "height": 11,
    "weight": 250,
    "evolutionStage": 2,
    "evolution1Name": "Feraligatr",
    "evolution1Num": 160,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Water Pulse",
        "accuracy": 100,
        "power": 60,
        "type": "water",
        "category": "special"
      },
      {
        "name": "Flip Turn",
        "accuracy": 100,
        "power": 60,
        "type": "water",
        "category": "physical"
      },
      {
        "name": "Waterfall",
        "accuracy": 100,
        "power": 80,
        "type": "water",
        "category": "physical"
      }
    ]
  },
  {
    "id": 160,
    "name": "Feraligatr",
    "type1": "water",
    "type2": "",
    "hp": 85,
    "atk": 105,
    "def": 100,
    "spAtk": 79,
    "spDef": 83,
    "speed": 78,
    "height": 23,
    "weight": 888,
    "evolutionStage": 3,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Liquidation",
        "accuracy": 100,
        "power": 85,
        "type": "water",
        "category": "physical"
      },
      {
        "name": "Surf",
        "accuracy": 100,
        "power": 90,
        "type": "water",
        "category": "special"
      },
      {
        "name": "Aqua Tail",
        "accuracy": 90,
        "power": 90,
        "type": "water",
        "category": "physical"
      }
    ]
  },
  {
    "id": 161,
    "name": "Sentret",
    "type1": "normal",
    "type2": "",
    "hp": 35,
    "atk": 46,
    "def": 34,
    "spAtk": 35,
    "spDef": 45,
    "speed": 20,
    "height": 8,
    "weight": 60,
    "evolutionStage": 1,
    "evolution1Name": "Furret",
    "evolution1Num": 162,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Fury Swipes",
        "accuracy": 80,
        "power": 18,
        "type": "normal",
        "category": "physical"
      },
      {
        "name": "Tackle",
        "accuracy": 100,
        "power": 40,
        "type": "normal",
        "category": "physical"
      },
      {
        "name": "Quick Attack",
        "accuracy": 100,
        "power": 40,
        "type": "normal",
        "category": "physical"
      }
    ]
  },
  {
    "id": 162,
    "name": "Furret",
    "type1": "normal",
    "type2": "",
    "hp": 85,
    "atk": 76,
    "def": 64,
    "spAtk": 45,
    "spDef": 55,
    "speed": 90,
    "height": 18,
    "weight": 325,
    "evolutionStage": 2,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Swift",
        "accuracy": 100,
        "power": 60,
        "type": "normal",
        "category": "special"
      },
      {
        "name": "Headbutt",
        "accuracy": 100,
        "power": 70,
        "type": "normal",
        "category": "physical"
      },
      {
        "name": "Facade",
        "accuracy": 100,
        "power": 70,
        "type": "normal",
        "category": "physical"
      }
    ]
  },
  {
    "id": 163,
    "name": "Hoothoot",
    "type1": "normal",
    "type2": "flying",
    "hp": 60,
    "atk": 30,
    "def": 30,
    "spAtk": 36,
    "spDef": 56,
    "speed": 50,
    "height": 7,
    "weight": 212,
    "evolutionStage": 1,
    "evolution1Name": "Noctowl",
    "evolution1Num": 164,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Tackle",
        "accuracy": 100,
        "power": 40,
        "type": "normal",
        "category": "physical"
      },
      {
        "name": "Echoed Voice",
        "accuracy": 100,
        "power": 40,
        "type": "normal",
        "category": "special"
      },
      {
        "name": "Peck",
        "accuracy": 100,
        "power": 35,
        "type": "flying",
        "category": "physical"
      }
    ]
  },
  {
    "id": 164,
    "name": "Noctowl",
    "type1": "normal",
    "type2": "flying",
    "hp": 100,
    "atk": 50,
    "def": 50,
    "spAtk": 86,
    "spDef": 96,
    "speed": 70,
    "height": 16,
    "weight": 408,
    "evolutionStage": 2,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Hidden Power",
        "accuracy": 100,
        "power": 60,
        "type": "normal",
        "category": "special"
      },
      {
        "name": "Round",
        "accuracy": 100,
        "power": 60,
        "type": "normal",
        "category": "special"
      },
      {
        "name": "Aerial Ace",
        "accuracy": 100,
        "power": 60,
        "type": "flying",
        "category": "physical"
      }
    ]
  },
  {
    "id": 165,
    "name": "Ledyba",
    "type1": "bug",
    "type2": "flying",
    "hp": 40,
    "atk": 20,
    "def": 30,
    "spAtk": 40,
    "spDef": 80,
    "speed": 55,
    "height": 10,
    "weight": 108,
    "evolutionStage": 1,
    "evolution1Name": "Ledian",
    "evolution1Num": 166,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Infestation",
        "accuracy": 100,
        "power": 20,
        "type": "bug",
        "category": "special"
      },
      {
        "name": "Struggle Bug",
        "accuracy": 100,
        "power": 50,
        "type": "bug",
        "category": "special"
      },
      {
        "name": "Acrobatics",
        "accuracy": 100,
        "power": 55,
        "type": "flying",
        "category": "physical"
      }
    ]
  },
  {
    "id": 166,
    "name": "Ledian",
    "type1": "bug",
    "type2": "flying",
    "hp": 55,
    "atk": 35,
    "def": 50,
    "spAtk": 55,
    "spDef": 110,
    "speed": 85,
    "height": 14,
    "weight": 356,
    "evolutionStage": 2,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Silver Wind",
        "accuracy": 100,
        "power": 60,
        "type": "bug",
        "category": "special"
      },
      {
        "name": "Bug Bite",
        "accuracy": 100,
        "power": 60,
        "type": "bug",
        "category": "physical"
      },
      {
        "name": "Aerial Ace",
        "accuracy": 100,
        "power": 60,
        "type": "flying",
        "category": "physical"
      }
    ]
  },
  {
    "id": 167,
    "name": "Spinarak",
    "type1": "bug",
    "type2": "poison",
    "hp": 40,
    "atk": 60,
    "def": 40,
    "spAtk": 40,
    "spDef": 40,
    "speed": 30,
    "height": 5,
    "weight": 85,
    "evolutionStage": 1,
    "evolution1Name": "Ariados",
    "evolution1Num": 168,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Infestation",
        "accuracy": 100,
        "power": 20,
        "type": "bug",
        "category": "special"
      },
      {
        "name": "Pin Missile",
        "accuracy": 95,
        "power": 25,
        "type": "bug",
        "category": "physical"
      },
      {
        "name": "Poison Sting",
        "accuracy": 100,
        "power": 15,
        "type": "poison",
        "category": "physical"
      }
    ]
  },
  {
    "id": 168,
    "name": "Ariados",
    "type1": "bug",
    "type2": "poison",
    "hp": 70,
    "atk": 90,
    "def": 70,
    "spAtk": 60,
    "spDef": 70,
    "speed": 40,
    "height": 11,
    "weight": 335,
    "evolutionStage": 2,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Bug Bite",
        "accuracy": 100,
        "power": 60,
        "type": "bug",
        "category": "physical"
      },
      {
        "name": "Skitter Smack",
        "accuracy": 90,
        "power": 70,
        "type": "bug",
        "category": "physical"
      },
      {
        "name": "Venoshock",
        "accuracy": 100,
        "power": 65,
        "type": "poison",
        "category": "special"
      }
    ]
  },
  {
    "id": 169,
    "name": "Crobat",
    "type1": "poison",
    "type2": "flying",
    "hp": 85,
    "atk": 90,
    "def": 80,
    "spAtk": 70,
    "spDef": 80,
    "speed": 130,
    "height": 18,
    "weight": 750,
    "evolutionStage": 3,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Sludge Bomb",
        "accuracy": 100,
        "power": 90,
        "type": "poison",
        "category": "special"
      },
      {
        "name": "Air Slash",
        "accuracy": 95,
        "power": 75,
        "type": "flying",
        "category": "special"
      },
      {
        "name": "Gunk Shot",
        "accuracy": 80,
        "power": 120,
        "type": "poison",
        "category": "physical"
      }
    ]
  },
  {
    "id": 170,
    "name": "Chinchou",
    "type1": "water",
    "type2": "electric",
    "hp": 75,
    "atk": 38,
    "def": 38,
    "spAtk": 56,
    "spDef": 56,
    "speed": 67,
    "height": 5,
    "weight": 120,
    "evolutionStage": 1,
    "evolution1Name": "Lanturn",
    "evolution1Num": 171,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Whirlpool",
        "accuracy": 85,
        "power": 35,
        "type": "water",
        "category": "special"
      },
      {
        "name": "Bubble",
        "accuracy": 100,
        "power": 40,
        "type": "water",
        "category": "special"
      },
      {
        "name": "Charge Beam",
        "accuracy": 90,
        "power": 50,
        "type": "electric",
        "category": "special"
      }
    ]
  },
  {
    "id": 171,
    "name": "Lanturn",
    "type1": "water",
    "type2": "electric",
    "hp": 125,
    "atk": 58,
    "def": 58,
    "spAtk": 76,
    "spDef": 76,
    "speed": 67,
    "height": 12,
    "weight": 225,
    "evolutionStage": 2,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Waterfall",
        "accuracy": 100,
        "power": 80,
        "type": "water",
        "category": "physical"
      },
      {
        "name": "Dive",
        "accuracy": 100,
        "power": 80,
        "type": "water",
        "category": "physical"
      },
      {
        "name": "Volt Switch",
        "accuracy": 100,
        "power": 70,
        "type": "electric",
        "category": "special"
      }
    ]
  },
  {
    "id": 172,
    "name": "Pichu",
    "type1": "electric",
    "type2": "",
    "hp": 20,
    "atk": 40,
    "def": 15,
    "spAtk": 35,
    "spDef": 35,
    "speed": 60,
    "height": 3,
    "weight": 20,
    "evolutionStage": 1,
    "evolution1Name": "Pikachu",
    "evolution1Num": 25,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Nuzzle",
        "accuracy": 100,
        "power": 20,
        "type": "electric",
        "category": "physical"
      },
      {
        "name": "Thunder Shock",
        "accuracy": 100,
        "power": 40,
        "type": "electric",
        "category": "special"
      },
      {
        "name": "Charge Beam",
        "accuracy": 90,
        "power": 50,
        "type": "electric",
        "category": "special"
      }
    ]
  },
  {
    "id": 173,
    "name": "Cleffa",
    "type1": "fairy",
    "type2": "",
    "hp": 50,
    "atk": 25,
    "def": 28,
    "spAtk": 45,
    "spDef": 55,
    "speed": 15,
    "height": 3,
    "weight": 30,
    "evolutionStage": 1,
    "evolution1Name": "Clefairy",
    "evolution1Num": 35,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Disarming Voice",
        "accuracy": 100,
        "power": 40,
        "type": "fairy",
        "category": "special"
      },
      {
        "name": "Fairy Wind",
        "accuracy": 100,
        "power": 40,
        "type": "fairy",
        "category": "special"
      },
      {
        "name": "Draining Kiss",
        "accuracy": 100,
        "power": 50,
        "type": "fairy",
        "category": "special"
      }
    ]
  },
  {
    "id": 174,
    "name": "Igglybuff",
    "type1": "normal",
    "type2": "fairy",
    "hp": 90,
    "atk": 30,
    "def": 15,
    "spAtk": 40,
    "spDef": 20,
    "speed": 15,
    "height": 3,
    "weight": 10,
    "evolutionStage": 1,
    "evolution1Name": "Jigglypuff",
    "evolution1Num": 39,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Pound",
        "accuracy": 100,
        "power": 40,
        "type": "normal",
        "category": "physical"
      },
      {
        "name": "Echoed Voice",
        "accuracy": 100,
        "power": 40,
        "type": "normal",
        "category": "special"
      },
      {
        "name": "Disarming Voice",
        "accuracy": 100,
        "power": 40,
        "type": "fairy",
        "category": "special"
      }
    ]
  },
  {
    "id": 175,
    "name": "Togepi",
    "type1": "fairy",
    "type2": "",
    "hp": 35,
    "atk": 20,
    "def": 65,
    "spAtk": 40,
    "spDef": 65,
    "speed": 20,
    "height": 3,
    "weight": 15,
    "evolutionStage": 1,
    "evolution1Name": "Togetic",
    "evolution1Num": 176,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Fairy Wind",
        "accuracy": 100,
        "power": 40,
        "type": "fairy",
        "category": "special"
      },
      {
        "name": "Draining Kiss",
        "accuracy": 100,
        "power": 50,
        "type": "fairy",
        "category": "special"
      },
      {
        "name": "Spirit Break",
        "accuracy": 100,
        "power": 75,
        "type": "fairy",
        "category": "physical"
      }
    ]
  },
  {
    "id": 176,
    "name": "Togetic",
    "type1": "fairy",
    "type2": "flying",
    "hp": 55,
    "atk": 40,
    "def": 85,
    "spAtk": 80,
    "spDef": 105,
    "speed": 40,
    "height": 6,
    "weight": 32,
    "evolutionStage": 2,
    "evolution1Name": "Togekiss",
    "evolution1Num": 468,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Dazzling Gleam",
        "accuracy": 100,
        "power": 80,
        "type": "fairy",
        "category": "special"
      },
      {
        "name": "Air Slash",
        "accuracy": 95,
        "power": 75,
        "type": "flying",
        "category": "special"
      },
      {
        "name": "Sparkly Swirl",
        "accuracy": 85,
        "power": 120,
        "type": "fairy",
        "category": "special"
      }
    ]
  },
  {
    "id": 177,
    "name": "Natu",
    "type1": "psychic",
    "type2": "flying",
    "hp": 40,
    "atk": 50,
    "def": 45,
    "spAtk": 70,
    "spDef": 45,
    "speed": 70,
    "height": 2,
    "weight": 20,
    "evolutionStage": 1,
    "evolution1Name": "Xatu",
    "evolution1Num": 178,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Stored Power",
        "accuracy": 100,
        "power": 20,
        "type": "psychic",
        "category": "special"
      },
      {
        "name": "Peck",
        "accuracy": 100,
        "power": 35,
        "type": "flying",
        "category": "physical"
      },
      {
        "name": "Extrasensory",
        "accuracy": 100,
        "power": 80,
        "type": "psychic",
        "category": "special"
      }
    ]
  },
  {
    "id": 178,
    "name": "Xatu",
    "type1": "psychic",
    "type2": "flying",
    "hp": 65,
    "atk": 75,
    "def": 70,
    "spAtk": 95,
    "spDef": 70,
    "speed": 95,
    "height": 15,
    "weight": 150,
    "evolutionStage": 2,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Zen Headbutt",
        "accuracy": 90,
        "power": 80,
        "type": "psychic",
        "category": "physical"
      },
      {
        "name": "Psyshock",
        "accuracy": 100,
        "power": 80,
        "type": "psychic",
        "category": "special"
      },
      {
        "name": "Air Slash",
        "accuracy": 95,
        "power": 75,
        "type": "flying",
        "category": "special"
      }
    ]
  },
  {
    "id": 179,
    "name": "Mareep",
    "type1": "electric",
    "type2": "",
    "hp": 55,
    "atk": 40,
    "def": 40,
    "spAtk": 65,
    "spDef": 45,
    "speed": 35,
    "height": 6,
    "weight": 78,
    "evolutionStage": 1,
    "evolution1Name": "Flaaffy",
    "evolution1Num": 180,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Thunder Shock",
        "accuracy": 100,
        "power": 40,
        "type": "electric",
        "category": "special"
      },
      {
        "name": "Charge Beam",
        "accuracy": 90,
        "power": 50,
        "type": "electric",
        "category": "special"
      },
      {
        "name": "Electroweb",
        "accuracy": 95,
        "power": 55,
        "type": "electric",
        "category": "special"
      }
    ]
  },
  {
    "id": 180,
    "name": "Flaaffy",
    "type1": "electric",
    "type2": "",
    "hp": 70,
    "atk": 55,
    "def": 55,
    "spAtk": 80,
    "spDef": 60,
    "speed": 45,
    "height": 8,
    "weight": 133,
    "evolutionStage": 2,
    "evolution1Name": "Ampharos",
    "evolution1Num": 181,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Shock Wave",
        "accuracy": 100,
        "power": 60,
        "type": "electric",
        "category": "special"
      },
      {
        "name": "Volt Switch",
        "accuracy": 100,
        "power": 70,
        "type": "electric",
        "category": "special"
      },
      {
        "name": "Thunder Punch",
        "accuracy": 100,
        "power": 75,
        "type": "electric",
        "category": "physical"
      }
    ]
  },
  {
    "id": 181,
    "name": "Ampharos",
    "type1": "electric",
    "type2": "",
    "hp": 90,
    "atk": 75,
    "def": 85,
    "spAtk": 115,
    "spDef": 90,
    "speed": 55,
    "height": 14,
    "weight": 615,
    "evolutionStage": 3,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Thunderbolt",
        "accuracy": 100,
        "power": 90,
        "type": "electric",
        "category": "special"
      },
      {
        "name": "Wild Charge",
        "accuracy": 100,
        "power": 90,
        "type": "electric",
        "category": "physical"
      },
      {
        "name": "Thunder",
        "accuracy": 70,
        "power": 110,
        "type": "electric",
        "category": "special"
      }
    ]
  },
  {
    "id": 182,
    "name": "Bellossom",
    "type1": "grass",
    "type2": "",
    "hp": 75,
    "atk": 80,
    "def": 95,
    "spAtk": 90,
    "spDef": 100,
    "speed": 50,
    "height": 4,
    "weight": 58,
    "evolutionStage": 1,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Absorb",
        "accuracy": 100,
        "power": 20,
        "type": "grass",
        "category": "special"
      },
      {
        "name": "Bullet Seed",
        "accuracy": 100,
        "power": 25,
        "type": "grass",
        "category": "physical"
      },
      {
        "name": "Mega Drain",
        "accuracy": 100,
        "power": 40,
        "type": "grass",
        "category": "special"
      }
    ]
  },
  {
    "id": 183,
    "name": "Marill",
    "type1": "water",
    "type2": "fairy",
    "hp": 70,
    "atk": 20,
    "def": 50,
    "spAtk": 20,
    "spDef": 50,
    "speed": 40,
    "height": 4,
    "weight": 85,
    "evolutionStage": 2,
    "evolution1Name": "Azumarill",
    "evolution1Num": 184,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Bubble Beam",
        "accuracy": 100,
        "power": 65,
        "type": "water",
        "category": "special"
      },
      {
        "name": "Waterfall",
        "accuracy": 100,
        "power": 80,
        "type": "water",
        "category": "physical"
      },
      {
        "name": "Hydro Cannon",
        "accuracy": 90,
        "power": 150,
        "type": "water",
        "category": "special"
      }
    ]
  },
  {
    "id": 184,
    "name": "Azumarill",
    "type1": "water",
    "type2": "fairy",
    "hp": 100,
    "atk": 50,
    "def": 80,
    "spAtk": 60,
    "spDef": 80,
    "speed": 50,
    "height": 8,
    "weight": 285,
    "evolutionStage": 3,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Surf",
        "accuracy": 100,
        "power": 90,
        "type": "water",
        "category": "special"
      },
      {
        "name": "Aqua Tail",
        "accuracy": 90,
        "power": 90,
        "type": "water",
        "category": "physical"
      },
      {
        "name": "Play Rough",
        "accuracy": 90,
        "power": 90,
        "type": "fairy",
        "category": "physical"
      }
    ]
  },
  {
    "id": 185,
    "name": "Sudowoodo",
    "type1": "rock",
    "type2": "",
    "hp": 70,
    "atk": 100,
    "def": 115,
    "spAtk": 30,
    "spDef": 65,
    "speed": 30,
    "height": 12,
    "weight": 380,
    "evolutionStage": 2,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Rock Tomb",
        "accuracy": 95,
        "power": 60,
        "type": "rock",
        "category": "physical"
      },
      {
        "name": "Rock Slide",
        "accuracy": 90,
        "power": 75,
        "type": "rock",
        "category": "physical"
      },
      {
        "name": "Rock Wrecker",
        "accuracy": 90,
        "power": 150,
        "type": "rock",
        "category": "physical"
      }
    ]
  },
  {
    "id": 186,
    "name": "Politoed",
    "type1": "water",
    "type2": "",
    "hp": 90,
    "atk": 75,
    "def": 75,
    "spAtk": 90,
    "spDef": 100,
    "speed": 70,
    "height": 11,
    "weight": 339,
    "evolutionStage": 1,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Whirlpool",
        "accuracy": 85,
        "power": 35,
        "type": "water",
        "category": "special"
      },
      {
        "name": "Water Gun",
        "accuracy": 100,
        "power": 40,
        "type": "water",
        "category": "special"
      },
      {
        "name": "Water Pulse",
        "accuracy": 100,
        "power": 60,
        "type": "water",
        "category": "special"
      }
    ]
  },
  {
    "id": 187,
    "name": "Hoppip",
    "type1": "grass",
    "type2": "flying",
    "hp": 35,
    "atk": 35,
    "def": 40,
    "spAtk": 35,
    "spDef": 55,
    "speed": 50,
    "height": 4,
    "weight": 5,
    "evolutionStage": 1,
    "evolution1Name": "Skiploom",
    "evolution1Num": 188,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Absorb",
        "accuracy": 100,
        "power": 20,
        "type": "grass",
        "category": "special"
      },
      {
        "name": "Bullet Seed",
        "accuracy": 100,
        "power": 25,
        "type": "grass",
        "category": "physical"
      },
      {
        "name": "Acrobatics",
        "accuracy": 100,
        "power": 55,
        "type": "flying",
        "category": "physical"
      }
    ]
  },
  {
    "id": 188,
    "name": "Skiploom",
    "type1": "grass",
    "type2": "flying",
    "hp": 55,
    "atk": 45,
    "def": 50,
    "spAtk": 45,
    "spDef": 65,
    "speed": 80,
    "height": 6,
    "weight": 10,
    "evolutionStage": 2,
    "evolution1Name": "Jumpluff",
    "evolution1Num": 189,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Magical Leaf",
        "accuracy": 100,
        "power": 60,
        "type": "grass",
        "category": "special"
      },
      {
        "name": "Aerial Ace",
        "accuracy": 100,
        "power": 60,
        "type": "flying",
        "category": "physical"
      },
      {
        "name": "Solar Beam",
        "accuracy": 100,
        "power": 120,
        "type": "grass",
        "category": "special"
      }
    ]
  },
  {
    "id": 189,
    "name": "Jumpluff",
    "type1": "grass",
    "type2": "flying",
    "hp": 75,
    "atk": 55,
    "def": 70,
    "spAtk": 55,
    "spDef": 95,
    "speed": 110,
    "height": 8,
    "weight": 30,
    "evolutionStage": 3,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Giga Drain",
        "accuracy": 100,
        "power": 75,
        "type": "grass",
        "category": "special"
      },
      {
        "name": "Seed Bomb",
        "accuracy": 100,
        "power": 80,
        "type": "grass",
        "category": "physical"
      },
      {
        "name": "Bounce",
        "accuracy": 85,
        "power": 85,
        "type": "flying",
        "category": "physical"
      }
    ]
  },
  {
    "id": 190,
    "name": "Aipom",
    "type1": "normal",
    "type2": "",
    "hp": 55,
    "atk": 70,
    "def": 55,
    "spAtk": 40,
    "spDef": 55,
    "speed": 85,
    "height": 8,
    "weight": 115,
    "evolutionStage": 1,
    "evolution1Name": "Ambipom",
    "evolution1Num": 424,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Double Slap",
        "accuracy": 85,
        "power": 15,
        "type": "normal",
        "category": "physical"
      },
      {
        "name": "Fury Swipes",
        "accuracy": 80,
        "power": 18,
        "type": "normal",
        "category": "physical"
      },
      {
        "name": "Tail Slap",
        "accuracy": 85,
        "power": 25,
        "type": "normal",
        "category": "physical"
      }
    ]
  },
  {
    "id": 191,
    "name": "Sunkern",
    "type1": "grass",
    "type2": "",
    "hp": 30,
    "atk": 30,
    "def": 30,
    "spAtk": 30,
    "spDef": 30,
    "speed": 30,
    "height": 3,
    "weight": 18,
    "evolutionStage": 1,
    "evolution1Name": "Sunflora",
    "evolution1Num": 192,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Absorb",
        "accuracy": 100,
        "power": 20,
        "type": "grass",
        "category": "special"
      },
      {
        "name": "Bullet Seed",
        "accuracy": 100,
        "power": 25,
        "type": "grass",
        "category": "physical"
      },
      {
        "name": "Mega Drain",
        "accuracy": 100,
        "power": 40,
        "type": "grass",
        "category": "special"
      }
    ]
  },
  {
    "id": 192,
    "name": "Sunflora",
    "type1": "grass",
    "type2": "",
    "hp": 75,
    "atk": 75,
    "def": 55,
    "spAtk": 105,
    "spDef": 85,
    "speed": 30,
    "height": 8,
    "weight": 85,
    "evolutionStage": 2,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Magical Leaf",
        "accuracy": 100,
        "power": 60,
        "type": "grass",
        "category": "special"
      },
      {
        "name": "Grassy Glide",
        "accuracy": 100,
        "power": 70,
        "type": "grass",
        "category": "physical"
      },
      {
        "name": "Giga Drain",
        "accuracy": 100,
        "power": 75,
        "type": "grass",
        "category": "special"
      }
    ]
  },
  {
    "id": 193,
    "name": "Yanma",
    "type1": "bug",
    "type2": "flying",
    "hp": 65,
    "atk": 65,
    "def": 45,
    "spAtk": 75,
    "spDef": 45,
    "speed": 95,
    "height": 12,
    "weight": 380,
    "evolutionStage": 1,
    "evolution1Name": "Yanmega",
    "evolution1Num": 469,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Struggle Bug",
        "accuracy": 100,
        "power": 50,
        "type": "bug",
        "category": "special"
      },
      {
        "name": "Silver Wind",
        "accuracy": 100,
        "power": 60,
        "type": "bug",
        "category": "special"
      },
      {
        "name": "Gust",
        "accuracy": 100,
        "power": 40,
        "type": "flying",
        "category": "special"
      }
    ]
  },
  {
    "id": 194,
    "name": "Wooper",
    "type1": "water",
    "type2": "ground",
    "hp": 55,
    "atk": 45,
    "def": 45,
    "spAtk": 25,
    "spDef": 25,
    "speed": 15,
    "height": 4,
    "weight": 85,
    "evolutionStage": 1,
    "evolution1Name": "Quagsire",
    "evolution1Num": 195,
    "evolution2Name": "Clodsire",
    "evolution2Num": 980,
    "moves": [
      {
        "name": "Whirlpool",
        "accuracy": 85,
        "power": 35,
        "type": "water",
        "category": "special"
      },
      {
        "name": "Water Gun",
        "accuracy": 100,
        "power": 40,
        "type": "water",
        "category": "special"
      },
      {
        "name": "Mud Slap",
        "accuracy": 100,
        "power": 20,
        "type": "ground",
        "category": "special"
      }
    ]
  },
  {
    "id": 195,
    "name": "Quagsire",
    "type1": "water",
    "type2": "ground",
    "hp": 95,
    "atk": 85,
    "def": 85,
    "spAtk": 65,
    "spDef": 65,
    "speed": 35,
    "height": 14,
    "weight": 750,
    "evolutionStage": 2,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Waterfall",
        "accuracy": 100,
        "power": 80,
        "type": "water",
        "category": "physical"
      },
      {
        "name": "Dive",
        "accuracy": 100,
        "power": 80,
        "type": "water",
        "category": "physical"
      },
      {
        "name": "Stomping Tantrum",
        "accuracy": 100,
        "power": 75,
        "type": "ground",
        "category": "physical"
      }
    ]
  },
  {
    "id": 196,
    "name": "Espeon",
    "type1": "psychic",
    "type2": "",
    "hp": 65,
    "atk": 65,
    "def": 60,
    "spAtk": 130,
    "spDef": 95,
    "speed": 110,
    "height": 9,
    "weight": 265,
    "evolutionStage": 2,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Psybeam",
        "accuracy": 100,
        "power": 65,
        "type": "psychic",
        "category": "special"
      },
      {
        "name": "Zen Headbutt",
        "accuracy": 90,
        "power": 80,
        "type": "psychic",
        "category": "physical"
      },
      {
        "name": "Psyshock",
        "accuracy": 100,
        "power": 80,
        "type": "psychic",
        "category": "special"
      }
    ]
  },
  {
    "id": 197,
    "name": "Umbreon",
    "type1": "dark",
    "type2": "",
    "hp": 95,
    "atk": 65,
    "def": 110,
    "spAtk": 60,
    "spDef": 130,
    "speed": 65,
    "height": 10,
    "weight": 270,
    "evolutionStage": 2,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Feint Attack",
        "accuracy": 100,
        "power": 60,
        "type": "dark",
        "category": "physical"
      },
      {
        "name": "Assurance",
        "accuracy": 100,
        "power": 60,
        "type": "dark",
        "category": "physical"
      },
      {
        "name": "Bite",
        "accuracy": 100,
        "power": 60,
        "type": "dark",
        "category": "physical"
      }
    ]
  },
  {
    "id": 198,
    "name": "Murkrow",
    "type1": "dark",
    "type2": "flying",
    "hp": 60,
    "atk": 85,
    "def": 42,
    "spAtk": 85,
    "spDef": 42,
    "speed": 91,
    "height": 5,
    "weight": 21,
    "evolutionStage": 1,
    "evolution1Name": "Honchkrow",
    "evolution1Num": 430,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Pursuit",
        "accuracy": 100,
        "power": 40,
        "type": "dark",
        "category": "physical"
      },
      {
        "name": "Payback",
        "accuracy": 100,
        "power": 50,
        "type": "dark",
        "category": "physical"
      },
      {
        "name": "Peck",
        "accuracy": 100,
        "power": 35,
        "type": "flying",
        "category": "physical"
      }
    ]
  },
  {
    "id": 199,
    "name": "Slowking",
    "type1": "water",
    "type2": "psychic",
    "hp": 95,
    "atk": 75,
    "def": 80,
    "spAtk": 100,
    "spDef": 110,
    "speed": 30,
    "height": 20,
    "weight": 795,
    "evolutionStage": 1,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Whirlpool",
        "accuracy": 85,
        "power": 35,
        "type": "water",
        "category": "special"
      },
      {
        "name": "Water Gun",
        "accuracy": 100,
        "power": 40,
        "type": "water",
        "category": "special"
      },
      {
        "name": "Stored Power",
        "accuracy": 100,
        "power": 20,
        "type": "psychic",
        "category": "special"
      }
    ]
  },
  {
    "id": 200,
    "name": "Misdreavus",
    "type1": "ghost",
    "type2": "",
    "hp": 60,
    "atk": 60,
    "def": 60,
    "spAtk": 85,
    "spDef": 85,
    "speed": 85,
    "height": 7,
    "weight": 10,
    "evolutionStage": 1,
    "evolution1Name": "Mismagius",
    "evolution1Num": 429,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Astonish",
        "accuracy": 100,
        "power": 30,
        "type": "ghost",
        "category": "physical"
      },
      {
        "name": "Shadow Sneak",
        "accuracy": 100,
        "power": 40,
        "type": "ghost",
        "category": "physical"
      },
      {
        "name": "Ominous Wind",
        "accuracy": 100,
        "power": 60,
        "type": "ghost",
        "category": "special"
      }
    ]
  },
  {
    "id": 201,
    "name": "Unown",
    "type1": "psychic",
    "type2": "",
    "hp": 48,
    "atk": 72,
    "def": 48,
    "spAtk": 72,
    "spDef": 48,
    "speed": 48,
    "height": 5,
    "weight": 50,
    "evolutionStage": 3,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Dream Eater",
        "accuracy": 100,
        "power": 100,
        "type": "psychic",
        "category": "special"
      },
      {
        "name": "Psystrike",
        "accuracy": 100,
        "power": 100,
        "type": "psychic",
        "category": "special"
      },
      {
        "name": "Photon Geyser",
        "accuracy": 100,
        "power": 100,
        "type": "psychic",
        "category": "special"
      }
    ]
  },
  {
    "id": 202,
    "name": "Wobbuffet",
    "type1": "psychic",
    "type2": "",
    "hp": 190,
    "atk": 33,
    "def": 58,
    "spAtk": 33,
    "spDef": 58,
    "speed": 33,
    "height": 13,
    "weight": 285,
    "evolutionStage": 2,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Light That Burns The Sky",
        "accuracy": 100,
        "power": 200,
        "type": "psychic",
        "category": "special"
      },
      {
        "name": "Genesis Supernova",
        "accuracy": 100,
        "power": 185,
        "type": "psychic",
        "category": "special"
      },
      {
        "name": "Prismatic Laser",
        "accuracy": 100,
        "power": 160,
        "type": "psychic",
        "category": "special"
      }
    ]
  },
  {
    "id": 203,
    "name": "Girafarig",
    "type1": "normal",
    "type2": "psychic",
    "hp": 70,
    "atk": 80,
    "def": 65,
    "spAtk": 90,
    "spDef": 65,
    "speed": 85,
    "height": 15,
    "weight": 415,
    "evolutionStage": 1,
    "evolution1Name": "Farigiraf",
    "evolution1Num": 981,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Double Hit",
        "accuracy": 90,
        "power": 35,
        "type": "normal",
        "category": "physical"
      },
      {
        "name": "Tackle",
        "accuracy": 100,
        "power": 40,
        "type": "normal",
        "category": "physical"
      },
      {
        "name": "Stored Power",
        "accuracy": 100,
        "power": 20,
        "type": "psychic",
        "category": "special"
      }
    ]
  },
  {
    "id": 204,
    "name": "Pineco",
    "type1": "bug",
    "type2": "",
    "hp": 50,
    "atk": 65,
    "def": 90,
    "spAtk": 35,
    "spDef": 35,
    "speed": 15,
    "height": 6,
    "weight": 72,
    "evolutionStage": 1,
    "evolution1Name": "Forretress",
    "evolution1Num": 205,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Pin Missile",
        "accuracy": 95,
        "power": 25,
        "type": "bug",
        "category": "physical"
      },
      {
        "name": "Struggle Bug",
        "accuracy": 100,
        "power": 50,
        "type": "bug",
        "category": "special"
      },
      {
        "name": "Bug Bite",
        "accuracy": 100,
        "power": 60,
        "type": "bug",
        "category": "physical"
      }
    ]
  },
  {
    "id": 205,
    "name": "Forretress",
    "type1": "bug",
    "type2": "steel",
    "hp": 75,
    "atk": 90,
    "def": 140,
    "spAtk": 60,
    "spDef": 60,
    "speed": 40,
    "height": 12,
    "weight": 1258,
    "evolutionStage": 2,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Signal Beam",
        "accuracy": 100,
        "power": 75,
        "type": "bug",
        "category": "special"
      },
      {
        "name": "Lunge",
        "accuracy": 100,
        "power": 80,
        "type": "bug",
        "category": "physical"
      },
      {
        "name": "Mirror Shot",
        "accuracy": 85,
        "power": 65,
        "type": "steel",
        "category": "special"
      }
    ]
  },
  {
    "id": 206,
    "name": "Dunsparce",
    "type1": "normal",
    "type2": "",
    "hp": 100,
    "atk": 70,
    "def": 70,
    "spAtk": 65,
    "spDef": 65,
    "speed": 45,
    "height": 15,
    "weight": 140,
    "evolutionStage": 1,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Bind",
        "accuracy": 85,
        "power": 15,
        "type": "normal",
        "category": "physical"
      },
      {
        "name": "Rage",
        "accuracy": 100,
        "power": 20,
        "type": "normal",
        "category": "physical"
      },
      {
        "name": "Snore",
        "accuracy": 100,
        "power": 50,
        "type": "normal",
        "category": "special"
      }
    ]
  },
  {
    "id": 207,
    "name": "Gligar",
    "type1": "ground",
    "type2": "flying",
    "hp": 65,
    "atk": 75,
    "def": 105,
    "spAtk": 35,
    "spDef": 65,
    "speed": 85,
    "height": 11,
    "weight": 648,
    "evolutionStage": 1,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Mud Slap",
        "accuracy": 100,
        "power": 20,
        "type": "ground",
        "category": "special"
      },
      {
        "name": "Sand Tomb",
        "accuracy": 85,
        "power": 35,
        "type": "ground",
        "category": "physical"
      },
      {
        "name": "Dual Wingbeat",
        "accuracy": 90,
        "power": 40,
        "type": "flying",
        "category": "physical"
      }
    ]
  },
  {
    "id": 208,
    "name": "Steelix",
    "type1": "steel",
    "type2": "ground",
    "hp": 75,
    "atk": 85,
    "def": 200,
    "spAtk": 55,
    "spDef": 65,
    "speed": 30,
    "height": 92,
    "weight": 4000,
    "evolutionStage": 3,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Flash Cannon",
        "accuracy": 100,
        "power": 80,
        "type": "steel",
        "category": "special"
      },
      {
        "name": "Iron Head",
        "accuracy": 100,
        "power": 80,
        "type": "steel",
        "category": "physical"
      },
      {
        "name": "Dig",
        "accuracy": 100,
        "power": 80,
        "type": "ground",
        "category": "physical"
      }
    ]
  },
  {
    "id": 209,
    "name": "Snubbull",
    "type1": "fairy",
    "type2": "",
    "hp": 60,
    "atk": 80,
    "def": 50,
    "spAtk": 40,
    "spDef": 40,
    "speed": 30,
    "height": 6,
    "weight": 78,
    "evolutionStage": 1,
    "evolution1Name": "Granbull",
    "evolution1Num": 210,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Sparkly Swirl",
        "accuracy": 85,
        "power": 120,
        "type": "fairy",
        "category": "special"
      },
      {
        "name": "Fleur Cannon",
        "accuracy": 90,
        "power": 130,
        "type": "fairy",
        "category": "special"
      },
      {
        "name": "Light Of Ruin",
        "accuracy": 90,
        "power": 140,
        "type": "fairy",
        "category": "special"
      }
    ]
  },
  {
    "id": 210,
    "name": "Granbull",
    "type1": "fairy",
    "type2": "",
    "hp": 90,
    "atk": 120,
    "def": 75,
    "spAtk": 60,
    "spDef": 60,
    "speed": 45,
    "height": 14,
    "weight": 487,
    "evolutionStage": 2,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Dazzling Gleam",
        "accuracy": 100,
        "power": 80,
        "type": "fairy",
        "category": "special"
      },
      {
        "name": "Lets Snuggle Forever",
        "accuracy": 100,
        "power": 190,
        "type": "fairy",
        "category": "physical"
      },
      {
        "name": "Misty Explosion",
        "accuracy": 100,
        "power": 100,
        "type": "fairy",
        "category": "special"
      }
    ]
  },
  {
    "id": 211,
    "name": "Qwilfish",
    "type1": "water",
    "type2": "poison",
    "hp": 65,
    "atk": 95,
    "def": 85,
    "spAtk": 55,
    "spDef": 55,
    "speed": 85,
    "height": 5,
    "weight": 39,
    "evolutionStage": 1,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Whirlpool",
        "accuracy": 85,
        "power": 35,
        "type": "water",
        "category": "special"
      },
      {
        "name": "Water Gun",
        "accuracy": 100,
        "power": 40,
        "type": "water",
        "category": "special"
      },
      {
        "name": "Poison Sting",
        "accuracy": 100,
        "power": 15,
        "type": "poison",
        "category": "physical"
      }
    ]
  },
  {
    "id": 212,
    "name": "Scizor",
    "type1": "bug",
    "type2": "steel",
    "hp": 70,
    "atk": 130,
    "def": 100,
    "spAtk": 55,
    "spDef": 80,
    "speed": 65,
    "height": 18,
    "weight": 1180,
    "evolutionStage": 3,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "U Turn",
        "accuracy": 100,
        "power": 70,
        "type": "bug",
        "category": "physical"
      },
      {
        "name": "Skitter Smack",
        "accuracy": 90,
        "power": 70,
        "type": "bug",
        "category": "physical"
      },
      {
        "name": "Steel Wing",
        "accuracy": 90,
        "power": 70,
        "type": "steel",
        "category": "physical"
      }
    ]
  },
  {
    "id": 213,
    "name": "Shuckle",
    "type1": "bug",
    "type2": "rock",
    "hp": 20,
    "atk": 10,
    "def": 230,
    "spAtk": 10,
    "spDef": 230,
    "speed": 5,
    "height": 6,
    "weight": 205,
    "evolutionStage": 1,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Infestation",
        "accuracy": 100,
        "power": 20,
        "type": "bug",
        "category": "special"
      },
      {
        "name": "Struggle Bug",
        "accuracy": 100,
        "power": 50,
        "type": "bug",
        "category": "special"
      },
      {
        "name": "Rock Blast",
        "accuracy": 90,
        "power": 25,
        "type": "rock",
        "category": "physical"
      }
    ]
  },
  {
    "id": 214,
    "name": "Heracross",
    "type1": "bug",
    "type2": "fighting",
    "hp": 80,
    "atk": 125,
    "def": 75,
    "spAtk": 40,
    "spDef": 95,
    "speed": 85,
    "height": 15,
    "weight": 540,
    "evolutionStage": 1,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Pin Missile",
        "accuracy": 95,
        "power": 25,
        "type": "bug",
        "category": "physical"
      },
      {
        "name": "Fury Cutter",
        "accuracy": 95,
        "power": 40,
        "type": "bug",
        "category": "physical"
      },
      {
        "name": "Arm Thrust",
        "accuracy": 100,
        "power": 15,
        "type": "fighting",
        "category": "physical"
      }
    ]
  },
  {
    "id": 215,
    "name": "Sneasel",
    "type1": "dark",
    "type2": "ice",
    "hp": 55,
    "atk": 95,
    "def": 55,
    "spAtk": 35,
    "spDef": 75,
    "speed": 115,
    "height": 9,
    "weight": 280,
    "evolutionStage": 1,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Pursuit",
        "accuracy": 100,
        "power": 40,
        "type": "dark",
        "category": "physical"
      },
      {
        "name": "Payback",
        "accuracy": 100,
        "power": 50,
        "type": "dark",
        "category": "physical"
      },
      {
        "name": "Triple Axel",
        "accuracy": 90,
        "power": 20,
        "type": "ice",
        "category": "physical"
      }
    ]
  },
  {
    "id": 216,
    "name": "Teddiursa",
    "type1": "normal",
    "type2": "",
    "hp": 60,
    "atk": 80,
    "def": 50,
    "spAtk": 50,
    "spDef": 50,
    "speed": 40,
    "height": 6,
    "weight": 88,
    "evolutionStage": 1,
    "evolution1Name": "Ursaring",
    "evolution1Num": 217,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Fury Swipes",
        "accuracy": 80,
        "power": 18,
        "type": "normal",
        "category": "physical"
      },
      {
        "name": "Scratch",
        "accuracy": 100,
        "power": 40,
        "type": "normal",
        "category": "physical"
      },
      {
        "name": "Tackle",
        "accuracy": 100,
        "power": 40,
        "type": "normal",
        "category": "physical"
      }
    ]
  },
  {
    "id": 217,
    "name": "Ursaring",
    "type1": "normal",
    "type2": "",
    "hp": 90,
    "atk": 130,
    "def": 75,
    "spAtk": 75,
    "spDef": 75,
    "speed": 55,
    "height": 18,
    "weight": 1258,
    "evolutionStage": 2,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Hidden Power",
        "accuracy": 100,
        "power": 60,
        "type": "normal",
        "category": "special"
      },
      {
        "name": "Covet",
        "accuracy": 100,
        "power": 60,
        "type": "normal",
        "category": "physical"
      },
      {
        "name": "Round",
        "accuracy": 100,
        "power": 60,
        "type": "normal",
        "category": "special"
      }
    ]
  },
  {
    "id": 218,
    "name": "Slugma",
    "type1": "fire",
    "type2": "",
    "hp": 40,
    "atk": 40,
    "def": 40,
    "spAtk": 70,
    "spDef": 40,
    "speed": 20,
    "height": 7,
    "weight": 350,
    "evolutionStage": 1,
    "evolution1Name": "Magcargo",
    "evolution1Num": 219,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Fire Spin",
        "accuracy": 85,
        "power": 35,
        "type": "fire",
        "category": "special"
      },
      {
        "name": "Ember",
        "accuracy": 100,
        "power": 40,
        "type": "fire",
        "category": "special"
      },
      {
        "name": "Flame Charge",
        "accuracy": 100,
        "power": 50,
        "type": "fire",
        "category": "physical"
      }
    ]
  },
  {
    "id": 219,
    "name": "Magcargo",
    "type1": "fire",
    "type2": "rock",
    "hp": 60,
    "atk": 50,
    "def": 120,
    "spAtk": 90,
    "spDef": 80,
    "speed": 30,
    "height": 8,
    "weight": 550,
    "evolutionStage": 2,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Incinerate",
        "accuracy": 100,
        "power": 60,
        "type": "fire",
        "category": "special"
      },
      {
        "name": "Flame Burst",
        "accuracy": 100,
        "power": 70,
        "type": "fire",
        "category": "special"
      },
      {
        "name": "Rock Tomb",
        "accuracy": 95,
        "power": 60,
        "type": "rock",
        "category": "physical"
      }
    ]
  },
  {
    "id": 220,
    "name": "Swinub",
    "type1": "ice",
    "type2": "ground",
    "hp": 50,
    "atk": 50,
    "def": 40,
    "spAtk": 30,
    "spDef": 30,
    "speed": 50,
    "height": 4,
    "weight": 65,
    "evolutionStage": 1,
    "evolution1Name": "Piloswine",
    "evolution1Num": 221,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Icicle Spear",
        "accuracy": 100,
        "power": 25,
        "type": "ice",
        "category": "physical"
      },
      {
        "name": "Powder Snow",
        "accuracy": 100,
        "power": 40,
        "type": "ice",
        "category": "special"
      },
      {
        "name": "Mud Slap",
        "accuracy": 100,
        "power": 20,
        "type": "ground",
        "category": "special"
      }
    ]
  },
  {
    "id": 221,
    "name": "Piloswine",
    "type1": "ice",
    "type2": "ground",
    "hp": 100,
    "atk": 100,
    "def": 80,
    "spAtk": 60,
    "spDef": 60,
    "speed": 50,
    "height": 11,
    "weight": 558,
    "evolutionStage": 2,
    "evolution1Name": "Mamoswine",
    "evolution1Num": 473,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Avalanche",
        "accuracy": 100,
        "power": 60,
        "type": "ice",
        "category": "physical"
      },
      {
        "name": "Ice Fang",
        "accuracy": 95,
        "power": 65,
        "type": "ice",
        "category": "physical"
      },
      {
        "name": "Bulldoze",
        "accuracy": 100,
        "power": 60,
        "type": "ground",
        "category": "physical"
      }
    ]
  },
  {
    "id": 222,
    "name": "Corsola",
    "type1": "water",
    "type2": "rock",
    "hp": 65,
    "atk": 55,
    "def": 95,
    "spAtk": 65,
    "spDef": 95,
    "speed": 35,
    "height": 6,
    "weight": 50,
    "evolutionStage": 1,
    "evolution1Name": "Cursola",
    "evolution1Num": 864,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Whirlpool",
        "accuracy": 85,
        "power": 35,
        "type": "water",
        "category": "special"
      },
      {
        "name": "Bubble",
        "accuracy": 100,
        "power": 40,
        "type": "water",
        "category": "special"
      },
      {
        "name": "Rock Blast",
        "accuracy": 90,
        "power": 25,
        "type": "rock",
        "category": "physical"
      }
    ]
  },
  {
    "id": 223,
    "name": "Remoraid",
    "type1": "water",
    "type2": "",
    "hp": 35,
    "atk": 65,
    "def": 35,
    "spAtk": 65,
    "spDef": 35,
    "speed": 65,
    "height": 6,
    "weight": 120,
    "evolutionStage": 1,
    "evolution1Name": "Octillery",
    "evolution1Num": 224,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Whirlpool",
        "accuracy": 85,
        "power": 35,
        "type": "water",
        "category": "special"
      },
      {
        "name": "Water Gun",
        "accuracy": 100,
        "power": 40,
        "type": "water",
        "category": "special"
      },
      {
        "name": "Bubble",
        "accuracy": 100,
        "power": 40,
        "type": "water",
        "category": "special"
      }
    ]
  },
  {
    "id": 224,
    "name": "Octillery",
    "type1": "water",
    "type2": "",
    "hp": 75,
    "atk": 105,
    "def": 75,
    "spAtk": 105,
    "spDef": 75,
    "speed": 45,
    "height": 9,
    "weight": 285,
    "evolutionStage": 2,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Bubble Beam",
        "accuracy": 100,
        "power": 65,
        "type": "water",
        "category": "special"
      },
      {
        "name": "Octazooka",
        "accuracy": 85,
        "power": 65,
        "type": "water",
        "category": "special"
      },
      {
        "name": "Brine",
        "accuracy": 100,
        "power": 65,
        "type": "water",
        "category": "special"
      }
    ]
  },
  {
    "id": 225,
    "name": "Delibird",
    "type1": "ice",
    "type2": "flying",
    "hp": 45,
    "atk": 55,
    "def": 45,
    "spAtk": 65,
    "spDef": 45,
    "speed": 75,
    "height": 9,
    "weight": 160,
    "evolutionStage": 1,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Triple Axel",
        "accuracy": 90,
        "power": 20,
        "type": "ice",
        "category": "physical"
      },
      {
        "name": "Icicle Spear",
        "accuracy": 100,
        "power": 25,
        "type": "ice",
        "category": "physical"
      },
      {
        "name": "Dual Wingbeat",
        "accuracy": 90,
        "power": 40,
        "type": "flying",
        "category": "physical"
      }
    ]
  },
  {
    "id": 226,
    "name": "Mantine",
    "type1": "water",
    "type2": "flying",
    "hp": 85,
    "atk": 40,
    "def": 70,
    "spAtk": 80,
    "spDef": 140,
    "speed": 70,
    "height": 21,
    "weight": 2200,
    "evolutionStage": 2,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Water Pulse",
        "accuracy": 100,
        "power": 60,
        "type": "water",
        "category": "special"
      },
      {
        "name": "Bubble Beam",
        "accuracy": 100,
        "power": 65,
        "type": "water",
        "category": "special"
      },
      {
        "name": "Wing Attack",
        "accuracy": 100,
        "power": 60,
        "type": "flying",
        "category": "physical"
      }
    ]
  },
  {
    "id": 227,
    "name": "Skarmory",
    "type1": "steel",
    "type2": "flying",
    "hp": 65,
    "atk": 80,
    "def": 140,
    "spAtk": 40,
    "spDef": 70,
    "speed": 70,
    "height": 17,
    "weight": 505,
    "evolutionStage": 1,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Metal Claw",
        "accuracy": 95,
        "power": 50,
        "type": "steel",
        "category": "physical"
      },
      {
        "name": "Peck",
        "accuracy": 100,
        "power": 35,
        "type": "flying",
        "category": "physical"
      },
      {
        "name": "Steel Roller",
        "accuracy": 100,
        "power": 130,
        "type": "steel",
        "category": "physical"
      }
    ]
  },
  {
    "id": 228,
    "name": "Houndour",
    "type1": "dark",
    "type2": "fire",
    "hp": 45,
    "atk": 60,
    "def": 30,
    "spAtk": 80,
    "spDef": 50,
    "speed": 65,
    "height": 6,
    "weight": 108,
    "evolutionStage": 1,
    "evolution1Name": "Houndoom",
    "evolution1Num": 229,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Pursuit",
        "accuracy": 100,
        "power": 40,
        "type": "dark",
        "category": "physical"
      },
      {
        "name": "Payback",
        "accuracy": 100,
        "power": 50,
        "type": "dark",
        "category": "physical"
      },
      {
        "name": "Fire Spin",
        "accuracy": 85,
        "power": 35,
        "type": "fire",
        "category": "special"
      }
    ]
  },
  {
    "id": 229,
    "name": "Houndoom",
    "type1": "dark",
    "type2": "fire",
    "hp": 75,
    "atk": 90,
    "def": 50,
    "spAtk": 110,
    "spDef": 80,
    "speed": 95,
    "height": 14,
    "weight": 350,
    "evolutionStage": 2,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Bite",
        "accuracy": 100,
        "power": 60,
        "type": "dark",
        "category": "physical"
      },
      {
        "name": "Feint Attack",
        "accuracy": 100,
        "power": 60,
        "type": "dark",
        "category": "physical"
      },
      {
        "name": "Incinerate",
        "accuracy": 100,
        "power": 60,
        "type": "fire",
        "category": "special"
      }
    ]
  },
  {
    "id": 230,
    "name": "Kingdra",
    "type1": "water",
    "type2": "dragon",
    "hp": 75,
    "atk": 95,
    "def": 95,
    "spAtk": 95,
    "spDef": 95,
    "speed": 85,
    "height": 18,
    "weight": 1520,
    "evolutionStage": 3,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Liquidation",
        "accuracy": 100,
        "power": 85,
        "type": "water",
        "category": "physical"
      },
      {
        "name": "Surf",
        "accuracy": 100,
        "power": 90,
        "type": "water",
        "category": "special"
      },
      {
        "name": "Dragon Pulse",
        "accuracy": 100,
        "power": 85,
        "type": "dragon",
        "category": "special"
      }
    ]
  },
  {
    "id": 231,
    "name": "Phanpy",
    "type1": "ground",
    "type2": "",
    "hp": 90,
    "atk": 60,
    "def": 60,
    "spAtk": 40,
    "spDef": 40,
    "speed": 40,
    "height": 5,
    "weight": 335,
    "evolutionStage": 1,
    "evolution1Name": "Donphan",
    "evolution1Num": 232,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Mud Slap",
        "accuracy": 100,
        "power": 20,
        "type": "ground",
        "category": "special"
      },
      {
        "name": "Sand Tomb",
        "accuracy": 85,
        "power": 35,
        "type": "ground",
        "category": "physical"
      },
      {
        "name": "Mud Shot",
        "accuracy": 95,
        "power": 55,
        "type": "ground",
        "category": "special"
      }
    ]
  },
  {
    "id": 232,
    "name": "Donphan",
    "type1": "ground",
    "type2": "",
    "hp": 90,
    "atk": 120,
    "def": 120,
    "spAtk": 60,
    "spDef": 60,
    "speed": 50,
    "height": 11,
    "weight": 1200,
    "evolutionStage": 2,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Bulldoze",
        "accuracy": 100,
        "power": 60,
        "type": "ground",
        "category": "physical"
      },
      {
        "name": "Stomping Tantrum",
        "accuracy": 100,
        "power": 75,
        "type": "ground",
        "category": "physical"
      },
      {
        "name": "Precipice Blades",
        "accuracy": 85,
        "power": 120,
        "type": "ground",
        "category": "physical"
      }
    ]
  },
  {
    "id": 233,
    "name": "Porygon2",
    "type1": "normal",
    "type2": "",
    "hp": 85,
    "atk": 80,
    "def": 90,
    "spAtk": 105,
    "spDef": 95,
    "speed": 60,
    "height": 6,
    "weight": 325,
    "evolutionStage": 1,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Tackle",
        "accuracy": 100,
        "power": 40,
        "type": "normal",
        "category": "physical"
      },
      {
        "name": "Snore",
        "accuracy": 100,
        "power": 50,
        "type": "normal",
        "category": "special"
      },
      {
        "name": "Swift",
        "accuracy": 100,
        "power": 60,
        "type": "normal",
        "category": "special"
      }
    ]
  },
  {
    "id": 234,
    "name": "Stantler",
    "type1": "normal",
    "type2": "",
    "hp": 73,
    "atk": 95,
    "def": 62,
    "spAtk": 85,
    "spDef": 65,
    "speed": 85,
    "height": 14,
    "weight": 712,
    "evolutionStage": 1,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Rage",
        "accuracy": 100,
        "power": 20,
        "type": "normal",
        "category": "physical"
      },
      {
        "name": "Tackle",
        "accuracy": 100,
        "power": 40,
        "type": "normal",
        "category": "physical"
      },
      {
        "name": "Snore",
        "accuracy": 100,
        "power": 50,
        "type": "normal",
        "category": "special"
      }
    ]
  },
  {
    "id": 235,
    "name": "Smeargle",
    "type1": "normal",
    "type2": "",
    "hp": 55,
    "atk": 20,
    "def": 35,
    "spAtk": 20,
    "spDef": 45,
    "speed": 75,
    "height": 12,
    "weight": 580,
    "evolutionStage": 1,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Mega Kick",
        "accuracy": 75,
        "power": 120,
        "type": "normal",
        "category": "physical"
      },
      {
        "name": "Thrash",
        "accuracy": 100,
        "power": 120,
        "type": "normal",
        "category": "physical"
      },
      {
        "name": "Double Edge",
        "accuracy": 100,
        "power": 120,
        "type": "normal",
        "category": "physical"
      }
    ]
  },
  {
    "id": 236,
    "name": "Tyrogue",
    "type1": "fighting",
    "type2": "",
    "hp": 35,
    "atk": 35,
    "def": 35,
    "spAtk": 35,
    "spDef": 35,
    "speed": 35,
    "height": 7,
    "weight": 210,
    "evolutionStage": 1,
    "evolution1Name": "Hitmonlee",
    "evolution1Num": 106,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Mach Punch",
        "accuracy": 100,
        "power": 40,
        "type": "fighting",
        "category": "physical"
      },
      {
        "name": "Rock Smash",
        "accuracy": 100,
        "power": 40,
        "type": "fighting",
        "category": "physical"
      },
      {
        "name": "Vacuum Wave",
        "accuracy": 100,
        "power": 40,
        "type": "fighting",
        "category": "special"
      }
    ]
  },
  {
    "id": 237,
    "name": "Hitmontop",
    "type1": "fighting",
    "type2": "",
    "hp": 50,
    "atk": 95,
    "def": 95,
    "spAtk": 35,
    "spDef": 110,
    "speed": 70,
    "height": 14,
    "weight": 480,
    "evolutionStage": 1,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Triple Kick",
        "accuracy": 90,
        "power": 10,
        "type": "fighting",
        "category": "physical"
      },
      {
        "name": "Rock Smash",
        "accuracy": 100,
        "power": 40,
        "type": "fighting",
        "category": "physical"
      },
      {
        "name": "Vacuum Wave",
        "accuracy": 100,
        "power": 40,
        "type": "fighting",
        "category": "special"
      }
    ]
  },
  {
    "id": 238,
    "name": "Smoochum",
    "type1": "ice",
    "type2": "psychic",
    "hp": 45,
    "atk": 30,
    "def": 15,
    "spAtk": 85,
    "spDef": 65,
    "speed": 65,
    "height": 4,
    "weight": 60,
    "evolutionStage": 1,
    "evolution1Name": "Jynx",
    "evolution1Num": 124,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Powder Snow",
        "accuracy": 100,
        "power": 40,
        "type": "ice",
        "category": "special"
      },
      {
        "name": "Icy Wind",
        "accuracy": 95,
        "power": 55,
        "type": "ice",
        "category": "special"
      },
      {
        "name": "Stored Power",
        "accuracy": 100,
        "power": 20,
        "type": "psychic",
        "category": "special"
      }
    ]
  },
  {
    "id": 239,
    "name": "Elekid",
    "type1": "electric",
    "type2": "",
    "hp": 45,
    "atk": 63,
    "def": 37,
    "spAtk": 65,
    "spDef": 55,
    "speed": 95,
    "height": 6,
    "weight": 235,
    "evolutionStage": 1,
    "evolution1Name": "Electabuzz",
    "evolution1Num": 125,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Thunder Shock",
        "accuracy": 100,
        "power": 40,
        "type": "electric",
        "category": "special"
      },
      {
        "name": "Charge Beam",
        "accuracy": 90,
        "power": 50,
        "type": "electric",
        "category": "special"
      },
      {
        "name": "Electroweb",
        "accuracy": 95,
        "power": 55,
        "type": "electric",
        "category": "special"
      }
    ]
  },
  {
    "id": 240,
    "name": "Magby",
    "type1": "fire",
    "type2": "",
    "hp": 45,
    "atk": 75,
    "def": 37,
    "spAtk": 70,
    "spDef": 55,
    "speed": 83,
    "height": 7,
    "weight": 214,
    "evolutionStage": 1,
    "evolution1Name": "Magmar",
    "evolution1Num": 126,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Fire Spin",
        "accuracy": 85,
        "power": 35,
        "type": "fire",
        "category": "special"
      },
      {
        "name": "Ember",
        "accuracy": 100,
        "power": 40,
        "type": "fire",
        "category": "special"
      },
      {
        "name": "Flame Charge",
        "accuracy": 100,
        "power": 50,
        "type": "fire",
        "category": "physical"
      }
    ]
  },
  {
    "id": 241,
    "name": "Miltank",
    "type1": "normal",
    "type2": "",
    "hp": 95,
    "atk": 80,
    "def": 105,
    "spAtk": 40,
    "spDef": 70,
    "speed": 100,
    "height": 12,
    "weight": 755,
    "evolutionStage": 1,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Tackle",
        "accuracy": 100,
        "power": 40,
        "type": "normal",
        "category": "physical"
      },
      {
        "name": "Echoed Voice",
        "accuracy": 100,
        "power": 40,
        "type": "normal",
        "category": "special"
      },
      {
        "name": "Snore",
        "accuracy": 100,
        "power": 50,
        "type": "normal",
        "category": "special"
      }
    ]
  },
  {
    "id": 242,
    "name": "Blissey",
    "type1": "normal",
    "type2": "",
    "hp": 255,
    "atk": 10,
    "def": 10,
    "spAtk": 75,
    "spDef": 135,
    "speed": 55,
    "height": 15,
    "weight": 468,
    "evolutionStage": 4,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Last Resort",
        "accuracy": 100,
        "power": 140,
        "type": "normal",
        "category": "physical"
      },
      {
        "name": "Hyper Beam",
        "accuracy": 90,
        "power": 150,
        "type": "normal",
        "category": "special"
      },
      {
        "name": "Giga Impact",
        "accuracy": 90,
        "power": 150,
        "type": "normal",
        "category": "physical"
      }
    ]
  },
  {
    "id": 243,
    "name": "Raikou",
    "type1": "electric",
    "type2": "",
    "hp": 90,
    "atk": 85,
    "def": 75,
    "spAtk": 115,
    "spDef": 100,
    "speed": 115,
    "height": 19,
    "weight": 1780,
    "evolutionStage": 1,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Thunder Shock",
        "accuracy": 100,
        "power": 40,
        "type": "electric",
        "category": "special"
      },
      {
        "name": "Charge Beam",
        "accuracy": 90,
        "power": 50,
        "type": "electric",
        "category": "special"
      },
      {
        "name": "Electroweb",
        "accuracy": 95,
        "power": 55,
        "type": "electric",
        "category": "special"
      }
    ]
  },
  {
    "id": 244,
    "name": "Entei",
    "type1": "fire",
    "type2": "",
    "hp": 115,
    "atk": 115,
    "def": 85,
    "spAtk": 90,
    "spDef": 75,
    "speed": 100,
    "height": 21,
    "weight": 1980,
    "evolutionStage": 1,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Fire Spin",
        "accuracy": 85,
        "power": 35,
        "type": "fire",
        "category": "special"
      },
      {
        "name": "Ember",
        "accuracy": 100,
        "power": 40,
        "type": "fire",
        "category": "special"
      },
      {
        "name": "Flame Charge",
        "accuracy": 100,
        "power": 50,
        "type": "fire",
        "category": "physical"
      }
    ]
  },
  {
    "id": 245,
    "name": "Suicune",
    "type1": "water",
    "type2": "",
    "hp": 100,
    "atk": 75,
    "def": 115,
    "spAtk": 90,
    "spDef": 115,
    "speed": 85,
    "height": 20,
    "weight": 1870,
    "evolutionStage": 1,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Whirlpool",
        "accuracy": 85,
        "power": 35,
        "type": "water",
        "category": "special"
      },
      {
        "name": "Water Gun",
        "accuracy": 100,
        "power": 40,
        "type": "water",
        "category": "special"
      },
      {
        "name": "Water Pulse",
        "accuracy": 100,
        "power": 60,
        "type": "water",
        "category": "special"
      }
    ]
  },
  {
    "id": 246,
    "name": "Larvitar",
    "type1": "rock",
    "type2": "ground",
    "hp": 50,
    "atk": 64,
    "def": 50,
    "spAtk": 45,
    "spDef": 50,
    "speed": 41,
    "height": 6,
    "weight": 720,
    "evolutionStage": 1,
    "evolution1Name": "Pupitar",
    "evolution1Num": 247,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Rock Blast",
        "accuracy": 90,
        "power": 25,
        "type": "rock",
        "category": "physical"
      },
      {
        "name": "Smack Down",
        "accuracy": 100,
        "power": 50,
        "type": "rock",
        "category": "physical"
      },
      {
        "name": "Mud Slap",
        "accuracy": 100,
        "power": 20,
        "type": "ground",
        "category": "special"
      }
    ]
  },
  {
    "id": 247,
    "name": "Pupitar",
    "type1": "rock",
    "type2": "ground",
    "hp": 70,
    "atk": 84,
    "def": 70,
    "spAtk": 65,
    "spDef": 70,
    "speed": 51,
    "height": 12,
    "weight": 1520,
    "evolutionStage": 2,
    "evolution1Name": "Tyranitar",
    "evolution1Num": 248,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Rock Slide",
        "accuracy": 90,
        "power": 75,
        "type": "rock",
        "category": "physical"
      },
      {
        "name": "Stomping Tantrum",
        "accuracy": 100,
        "power": 75,
        "type": "ground",
        "category": "physical"
      },
      {
        "name": "Rock Wrecker",
        "accuracy": 90,
        "power": 150,
        "type": "rock",
        "category": "physical"
      }
    ]
  },
  {
    "id": 248,
    "name": "Tyranitar",
    "type1": "rock",
    "type2": "dark",
    "hp": 100,
    "atk": 134,
    "def": 110,
    "spAtk": 95,
    "spDef": 100,
    "speed": 61,
    "height": 20,
    "weight": 2020,
    "evolutionStage": 3,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Stone Edge",
        "accuracy": 80,
        "power": 100,
        "type": "rock",
        "category": "physical"
      },
      {
        "name": "Foul Play",
        "accuracy": 100,
        "power": 95,
        "type": "dark",
        "category": "physical"
      },
      {
        "name": "Splintered Stormshards",
        "accuracy": 100,
        "power": 190,
        "type": "rock",
        "category": "physical"
      }
    ]
  },
  {
    "id": 249,
    "name": "Lugia",
    "type1": "psychic",
    "type2": "flying",
    "hp": 106,
    "atk": 90,
    "def": 130,
    "spAtk": 90,
    "spDef": 154,
    "speed": 110,
    "height": 52,
    "weight": 2160,
    "evolutionStage": 1,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Gust",
        "accuracy": 100,
        "power": 40,
        "type": "flying",
        "category": "special"
      },
      {
        "name": "Light That Burns The Sky",
        "accuracy": 100,
        "power": 200,
        "type": "psychic",
        "category": "special"
      },
      {
        "name": "Genesis Supernova",
        "accuracy": 100,
        "power": 185,
        "type": "psychic",
        "category": "special"
      }
    ]
  },
  {
    "id": 250,
    "name": "Ho-oh",
    "type1": "fire",
    "type2": "flying",
    "hp": 106,
    "atk": 130,
    "def": 90,
    "spAtk": 110,
    "spDef": 154,
    "speed": 90,
    "height": 38,
    "weight": 1990,
    "evolutionStage": 1,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Fire Spin",
        "accuracy": 85,
        "power": 35,
        "type": "fire",
        "category": "special"
      },
      {
        "name": "Flame Charge",
        "accuracy": 100,
        "power": 50,
        "type": "fire",
        "category": "physical"
      },
      {
        "name": "Gust",
        "accuracy": 100,
        "power": 40,
        "type": "flying",
        "category": "special"
      }
    ]
  },
  {
    "id": 251,
    "name": "Celebi",
    "type1": "psychic",
    "type2": "grass",
    "hp": 100,
    "atk": 100,
    "def": 100,
    "spAtk": 100,
    "spDef": 100,
    "speed": 100,
    "height": 6,
    "weight": 50,
    "evolutionStage": 1,
    "evolution1Name": "",
    "evolution1Num": null,
    "evolution2Name": "",
    "evolution2Num": null,
    "moves": [
      {
        "name": "Confusion",
        "accuracy": 100,
        "power": 50,
        "type": "psychic",
        "category": "special"
      },
      {
        "name": "Magical Leaf",
        "accuracy": 100,
        "power": 60,
        "type": "grass",
        "category": "special"
      },
      {
        "name": "Light That Burns The Sky",
        "accuracy": 100,
        "power": 200,
        "type": "psychic",
        "category": "special"
      }
    ]
  }
];