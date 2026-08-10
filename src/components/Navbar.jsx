function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        Task Manager
      </div>

      <div className="navbar-right">
        <span>Welcome 👋</span>
        <button className="profile-button">
          Profile
        </button>
      </div>
    </nav>
  );
}

export default Navbar;