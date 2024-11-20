import React, { useState } from "react";

function Counter() {
  const [data, setData] = useState("");
  const [lists, setLists] = useState([]);
  const [editId, setEditId] = useState(null);
  const [filter, setFilter] = useState("all"); // "all", "completed", "pending"

  // addItems
  const addItems = () => {
    if (editId) {
      const editItemFromList = lists.map((list) =>
        list.id === editId ? { ...list, name: data } : list
      );
      setLists(editItemFromList);
      setEditId(null);
      setData("");
    } else {
      const listItems = {
        id: Math.floor(Math.random() * 1000),
        name: data,
        completed: false, // New property for completion status
      };
      setLists([...lists, listItems]);
      setData("");
    }
  };

  // deleteItem
  const deleteItem = (id) => {
    const filterItem = lists.filter((list) => list.id !== id);
    setLists(filterItem);
  };

  // editItem
  const editItem = (list) => {
    setEditId(list.id);
    setData(list.name);
  };

  // toggleCompleteTask
  const toggleCompleteTask = (id) => {
    const updatedLists = lists.map((list) =>
      list.id === id ? { ...list, completed: !list.completed } : list
    );
    setLists(updatedLists);
  };

  // Filtered list
  const filteredLists = lists.filter((list) => {
    if (filter === "completed") return list.completed;
    if (filter === "pending") return !list.completed;
    return true; // "all"
  });

  return (
    <>
      <h1>TodoList</h1>
      <div>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
        <button onClick={() => setFilter("pending")}>Pending</button>
      </div>
      <div>
        <input
          value={data}
          onChange={(e) => setData(e.target.value)}
          placeholder="Add a task"
        />
        <button onClick={addItems}>Submit</button>
      </div>
      <div>
        <ul>
          {filteredLists.map((list) => {
            const { id, name, completed } = list;
            return (
              <li key={id}>
                <input
                  type="checkbox"
                  checked={completed}
                  onChange={() => toggleCompleteTask(id)}
                />
                <span
                  style={{
                    textDecoration: completed ? "line-through" : "none",
                  }}
                >
                  {name}
                </span>
                <button onClick={() => deleteItem(id)}>Delete</button>
                <button onClick={() => editItem(list)}>Edit</button>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default Counter;
