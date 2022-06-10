const generateID = (array) => {
  if (array.length === 0) return 1;
  return array[array.length - 1].id + 1;
};

export default class TodoList {
  constructor(todoList = []) {
    this.todoList = todoList;
  }

  addItem = (text) => {
    const item = {
      text,
      id: generateID(this.todoList),
      createdAt: new Date(),
    };
    this.todoList.push(item);
  };

  update = (id, text) => {
    const itemToUpdate = this.todoList.find((todo) => todo.id === id);
    itemToUpdate.text = text;
  };

  done = () => {
    return this.todoList.shift();
  };

  next = () => {
    return this.todoList[0];
  };

  list = () => {
    return this.todoList;
  };

  find = (term) => {
    const searchItems = this.todoList.filter((todo) =>
      todo.text.toLowerCase().includes(term.toLowerCase())
    );
    return searchItems;
  };
}
