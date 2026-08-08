# Placement Eligibility Checker

A full-stack web application that automates campus placement eligibility verification, reducing manual work for placement teams and helping students instantly check which companies they qualify for based on their CGPA.

🔗 **Live Demo (Student):** https://coruscating-panda-859999.netlify.app/
🔗 **Live Demo (Admin):** https://coruscating-panda-859999.netlify.app/admin.html
🔗 **Backend API:** https://placement-eligibility-checker-7v7n.onrender.com/

## Problem Statement

Campus placement teams spend significant time manually verifying student eligibility for each company and answering repetitive queries. This project automates the eligibility-checking process, allowing students to instantly see which companies they qualify for, and lets admins manage company criteria easily.

## Features

- **Student Portal** — Students enter their CGPA and instantly see all companies they're eligible for
- **Admin Portal** — Admins can add new companies along with their minimum CGPA requirement
- **Persistent Storage** — All data is stored in MongoDB Atlas, so it's never lost
- **RESTful API** — Clean backend architecture with GET and POST endpoints

## Tech Stack

**Frontend:** HTML, CSS, JavaScript (Fetch API)
**Backend:** Node.js, Express.js
**Database:** MongoDB Atlas (with Mongoose ODM)
**Deployment:** Render (backend), Netlify (frontend)
**Other:** CORS, dotenv (environment variable management)

## System Architecture
## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Health check — confirms server is running |
| GET | `/check-eligibility?cgpa=<value>` | Returns all companies the student is eligible for |
| POST | `/add-company` | Adds a new company (name + minimum CGPA) |

## Local Setup

1. Clone the repository
```bash
git clone https://github.com/niharikakhichi/Placement-Eligibility-Checker.git
cd Placement-Eligibility-Checker
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory
4. Run the server
```bash
node server.js
```

5. Open `index.html` in your browser for the student portal, or `admin.html` for the admin portal

## Future Scope (Major Project Phase)

- **NLP-powered chatbot** to handle student queries automatically (upgrading from static resources)
- **JWT-based authentication** for the admin portal, replacing the current open-access setup
- **Automated email reminders** for students who haven't confirmed placement drive participation
- **Analytics dashboard** for placement teams to track response trends and drive-wise participation
- **Duplicate entry prevention** for company records

## Author

Niharika Khichi