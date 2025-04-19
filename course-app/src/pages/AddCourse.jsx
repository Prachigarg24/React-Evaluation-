import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CourseContext } from "../context/CourseContext";

function AddCourse() {
  const { addCourse } = useContext(CourseContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

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

    await addCourse(formData);
    navigate("/dashboard");
  };

  return (
    <div className="form-page">
      <h2>Add New Course</h2>
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
        <button type="submit">Add Course</button>
      </form>
    </div>
  );
}

export default AddCourse;