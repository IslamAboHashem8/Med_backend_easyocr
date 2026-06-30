# 💊 Smart Medication Reminder System (EasyOCR Version)

A backend system for a Smart Medication Reminder application. It allows users to upload a prescription image, extract medication names using EasyOCR, generate medication schedules automatically, track taken doses, receive notifications, and get adherence predictions and drug alternatives.

---

## 🛠️ Technologies Used

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB Atlas |
| OCR Engine | EasyOCR (Python 3.11) |
| Medicine Dataset | CSV |
| File Upload | Multer |
| Scheduler | node-cron |

---

## ⚙️ Installation

### 1. Clone the repository
```bash
git clone https://github.com/IslamAboHashem8/Med_backend_easyocr.git
cd Med_backend_easyocr
```

### 2. Install Node.js dependencies
```bash
npm install
```

### 3. Install Python dependencies
```bash
pip install -r requirements.txt
```

MONGO_URI=your_mongodb_connection_string
PORT=3001

### 5. Create the uploads folder
```bash
mkdir uploads
```

### 6. Run the application
```bash
# Production
node index.js

# Development (auto-restart on changes)
npm run dev
```

---

## ✨ Features

- Upload prescription images
- Extract medicine names using EasyOCR
- Match medicines against a CSV dataset
- Automatically generate medication dose schedules
- Track taken doses (on-time / late)
- Receive notifications for missed doses
- Predict medication adherence based on dose history
- View clinically equivalent drug alternatives
- View adherence statistics
- Health check endpoint for monitoring

---

## 📡 API Endpoints

### Upload Prescription
POST /api/upload
Content-Type: multipart/form-data
Body: image (file)

### Get Doses
GET /api/doses?page=1&limit=20&userId=<id>

### Mark Dose as Taken
POST /api/taken/:doseId

### Get Notifications
GET /api/notifications

### Mark Notification as Seen
PATCH /api/notifications/:id/seen

### Predict Adherence
POST /api/predict
Body: { "userId": "<id>" }

### Get Drug Alternatives
GET /api/drugAlternatives/:medicineName

### Get Adherence Stats 
GET /api/stats?userId=<id>

### Delete Doses
DELETE /api/doses?userId=<id>

### Health Check
GET /api/health

---
## 🔄 Workflow

User uploads a prescription image
↓
Multer stores the image temporarily
↓
EasyOCR (Python) extracts text from the image
↓
Extracted text is matched against the medicine CSV dataset
↓
Dose schedules are generated automatically
↓
Data is stored in MongoDB
↓
Cron job checks for missed doses every minute
↓
Notifications are created for missed doses
↓
User tracks doses, views stats, and receives reminders

---
## 📁 Project Structure

Med_backend_easyocr/
├── index.js              # Application entry point
├── models/
│   ├── doses.js          # Dose schema
│   └── notification.js   # Notification schema
├── routes/
│   ├── upload.js         # POST /api/upload
│   ├── doses.js          # GET, DELETE /api/doses
│   ├── taken.js          # POST /api/taken/:id
│   ├── notifications.js  # GET, PATCH /api/notifications
│   ├── predict.js        # POST /api/predict
│   ├── drugAlternatives.js
│   └── stats.js          # GET /api/stats
├── services/
│   ├── ocrService.js     # Runs the Python OCR subprocess
│   ├── medicineMatcher.js
│   ├── csvService.js     # CSV cache loader
│   ├── predictionservice.js
│   └── cron.js           # Missed dose checker
├── python/
│   └── ocr.py             # EasyOCR script
├── data/
│   ├── medicines_full.csv
│   └── alternatives.csv
├── middleware/
│   └── multer.js
├── uploads/                # Temporary image storage (auto-deleted after OCR)
└── .env
---

## 🔒 Security

- Uploaded images are deleted automatically right after OCR processing
- Python is invoked using `spawn()` instead of `exec()` to prevent shell injection
- Input validation on route parameters (ObjectId checks)
- Sensitive configuration values are stored in environment variables, never committed to source control

---

## ⚠️ Limitations

- OCR accuracy depends on image quality and is reduced for handwritten prescriptions
- Dose schedules use a default frequency/duration when explicit dosage information cannot be extracted from the image
- Authentication is not yet implemented; the system currently operates with a single demo user

---

## 🚀 Future Work

- User authentication (JWT-based)
- Mobile push notifications (Firebase Cloud Messaging)
- AI-based dosage extraction from prescription text
- Integration with external pharmaceutical APIs
- Cloud deployment with CI/CD pipeline

---

## 👨‍💻 Author

Eslam Mohamed — Graduation Project 2025
