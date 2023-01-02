import { saveTask, onGetTasks, deleteTask, getTask, updateTask} from "./firebase.js";

const taskContent = document.getElementById("task-content");
const taskForm = document.getElementById("task-form");

let editStatus = false
let idTask = ''
window.addEventListener("DOMContentLoaded", async () => {
  onGetTasks((querySnapshot) => {
    // Lo colocamos para que no se duplique cada vez que se crea un nuevo doc 
    taskContent.innerHTML = ''
    querySnapshot.forEach((doc) => {
      const task = doc.data();

      taskContent.innerHTML += `
                <div>
                    <h3>${task.title}</h3>
                    <p>${task.desc}</p>
                    <button class="btn-delete" data-id=${doc.id}>Delete</button>
                    <button class="btn-edit" data-id=${doc.id}>Edit</button>
                </div>
           `;
    });

    const btnDelete = taskContent.querySelectorAll('.btn-delete')

    btnDelete.forEach(btn => {
        btn.addEventListener('click', ({target: {dataset}}) => {
            deleteTask(dataset.id)
        })
    })

    const btnEdit = taskContent.querySelectorAll('.btn-edit')

    btnEdit.forEach(btn => {
        btn.addEventListener('click', async ({target: {dataset}}) => {
            const doc = await getTask(dataset.id)

            const task = doc.data()
            
            taskForm['task-title'].value = task.title
            taskForm['task-description'].value = task.desc

            editStatus = true
            idTask = doc.id

            taskForm['task-save'].innerText = 'Update'
        })
    })
  });
});

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = taskForm["task-title"];
  const desc = taskForm["task-description"];

  if(!editStatus){
      saveTask(title.value, desc.value);
    } else {
        updateTask(idTask, {title: title.value, desc: desc.value})
        editStatus = false
  }

  taskForm.reset();
});
