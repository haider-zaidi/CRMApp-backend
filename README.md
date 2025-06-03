# CRMApp

A responsive, user-friendly frontend for a CRM (Customer Relationship Management) platform. Built with React, Tailwind CSS, and integrated with dynamic campaign management and backend built with Express and MongoDB, supports customer data management, order processing, segmentation, campaign messaging, and Google OAuth login.


## 🚀 Features

### User Authentication
- Google OAuth login
- Session management and secure storage
- Protected routes based on user authentication


### Customer Module
- Add new customers
- View customer list
- Real-time data update after insertion

### Order Module
- Add orders for customers
- View order history

### Segment Builder
- Dynamic rule builder (field, operator, value)
- Multiple condition support with AND/OR logic
- Audience preview functionality (real-time MongoDB query)
- Save custom segments

### Campaigns
- Create campaign linked to a segment
- AI-assisted message generation
- Send email via nodemailer
- View delivery stats (sent, failed, total)


## 🛠️ Tech Stack

### Backend
- Node.js with Express
- MongoDB & Mongoose
- Nodemailer for email delivery
- Google OAuth2 verification
- dotenv for environment variables

## 📦 Installation

### Prerequisites
- Node.js (v14+)
- MongoDB (local/cloud)


### Backend Setup
```bash
# Clone the repository
git clone <repository-url>

# Navigate to backend directory
cd CRMApp-backend

# Install dependencies
npm install

# Start the server
node server.js
```

## 💾 Environment Variables

### Backend
```env
DATABASE_URL="mongodb+srv://zaidihsn1272:dTw1GoWkdZcbKQ33@crmcluster.nzotlaq.mongodb.net/xeno-crm"
JWT_SECRET="your-secret-key"
PORT=5000
GOOGLE_CLIENT_ID=your-client-id
EMAIL_USER=your@email.com
EMAIL_PASS=your-email-password
```


## 🔐 API Endpoints

### Authentication
- `POST /api/auth/google` → Authenticate with Google token

### Customers
- `POST /api/customers` → Add customer
- `GET /api/customers` → Get all customers for user

### Orders
- `POST /api/orders` → Add order
- `GET /api/orders` → Get all orders for user

### Segments
- `POST /api/segments` → Create segment with conditions
- `GET /api/segments` → Get segments for user
- `POST /api/segments/preview` → Preview audience size

### Campaigns
- `POST /api/campaigns` → Create and send campaign
- `GET /api/campaigns` → Get all campaigns with stats

## ✉️ Campaign Delivery
- Emails sent via `nodemailer`
- Tracks sent, failed, and total audience size
- AI message generation supported using OpenAI API (optional)

## 🧠 Segment Logic
Segments are calculated using `$and` / `$or` MongoDB operators:
json
{
  "$or": [
    { "totalSpend": { "$gt": 10000 } },
    { "visits": { "$lt": 3 } }
  ]
}


## 🔒 Security 
- JWT authentication
- Google token verification
- Route protection using `x-user-id` in headers
- Sanitized inputs using Mongoose schema


## 📞 Contact
Your Name - haiderzaidi45h@gmail.com

Project Link: [GitHub Repository](https://github.com/haider-zaidi/CRMApp-backend)

