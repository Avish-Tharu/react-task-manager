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

            <h2>Recent Tasks</h2>

            <div className="tasks-list">

              {tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onEdit={handleEditTask}
                  onDelete={handleDeleteTask}
                />
              ))}

            </div>

          </section>

        </main>

      </div>

    </div>
  );
}

export default App;