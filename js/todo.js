import * as lib from "./library.js";

// get data from local storage
let todos = localStorage.getItem("todos") === null ? {} : JSON.parse(localStorage.getItem("todos"));

let checkedTodo = localStorage.getItem("checks") === null ? [] : localStorage.getItem("checks").split(",");

const todoList = document.querySelector(".todo-list");

// todo element key
let cnt = Object.keys(todos).length;

// event when submit
document.querySelector(".todo-insert__form").addEventListener("submit", (e) => {
  e.preventDefault();
  addTodo();
});

// let todoInput = document.querySelector(".todo-insert__input");
// todoInput.addEventListener("change", todo.addTodo);

/**
 * add todo element to todo-list
 */
const addTodo = () => {
  const todoContent = document.querySelector(".todo-insert__input").value;
  if (todoContent != "") {
    document.querySelector(".todo-insert__input").value = null;
    todos[cnt] = todoContent;
    cnt++;
    localStorage.setItem("todos", JSON.stringify(todos));
    drawTodos();
  }
};

/**
 * update local storage : checkedTodo
 */
const setChecks = () => {
  localStorage.setItem("checks", checkedTodo);
  drawTodos();
};

/**
 * delete Todo element
 */
const deleteTodo = (item) => {
  const target = item.querySelector("span").innerText;
  const key = lib.getKeyByValue(todos, target);
  delete todos[key];
  localStorage.setItem("todos", JSON.stringify(todos));
  if (checkedTodo.indexOf(target) !== -1) checkedTodo.splice(checkedTodo.indexOf(target), 1);
  localStorage.setItem("checks", checkedTodo);
  drawTodos();
};

/**
 * add attribute to element
 */
const addAttributeToTodo = (e, checkBox, label) => {
  checkBox.setAttribute("type", "checkbox");
  checkBox.setAttribute("id", lib.getKeyByValue(todos, e));
  checkBox.setAttribute("class", "check-box");
  label.setAttribute("for", lib.getKeyByValue(todos, e));
};

/**
 * add event listener to element
 */
const addEventListenerToTodo = (e, item, button, checkBox) => {
  button.addEventListener("click", () => {
    deleteTodo(item);
  });

  if (checkedTodo.indexOf(e) !== -1) {
    item.classList.add("checked");
  }

  checkBox.addEventListener("change", () => {
    if (!item.classList.contains("checked")) checkedTodo.push(e);
    else checkedTodo.splice(checkedTodo.indexOf(e), 1);
    setChecks();
  });
};

/**
 * add inner content to element
 */
const addContentToTodo = (e, button, content) => {
  button.innerHTML = "X";
  content.innerText = e;
};

/**
 * make todo element frame
 */
const createTodoElement = (e) => {
  const item = document.createElement("li");
  const content = document.createElement("span");
  const button = document.createElement("button");
  const checkBox = document.createElement("input");
  const label = document.createElement("label");

  addAttributeToTodo(e, checkBox, label);
  addEventListenerToTodo(e, item, button, checkBox);
  addContentToTodo(e, button, content);

  item.append(checkBox, label, content, button);
  todoList.appendChild(item);
};

const deleteCurrentTodo = () => {
  while (todoList.children.length > 0) {
    todoList.removeChild(todoList.lastChild);
  }
};

/**
 * draw Todo List
 */
const drawTodos = () => {
  deleteCurrentTodo();

  Object.values(todos).forEach((e) => {
    createTodoElement(e);
  });
};

export { drawTodos };
