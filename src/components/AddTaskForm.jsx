import { useState } from "react";

function AddTaskForm({ onAddTask, onCancel }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");
const [priority, setPriority] = useState("Medium");
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!title.trim()) {
      alert("Please enter a task title.");
      return;
    }

    const newTask = {
  id: Date.now(),
  title: title.trim(),
  description: description.trim(),
  status,
  priority,
};

    onAddTask(newTask);

    setTitle("");
    setDescription("");
    setStatus("Pending");
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <h2>Add New Task</h2>

        <button
          type="button"
          className="close-button"
          onClick={onCancel}
        >
          ×
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Task Title</label>

          <input
            id="title"
            type="text"
            placeholder="Enter task title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>

          <textarea
            id="description"
            placeholder="Enter task description"
            value={description}
            onChange={(event) =>
              setDescription(event.target.value)
            }
            rows="4"
          />
        </div>

        <div className="form-group">
          <label htmlFor="status">Status</label>

          <select
            id="status"
            value={status}
            onChange={(event) => setStatus(event.target.value)}
          >
            <div className="form-group">

  <label>Priority</label>

  <select
    value={priority}
    onChange={(event) =>
      setPriority(event.target.value)
    }
  >
    <option value="Low">Low</option>
    <option value="Medium">Medium</option>
    <option value="High">High</option>
  </select>

</div>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="cancel-button"
            onClick={onCancel}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="add-button"
          >
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddTaskForm;