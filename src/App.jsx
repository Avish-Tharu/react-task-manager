import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import TaskStats from "./components/TaskStats";
import TaskCard from "./components/TaskCard";

function App() {
  return (
    <div className="app">
      <Navbar />

      <div className="main-layout">
        <Sidebar />

        <main className="dashboard">
          <h1>Dashboard</h1>

          <p className="welcome-text">
            Manage your tasks efficiently.
          </p>

          <TaskStats />

          <section className="tasks-section">
            <h2>Recent Tasks</h2>

            <TaskCard
              title="Complete React Assignment"
              description="Build the Task Manager application"
              status="Pending"
            />

            <TaskCard
              title="Study JavaScript"
              description="Review JavaScript array methods"
              status="Completed"
            />

            <TaskCard
              title="Update GitHub"
              description="Push the latest project changes"
              status="Pending"
            />
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;