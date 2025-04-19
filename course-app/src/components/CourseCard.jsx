import { useNavigate } from "react-router-dom";

function CourseCard({ course, onDelete }) {
  const navigate = useNavigate();

  return (
    <div className="course-card">
      <h3>{course.title}</h3>
      <p>{course.description}</p>
      <div className="card-buttons">
        <button onClick={() => navigate(`/dashboard/edit/${course.id}`)}>Edit</button>
        <button onClick={() => onDelete(course.id)}>Delete</button>
      </div>
    </div>
  );
}

export default CourseCard;