const API_URL = "https://matchyourgarden.azurewebsites.net";

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
        console.log(data)
    const form = document.querySelector('form');
    // form.classList.toggle("form--block");

    const msgContainer = document.querySelector('.form-successful');
       
    const name = document.querySelector('.form-successful__name-text');
    const latin = document.querySelector('.form-successful__lname-text');

    // let name = document.getElementById("pname");
    // let lname = document.getElementById("latinname");

    msgContainer.classList.toggle('form-successful--block');
    name.textContent = data.data.name;
    latin.textContent = data.data.latinName;
    
    
           
}

export const addNewData = async (url, data)=> {
        
    const post_url = `${url}/Plant/create`;
    const requestOptions = {
        method: "POST",
        headers: {"content-Type":"application/json"},
        body: JSON.stringify(data)
    };
    
    try {
        const response = await fetch (post_url, requestOptions);
        const data = await response.json();
        console.log(data)
        const form = document.querySelector('.form');
        form.classList.add('form--none');

        handleSuccessMessage(data);
        return data
        
        
    } catch (error) {
        alert(error, error.name);
    }
 
    

}

export const resetInputsValue = (firstInputSelector, secondInputSelector)=>{
    firstInputSelector.value = "";
    secondInputSelector.value = "";
}

export const handleForm = async (url)=> {
    let name = document.getElementById("pname");
    let latin = document.getElementById("latinname");
    
  
    const plantInfo = {name: name.value, latinName: latin.value};
    
    
    await addNewData(url, plantInfo);    
    resetInputsValue(name, latin);
   

}


//ADDING ADD PLANT FORM FUNCTIONALITY

// const addPlantBtn = document.querySelector('.section__add-button');
// const form = document.querySelector('.section__form');
const form = document.querySelector('.form');
const closeSuccessBtn = document.querySelector(".form-successful__close-btn");
// const closeFormBtn = document.querySelector(".form__close-btn");
const msgContainer = document.querySelector('.form-successful');
// const plantName = document.getElementById("pname");
// const plantLatinName = document.getElementById("latinname");

// addPlantBtn.addEventListener('click', (e)=> {
//     e.preventDefault();
//     addPlantBtn.classList.toggle("section__add-button--none");
//     form.classList.toggle("form--block");
    
    
// })


// closeFormBtn.addEventListener("click", (e)=> {
//     e.preventDefault();
//     form.classList.toggle("form--block");
//     addPlantBtn.classList.toggle("section__add-button--none");
//     plantName.value = "";
//     plantLatinName.value = "";
// })

closeSuccessBtn.addEventListener('click', (e)=> {
    e.preventDefault();
    
    msgContainer.classList.toggle("form-successful--block");
    form.classList.remove("form--none");
    // addPlantBtn.classList.toggle("section__add-button--none");
})


form.addEventListener('submit', (e)=> {
    e.preventDefault();
    handleForm(API_URL);
    
});





