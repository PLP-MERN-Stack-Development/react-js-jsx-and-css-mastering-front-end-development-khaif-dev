import { useState, useEffect } from "react";
import TaskCard from "../components/card";
import { fetchTasks, deleteTasks, updateTasks } from "../lib/API";

function CompletedTasks() {
  const [tasks, setTasks] = useState([]);

  // Fetch only completed tasks
  useEffect(() => {
    fetchTasks()
      .then((data) => {
        const completed = data.filter((task) => task.status === "completed");
        setTasks(completed);
      })
      .catch((err) => console.error("Error fetching completed tasks:", err));
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteTasks(id);
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  const handleEdit = async (updatedTask) => {
    try {
      const data = await updateTasks(updatedTask._id, updatedTask);
      setTasks((prev) => prev.map((t) => (t._id === data._id ? data : t)));
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  const handleToggleStatus = async (id, newStatus) => {
    try {
      const updated = await updateTasks(id, { status: newStatus });
      setTasks((prev) => prev.map((t) => (t._id === id ? updated : t)));
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Completed Tasks</h1>

      <div className="flex flex-col gap-3">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onToggleStatus={handleToggleStatus}
            />
          ))
        ) : (
          <p className="text-gray-500 text-center">No completed tasks yet.</p>
        )}
      </div>
    </div>
  );
}

export default CompletedTasks;
