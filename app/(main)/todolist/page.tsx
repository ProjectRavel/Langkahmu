"use client";

import { useState } from "react";
import {
  Calendar,
  Clock,
  Tag,
  StickyNote,
  Pencil,
  Trash2,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

type Category = "notyet" | "onprogress" | "completed";
type Task = {
  id: number;
  text: string;
  category: Category;
  editing: boolean;
};

export default function MyDay() {
  const [input, setInput] = useState("");
  const [category, setCategory] = useState<Category>("notyet");
  const [open, setOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = () => {
    if (!input.trim()) return;
    const newTask: Task = {
      id: Date.now(),
      text: input.trim(),
      category,
      editing: false,
    };
    setTasks([...tasks, newTask]);
    setInput("");
    setOpen(false);
  };

  const updateTask = (id: number, newText: string) => {
    setTasks(tasks.map(t => (t.id === id ? { ...t, text: newText, editing: false } : t)));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const changeTaskCategory = (id: number, newCategory: Category) => {
  setTasks(tasks.map((task) =>
    task.id === id ? { ...task, category: newCategory } : task
  ));
};

  const toggleEdit = (id: number) => {
    setTasks(tasks.map(t => (t.id === id ? { ...t, editing: true } : t)));
  };


  return (
    <section className="w-full min-h-screen bg-black text-white px-4 py-4">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-xl font-bold flex items-center gap-2">
          📝 To Do
        </h1>
        <p className="text-xs text-gray-400">Sunday, June 22</p>
      </div>

      {/* Input Task */}
<div className="mb-4">
  <div className="flex flex-wrap items-center gap-2 bg-[#1c1c1c] rounded-lg p-4 border border-[#333] shadow-sm">
    <div className="relative flex-1 min-w-[220px]">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">📝</span>
      <Input
        className="bg-[#2a2a2a] text-sm text-white pl-9 pr-3 py-2 placeholder:text-gray-500 border border-[#444] focus-visible:ring-1 focus-visible:ring-blue-500 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
        placeholder="Add a task..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onFocus={() => setOpen(true)}
        onBlur={() => {
          if (!input) setTimeout(() => setOpen(false), 150);
        }}
        onKeyDown={(e) => e.key === "Enter" && addTask()}
      />
    </div>

    <Select value={category} onValueChange={(val) => setCategory(val as Category)}>
      <SelectTrigger className="bg-[#2a2a2a] border-[#444] text-white text-sm h-9 w-[120px] px-3 py-1 rounded-md">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="notyet">Not Yet</SelectItem>
        <SelectItem value="onprogress">On Progress</SelectItem>
        <SelectItem value="completed">Completed</SelectItem>
      </SelectContent>
    </Select>

    <Button
      onClick={addTask}
      className="h-9 px-4 bg-blue-600 hover:bg-blue-700 text-sm font-medium text-white rounded-md"
      type="button"
    >
      Add
    </Button>
  </div>

  {/* Collapsible bawah input */}
  <Collapsible open={open}>
    <CollapsibleContent className="animate-slide-down mt-3 flex gap-2 flex-wrap">
      <Button variant="outline" className="bg-[#2d2d2d] text-white border-[#444] h-8 text-xs px-3">
        <Calendar size={14} className="mr-1" /> Due Date
      </Button>
      <Button variant="outline" className="bg-[#2d2d2d] text-white border-[#444] h-8 text-xs px-3">
        <Clock size={14} className="mr-1" /> Reminder
      </Button>
      <Button variant="outline" className="bg-[#2d2d2d] text-white border-[#444] h-8 text-xs px-3">
        <Tag size={14} className="mr-1" /> Tag
      </Button>
      <Button variant="outline" className="bg-[#2d2d2d] text-white border-[#444] h-8 text-xs px-3">
        <StickyNote size={14} className="mr-1" /> Note
      </Button>
    </CollapsibleContent>
  </Collapsible>

  {/* Editable Task List by Category */}
  {(["notyet", "onprogress", "completed"] as Category[]).map((cat) => (
    <div key={cat} className="mt-6">
      <h3 className="text-sm font-semibold text-gray-300 mb-2">
        {cat === "notyet" ? "Not Yet" : cat === "onprogress" ? "On Progress" : "Completed"}
      </h3>

      <div className="space-y-2">
        {tasks
          .filter((task) => task.category === cat)
          .map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between bg-[#1c1c1c] px-4 py-2 rounded-lg border border-[#333]"
            >
              {task.editing ? (
                <input
                  autoFocus
                  defaultValue={task.text}
                  onBlur={(e) => updateTask(task.id, e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      updateTask(task.id, (e.target as HTMLInputElement).value);
                    }
                  }}
                  className="bg-[#2d2d2d] text-white border border-[#444] rounded px-2 py-1 w-full text-sm focus:outline-none focus:ring focus:ring-blue-500"
                />
              ) : (
                <span
                  className="text-white cursor-pointer text-sm flex-1"
                  onDoubleClick={() => toggleEdit(task.id)}
                >
                  {task.text}
                </span>
              )}

              <div className="flex gap-2 ml-2 items-center">
                <Select
                  value={task.category}
                  onValueChange={(val) => changeTaskCategory(task.id, val as Category)}
                >
                  <SelectTrigger className="h-8 w-[110px] text-xs bg-[#2d2d2d] border-[#444] text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="notyet">Not Yet</SelectItem>
                    <SelectItem value="onprogress">On Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>

                <Button size="icon" variant="ghost" onClick={() => toggleEdit(task.id)}>
                  <Pencil size={14} />
                </Button>
                <Button size="icon" variant="ghost" onClick={() => deleteTask(task.id)}>
                  <Trash2 size={14} />
                </Button>
              </div>
            </div>
          ))}
      </div>
    </div>
  ))}
</div>
    </section>
  );
}

function TaskSection({
  title,
  tasks,
  onUpdate,
  onDelete,
  onEdit,
}: {
  title: string;
  tasks: Task[];
  onUpdate: (id: number, newText: string) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}) {
  return (
    <div className="mb-4">
      <h2 className="text-sm font-semibold mb-2 text-gray-300">{title}</h2>
      <ul className="space-y-1">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="bg-[#1c1c1c] px-3 py-1.5 rounded-md flex justify-between items-center border border-[#333]"
          >
            {task.editing ? (
              <input
                autoFocus
                defaultValue={task.text}
                onBlur={(e) => onUpdate(task.id, e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    onUpdate(task.id, (e.target as HTMLInputElement).value);
                  }
                }}
                className="bg-[#2d2d2d] text-white text-sm border border-[#444] rounded px-2 py-1 w-full"
              />
            ) : (
              <span
                className="text-white cursor-pointer flex-1 text-sm"
                onDoubleClick={() => onEdit(task.id)}
              >
                {task.text}
              </span>
            )}
            <div className="flex gap-1 ml-2">
              <Button size="icon" variant="ghost" onClick={() => onEdit(task.id)}>
                <Pencil size={14} />
              </Button>
              <Button size="icon" variant="ghost" onClick={() => onDelete(task.id)}>
                <Trash2 size={14} />
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
