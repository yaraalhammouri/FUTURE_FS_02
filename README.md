# Mini CRM Dashboard
This project is a Mini CRM (Customer Relationship Management System) built to manage client leads efficiently.
It simulates how real businesses collect, track, and convert leads into customers.

The system allows admins to:
- View incoming leads
- Update lead status
- Track conversions
- Manage leads through a simple dashboard

## Features
- Add new leads (name, email, notes)
- View all leads in a table
- Update lead status (New, Contacted, Converted)
- Delete leads
- Search leads by name
- Dashboard stats:
  - Total Leads
  - New Leads
  - Converted Leads
  - Conversion Rate
- Simple login system (frontend)


## Tech Stack
**Frontend:**
- React.js
- HTML/CSS
- Axios

**Backend:**
- Node.js
- Express.js
- MongoDB (Mongoose)

## Setup Instructions

## 1. Clone the repo
```bash
git clone https://github.com/yaraalhammouri/FUTURE_FS_02.git
cd FUTURE_FS_02```

### 2. Setup Backend
cd server
npm install

MONGO_URI= your_mongodb_connection_string
PORT= 5001
start server: node index.js

## 3. Setup Frontend
cd client
npm install
npm run dev

Open: http://localhost:5173

## 4. Login Credentials (Demo)

For demonstration purposes:

Email: yara@gmail.com
Password: 123456
