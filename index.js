const taskContainer = document.querySelector(".task__container")
console.log(taskContainer)

const newCard = ({id,imageUrl,taskTitle,taskType,taskDescription,}) => 
`<div class="col-md-6 col-lg-4"  id="${id}">
<div class="card">
  <div class="card-header d-flex justify-content-end gap-2">
    <button type="button" class="btn btn-outline-success rounded"><i class="fas fa-pencil-alt "></i></button>
    <button type="button" class="btn btn-outline-danger"><i class="fas fa-trash-alt"></i></button>
  </div>
  <img src="${imageUrl}" class="card-img-top" alt="Image ocean">
  <div class="card-body">
    <h5 class="card-title">${taskTitle}</h5>
    <p class="card-text">${taskDescription}</p>
    <a href="#" class="btn btn-primary"><span class="badge bg-primary rounded">${taskType}</span></a>
  </div>
  <div class="card-footer text-muted">
    <button type="button" class="btn btn-outline-primary float-end rounded">Open Task</button>
  </div>
</div>
</div>`

const saveChanges = () => {
    const taskData = {
        id:`${Date.now()}`,
        imageUrl:document.getElementById("imageurl").value,
        taskTitle:document.getElementById("tasktitle").value,
        taskType:document.getElementById("tasktype").value,
        taskDescription:document.getElementById("taskdescription").value,
    }
    console.log(taskData)
    const createNewCard=newCard(taskData)
    console.log(createNewCard);
    taskContainer.insertAdjacentHTML("beforeend",createNewCard)

};