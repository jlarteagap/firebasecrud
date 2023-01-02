import { saveTask, onGetTasks, deleteTask} from "./firebase.js";

const taskContent = document.getElementById("task-content");
const taskForm = document.getElementById("task-form");

window.addEventListener("DOMContentLoaded", async () => {
  onGetTasks((querySnapshot) => {
    let html = "";
    querySnapshot.forEach((doc) => {
      const task = doc.data();

      html += `
                <div>
                    <h3>${task.title}</h3>
                    <p>${task.desc}</p>
                    <button class="btn-delete" data-id=${doc.id}>Delete</button>
                </div>
           `;
    });

    taskContent.innerHTML = html;

    const btnDelete = taskContent.querySelectorAll('.btn-delete')

    btnDelete.forEach(btn => {
        btn.addEventListener('click', ({target: {dataset}}) => {
            deleteTask(dataset.id)
        })
    })
  });
});

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = taskForm["task-title"];
  const desc = taskForm["task-description"];

  saveTask(title.value, desc.value);

  taskForm.reset();
});
