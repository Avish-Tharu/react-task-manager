function EditTaskForm({
  task,
  onUpdateTask,
  onCancel,
}) {
  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const updatedTask = {
      ...task,
      title: formData.get("title").trim(),
      description: formData.get("description").trim(),
      status: formData.get("status"),
    };

    if (!updatedTask.title) {
      alert("Please enter a task title.");
      return;
    }

    onUpdateTask(updatedTask);
  };

  return (
    <div className="edit-form-container">

      <div className="form-header">
        <h2>Edit Task</h2>

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
          <label htmlFor={`edit-title-${task.id}`}>
            Task Title
          </label>

          <input
            id={`edit-title-${task.id}`}
            name="title"
            type="text"
            defaultValue={task.title}
          />
        </div>

        <div className="form-group">
          <label htmlFor={`edit-description-${task.id}`}>
            Description
          </label>

          <textarea
            id={`edit-description-${task.id}`}
            name="description"
            defaultValue={task.description}
            rows="4"
          />
        </div>

        <div className="form-group">
          <label htmlFor={`edit-status-${task.id}`}>
            Status
          </label>

          <select
            id={`edit-status-${task.id}`}
            name="status"
            defaultValue={task.status}
          >
            <option value="Pending">
              Pending
            </option>

            <option value="Completed">
              Completed
            </option>
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
            Save Changes
          </button>

        </div>

      </form>
    </div>
  );
}

export default EditTaskForm;