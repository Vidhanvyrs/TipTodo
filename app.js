// console.log(process.argv); //using process.argv we can read the CLI
//although we are not going to process.argv instead a package that is leveraging its functionality

//we gonna use Yargs
const yargs = require("yargs");
//we gonna import our utils
const utils = require("./utils");
//for displaying of logo
const figlet = require("figlet");
const chalk = require("chalk");

//command for display greetings
yargs.command({
  command: "greet",
  describe: "Display the TipTodo greeting",
  handler: function () {
    require("./displayGreeting.js");
  },
});
//adding todo
yargs.command({
  //The command property is the argument that triggers the handler function.
  command: "add",
  describe: "Add a new todo", //describe explains what our command is trying to do
  builder: {
    //helps us to describe our other properties
    title: {
      describe: "Todo title",
      type: "string",
      demandOption: true,
    },
    todo: {
      describe: "Todo Body",
      type: "string",
      demandOption: true,
    },
  },
  handler: function (argv) {
    //this is the function we want to run
    // console.log(argv);
    utils.createTodo(argv.title, argv.todo);
    //the new todo added command: node app.js add --title="code" --todo="code by evening"
  },
});

//updating todo
yargs.command({
  command: "update",
  describe: "Update an existing todo",
  builder: {
    title: {
      describe: "Todo title to update",
      type: "string",
      demandOption: true,
    },
    newTodo: {
      describe: "New todo content",
      type: "string",
      demandOption: true,
    },
  },
  handler: function (argv) {
    utils.updateTodo(argv.title, argv.newTodo);
    //run command: node app.js update --title="code" --newTodo="code by midnight"
  },
});

//mark todo as complete
yargs.command({
  command: "complete",
  describe: "Mark a todo as complete",
  builder: {
    title: {
      describe: "Todo title to mark as complete",
      type: "string",
      demandOption: true,
    },
  },
  handler: function (argv) {
    utils.completeTodo(argv.title);
    //run command: node app.js complete --title="code"
  },
});

//yargs for getting all todos
yargs.command({
  command: "list",
  describe: "Get all Todos",
  handler: function () {
    utils.listTodo();
    //run command: node app.js list
  },
});

//yargs to get one todo
yargs.command({
  command: "read",
  describe: "get a specific todo with the title",
  builder: {
    title: {
      describe: "Todo title",
      type: "string",
      demandOption: true,
    },
  },
  handler: function (argv) {
    utils.getOneTodo(argv.title);
    //run command: node app.js read --title="code"
  },
});

//list completed todo
yargs.command({
  command: "listCompleted",
  describe: "List all completed todos",
  handler: function () {
    utils.listCompletedTodos();
    //run command: node app.js listCompleted
  },
});

//yargs to delete todo
yargs.command({
  command: "delete",
  describe: "Remove a specific todo with the title",
  builder: {
    title: {
      descirbe: "Todo title",
      type: "string",
      demandOption: true,
    },
  },
  handler: function (argv) {
    utils.deleteTodo(argv.title);
    //run command: node app.js delete --title="code"
  },
});

yargs.parse();

//run npm i yargs
//to run our application use node app.js add --title="coding" --todo="code a new app"
