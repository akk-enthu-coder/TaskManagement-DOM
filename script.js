
console.log("checking and connected")

const taskContainer = document.querySelector('.task__container');
var globalStore = [];
console.log(taskContainer);
const generateNewCard = (taskData) =>`
  <div class="col-sm-12 col-md-6 col-lg-4" >
  <div class="card">
  <div class="card-header d-flex justify-content-end gap-2">
   <button type="button" class="btn btn-outline-success"><i class="fas fa-pencil-alt"></i></button>
   <button type="button" class="btn btn-outline-danger" id=${taskData.id} onclick="deleteCard.apply(this,arguments)"><i class="fas fa-trash-alt" id=${taskData.id} onclick="deleteCard.apply(this,arguments)"></i></button>
  </div>
  <div class="card-body shadow">
  <img src=${taskData.imageUrl} class="card-img-top" alt="time_clock.img">
   <h5 class="card-title mt-3 fw-bolder text-dark">${taskData.taskTitle}</h5>
   <p class="card-text tex-secondary">${taskData.taskDescription}</p>
   <a href="#" class="btn btn-info">${taskData.taskType}</a>
  </div>
  </div>
  </div>
  `;

const loadInitialCardData = () =>{

  //localstorage to get tasky card taskData
const getCardData = localStorage.getItem("tasky");

  //convert to normal object
const {cards} = JSON.parse(getCardData);

  //loop over those array of task objects to create HTML card , inject it to document
cards.map((cardObject) => {
  taskContainer.insertAdjacentHTML("beforeend", generateNewCard(cardObject));

  //update our globalStore
  globalStore.push(cardObject);

});


};

//Delete function

const deleteCard = (event) =>{
  event = window.event;
  const targetID = event.target.id;
  const tagname = event.target.tagName;

  globalStore = globalStore.filter((cardObject) => cardObject.id !== targetID);
  localStorage.setItem("tasky",JSON.stringify({cards:globalStore}));

  if(tagname === "BUTTON"){
    return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode);
  } else {
    return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode.parentNode);
  }
};


const saveChanges = () => {
  const taskData = {
    id: `${Date.now()}` ,
    imageUrl : document.getElementById('imageurl').value,
    taskTitle: document.getElementById('tasktitle').value,
    taskType: document.getElementById('tasktype').value,
    taskDescription: document.getElementById('taskdescription').value
  };


const newCard = `
<div class="col-sm-12 col-md-6 col-lg-4" id=${taskData.id}>
<div class="card">
<div class="card-header d-flex justify-content-end gap-2">
 <button type="button" class="btn btn-outline-success"><i class="fas fa-pencil-alt"></i></button>
 <button type="button" class="btn btn-outline-danger"><i class="fas fa-trash-alt"></i></button>
</div>
<div class="card-body shadow">
<img src=${taskData.imageUrl} class="card-img-top" alt="time_clock.img">
 <h5 class="card-title mt-3 fw-bolder text-primary">${taskData.taskTitle}</h5>
 <p class="card-text">${taskData.taskDescription}</p>
 <a href="#" class="btn btn-primary">${taskData.taskType}</a>
</div>
</div>
</div>
`;

taskContainer.insertAdjacentHTML("beforeend", generateNewCard(taskData));

globalStore.push(taskData);
localStorage.setItem("tasky",JSON.stringify({cards:globalStore}));    //tasky is ID ..we can give our own ID //cards is also a kay we can give anything

};



//Day : 19

          //issues:
//page refreshes causes the data to get deleted.
          //solution:
//API
//local storage - accessing application via local storage
//interface(means middle man)




//features - delete(done) ,edit ,search ,open the card.
