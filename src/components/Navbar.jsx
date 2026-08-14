function Navbar({
  darkMode,
  onToggleDarkMode,
}) {
  return (
    <nav className="navbar">

      <div className="navbar-left">

        <div className="logo">
          Task Manager
        </div>

      </div>

      <div className="navbar-right">

        <button
          className="theme-toggle"
          onClick={onToggleDarkMode}
          aria-label="Toggle dark mode"
          title={
            darkMode
              ? "Switch to light mode"
              : "Switch to dark mode"
          }
        >
          {darkMode ? "☀️" : "🌙"}
        </button>

        <div className="user-profile">

          <div className="user-avatar">
            T
          </div>

          <span>
            Tharushi
          </span>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;