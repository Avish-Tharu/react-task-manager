function TaskCard({ title, description, status }) {
  return (
    <div className="task-card">
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>

      <span className="task-status">
        {status}
      </span>
    </div>
  );
}

export default TaskCard;