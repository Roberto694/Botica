# Nova Salud

Nova Salud is a modern full stack pharmacy management system for digital transformation of pharmacy operations. The platform centralizes inventory, sales, customers, suppliers, reporting, security, and analytics.

## Project Structure

- `backend/`: Node.js + Express API with JWT authentication, PostgreSQL ORM, real-time Socket.io notifications, and business modules for inventory, sales, customers, suppliers, and reports.
- `frontend/`: React + Vite + Tailwind UI with responsive dashboards, product search, sales history, customer and supplier management.
- `docker-compose.yml`: Docker services for PostgreSQL, backend, and frontend.
- `.env.example`: Environment variables for local development.

## Features

- Secure authentication with JWT
- Role-based access control for Administrator, Supervisor, Cashier, Pharmacist
- Product registration, stock tracking, expiration alerts
- Real-time sales entry and inventory synchronization
- Customer and supplier management
- Dashboard analytics and KPI visualization
- Notification system for low stock and expirations
- REST API design with modular routes and error handling

## Setup

1. Copy environment variables:

```bash
cp .env.example .env
```

2. Start Docker services:

```bash
docker-compose up --build
```

3. Install backend dependencies:

```bash
cd backend
npm install
npm run seed
```

4. Install frontend dependencies:

```bash
cd ../frontend
npm install
npm run dev
```

5. Open the app:

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:4000/api/ping`

## GitHub Pages deployment

This project includes a GitHub Actions workflow at `.github/workflows/deploy.yml` that builds the frontend and deploys `frontend/dist` to the `gh-pages` branch.

To use Pages, enable GitHub Pages for the `gh-pages` branch in repository settings.

## Default credentials

- Email: `admin@novasalud.com`
- Password: `NovaSalud123`

## Next steps

- Add mobile-ready PWA support
- Integrate PDF export and digital receipts
- Extend analytics with charts and Excel export
- Add offline mode, backups, and cloud deployment

## Technologies

- Frontend: React, Vite, Tailwind CSS, Axios, React Router, Socket.io Client
- Backend: Node.js, Express, PostgreSQL, Sequelize, JWT, Socket.io
- DevOps: Docker, environment configuration, Git
