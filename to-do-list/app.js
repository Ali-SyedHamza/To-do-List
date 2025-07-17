var tasks = [];
var nextId = 1;
var editingId = 0;

function addItem() {
  var input = document.getElementById("myInput");
  var text = input.value.trim();
  if (text === "") {
    input.value = "";
    input.placeholder = "Please type a task.";
    input.style.borderColor = "red";
    return;
  }
  input.placeholder = "Enter a task";
  input.style.borderColor = "";
  tasks.push({ id: nextId, text: text });
  nextId = nextId + 1;
  input.value = "";
  showList();
}

function showList() {
  var html = "";
  for (var i = 0; i < tasks.length; i++) {
    html += "<div class='taskbox'>" +
              "<span class='task-text'>" + tasks[i].text + "</span>" +
              "<div class='task-buttons'>" +
                "<button class='btn btn-secondary btn-sm' onclick='editTask(" + tasks[i].id + ")'>Edit</button>" +
                "<button class='btn btn-danger btn-sm' onclick='deleteTask(" + tasks[i].id + ")'>Delete</button>" +
              "</div>" +
            "</div>";
  }
  document.getElementById("taskList").innerHTML = html;
}

function deleteTask(id) {
  var newTasks = [];
  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id !== id) {
      newTasks.push(tasks[i]);
    }
  }
  tasks = newTasks;
  showList();
}

function editTask(id) {
  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id === id) {
      editingId = id;
      document.getElementById("modalInput").value = tasks[i].text;
      document.getElementById("modalErrorMsg").innerHTML = "";
      showModal();
      break;
    }
  }
}

function updateItem() {
  var newText = document.getElementById("modalInput").value.trim();
  var errorDiv = document.getElementById("modalErrorMsg");
  if (newText === "") {
    errorDiv.innerHTML = "Task text cannot be empty.";
    return;
  }
  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id === editingId) {
      tasks[i].text = newText;
      break;
    }
  }
  closeModal();
  showList();
}

function showModal() {
  var modal = document.getElementById("editModal");
  var overlay = document.getElementById("overlay");
  modal.classList.add("show");
  modal.style.display = "block";
  overlay.style.display = "block";
}

function closeModal() {
  var modal = document.getElementById("editModal");
  var overlay = document.getElementById("overlay");
  modal.classList.remove("show");
  modal.style.display = "none";
  overlay.style.display = "none";
}

function resetInputStyle(input) {
  input.placeholder = "Enter a task";
  input.style.borderColor = "";
}

function viewCode() {
  var htmlCode = document.documentElement.outerHTML;
  var newTab = window.open();
  newTab.document.write('<pre>' + htmlCode.replace(/</g, "&lt;").replace(/>/g, "&gt;") + '</pre>');
  newTab.document.title = "View Source Code";
  newTab.document.close();
}
