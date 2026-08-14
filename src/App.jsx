import { useState } from "react";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import TaskStats from "./components/TaskStats";
import TaskCard from "./components/TaskCard";
import AddTaskForm from "./components/AddTaskForm";
import EditTaskForm from "./components/EditTaskForm";

function App() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Complete React Assignment",
      description: "Build the Task Manager application",
      status: "Pending",
    },
    {
      id: 2,
      title: "Study JavaScript",
      description: "Review JavaScript array methods",
      status: "Completed",
    },
    {
      id: 3,
      title: "Update GitHub",
      description: "Push the latest project changes",
      status: "Pending",
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);

  const [editingTask, setEditingTask] = useState(null);

  // DAY 6 - Search state
  const [searchTerm, setSearchTerm] = useState("");

  // DAY 6 - Filter state
  const [statusFilter, setStatusFilter] = useState("All");

  const handleAddTask = (newTask) => {
    setTasks((currentTasks) => [
      ...currentTasks,
      newTask,
    ]);

    setShowAddForm(false);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
  };

  const handleUpdateTask = (updatedTask) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === updatedTask.id
          ? updatedTask
          : task
      )
    );

    setEditingTask(null);
  };

  const handleDeleteTask = (taskId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmed) {
      return;
    }

    setTasks((currentTasks) =>
      currentTasks.filter(
        (task) => task.id !== taskId
      )
    );
  };

  // DAY 6 - Search + Filter
  const filteredTasks = tasks.filter((task) => {

    const matchesSearch =
      task.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      task.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      task.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const pendingTasks = tasks.filter(
    (task) => task.status === "Pending"
  ).length;

  return (
    <div className="app">

      <Navbar />

      <div className="main-layout">

        <Sidebar />

        <main className="dashboard">

          <div className="dashboard-header">

            <div>
              <h1>Dashboard</h1>

              <p className="welcome-text">
                Manage your tasks efficiently.
              </p>
            </div>

            <button
              className="add-task-button"
              onClick={() => setShowAddForm(true)}
            >
              + Add Task
            </button>

          </div>

          <TaskStats
            total={totalTasks}
            completed={completedTasks}
            pending={pendingTasks}
          />

          {showAddForm && (
            <AddTaskForm
              onAddTask={handleAddTask}
              onCancel={() => setShowAddForm(false)}
            />
          )}

          {editingTask && (
            <EditTaskForm
              task={editingTask}
              onUpdateTask={handleUpdateTask}
              onCancel={() => setEditingTask(null)}
            />
          )}

          <section className="tasks-section">

            <div className="tasks-section-header">

              <div>
                <h2>Recent Tasks</h2>

                <p className="task-count">
                  Showing {filteredTasks.length} of {totalTasks} tasks
                </p>
              </div>

              <div className="task-controls">

                <div className="search-box">

                  <span className="search-icon">
                    🔍
                  </span>

                  <input
                    type="text"
                    placeholder="Search tasks..."
                    value={searchTerm}
                    onChange={(event) =>
                      setSearchTerm(event.target.value)
                    }
                  />

                </div>

                <select
                  className="status-filter"
                  value={statusFilter}
                  onChange={(event) =>
                    setStatusFilter(event.target.value)
                  }
                >
                  <option value="All">
                    All Tasks
                  </option>

                  <option value="Pending">
                    Pending
                  </option>

                  <option value="Completed">
                    Completed
                  </option>
                </select>

              </div>

            </div>

            <div className="tasks-list">

              {filteredTasks.length > 0 ? (

                filteredTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onEdit={handleEditTask}
                    onDelete={handleDeleteTask}
                  />
                ))

              ) : (

                <div className="no-tasks">
                  <div className="no-tasks-icon">
                    🔍
                  </div>

                  <h3>No tasks found</h3>

                  <p>
                    Try changing your search or filter.
                  </p>
                </div>

              )}

            </div>

          </section>

        </main>

      </div>

    </div>
  );
}

export default App;