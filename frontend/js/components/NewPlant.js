import { Api } from "./Api.js";

class NewPlant {
constructor(api){
  
this.api = api;
this.gardens = [];

this.form = document.querySelector('.form');
this.searchBox = document.querySelector('.form__search-box');
this.promptFields = document.querySelector(".search-mobile__prompts");
this.msgContainer = document.querySelector(".section-new-plant__inner");
this.submitFormBtn = document.querySelector(".form__button");
this.resetFormBtn = document.querySelector(".form__btn-reset");
this.searchMobile = document.querySelector(".search-mobile");
this.confirmButton = document.querySelector(".search-mobile__confirm-btn");
this.clearButton = document.querySelector(".search-mobile__clear-btn");
this.formResultsList = document.querySelector(".form__results-list");
this.mobileResultsList = document.querySelector(".search-mobile__results");
this.searchMobileCloseBtn = document.querySelector(".search-mobile__close-btn");
this.queryInput = document.querySelector(".search-mobile__query");
this.alertDelay = 750;

//APPEND DOM ELEMENTS LISTENERS

this.promptFields.addEventListener('click', (e)=> {
  
  if (e.target.classList.contains("search-mobile__prompt")) this.addNewPromptToList(e);
  
});

this.formResultsList.addEventListener("click", (e)=>{
  
  if(e.target.classList.contains("form__result-remove")) {
    const id  = e.target.parentNode.dataset.id;
  
    this.gardens = this.gardens.filter(garden => garden.id != id);
    e.target.parentNode.remove();
    
    this.mobileResultsList.innerHTML = this.gardens.map((garden => {
      return `<li class="search-mobile__result" data-id="${garden.id}">
      <span class="form__result-text">${garden.name}</span>
      <button type="button" class="search-mobile__remove-btn button">
      <i class="fa-solid fa-xmark fa-xl search-mobile__close-mark"></i>
      </button>
      </li>`
    })).join("");
    
  }
})


this.mobileResultsList.addEventListener("click", (e)=> {
  e.preventDefault();
  
  if(e.target.classList.contains("search-mobile__remove-btn")) {

    e.target.parentNode.remove();
    this.formResultsList.innerHTML = this.gardens.map((garden => {
      return `<li data-id="${garden.id}">
      <span class="form__result-text">${garden.name}</span>
      <button type="button" class="form__result-remove button">
      <i class="fa-solid fa-xmark fa-xl search-mobile__close-mark"></i>
      </button>
      </li>`
      
    })).join("");
  };
})


this.confirmButton.addEventListener("click", (e)=> {
  e.preventDefault();
  const userGardens = [...this.mobileResultsList.querySelectorAll("[data-id]")];
  this.gardens = userGardens.map(garden => {
    return { 

      id: garden.dataset.id,
      name: garden.innerText

    }
  } );

  
  this.formResultsList.innerHTML = this.gardens.map((garden => {
    return `<li data-id="${garden.id}"><span class="form__result-text">${garden.name}</span>
    <button type="button" class="form__result-remove button">
    <i class="fa-solid fa-xmark fa-xl search-mobile__close-mark"></i>
    </button>
    </li>`
    
  })).join("");

  this.queryInput.value = "";
  
  this.toggleSearch();
  

})

this.clearButton.addEventListener("click", (e)=> {
  e.preventDefault();
  this.clearMobileSearchFields();
  

  
})

this.resetFormBtn.addEventListener("click", (e)=> {
  e.preventDefault();
  this.resetFormFields();
})

this.searchBox.addEventListener("click", ()=> {
  this.queryInput.value = "";
  
  
  this.searchMobile.classList.toggle("search-mobile--active");
  this.searchMobile.classList.toggle("search-mobile--visible");
});

this.searchMobileCloseBtn.addEventListener("click", (e)=> {
  e.preventDefault();
  this.queryInput.value = "";
  this.mobileResultsList.innerHTML = this.gardens.map((garden => {
    return `<li class="search-mobile__result" data-id ="${garden.id}">
    <span class="search-mobile__result-text" >${garden.name}</span>
    <button class="search-mobile__remove-btn button">
      <i class="fa-solid fa-xmark fa-xl search-mobile__close-mark"></i>
    </button>
  </li>`
    
  })).join("");


  this.toggleSearch();
})

this.queryInput.addEventListener("keyup", async (e)=> {
    if(e.target.value.length < 3) {

      this.promptFields.classList.remove("search-mobile__prompts--active");
      this.mobileResultsList.classList.add("search-mobile__results--active");
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
  this.searchMobile.classList.toggle("search-mobile--active");
  setTimeout(()=>{
    this.searchMobile.classList.remove("search-mobile--visible");        
  }, 225);
}

addNewPromptToList(e) {
  
  const promptTemplate = `
        <li class="search-mobile__result" data-id ="${e.target.dataset.id}">
          <span class="search-mobile__result-text" >${e.target.innerText}</span>
          <button class="search-mobile__remove-btn button">
            <i class="fa-solid fa-xmark fa-xl search-mobile__close-mark"></i>
          </button>
        </li>`;
          
      
      this.mobileResultsList.insertAdjacentHTML("beforeend", promptTemplate);
      this.mobileResultsList.classList.add("search-mobile__results--active");
      this.promptFields.classList.remove("search-mobile__prompts--active");


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
    <button class="search-mobile__prompt" 
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
  
  if(data.length === 0) { 
    this.handleRemovePrompts();
    return;
  }
  
  this.promptFields.classList.add("search-mobile__prompts--active");
  this.mobileResultsList.classList.remove("search-mobile__results--active");
  
  await this.populatePromptList(data);
  const prompts = [...document.querySelectorAll(".search-mobile__prompt")];
  const results = [...document.querySelectorAll(".search-mobile__result")].map(result=> result.dataset.id );
  this.disablePrompts(prompts, results, this.promptFields);

}



async addNewPlant(){
  //GET USER INPUT DATA
  const plantName = document.querySelector('.form__name-input');
  const plantLatinName = document.querySelector('.form__latin-input');
  const tabs = [...this.form.querySelectorAll('.form__tab')];

  //POPULATE LIST OF GARDENS ARRAY OF OBJECTS
  const gardensList = tabs.map( tab => {
    return {
      id: tab.dataset.gardenId,
      name: tab.textContent,
    }
  } );

  //CHECK IF USER CHOOSE AT LEAST ONE GARDEN

  if(gardensList.length === 0) {
    this.showSearchBoxNegativeMessage();
    return;
  }

//CREATE PLANT OBJECT TO SEND TO THE SERVER

   const newPlantData = {
    name: plantName.value,
    latinName: plantLatinName.value,
    gardens: gardensList,
  }

  try {
    const response = await this.api.postData('plant', 'create', newPlantData);
    const data = await response.data;
    this.showSuccesCard(data);
    this.clearFormFields();
   
    
  } catch (error) {
    alert(error)
  }
 
}

clearMobileSearchFields(){
  this.gardens = [];
  this.queryInput.value = "";
  this.searchBox.value = "";
  this.promptFields.innerHTML = "";
  this.mobileResultsList.innerHTML = "";
  this.formResultsList.innerHTML = "";
  
}

resetFormFields(){
  this.gardens = [];
  const plantName = document.querySelector('.form__name-input');
  const plantLatinName = document.querySelector('.form__latin-input');
 
  this.formResultsList.innerHTML = "";
  this.mobileResultsList.innerHTML = "";
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
    <p class="section-new-plant__popup-name">${data.name}</p>
    <p class="section-new-plant__popup-latin-name">(${data.latinName})</p>
    <p class="section-new-plant__popup-gardens">${data.gardens.map(garden => garden.name).join(", ")}</p>
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
    popupBtn.addEventListener("click", ()=> {
    popup.classList.remove("section-new-plant__popup--active");
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