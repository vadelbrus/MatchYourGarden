import { ApiDataHandler } from "./ApiDataHandler.js";

const API_URL = "https://matchyourgarden.azurewebsites.net";
const api = new ApiDataHandler(API_URL);

//USER PANEL FUNCTIONALITY
const list = document.querySelector(".panel__nav");

list.addEventListener("click", (e)=> {
    
    const item  = e.target;
    console.log(item)
    if(item.dataset.item === "add") {
      const form =  document.querySelector(".panel__add-form");
      form.classList.toggle("panel__add-form--block");
    }
    console.log(form.classList)
})


//ADD NEW PLANT TO DATABASE

const handleSuccessMessage = async (data)=> {
        
    const form = document.querySelector('form');
    form.classList.toggle("form--block");

    const msgContainer = document.querySelector('.form-successful');
    const name = document.querySelector('.form-successful__name-text');
    const latin = document.querySelector('.form-successful__lname-text');

    msgContainer.classList.toggle('form-successful--block');
    name.textContent = data.data.name;
    latin.textContent = data.data.latinName;
    
}

export const addNewData = async (data)=> {
 
    const response = await api.setNewRecord("plant", "create", data);
    const responseData  = response.data;
    handleSuccessMessage(response);
    return responseData
 
}

export const resetInputsValue = (firstInputSelector, secondInputSelector)=>{

    firstInputSelector.value = "";
    secondInputSelector.value = "";
}

export const handleForm = async (url)=> {
    
    let name = document.getElementById("pname");
    let latin = document.getElementById("latinname");
    const plantInfo = {name: name.value, latinName: latin.value};

    await addNewData(plantInfo);    
    resetInputsValue(name, latin);
   

}


//ADDING ADD PLANT FORM FUNCTIONALITY


const form = document.querySelector('.form');
const closeSuccessBtn = document.querySelector(".form-successful__close-btn");
const msgContainer = document.querySelector('.form-successful');

closeSuccessBtn.addEventListener('click', (e)=> {
    e.preventDefault();
    
    msgContainer.classList.toggle("form-successful--block");
    form.classList.remove("form--none");
})


form.addEventListener('submit', (e)=> {
    e.preventDefault();
    handleForm(API_URL);
    
});





