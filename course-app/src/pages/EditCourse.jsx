import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CourseContext } from "../context/CourseContext";

function EditCourse() {
  const { id } = useParams();
  const { courses, updateCourse } = useContext(CourseContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    const existing = courses.find((c) => c.id === id);
    if (existing) {
      setFormData({
        title: existing.title,
        description: existing.description,
      });
    }
  }, [id, courses]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.title.trim() === "" || formData.description.trim() === "") {
      alert("All fields are required.");
      return;
    }

    await updateCourse(id, formData);
    navigate("/dashboard");
  };

  return (
    <div className="form-page">
      <h2>Edit Course</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Course Title"
          value={formData.title}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Course Description"
          value={formData.description}
          onChange={handleChange}
        ></textarea>
        <button type="submit">Update Course</button>
      </form>
    </div>
  );
}

export default EditCourse;