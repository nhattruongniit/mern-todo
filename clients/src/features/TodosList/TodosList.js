import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';

function TodosList() {
  const [todos, setTodos] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const fetchTodo = async () => {
      const res = await fetch(`${process.env.REACT_APP_END_POINT}/todos`, {
        method: "GET",
      });
      const data = await res.json();
      setTodos(data);
    }
    fetchTodo();
  }, [])

  const handleEdit = id => () => {
    history.push(`/edit/${id}`);
  }

  const handleDelete = id => async () => {
    await fetch(`${process.env.REACT_APP_END_POINT}/todos/remove/${id}`, {
      method: "POST",
    });
    const newTodos = todos.filter(todo => todo._id !== id);
    setTodos(newTodos)
  }

  return (
    <div>
      <h3>Todos List</h3>
      <table className="table table-striped" style={{ marginTop: 20 }} >
        <thead>
            <tr>
              <th>Description</th>
              <th>Responsible</th>
              <th>Priority</th>
              <th>Action</th>
            </tr>
        </thead>
        <tbody>
          {todos.length > 0 ? todos.map(todo => (
            <tr key={todo._id} className={todo.completed ? 'completed' : ''}>
                <td>{todo.description}</td>
                <td>{todo.responsible}</td>
                <td>{todo.priority}</td>
                <td>
                  <button type="button" className="btn btn-link" onClick={handleEdit(todo._id)}>Edit</button>
                  <button type="button" className="btn btn-link" onClick={handleDelete(todo._id)}>Delete</button>
                </td>
            </tr>
          )) : null}
        </tbody>
      </table>
    </div>
  );
}

export default TodosList;
