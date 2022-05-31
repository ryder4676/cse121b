let toDoList = [];

let draggableTodo = null;
let todotask = document.querySelectorAll(".todo");
let dropzones = document.querySelectorAll(".dropzone");
let ol = document.createElement("ol");



const output = (toDos) => {
    toDos.forEach((todo) => {
        toDos.length = 12;
        let title = document.createElement("li");
        title.textContent = todo.title;

        ol.appendChild(title);
        document.querySelector(".todo").appendChild(ol);

        let items = document.querySelectorAll("li");
        items.forEach((item) => {
            item.draggable = true;
        });
    });
};

const url = "https://jsonplaceholder.typicode.com/todos";
let results = null;

async function getToDoList() {
    const response = await fetch(url);

    // the API will send us JSON...but we have to convert the response before we can use it
    // .json() also returns a promise...so we await it as well.
    toDoList = await response.json();
    output(toDoList);

};
getToDoList();


let startDrag = (event) => {
    console.log("dragging started", event.target.innerHTML);
    event.dataTransfer.effectAllowed = "move"; //The move operation is used to indicate that the data being dragged will be moved
    event.dataTransfer.setData("text/html", event.target.innerHTML); //The DataTransfer.effectAllowed property specifies the effect that is allowed for a drag operation
    draggableTodo = event.target;
};

let stopDrag = (event) => {
    event.preventDefault(); // preventDefault() method of the Event interface tells the user agent that if the event does not get explicitly handled, its default action should not be taken as it normally would be
    draggableTodo = null;// if you want to allow a drop, you must prevent the default handling by cancelling both the dragenter and dragover events. You can do this either by returning false from attribute-defined event listeners, or by calling the event's preventDefault() method.
};

let dragInto = (event) => {
    event.preventDefault();
    event.target.classList.add("-dropzone");
    console.log("dragInto");
};

let dragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
    //console.log("dragOver");
};

let dragOut = (event) => {
    event.preventDefault();
    console.log("dragOut");
    event.target.classList.remove("-dropzone");
};

let drop = (event) => {
    event.preventDefault();
    event.stopPropagation(); //stopPropagation() method of the Event interface prevents further propagation of the current event in the capturing and bubbling phases.
    event.target.classList.remove("-dropzone");
    draggableTodo.innerHTML = event.target.innerHTML;
    event.target.innerHTML = event.dataTransfer.getData("text/html");

};

Array.prototype.forEach.call(dropzones, (dropzone => { // The forEach() method executes a provided function once for each array element.
    dropzone.addEventListener("dragenter", dragInto);
    dropzone.addEventListener("dragover", dragOver);
    dropzone.addEventListener("dragleave", dragOut);
    dropzone.addEventListener("drop", drop);
}));

Array.prototype.forEach.call(todotask, (item => {
    item.addEventListener("dragstart", startDrag);
    item.addEventListener("dragend", stopDrag);
}));