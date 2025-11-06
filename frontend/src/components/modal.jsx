import { useState } from "react";
import Buttons from "./button";

function Modal({open, onClose, onSubmit, children}){
    const [form ,setForm] = useState({task:"", description:"", priority:""})

    const handleChange = e =>{
        const {name, value} = e.target;
        setForm(prev => ({...prev, [name]: value}));
    };

    const handleSubmit = (e) =>{
        e.preventDefault();
        if(!form.task || !form.description || !form.priority) return;

        onSubmit({taskName: form.task, description: form.description, priority: form.priority});

        setForm({task:"", description:"", priority:""});
        onClose();
    };


    return(
        <>
            {/* modal overlay */}
            <div onClick={onClose}
                className={`fixed inset-0  
                            ${open ? "visible bg-black opacity-50" : "invisible"}`}>

            </div>
            {/* the modal */}
            <div className={`border-2git dark:border-gray-400 rounded-md p-8  w-xl shadow-xl 
                            ${open? "scale-100 opacity-100" : "scale-125 opacity-0"}`}>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit} >
                    
                    <span 
                        onClick={onClose}
                        className="text-5xl font-medium text-right">&times;</span>
                    <input
                        type="text"
                        placeholder="Add Task"
                        name="task"
                        value={form.task}
                        onChange={handleChange}
                        className="border-b-2 dark:border-gray-400 " />

                    <textarea 
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="Add description"
                        className="border-2 border-gray-400 p-2 "></textarea>

                    <select name="priority" className="p-2 text-black-600" value={form.priority} onChange={handleChange}>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="High">High</option>
                    </select>  

                    <Buttons 
                        onClick={handleSubmit}
                        text="Save" className="bg-green-600 hover:bg-green-700 center-item"/>  
                </form>
            
            </div>
            {/* show the children/ modal */}
            {children}
        </>
 
    );

}
export default Modal;