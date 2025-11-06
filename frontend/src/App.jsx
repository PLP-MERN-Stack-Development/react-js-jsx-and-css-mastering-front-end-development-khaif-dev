// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import AllTasks from "./pages/alltasks";
import ActiveTasks from "./pages/active";
import CompletedTasks from "./pages/completed";
import { ThemeProvider } from "./context/ThemeContext";


function App() {
  return (
    <ThemeProvider>
      <Router>
        <main>
          <Routes>
              <Route path="/" element={<Layout />} >
                <Route index element={<AllTasks/>}/>
                <Route path="/active" element={<ActiveTasks />} />
                <Route path="/completed" element={<CompletedTasks />} />
              </Route>
            
          </Routes>
        </main>
        {/* <div className="min-h-screen flex flex-col dark:bg-gray-900/90 dark:text-white">
          <Nav />
          <main className="flex-1 pt-24 px-6 md:px-12">
            <Routes>

            </Routes>
          </main>
          <Footer />
        </div> */}
      </Router>
    </ThemeProvider>
  );
}

export default App;
