import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CourseContext } from "../context/CourseContext";
import { AuthContext } from "../context/AuthContext";
import CourseCard from "../components/CourseCard";
import FilterBar from "../components/FilterBar";
import Pagination from "../components/Pagination";

function Dashboard() {
  const navigate = useNavigate();
  const { courses, deleteCourse } = useContext(CourseContext);
  const { isLoggedIn } = useContext(AuthContext);

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn,navigate]);

  // Filtering
  const [filteredCourses, setFilteredCourses] = useState(courses);

  useEffect(() => {
    setFilteredCourses(courses);
  }, [courses]);

  const handleFilter = (query) => {
    const results = courses.filter((course) =>
      course.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCourses(results);
  };

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 4;
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
  const start = (currentPage - 1) * coursesPerPage;
  const paginatedCourses = filteredCourses.slice(start, start + coursesPerPage);

  return (
    <div className="dashboard-page">
      <h2>Dashboard</h2>
      <button onClick={() => navigate("/dashboard/new")}>Add Course</button>

      <FilterBar onFilter={handleFilter} />

      <div className="course-list">
        {paginatedCourses.length === 0 ? (
          <p>No courses found.</p>
        ) : (
          paginatedCourses.map((course) => (
            <CourseCard key={course.id} course={course} onDelete={deleteCourse} />
          ))
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}

export default Dashboard;