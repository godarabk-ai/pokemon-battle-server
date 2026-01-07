# Pokemon Battle Server

Real-time multiplayer server for Pokemon Battle game using Socket.io.

## Features
- Room creation with 6-character invite codes
- Real-time game state synchronization
- WebSocket-based communication
- Automatic room cleanup after 30 minutes of inactivity

## Installation

```bash
npm install
```

## Running Locally

```bash
npm start
```

Server runs on port 3000 by default.

## Environment Variables

- `PORT` - Server port (default: 3000)

## Deployment

### Railway.app (Recommended - Free Tier)

1. Push this folder to GitHub
2. Go to [railway.app](https://railway.app)
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Railway will auto-detect Node.js and deploy
6. Copy your deployment URL

### Render.com

1. Push to GitHub
2. Go to [render.com](https://render.com)
3. New → Web Service
4. Connect your GitHub repo
5. Settings:
   - Build Command: `npm install`
   - Start Command: `npm start`
6. Deploy

### Manual Deployment (Any VPS)

```bash
# Install Node.js on server
# Clone your repo
git clone <your-repo-url>
cd server
npm install

# Run with PM2 (recommended)
npm install -g pm2
pm2 start index.js --name pokemon-server
pm2 save
pm2 startup
```

## API Endpoints

- `GET /health` - Health check
- `GET /room/:code` - Get room status

## Socket Events

### Client → Server
- `create-room` - Create a new room
- `join-room` - Join existing room
- `player-ready` - Mark player as ready
- `team-drafted` - Send team data
- `game-action` - Send game action (move/switch/evolve)
- `turn-changed` - Notify turn change
- `hp-update` - Sync HP changes
- `pokemon-fainted` - Notify faint
- `game-over` - Notify game end
- `request-rematch` - Request rematch
- `accept-rematch` - Accept rematch
- `chat-message` - Send chat message
- `leave-room` - Leave current room

### Server → Client
- `room-created` - Room created successfully
- `room-joined` - Joined room successfully
- `join-error` - Join failed
- `opponent-joined` - Opponent joined room
- `opponent-left` - Opponent left room
- `host-left` - Host left, room closed
- `ready-state` - Ready state update
- `game-start` - Game starting
- `battle-ready` - Both teams ready
- `opponent-action` - Opponent performed action
- `turn-update` - Turn changed
- `hp-sync` - HP synchronized
- `faint-sync` - Faint synchronized
- `match-ended` - Match ended
- `rematch-requested` - Rematch requested
- `rematch-accepted` - Rematch accepted
- `room-expired` - Room expired
- `chat-message` - Chat message received

## License

MIT
