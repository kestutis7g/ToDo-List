import React, { useState } from "react";

const NewTaskForm = ({ onAddTask }) => {
  const [newTask, setNewTask] = useState({
    title: "",
    priority: 0,
    dueDate: undefined,
  });

  const handleChange = (e) => {
    setNewTask({
      ...newTask,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (e) => {
    setNewTask({
      ...newTask,
      [e.target.name]: Number(e.target.value ?? 0),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTask(newTask);
    setNewTask({
      title: "",
      priority: 0,
      dueDate: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          type="text"
          className="form-control"
          id="title-input"
          name="title"
          value={newTask.title}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="selectOption" className="form-label">
          Priority
        </label>
        <select
          className="form-select"
          id="priority-select"
          name="priority"
          value={newTask.selectOption}
          onChange={handleSelectChange}
        >
          <option value="0">-</option>
          <option value="1">Low</option>
          <option value="2">Medium</option>
          <option value="3">High</option>
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="date" className="form-label">
          Due Date
        </label>
        <input
          type="date"
          className="form-control"
          id="dueDate"
          name="dueDate"
          value={newTask.dueDate}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Add
      </button>
    </form>
  );
};

export default NewTaskForm;
