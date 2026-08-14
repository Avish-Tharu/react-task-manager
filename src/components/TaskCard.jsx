function TaskCard({
  task,
  onEdit,
  onDelete,
}) {
  return (
    <div className="task-card">

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