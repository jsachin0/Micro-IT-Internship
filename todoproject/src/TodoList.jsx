import { useEffect, useState } from "react";
import "./todo.css";

const statusList = [
  { label: "All", value: "all" },
  { label: "Completed", value: "completed" },
  { label: "Not Completed", value: "not-completed" },
];
const TodoList = () => {
  const [inputValue, setInputValue] = useState({
    value: "",
    checked: false,
    id: Math.random(),
  });
  const [items, setItems] = useState([]);
  const [isEdit, setIsEdit] = useState(null);
  const [status, setStatus] = useState("all");
  const [filteredItems, setFilteredItems] = useState([]);

  const handleChange = (event) => {
    setInputValue((prev) => ({ ...prev, value: event.target.value }));
  };

  const handleClick = () => {
    if (inputValue.value) {
      if (isEdit) {
        setItems((prev) => prev.map((e) => (e.id === isEdit ? inputValue : e)));
      } else {
        setItems((prev) => [...prev, inputValue]);
      }
      setInputValue({ value: "", checked: false, id: Math.random() });
      setIsEdit(null);
    }
  };

  const handleDelete = (id) => {
    setItems((prev) =>
      prev.map((e) => (e.id === id ? null : e)).filter((e) => e)
    );
  };

  const handleEdit = (id) => {
    setIsEdit(id);
    setInputValue(items.find((e) => e.id === id));
  };

  const handleChangeCheckbox = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleChangeStatus = (status) => {
    setStatus(status);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleClick();
    }
  };

  const handleReset = () => {
    setItems([]);
  };

  useEffect(() => {
    switch (status) {
      case "all":
        setFilteredItems(items);
        break;
      case "completed":
        setFilteredItems(items.filter((e) => e.checked));
        break;
      case "not-completed":
        setFilteredItems(items.filter((e) => !e.checked));
        break;
      default:
        setFilteredItems(items);
        break;
    }
  }, [status, setFilteredItems, items]);

  return (
    <div className="container">
      <div>
        <h1 className="todo_title">TODO APP</h1>
        <div className="input_container">
          <input
            className="todo_input"
            type="text"
            placeholder="Enter Input"
            value={inputValue.value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <button className="todo_button" onClick={handleClick}>
            {isEdit ? "Update" : "Add Todo"}{" "}
          </button>
        </div>

        <div className="input_container" style={{ marginTop: "5px" }}>
          {items.length > 0 && statusList.map((e) => (
            <button
              style={{
                backgroundColor: e.value === status ? "black" : "",
                color: e.value === status ? "white" : "",
                fontSize: 20,
                marginRight: "10px",
              }}
              key={e.value}
              onClick={() => handleChangeStatus(e.value)}
            >
              {e.label}
            </button>
          ))}
        </div>

        <div>
          <ol className="todo_list_container">
            {filteredItems
              .filter((e) => e)
              .map((each) => {
                return (
                  <li key={each.id} className="todo_list_item">
                    <div>
                      <input
                        type="checkbox"
                        onChange={() => handleChangeCheckbox(each.id)}
                        checked={each.checked}
                      />{" "}
                    </div>
                    <div
                      style={
                        each.checked
                          ? { textDecorationLine: "line-through" }
                          : {}
                      }
                    >
                      {each.value}
                    </div>
                    <div className="todo_list_item_actions">
                      <div>
                        <button onClick={() => handleEdit(each.id)}>
                          Edit
                        </button>
                      </div>
                      <div>
                        <button onClick={() => handleDelete(each.id)}>
                          Delete
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
          </ol>
        </div>
        {
            filteredItems.length > 0 ?
                <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
                >
                <button
                    style={{
                    backgroundColor: "black",
                    color: "white",
                    fontSize: 20,
                    }}
                    onClick={handleReset}
                >
                    Reset all
                </button>
                </div>
            :null
        }
      </div>
    </div>
  );
};

export default TodoList;
