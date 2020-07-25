import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// feature
import TodosList from 'features/TodosList'
import EditTodo from 'features/EditTodo';
import CreateTodo from 'features/CreateTodo';

function App() {
  return (
    <Router>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="navbar-brand">MERN-Stack Todo App</div>
          <div className="collpase navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="navbar-item">
                <Link to="/" className="nav-link">Todos</Link>
              </li>
              <li className="navbar-item">
                <Link to="/create" className="nav-link">Create Todo</Link>
              </li>
            </ul>
          </div>
        </nav>
        <Route path="/" exact component={TodosList} />
        <Route path="/edit/:id" component={EditTodo} />
        <Route path="/create" component={CreateTodo} />
      </div>
    </Router>
  );
}

export default App;
