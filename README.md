# todo-summary-assista# 🧠 Todo Summary Assistant

A full-stack application that helps summarize todos using OpenAI's GPT model and sends the summaries to Slack. Built with **React**, **Node.js**, **OpenAI API**, and **Slack Webhooks**.

---

## 🚀 Features

- ✅ Add and manage daily todos
- 🧠 Summarizes your todo list using GPT-based LLM
- 📩 Sends the summary to a Slack channel via webhook
- 🔐 Secrets are stored securely via environment variables
- ☁️ Hosted using Supabase / Firebase (optional)

---

## 📂 Project Structure

todo-summary-assistant/
├── backend/
│ ├── index.js # Node.js backend logic
│ ├── routes/ # API routes
│ ├── services/ # OpenAI + Slack integration
│ └── .env.example # Sample env variables
├── frontend/
│ ├── src/
│ ├── App.jsx # React app entry
│ ├── components/ # React components
│ └── ...
└── README.md
###########

---

## ⚙️ Tech Stack

**Frontend**:
- React.js
- TailwindCSS

**Backend**:
- Node.js + Express
- OpenAI API (for summarization)
- Slack Webhook (for notifications)

**Hosting (optional)**:
- Vercel / Netlify (Frontend)
- Supabase / Firebase (Backend & DB)

---

## 🔐 Environment Variables

Create a `.env` file in `/backend` directory using the format from `.env.example`:

```env
OPENAI_API_KEY=sk-***************************************
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/**********
Running Locally
1. Clone the repo
bash
Copy
Edit
git clone https://github.com/chityalavamshi/todo-summary-assistant.git
cd todo-summary-assistant
2. Install dependencies
Backend:

bash
Copy
Edit
cd backend
npm install
npm run dev
Frontend:

bash
Copy
Edit
cd frontend
npm install
npm run dev
🎯 How it Works
User adds todos from the frontend UI.

Todos are sent to the backend via an API.

The backend sends them to OpenAI GPT for summarization.

The summary is posted to a Slack channel via a webhook.

📦 Future Improvements
Login/Signup with Auth

Daily summary scheduler

Slack bot for fetching summaries on demand

🧑‍💻 Author
Chityala Vamshi
GitHub: @ChityalaVamshi
LinkedIn: @chityalavamshi67
