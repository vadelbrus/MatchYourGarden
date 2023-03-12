import { Api } from "./Api.js";

class NewPlant {
constructor(api){
this.api = api;
this.form = document.querySelector('.main-card');
this.form.addEventListener('submit', (e)=> {
  e.preventDefault()
  this.addNewGarden();
})

}

 getNewGardenValues(){
  const name = document.querySelector('.form__name').value;
    
  return {
    name: name
      }
} 

addNewGarden(){
  const name = document.querySelector('.form__name');  

  const newGardenData = this.getNewGardenValues();
  console.log(newGardenData);
  this.api.postData('garden', 'create', newGardenData);

  name.value = "";
  
}


}

new NewPlant(new Api)