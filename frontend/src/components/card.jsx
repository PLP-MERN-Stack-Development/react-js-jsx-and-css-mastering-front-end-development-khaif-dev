import { useState } from "react";
import Buttons from "./button";

export default function TaskCard({ task, onEdit, onDelete, onToggleStatus }) {
  const [edit, setEdit] = useState(false);
  const [draft, setDraft] = useState(task);

  const handleSubmit = (e) => {
    e.preventDefault();
    onEdit(draft);
    setEdit(false);
  };

  return (
    <div className="rounded-md border bg-white p-4 shadow-sm w-full">
      {!edit ? (
        <div className="flex justify-between items-start">
          <div className="flex gap-2">
            {/* Checkbox toggle */}
            <input
              type="checkbox"
              checked={task.status === "completed"}
              onChange={() =>
                onToggleStatus(
                  task._id,
                  task.status === "completed" ? "active" : "completed"
                )
              }
              className="mt-1"
            />

            {/* Task info */}
            <div>
              <h3
                className={`text-lg font-semibold ${
                  task.status === "completed"
                    ? "line-through text-gray-500"
                    : ""
                }`}
              >
                {task.taskName}
              </h3>
              <p className="text-slate-600 text-sm">{task.description}</p>
              <p className="text-slate-600 text-sm capitalize">
                {task.priority}
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-2">
            <Buttons
              text="Edit"
              onClick={() => setEdit(true)}
              className="bg-green-600 hover:bg-green-700"
            />
            <Buttons
              text="Delete"
              onClick={() => onDelete(task._id)}
              className="bg-red-600 hover:bg-red-700"
            />
          </div>
        </div>
      ) : (
        /* Edit Mode */
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input
            className="border rounded-lg px-3 py-1 w-full"
            value={draft.taskName}
            onChange={(e) =>
              setDraft({ ...draft, taskName: e.target.value })
            }
          />
          <textarea
            className="border rounded-lg px-3 py-1 w-full"
            value={draft.description}
            onChange={(e) =>
              setDraft({ ...draft, description: e.target.value })
            }
          />
          <select
            className="border rounded-lg px-3 py-1 w-full"
            value={draft.priority}
            onChange={(e) =>
              setDraft({ ...draft, priority: e.target.value })
            }
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <div className="flex gap-2">
            <Buttons
              text="Save"
              className="bg-green-600 hover:bg-green-700"
              type="submit"
            />
            <Buttons
              text="Cancel"
              onClick={() => setEdit(false)}
              className="bg-red-600 hover:bg-red-700"
            />
          </div>
        </form>
      )}
    </div>
  );
}
