import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const CourseContext = createContext();

const URL = import.meta.env.VITE_FIREBASE_URL + "/courses.json";

export function CourseProvider({ children }) {
  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {
    try {
      const res = await axios.get(URL);
      const data = res.data;
      const arr = [];

      for (let key in data) {
        arr.push({ id: key, ...data[key] });
      }

      setCourses(arr);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const addCourse = async (course) => {
    try {
      await axios.post(URL, course);
      fetchCourses();
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };

  const updateCourse = async (id, course) => {
    try {
      await axios.patch(`${import.meta.env.VITE_FIREBASE_URL}/courses/${id}.json`, course);
      fetchCourses();
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  const deleteCourse = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_FIREBASE_URL}/courses/${id}.json`);
      fetchCourses();
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <CourseContext.Provider value={{ courses, fetchCourses, addCourse, updateCourse, deleteCourse }}>
      {children}
    </CourseContext.Provider>
  );
}