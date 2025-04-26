const Todo = ({ completeTodo, deleteTodo, todo }) => {
  return (
    <div
      className="todo-item"
      style={{
        display: "flex",
        justifyContent: "space-between",
        maxWidth: "70%",
        margin: "auto",
        padding: "10px",
      }}
    >
      <span>{todo.text}</span>
      {todo.done ? "Done" : "Not Done"}

      <button onClick={() => deleteTodo(todo)}>Delete</button>
      <button onClick={() => completeTodo(todo)}>Complete</button>
    </div>
  );
};

export default Todo;
