import NewTaskForm from "./NewTaskForm/NewTaskForm";
import Filters from "./SortSettings/SortSettings";
import React from "react";

const Toolbar = ({ onAddTask, sortOptions, onSortingChange }) => {
  return (
    <div className="container">
      <div className="accordion" id="accordionFlushExample">
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseOne"
              aria-expanded="false"
              aria-controls="flush-collapseOne"
            >
              <i className="fa-regular fa-square-plus fa-lg my-auto me-1"></i>
              <h5 className="my-auto">Add Task</h5>
            </button>
          </h2>
          <div
            id="flush-collapseOne"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body">
              <NewTaskForm onAddTask={onAddTask} />
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              <i className="fa-solid fa-sort fa-lg my-auto me-1"></i>
              <h5 className="my-auto">Sort Tasks</h5>
            </button>
          </h2>
          <div
            id="collapseTwo"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <Filters
              sortOptions={sortOptions}
              onSortingChange={onSortingChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
