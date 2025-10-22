import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md flex justify-between items-center px-8 py-4 z-50">
      <h1 className="text-lg font-semibold">Tasks</h1>

      <div className="flex gap-6 ">
        <Link to="/" className="hover:text-blue-600">All Tasks</Link>
        <Link to="/active" className="hover:text-blue-600">Active</Link>
        <Link to="/completed" className="hover:text-blue-600">Completed</Link>
      </div>
    </nav>
  );
}

export default Nav;
