import { useState, useEffect } from "react";
import TaskCard from "../components/card";
import Buttons from "../components/button";
import Modal from "../components/modal";
import { createTasks, fetchTasks, deleteTasks, updateTasks } from "../lib/API";

function AllTasks() {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // fetch all tasks from backend
  useEffect(() => {
    fetchTasks()
      .then((data) => setTasks(data))
      .catch((err) => console.error("Error fetching tasks:", err));
  }, []);

  // create new task
  const handleCreate = async (taskData) => {
    try {
      const newTask = await createTasks(taskData);
      setTasks((prev) => [...prev, newTask]);
      setShowModal(false);
    } catch (err) {
      console.error("Error creating task:", err);
    }
  };

  // handle delete
  const handleDelete = async (id) => {
    try {
      await deleteTasks(id);
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  // handle edit
  const handleEdit = async (updatedTask) => {
    try {
      const data = await updateTasks(updatedTask._id, updatedTask);
      setTasks((prev) => prev.map((t) => (t._id === data._id ? data : t)));
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  //  handle checkbox toggle (active ↔ completed)
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
      {/* Top section */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">All Tasks</h1>
        <Buttons
          text="Add Task"
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700"
        />
      </div>

      {/* Modal for creating new task */}
      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleCreate}
      />

      {/* Task List */}
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
          <p className="text-gray-500 text-center">No tasks yet.</p>
        )}
      </div>
    </div>
  );
}

export default AllTasks;
