import { useState, useEffect } from "react";
import TaskCard from "../components/card";
// import { fetchTasks, deleteTasks, updateTasks } from "../lib/API";
import useLocalStorage from "../hooks/useLocalStorage";
import { fetchTasks, updateTasks, deleteTasks } from "../lib/localTasks";


function ActiveTasks() {
  const [tasks, setTasks] = useLocalStorage("tasks", []);

  // Fetch only active tasks
  useEffect(() => {
    fetchTasks()
      .then((data) => {
        const active = data.filter((task) => task.status === "active");
        setTasks(active);
      })
      .catch((err) => console.error("Error fetching active tasks:", err));
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
      <h1 className="text-2xl font-bold mb-4">Active Tasks</h1>

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
          <p className="text-gray-500 text-center">No active tasks.</p>
        )}
      </div>
    </div>
  );
}

export default ActiveTasks;
