import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";
import {
  getDatabase,
  ref,
  set,
  get,
  onValue
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-database.js";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";
import {
  addDoc
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

const delay = (value, timeout = 120) => new Promise((resolve) => {
  window.setTimeout(() => resolve(structuredClone(value)), timeout);
});

export const firebaseConfig = {
  apiKey: "AIzaSyDaN1frYqENBaSFMJN9Fy6o4CFqOhS8BIo",
  authDomain: "attendify-922e2.firebaseapp.com",
  projectId: "attendify-922e2",
  storageBucket: "attendify-922e2.firebasestorage.app",
  messagingSenderId: "189746001524",
  appId: "1:189746001524:web:ec436d7843cf4e5f68c321",
  databaseURL:
    "https://attendify-922e2-default-rtdb.asia-southeast1.firebasedatabase.app"
};
const app = initializeApp(firebaseConfig);
export const rtdb = getDatabase(app);

export const auth = getAuth(app);
export const db = getFirestore(app);


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
  try {
    const credential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    localStorage.setItem("attendify.authenticated", "true");

    return {
      uid: credential.user.uid,
      email: credential.user.email
    };

  } catch (error) {
    console.error(error);

    if (error.code === "auth/invalid-credential") {
      throw new Error("Invalid email or password.");
    }

    throw new Error("Login failed. Please try again.");
  }
}

export async function logoutUser() {
  await signOut(auth);
  localStorage.removeItem("attendify.authenticated");
  return { success: true };
}

export async function loadClasses() {
  const snapshot = await getDocs(collection(db, "classes"));

  return snapshot.docs.map(doc => {
    const data = doc.data();

    return {
      id: doc.id,
      code: data.courseCode || "",
      name: data.courseName || "",
      semester: data.semester || 0,
      department: data.department || "",
      lecturer: "Assigned Lecturer",
      students: 0,
      attendanceRate: 0
    };
  });
}
export async function loadStudentsByClass(classId) {
  console.log("CLASS ID RECEIVED:", classId);

  const classRef = doc(db, "classes", classId);
  const classSnap = await getDoc(classRef);

  if (!classSnap.exists()) {
    console.log("CLASS DOCUMENT NOT FOUND");
    return [];
  }

  const classData = classSnap.data();
  const studentIds = classData.students || [];

  console.log("STUDENT IDS:", studentIds);

  const snapshot = await getDocs(collection(db, "students"));

  console.log(
    "STUDENT DOC IDS:",
    snapshot.docs.map(doc => doc.id)
  );

  return snapshot.docs
    .filter(studentDoc => studentIds.includes(studentDoc.id))
    .map(studentDoc => {
      const data = studentDoc.data();

      return {
        regNo: studentDoc.id,
        name: data.name || "",
        fingerprint: data.enrolled || false,
        attendance: data.attendancePercent || 0
      };
    });
}

export async function enrollStudent(studentData) {

  await setDoc(
    doc(db, "students", studentData.registrationNumber),
    {
      name: studentData.studentName,
      department: studentData.department,
      semester: Number(studentData.semester),
      enrolled: true,
      fingerId: studentData.fingerId
    }
  );

  await updateDoc(
    doc(db, "classes", "iot2026"),
    {
      students: arrayUnion(studentData.registrationNumber)
    }
  );

  return true;
}

export async function loadStudents() {
  const snapshot = await getDocs(collection(db, "students"));

  return snapshot.docs.map(doc => {
    const data = doc.data();

    return {
      regNo: doc.id,
      name: data.name || "",
      fingerprint: data.enrolled || false,
      attendance: 0
    };
  });
}
export async function loadAttendance() {
  const snapshot = await getDocs(collection(db, "attendance"));

  return snapshot.docs.map(doc => {
    const data = doc.data();

    return {
      classId: data.classId || "",
      student: data.studentName || "",
      regNo: data.studentId || "",
      date: data.date || "",
      time: data.time || "",
      status: data.status || "Present"
    };
  });
}
export async function loadHistory() {
  return loadAttendance();
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
export async function sendEnrollCommand() {
  await set(ref(rtdb, "command"), "ENROLL");
}

export async function sendAttendanceCommand() {
  await set(ref(rtdb, "command"), "ATTENDANCE");
}


export function listenForAttendance(callback) {

  onValue(
    ref(rtdb, "lastAttendance"),
    (snapshot) => {

      const data = snapshot.val();

      if (!data)
        return;

      if (!data.fingerprintID)
        return;

      if (!data.status)
        return;

      if (!data.timestamp)
        return;

      callback(data);
    }
  );
}


export async function getStudentByFingerId(fingerId) {

  const snapshot =
    await getDocs(collection(db, "students"));

  for (const student of snapshot.docs) {

    const data = student.data();

    if (Number(data.fingerId) === Number(fingerId)) {

      return {
        regNo: student.id,
        ...data
      };
    }
  }

  return null;
}

export async function saveAttendanceRecord(student) {

  const now = new Date();

  await addDoc(
    collection(db, "attendance"),
    {
      studentId: student.regNo,
      studentName: student.student,
      classId: "iot2026",
      date: now.toISOString().split("T")[0],
      time: now.toLocaleTimeString(),
      status: "Present"
    }
  );
}
export function listenForEnrollment(callback) {

  onValue(
    ref(rtdb, "lastEnrollment"),
    (snapshot) => {

      const data = snapshot.val();

      if (
        data &&
        data.status === "success" &&
        data.fingerprintID &&
        data.timestamp
      ) {
        callback(data);
      }
    }
  );
}

