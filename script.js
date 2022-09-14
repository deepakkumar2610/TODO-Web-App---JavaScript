let form = document.getElementById("form");
let titleInput = document.getElementById("titleInput");
let dateInput = document.getElementById("dateInput");
let desInput = document.getElementById("desInput");
let errMsg = document.getElementById("errMsg");
let addTask = document.getElementById("addTask");
let taskList = document.getElementById("list");


console.log();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
  acceptData();

  });

  let formValidation = () =>{
    if ((titleInput.value === "") || (dateInput.value === "") ) {
      console.log("failure");
      errMsg.innerHTML = "Please make sure Title and Duedate is filled!";
    } else {
      console.log("success");
      errMsg.innerHTML = "";
    }
  }

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const d = new Date();

let date = d.getDate();
let month = months[d.getMonth()];
let year = d.getFullYear();
let hwDate =  (year +"-"+ month +"-"+ date);

  let data = [];

  let acceptData = () => {
  data.push({
    hwDate: hwDate,
    Title: titleInput.value,
    dueDate: dateInput.value,
    description: desInput.value,
  });

  addTask.setAttribute("data-bs-dismiss", "modal");
  addTask.click();

  (() => {
    addTask.setAttribute("data-bs-dismiss", "");
  })();

  localStorage.setItem("data", JSON.stringify(data));
  createTasks();
  console.log(data);
};

// let elementId = () =>{
//   selectId = taskList.parentElement.parentElement.id;
//   console.log(selectId);
  
// };  

let createTasks = () => {
  list.innerHTML = "";
  data.map((x) => {
    return (list.innerHTML += 
      `<div class="listBanner">
          
          
          <div class="text-center fw-bold hwDate">${x.hwDate}</div>
          <div class="taskTitle">${x.Title}</div>
          <div class="taskDueDate">${x.dueDate}</div>
          <div class="taskDesc">${x.description}</div>
          <div class="text-center">
            <i class="fas fa-edit"  onClick="editTask(this);" data-bs-toggle="modal" data-bs-target="#form"></i>
            <i class="fas fa-trash" onClick="deleteTask(this); createTasks();"></i>
          </div>
        </div>`)
  });

  resetForm();
};

let resetForm = () => {
  titleInput.value = "";
  dateInput.value = "";
  desInput.value = "";
};

// let counter = () => {
//   var count = 0;
//   count += 1;
//   console.log(count);
// };

let deleteTask = (e) => {
  e.parentElement.parentElement.remove();

  data.splice(e.parentElement.parentElement.id, 1);

  localStorage.setItem("data", JSON.stringify(data));

};



let editTask = (e) => {
  let selectedTask = e.parentElement.parentElement;
  console.log(selectedTask.children);
  titleInput.value = selectedTask.children[2].innerHTML;
  dateInput.value = selectedTask.children[3].innerHTML;
  desInput.value = selectedTask.children[4].innerHTML;

  console.log("its working");
  deleteTask(e);
};

(() => {
  data = JSON.parse(localStorage.getItem("data")) || [];
  console.log(data);
  createTasks();
})();

 