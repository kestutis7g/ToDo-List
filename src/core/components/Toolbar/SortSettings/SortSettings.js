import React from "react";

const SortSettings = ({ sortOptions, onSortingChange }) => {
  const handleChange = (e) => {
    onSortingChange(e.target.name, e.target.value);
  };
  const handleCheckboxChange = (e) => {
    onSortingChange(e.target.name, e.target.value !== "true");
  };

  return (
    <div className="container  py-2">
      <div className="d-flex flex-row mb-2">
        <div className="sortBy-container pe-2 ">
          <select
            className="form-select"
            id="sort-by-select"
            name="sortBy"
            value={sortOptions.sortBy}
            onChange={handleChange}
          >
            <option value="id">Default sorting</option>
            <option value="completed">By Status</option>
            <option value="priority">By Priority</option>
            <option value="dueDate">By Due Date</option>
          </select>
        </div>
        <div className="sortOrder-container">
          <select
            className="form-select"
            id="sort-order-select"
            name="sortOrder"
            value={sortOptions.sortOrder}
            onChange={handleChange}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      <div className="d-flex flex-row">
        <input
          className="form-check-input m-0 me-2"
          type="checkbox"
          name="hideCompleted"
          value={sortOptions.hideCompleted}
          checked={sortOptions.hideCompleted}
          onChange={handleCheckboxChange}
          id="filter-completed-checkbox"
        />
        <label htmlFor="filter-completed-checkbox" className="my-auto">
          Hide completed
        </label>
      </div>
    </div>
  );
};

export default SortSettings;
