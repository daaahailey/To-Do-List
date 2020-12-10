const toDoContainer = document.querySelector(".to_do_container"),
  toDoForm = toDoContainer.querySelector(".to_do_form"),
  toDoInput = toDoForm.querySelector(".to_do_input"),
  toDosUl = toDoContainer.querySelector(".to_do_list"),
  toDosDone = toDoContainer.querySelector(".to_do_done"),
  doneBtn = toDoContainer.querySelector(".doneBtn");


const TODO_LS = "toDos",
  DONE_LS = "done";

let toDos = [],
  done = [],
  listIdNumber = 0;


function deleteFromDone(event) {
  const delBtn = event.target;
  const li = delBtn.parentNode;
  toDosDone.removeChild(li);
  const cleanDone = done.filter(function (done) {
    return done.id !== parseInt(li.id);
  });
  done = cleanDone;
  saveDone();
};


function deleteToDo(event) {
  const delBtn = event.target;
  const li = delBtn.parentNode;
  toDosUl.removeChild(li);
  const cleanToDo = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id); 
  });
  toDos = cleanToDo; 
  saveToDos(); 
};


function saveToDos() {
  localStorage.setItem(TODO_LS, JSON.stringify(toDos));
};

function saveDone() {
  localStorage.setItem(DONE_LS, JSON.stringify(done));
}


function doneToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const span = li.firstChild;
  deleteToDo(event);
  createDoneToDo(span.innerText);
};


function backToTodo (event) {
  const btn = event.target;
  const li = btn.parentNode;
  const span = li.firstChild
  deleteFromDone(event);
  createToDo(span.innerText);
};


function createToDo(text) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const delBtn = document.createElement("button");
  const doneBtn = document.createElement("button");
  span.innerText = text;
  delBtn.innerText = "DELETE";
  delBtn.addEventListener("click", deleteToDo);
  doneBtn.innerText = "DONE";
  doneBtn.addEventListener("click", doneToDo);
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(doneBtn);
  listIdNumber += 1;
  li.id = listIdNumber;
  toDosUl.appendChild(li);
  const toDoObj = {
    text: text,
    id: listIdNumber
  };
  toDos.push(toDoObj); 
  saveToDos();
};


function createDoneToDo(text) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const delBtn = document.createElement("button");
  const moveBackBtn = document.createElement("button");
  span.innerText = text;
  delBtn.innerText = "DELETE";
  delBtn.addEventListener("click", deleteFromDone);
  moveBackBtn.innerText = "⬆️";
  moveBackBtn.addEventListener("click", backToTodo);
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(moveBackBtn);
  listIdNumber += 1;
  li.id = listIdNumber;
  toDosDone.appendChild(li);
  const doneObj = {
    text: text,
    id: listIdNumber
  };
  done.push(doneObj);
  saveDone();
};


function handleSubmitToDo(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  createToDo(currentValue);
  toDoInput.value = "";
};


function loadToDo() {
  const loadedToDo = localStorage.getItem(TODO_LS);
  const loadedDone = localStorage.getItem(DONE_LS);
  if (loadedToDo !== null) {
    const parsedToDo = JSON.parse(loadedToDo);
    parsedToDo.forEach(function (todo) {
      createToDo(todo.text); 
    });
  } if (loadedDone !== null) {
    const parsedDone = JSON.parse(loadedDone);
    parsedDone.forEach(function (toDoDone) {
      createDoneToDo(toDoDone.text);
    });
  }
};


function init() {
  loadToDo();
  toDoForm.addEventListener("submit", handleSubmitToDo);
};


init();
