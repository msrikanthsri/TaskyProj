const taskContainer = document.querySelector(".task__container")
console.log(taskContainer)

let globalStore=[];

const newCard = ({id,imageUrl,taskTitle,taskType,taskDescription,}) => 
`<div class="col-md-6 col-lg-4"  id="${id}">
    <div class="card">
  <div class="card-header d-flex justify-content-end gap-2">
    <button type="button" id="${id}" onclick="editCard.apply(this,arguments)" class="btn btn-outline-success rounded"><i id="${id}" onclick="editCard.apply(this,arguments)" class="fas fa-pencil-alt "></i></button>
    <button type="button" id="${id}" class="btn btn-outline-danger" onclick="deleteCard.apply(this,arguments)"><i class="fas fa-trash-alt" id="${id}" onclick="deleteCard.apply(this,arguments)"></i></button>
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

const loadInitialTaskcards = () => {
    // access local storage
    const getInitialData=localStorage.tasky
    if(!getInitialData) return;
    //convert stringified to object
    const {cards}=JSON.parse(getInitialData)
    //map around the array to generate HTML Content
    cards.map((card)=>{
        const createNewCard=newCard(card)
        taskContainer.insertAdjacentHTML("beforeend",createNewCard)
        globalStore.push(card)
    })
}

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
    globalStore.push(taskData)
    console.log(globalStore);
    localStorage.setItem("tasky",JSON.stringify({cards:globalStore}))
    
};

const deleteCard = (event) =>{
    //id
    event=window.event;
    const targetId=event.target.id
    const tagname=event.target.tagName

    //seach the globalstore, remove the object which matches the id
    const newUpdatedArray=globalStore.filter(
        (card)=>card.id!==targetId
    )
    //loop over the new globalstore and inject updated cards to DOM
    newUpdatedArray.map(
        (card)=>{
            const createNewCard=newCard(card)
            taskContainer.insertAdjacentHTML("beforeend",createNewCard)
        }
    )
    globalStore=newUpdatedArray
    localStorage.setItem("tasky",JSON.stringify({cards:globalStore}))
    if(tagname=="BUTTON"){
        return taskContainer.removeChild(event.parentNode.parentNode.parentNode)
    }

    return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode.parentNode)
}


const editCard=(event)=>{
    event=window.event;
    const targetId=event.target.id
    const tagname=event.target.tagName

    let parentElement
    if(tagname==="BUTTON"){
        parentElement=event.target.parentNode.parentNode
    }
    else{
        parentElement=event.target.parentNode.parentNode.parentNode
    }
    let taskTitle=parentElement.childNodes[5].childNodes[1];
    let taskDescription=parentElement.childNodes[5].childNodes[3];
    let taskType=parentElement.childNodes[5].childNodes[5];
    let submitButton=parentElement.childNodes[7].childNodes[1];
    console.log(taskTitle);

    //set attributes
    taskTitle.setAttribute("contenteditable","true")
    taskDescription.setAttribute("contenteditable","true")
    taskType.setAttribute("contenteditable","true")
    submitButton.innerHTML="Save Changes"
}