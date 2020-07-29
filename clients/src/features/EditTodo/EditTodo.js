import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";


function EditTodo() {
  const { id } = useParams();
  const history = useHistory();
  const [todo, setTodo] = useState({
    description: "",
    responsible: "",
    priority: "",
    completed: false,
  })

  useEffect(() => {
    const fetchTodo = async () => {
      const res = await fetch(`${process.env.REACT_APP_END_POINT}/todos/${id}`, {
        method: "GET",
      });
      const data = await res.json();
      const todo = {
        description: data.description,
        responsible: data.responsible,
        priority: data.priority,
        completed: data.completed,
      }
      setTodo(todo);

    }
    fetchTodo();
  }, []) 

  const handleSubmit = async (values, { setSubmitting }) => {
    setTimeout(() => {
      setSubmitting(false);
    }, 500);
    await fetch(`${process.env.REACT_APP_END_POINT}/todos/update/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    history.push('/')
  };

  return (
    <div>
      <h3>Update Todo</h3>
      {todo.description !== '' ? (
        <Formik
          initialValues={{
            description: todo.description,
            responsible: todo.responsible,
            priority: todo.priority,
            completed: todo.completed,
          }}
          validationSchema={Yup.object().shape({
            description: Yup.string().required(),
            responsible: Yup.string().required(),
          })}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, isSubmitting }) => (
            <Form>
              <div className="form-group">
                <label>Description: </label>
                <Field
                  id="description"
                  type="text"
                  className="form-control"
                  value={values.description}
                  onChange={handleChange}
                />
                <div className="invalid-feedback">
                  <ErrorMessage name="description" />
                </div>
              </div>
              <div className="form-group">
                <label>Responsible: </label>
                <Field
                  id="responsible"
                  type="text"
                  className="form-control"
                  value={values.responsible}
                  onChange={handleChange}
                />
                <div className="invalid-feedback">
                  <ErrorMessage name="responsible" />
                </div>
              </div>
              <div role="group" aria-labelledby="radio-priority">
                <div className="form-group">
                  <div className="form-check form-check-inline">
                    <Field
                      className="form-check-input"
                      type="radio"
                      name="priority"
                      id="low"
                      value="Low"
                    />
                    <label className="form-check-label">Low</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <Field
                      className="form-check-input"
                      type="radio"
                      name="priority"
                      id="medium"
                      value="Medium"
                    />
                    <label className="form-check-label">Medium</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <Field
                      className="form-check-input"
                      type="radio"
                      name="priority"
                      id="high"
                      value="High"
                    />
                    <label className="form-check-label">High</label>
                  </div>
                </div>
              </div>
              <div class="form-check">
                <input type="checkbox" class="form-check-input" id="completed" checked={values.completed} onChange={handleChange} />
                <label class="form-check-label" for="completed">Completed</label>
              </div>
              <br />

              <div className="form-group">
                <input
                  type="submit"
                  value="Update Todo"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                />
                 <input
                  type="button"
                  value="Back"
                  className="btn btn-secondary ml-3"
                  onClick={() => history.go(-1)}
                />
              </div>
            </Form>
          )}
        </Formik>
      ) : null}
    </div>
  )
}

export default EditTodo;
