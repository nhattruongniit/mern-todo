import React, { useState } from "react";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

function CreateTodo() {
  const [errorBoundary, setErrorBoundary] = useState(null);

  const handleSubmit = async (values, { setSubmitting }) => {
    setTimeout(() => {
      setSubmitting(false);
    }, 500);

    const res = await fetch(`${process.env.REACT_APP_END_POINT}/todos/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const data = await res.json();
    console.log(data);
  };

  return (
    <div>
      <h3>Create New Todo</h3>
      {errorBoundary}
      <Formik
        initialValues={{
          description: "",
          responsible: "",
          priority: "Low",
          completed: false,
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

            <div className="form-group">
              <input
                type="submit"
                value="Create Todo"
                className="btn btn-primary"
                disabled={isSubmitting}
              />
              <input
                type="button"
                value="Test Error Boundary"
                className="btn btn-info ml-3"
                onClick={() => setErrorBoundary({ todo: 1 })}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default CreateTodo;
