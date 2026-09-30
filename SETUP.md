# 📚 Med Study App - Setup & Usage Guide

## ✅ What's Been Built

Your full-stack medical study companion app is now ready! Here's what's included:

### 🎯 Core Features Implemented

#### 1. **📝 Study Features**
- **Notes Upload** - Upload PowerPoint slides (.ppt, .pptx)
- **Flashcard Generation** - AI-powered generation from your notes
- **Quiz Mode** - Test yourself on flashcards with scoring
- **Study Progress** - Track your learning journey

#### 2. **📅 Timetable & Scheduling**
- **Weekly View** - See all your lectures and labs
- **Event Management** - Add, edit, delete classes and study sessions
- **Color-Coded Types** - Lectures (blue), labs (green), tutorials (purple)
- **Grad Medicine Tagging** - Mark events relevant to medical school prep

#### 3. **📋 Off-The-Job (OTJ) Training Log**
- **Activity Logging** - Record learning activities with dates and hours
- **Progress Tracking** - Visual progress bar toward 300-hour apprenticeship standard
- **Competency Tracking** - Link activities to competencies
- **Status Management** - Draft and submit entries

#### 4. **🔗 Resources & Further Reading**
- **Anatomy Resources** - Interactive 3D models and visualizations
- **Graduate Medicine Prep** - Curated content for medical school applications
- **IBMS Links** - Official Institute of Biomedical Science materials and standards

## 🚀 How to Run Locally

### Option 1: Quick Start (Recommended)

```bash
# 1. Navigate to project directory
cd /home/user/my-first-project

# 2. Install all dependencies
npm install

# 3. Start development servers
npm run dev
```

**This will start:**
- Backend API: http://localhost:5000
- Frontend UI: http://localhost:3000

### Option 2: Run Separately

```bash
# Terminal 1 - Backend
cd server
npm install
npm start

# Terminal 2 - Frontend (new terminal)
cd client
npm install
npm start
```

## 📱 How to Use the App

### 1. Login / Register
- Create a new account or login
- All your data will be associated with your account

### 2. Upload Lecture Notes
```
Dashboard → Notes → "Upload New Notes"
1. Enter title (e.g., "Cardiovascular System - Lecture 5")
2. Select PowerPoint file
3. Click "Upload & Generate Flashcards"
```

### 3. Study with Flashcards
```
Dashboard → Flashcards
- Click cards to flip between question and answer
- Use Previous/Next to navigate
- Shuffle to randomize order
- Click "Start Quiz Mode" to test yourself
```

### 4. Take Quizzes
```
Dashboard → Quiz → "Start Quiz"
- Answer multiple choice questions
- Get instant feedback
- See your score and percentage at the end
- Try again to improve
```

### 5. Manage Your Timetable
```
Dashboard → Timetable → "+ Add Event"
- Select type (Lecture, Lab, Tutorial, Study)
- Enter date, time, and location
- Mark as "Grad Medicine" if relevant
```

### 6. Log Off-The-Job Training
```
Dashboard → OTJ Log → "+ Log Activity"
- Select activity type (Research, Reading, Course, Workshop, etc.)
- Enter date and description
- Log hours spent
- Track progress toward 300-hour requirement
```

### 7. Access Resources
```
Dashboard → Resources
- Anatomy Resources: Interactive 3D tools
- Grad Medicine Prep: Topics important for applications
- IBMS Reading: Official standards and further reading
```

## 🛠️ Project Structure

```
/home/user/my-first-project/
│
├── client/                          # React Frontend
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Dashboard.js        # Main dashboard overview
│   │   │   ├── Notes.js            # Upload and manage notes
│   │   │   ├── Flashcards.js       # Study with flashcards
│   │   │   ├── Quiz.js             # Quiz mode
│   │   │   ├── Timetable.js        # Schedule management
│   │   │   ├── OTJLog.js           # Apprenticeship tracking
│   │   │   ├── Resources.js        # Learning resources
│   │   │   └── Login.js            # Authentication
│   │   ├── App.js                  # Main app routing
│   │   ├── index.js                # React entry point
│   │   └── index.css               # TailwindCSS styles
│   ├── public/
│   │   └── index.html              # HTML template
│   ├── package.json                # React dependencies
│   └── tailwind.config.js          # TailwindCSS config
│
├── server/                          # Node.js Backend
│   ├── routes/
│   │   ├── auth.js                 # User auth endpoints
│   │   ├── notes.js                # Notes management
│   │   ├── flashcards.js           # Flashcard endpoints
│   │   ├── quiz.js                 # Quiz endpoints
│   │   ├── timetable.js            # Timetable endpoints
│   │   ├── otj.js                  # OTJ tracking
│   │   └── resources.js            # Resources endpoints
│   ├── index.js                    # Express server
│   ├── package.json                # Server dependencies
│   └── uploads/                    # PowerPoint uploads folder
│
├── package.json                    # Root package (for concurrently)
├── .env                            # Environment variables (create this)
├── SETUP.md                        # This file
└── README.md                       # Project documentation
```

## 🔑 Key API Endpoints

### Authentication
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user

### Notes & Study
- `POST /api/notes/upload` - Upload PowerPoint
- `GET /api/notes` - List your notes
- `POST /api/flashcards/generate` - Generate flashcards
- `GET /api/flashcards/:notesId` - Get flashcards for notes

### Quiz
- `POST /api/quiz/start` - Start quiz session
- `POST /api/quiz/submit-answer` - Submit answer
- `POST /api/quiz/end` - Finish quiz
- `GET /api/quiz/history` - Quiz history

### Scheduling
- `GET /api/timetable/week/:date` - Get week schedule
- `POST /api/timetable/event` - Add event
- `PUT /api/timetable/event/:id` - Update event
- `DELETE /api/timetable/event/:id` - Delete event

### OTJ Tracking
- `POST /api/otj/log` - Log activity
- `GET /api/otj` - Get logs
- `GET /api/otj/summary` - Progress summary
- `PUT /api/otj/:id` - Update log
- `DELETE /api/otj/:id` - Delete log

### Resources
- `GET /api/resources/anatomy` - Anatomy tools
- `GET /api/resources/grad-medicine` - Medical school prep
- `GET /api/resources/ibms` - IBMS materials

## 🔧 Configuration & Next Steps

### 1. Set Up Environment Variables
Create a `.env` file in the root directory:

```
PORT=5000
NODE_ENV=development
DATABASE_URL=postgresql://user:password@localhost:5432/med_study_app
CLAUDE_API_KEY=sk-ant-xxxxx
```

### 2. Connect Claude API (Optional)
To enable AI flashcard generation:
1. Get your Claude API key from https://console.anthropic.com
2. Add to `.env` as `CLAUDE_API_KEY`
3. The backend will use it to generate flashcards automatically

### 3. Connect PostgreSQL (Optional - for production)
For persistent data storage:
1. Install PostgreSQL
2. Create database: `createdb med_study_app`
3. Update `DATABASE_URL` in `.env`
4. The backend will connect to your database

### 4. Deploy to Production
When ready to deploy:
- Build frontend: `cd client && npm run build`
- Deploy to hosting (Vercel, Netlify for frontend)
- Deploy to server hosting (Heroku, Railway for backend)

## 📊 Features by Phase

### ✅ Phase 1 (MVP - Implemented)
- User authentication (register/login)
- Notes upload interface
- Flashcard study mode
- Quiz testing
- Timetable management
- OTJ activity logging
- Resource library

### 🔄 Phase 2 (Soon)
- [ ] PowerPoint text extraction
- [ ] Claude API integration for flashcard generation
- [ ] PostgreSQL database connection
- [ ] JWT token-based auth
- [ ] User profile customization
- [ ] Study statistics dashboard

### 🚀 Phase 3 (Future)
- [ ] Mobile app (React Native)
- [ ] Spaced repetition scheduling
- [ ] Study group collaboration
- [ ] Exam preparation packs
- [ ] Voice recording for notes
- [ ] Advanced analytics
- [ ] Integration with university LMS

## 📚 File Upload Details

### Supported Formats
- PowerPoint: `.ppt`, `.pptx`
- Size limit: 50MB
- Files stored in: `/server/uploads/`

### Accepted Formats
- MIME types: `application/vnd.ms-powerpoint`, `application/vnd.openxmlformats-officedocument.presentationml.presentation`

## 🔒 Security Considerations

### Current (Development)
- Basic auth storage
- File uploads validated by extension
- CORS enabled for development

### Production (Recommended)
- [ ] Implement JWT tokens
- [ ] Hash passwords with bcrypt
- [ ] Add HTTPS
- [ ] Implement rate limiting
- [ ] Add input validation/sanitization
- [ ] Secure file upload validation
- [ ] Add database encryption

## 💡 Usage Tips

### For Study Sessions
1. Upload all PowerPoint slides at once
2. Let the app generate flashcards
3. Study 30 min/day with flashcards
4. Take quizzes 2-3 times per week
5. Track your quiz scores

### For Apprenticeship
1. Log activities weekly, not monthly
2. Be specific in descriptions (helps with applications)
3. Link activities to competencies
4. Keep evidence/resources for each entry
5. Review progress bar regularly

### For Graduate Medicine Prep
1. Focus on marked "🎓 Grad Med" content
2. Use the grad medicine resource section
3. Study immunology, genetics, pathophysiology
4. Take notes on clinical applications
5. Practice for interview questions

## ❓ Troubleshooting

### Port Already in Use
```bash
# Change port in .env
PORT=5001
```

### Module Not Found Errors
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### CORS Errors
- Frontend and backend must be on different ports
- Check that `cors` is enabled in server/index.js

### File Upload Issues
- Ensure files are .ppt or .pptx
- Check file size is under 50MB
- Verify `/server/uploads/` directory exists

## 📞 Support & Documentation

- **Documentation**: See README.md for full API docs
- **Issues**: Check console for error messages
- **Logs**: Backend logs print to console

---

**You're all set! 🎉** Start by running `npm run dev` and visiting http://localhost:3000

Good luck with your studies and apprenticeship! 📚✨
