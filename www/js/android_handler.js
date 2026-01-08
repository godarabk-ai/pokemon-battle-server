/**
 * Android-specific handlers for Capacitor
 */

// Handle Android back button
document.addEventListener('DOMContentLoaded', () => {
    // Check if running in Capacitor (Android)
    if (window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.App) {
        const { App } = window.Capacitor.Plugins;
        
        App.addListener('backButton', ({ canGoBack }) => {
            console.log('[Android] Back button pressed');
            
            // Check if in online battle
            const isOnline = window.OnlineGame && window.OnlineGame.isOnline;
            const setupScreen = document.getElementById('setup-screen');
            const onlineLobby = document.getElementById('online-lobby');
            const gameOverOverlay = document.getElementById('game-over-overlay');
            
            // If game over screen is showing, just reload
            if (gameOverOverlay && !gameOverOverlay.classList.contains('hidden')) {
                location.reload();
                return;
            }
            
            // If in online lobby, go back to setup
            if (onlineLobby && !onlineLobby.classList.contains('hidden')) {
                if (window.OnlineGame) {
                    window.OnlineGame.goOffline();
                }
                return;
            }
            
            // If in setup screen, exit app
            if (setupScreen && !setupScreen.classList.contains('hidden')) {
                const confirmExit = confirm('Exit game?');
                if (confirmExit) {
                    App.exitApp();
                }
                return;
            }
            
            // If in online battle, show leave/exit prompt
            if (isOnline) {
                const choice = confirm('Leave match? (OK = Leave Match, Cancel = Exit Game)');
                if (choice) {
                    // Leave match - opponent wins
                    if (window.OnlineGame) {
                        const myServerKey = window.OnlineGame.isHost ? 'p1' : 'p2';
                        const opponentKey = myServerKey === 'p1' ? 'p2' : 'p1';
                        
                        // Send game over with opponent as winner
                        if (window.NetworkClient) {
                            window.NetworkClient.sendGameOver(opponentKey);
                        }
                        
                        // Leave room
                        window.OnlineGame.leaveRoom();
                    }
                } else {
                    // Exit game
                    const confirmExit = confirm('Exit game? (Match will be forfeited)');
                    if (confirmExit) {
                        App.exitApp();
                    }
                }
                return;
            }
            
            // In local battle, just reload to go back to setup
            const confirmLeave = confirm('Leave battle and return to setup?');
            if (confirmLeave) {
                location.reload();
            }
        });
        
        console.log('[Android] Back button handler registered');
    }
});

window.AndroidHandler = {
    initialized: true
};
