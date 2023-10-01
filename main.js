// Function to fetch all Todos
function getAllTodos() {
  $.ajax({
    url: 'http://127.0.0.1:8000/api/todo/', // Replace with your API endpoint URL
    method: 'GET',
    success: function(data) {
      // Handle the response data here
      console.log('All Todos:', data);
      // Display the data in the table
      displayTodos(data);
    },
    error: function(error) {
      // Handle any errors here
      console.error('Error:', error);
    }
  });
}

// Function to create a new Todo
function createTodo(data) {
  $.ajax({
    url: 'http://127.0.0.1:8000/api/todo/', // Replace with your API endpoint URL
    method: 'POST',
    data: data,
    success: function(response) {
      // Handle the created Todo here
      console.log('Created Todo:', response);
      // Refresh the list of Todos after creating a new one
      getAllTodos();
    },
    error: function(error) {
      // Handle any errors here
      console.error('Error:', error.responseJSON); // Log the specific error response
      // Display validation errors if available
      if (error.responseJSON && error.responseJSON.errors) {
        const validationErrors = error.responseJSON.errors;
        alert('Validation Errors: ' + JSON.stringify(validationErrors));
      }
    }
  });
}

// Function to display Todos in the table
function displayTodos(todos) {
  const todoList = document.getElementById('todoList');
  todoList.innerHTML = '';
  todos.forEach(todo => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${todo.id}</td>
      <td>${todo.todo_name}</td>
      <td>${todo.todo_description}</td>
      <td>
        <button onclick="updateTodoById(${todo.id})">Update</button>
        <button onclick="deleteTodoById(${todo.id})">Delete</button>
      </td>
    `;
    todoList.appendChild(row);
  });
}

// Function to delete a Todo by ID
function deleteTodoById(id) {
  $.ajax({
    url: `http://127.0.0.1:8000/api/todo/${id}/`,
    method: 'DELETE',
    success: function() {
      // Handle the successful deletion here
      console.log('Todo deleted successfully.');
      // Refresh the list of Todos after deletion
      getAllTodos();
    },
    error: function(error) {
      // Handle any errors here
      console.error('Error:', error);
    }
  });
}


// Function to update a Todo by ID
// Function to edit a Todo by ID
function editTodoById(id) {
  // Fetch the Todo item by ID from the server
  $.ajax({
    url: `http://127.0.0.1:8000/api/todo/${id}/`,
    method: 'GET',
    success: function(todo) {
      // Handle the response here
      console.log('Editing Todo:', todo);

      // You can display the Todo in a form or a modal for editing
      // For simplicity, let's assume you have an edit form with fields for todo_name and todo_description
      $('#editTodoForm').show();
      $('#editTodoForm #todo_name').val(todo.todo_name);
      $('#editTodoForm #todo_description').val(todo.todo_description);

      // Handle form submission for editing
      $('#editTodoForm').submit(function(event) {
        event.preventDefault();
        const updatedTodoData = {
          todo_name: $('#editTodoForm #todo_name').val(),
          todo_description: $('#editTodoForm #todo_description').val(),
        };
        
        // Send an AJAX PUT request to update the Todo
        $.ajax({
          url: `http://127.0.0.1:8000/api/todo/${id}/`,
          method: 'PUT',
          data: updatedTodoData,
          success: function(response) {
            // Handle the successful update here
            console.log('Todo updated successfully.');
            $('#editTodoForm').hide();
            // Refresh the list of Todos after editing
            getAllTodos();
          },
          error: function(error) {
            // Handle any errors here
            console.error('Error:', error.responseJSON); // Log the specific error response
          }
        });
      });
    },
    error: function(error) {
      // Handle any errors here
      console.error('Error:', error);
    }
  });
}


// Function to delete a Todo by ID
function deleteTodoById(id) {
  $.ajax({
    url: `http://127.0.0.1:8000/api/todo/${id}/`, // Replace with your API endpoint URL
    method: 'DELETE',
    success: function() {
      // Handle the successful deletion here
      console.log('Todo deleted successfully.');
      // Refresh the list of Todos after deletion
      getAllTodos();
    },
    error: function(error) {
      // Handle any errors here
      console.error('Error:', error);
    }
  });
}

// Example: Fetch all Todos when the page loads
$(document).ready(function() {
  getAllTodos();
});

// Handle form submission to create a new Todo
$('#createTodoForm').submit(function(event) {
  event.preventDefault();
  const todo_name = $('#todo_name').val();
  const todo_description = $('#todo_description').val();
  createTodo({ todo_name, todo_description });
});
