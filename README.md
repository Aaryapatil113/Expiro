# Expiro

**Authors:** Aarya Patil & Kanad Motiwale  

---

## Project Objective

Expiro is a store inventory and expiry tracker built for grocery store staff. Managers can monitor stock health, track expiring products, and review waste over time. Employees get a daily view of what needs to come off the shelf and can log waste reports on the spot.

The app is role-based — managers and employees see different views and have different permissions.

---

## Screenshots

![WD Expiro Thumbnail 1](./Screenshots/WD%20Expiro%20Thumbnail%201.png)
![WD Expiro Thumbnail 2](./Screenshots/WD%20Expiro%20Thumbnail%202.png)

---

## Design

This iteration focused on making the app more polished, accessible, and easy to use.

### Fonts
We switched from system defaults to **Plus Jakarta Sans** for headings and **Inter** for body text, both from Google Fonts. Plus Jakarta Sans gives the app a clean, modern look that fits a professional tool. Inter handles small text and data tables well.

### Colors
The whole app uses a green palette built around `#2d6a4f` and `#1b4332` — feels right for a grocery/freshness context. Button colors are now consistent everywhere:

- Green → save, add, confirm
- Grey → cancel, back
- Red → delete, waste
- Blue → edit

Status colors for expiry (red/orange/amber/green) are also consistent across every table and badge.

### Accessibility
A lot was improved here. All form inputs now have proper labels, all tables have `aria-label` and column headers with `scope`, and all modals trap focus and close on Escape. Interactive elements that were previously `div` tags (role cards, category cards, summary cards) are now proper `button` elements. There's a skip-to-main-content link for keyboard users and visible focus outlines throughout.

---

## How to Use

**Manager login:** Use your assigned manager credentials. Contact your system administrator for access.

**Employee login:** Click Employee on the login screen. New staff can register directly using the Sign Up option.

**Manager features:**
- Browse and manage products by category
- Track expiring and expired items on the Expiry Dashboard
- Log sales and waste directly from the expiry table
- Review waste history and summary reports

**Employee features:**
- Check the Expiry Dashboard each shift to see what needs to come off the shelf
- Look up any product by name or shelf location
- Log waste reports when items are removed

---

## Instructions to Build

### Prerequisites

- Node.js v18+
- A MongoDB Atlas account

### 1. Clone the repo

```bash
git clone https://github.com/kanadmotiwale/Expiro.git
cd Expiro
git checkout finalproject
```

### 2. Set up the backend

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`: