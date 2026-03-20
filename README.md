Path Forge
#  AI Interview + Resume Analyzer

An AI-powered SaaS application that analyzes a candidate’s **resume, job description, and self-description** to generate:

*  Match Score
*  Technical Interview Questions
*  Behavioral Questions
*  Answer Intentions & Ideal Answers
*  Personalized Preparation Roadmap

---

##  Features

* Upload Resume (PDF)
* Input Job Description & Self Description
* AI-generated:

  * Match Score
  * Technical Questions
  * Behavioral Questions
  * Skill Gap Analysis
  * Daily Preparation Plan
* Secure authentication (JWT/Cookies)
* Persistent data (MongoDB)
* Clean UI with tab-based navigation

---

##  Tech Stack

### Frontend

* React (Vite)
* React Router
* Axios
* SCSS

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* Multer (file upload)
* PDF parsing
* HTML to PDF conversion of resume
* AI Service (Google GenAI / Gemini / OpenAI)

### DevOps / Tools

* Redis (optional caching)
* Docker (optional)
* Git

---

##  Project Structure

```
root/
│
├── frontend/
│   ├── src/
│   │   ├── features/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── pages/
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── services/
│   ├── middlewares/
│   └── config/
```

---

## ⚙️ Installation

### 1️⃣ Clone the repo

```
git clone https://github.com/your-username/ai-interview-analyzer.git
cd ai-interview-analyzer
```

---

### 2️⃣ Backend Setup

```
cd backend
npm install
```

Create `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret
REDIS_USERNAME=default
REDIS_PASSWORD=your_password
REDIS_HOST=your_host
REDIS_PORT=your_port
GOOGLE_GENAI_API_KEY=your_api_key
```

Run backend:

```
npm run dev
```

---

### 3️⃣ Frontend Setup

```
cd frontend
npm install
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

Backend runs at:

```
http://localhost:5000
```

---

## 🔐 Authentication

* Uses cookies / JWT
* Protected routes for interview reports
* Middleware ensures secure access

---

##  API Endpoints

### Generate Report

```
POST /api/interview
```

### Get Report by ID

```
GET /api/interview/report/:interviewReportId
```

### Get All Reports

```
GET /api/interview/report/allInterviewReport
```

---

##  How It Works

1. User uploads:

   * Resume (PDF)
   * Job Description
   * Self Description

2. Backend:

   * Parses PDF
   * Sends data to AI service
   * Generates structured interview report

3. Data stored in MongoDB

4. Frontend:

   * Fetches report
   * Displays:

     * Questions
     * Answers
     * Roadmap
     * Score

---

## 📊 Example Output

* Match Score: **78%**
* Skill Gaps: Docker, Kubernetes
* Technical Questions:

  * Explain CI/CD pipeline
* Behavioral Questions:

  * Describe a challenging project
* Roadmap:

  * Day 1 → Basics
  * Day 2 → Practice
  * ...

---

## 🚀 Future Improvements

* 💳 Payment integration (Stripe)
* 📊 Dashboard analytics
* 📥 Export report as PDF
* 🌐 Deployment (AWS / Docker / CI-CD)
* 🧠 Improved AI prompts

---

##  Known Issues

* Minor UI flicker on initial load (handled with loading state)
* Large PDF parsing latency

---

##  Contributing

Pull requests are welcome!

```
git checkout -b feature/your-feature
git commit -m "Add feature"
git push origin feature/your-feature
```

---

## 📄 License

MIT License

---

## Acknowledgements

* OpenAI / Google GenAI
* MongoDB
* React ecosystem

---

## Author

**Shakib Alam**
Aspiring DevOps Engineer 

---

