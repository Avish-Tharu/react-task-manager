function TaskStats({
  total,
  completed,
  pending,
  highPriority,
  mediumPriority,
  lowPriority,
}) {
  const completionPercentage =
    total > 0
      ? Math.round((completed / total) * 100)
      : 0;

  return (
    <div className="stats-container">

      {/* Total Tasks */}
      <div className="stat-card">
        <div className="stat-icon">
          📋
        </div>

        <div>
          <p>Total Tasks</p>
          <h3>{total}</h3>
        </div>
      </div>

      {/* Completed */}
      <div className="stat-card">
        <div className="stat-icon">
          ✅
        </div>

        <div>
          <p>Completed</p>
          <h3>{completed}</h3>
        </div>
      </div>

      {/* Pending */}
      <div className="stat-card">
        <div className="stat-icon">
          ⏳
        </div>

        <div>
          <p>Pending</p>
          <h3>{pending}</h3>
        </div>
      </div>

      {/* High Priority */}
      <div className="stat-card">
        <div className="stat-icon">
          🔴
        </div>

        <div>
          <p>High Priority</p>
          <h3>{highPriority}</h3>
        </div>
      </div>

      {/* Progress */}
      <div className="progress-card">

        <div className="progress-header">
          <div>
            <p>Completion Progress</p>
            <h3>{completionPercentage}%</h3>
          </div>
        </div>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${completionPercentage}%`,
            }}
          ></div>
        </div>

      </div>

    </div>
  );
}

export default TaskStats;