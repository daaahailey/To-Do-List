const appContainer = document.querySelector(".todo_app_container"),
  userForm = appContainer.querySelector(".userForm"),
  userName = userForm.querySelector(".userName"), 
  greetingCon = appContainer.querySelector(".greeting_container"),
  greetingMsg = greetingCon.querySelector(".greeting"),
  deleteNameBtn = greetingCon.querySelector(".deleteNameBtn");


const USER_LS = "currentUser";
const SHOWING = "showing"; // classList showing (display none if it's not showing)


// I added refreshPage function -
// because if I refresh the page when there is saved(current) user name and then delete current user name,
// I cannot add new user name at first try, it's submitted at the second time.
// but if I reload the page after deleting, I can add new user name right away.

function refreshPage() {
  window.location.reload();
} 

function saveName(text) {
  localStorage.setItem(USER_LS, text);
};

function deleteNameHandler() {
  greetingMsg.classList.remove(SHOWING);
  deleteNameBtn.classList.remove(SHOWING);
  localStorage.removeItem(USER_LS);
  userForm.classList.add(SHOWING);
  userName.value = "";
};

//get user name (input value)
function handleSubmitName(event) {
  event.preventDefault();
  const currentValue = userName.value;
  greetingMessage(currentValue);
  saveName(currentValue);
};

function askUserName() {
  userForm.classList.add(SHOWING); 
  userForm.addEventListener("submit", handleSubmitName); 
};

function greetingMessage(text) {
  userForm.classList.remove(SHOWING); 
  greetingMsg.classList.add(SHOWING);
  greetingMsg.innerText = `Hello, ${text}!`; 
    
  deleteNameBtn.classList.add(SHOWING);
  deleteNameBtn.innerText = `I'm not ${text}`;  
  deleteNameBtn.addEventListener("click", deleteNameHandler);
  deleteNameBtn.addEventListener("click", refreshPage);  // when you delete the user name, it reloads the page
};

function loadGreeting() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    askUserName(); 
  } else {
    greetingMessage(currentUser); 
  }
};

function init() {
  loadGreeting();
};

init();




