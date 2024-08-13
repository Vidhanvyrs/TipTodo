//function for displaying logo
function displayGreeting() {
  console.log(chalk.cyan(figlet.textSync("TipTodo!", { font: "Slant" })));
  console.log(chalk.yellow("Welcome to TipTodo - Your CLI Todo App"));
  console.log(chalk.yellow("HAPPY HACKING!"));
}
displayGreeting();
