//we are going to store our todos in json file as it will be easier for us to retrieve that data
const fs = require("fs");
const createTodo = (title, todo) => {
  try {
    //check if json file exists
    fs.access("todos.json", (err) => {
      //if it does not exist create a new json file
      if (err) {
        fs.writeFileSync("todos.json", JSON.stringify([]));
      }
      //read from todos.json if it exists
      const todoBuffer = fs.readFileSync("todos.json");
      //convert it to string
      let dataJSON = todoBuffer.toString();
      //parse the data
      const todos = JSON.parse(dataJSON);
      //check if the todo title exists
      const duplicateTodo = todos.find((todo) => {
        return todo.title === title;
      });

      if (!duplicateTodo) {
        todos.push({
          title: title,
          todo: todo,
          completed: false,
        });
        dataJSON = JSON.stringify(todos);
        fs.writeFileSync("todos.json", dataJSON);
        console.log("New Todo Added");
      } else {
        console.log("New Todo title has already been used");
      }
    });
  } catch (error) {
    console.log("An error occured, try again");
  }
};

//now we are going to add a function for listing our todos
const listTodo = () => {
  try {
    //read from the todos.json if it exists
    const todoBuffer = fs.readFileSync("todos.json");
    //convert it to string
    let dataJSON = todoBuffer.toString();
    //parse the data
    const todos = JSON.parse(dataJSON);

    console.log(todos);
  } catch (error) {
    console.log("An error occured");
  }
};

//function to display a specific todo
const getOneTodo = (title) => {
  try {
    //read from the todos.json if it exists
    const todoBuffer = fs.readFileSync("todos.json");
    //convert it to string
    let dataJSON = todoBuffer.toString();
    //parse the data
    const todos = JSON.parse(dataJSON);

    const Todo = todos.find((item) => {
      return item.title === title;
    });

    console.log(Todo);
  } catch (error) {
    console.log("An error occured");
  }
};

//function to delete a todo
const deleteTodo = (title) => {
  try {
    //read from the todos.json if it exists
    const todoBuffer = fs.readFileSync("todos.json");
    //convert it to string
    let dataJSON = todoBuffer.toString();
    //parse the data
    const todos = JSON.parse(dataJSON);

    const remain = todos.filter((item) => {
      return item.title != title;
    });
    dataJSON = JSON.stringify(remain);

    fs.writeFileSync("todos.json", dataJSON);

    if (remain.length === todos.length) {
      console.log("This file does not exists");
    } else {
      console.log("Todo was deleted successfully");
    }
  } catch (error) {
    console.log("An error just occured");
  }
};

//updating a todo
const updateTodo = (title, newTodo) => {
  try {
    const todoBuffer = fs.readFileSync("todos.json");
    let dataJSON = todoBuffer.toString();
    const todos = JSON.parse(dataJSON);

    const todoIndex = todos.findIndex((item) => item.title === title);
    if (todoIndex !== -1) {
      todos[todoIndex].todo = newTodo;
      fs.writeFileSync("todos.json", JSON.stringify(todos));
      console.log("Todo updated successfully");
    } else {
      console.log("Todo not found");
    }
  } catch (error) {
    console.log("An error occured while updating the todo");
  }
};

//marking todo as completed
const completeTodo = (title) => {
  try {
    const todoBuffer = fs.readFileSync("todos.json");
    let dataJSON = todoBuffer.toString();
    const todos = JSON.parse(dataJSON);

    const todoIndex = todos.findIndex((item) => item.title === title);

    if (todoIndex !== -1) {
      todos[todoIndex].completed = true;
      fs.writeFileSync("todos.json", JSON.stringify(todos));
      console.log("Todo marked as completed");
    } else {
      console.log("Todo not found");
    }
  } catch (error) {
    console.log("An error occured while marking the todo as completed");
  }
};

// Function to list completed todos
const listCompletedTodos = () => {
  try {
    const todoBuffer = fs.readFileSync("todos.json");
    let dataJSON = todoBuffer.toString();
    const todos = JSON.parse(dataJSON);

    const completedTodos = todos.filter((todo) => todo.completed);

    if (completedTodos.length > 0) {
      console.log("Completed Todos:");
      completedTodos.forEach((todo) => {
        console.log(`- ${todo.title}: ${todo.todo}`);
      });
    } else {
      console.log("No completed todos found");
    }
  } catch (error) {
    console.log("An error occurred while listing completed todos");
  }
};

module.exports = {
  createTodo,
  listTodo,
  getOneTodo,
  deleteTodo,
  updateTodo,
  completeTodo,
  listCompletedTodos,
};
