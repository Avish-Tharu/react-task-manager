import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import TaskStats from "./components/TaskStats";
import TaskCard from "./components/TaskCard";
import AddTaskForm from "./components/AddTaskForm";
import EditTaskForm from "./components/EditTaskForm";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
function App() {
  // ================================
  // DAY 9 - LOGIN STATE
  // ================================

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return (
      localStorage.getItem("task-manager-auth") === "true"
    );
  });
const [showSignUp, setShowSignUp] =
  useState(false);
  // ================================
  // DARK MODE
  // ================================

  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem(
      "task-manager-theme"
    );

    return savedTheme === "dark";
  });

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");

      localStorage.setItem(
        "task-manager-theme",
        "dark"
      );
    } else {
      document.body.classList.remove("dark-mode");

      localStorage.setItem(
        "task-manager-theme",
        "light"
      );
    }
  }, [darkMode]);

  // ================================
  // TASK STATE
  // ================================

  const [tasks, setTasks] = useState(() => {
  const savedTasks = localStorage.getItem(
    "task-manager-tasks"
  );

  if (savedTasks) {
    return JSON.parse(savedTasks);
  }

  return [
    {
      id: 1,
      title: "Complete React Assignment",
      description:
        "Build the Task Manager application",
      status: "Pending",
      priority: "High",
    },
    {
      id: 2,
      title: "Study JavaScript",
      description:
        "Review JavaScript array methods",
      status: "Completed",
       priority: "Low",
    },
    {
      id: 3,
      title: "Update GitHub",
      description:
        "Push the latest project changes",
      status: "Pending",
       priority: "Medium",
    },
  ];
});
useEffect(() => {
  localStorage.setItem(
    "task-manager-tasks",
    JSON.stringify(tasks)
  );
}, [tasks]);
  // ================================
  // FORM STATES
  // ================================

  const [showAddForm, setShowAddForm] =
    useState(false);

  const [editingTask, setEditingTask] =
    useState(null);

  // ================================
  // SEARCH + FILTER
  // ================================

  const [searchTerm, setSearchTerm] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  // ================================
  // CREATE TASK
  // ================================

  const handleAddTask = (newTask) => {
    setTasks((currentTasks) => [
      ...currentTasks,
      newTask,
    ]);

    setShowAddForm(false);
  };

  // ================================
  // EDIT TASK
  // ================================

  const handleEditTask = (task) => {
    setEditingTask(task);
  };

  // ================================
  // UPDATE TASK
  // ================================

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

  // ================================
  // DELETE TASK
  // ================================

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

  // ================================
  // DAY 8 - DRAG AND DROP
  // ================================

  const handleDropTask = (
    taskId,
    newStatus
  ) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: newStatus,
            }
          : task
      )
    );
  };

  // ================================
  // DAY 9 - LOGIN
  // ================================

  const handleLogin = (user) => {
    localStorage.setItem(
      "task-manager-auth",
      "true"
    );

    localStorage.setItem(
      "task-manager-user",
      JSON.stringify(user)
    );

    setIsLoggedIn(true);
  };
  const handleSignUp = (user) => {
  localStorage.setItem(
    "task-manager-user",
    JSON.stringify(user)
  );

  setShowSignUp(false);

  setIsLoggedIn(true);
};
const handleGoToSignUp = () => {
  setShowSignUp(true);
};

const handleGoToLogin = () => {
  setShowSignUp(false);
};

  // ================================
  // DAY 9 - LOGOUT
  // ================================

  const handleLogout = () => {
    localStorage.removeItem(
      "task-manager-auth"
    );

    localStorage.removeItem(
      "task-manager-user"
    );

    setIsLoggedIn(false);
  };

  // ================================
  // SEARCH + FILTER
  // ================================

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title
        .toLowerCase()
        .includes(
          searchTerm.toLowerCase()
        ) ||
      task.description
        .toLowerCase()
        .includes(
          searchTerm.toLowerCase()
        );

    const matchesStatus =
      statusFilter === "All" ||
      task.status === statusFilter;

    return (
      matchesSearch &&
      matchesStatus
    );
  });

  // ================================
  // TASK STATISTICS
  // ================================

  const totalTasks = tasks.length;

  const completedTasks =
    tasks.filter(
      (task) =>
        task.status === "Completed"
    ).length;

  const pendingTasks =
    tasks.filter(
      (task) =>
        task.status === "Pending"
    ).length;

  // ================================
  // LOGIN PAGE
  // ================================

  if (!isLoggedIn) {
  if (showSignUp) {
    return (
      <SignUpPage
        onSignUp={handleSignUp}
        onGoToLogin={handleGoToLogin}
      />
    );
  }

  return (
    <LoginPage
      onLogin={handleLogin}
      onGoToSignUp={handleGoToSignUp}
    />
  );
}

  // ================================
  // DASHBOARD
  // ================================

  return (
    <div className="app">

      <Navbar
  darkMode={darkMode}
  onToggleDarkMode={() =>
    setDarkMode(
      (currentMode) => !currentMode
    )
  }
  onLogout={handleLogout}
  user={JSON.parse(
    localStorage.getItem(
      "task-manager-user"
    ) || "null"
  )}
/>

      <div className="main-layout">

        <Sidebar />

        <main className="dashboard">

          {/* Dashboard Header */}

          <div className="dashboard-header">

            <div>

              <h1>Dashboard</h1>

              <p className="welcome-text">
                Manage your tasks efficiently.
              </p>

            </div>

            <button
              className="add-task-button"
              onClick={() =>
                setShowAddForm(true)
              }
            >
              + Add Task
            </button>

          </div>

          {/* Statistics */}

          <TaskStats
            total={totalTasks}
            completed={completedTasks}
            pending={pendingTasks}
          />

          {/* Add Task Form */}

          {showAddForm && (
            <AddTaskForm
              onAddTask={handleAddTask}
              onCancel={() =>
                setShowAddForm(false)
              }
            />
          )}

          {/* Edit Task Form */}

          {editingTask && (
            <EditTaskForm
              task={editingTask}
              onUpdateTask={
                handleUpdateTask
              }
              onCancel={() =>
                setEditingTask(null)
              }
            />
          )}

          {/* Tasks Section */}

          <section className="tasks-section">

            {/* Section Header */}

            <div className="tasks-section-header">

              <div>

                <h2>Recent Tasks</h2>

                <p className="task-count">
                  Showing{" "}
                  {filteredTasks.length}{" "}
                  of {totalTasks} tasks
                </p>

              </div>

              {/* Search + Filter */}

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
                      setSearchTerm(
                        event.target.value
                      )
                    }
                  />

                </div>

                <select
                  className="status-filter"
                  value={statusFilter}
                  onChange={(event) =>
                    setStatusFilter(
                      event.target.value
                    )
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

            {/* DAY 8 - DROP ZONES */}

            <div className="drop-zones">

              {/* Pending Drop Zone */}

              <div
                className="drop-zone pending-zone"
                onDragOver={(event) => {
                  event.preventDefault();

                  event.dataTransfer.dropEffect =
                    "move";
                }}
                onDrop={(event) => {
                  event.preventDefault();

                  const taskId = Number(
                    event.dataTransfer.getData(
                      "taskId"
                    )
                  );

                  handleDropTask(
                    taskId,
                    "Pending"
                  );
                }}
              >

                <span className="drop-zone-icon">
                  📋
                </span>

                <div>

                  <strong>
                    Pending
                  </strong>

                  <p>
                    Drop task here
                  </p>

                </div>

              </div>

              {/* Completed Drop Zone */}

              <div
                className="drop-zone completed-zone"
                onDragOver={(event) => {
                  event.preventDefault();

                  event.dataTransfer.dropEffect =
                    "move";
                }}
                onDrop={(event) => {
                  event.preventDefault();

                  const taskId = Number(
                    event.dataTransfer.getData(
                      "taskId"
                    )
                  );

                  handleDropTask(
                    taskId,
                    "Completed"
                  );
                }}
              >

                <span className="drop-zone-icon">
                  ✅
                </span>

                <div>

                  <strong>
                    Completed
                  </strong>

                  <p>
                    Drop task here
                  </p>

                </div>

              </div>

            </div>

            {/* Task List */}

            <div className="tasks-list">

              {filteredTasks.length > 0 ? (

                filteredTasks.map(
                  (task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onEdit={
                        handleEditTask
                      }
                      onDelete={
                        handleDeleteTask
                      }
                    />
                  )
                )

              ) : (

                <div className="no-tasks">

                  <div className="no-tasks-icon">
                    🔍
                  </div>

                  <h3>
                    No tasks found
                  </h3>

                  <p>
                    Try changing your
                    search or filter.
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