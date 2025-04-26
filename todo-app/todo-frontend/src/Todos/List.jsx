import React from "react";
import Todo from "./Todo";

const TodoList = ({ todos, deleteTodo, completeTodo }) => {
  return (
    <div>
      {todos.map((todo, index) => (
        <Todo
          key={index}
          completeTodo={completeTodo}
          deleteTodo={deleteTodo}
          todo={todo}
        />
      ))}
    </div>
  );
};

export default TodoList;
