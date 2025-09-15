# Ecstasy Ventures Platform

This project is a full-stack web application for Ecstasy Ventures, built with React (frontend) and Node.js/Express/MongoDB (backend). It provides a modern dashboard for startup management, investor relations, and service-for-equity operations.

## Features

- Responsive landing page with sections: Hero, Problem, Solution, About, Services, Portfolio, Contact, Terms.
- Admin dashboard with modules for ventures, founders, tasks, deals, finance, legal, CRM, support, reports, automations, users, and settings.
- User authentication and role-based permissions.
- Contact form with backend storage.
- Persistent user data via MongoDB.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or newer recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [MongoDB](https://www.mongodb.com/) (local or cloud instance)

### Installation

#### 1. Clone the repository

```sh
git clone https://github.com/your-username/ecstasy-ventures.git
cd ecstasy-ventures
```

#### 2. Install frontend dependencies

```sh
npm install
```

#### 3. Install backend dependencies

```sh
cd server
npm install
cd ..
```

#### 4. Start MongoDB

Make sure MongoDB is running locally on `mongodb://127.0.0.1:27017/adminDB` or update the connection string in [`server/server.js`](server/server.js).

### Running the App

#### Start the backend server

```sh
cd server
node server.js
```

#### Start the frontend (React) app

In a new terminal window/tab:

```sh
npm start
```

- Frontend runs on [http://localhost:3000](http://localhost:3000)
- Backend runs on [http://localhost:5000](http://localhost:5000)

## Available Scripts

In the project root directory, you can run:

- `npm start` — Runs the React app in development mode.
- `npm test` — Launches the test runner.
- `npm run build` — Builds the app for production.
- `npm run eject` — Ejects the app (not reversible).

## Folder Structure

- `/src` — React frontend source code
- `/server` — Node.js/Express backend code
- `/public` — Static assets

## Learn More

- [React documentation](https://reactjs.org/)
- [Express documentation](https://expressjs.com/)
- [MongoDB documentation](https://docs.mongodb.com/)

---

© {year} Ecstasy Ventures. All rights reserved.
