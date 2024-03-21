import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Task from "./core/components/Task/Task";
import Toolbar from "./core/components/Toolbar/Toolbar";

const API_URL = "https://jsonplaceholder.typicode.com/todos";

function App() {
  const [initialized, setInitialized] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [sortOptions, setSortOptions] = useState({
    sortBy: "id",
    sortOrder: "asc",
    hideCompleted: false,
  });

  // Used only because mock api does not store data
  // and this way I simulate fetching data from api
  // and keeping modified data.
  // Runs when sorting options is changed.
  useEffect(() => {
    if (!initialized) {
      setInitialized(true);
      fetchData();
    } else {
      fetchData(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortOptions]);

  // Simulates data fetch and performs data sorting
  // {limit} is set to 100 to prevent api error with todo update
  // requests where id > 200
  const fetchData = (initial = true) => {
    axios
      .get(
        `${API_URL}?_sort=${sortOptions.sortBy}&_order=${sortOptions.sortOrder}&_limit=100`
      )
      .then((response) => {
        // API results should be used but in this case
        // this data is later not used to keep changed values
        //! setTasks(response.data);

        if (initial) {
          //
          setTasks(response.data);
        } else {
          const sortedTasks = [...tasks].sort((a, b) => {
            const sortByA = a[sortOptions.sortBy];
            const sortByB = b[sortOptions.sortBy];

            // Handle undefined values
            if (sortByA === undefined && sortByB === undefined) {
              return 0;
            } else if (sortByA === undefined) {
              return sortOptions.sortOrder === "asc" ? 1 : -1;
            } else if (sortByB === undefined) {
              return sortOptions.sortOrder === "asc" ? -1 : 1;
            }

            // Continue with regular comparison
            if (sortOptions.sortOrder === "asc") {
              return sortByA > sortByB ? 1 : -1;
            } else {
              return sortByA < sortByB ? 1 : -1;
            }
          });
          setTasks(sortedTasks);
        }
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  };

  // Handle sorting options value change
  const handleSortingChange = (name, value) => {
    setSortOptions({
      ...sortOptions,
      [name]: value,
    });
  };

  // Handle task insert event
  const handleAddTask = (newTask) => {
    if (newTask.title.trim() !== "") {
      axios
        .post(API_URL, {
          title: newTask.title,
          description: newTask.description,
          priority: newTask.priority,
          dueDate: newTask.dueDate,
          completed: false,
        })
        .then((response) => {
          //corrected id, because api crashes when updating todos with id > 200
          const correctedTask = {
            ...response.data,
            id: tasks.length + 1,
          };
          setTasks([...tasks, correctedTask]);
        })
        .catch((error) => {
          console.error("Error adding task:", error);
        });
    }
  };

  // Handle task completion status change event
  const handleTaskCompletion = (taskId, completed) => {
    axios
      .put(`${API_URL}/${taskId}`, { completed })
      .then(() => {
        setTasks((prevTasks) => {
          return prevTasks.map((task) =>
            task.id === taskId ? { ...task, completed } : task
          );
        });
      })
      .catch((error) => {
        console.error("Error updating task:", error);
      });
  };

  // Handle task completion status change event
  const handleSaveTask = (taskId, properties) => {
    axios
      .put(`${API_URL}/${taskId}`, { properties })
      .then((response) => {
        if (response.status === 200) {
          // Assuming properties contain only the fields that need to be updated
          setTasks((prevTasks) => {
            return prevTasks.map((task) =>
              task.id === taskId ? { ...task, ...properties } : task
            );
          });
        } else {
          console.error("Error updating task:", response.statusText);
        }
      })
      .catch((error) => {
        console.error("Error updating task:", error);
      });
  };

  // Handle task delete event
  const handleDeleteTask = (taskId) => {
    axios
      .delete(`${API_URL}/${taskId}`)
      .then(() => {
        const updatedTasks = tasks.filter((task) => task.id !== taskId);
        setTasks(updatedTasks);
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
      });
  };

  return (
    <div className="App">
      <h1 className="mt-3">ToDo List</h1>
      <div className="tasks">
        <Toolbar
          onAddTask={handleAddTask}
          sortOptions={sortOptions}
          onSortingChange={handleSortingChange}
        />
        <ul className="container mt-3">
          {tasks.map((task) =>
            (sortOptions.hideCompleted ? !task.completed : true) ? (
              <Task
                key={task.id}
                task={task}
                onTaskCompletion={handleTaskCompletion}
                onDeleteTask={handleDeleteTask}
                onSaveTask={handleSaveTask}
              />
            ) : null
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;
