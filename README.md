# Campaign-Management-Web-Application
Campaign Management Web Application

Full Stack Developer Assignment Project. The main goal of this project is to create a simple Campaign Management Web Application which is a tool for managing marketing campaigns. The project is built using React with Vite on the frontend and Django on the backend.
[Link to demo](http://5.189.135.103/)

## Features

- Create new campaigns with required Title and Landing Page URL
- Add multiple payouts for different countries
- Toggle campaign status (Run/Stop)
- List and search campaigns by:
  - Title
  - Landing Page URL
  - Running status
- View campaign details including Title, Landing Page URL, and Payouts
- Test to check if campaign creation successful in `backend/api/tests.py`

## Domain Model

A Campaign consists of:
- Title (required)
- Landing Page URL (required)
- Is Running (status flag)
- Payouts (at least one required)
  - Amount per specific country

## Development Setup

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Navigate to `http://localhost:5173/`

### Backend
```bash
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```
The API will be available at `http://localhost:8000/`

## Docker

The project includes Docker support for both frontend and backend services.

### Using Docker Compose
```bash
docker-compose up --build
```

This will start both services:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:8000`

### Environment Variables

Frontend:
- `VITE_API_URL`: Backend API URL (default: http://localhost:8000)

Backend:
- `DEBUG`: Django debug mode
- `DJANGO_ALLOWED_HOSTS`: Allowed hosts for Django
- `CORS_ORIGIN_WHITELIST`: Allowed CORS origins

## Project Structure

```
.
├── frontend/               # React + Vite frontend
├── backend/                # Django backend
├── docker-compose.yml      # Docker Compose configuration
├── frontend.Dockerfile     # Frontend Docker configuration
├── backend.Dockerfile      # Backend Docker configuration
└── requirements.txt        # Python dependencies
```

## Docker Configuration

The project uses three Docker-related files:

1. `docker-compose.yml`: Orchestrates both services
2. `frontend.Dockerfile`: Node.js 21 Alpine-based image for frontend
3. `backend.Dockerfile`: Python 3.12 Slim-based image for backend

## Author

[Gregor Uusväli](https://github.com/gregor-uusvali/)
