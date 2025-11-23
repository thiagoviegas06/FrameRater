# FrameRatr (Backend)

## What this is
Backend for movie/TV discovery, ratings, favorites. TMDB + Postgres + Firebase Auth.

 ## Frontend

If you have installed Node.js, run the following commands from the root project directory to install all required packages for the frontend React.js server.

$ cd frontend

$ npm install
$ npm install firebase
Once JavaScript package installation is complete, start the frontend server using this command
$ npm run start
The React development server will start running at http://localhost:3000.

 ## For Icons
 npm install @mui/icons-material @mui/material @emotion/styled @emotion/react

## Quick start
```bash
# 1) Clone
git clone <your-repo-url>
cd FrameRatr

# 2) Create .env from example
cp .env.example .env
# Fill values (DB_*, TMDB_TOKEN, FIREBASE_*), but keep this file private.

# 3) Start services (example)
docker compose up --build
# or: python -m venv .venv && source .venv/bin/activate && pip install -r requirements.txt
