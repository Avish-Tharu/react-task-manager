function TaskCard({
  task,
  onEdit,
  onDelete,
  onDropTask,
}) {
  const handleDragStart = (event) => {
    event.dataTransfer.setData(
      "taskId",
      task.id.toString()
    );

    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      className="task-card"
      draggable="true"
      onDragStart={handleDragStart}
    >

      <div className="drag-handle">
        ⋮⋮
      </div>

      <div className="task-content">

        <div>
          <h3>{task.title}</h3>

          <p>{task.description}</p>
        </div>

        <span
          className={`task-status ${
            task.status === "Completed"
              ? "completed"
              : "pending"
          }`}
        >
          {task.status}
        </span>

      </div>

      <div className="task-actions">

        <button
          className="edit-button"
          onClick={() => onEdit(task)}
        >
          ✏️ Edit
        </button>

        <button
          className="delete-button"
          onClick={() => onDelete(task.id)}
        >
          🗑️ Delete
        </button>

      </div>

    </div>
  );
}

export default TaskCard;