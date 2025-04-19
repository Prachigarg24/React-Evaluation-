import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AddCourse from "./pages/AddCourse";
import EditCourse from "./pages/EditCourse";
import { AuthProvider } from "./context/AuthContext";
import { CourseProvider } from "./context/CourseContext";

function App() {
  return (
    <AuthProvider>
      <CourseProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/new" element={<AddCourse />} />
          <Route path="/dashboard/edit/:id" element={<EditCourse />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </CourseProvider>
    </AuthProvider>
  );
}

export default App;