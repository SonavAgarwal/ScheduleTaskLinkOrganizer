var taskListId;
var listOfTasks;

document.getElementById("taskInput").addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        if (this.value == "") return;
        addTask(this.value);
        this.value = "";
    }
});

function addTaskButton() {
    if (document.getElementById("taskInput").value == "") return;
    addTask(document.getElementById("taskInput").value);
    document.getElementById("taskInput").value = "";    
}

function addTask(text) {
    gapi.client.tasks.tasks.insert({
        "tasklist": taskListId,
        "title": selectedClass + text,
    }).then(function(resp){
        createTask(resp.result);
    }).catch(function(err) {
        console.log(err)
    });
}

function createTask(task) {
    var container = document.getElementById('tasksDiv');
    var taskDiv = document.createElement("div");
    taskDiv.classList.add("task");

    var checkbox = document.createElement("div");
    checkbox.classList.add("checkboxImage");
    checkbox.id = task.id;
    checkbox.addEventListener("click", completeTask, false);

    var taskText = document.createElement("h3");
    taskText.classList.add("taskText");
    taskText.innerHTML = task.title.slice(1);

    taskDiv.appendChild(checkbox);
    taskDiv.appendChild(taskText);
    container.insertBefore(taskDiv, container.firstChild);
  }

function renderTasks() {

    document.getElementById("tasksDiv").innerHTML = "";

    for (var j = 0; j < listOfTasks.length; j++) {
        var task = listOfTasks[j];
        if (task.title.charAt(0) == selectedClass)
            createTask(task);
    }
}

function getTasks() {
    //getting tasks from "my tasks" list
    gapi.client.tasks.tasks.list({
        'maxResults': 100,
        "tasklist": taskListId
    }).then(function(resp){
        if (resp.result.items != undefined) {
            
            listOfTasks = resp.result.items;
            renderTasks();
        }
    }).catch(function(err) {
        console.log(err)
    });
}

function getTaskList() {
    gapi.client.tasks.tasklists.list({
        'maxResults': 100
    }).then(function(response) {
      var taskLists = response.result.items;
      if (taskLists && taskLists.length > 0) {
        for (var i = 0; i < taskLists.length; i++) {
          var taskList = taskLists[i];
          if (taskList.title == "My Tasks") {
              taskListId = taskList.id;
              getTasks();
            return;
          }
        }
      }
    }).catch(function(reason) {
        console.log(reason.result);
    });
}

function completeTask(e) {
    document.getElementById(this.id).parentElement.style.height = "0";
    setTimeout(function(toHide) {
        document.getElementById(toHide).parentElement.style.display = "none";
    }, 500, this.id);

    gapi.client.tasks.tasks.delete({
        "tasklist": taskListId,
        "task": this.id
    }).then(function(resp){
        

    }).catch(function(err) {
        console.log(err)
    });
}