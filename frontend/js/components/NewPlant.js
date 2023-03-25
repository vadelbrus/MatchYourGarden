import { Api } from "./Api.js";

class NewPlant {
constructor(api){
  
this.api = api;
this.gardens = [];

this.page = document.querySelector(".page-new-plant");
this.form = document.querySelector('.form');
this.searchBox = document.querySelector('.form__search-box');
this.promptFields = document.querySelector(".search-modal__prompts");
this.msgContainer = document.querySelector(".page-new-plant__inner");
this.submitFormBtn = document.querySelector(".form__button");
this.resetFormBtn = document.querySelector(".form__btn-reset");
this.searchModal = document.querySelector(".search-modal");
this.confirmButton = document.querySelector(".search-modal__confirm-btn");
this.clearButton = document.querySelector(".search-modal__clear-btn");
this.formResultsList = document.querySelector(".form__results-list");
this.modalResultsList = document.querySelector(".search-modal__results");
this.searchModalCloseBtn = document.querySelector(".search-modal__close-btn");
this.queryInput = document.querySelector(".search-modal__query");
this.alertDelay = 750;

//APPEND DOM EVENTS LISTENERS

this.promptFields.addEventListener('click', (e)=> {
  
  if (e.target.classList.contains("search-modal__prompt")) this.addNewPromptToList(e);
  
});

this.formResultsList.addEventListener("click", (e)=>{
  
  if(e.target.classList.contains("form__result-remove")) {
    const id  = e.target.parentNode.dataset.id;
  
    this.gardens = this.gardens.filter(garden => garden.id != id);
    e.target.parentNode.remove();
    
    this.modalResultsList.innerHTML = this.gardens.map((garden => {
      return `<li class="search-modal__result" data-id="${garden.id}">
      <span class="search-modal__result-text">${garden.name}</span>
      <button type="button" class="search-modal__remove-btn button">
      <i class="fa-solid fa-xmark fa-xl search-modal__close-mark"></i>
      </button>
      </li>`
    })).join("");
    
  }
})


this.modalResultsList.addEventListener("click", (e)=> {
  e.preventDefault();
  
  if(e.target.classList.contains("search-modal__remove-btn")) {

    e.target.parentNode.remove();
    this.formResultsList.innerHTML = this.gardens.map((garden => {
      return `<li data-id="${garden.id}">
      <span class="form__result-text">${garden.name}</span>
      <button type="button" class="form__result-remove button">
      <i class="fa-solid fa-xmark fa-xl form__close-mark"></i>
      </button>
      </li>`
      
    })).join("");
  };
})


this.confirmButton.addEventListener("click", (e)=> {
  e.preventDefault();
  const userGardens = [...this.modalResultsList.querySelectorAll("[data-id]")];
  this.gardens = userGardens.map(garden => {
    return { 

      id: garden.dataset.id,
      name: garden.innerText

    }

  } );

  
  this.formResultsList.innerHTML = this.gardens.map((garden => {
    return `<li data-id="${garden.id}"><span class="form__result-text">${garden.name}</span>
    <button type="button" class="form__result-remove button">
    <i class="fa-solid fa-xmark fa-xl form__close-mark"></i>
    </button>
    </li>`
    
  })).join("");

  this.queryInput.value = "";
  
  this.toggleSearch();
  

})

this.clearButton.addEventListener("click", (e)=> {
  e.preventDefault();
  this.clearModalSearchFields();
  

  
})

this.resetFormBtn.addEventListener("click", (e)=> {
  e.preventDefault();
  this.resetFormFields();
})

this.searchBox.addEventListener("click", ()=> {
  this.queryInput.value = "";
  
  
  this.searchModal.classList.toggle("search-modal--active");
  this.searchModal.classList.toggle("search-modal--visible");
});

this.searchModalCloseBtn.addEventListener("click", (e)=> {
  e.preventDefault();
  this.queryInput.value = "";
  this.modalResultsList.innerHTML = this.gardens.map((garden => {
    return `<li class="search-modal__result" data-id ="${garden.id}">
    <span class="search-modal__result-text" >${garden.name}</span>
    <button class="search-modal__remove-btn button">
      <i class="fa-solid fa-xmark fa-xl search-modal__close-mark"></i>
    </button>
  </li>`
    
  })).join("");


  this.toggleSearch();
})

this.queryInput.addEventListener("keyup", async (e)=> {
    if(e.target.value.length < 3) {

      this.promptFields.classList.remove("search-modal__prompts--active");
      this.modalResultsList.classList.add("search-modal__results--active");
      this.handleRemovePrompts();
    return
  };

  await this.showPrompts(e.target.value)
})



this.form.addEventListener("submit", async (e)=> {
  e.preventDefault();
  await this.addNewPlant();
  
});


}


toggleSearch(){
  this.searchModal.classList.toggle("search-modal--active");
  setTimeout(()=>{
    this.searchModal.classList.remove("search-modal--visible");        
  }, 225);
}

addNewPromptToList(e) {
  
  const promptTemplate = `
        <li class="search-modal__result" data-id ="${e.target.dataset.id}">
          <span class="search-modal__result-text" >${e.target.innerText}</span>
          <button class="search-modal__remove-btn button">
            <i class="fa-solid fa-xmark fa-xl search-modal__close-mark"></i>
          </button>
        </li>`;
          
      
      this.modalResultsList.insertAdjacentHTML("beforeend", promptTemplate);
      this.modalResultsList.classList.add("search-modal__results--active");
      this.promptFields.classList.remove("search-modal__prompts--active");


}

removeTabFromList(e) {
  const tabId = e.target.dataset.gardenId;
  const prompt = this.promptFields.querySelector(`[data-garden-id="${tabId}"]`);
  
  prompt.classList.remove("form__prompt-field--active");
  e.target.parentNode.remove();
}

async searchGardens(val){
 return await this.api.getDataByName('garden', 'getallbyname', val.toLowerCase());
    
}

async populatePromptList(data){
  
  const propmtsListHtml = data.map(element => {
    return `
    <button class="search-modal__prompt" 
    type="button"
    data-id="${element.id}">
    ${element.name}
    </button>`;})
    .join('');
  
  this.promptFields.innerHTML = propmtsListHtml;
  
  
  }


async handleRemovePrompts() {
  this.promptFields.innerHTML = "";
  this.promptFields.classList.remove("form__prompt-fields--active");
}

disablePrompts(prompts, results, selector){
  prompts.forEach((prompt)=> {
    if(results.includes(prompt.dataset.id)) {
      selector.querySelector(`[data-id ="${prompt.dataset.id}"]`).disabled = true;
      
    }
    
  })
}

async showPrompts(val) {
  const response = await this.searchGardens(val);
  const data = response.data;
  console.log(data)
  if(data.length === 0) { 
    this.handleRemovePrompts();
    return;
  }
  
  this.promptFields.classList.add("search-modal__prompts--active");
  this.modalResultsList.classList.remove("search-modal__results--active");
  
  await this.populatePromptList(data);
  const prompts = [...document.querySelectorAll(".search-modal__prompt")];
  const results = [...document.querySelectorAll(".search-modal__result")].map(result=> result.dataset.id );
  this.disablePrompts(prompts, results, this.promptFields);

}



async addNewPlant(){
  //GET USER INPUT DATA
  const plantName = document.querySelector('.form__name-input');
  const plantLatinName = document.querySelector('.form__latin-input');
  
  //CHECK IF USER CHOOSE AT LEAST ONE GARDEN

  if(this.gardens.length === 0) {
    this.showSearchBoxNegativeMessage();
    return;
  }

//CREATE PLANT OBJECT TO SEND TO THE SERVER

   const newPlantData = {
    name: plantName.value,
    latinName: plantLatinName.value,
    gardens: this.gardens,
    iamges: []
  }

  try {
    const response = await this.api.postData('plant', 'create', newPlantData);
    const data = await response.data;
    this.showSuccesCard(data);
    this.resetFormFields();
   
    
  } catch (error) {
    alert(error)
  }
 
}

clearModalSearchFields(){
  this.gardens = [];
  this.queryInput.value = "";
  this.searchBox.value = "";
  this.promptFields.innerHTML = "";
  this.modalResultsList.innerHTML = "";
  this.formResultsList.innerHTML = "";
  
}

resetFormFields(){
  this.gardens = [];
  const plantName = document.querySelector('.form__name-input');
  const plantLatinName = document.querySelector('.form__latin-input');
 
  this.formResultsList.innerHTML = "";
  this.modalResultsList.innerHTML = "";
  this.searchBox.value = "";
  plantName.value = "";
  plantLatinName.value = "";
  this.promptFields.innerHTML = "";
}

successMessageTemplate(data){
  return `
  <div class="section-new-plant__popup">
  <div class= "section-new-plant__popup-inner">
    <p class="section-new-plant__popup-title">You have succesfully added new plant to database!</p>
    <p class="section-new-plant__popup-name">Plant name: ${data.name}</p>
    <p class="section-new-plant__popup-latin-name">Latin name: (${data.latinName})</p>
    <p class="section-new-plant__popup-gardens">Assigned gardens: ${data.gardens.map(garden => garden.name).join(", ")}</p>
    <button class="section-new-plant__popup-btn">Close</button>
  </div>
</div>
  `;
}

showSuccesCard(data){
  
    this.msgContainer.insertAdjacentHTML("beforeend", this.successMessageTemplate(data));
    const popup = document.querySelector(".section-new-plant__popup");
    const popupBtn = document.querySelector(".section-new-plant__popup-btn");
    popup.classList.add("section-new-plant__popup--active");
    this.page.classList.toggle("page--hidden");
    
    popupBtn.addEventListener("click", ()=> {
    popup.classList.remove("section-new-plant__popup--active");
    this.page.classList.toggle("page--hidden");
    popup.remove();
  })
  
}

negativeMessageTemplate() {
  return  `
  <div class="form__negative">
  <p class="form__negative-text">Please type at least one garden
  </p>
  </div>
  `;
}

showSearchBoxNegativeMessage(){
  const searchBox = document.querySelector(".form__search-container");    
  searchBox.insertAdjacentHTML("beforeend", this.negativeMessageTemplate());
  setTimeout(()=> {
    document.querySelector(".form__negative").remove();
  }, this.alertDelay)
}


}

const newPlant = new NewPlant(new Api);