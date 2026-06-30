# Attendify
🚀 Attendify

Smart Biometric Attendance Management System

<p align="center">
  <img src="https://img.shields.io/badge/ESP32-IoT-blue?style=for-the-badge">
  <img src="https://img.shields.io/badge/R307-Fingerprint-success?style=for-the-badge">
  <img src="https://img.shields.io/badge/Firebase-Cloud-orange?style=for-the-badge">
  <img src="https://img.shields.io/badge/Web-Dashboard-purple?style=for-the-badge">
</p>
<p align="center">
  <b>A modern cloud-connected biometric attendance system powered by ESP32, R307 Fingerprint Sensor, Firebase, and a real-time web dashboard.</b>
</p>

⸻

✨ Overview

Attendify is a complete IoT-based biometric attendance management platform designed to eliminate manual attendance processes and provide secure, real-time attendance tracking.

The system combines fingerprint authentication, cloud synchronization, and a modern web interface to create a seamless attendance experience for educational institutions and organizations.

⸻

🎯 Key Features

🔐 Biometric Authentication

* Fingerprint-based student verification
* Secure attendance marking
* Fast identification using R307 sensor
* Duplicate fingerprint detection

☁️ Real-Time Cloud Integration

* Instant synchronization with Firebase
* Live attendance updates
* Cloud-hosted attendance records
* Centralized data management

📊 Smart Dashboard

* Modern responsive UI
* Real-time attendance monitoring
* Student enrollment management
* Attendance history tracking

📝 Attendance Management

* Automatic attendance recording
* Attendance history logs
* Student database management
* Class-wise attendance tracking

⸻

🏗️ System Architecture

## 🚀 Attendify Data Pipeline

```text
┌─────────────┐
│ Finger Scan │
└──────┬──────┘
       ▼
┌─────────────┐
│    R307     │
└──────┬──────┘
       ▼
┌─────────────┐
│    ESP32    │
└──────┬──────┘
       ▼
┌─────────────┐
│ Firebase RT │
└──────┬──────┘
       ▼
┌─────────────┐
│ Firestore   │
└──────┬──────┘
       ▼
┌─────────────┐
│ Attendify   │
│ Dashboard   │
└──────┬──────┘
       ▼
┌─────────────┐
│ Attendance  │
│ Recorded    │
└─────────────┘
```

**Latency:** ~1–2 seconds  
**Authentication:** Biometric Fingerprint  
**Cloud Sync:** Real-Time  
**Storage:** Firebase Firestore + RTDB

⸻

🛠️ Technology Stack

Hardware

* ESP32 Development Board
* R307 Fingerprint Sensor
* Breadboard & Jumper Wires
* USB Programming Interface

Software

Embedded

* Arduino IDE
* ESP32 Framework
* Adafruit Fingerprint Library

Cloud

* Firebase Realtime Database
* Firebase Firestore
* Firebase Authentication

Frontend

* HTML5
* CSS3
* JavaScript (ES6)
* Firebase SDK

⸻

📸 Modules

👤 Student Enrollment

* Enter student details
* Scan fingerprint
* Store fingerprint ID
* Save student information to Firestore

⸻

📍 Attendance Marking

* Student scans fingerprint
* ESP32 verifies fingerprint
* Attendance sent to Firebase
* Dashboard updates instantly

⸻

📚 Attendance History

* View attendance records
* Search attendance logs
* Track student attendance history
* Cloud-stored records

⸻

🔄 Workflow

Enrollment Process

Student Details
       ↓
Fingerprint Scan
       ↓
Fingerprint Stored
       ↓
Firebase Update
       ↓
Student Registered

Attendance Process

Fingerprint Scan
       ↓
Fingerprint Match
       ↓
ESP32 Verification
       ↓
Firebase Sync
       ↓
Attendance Recorded
       ↓
Dashboard Update

⸻

📂 Project Structure

Attendify/
│
├── firmware/
│   ├── esp32_code.ino
│   └── fingerprint_module
│
├── frontend/
│   ├── index.html
│   ├── attendance.html
│   ├── enrollment.html
│   ├── history.html
│   ├── js/
│   └── css/
│
├── firebase/
│   └── firebase.js
│
├── assets/
│
└── README.md

⸻

🔥 Firebase collection: 

## 🔥 Firebase Collections

### Students

```json
{
  "name": "You :)",
  "department": "Computer Science",
  "semester": 1,
  "fingerId": 1
}
```

### Attendance

```json
{
  "studentName": "You :)",
  "studentId": "1RN23CS001",
  "classId": "iot2026",
  "status": "Present",
  "date": "2026-06-30",
  "time": "09:15 AM"
}
```

### Classes

```json
{
  "courseCode": "CS101",
  "courseName": "Internet of Things",
  "department": "Computer Science",
  "semester": 1,
  "students": [
    "1RN23CS001",
    "1RN23CS002"
  ]
}
```

### Realtime Database

```json
{
  "command": "ATTENDANCE",

  "lastAttendance": {
    "fingerprintID": 1,
    "status": "present",
    "timestamp": 74764
  },

  "lastEnrollment": {
    "fingerprintID": 2,
    "status": "success",
    "timestamp": 74891
  }
}
```

⸻

🎓 Educational Outcomes

This project demonstrates:

* Internet of Things (IoT)
* Embedded Systems
* Biometric Authentication
* Cloud Computing
* Real-Time Databases
* Web Development
* Firebase Integration
* System Design

⸻

🚀 Future Enhancements

* Face Recognition Integration
* RFID Support
* Attendance Analytics Dashboard
* Email Notifications
* Mobile Application
* Multi-Class Support
* QR Attendance Backup
* AI-Based Attendance Insights

⸻

<div align="center">

# 👑 Mohammad Omar

### Creator of Attendify

*Biometric Attendance Management System*

🏗️ System Architecture  
⚡ ESP32 Firmware Development  
🔐 Biometric Authentication  
☁️ Firebase Cloud Integration  
🎨 Frontend Development  

---

### "Built from sensor to cloud."

</div>

*                  Attendify

⸻

📜 License

This project is developed for academic and educational purposes.

⸻

<p align="center">
  <b>Attendify</b><br>
  Smart Attendance. Real-Time Tracking. Cloud Powered.
</p>