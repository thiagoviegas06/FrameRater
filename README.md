# FrameRatr

> Movie discovery platform with ratings, reviews, and personalized recommendations

## Features

- Search 1M+ movies & TV shows (TMDb API)
- Rate and review content
- Save favorites
- Secure authentication (Firebase)
- Production-ready AWS deployment
- Enterprise security (AWS Secrets Manager)

## Quick Start
```bash
# 1. Clone
git clone <your-repo-url>
cd FrameRatr


## Frontend

- If you have Node.js installed, run the following commands from the project root to install all required packages for the frontend React.js server.


$ cd frontend
$ npm install
$ npm install firebase

- Once JavaScript package installation is complete, start the frontend server using this command

$ npm run start

The React development server will start running at http://localhost:3000.

For Icons
$ npm install @mui/icons-material @mui/material @emotion/styled @emotion/react


# Set up backend
cd backend

# Run environment
python -m venv .venv
.\.venv\Scripts\activate
# Install requirements
pip install -r requirements.txt

# Set up secrets (AWS)
python setup_secrets.py

# 3. Start services
docker compose up --build
```

## Architecture

- **Backend**: Flask + PostgreSQL + TMDb API
- **Auth**: Firebase Authentication
- **Deployment**: AWS ECS + RDS + ALB
- **Secrets**: AWS Secrets Manager

## Documentation

- [Setup Guide](Docs/README.md)
- [Tech Spec](Docs/techspec.md)
- [API Documentation](backend/README.md)

## Team

Built by FrameRatr