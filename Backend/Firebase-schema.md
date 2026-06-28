  ====================================================================
||                    FIREBASE TRACKER & MAPPER                      ||
  ====================================================================

-Vision for DB: 

Start Attendance
↓
Create attendance session in Firestore
↓
ESP32 detects active session
↓
Student scans fingerprint
↓
ESP32 writes attendance record
↓
Firestore updates
↓
Dashboard updates live


-Firebase Schema (Agreed)(Test Version): 

students
  └── R25EI001
       ├── name
       ├── fingerId
       ├── department
       ├── semester
       └── enrolled

classes
  └── iot2026
       ├── courseCode
       ├── courseName
       └── semester

attendance_records
  └── record001
       ├── srn
       ├── classId
       ├── timestamp
       └── status