import yargs from "yargs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import TodoList from "./TodoList.js";
import { saveFile, readFile } from "./utils.js";
import { ADD, DONE, FIND, LIST, NEXT, UPDATE } from "./commands.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const fileName = "../data.json";
const filePath = path.resolve(__dirname, fileName);

const argv = yargs(process.argv.slice(2)).argv;

const init = () => {
  const data = readFile(filePath);
  const todo = new TodoList(data);
  const { _: base } = argv;

  switch (base[0]) {
    case ADD:
      todo.addItem(argv.text);
      console.log("Todo Added");
      saveFile(todo.todoList, filePath);

      break;
    case UPDATE: {
      todo.update(argv.id, argv.text);
      console.log("Todo Updated!");
      saveFile(todo.todoList, filePath);
      break;
    }

    case NEXT: {
      const item = todo.next();
      console.log(`${item.id} - ${item.text} (${item.created})`);
      break;
    }
    case DONE: {
      todo.done();
      console.log(`One item completed!`);
      saveFile(todo.todoList, filePath);
      break;
    }
    case FIND: {
      const items = todo.todoList.find(argv.term);
      if (items.length === 0) {
        console.log(`No matching items found!`);
        break;
      }
      for (let item of items) {
        console.log(`${item.id} - ${item.text} (${item.createdAt})`);
      }
      break;
    }

    case LIST: {
      if (todo.todoList.length === 0) {
        console.log(`No items found!`);
        break;
      }
      for (let item of todo.todoList) {
        console.log(`${item.id} - ${item.text} (${item.createdAt})`);
      }
      break;
    }

    default:
      throw new Error("Command not Found!");
  }
};

init();
