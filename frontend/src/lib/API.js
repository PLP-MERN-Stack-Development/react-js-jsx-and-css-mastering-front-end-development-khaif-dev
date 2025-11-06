// get data from backend using CRUD operations
const API = import.meta.env.VITE_API_URL;

export async function fetchTasks (){
    const res = await fetch (`${API}/tasks`);
    if(!res.ok) throw new Error("Failed to fetch");
    return res.json();
}

export async function createTasks (data){
    const res = await fetch(`${API}/tasks`,{
        method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify(data)});
    return res.json()
}

export async function updateTasks(id,data){
  const res=await fetch(`${API}/tasks/${id}`,{
    method:"PUT",headers:{"Content-Type":"application/json"},
    body:JSON.stringify(data)});
  return res.json();
}
export async function deleteTasks(id){
  await fetch(`${API}/tasks/${id}`,{method:"DELETE"});
}
