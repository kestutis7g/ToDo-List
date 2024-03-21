import React, { useState } from "react";
import "./Task.css";

const Task = ({ task, onTaskCompletion, onDeleteTask, onSaveTask }) => {
  const [editMode, setEditMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedPriority, setEditedPriority] = useState(task.priority ?? 0);
  const [editedDueDate, setEditedDueDate] = useState(task.dueDate);

  const handleCheckboxChange = () => {
    onTaskCompletion(task.id, !task.completed);
  };

  const handleDeleteButtonClick = () => {
    onDeleteTask(task.id);
  };

  const handleEditButtonClick = () => {
    setEditMode(!editMode);
  };

  const handleSaveButtonClick = () => {
    onSaveTask(task.id, {
      title: editedTitle,
      priority: editedPriority,
      dueDate: editedDueDate,
    });
    setEditMode(false);
  };

  return (
    <li
      key={task.id}
      className={"card mb-2"}
      data-task-priority={task.completed ? -1 : task.priority ?? 0}
    >
      <div className="card-body">
        {editMode ? (
          <div className="d-flex flex-row justify-content-between">
            <span className="d-flex flex-column">
              <div className="form-floating mb-1">
                <input
                  type="text"
                  className="form-control"
                  value={editedTitle}
                  id="task-edit-title-input"
                  onChange={(e) => setEditedTitle(e.target.value)}
                />
                <label htmlFor="task-edit-title-input">Title</label>
              </div>

              <div className="form-floating mb-1">
                <select
                  className="form-select"
                  id="task-edit-priority-input"
                  aria-label="Floating label select example"
                  value={editedPriority}
                  onChange={(e) => setEditedPriority(e.target.value)}
                >
                  <option value="">-</option>
                  <option value="1">Low</option>
                  <option value="2">Medium</option>
                  <option value="3">High</option>
                </select>
                <label htmlFor="task-edit-priority-input">Priority</label>
              </div>

              <div className="form-floating mb-1">
                <input
                  type="date"
                  className="form-control"
                  value={editedDueDate}
                  id="task-edit-duedate-input"
                  onChange={(e) => setEditedDueDate(e.target.value)}
                />
                <label htmlFor="task-edit-duedate-input">Due Date</label>
              </div>
            </span>
            <button
              onClick={handleSaveButtonClick}
              className="btn btn-primary btn-delete"
            >
              <i className="fa-solid fa-save"></i>
            </button>
          </div>
        ) : (
          <>
            <div className="d-flex flex-row justify-content-between">
              <span className="d-flex flex-row">
                <input
                  className="form-check-input bg-success border-success me-2"
                  type="checkbox"
                  value=""
                  checked={task.completed}
                  onChange={handleCheckboxChange}
                  id={"task-" + task.id}
                />
                <h5
                  className={
                    "my-auto text-start" + (task.completed ? " completed" : "")
                  }
                >
                  {task.title}
                </h5>
                <p className="card-text">{task.description}</p>
              </span>
              <div className="d-flex flex-row">
                <button
                  onClick={handleEditButtonClick}
                  className="btn btn-primary btn-edit"
                >
                  <i className="fa-solid fa-pencil"></i>
                </button>
                <button
                  onClick={handleDeleteButtonClick}
                  className="btn btn-danger btn-delete"
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
            {task.dueDate && (
              <div className="d-flex">
                {task.dueDate && <i>Due to: {task.dueDate}</i>}
              </div>
            )}
          </>
        )}
      </div>
    </li>
  );
};

export default Task;
