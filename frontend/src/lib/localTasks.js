//get data from memory 
const STORAGE_KEY = "tasks";

function getStoredTasks() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function saveTasks(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

export async function fetchTasks() {
  return getStoredTasks();
}

export async function createTasks(data) {
  const newTask = { id: Date.now(), status: "active", ...data };
  const tasks = [...getStoredTasks(), newTask];
  saveTasks(tasks);
  return newTask;
}

export async function updateTasks(id, updates) {
  const tasks = getStoredTasks().map(t =>
    t.id === id ? { ...t, ...updates } : t
  );
  saveTasks(tasks);
  return tasks.find(t => t.id === id);
}

export async function deleteTasks(id) {
  const tasks = getStoredTasks().filter(t => t.id !== id);
  saveTasks(tasks);
  return true;
}
