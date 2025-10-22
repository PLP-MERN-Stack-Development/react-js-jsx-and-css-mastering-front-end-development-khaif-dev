// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/navbar";
import AllTasks from "./pages/alltasks";
import Footer from "./components/footer";
import ActiveTasks from "./pages/active";
import CompletedTasks from "./pages/completed";


function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        {/* Fixed Navbar */}
        <Nav />

        {/* Main content area */}
        <main className="flex-1 pt-24 px-6 md:px-12">
          <Routes>
            <Route path="/" element={<AllTasks />} />
            <Route path="/active" element={<ActiveTasks />} />
            <Route path="/completed" element={<CompletedTasks />} />
          </Routes>
        </main>
        <Footer />

      </div>
    </Router>
  );
}

export default App;
