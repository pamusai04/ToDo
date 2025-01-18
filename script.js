let bg_color = document.querySelector(".circle1");
let body_color = document.querySelector(".color-container");

bg_color.addEventListener("click", () => {
    // Toggle between justify-content classes
    if (body_color.classList.contains("color-container-justify2")) {
        body_color.classList.remove("color-container-justify2");
        body_color.classList.add("color-container-justify1");

        bg_color.classList.remove('circle2');
        bg_color.classList.add('circle1');

        document.querySelector('.light2').style.display = 'none';
        document.querySelector('.light1').style.display = 'block';
        
        document.querySelector('body').style.backgroundColor = '#fff';
        // document.querySelector('todo-inputs').style.backgroundColor = '#fff';
        document.querySelector('.todo-inputs').style.backgroundColor = '#040d1c';
        document.querySelector('.todo-inputs').style.color = '#fff';

        document.querySelector('header').style.color = '#040d1c';
        document.querySelector('h1').style.color= '#040d1c';
        
    } else {
        body_color.classList.remove("color-container-justify1");
        body_color.classList.add("color-container-justify2");
       
        bg_color.classList.remove('circle1');
        bg_color.classList.add('circle2');
        document.querySelector('.light1').style.display = 'none';
        document.querySelector('.light2').style.display = 'block';

        document.querySelector('body').style.backgroundColor = '#040d1c';
       document.querySelector('.todo-inputs').style.backgroundColor = '#fff';

        document.querySelector('h1').style.color = '#fff';
        

    }

    
});

// Initialize data from localStorage
let toDoList = JSON.parse(localStorage.getItem('totoList_data')) || [
    { title: "Wishes", description: "Good morning...", date: `${new Date().toDateString()}` },
    { title: "Wishes", description: "Good evening.", date: `${new Date().toDateString()}` },
];

// Display tasks on page load
toDoDisplay();

function toDoAdd() {
    let titleElement = document.querySelector("#todo-title");
    let taskElement = document.querySelector("#todo-task");

    let titleValue = titleElement.value;
    let taskValue = taskElement.value;

    if (titleValue && taskValue) {
        toDoList.push({ title: titleValue, description: taskValue, date: new Date().toDateString() });
        titleElement.value = "";
        taskElement.value = "";
        toDoDisplay();
    }
}

function toDoDisplay() {
    let containerElement = document.querySelector("#todo-outputs");
    let newHtml = "";

    for (let i = toDoList.length - 1; i >= 0; i--) {
        newHtml += `
            <div class="todo-task-container">
                <div class="to-do-head">
                    <p class="one">${toDoList[i].title}</p>
                    <div class="icons-output">
                        <i class="fa-solid fa-pen-to-square edit1" onclick="editTask(${i})"></i>
                        <i class="fa-solid fa-trash remove1" onclick="deleteTask(${i})"></i>
                    </div>
                    <p>${toDoList[i].date}</p>
                </div>
                <hr>
                <div class="to-do-main">
                    <p>${toDoList[i].description}</p>
                </div>
            </div>`;
    }

    containerElement.innerHTML = newHtml;
    // Save the updated list to localStorage
    localStorage.setItem('totoList_data', JSON.stringify(toDoList));
}


document.querySelector("#todo-add").addEventListener("click", () => {
    toDoAdd();
});

function deleteTask(index) {
    if (confirm("Are you sure you want to delete this task?")) {
        toDoList.splice(index, 1);
        toDoDisplay();
    }
}

function editTask(index) {
    if (confirm("Are you sure you want to edit this task?")) {
        let value = prompt("Write your updated task description:");
        if (value) {
            toDoList[index].description = value;
            toDoDisplay();
        }
    }
}
