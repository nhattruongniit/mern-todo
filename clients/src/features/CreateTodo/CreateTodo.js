import React from 'react'

function CreateTodo() {

  const onSubmit  = () => {}

  return (
    <div style={{marginTop: 10}}>
      <h3>Create New Todo</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group"> 
          <label>Description: </label>
          <input  
            type="text"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Responsible: </label>
          <input 
            type="text" 
            className="form-control"
          />
        </div>
        <div className="form-group">
          <div className="form-check form-check-inline">
            <input  
              className="form-check-input" 
              type="radio" 
              name="priorityOptions" 
              id="priorityLow" 
              value="Low"
              checked
            />
            <label className="form-check-label">Low</label>
          </div>
          <div className="form-check form-check-inline">
            <input  
              className="form-check-input" 
              type="radio" 
              name="priorityOptions" 
              id="priorityMedium" 
              value="Medium" 
            />
            <label className="form-check-label">Medium</label>
          </div>
          <div className="form-check form-check-inline">
            <input  
              className="form-check-input" 
              type="radio" 
              name="priorityOptions" 
              id="priorityHigh" 
              value="High" 
            />
            <label className="form-check-label">High</label>
          </div>
        </div>
        <div className="form-group">
          <input type="submit" value="Create Todo" className="btn btn-primary" />
        </div>
      </form>
  </div>
  )
}

export default CreateTodo;
