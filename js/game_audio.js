/* GAME AUDIO
   - Manages BGM (Looping) and SFX (One-shots)
   - Handles "Autoplay Policy" (waiting for first click)
   - Allows overlapping SFX (cloning Audio nodes)
   - Pokemon cries on entry/death
   - Attack-specific sounds with charge-up vibration
*/

const AudioEngine = {
    enabled: true,
    bgmPlaying: false,
    cryVolume: 0.7,
    sfxVolume: 0.8,
    bgmVolume: 0.35,
    
    // Store Audio objects here
    sounds: {
        bgm: null,
        attack: null,
        hit: null,
        win: null,
        heartbeat: null
    },

    // Cache for loaded cries and attack sounds
    cryCache: {},
    attackSoundCache: {},

    init() {
        try {
            this.sounds.bgm = new Audio('assets/audio/bgm_battle.mp3');
            this.sounds.bgm.loop = true;
            this.sounds.bgm.volume = this.bgmVolume;

            this.sounds.attack = new Audio('assets/audio/sfx_attack.mp3');
            this.sounds.hit = new Audio('assets/audio/sfx_hit.mp3');
            this.sounds.win = new Audio('assets/audio/sfx_win.mp3');
            
            // Heartbeat for danger mode (<20% HP)
            this.sounds.heartbeat = new Audio('assets/audio/sfx_heartbeat.mp3');
            this.sounds.heartbeat.loop = true;
            this.sounds.heartbeat.volume = 0.4;
            
            console.log("Audio Engine Initialized");
        } catch (e) {
            console.error("Audio Load Error:", e);
        }
    },

    playBGM() {
        if (!this.enabled || !this.sounds.bgm) return;
        
        const promise = this.sounds.bgm.play();
        
        if (promise !== undefined) {
            promise.then(() => {
                this.bgmPlaying = true;
            }).catch(error => {
                console.log("Autoplay prevented. Waiting for interaction.");
            });
        }
    },

    stopBGM() {
        if (this.sounds.bgm) {
            this.sounds.bgm.pause();
            this.sounds.bgm.currentTime = 0;
            this.bgmPlaying = false;
        }
    },

    playSFX(key) {
        if (!this.enabled || !this.sounds[key]) return;

        try {
            const sfx = this.sounds[key].cloneNode();
            sfx.volume = this.sfxVolume; 
            sfx.play().catch(e => { /* Ignore autoplay errors for SFX */ });
        } catch (e) {
            console.error("SFX Error:", e);
        }
    },

    // Play Pokemon cry on spawn or faint
    async playCry(pokemonName, onFaint = false) {
        if (!this.enabled) return;
        
        const name = String(pokemonName || '').toLowerCase().replace(/[^a-z]/g, '');
        if (!name) return;

        try {
            let audio = this.cryCache[name];
            if (!audio) {
                audio = new Audio(`assets/audio/cries/${name}.mp3`);
                this.cryCache[name] = audio;
            }
            
            const cry = audio.cloneNode();
            cry.volume = this.cryVolume;
            
            // On faint, play slower/lower pitch effect
            if (onFaint) {
                cry.playbackRate = 0.7;
                cry.volume = this.cryVolume * 0.8;
            }
            
            await cry.play().catch(() => {});
        } catch (e) {
            // Cry file might not exist, fail silently
        }
    },

    // Play attack sound with vibrate-charge mechanic
    // If sound is longer, cut it and play during charge-up vibration
    async playAttackSound(moveName, chargeCallback) {
        if (!this.enabled) return { duration: 0 };
        
        // Normalize move name to match file naming
        const normalized = String(moveName || '')
            .replace(/[^a-zA-Z0-9]/g, '')
            .replace(/\s+/g, '');
        
        if (!normalized) {
            this.playSFX('attack');
            return { duration: 200 };
        }

        try {
            let audio = this.attackSoundCache[normalized];
            if (!audio) {
                audio = new Audio(`assets/audio/attack sounds/${normalized}.wav`);
                this.attackSoundCache[normalized] = audio;
                
                // Wait for metadata to load
                await new Promise((resolve) => {
                    audio.addEventListener('loadedmetadata', resolve, { once: true });
                    audio.addEventListener('error', resolve, { once: true });
                    setTimeout(resolve, 500); // Timeout fallback
                });
            }
            
            const sfx = audio.cloneNode();
            sfx.volume = this.sfxVolume;
            
            // Get duration - if longer than 600ms, implement charge mechanic
            const duration = (audio.duration || 0) * 1000;
            const maxChargeDuration = 600;
            
            if (duration > maxChargeDuration && chargeCallback) {
                // Play first half during charge-up vibration
                const chargeDuration = Math.min(duration * 0.5, maxChargeDuration);
                
                // Start sound and trigger charge animation
                sfx.play().catch(() => {});
                chargeCallback(chargeDuration);
                
                // After charge duration, let attack proceed
                await new Promise(r => setTimeout(r, chargeDuration));
                
                return { duration: chargeDuration, continuing: true, audio: sfx };
            } else {
                // Short sound - play normally
                sfx.play().catch(() => {});
                return { duration: Math.min(duration, 400) };
            }
        } catch (e) {
            // Fall back to generic attack sound
            this.playSFX('attack');
            return { duration: 200 };
        }
    },

    // Stop attack sound if needed
    stopAttackSound(audioRef) {
        if (audioRef && audioRef.audio) {
            try {
                audioRef.audio.pause();
                audioRef.audio.currentTime = 0;
            } catch (e) {}
        }
    },

    // Danger mode heartbeat
    startHeartbeat() {
        if (!this.enabled || !this.sounds.heartbeat) return;
        try {
            this.sounds.heartbeat.play().catch(() => {});
        } catch (e) {}
    },

    stopHeartbeat() {
        if (this.sounds.heartbeat) {
            try {
                this.sounds.heartbeat.pause();
                this.sounds.heartbeat.currentTime = 0;
            } catch (e) {}
        }
    },

    toggleMute() {
        this.enabled = !this.enabled;
        if (!this.enabled) {
            this.stopBGM();
            this.stopHeartbeat();
        } else {
            this.playBGM();
        }
        return this.enabled;
    }
};

// Expose to global window
window.AudioEngine = AudioEngine;