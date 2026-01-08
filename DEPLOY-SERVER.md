# Deploy Server to Git & Cloud

## Step 1: Initialize Git Repository

Open Command Prompt in `d:\pokemon\server`:

```cmd
cd d:\pokemon\server
git init
git add .
git commit -m "Initial commit: Pokemon Battle multiplayer server"
```

## Step 2: Create GitHub Repository

1. Go to [github.com](https://github.com) and log in
2. Click **+** (top right) → **New repository**
3. Name: `pokemon-battle-server`
4. Description: `Real-time multiplayer server for Pokemon Battle`
5. **Public** or **Private** (your choice)
6. **Do NOT** initialize with README (we already have one)
7. Click **Create repository**

## Step 3: Push to GitHub

GitHub will show you commands. Run these in `d:\pokemon\server`:

```cmd
git remote add origin https://github.com/YOUR-USERNAME/pokemon-battle-server.git
git branch -M main
git push -u origin main
```

Replace `YOUR-USERNAME` with your GitHub username (e.g., `godarabk-ai`).

---

## Step 4: Deploy to Railway.app (FREE)

### Why Railway?
- ✅ Free tier available
- ✅ Auto-deploys from GitHub
- ✅ Provides HTTPS URL
- ✅ No credit card required for free tier

### Steps:

1. **Go to [railway.app](https://railway.app)**

2. **Sign up with GitHub**

3. **New Project → Deploy from GitHub repo**

4. **Select `pokemon-battle-server`**

5. **Railway auto-detects Node.js and deploys**
   - It will run `npm install` and `npm start` automatically

6. **Get your URL:**
   - Click on your deployment
   - Go to **Settings** tab
   - Click **Generate Domain**
   - Copy the URL (e.g., `https://pokemon-battle-server-production.up.railway.app`)

7. **Update your game:**
   - Open `d:\pokemon\js\network.js`
   - Line 7: Change `serverUrl` to your Railway URL
   - Save and rebuild: `node build.js && npx cap sync`

---

## Alternative: Deploy to Render.com (FREE)

1. **Go to [render.com](https://render.com)**

2. **Sign up with GitHub**

3. **New → Web Service**

4. **Connect your `pokemon-battle-server` repo**

5. **Configure:**
   - Name: `pokemon-battle-server`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Plan: **Free**

6. **Create Web Service**

7. **Copy your URL** (e.g., `https://pokemon-battle-server.onrender.com`)
   - **Your server:** `https://pokemon-battle-server.onrender.com`

8. **Update `js/network.js`** with your Render URL

---

## Step 5: Test Your Deployment

1. Open browser to your server URL
2. Should see: `Cannot GET /`
3. Try: `https://your-url.com/health`
4. Should see: `{"status":"ok","rooms":0}`

✅ If you see this, your server is live!

---

## Step 6: Update Your Android App

1. Edit `d:\pokemon\js\network.js` (✅ Already updated):
   ```javascript
   serverUrl: 'https://pokemon-battle-server.onrender.com',
   ```

2. Rebuild and sync:
   ```cmd
   cd d:\pokemon
   node build.js
   cmd /c "npx cap sync"
   ```

3. Rebuild APK in Android Studio

---

## Troubleshooting

### "Cannot connect to server"
- Check server URL is correct (no trailing slash)
- Ensure server is running (check Railway/Render dashboard)
- Check server logs for errors

### "Room not found"
- Ensure both players are connected to the same server
- Check server logs to see if room was created

### Server crashes
- Check logs in Railway/Render dashboard
- Common issue: Port binding (Railway/Render set PORT env variable automatically)

---

## Monitoring Your Server

### Railway:
- Dashboard → Your Project → Deployments
- Click on a deployment to see logs
- Metrics tab shows CPU/RAM usage

### Render:
- Dashboard → Your Service
- Logs tab shows real-time logs
- Events tab shows deployment history

---

## Updating Your Server

When you make changes:

```cmd
cd d:\pokemon\server
git add .
git commit -m "Description of changes"
git push
```

Railway/Render will automatically redeploy!

---

## Cost

Both Railway and Render have generous free tiers:

**Railway Free Tier:**
- $5 free credits per month
- Enough for ~500 hours of runtime
- Perfect for hobby projects

**Render Free Tier:**
- Free web services (with some limitations)
- Spins down after 15 min of inactivity
- Spins back up on first request (takes ~30 seconds)

For a small game with friends, free tier is plenty!
