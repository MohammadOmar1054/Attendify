// This version of firebase.js has dependancies on mock values

const delay = (value, timeout = 120) => new Promise((resolve) => {
  window.setTimeout(() => resolve(structuredClone(value)), timeout);
});

export const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

export const mockUser = {
  name: "Dr. Aisha Kumar",
  email: "aisha.kumar@university.edu",
  department: "Computer Science",
  role: "Lecturer and Attendance Administrator"
};

export const mockClasses = [
  { id: "iot", code: "CS601", name: "Internet of Things", lecturer: "Dr. Aisha Kumar", department: "Computer Science", semester: 6, students: 58, attendanceRate: 91 },
  { id: "dbms", code: "CS502", name: "Database Systems", lecturer: "Prof. Rohan Mehta", department: "Computer Science", semester: 5, students: 64, attendanceRate: 86 },
  { id: "embedded", code: "EC410", name: "Embedded Systems", lecturer: "Dr. Neha Iyer", department: "Electronics", semester: 4, students: 48, attendanceRate: 88 },
  { id: "networks", code: "CS407", name: "Computer Networks", lecturer: "Prof. Vikram Shah", department: "Information Technology", semester: 4, students: 52, attendanceRate: 82 }
];

export const mockStudents = [
  { regNo: "CS21B1001", name: "Aarav Sharma", fingerprint: true, attendance: 94 },
  { regNo: "CS21B1007", name: "Diya Nair", fingerprint: true, attendance: 91 },
  { regNo: "CS21B1012", name: "Kabir Singh", fingerprint: true, attendance: 84 },
  { regNo: "CS21B1018", name: "Meera Joshi", fingerprint: false, attendance: 0 },
  { regNo: "CS21B1024", name: "Riya Menon", fingerprint: true, attendance: 89 },
  { regNo: "CS21B1030", name: "Ishaan Patel", fingerprint: true, attendance: 96 },
  { regNo: "CS21B1036", name: "Sara Thomas", fingerprint: true, attendance: 87 },
  { regNo: "CS21B1042", name: "Ananya Rao", fingerprint: false, attendance: 0 },
  { regNo: "CS21B1049", name: "Dev Malhotra", fingerprint: true, attendance: 78 },
  { regNo: "CS21B1055", name: "Nisha Verma", fingerprint: true, attendance: 92 },
  { regNo: "CS21B1061", name: "Arjun Das", fingerprint: true, attendance: 81 },
  { regNo: "CS21B1068", name: "Tara Kulkarni", fingerprint: true, attendance: 95 }
];

export const mockHistory = [
  { classId: "iot", student: "Aarav Sharma", regNo: "CS21B1001", date: "2026-06-27", time: "09:02 AM", status: "Present" },
  { classId: "iot", student: "Diya Nair", regNo: "CS21B1007", date: "2026-06-27", time: "09:03 AM", status: "Present" },
  { classId: "iot", student: "Kabir Singh", regNo: "CS21B1012", date: "2026-06-27", time: "09:10 AM", status: "Late" },
  { classId: "iot", student: "Meera Joshi", regNo: "CS21B1018", date: "2026-06-27", time: "-", status: "Absent" },
  { classId: "dbms", student: "Riya Menon", regNo: "CS21B1024", date: "2026-06-26", time: "10:04 AM", status: "Present" },
  { classId: "dbms", student: "Ishaan Patel", regNo: "CS21B1030", date: "2026-06-26", time: "10:05 AM", status: "Present" },
  { classId: "embedded", student: "Sara Thomas", regNo: "CS21B1036", date: "2026-06-25", time: "02:01 PM", status: "Present" },
  { classId: "embedded", student: "Ananya Rao", regNo: "CS21B1042", date: "2026-06-25", time: "-", status: "Absent" },
  { classId: "networks", student: "Dev Malhotra", regNo: "CS21B1049", date: "2026-06-24", time: "11:12 AM", status: "Late" },
  { classId: "networks", student: "Nisha Verma", regNo: "CS21B1055", date: "2026-06-24", time: "11:01 AM", status: "Present" },
  { classId: "iot", student: "Arjun Das", regNo: "CS21B1061", date: "2026-06-23", time: "09:01 AM", status: "Present" },
  { classId: "iot", student: "Tara Kulkarni", regNo: "CS21B1068", date: "2026-06-23", time: "09:02 AM", status: "Present" }
];

export async function loginUser(email, password) {
  if (!email || !password) {
    throw new Error("Email and password are required.");
  }
  localStorage.setItem("attendify.authenticated", "true");
  return delay({ ...mockUser, email });
}

export async function logoutUser() {
  localStorage.removeItem("attendify.authenticated");
  return delay({ success: true });
}

export async function loadClasses() {
  return delay(mockClasses);
}

export async function loadStudents() {
  return delay(mockStudents);
}

export async function loadAttendance() {
  return delay(mockHistory);
}

export async function loadHistory() {
  return delay(mockHistory);
}

export async function startAttendance() {
  return delay({ sessionId: `session-${Date.now()}`, status: "started" }, 180);
}

export async function startEnrollment(student) {
  return delay({ enrollmentId: `fp-${Date.now()}`, student, status: "queued" }, 180);
}

export function listenToAttendance(callback) {
  const queue = mockHistory.filter((row) => row.status !== "Absent");
  let index = 0;
  const timer = window.setInterval(() => {
    callback(queue[index % queue.length]);
    index += 1;
  }, 4500);
  return () => window.clearInterval(timer);
}

export function initializeFirebaseApp() {
  return {
    auth: "placeholder-auth",
    firestore: "placeholder-firestore",
    storage: "placeholder-storage",
    config: firebaseConfig
  };
}
