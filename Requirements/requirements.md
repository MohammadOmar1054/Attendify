<p align="center">
<img src="https://img.shields.io/badge/ESP32-IoT-blue?style=for-the-badge"/>
<img src="https://img.shields.io/badge/Firebase-Cloud-orange?style=for-the-badge"/>
<img src="https://img.shields.io/badge/R307-Fingerprint-green?style=for-the-badge"/>
<img src="https://img.shields.io/badge/Status-Completed-success?style=for-the-badge"/>
</p>

📋 Attendify - Project Requirements Document


# ⚙ Installation & Setup

## 📋 Prerequisites

Before running Attendify, install the following software and tools.

---

# 💻 Software Requirements

| Software | Version |
|-----------|----------|
| Arduino IDE | 2.x or later |
| Node.js | v20+ |
| Git | Latest |
| Visual Studio Code | Latest |
| Google Chrome | Latest |

---

# 📦 ESP32 Dependencies

Open Arduino IDE → Library Manager and install:

### Required Libraries

```text
Adafruit Fingerprint Sensor Library
Firebase ESP Client
WiFi
SPI
Wire
```

---

### ESP32 Board Package

Open:

```text
Arduino IDE
→ Preferences
→ Additional Board URLs
```

Add:

```text
https://raw.githubusercontent.com/espressif/arduino-esp32/gh-pages/package_esp32_index.json
```

Then:

```text
Tools
→ Board Manager
→ ESP32 by Espressif Systems
```

Install latest version.

---

# 🌐 Frontend Dependencies

Install Node.js first:

```bash
node -v
npm -v
```

Then install Firebase:

```bash
npm install firebase
```

Optional development packages:

```bash
npm install
```

---

# ☁ Firebase Setup

Create a Firebase Project.

Enable:

```text
Firebase Authentication
Cloud Firestore
Realtime Database
```

---

## Firestore Collections

### students

```json
{
  "studentName": "Haroon",
  "studentId": "CS21B1042",
  "department": "Computer Science",
  "semester": "1",
  "fingerId": 1
}
```

### attendance

```json
{
  "studentName": "Haroon",
  "studentId": "CS21B1042",
  "status": "Present",
  "date": "2026-06-30",
  "time": "11:46:07 PM"
}
```

---

## Realtime Database Structure

### command

```json
{
  "action": "ENROLL"
}
```

### lastEnrollment

```json
{
  "fingerprintID": 1,
  "status": "success"
}
```

### lastAttendance

```json
{
  "fingerprintID": 1,
  "status": "present"
}
```

---

# 🔑 Firebase Configuration

Replace values inside `firebase.js`

```javascript
export const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "XXXXXX",
  appId: "XXXXXX",
  databaseURL:
    "https://YOUR_PROJECT-default-rtdb.asia-southeast1.firebasedatabase.app"
};
```

---

# 🚀 Running Attendify

## 1. Upload ESP32 Firmware

Connect ESP32.

Open Arduino IDE.

Select:

```text
Board → ESP32 Dev Module
Port → COMx
```

Upload firmware.

---

## 2. Launch Frontend

```bash
npm install
```

```bash
npm start
```

or simply open:

```text
index.html
```

depending on deployment method.

---

# 🏗 System Architecture

```text
Student Finger
       ↓
R307 Fingerprint Sensor
       ↓
ESP32
       ↓
Firebase Realtime Database
       ↓
Firestore
       ↓
Attendify Dashboard
       ↓
Attendance History
```

---

# 📡 Features

✅ Fingerprint Enrollment

✅ Fingerprint Authentication

✅ Attendance Tracking

✅ Attendance History

✅ Firebase Synchronization

✅ Real-Time Dashboard

✅ Student Management

---

# 🔮 Future Improvements

- Face Recognition
- RFID Integration
- QR Attendance
- Mobile Application
- Attendance Analytics
- Email Notifications
- Multi-Class Support

---

# 👨‍💻 Developed By

## Mohammad Omar

Project Lead • IoT Developer • Software Engineer

REVA University

<p align="center">
<img src="https://capsule-render.vercel.app/api?type=waving&height=180&color=0:0F172A,100:06B6D4&text=ATTENDIFY&fontSize=45&fontColor=ffffff"/>
</p>
<h3 align="center">
Smart Biometric Attendance System
</h3>
<p align="center">
ESP32 • R307 Fingerprint Sensor • Firebase • Web Dashboard
</p>

⸻

📖 Project Overview

Attendify is a cloud-connected biometric attendance management system designed to automate student attendance recording using fingerprint authentication.

The system integrates:

* ESP32 Microcontroller
* R307 Fingerprint Sensor
* Firebase Realtime Database
* Firebase Firestore
* Web-Based Dashboard

The primary objective is to eliminate manual attendance procedures while providing real-time attendance synchronization and centralized record management.

⸻

🎯 Project Objectives

Primary Goals

✅ Automate attendance recording

✅ Reduce proxy attendance

✅ Enable real-time cloud synchronization

✅ Maintain digital attendance history

✅ Provide intuitive web dashboard management

✅ Demonstrate IoT and Cloud Computing concepts

⸻

🏗 Functional Requirements

1. Student Enrollment Module

The system shall:

* Register new students
* Capture fingerprint templates
* Generate unique Finger IDs
* Store student details in Firestore
* Associate fingerprint data with student records

Enrollment Data

{
  "studentName": "Haroon",
  "studentId": "CS21B1042",
  "department": "Computer Science",
  "semester": "1",
  "fingerId": 1
}

⸻

2. Attendance Module

The system shall:

* Scan fingerprints
* Verify enrolled users
* Match fingerprints with stored templates
* Mark attendance automatically
* Upload attendance to Firebase

Attendance Record

{
  "studentName": "Haroon",
  "studentId": "CS21B1042",
  "status": "Present",
  "date": "2026-06-30",
  "time": "11:46:07 PM"
}

⸻

3. Attendance History Module

The system shall:

* Display attendance logs
* Search records
* Filter attendance data
* Export attendance reports
* Show attendance statistics

⸻

4. Dashboard Module

The dashboard shall:

* Display enrolled students
* Display attendance records
* Show real-time updates
* Provide enrollment controls
* Provide attendance controls

⸻

⚙ Hardware Requirements

Component	Quantity
ESP32 Development Board	1
R307 Fingerprint Sensor	1
Breadboard	1
Jumper Wires	As Required
USB Programming Cable	1
Laptop/PC	1

⸻

💻 Software Requirements

Software	Purpose
Arduino IDE	ESP32 Programming
Firebase	Cloud Backend
Firestore	Student Database
Realtime Database	Device Communication
HTML	Frontend Structure
CSS	UI Styling
JavaScript	Application Logic
Git & GitHub	Version Control

⸻

☁ Firebase Requirements

Firestore Collections

students

{
  "studentName": "Haroon",
  "studentId": "CS21B1042",
  "fingerId": 1
}

attendance

{
  "studentName": "Haroon",
  "studentId": "CS21B1042",
  "status": "Present",
  "date": "2026-06-30",
  "time": "11:46:07 PM"
}

⸻

Realtime Database Nodes

command

{
  "action": "ENROLL"
}

lastEnrollment

{
  "fingerprintID": 1,
  "status": "success"
}

lastAttendance

{
  "fingerprintID": 1,
  "status": "present"
}

⸻

🔄 System Workflow

Student Finger
       ↓
R307 Fingerprint Sensor
       ↓
ESP32
       ↓
Firebase Realtime Database
       ↓
Firestore
       ↓
Attendify Dashboard

⸻

🔒 Non-Functional Requirements

Performance

* Attendance response time < 3 seconds
* Dashboard loading < 2 seconds

Reliability

* Attendance records must persist after refresh
* Cloud synchronization must remain consistent

Security

* Firebase Authentication support
* Firestore security rules
* Unique fingerprint mapping

Scalability

* Support multiple students
* Support multiple attendance records
* Support future classroom expansion

⸻

🚀 Future Scope

* Face Recognition Integration
* RFID Support
* QR Attendance Backup
* Mobile Application
* Attendance Analytics Dashboard
* Email Notifications
* Multi-Class Management
* AI-Based Attendance Insights

⸻

👨‍💻 Developed By

Mohammad Omar

Project Lead • Developer • System Architect

⸻

<p align="center">

Attendify

Smart Attendance • Real-Time Tracking • Cloud Powered

</p>