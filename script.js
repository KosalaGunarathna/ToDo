const contents = document.getElementById("content");
const UP_submit = document.getElementById('UP-submit');
const update = document.getElementById("update");
const backdrop = document.getElementById("backdrop");

const form = document.getElementById("form");
const update_form = document.getElementById("update_form");
const Tname = document.getElementById("name");
const Tdate = document.getElementById("date");
const Ttime = document.getElementById("time");
const up_name = document.getElementById("Update_name");
const Update_date = document.getElementById("Update_date");
const Update_time = document.getElementById("Update_time");



var todos = JSON.parse(localStorage.getItem('todos')) || [
    {id: 1, title: "Task 1", date: "2023-09-06", time: "18:00"},
    {id: 2, title: "Task 2", date: "2023-09-08", time: "21:30"},
    {id: 3, title: "Task 3", date: "2023-10-06", time: "18:15"}];
let updateID;

function deleteItem(id) {
    todos = todos.filter((item) => item.id != id);
    renderlist();
    save(); 
};


function UpdateItem(id) {
    update.classList.remove("hiddn");
    backdrop.classList.remove("hiddn");
    let UpdateItem = todos.find((item) => (item.id == id));
        console.log(UpdateItem);
        up_name.value = UpdateItem.title;
        Update_time.value = UpdateItem.time;
        Update_date.value = UpdateItem.date;
    
    updateID=id;
    renderlist();
};


update_form.addEventListener("submit", (event) => {

    event.preventDefault();
    todos = todos.map((item) => {
          if (item.id == updateID) {
               item.title = up_name.value;
               item.date = Update_date.value;
               item.time = Update_time.value;

          }
      return item;
    });
    renderlist();
     save();
     up_name.value = "";
     Update_time.value = "";
     Update_date.value = "";
    
     update.classList.add("hiddn");
     backdrop.classList.add("hiddn");

 });


renderlist();
function renderlist() {
    const listItems = todos.map((item) => `
    <div class="taskbox">
        <div class="TTname">
        <div class="Tname"><p>${item.title}</p></div>
        </div>
        <div class="TTdt">
        <div class="Tdate " ><p>${item.date}</p></div>
        <div class="ttime " ><p>${item.time}</p></div>
        </div>
        <button class="edit Tbtn" onClick="UpdateItem(${item.id})">Edit</button>
        <button class="delete Tbtn" onClick=deleteItem(${item.id})>Delete</button>
        </div>
    </div>`);
 
    let alltodos = listItems.reduce((totle, curr) => totle + curr, "");
    contents.innerHTML = alltodos;
}


function save() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function changeID(todos){
    for (var i = 0; i < todos.length; i++) {
    todos[i].id = i + 1;
    }
};
form.addEventListener("submit", (event) => {
    event.preventDefault();

    let NewTodo = {
        id: todos.length+1,
        title: Tname.value,
        date: Tdate.value,
        time: Ttime.value,
        
    };
    todos.push(NewTodo);
    changeID(todos);
    save();
    renderlist();

    Tname.value = "";
    Tdate.value = "";
    Ttime.value = "";
    

});

backdrop.addEventListener("click", () => {
    update.classList.add("hiddn");
    backdrop.classList.add("hiddn");

});

