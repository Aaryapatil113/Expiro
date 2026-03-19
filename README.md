# Expiro — Store Inventory & Expiry Tracker

## Authors
- **Aarya Patil** — Products, Expiry Dashboard, Middleware
- **Kanad Motiwale** — Waste Reports, Waste Summary, Server

## Class Link
[CS5610 Web Development — Northeastern University](https://johnguerra.co/classes/webDevelopment_fall_2024/)

## Project Objective
Expiro is a full-stack, role-based inventory and expiry management app for grocery stores. Managers log incoming stock batches with expiry dates and monitor shelf health via a color-coded dashboard. Employees see a daily pull list of expiring products and log waste reports when items are removed. The app helps reduce waste, prevent expired products from reaching customers, and track stock levels in real time.

## Screenshot
> *(Add screenshot after deployment)*

---

## Tech Stack

| Layer      | Technology                                |
|------------|-------------------------------------------|
| Frontend   | React 18 with Hooks, Vite                 |
| Backend    | Node.js, Express                          |
| Database   | MongoDB Atlas (native driver)             |
| Deployment | Render (backend), GitHub Pages (frontend) |

---

## Instructions to Build

### Prerequisites
- Node.js v18+
- MongoDB Atlas account

### 1. Clone the repo
```bash
git clone https://github.com/kanadmotiwale/Expiro.git
cd Expiro
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:
```env
MONGO_URI=mongodb+srv://<username>:<password>@expiro.mongodb.net/expiro
PORT=5001
```

Start the backend:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### 4. Seed the Database
```bash
cd backend
npm run seed
```
This populates the database with 1,000+ synthetic product records across 13 grocery categories.

---

## Deployment
- **Frontend:** [GitHub Pages URL here]
- **Backend:** [Render URL here]

---

## License
[MIT](./LICENSE)